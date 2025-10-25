import React, { useEffect, useState } from "react";
import {
  generateSigner,
  publicKey as umiPublicKey,
  transactionBuilder,
  some,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  mplCandyMachine,
  fetchCandyMachine,
  fetchCandyGuard,
  findCandyMachineAuthorityPda,
  mintV2,
} from "@metaplex-foundation/mpl-candy-machine";
import {
  mplTokenMetadata,
  fetchAllDigitalAssetByOwner,
  fetchMetadata,
  findMetadataPda,
  findMasterEditionPda,
  findCollectionAuthorityRecordPda,
} from "@metaplex-foundation/mpl-token-metadata";
import { findAssociatedTokenPda, setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT ?? "https://api.devnet.solana.com";
const CANDY_MACHINE_ID = import.meta.env.VITE_CANDY_MACHINE_ID
  ? new PublicKey(import.meta.env.VITE_CANDY_MACHINE_ID)
  : null;
const COLLECTION_MINT_ID = import.meta.env.VITE_COLLECTION_MINT
  ? new PublicKey(import.meta.env.VITE_COLLECTION_MINT)
  : null;
const CANDY_GUARD_ID = import.meta.env.VITE_CANDY_GUARD_ID
  ? new PublicKey(import.meta.env.VITE_CANDY_GUARD_ID)
  : null;
const MINT_LIMIT_ID = import.meta.env.VITE_MINT_LIMIT_ID
  ? Number(import.meta.env.VITE_MINT_LIMIT_ID)
  : null;

const CANDY_MACHINE_PROGRAM_ID = umiPublicKey("CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR");
const TOKEN_METADATA_PROGRAM_ID = umiPublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
const SPL_TOKEN_PROGRAM_ID = umiPublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
const SPL_ATA_PROGRAM_ID = umiPublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
const SYSTEM_PROGRAM_ID = umiPublicKey("11111111111111111111111111111111");
const SYSVAR_INSTRUCTIONS_ID = umiPublicKey("Sysvar1nstructions1111111111111111111111111");
const SYSVAR_SLOT_HASHES_ID = umiPublicKey("SysvarS1otHashes111111111111111111111111111");
const MINT_V2_DISCRIMINATOR = new Uint8Array([120, 121, 23, 146, 173, 110, 199, 205]);

export default function MintPage() {
  const wallet = useWallet();
  const [umi, setUmi] = useState(null);
  const [solBalance, setSolBalance] = useState(0);
  const [nfts, setNfts] = useState([]);
  const [candyMachine, setCandyMachine] = useState(null);
  const [candyGuardConfig, setCandyGuardConfig] = useState(null);
  const [minting, setMinting] = useState(false);
  const [status, setStatus] = useState({ type: null, text: "" }); // <-- inline status

  useEffect(() => {
    if (!wallet.publicKey || !CANDY_MACHINE_ID) return;

    const umiInstance = createUmi(RPC_ENDPOINT)
      .use(walletAdapterIdentity(wallet))
      .use(mplCandyMachine());
    umiInstance.use(mplTokenMetadata());
    setUmi(umiInstance);

    loadBalances(umiInstance, wallet.publicKey);
    loadCandyMachine(umiInstance);
    loadCandyGuard(umiInstance);
  }, [wallet.publicKey]);

  const loadBalances = async (umiInstance, pubkey) => {
    try {
      const sol = await umiInstance.rpc.getBalance(pubkey);
      setSolBalance(Number(sol.basisPoints) / 1_000_000_000);

      const assets = await fetchAllDigitalAssetByOwner(umiInstance, pubkey);
      setNfts(assets);
    } catch (error) {
      console.error("Failed to load balances", error);
      setStatus({ type: "error", text: `Failed to load balances: ${error.message || error}` });
    }
  };

  const loadCandyMachine = async (umiInstance) => {
    try {
      if (!CANDY_MACHINE_ID) return;
      const cmAccount = await fetchCandyMachine(umiInstance, CANDY_MACHINE_ID);
      setCandyMachine(cmAccount);
      console.log("Candy Machine loaded:", cmAccount.publicKey.toString());
    } catch (error) {
      console.error("Failed to load Candy Machine", error);
      setStatus({ type: "error", text: `Failed to load Candy Machine: ${error.message || error}` });
    }
  };

  const loadCandyGuard = async (umiInstance) => {
    try {
      if (!CANDY_GUARD_ID) {
        setCandyGuardConfig(null);
        return;
      }
      const guardAccount = await fetchCandyGuard(umiInstance, umiPublicKey(CANDY_GUARD_ID.toBase58()));
      setCandyGuardConfig(guardAccount);
      console.log("Candy Guard loaded:", guardAccount.publicKey.toString());
    } catch (error) {
      console.error("Failed to load Candy Guard", error);
      setCandyGuardConfig(null);
      setStatus({ type: "error", text: `Failed to load Candy Guard: ${error.message || error}` });
    }
  };

  const handleMint = async () => {
    if (!umi || !wallet.publicKey || !candyMachine) return;

    // Clear previous status
    setStatus({ type: null, text: "" });

    const isGuarded = Boolean(CANDY_GUARD_ID);

    if (isGuarded && !candyGuardConfig) {
      setStatus({
        type: "error",
        text: "Candy guard configuration hasn’t finished loading. Please try again.",
      });
      return;
    }

    // Optional: sanity warning if env COLLECTION_MINT_ID mismatches
    if (COLLECTION_MINT_ID && candyMachine.collectionMint.toString() !== COLLECTION_MINT_ID.toBase58()) {
      console.warn("Collection mint in env does not match the candy machine account.");
    }

    setMinting(true);
    try {
      const latestCandyMachine = await fetchCandyMachine(
        umi,
        umiPublicKey(candyMachine.publicKey.toString())
      );
      setCandyMachine(latestCandyMachine);

      const available = Number(latestCandyMachine.data.itemsAvailable ?? 0);
      const redeemed = Number(latestCandyMachine.itemsRedeemed ?? 0);
      if (available - redeemed <= 0) {
        setStatus({ type: "error", text: "This candy machine is sold out." });
        return;
      }

      const ownerPk = umiPublicKey(wallet.publicKey.toBase58());
      const candyMachinePk = umiPublicKey(latestCandyMachine.publicKey.toString());
      const collectionMintPk = umiPublicKey(latestCandyMachine.collectionMint.toString());
      const collectionMetadata = findMetadataPda(umi, { mint: collectionMintPk });
      const collectionMetadataAccount = await fetchMetadata(umi, collectionMetadata);
      const collectionUpdateAuthority = umiPublicKey(
        collectionMetadataAccount.updateAuthority.toString()
      );

      // Create the mint upfront so we can derive the ATA properly.
      const nftMint = generateSigner(umi);
      const tokenAccount = findAssociatedTokenPda(umi, {
        mint: nftMint.publicKey,
        owner: ownerPk,
      });

      if (isGuarded && CANDY_GUARD_ID) {
        // Build optional mint args from guard config
        const mintArgs = {};
        const guardMintLimit = candyGuardConfig?.guards?.mintLimit;
        if (guardMintLimit?.__option === "Some") {
          mintArgs.mintLimit = some({ id: guardMintLimit.value.id });
        } else if (MINT_LIMIT_ID !== null) {
          mintArgs.mintLimit = some({ id: MINT_LIMIT_ID });
        }

        const guardSolPayment = candyGuardConfig?.guards?.solPayment;
        if (guardSolPayment?.__option === "Some") {
          mintArgs.solPayment = some({
            destination: umiPublicKey(guardSolPayment.value.destination),
          });
        }

        const response = await transactionBuilder()
          .add(setComputeUnitLimit(umi, { units: 500_000 }))
          .add(
            mintV2(umi, {
              candyMachine: candyMachinePk,
              candyGuard: umiPublicKey(CANDY_GUARD_ID.toBase58()),
              nftMint,
              collectionMint: collectionMintPk,
              collectionUpdateAuthority,
              tokenStandard: candyMachine.tokenStandard,
              payer: umi.identity,
              minter: umi.identity,
              token: tokenAccount,
              mintArgs,
            })
          )
          .sendAndConfirm(umi);

        console.log("Mint success:", response.signature);
        setStatus({ type: "success", text: "Mint successful!" });
        await loadBalances(umi, wallet.publicKey);
        await loadCandyMachine(umi);
        return;
      }

      // Unguarded (authority) path
      const mintAuthorityPk = umiPublicKey(latestCandyMachine.mintAuthority.toString());
      const authorityPda = findCandyMachineAuthorityPda(umi, { candyMachine: candyMachinePk });
      const nftMetadata = findMetadataPda(umi, { mint: nftMint.publicKey });
      const nftMasterEdition = findMasterEditionPda(umi, { mint: nftMint.publicKey });
      const collectionMasterEdition = findMasterEditionPda(umi, { mint: collectionMintPk });
      const collectionDelegateRecord = findCollectionAuthorityRecordPda(umi, {
        mint: collectionMintPk,
        collectionAuthority: authorityPda,
      });

      const instructionKeys = [
        { pubkey: candyMachinePk, isSigner: false, isWritable: true },
        { pubkey: authorityPda, isSigner: false, isWritable: true },
        { pubkey: mintAuthorityPk, isSigner: true, isWritable: false },
        { pubkey: umi.identity.publicKey, isSigner: true, isWritable: true },
        { pubkey: ownerPk, isSigner: false, isWritable: false },
        { pubkey: nftMint.publicKey, isSigner: true, isWritable: true },
        { pubkey: umi.identity.publicKey, isSigner: true, isWritable: false },
        { pubkey: nftMetadata, isSigner: false, isWritable: true },
        { pubkey: nftMasterEdition, isSigner: false, isWritable: true },
        { pubkey: tokenAccount, isSigner: false, isWritable: true },
        { pubkey: collectionDelegateRecord, isSigner: false, isWritable: false },
        { pubkey: collectionMintPk, isSigner: false, isWritable: false },
        { pubkey: collectionMetadata, isSigner: false, isWritable: true },
        { pubkey: collectionMasterEdition, isSigner: false, isWritable: false },
        { pubkey: collectionUpdateAuthority, isSigner: false, isWritable: false },
        { pubkey: TOKEN_METADATA_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: SPL_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: SPL_ATA_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: SYSVAR_INSTRUCTIONS_ID, isSigner: false, isWritable: false },
        { pubkey: SYSVAR_SLOT_HASHES_ID, isSigner: false, isWritable: false },
      ];

      const mintInstruction = {
        instruction: {
          programId: CANDY_MACHINE_PROGRAM_ID,
          keys: instructionKeys,
          data: MINT_V2_DISCRIMINATOR,
        },
        signers: [nftMint],
        bytesCreatedOnChain: 0,
      };

      const response = await transactionBuilder()
        .add(setComputeUnitLimit(umi, { units: 500_000 }))
        .add(mintInstruction)
        .sendAndConfirm(umi);

      console.log("Mint success:", response.signature);
      setStatus({ type: "success", text: "Mint successful!" });
      await loadBalances(umi, wallet.publicKey);
      await loadCandyMachine(umi);
    } catch (error) {
      console.error("Mint failed", error);
      setStatus({ type: "error", text: `Mint failed: ${error.message || error}` });
    } finally {
      setMinting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", fontWeight: "600" }}>
        Mint NFT Page
      </h1>

      {/* Centered Phantom Wallet Button */}
      <div style={{ marginBottom: "30px" }}>
        <WalletMultiButton />
      </div>

      {wallet.publicKey && (
        <>
          <p>
            <strong>Wallet:</strong> {wallet.publicKey.toBase58()}
          </p>
          <p>
            <strong>SOL Balance:</strong> {solBalance.toFixed(4)} SOL
          </p>
          <p>
            <strong>NFTs Owned:</strong> {nfts.length}
          </p>

          <ul style={{ listStyle: "none", padding: 0, marginTop: "10px", maxWidth: 520, width: "100%" }}>
            {nfts.map((nft) => (
              <li
                key={nft.publicKey.toString()}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  margin: "8px 0",
                  backdropFilter: "blur(2px)",
                }}
              >
                {nft.metadata.name}
              </li>
            ))}
          </ul>

          <button
            onClick={handleMint}
            disabled={minting}
            style={{
              marginTop: "20px",
              padding: "12px 28px",
              background: minting ? "#555" : "#00b894",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: minting ? "not-allowed" : "pointer",
              fontSize: "18px",
              fontWeight: "600",
              transition: "transform 0.15s ease",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {minting ? "Minting..." : "Mint"}
          </button>

          {/* Inline status message below the mint button */}
          {status.text ? (
            <div
              style={{
                marginTop: "12px",
                padding: "10px 14px",
                borderRadius: 8,
                background:
                  status.type === "success"
                    ? "rgba(46, 204, 113, 0.18)"
                    : "rgba(231, 76, 60, 0.18)",
                border:
                  status.type === "success"
                    ? "1px solid rgba(46, 204, 113, 0.5)"
                    : "1px solid rgba(231, 76, 60, 0.5)",
                color: status.type === "success" ? "#2ecc71" : "#e74c3c",
                maxWidth: 520,
                width: "100%",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              {status.text}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
