import {gql, request} from 'graphql-request';
import {parseObjktsResponse} from './parsers';

const query = gql`query getObjkts($creatorIds: [String!]) {
    tokens(where: {
        artist_address: {_in: $creatorIds}
        burned_editions: {_eq: "0"}
        name: {_nilike: "Drone Squadron: Elite%"}
        fa2_address: {_eq: "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton"}
    },
        limit: 1000,
        offset: 0,
        order_by: {token_id: asc}) {
        name
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

const getGallerySections = async() => {
    const response = await request('https://api.teztok.com/v1/graphql', query, variables);
    return parseObjktsResponse(response);
};

export default getGallerySections;
