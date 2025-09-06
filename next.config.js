/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    poweredByHeader: false,
    compress: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: process.env.NEXT_SERVER_PROTOCOL,
                hostname: process.env.NEXT_SERVER_DOMAIN,
                port: '',
                pathname: '/media/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/media/**',
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    async headers() {
        return [
            {
                source: '/revalidate',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET' },
                ],
            },
            {
                source: '/:lang(ru|uk)/psychologists/:id*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, s-maxage=2592000, stale-while-revalidate=59',
                    },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NEXT_SERVER_URL + '/api/:path*', // Proxy to Backend
            },
            {
                source: '/media/:path*',
                destination: process.env.NEXT_SERVER_URL + '/media/:path*',
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/:path*(\\\\/\\\\/\\\\/+)',
                destination: '/:path',
                permanent: true,
                has: [],
            },
            {
                source: '/:path*/index.html',
                destination: '/:path*',
                permanent: true,
            },
            {
                source: '/:path*/index.php',
                destination: '/:path*',
                permanent: true,
            },
            {
                source: '/:path*/home.html',
                destination: '/:path*',
                permanent: true,
            },
            {
                source: '/page/psycholog',
                destination: '/',
                permanent: true,
            },
            {
                source: '/ru/page/psycholog',
                destination: '/ru',
                permanent: true,
            },
        ];
    },
};

module.exports = withBundleAnalyzer(nextConfig);