import {wallets} from '../data/wallets';
import FxHashGenerativeToken from '../components/fx-hash-generative-token';
import getFxHashGenerativeTokens from '../api/get-fxhash-generative-tokens';

export async function getStaticProps(context) {
    let gentks;
    try {
        gentks = await getFxHashGenerativeTokens(wallets[1]);
    } catch(e) {
        gentks = [];
    }

    return {
        props: {gentks},
        revalidate: 60 * 60 * 72
    };
}

export default function Fxhash({gentks}) {
    return (
        <>
            <h2>FxHash Generative Tokens</h2>
            {gentks.map((gentk, i) => <FxHashGenerativeToken
                key={`${gentk.title}_${i}`}
                gentk={gentk}
                type={'generative-token'}
            />)}
        </>
    );
}
