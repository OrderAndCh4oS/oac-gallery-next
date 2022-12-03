import galleryData from '../data/gallery-data';

const reduceObjkt = (obj, objkt) => {
    return {...obj, [objkt.token_id]: objkt};
};

export const parseObjktsResponse = (response) => {
    let parsedResponse = response?.tokens.reduce(reduceObjkt, {}) || {};
    return galleryData.map(({title, items}) => ({
        title,
        items: items.map(id => (parsedResponse?.[id] ?? null))
    }))
}
