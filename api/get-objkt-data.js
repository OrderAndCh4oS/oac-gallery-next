import { gql, request } from 'graphql-request';

const query = gql`
    query ObjktsWithPrice($addresses: [String!]) {
        hic_et_nunc_token(where: {
            creator_id: {_in: $addresses},
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
            token_holders(where: {holder_id: {_in: $addresses}}) {
                holder_id
                quantity
            }
        }
    }`;

const variables = {
    'addresses': [
        'tz1VgpmwW66LCbskjudK54Zp96vKn2cHjpGN',
        'tz1KySTBB8RXWVraggfXWLaLR9H3K3JBEbgt',
        'KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn',
        'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq',
    ],
};

function parseData(obj, objkt) {
    const supply = objkt.supply;
    const available = objkt.token_holders.reduce((sum, th) => sum + th.quantity, 0);
    const notForSaleText = available === 0 ? 'SOLD' : 'NOT LISTED';
    const price = objkt.swaps.length ? (objkt.swaps[0].price * 0.000001) + 'xtz' : notForSaleText;
    const availability = `${available}/${supply}`;

    return {...obj, [objkt.id]: {...objkt, price, availability}};
}

const getObjktData = async() => {
    const response = await request('https://api.hicdex.com/v1/graphql', query, variables);
    return response?.hic_et_nunc_token.reduce(parseData, {}) || {};
};

export default getObjktData;
