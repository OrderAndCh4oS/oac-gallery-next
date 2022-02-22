// https://data.objkt.com/v1/graphql

import {gql, request} from 'graphql-request';

const query = gql`
    query GetObjktsPaged($wallet: String!, $offset: Int!) {
        token(
            limit: 250,
            offset: $offset,
            where: {
                creators: {creator_address: {_eq: $wallet}},
                fa: {live: {_eq: true}},
                fa_contract: {_eq: "KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS"},
                supply: {_gt: 0},
                flag: {_neq: "removed"}
            },
            order_by: {timestamp: asc}
        ) {
            token_id
            fa_contract
            name
            artifact_uri
            display_uri
            thumbnail_uri
            metadata
        }
    }
`;

const getRaribleCreations = async(wallet) => {
    try {
        const objkts = [];
        let response = null;
        let offset = 0;
        do {
            response = await request('https://data.objkt.com/v2/graphql',
                query,
                {wallet, offset}
            );
            if(response?.token?.length) {
                objkts.push(...response.token);
            }
            offset += 250;
        } while(response?.token?.length);
        return objkts.reverse();
    } catch(e) {
        console.log('Error fetching created objkts');
        return null;
    }
};

export default getRaribleCreations;
