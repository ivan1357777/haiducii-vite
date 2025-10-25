// mint.mjs
import fs from "fs";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  publicKey,
  some,
  generateSigner,
  createSignerFromKeypair,
  signerIdentity,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import {
  // ✅ plugin + CM helpers come from mpl-candy-machine (not mpl-candy-guard)
  mplCandyMachine,
  mplCandyGuard,
  fetchCandyMachine,
  mintV2,
} from "@metaplex-foundation/mpl-candy-machine";
import { fetchMetadata, findMetadataPda } from "@metaplex-foundation/mpl-token-metadata";

// --- tiny argv parser ---
const argv = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.split("=");
    return [k.replace(/^--/, ""), rest.join("=") || true];
  })
);

function need(name) {
  const v = argv[name];
  if (!v || v === true) {
    throw new Error(
      `Missing --${name}. Usage:
node mint.mjs --cm=<CM_ADDR> --guard=<GUARD_PDA> --keypair=<ABS_PATH> [--id=1] [--rpc=https://api.devnet.solana.com] [--group=mylabel]`
    );
  }
  return v;
}

async function main() {
  const rpc = argv.rpc || "https://api.devnet.solana.com";
  const cmAddr = need("cm");
  const guardAddr = need("guard");
  const keypairPath = need("keypair");
  const mintLimitId = argv.id ? Number(argv.id) : undefined;
  const groupLabel = argv.group || null;

  // 🔧 Umi + plugins
  const umi = createUmi(rpc)
    .use(mplCandyMachine())   // CM plugin
    .use(mplCandyGuard());    // Guard plugin

  // (Belt & suspenders) register program id so repo lookup always succeeds
  umi.programs.add({
    name: "mplCandyGuard",
    publicKey: publicKey("Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g"),
    isOnCluster: () => true,
  });

  // 🔑 Load signer
  const secret = JSON.parse(fs.readFileSync(keypairPath, "utf8"));
  const kp = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
  const signer = createSignerFromKeypair(umi, kp);
  umi.use(signerIdentity(signer));

  console.log("🧭 Fetching Candy Machine...");
  const cm = await fetchCandyMachine(umi, publicKey(cmAddr));
  console.log("ℹ️  CM:", cm.publicKey.toString());

  // Resolve collection update authority from metadata PDA to avoid mismatch errors
  const metadataPda = findMetadataPda(umi, { mint: cm.collectionMint });
  const metadata = await fetchMetadata(umi, metadataPda);
  const collectionUpdateAuthority = metadata.updateAuthority;

  // Fresh mint address
  const nftMint = generateSigner(umi);

  // Only include guard args you actually configured.
  // (Your guards.json uses mintLimit id=1; solPayment needs no mintArgs.)
  const mintArgs = {};
  if (typeof mintLimitId === "number") {
    mintArgs.mintLimit = some({ id: mintLimitId });
  }

  console.log("🔨 Building mint transaction (via Candy Guard)...");
  const txb = transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
    .add(
      mintV2(umi, {
        candyMachine: cm.publicKey,
        candyGuard: publicKey(guardAddr),
        nftMint,
        collectionMint: cm.collectionMint,
        collectionUpdateAuthority,
        tokenStandard: cm.tokenStandard,
        group: groupLabel, // null if you didn't define groups
        mintArgs,
      })
    );

  console.log("🚀 Sending...");
  const { signature } = await txb.sendAndConfirm(umi);
  console.log("✅ Minted!");
  console.log("Mint:", nftMint.publicKey.toString());
  console.log("Tx  :", signature);
}

main().catch((e) => {
  console.error("❌ Mint failed:", e);
  process.exit(1);
});
