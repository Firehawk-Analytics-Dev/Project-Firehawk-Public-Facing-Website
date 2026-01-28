import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from "next";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wcvhhrmvstuwfgpbklks.storage.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withPayload(nextConfig);
