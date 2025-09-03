'use client';

import {useEffect} from 'react';

export const SendAnalyticsClient = () => {
    useEffect(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ecommerce: null});

        const obj = {
            event: 'view_item',
            ecommerce: {
                currency: 'UAH',
                value: 11.90,
                items: [
                    {
                        item_id: "132",
                        item_name: "Індивідуальна консультація",
                        affiliation: "Order through Checkout",
                        price: 11.90,
                        quantity: 1
                    },
                ],
            },
        };

        window.dataLayer.push(obj);
    }, []);

    return null;
};
