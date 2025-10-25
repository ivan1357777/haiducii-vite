import { Connection, PublicKey } from '@solana/web3.js';

const RPC = process.env.RPC_URL || 'https://api.devnet.solana.com';
const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
);

function metadataPda(mint) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    TOKEN_METADATA_PROGRAM_ID
  )[0];
}

function masterEditionPda(mint) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from('edition'),
    ],
    TOKEN_METADATA_PROGRAM_ID
  )[0];
}

async function main() {
  const mintStr = process.argv[2];
  if (!mintStr) {
    console.error('Usage: node check-collection.mjs <MINT_ADDRESS>');
    process.exit(1);
  }
  const connection = new Connection(RPC, 'confirmed');
  const mint = new PublicKey(mintStr);

  const mdPda = metadataPda(mint);
  const edPda = masterEditionPda(mint);

  const [mdAcc, edAcc] = await connection.getMultipleAccountsInfo([mdPda, edPda]);

  console.log('Mint:', mint.toBase58());
  console.log('Metadata PDA:', mdPda.toBase58(), 'exists =', !!mdAcc);
  console.log('Master Edition PDA:', edPda.toBase58(), 'exists =', !!edAcc);

  if (!mdAcc) {
    console.error('❌ No Metadata account. This is not an NFT.');
    process.exit(2);
  }
  if (!edAcc) {
    console.error('❌ No Master Edition account. This NFT cannot be used as a collection.');
    process.exit(3);
  }
  console.log('✅ Looks like a valid Master Edition NFT (can be used as a collection).');
}

main().catch((e) => {
  console.error('Error:', e);
  process.exit(99);
});
