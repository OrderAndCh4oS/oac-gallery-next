// https://data.objkt.com/v1/graphql

import {gql, request} from 'graphql-request';

const query = gql`
    query GetObjktsPaged($contracts: [String!], $offset: Int!) {
        token(
            limit: 250,
            offset: $offset,
            where: {
                fa: {live: {_eq: true}},
                fa_contract: {_in: $contracts},
                supply: {_gt:0},
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

const getObjktCreations = async(contracts) => {
    try {
        const objkts = [];
        let response = null;
        let offset = 0;
        do {
            response = await request('https://data.objkt.com/v2/graphql',
                query,
                {contracts, offset}
            );
            console.log('re', response)
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

export default getObjktCreations;
