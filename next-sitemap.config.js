/** @type {import('next-sitemap').IConfig} */

function ignorePath(path) {
    const ignoreList = ['checkout-gtm-success'];
    let res = false
    ignoreList.forEach((i) => {
        if (path.includes(i)) {
            res = true
        }
    });
    return res
}

module.exports = {
    siteUrl: process.env.NEXT_SERVER_URL,
    transform: async (config, path) => {
        let _path = path
        const defaultLng = process.env.NEXT_PUBLIC_DEFAULT_LANG;
        if (ignorePath(path)) {
            return null;
        }

        if (path.startsWith(`/${defaultLng}/`) || path.endsWith(`/${defaultLng}`)) {
            _path = path.replace(`/${defaultLng}`, '/').replace('//', '/');
        }

        return {
            loc: _path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        };
    },
    generateRobotsTxt: true,
    exclude: [
        '/uk/cabinet',
        '/ru/cabinet',
        '/uk/404',
        '/ru/404',
        '/uk/cabinet/*',
        '/ru/cabinet/*',
        '/api/*',
        '*/checkout-pay-success',
        '/server-sitemap.xml',
    ],
    robotsTxtOptions: {
        transformRobotsTxt: async (_, robotsTxt) => {
            const withoutHost = robotsTxt.replace(
                `# Host\nHost: ${process.env.NEXT_SERVER_URL}\n\n`,
                "",
            );

            return withoutHost;
        },
        policies: [
            {
                userAgent: '*',
                allow: ['/*.js$', '/*.css$'],
                disallow: ['/uk/cabinet/', '/ru/cabinet/', '/api/'],
            },
        ],
        additionalSitemaps: [process.env.NEXT_SERVER_URL + '/sitemap.xml'],
    },
};
