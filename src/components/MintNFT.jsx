// src/components/MintNFT.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle, Coins } from 'lucide-react';

const MintNFT = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState('');
  const [error, setError] = useState('');
  const [nftData, setNftData] = useState(null);

  const handleMint = async () => {
    setIsMinting(true);
    setMintStatus('Initializing mint...');
    setError('');

    try {
      setMintStatus('Creating transaction...');
      
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMintStatus('success');
      setNftData({
        mint: 'SimulatedMintAddress1234567890',
        signature: 'SimulatedSignature1234567890',
        explorerUrl: '#',
      });

    } catch (err) {
      console.error('Minting error:', err);
      setError(err.message || 'Failed to mint NFT');
      setMintStatus('error');
    } finally {
      setIsMinting(false);
    }
  };

  const available = 1000;
  const minted = 250;
  const remaining = available - minted;
  const price = 0.1;

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
              >
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"
                  >
                    <Coins className="w-8 h-8 text-white" />
                  </motion.div>
                  <h1 className="text-3xl font-bold text-white mb-2">Haiduchii NFT Mint</h1>
                  <p className="text-blue-200">Mint your unique Haiduchii Metaverse character</p>
                </div>

                <div className="flex justify-center gap-4 mb-8">
                  <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-pink-600 !rounded-full !px-6 !py-3 !font-semibold" />
                  <WalletDisconnectButton className="!bg-red-600 !rounded-full !px-6 !py-3 !font-semibold" />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-black/20 rounded-2xl p-6 mb-6 border border-white/10"
                >
                  <div className="grid grid-cols-2 gap-4 text-sm text-white">
                    <div>
                      <span className="text-blue-300">Price:</span>
                      <div className="text-lg font-semibold">{price} SOL</div>
                    </div>
                    <div>
                      <span className="text-blue-300">Available:</span>
                      <div className="text-lg font-semibold">{remaining} / {available}</div>
                    </div>
                    <div>
                      <span className="text-blue-300">Minted:</span>
                      <div className="text-lg font-semibold">{minted}</div>
                    </div>
                    <div>
                      <span className="text-blue-300">Network:</span>
                      <div className="text-lg font-semibold">{network}</div>
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMint}
                  disabled={isMinting}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isMinting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {mintStatus}
                    </>
                  ) : (
                    `Mint for ${price} SOL`
                  )}
                </motion.button>

                {mintStatus === 'success' && nftData && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-2xl"
                  >
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Mint Successful!</span>
                    </div>
                    <p className="text-green-200 text-sm">
                      NFT Mint: {nftData.mint.slice(0, 8)}...{nftData.mint.slice(-8)}
                    </p>
                    <a
                      href={nftData.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-200 text-sm underline mt-2 inline-block"
                    >
                      View on Explorer
                    </a>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl"
                  >
                    <div className="flex items-center gap-2 text-red-400">
                      <XCircle className="w-5 h-5" />
                      <span className="font-semibold">Error:</span>
                    </div>
                    <p className="text-red-200 text-sm mt-1">{error}</p>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-2xl text-center"
                >
                  <p className="text-yellow-200 text-sm">
                    Demo Mode: This is a simulation. Connect your wallet to test the UI.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default MintNFT;