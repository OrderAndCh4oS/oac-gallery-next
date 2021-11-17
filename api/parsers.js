import galleryData from '../data/gallery-data';

function parseObjkt(objkt) {
    const supply = objkt.supply;
    const available = objkt.token_holders.reduce((sum, th) => sum + th.quantity,
        0);
    const notForSaleText = available === 0 ? 'SOLD' : 'NOT LISTED';
    const price = objkt.swaps.length ? +(objkt.swaps[0].price *
        0.000001).toFixed(2) + 'xtz' : notForSaleText;
    const availability = `${available}/${supply}`;
    return {price, availability};
}

const reduceObjkt = (obj, objkt) => {
    const {price, availability} = parseObjkt(objkt);

    return {...obj, [objkt.id]: {...objkt, price, availability}};
};

export const parseObjktsResponse = (response) => {
    let parsedResponse = response?.hic_et_nunc_token.reduce(reduceObjkt, {}) || {};
    return galleryData.map(({title, items}) => ({title, items: items.map(id => (parsedResponse[id]))}))
}

export const parseObjktDetailResponse = (response) => {
    return response?.hic_et_nunc_token.map(objkt => ({...objkt, ...parseObjkt(objkt)}))
}

