// check-mint-limit.mjs
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey, string, u8 } from '@metaplex-foundation/umi';
import fs from 'fs';

const umi = createUmi('https://api.devnet.solana.com');
const CANDY_GUARD_ID = publicKey('4QsJYjqNJLTdeKu2mpkhjrcMmMVwueW28bhtz3JZn1tF');
const MINT_LIMIT_ID = 1;

const walletPath = process.argv[2];
if (!walletPath) {
  console.error('❌ Usage: node check-mint-limit.mjs ~/.config/solana/kyc-wallet.json');
  process.exit(1);
}

const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(walletPath, 'utf8')));
const kp = umi.eddsa.createKeypairFromSecretKey(secretKey);
const userPk = kp.publicKey;

// Derive PDA manually
const mintCounterPda = umi.eddsa.findPda(CANDY_GUARD_ID, [
  string({ size: 'variable' }).serialize('mint_limit'),
  CANDY_GUARD_ID.bytes,
  u8().serialize(MINT_LIMIT_ID),
  userPk.bytes,
]);

try {
  const accountInfo = await umi.rpc.getAccount(mintCounterPda[0]);
  if (!accountInfo.exists) {
    console.log('✅ No mint counter found — this wallet hasn’t minted yet.');
  } else {
    const count = accountInfo.data[0];
    console.log(`🧮 Mint counter for ${userPk.toString()}: ${count}`);
  }
} catch (e) {
  console.log('✅ No mint counter found — this wallet hasn’t minted yet.');
}
