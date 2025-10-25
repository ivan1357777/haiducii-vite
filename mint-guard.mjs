// mint-guard.mjs
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey, createSignerFromKeypair, keypairIdentity } from '@metaplex-foundation/umi';
import fs from 'fs';

// 🧩 Correct import for candy guard (handles CJS/ESM)
import guardPkg from '@metaplex-foundation/mpl-candy-guard';
const guardPlugin = guardPkg.mplCandyGuard || guardPkg.default || guardPkg;

// 🍬 Candy Machine import
import candyPkg from '@metaplex-foundation/mpl-candy-machine';
const { mintV2 } = candyPkg;

const RPC = 'https://api.devnet.solana.com';
const CANDY_MACHINE_ID = '5aXodkVD7DQT1vxLz4tRYfUmnkTqdxnsvC1u3G4vD1iU';
const CANDY_GUARD_ID   = '4QsJYjqNJLTdeKu2mpkhjrcMmMVwueW28bhtz3JZn1tF';

const WALLET_PATH = process.argv[2];

if (!WALLET_PATH) {
  console.error('❌ Please provide your wallet path');
  console.error('   Example: node mint-guard.mjs ~/.config/solana/kyc-wallet.json');
  process.exit(1);
}

// 🧾 Load keypair
const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(WALLET_PATH, 'utf8')));
const umi = createUmi(RPC);

// 🆕 Register Candy Guard program (works even if it's exported differently)
umi.use(guardPlugin);

const keypair = umi.eddsa.createKeypairFromSecretKey(secretKey);
const signer = createSignerFromKeypair(umi, keypair);
umi.use(keypairIdentity(signer));

(async () => {
  try {
    console.log(`🪙 Minting from Candy Machine: ${CANDY_MACHINE_ID}`);
    console.log(`🧱 Guard ID: ${CANDY_GUARD_ID}`);
    console.log(`👛 Payer: ${signer.publicKey.toString()}`);

    const tx = await mintV2(umi, {
      candyMachine: publicKey(CANDY_MACHINE_ID),
      candyGuard: publicKey(CANDY_GUARD_ID),
      payer: signer,
      minter: signer,
      mintArgs: {},
    }).sendAndConfirm(umi);

    console.log(`✅ Mint succeeded!`);
    console.log(`🧾 Signature: ${tx.signature}`);
    console.log(`🔗 Explorer: https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`);
  } catch (err) {
    console.error('❌ Mint failed:', err);
  }
})();
