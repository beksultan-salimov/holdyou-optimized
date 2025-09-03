import {GoogleTagManager} from '@next/third-parties/google';

export const HeadScripts = () => {
    return (
        <>
            {process.env.NODE_ENV === 'production' && (
                <>
                    <GoogleTagManager gtmId="GTM-W6649SM"/>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Organization",
                                "name": "HoldYou",
                                "url": "https://holdyou.net/",
                                "logo": "https://holdyou.net/favicon.ico",
                                "contactPoint": {
                                    "@type": "ContactPoint",
                                    "telephone": "0800336126",
                                    "contactType": "Customer Support",
                                    "email": "info@holdyou.net"
                                },
                                "sameAs": [
                                    "https://www.facebook.com/holdyouhelp",
                                    "https://www.instagram.com/holdyouhelp"
                                ]
                            })
                        }}
                    />
                </>

            )}
        </>
    );
};
