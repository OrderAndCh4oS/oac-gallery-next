import getVersumObjkts from "../api/get-versum-objkts";
import ObjktBox from "../components/objktBox";

export async function getStaticProps(context) {
    try {
        const objkts = await getVersumObjkts(['KT1KYjLBbv8oq1WAYJnoefoqEpoxCvWLUseN']);
        return {
            props: {objkts},
            revalidate: 300
        };
    } catch(e) {
        console.log('Error:', e);
    }
    return {notFound: true};
}

export default function Versum({objkts}) {
    return (
        <>
            <h2>Versum</h2>
            {objkts.map((objkt, i) => <ObjktBox
                key={`${objkt.title}_${i}`}
                objkt={objkt}
            />)}
        </>
    );
}
