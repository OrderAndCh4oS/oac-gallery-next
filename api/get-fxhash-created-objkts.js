import {gql, request} from 'graphql-request';

// https://api.fxhash.xyz/graphiql
const query = gql`
    query Query($id: Float!, $skip: Int!) {
        generativeToken(id: $id) {
            objkts(take: 50, skip: $skip) {
                id
                name
                metadataUri
                metadata
                issuer {
                    author {
                        name
                    }
                }
            }
        }
    }
`;

const getFxHashCreatedObjkts = async(gentkId) => {
    try {
        const gentks = [];
        let response;
        let skip = 0;
        do {
            response = await request(
                'https://api.fxhash.xyz/graphql',
                query,
                {id: Number(gentkId), skip}
            );
            if(response?.generativeToken?.objkts?.length) {
                gentks.push(...response.generativeToken.objkts);
            }
            skip += 50;
        } while(response?.generativeToken?.objkts?.length);
        return gentks;
    } catch(e) {
        console.log('Error fetching created objkts');
        return null;
    }
};

export default getFxHashCreatedObjkts;
