import getObjktCreations from '../api/get-objkt-creations';
import ObjktItem from '../components/objkt-item';

export async function getStaticProps(context) {
    try {
        const tubes = await getObjktCreations(['KT1KYjLBbv8oq1WAYJnoefoqEpoxCvWLUseN']);
        const cliffordAttractor = await getObjktCreations(['KT1Mzy98Nfcz2GKRpmTy3GPSTjpRMfQev5ga']);
        return {
            props: {tubes, cliffordAttractor},
            revalidate: 300
        };
    } catch(e) {
        console.log('Error:', e);
    }
    return {notFound: true};
}

export default function Objkt({tubes, cliffordAttractor}) {
    return (
        <>
            <h2>Tubes</h2>
            {tubes.map((objkt, i) => <ObjktItem
                key={`${objkt.title}_${i}`}
                objkt={objkt}
            />)}
            <h2>Clifford Attractor</h2>
            {cliffordAttractor.map((objkt, i) => <ObjktItem
                key={`${objkt.title}_${i}`}
                objkt={objkt}
            />)}
        </>
    );
}
