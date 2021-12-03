import {createContext, useEffect, useState} from 'react';
import {TezosToolkit} from '@taquito/taquito';
import {BeaconWallet} from '@taquito/beacon-wallet';

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');
const wallet = new BeaconWallet({
    name: 'Order & Chaos Gallery',
    preferredNetwork: 'mainnet'
});

const network = {
    type: 'mainnet',
    rpcUrl: 'https://mainnet.api.tez.ie'
};
Tezos.setWalletProvider(wallet);

export const TezosContext = createContext({
    Tezos,
    user: null,
    sync: null,
    unsync: null
});

const TezosProvider = ({children}) => {
    const [auth, setAuth] = useState(null);

    const sync = async() => {
        await wallet.requestPermissions({network});
        const account = await wallet.client.getActiveAccount();
        const address = await wallet.getPKH();
        setAuth({
            address,
            account,
            wallet
        });
    };

    const unsync = async() => {
        await wallet.client.clearActiveAccount();
        setAuth(null);
    };

    useEffect(() => {
        (async() => {
            const account = await wallet.client.getActiveAccount();
            if(!account) return;
            const address = await wallet.getPKH();
            setAuth({
                address,
                account,
                wallet
            });
        })();
    }, []);

    return (
        <TezosContext.Provider
            value={{
                Tezos,
                auth,
                sync,
                unsync
            }}
        >
            {children}
        </TezosContext.Provider>
    );
};

export default TezosProvider;
