import {gql, request} from 'graphql-request';
import {parseObjktDetailResponse} from './parsers';

const query = gql`
    query ObjktsWithPrice($ownerId: String!, $creatorIds: [String!]) {
        hic_et_nunc_token(where: {
            creator_id: {_in: $creatorIds},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_eq: $ownerId}
            }
        }, order_by: {id: desc}) {
            id
            artifact_uri
            display_uri
            thumbnail_uri
            description
            supply
            swaps(where: {status: {_eq: "0"}, contract_version: {_neq: "1"}}, order_by: {price: asc}) {
                price
            }
            token_holders {
                holder_id
                quantity
            }
        }
    }`;

const variables = (ownerId) => ({
    ownerId,
    creatorIds: [
        'tz1VgpmwW66LCbskjudK54Zp96vKn2cHjpGN',
        'tz1KySTBB8RXWVraggfXWLaLR9H3K3JBEbgt',
        'tz1dAcFB4ApJmwvWxWfZBMgU9omabrjx4gWn',
        'tz1iM7PB4brTmkbTUccsrXYjepSQ6ext7KYu'
    ]
});

const getGallerySectionsByOwner = async(ownerId) => {
    const response = await request(
        'https://api.hicdex.com/v1/graphql',
        query,
        variables(ownerId)
    );
    return parseObjktDetailResponse(response);
};

export default getGallerySectionsByOwner;
