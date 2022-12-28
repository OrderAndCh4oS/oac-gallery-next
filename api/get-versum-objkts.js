import {gql, request} from 'graphql-request';

const query = gql`query getVersumObjkts($creatorIds: [String!]) {
    tokens(
        where: {
        artist_address: {_in: $creatorIds}
        burned_editions: {_eq: "0"}
        fa2_address: {_eq: "KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW"}
    },
        limit: 1000,
        offset: 0,
        order_by: {token_id: asc}) {
        name
        display_uri
        artifact_uri
        token_id
        lowest_price_listing
        fa2_address
    }
}`;

const variables = {
    creatorIds: [
        'tz1VgpmwW66LCbskjudK54Zp96vKn2cHjpGN',
        'tz1KySTBB8RXWVraggfXWLaLR9H3K3JBEbgt',
        'tz1dAcFB4ApJmwvWxWfZBMgU9omabrjx4gWn',
        'tz1iM7PB4brTmkbTUccsrXYjepSQ6ext7KYu'
    ]
};

const getVersumObjkts = async() => {
    let response = await request('https://api.teztok.com/v1/graphql', query, variables)
    return response.tokens.sort((a, b) => +b.token_id - +a.token_id);
};

export default getVersumObjkts;
