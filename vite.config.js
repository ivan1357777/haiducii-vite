import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  plugins: [
    react(),
    inject({
      Buffer: ['buffer', 'Buffer'],
      process: 'process',
    }),
  ],
  resolve: {
    alias: {
      process: path.resolve(__dirname, 'node_modules/process/browser.js'),
      buffer: path.resolve(__dirname, 'node_modules/buffer/'),
      stream: path.resolve(__dirname, 'node_modules/stream-browserify'),
      util: path.resolve(__dirname, 'node_modules/util/'),
      events: path.resolve(__dirname, 'node_modules/events/'),
      http: path.resolve(__dirname, 'node_modules/stream-http'),
      https: path.resolve(__dirname, 'node_modules/https-browserify'),
      url: path.resolve(__dirname, 'node_modules/url/'),
      assert: path.resolve(__dirname, 'node_modules/assert/'),
      crypto: path.resolve(__dirname, 'node_modules/crypto-browserify'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@solana/web3.js',
      '@solana/wallet-adapter-react',
      '@solana/wallet-adapter-react-ui',
      '@solana/wallet-adapter-wallets',
      'process',
      'buffer',
      'events',
      'stream-browserify',
      'util',
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  define: {
    global: 'window',
    'process.env': {},
  },
});
