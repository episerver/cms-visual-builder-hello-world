/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    env: {
      GRAPH_SINGLE_KEY: process.env.GRAPH_SINGLE_KEY,
    }
};

export default nextConfig;
