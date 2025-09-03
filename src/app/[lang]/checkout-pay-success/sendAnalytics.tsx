'use client';

import {useEffect} from 'react';

type Props = {
    transaction_id: string | null;
};


export const SendAnalyticsClient = ({ transaction_id }: Props) => {
    useEffect(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ecommerce: null});

        const obj = {
            event: "purchase",
            ecommerce: {
                transaction_id: transaction_id,
                affiliation: "Order through Checkout",
                value: 11.90,
                currency: "UAH",
                items: [
                    {
                        item_id: "132",
                        item_name: "Індивідуальна консультація",
                        affiliation: "Order through Checkout",
                        price: 11.90,
                        quantity: 1
                    }
                ]
            }
        }


        window.dataLayer.push(obj);
    }, [transaction_id]);

    return null;
};
