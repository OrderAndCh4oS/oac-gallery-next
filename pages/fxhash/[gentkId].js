import getFxHashCreatedObjkts from '../../api/get-fxhash-created-objkts';
import getFxHashGenerativeTokenIds
    from '../../api/get-fxhash-generative-token-ids';
import {wallets} from '../../data/wallets';
import FxHashItem from '../../components/fx-hash-item';

export async function getStaticProps({params}) {
    const {gentkId} = params;
    let gentks;
    try {
        gentks = await getFxHashCreatedObjkts(gentkId);
    } catch(e) {
        console.log('Error:', e);
        gentks = [];
    }

    if (!gentks?.length) return {notFound: true}

    return {
        props: {gentks},
        revalidate: 60 * 60 * 72
    };
}

export async function getStaticPaths() {
    const ids = await getFxHashGenerativeTokenIds(wallets[1]);
    const paths = ids.map(gentk => ({
        params: {gentkId: gentk.id.toString()}
    }));

    return {
        paths,
        fallback: false
    };
}

export default function Fxhash({gentks}) {
    return (
        <>
            {gentks.map((gentk, i) => <FxHashItem
                key={`${gentk.title}_${i}`}
                gentk={gentk}
                type={'generative-token'}
            />)}
        </>
    );
}
