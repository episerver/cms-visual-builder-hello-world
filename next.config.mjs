/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    env: {
      GRAPH_SINGLE_KEY: process.env.GRAPH_SINGLE_KEY,
      GRAPH_URL: process.env.GRAPH_URL,
      CMS_URL: process.env.CMS_URL,
    }
};

export default nextConfig;
