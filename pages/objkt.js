import getObjktCreations from '../api/get-objkt-creations';
import ObjktItem from '../components/objkt-item';

export async function getStaticProps(context) {
    let objkts = [];
    try {
        objkts = await getObjktCreations(['KT1KYjLBbv8oq1WAYJnoefoqEpoxCvWLUseN']);
    } catch(e) {
        console.log(e);
    }

    if(!objkts?.length) return {notFound: true};

    return {
        props: {objkts},
        revalidate: 300
    };
}

export default function Objkt({objkts}) {

    return (
        <>
            <h2>Tubes</h2>
            {objkts.map((objkt, i) => <ObjktItem
                key={`${objkt.title}_${i}`}
                objkt={objkt}
            />)}
        </>
    );
}
