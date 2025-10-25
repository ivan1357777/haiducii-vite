// mint-direct.mjs  (your project is ESM; this works as .mjs or .js)
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  publicKey, createSignerFromKeypair, keypairIdentity,
  some, generateSigner, transactionBuilder
} from '@metaplex-foundation/umi';
import fs from 'fs';
import { createRequire } from 'module';

// Try to load mpl-toolbox (optional). If missing, we’ll just skip CU bump.
let setComputeUnitLimit = null;
try {
  const toolbox = await import('@metaplex-foundation/mpl-toolbox');
  setComputeUnitLimit = toolbox.setComputeUnitLimit;
} catch { /* ok to skip */ }

// ---- YOUR CURRENT DEPLOY (from `sugar show`) ----
const RPC = 'https://api.devnet.solana.com';
const CANDY_MACHINE_ID = 'HVPnFKuFBoV2XfSfBCtL3n2hqWwCdsWCarjFbACTiyrJ';
const CANDY_GUARD_ID   = 'DaG56sx7RonsptKNP9mmQwXfmEvvdUUNWfyGi2mjdcgd';
const COLLECTION_MINT  = '2157TAqxXTN5vfLUoceCmUoRf2K2yC6ykJ1C4pVxq9uW';

// CLI: node mint-direct.mjs ~/.config/solana/kyc-wallet.json
const WALLET_PATH = process.argv[2];
if (!WALLET_PATH) {
  console.error('❌ Usage: node mint-direct.mjs ~/.config/solana/kyc-wallet.json');
  process.exit(1);
}

// Robustly load CJS modules in an ESM app
const require = createRequire(import.meta.url);
const cmMod = require('@metaplex-foundation/mpl-candy-machine'); // CJS exports
const cgMod = require('@metaplex-foundation/mpl-candy-guard');   // CJS exports

// Get plugin factories + mintV2 regardless of export shape
const cmFactory =
  cmMod?.mplCandyMachine || cmMod?.default?.mplCandyMachine || (typeof cmMod === 'function' ? cmMod : null);
const cgFactory =
  cgMod?.mplCandyGuard || cgMod?.default?.mplCandyGuard || (typeof cgMod === 'function' ? cgMod : null);
const mintV2 =
  cmMod?.mintV2 || cmMod?.default?.mintV2;

if (!cmFactory || !cgFactory || !mintV2) {
  console.error('❌ Could not resolve Candy Machine/Guard plugins or mintV2 from installed packages.');
  process.exit(1);
}

(async () => {
  try {
    // signer + Umi
    const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(WALLET_PATH, 'utf8')));
    const umi = createUmi(RPC);

    // ✅ Register BOTH plugins so guard accounts + programs are known
    const cmPlugin = typeof cmFactory === 'function' ? cmFactory() : cmFactory;
    const cgPlugin = typeof cgFactory === 'function' ? cgFactory() : cgFactory;
    umi.use(cgPlugin);
    umi.use(cmPlugin);

    const kp = umi.eddsa.createKeypairFromSecretKey(secretKey);
    const signer = createSignerFromKeypair(umi, kp);
    umi.use(keypairIdentity(signer));

    // Explicit NFT mint + precomputed keys (prevents undefined → publicKey() crashes)
    const nftMint = generateSigner(umi);
    const cmPk = publicKey(CANDY_MACHINE_ID);
    const cgPk = publicKey(CANDY_GUARD_ID);
    const collectionPk = publicKey(COLLECTION_MINT);
    const collectionUpdateAuthPk = signer.publicKey; // PublicKey (not Signer)

    console.log(`🍬 Candy Machine: ${cmPk}`);
    console.log(`🛡  Candy Guard:  ${cgPk}`);
    console.log(`🏷  Collection:   ${collectionPk}`);
    console.log(`👤 Minter:        ${signer.publicKey}`);

    // Build transaction
    let builder = transactionBuilder();
    if (setComputeUnitLimit) {
      builder = builder.add(setComputeUnitLimit(umi, { units: 800_000 }));
    }

    builder = builder.add(
      mintV2(umi, {
        candyMachine: cmPk,
        candyGuard: cgPk,
        nftMint,
        collectionMint: collectionPk,
        collectionUpdateAuthority: collectionUpdateAuthPk,
        payer: signer,
        minter: signer,
        // Guards: solPayment needs NO args; mintLimit needs id
        mintArgs: { mintLimit: some({ id: 1 }) },
      })
    );

    const res = await builder.sendAndConfirm(umi);
    console.log('✅ Mint succeeded!');
    console.log(`🧾 Signature: ${res.signature}`);
    console.log(`🔗 https://explorer.solana.com/tx/${res.signature}?cluster=devnet`);
  } catch (err) {
    console.error('❌ Mint failed:', err);
  }
})();
