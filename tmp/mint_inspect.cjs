const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { generateSigner, keypairIdentity, publicKey, some } = require('@metaplex-foundation/umi');
const { mplCandyMachine, mintV2 } = require('@metaplex-foundation/mpl-candy-machine');

(async () => {
  const umi = createUmi('https://api.devnet.solana.com').use(mplCandyMachine());
  const wallet = generateSigner(umi);
  umi.use(keypairIdentity(wallet));

  const nftMint = generateSigner(umi);
  const candyMachinePk = publicKey('3zeudKH2WVEpwMkf1WJ4DX9uPTr4jrYkDc27h21tKLxy');
  const guardPk = publicKey('CJVCcd6cNtZsaQrRWQdhinmy4JizFPFf2vXpV4g3hnY7');
  const collectionMintPk = publicKey('JAybd4uSKgJdZXmZ8W8DQt1orSv5dFQ6fJjyLe8y6GmX');
  const collectionUpdateAuthority = publicKey('9KNv9N27cUbmydp7A93Ztib8h3493rxjcBsa3eQDMTKP');

  const builder = mintV2(umi, {
    candyMachine: candyMachinePk,
    candyGuard: guardPk,
    nftMint,
    collectionMint: collectionMintPk,
    collectionUpdateAuthority,
    payer: wallet,
    minter: wallet,
    mintArgs: { mintLimit: some({ id: 1 }) }
  });

  builder.items.forEach((item, instIndex) => {
    console.log('Instruction #', instIndex, 'program', item.instruction.programId.toString());
    item.instruction.keys.forEach((key, idx) => {
      console.log(idx, key.pubkey.toString(), 'signer', key.isSigner, 'writable', key.isWritable);
    });
    if (item.remainingAccounts?.length) {
      console.log('Remaining accounts:');
      item.remainingAccounts.forEach((acc, idx) => {
        console.log('  rem', idx, acc.pubkey?.toString());
      });
    }
  });
})();
