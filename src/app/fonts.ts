import localFont from 'next/font/local';

export const ceraPro = localFont({
    src: [
        {
            path: '../static/fonts/CeraPro/CeraPro-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../static/fonts/CeraPro/CeraPro-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../static/fonts/CeraPro/CeraPro-Medium.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../static/fonts/CeraPro/CeraPro-Black.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-cera',
});

export const raleway = localFont({
    src: [
        {
            path: '../static/fonts/Raleway/Raleway-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../static/fonts/Raleway/Raleway-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../static/fonts/Raleway/Raleway-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../static/fonts/Raleway/Raleway-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-raleway',
})

export const bloggerSans  = localFont({
    src: [
        {
            path: '../static/fonts/Bloggersans/Bloggersans-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../static/fonts/Bloggersans/Bloggersans-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../static/fonts/Bloggersans/Bloggersans-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-blog',
});