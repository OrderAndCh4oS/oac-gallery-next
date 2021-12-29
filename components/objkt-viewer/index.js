import styles from './styles.module.css';

const ObjktSwitch = ({objkt}) => {
    switch(objkt.mime) {
        case 'application/x-directory':
            return <iframe
                className={styles.iframe}
                src={'https://orderandchaos.mypinata.cloud/ipfs/' + objkt.artifact_uri.slice(7)}
                sandbox="allow-scripts allow-same-origin"
                allow="accelerometer; camera; gyroscope; microphone; xr-spatial-tracking;"
            />;
        case 'image/png':
            return <div>
                <img
                    className={styles.img}
                    src={'https://orderandchaos.mypinata.cloud/ipfs/' + objkt.artifact_uri.slice(7)}
                    alt={objkt.title}
                />
            </div>;
        default:
            return <p>Not supported</p>;
    }
};

const ObjktViewer = ({objkt}) => {
    return (
        <div className={styles.viewHolder}>
            <ObjktSwitch objkt={objkt}/>
        </div>
    );
};

export default ObjktViewer;
