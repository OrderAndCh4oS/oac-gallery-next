import {gql, request} from 'graphql-request';
import {parseObjktDetailResponse} from './parsers';

const query = gql`
    query GetObjktWithPrice($creatorIds: [String!], $holderIds: [String!], $objktId: bigint!) {
        hic_et_nunc_token(where: {
            creator_id: {_in: $creatorIds},
            id: {_eq: $objktId},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_neq: "tz1burnburnburnburnburnburnburjAYjjX"}
            }
        }, order_by: {id: desc}) {
            id
            title
            description
            token_tags {
                tag {
                    tag
                }
            }
            artifact_uri
            supply
            mime
            swaps(where: {status: {_eq: "0"}, contract_version: {_neq: "1"}}, order_by: {price: asc}) {
                id
                price
                amount
                amount_left
                creator_id
            }
            token_holders(where: {holder_id: {_in: $holderIds}}) {
                holder_id
                quantity
            }
        }
    }`;

const variables = (objktId) => ({
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
    ],
    objktId
});

const getObjkt = async(objktId) => {
    const response = await request('https://api.hicdex.com/v1/graphql', query,
        variables(objktId));
    return parseObjktDetailResponse(response);
};

export default getObjkt;
