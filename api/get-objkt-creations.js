// https://data.objkt.com/v1/graphql

import {gql, request} from 'graphql-request';

const query = gql`
    query GetObjktsPaged($contracts: [String!], $offset: Int!) {
        token(
            limit: 250,
            offset: $offset,
            where: {
                fa2: {live: {_eq: true}},
                fa2_id: {_in: $contracts},
                supply: {_gt:0},
            }
        ) {
            id
            title
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
            response = await request('https://data.objkt.com/v1/graphql',
                query,
                {contracts, offset}
            );
            if(response?.token?.length) {
                objkts.push(...response.token);
            }
            offset += 250;
        } while(response?.token?.length);
        return objkts;
    } catch(e) {
        console.log('Error fetching created objkts');
        return null;
    }
};

export default getObjktCreations;
