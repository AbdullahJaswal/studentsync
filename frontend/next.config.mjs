/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CLIENT_URL: process.env.NEXT_PUBLIC_API_URL,
    },
};

export default nextConfig;
