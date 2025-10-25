// src/pages/Mint/index.js
import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// ✅ Umi + plugins
import { createUmi, generateSigner, publicKey } from "@metaplex-foundation/umi";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplCandyMachine, fetchCandyMachine, mintV2 } from "@metaplex-foundation/mpl-candy-machine";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

const CANDY_MACHINE_ID = "CvG4ypviQ1iQ2VMT7JC149YBxiNZADCNcr4ddkPdYhJn"; // ✅ your latest candy machine

const MintPage = () => {
  const wallet = useWallet();
  const [status, setStatus] = useState("");

  const handleMint = async () => {
    if (!wallet.connected) {
      setStatus("⚠️ Please connect your wallet first.");
      return;
    }

    try {
      setStatus("⏳ Minting in progress...");

      // 1️⃣ Setup Umi with Candy Machine + Token Metadata + wallet
      const umi = createUmi(clusterApiUrl("devnet"))
        .use(walletAdapterIdentity(wallet))
        .use(mplCandyMachine())
        .use(mplTokenMetadata());

      // 2️⃣ Fetch the Candy Machine account
      const candyMachine = await fetchCandyMachine(
        umi,
        publicKey(CANDY_MACHINE_ID)
      );

      // 3️⃣ Generate a new signer for the NFT mint
      const nftMint = generateSigner(umi);

      // 4️⃣ Mint from Candy Machine
      await mintV2(umi, {
        candyMachine: candyMachine.publicKey,
        nftMint,
        collectionMint: candyMachine.collectionMint,
        collectionUpdateAuthority: candyMachine.authority,
      }).sendAndConfirm(umi);

      setStatus(`✅ Mint successful! NFT Mint: ${nftMint.publicKey}`);
      console.log("NFT Mint Address:", nftMint.publicKey.toString());
    } catch (err) {
      console.error("Mint failed:", err);
      setStatus("❌ Mint failed. Check console for details.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Mint Your NFT</h1>
      <WalletMultiButton />
      <br />
      <button
        onClick={handleMint}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Mint NFT
      </button>
      <p>{status}</p>
    </div>
  );
};

export default MintPage;
