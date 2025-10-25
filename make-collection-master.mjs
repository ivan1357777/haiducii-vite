#!/usr/bin/env node
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createSignerFromKeypair,
  keypairIdentity,
} from '@metaplex-foundation/umi';
import fs from 'fs';

// Import the Token Metadata SDK (CommonJS default)
import tmPkg from '@metaplex-foundation/mpl-token-metadata';
const {
  mplTokenMetadata,
  createMasterEdition,
  createMasterEditionV3,
} = tmPkg;

if (process.argv.length < 4) {
  console.error('Usage: node make-collection-master.mjs <KEYPAIR> <COLLECTION_MINT>');
  process.exit(1);
}

const KEYPAIR_PATH = process.argv[2];
const MINT = process.argv[3].trim();
const RPC = 'https://api.devnet.solana.com';

(async () => {
  try {
    const secret = JSON.parse(fs.readFileSync(KEYPAIR_PATH, 'utf8'));
    const umi = createUmi(RPC).use(mplTokenMetadata());
    const authority = createSignerFromKeypair(
      umi,
      umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret))
    );
    umi.use(keypairIdentity(authority));

    console.log('🔧 Making Master Edition for mint:', MINT);

    if (typeof createMasterEdition === 'function') {
      const tx = await createMasterEdition(umi, {
        mint: { publicKey: MINT },
        maxSupply: 0n,
      }).sendAndConfirm(umi);
      console.log('✅ Master Edition created:', tx.signature);
    } else if (typeof createMasterEditionV3 === 'function') {
      const tx = await createMasterEditionV3(umi, {
        mint: { publicKey: MINT },
        maxSupply: 0n,
      }).sendAndConfirm(umi);
      console.log('✅ Master Edition created:', tx.signature);
    } else {
      throw new Error('❌ No compatible createMasterEdition function found');
    }
  } catch (e) {
    console.error('❌ Failed to make Master Edition:', e);
    process.exit(1);
  }
})();
