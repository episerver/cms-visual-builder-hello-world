const optimizelyCmsUrl = new URL(`https://${process.env.CMS_URL}` ?? "http://localhost:3000");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GRAPH_SINGLE_KEY: process.env.GRAPH_SINGLE_KEY,
    GRAPH_URL: process.env.GRAPH_URL,
    CMS_URL: process.env.CMS_URL,
  },
  images: {
    remotePatterns: [
      // Allow images from the configured Optimizely CMS URL
      {
        protocol: optimizelyCmsUrl.protocol.replace(":", ""),
        hostname: optimizelyCmsUrl.hostname,
        port: optimizelyCmsUrl.port,
        pathname: "/globalassets/**",
      },
    ],
  },
};

export default nextConfig;
