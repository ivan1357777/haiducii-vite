#!/usr/bin/env node
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createSignerFromKeypair,
  keypairIdentity,
  percentAmount,
} from '@metaplex-foundation/umi';
import { Keypair } from '@solana/web3.js';
import fs from 'fs';

// Token Metadata import
import tmPkg from '@metaplex-foundation/mpl-token-metadata';
const { mplTokenMetadata, createNft } = tmPkg;

if (process.argv.length < 6) {
  console.error('Usage: node create-collection.mjs <KEYPAIR> "<NAME>" "<SYMBOL>" "<METADATA_URI>"');
  process.exit(1);
}

const KEYPAIR_PATH = process.argv[2];
const NAME = process.argv[3];
const SYMBOL = process.argv[4];
const URI = process.argv[5];

const RPC = 'https://api.devnet.solana.com';

(async () => {
  try {
    // Load wallet keypair
    const secret = JSON.parse(fs.readFileSync(KEYPAIR_PATH, 'utf8'));
    const umi = createUmi(RPC).use(mplTokenMetadata());
    const authority = createSignerFromKeypair(
      umi,
      umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret))
    );
    umi.use(keypairIdentity(authority));

    // 🆕 Create a new mint keypair manually
    const newMintKeypair = Keypair.generate();
    const mintSigner = createSignerFromKeypair(
      umi,
      umi.eddsa.createKeypairFromSecretKey(new Uint8Array(newMintKeypair.secretKey))
    );

    console.log('🪪 Creating collection NFT...');
    await createNft(umi, {
      mint: mintSigner,
      name: NAME,
      symbol: SYMBOL,
      uri: URI,
      sellerFeeBasisPoints: percentAmount(5, 2), // 5%
      isCollection: true,
      collectionDetails: { __kind: 'V1', size: 0n },
    }).sendAndConfirm(umi);

    const collectionMintAddress = mintSigner.publicKey.toString();
    console.log('✅ Collection NFT created successfully');
    console.log('🧾 Collection Mint:', collectionMintAddress);
    console.log(`🔗 Explorer: https://explorer.solana.com/address/${collectionMintAddress}?cluster=devnet`);
  } catch (e) {
    console.error('❌ Failed to create collection:', e);
    process.exit(1);
  }
})();
