'use client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from '@/store';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    const [persistor, setPersistor] = useState<any>(null);

    useEffect(() => {
        setIsClient(true);
        setPersistor(persistStore(store));
    }, []);

    if (!isClient || !persistor) return null;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
