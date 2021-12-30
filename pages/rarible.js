import {wallets} from '../data/wallets';
import getRaribleCreations from '../api/get-rarible-creations';
import RaribleItem from '../components/rarible-item';

export async function getStaticProps(context) {
    try {
        const cables = await getRaribleCreations(wallets[1]);
        return {
            props: {cables},
            revalidate: 300
        };
    } catch(e) {
        console.log('Error:', e);
    }
    return {notFound: true};
}

export default function Rarible({cables}) {
    return (
        <>
            <h2>Cables</h2>
            {cables.map((objkt, i) => <RaribleItem
                key={`${objkt.title}_${i}`}
                objkt={objkt}
            />)}
        </>
    );
}
