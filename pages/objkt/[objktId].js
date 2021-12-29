import Link from 'next/link';
import getObjkt from '../../api/get-objkt';
import mutezToXtz from '../../utilities/mutez-to-xtz';
import ObjktViewer from '../../components/objkt-viewer';
import useTools from '../../hooks/use-tools';
import useTezos from '../../hooks/use-tezos';
import {useState} from 'react';
import styles from './styles.module.css';

export async function getServerSideProps({params}) {
    const {objktId} = params;
    const objkts = await getObjkt(objktId);
    if(!objkts.length) return {notFound: true};

    return {
        props: {initialObjkt: objkts[0]}
    };
}

export default function Objkt({initialObjkt}) {
    const [transactionStatus, setTransactionStatus] = useState(null);
    const [objkt, setObjkt] = useState(initialObjkt);
    const {auth} = useTezos();
    const {collect} = useTools();

    const handleCollect = (swapId, xtzAmount) => async() => {
        setTransactionStatus('Transaction in progress…');
        const isSuccessful = await collect(swapId, xtzAmount);
        setTransactionStatus(isSuccessful ? 'Purchase Successful' : 'Failed');
        if(!isSuccessful) return;
        setObjkt(prevState => ({
                ...prevState,
                swaps: prevState.swaps.reduce((arr, s) => {
                    const newS = {...s};
                    if(newS.id === swapId) {
                        newS.amount_left = newS.amount_left - 1;
                    }
                    if(newS.amount_left <= 0) return arr;
                    return arr.concat(newS);
                }, [])
            }
        ));
        setTimeout(() => {
            setTransactionStatus(null);
        }, 2000);
    };

    const handleCloseToast = () => {
        setTransactionStatus(null);
    };

    return (
        <article>
            <Link href="/">Back</Link>
            <ObjktViewer objkt={objkt}/>
            <div className={styles.metadata}>
                <h1>{objkt.title}</h1>
                <p>Editions: {objkt.availability}</p>
                <p>{objkt.description}</p>
                <p>Tags: {objkt.token_tags.map(tag => (tag.tag.tag))
                    .join(', ')}</p>
                <p>Mimetype: {objkt.mime}</p>
                <p>IPFS: <a
                    href={'https://ipfs.io/ipfs/' + objkt.artifact_uri.slice(7)}
                >
                    {'https://ipfs.io/ipfs/' + objkt.artifact_uri.slice(7)}
                </a></p>
            </div>
            {objkt.swaps.length ? (
                <>
                    <h2>Swaps</h2>
                    <ul className={styles.swapList}>
                        {objkt.swaps.map((swap, i) => (
                            <li key={swap.id} className={styles.swapListItem}>
                                <p>Price: {mutezToXtz(swap.price)}xtz
                                   Available: {swap.amount_left}/{swap.amount}<br/>Listed
                                   By: {swap.creator_id}
                                </p>
                                {auth && <p>
                                    <button
                                        onClick={handleCollect(swap.id,
                                            swap.price)}
                                    >Collect
                                    </button>
                                </p>}
                            </li>
                        ))}
                    </ul>
                </>
            ) : null}
            {transactionStatus && (
                <div className={styles.toast}>
                    <p className={styles.toastText}>{transactionStatus}</p>
                    <button onClick={handleCloseToast}>Close</button>
                </div>
            )}
        </article>
    );
}
