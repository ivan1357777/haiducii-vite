import { readFileSync } from 'fs';
import bs58 from 'bs58';
import { Connection, Keypair, VersionedTransaction, Transaction } from '@solana/web3.js';

const RPC = process.env.RPC || 'https://api.devnet.solana.com';
const keypairPath = process.argv[2] || `${process.env.HOME}/.config/solana/kyc-wallet.json`;
const respPath    = process.argv[3] || '/tmp/mint.json';

// load keypair (supports array JSON, {secretKey}, or base58)
const raw = readFileSync(keypairPath, 'utf8');
let secret;
try {
  const j = JSON.parse(raw);
  if (Array.isArray(j)) secret = Uint8Array.from(j);
  else if (j.secretKey) secret = Uint8Array.from(j.secretKey);
  else secret = Uint8Array.from(bs58.decode(j));
} catch {
  secret = Uint8Array.from(bs58.decode(raw.trim()));
}
const kp = Keypair.fromSecretKey(secret);

// read Shyft response
const resp = JSON.parse(readFileSync(respPath, 'utf8'));
if (!resp.success) { console.error('Mint create failed:', resp); process.exit(1); }
const { encoded_transaction } = resp.result ?? resp;
const buf = Buffer.from(encoded_transaction, 'base64');

// sign (versioned or legacy)
let signed;
try {
  const vtx = VersionedTransaction.deserialize(buf);
  vtx.sign([kp]);
  signed = vtx.serialize();
} catch {
  const ltx = Transaction.from(buf);
  ltx.partialSign(kp);
  signed = ltx.serialize();
}

// send to devnet & confirm
const conn = new Connection(RPC, 'confirmed');
const sig = await conn.sendRawTransaction(signed, { skipPreflight: false, maxRetries: 3 });
console.log('✅ Signature:', sig);
console.log('🔗 https://explorer.solana.com/tx/' + sig + '?cluster=devnet');
await conn.confirmTransaction(sig, 'confirmed');