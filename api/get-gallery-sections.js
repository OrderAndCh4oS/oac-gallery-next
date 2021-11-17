import {gql, request} from 'graphql-request';
import {parseObjktsResponse} from './parsers';

const query = gql`
    query ObjktsWithPrice($creatorIds: [String!], $holderIds: [String!]) {
        hic_et_nunc_token(where: {
            creator_id: {_in: $creatorIds},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_neq: "tz1burnburnburnburnburnburnburjAYjjX"}
            }
        }, order_by: {id: desc}) {
            id
            artifact_uri
            description
            supply
            swaps(where: {status: {_eq: "0"}, contract_version: {_neq: "1"}}, order_by: {price: asc}) {
                price
            }
            token_holders(where: {holder_id: {_in: $holderIds}}) {
                holder_id
                quantity
            }
        }
    }`;

const variables = {
    creatorIds: [
        'tz1VgpmwW66LCbskjudK54Zp96vKn2cHjpGN',
        'tz1KySTBB8RXWVraggfXWLaLR9H3K3JBEbgt',
        'tz1dAcFB4ApJmwvWxWfZBMgU9omabrjx4gWn',
        'tz1iM7PB4brTmkbTUccsrXYjepSQ6ext7KYu'
    ],
    holderIds: [
        'tz1VgpmwW66LCbskjudK54Zp96vKn2cHjpGN',
        'tz1KySTBB8RXWVraggfXWLaLR9H3K3JBEbgt',
        'tz1dAcFB4ApJmwvWxWfZBMgU9omabrjx4gWn',
        'tz1iM7PB4brTmkbTUccsrXYjepSQ6ext7KYu',
        'KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn',
        'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq'
    ]
};

const getGallerySections = async() => {
    const response = await request('https://api.hicdex.com/v1/graphql', query,
        variables);
    return parseObjktsResponse(response);
};

export default getGallerySections;
