import Link from 'next/link'
import styles from './objkt-viewer/styles.module.css';

const CollectionItem = ({gentk}) =>
    <div className="box">
        <Link href={`/objkt/${gentk.id}`} passHref>
            <a>
            <figure>
                <img
                    className={styles.img}
                    src={'https://orderandchaos.mypinata.cloud/ipfs/' + gentk.display_uri.slice(7)}
                    alt={gentk.title}
                />
                <figcaption>{gentk.id}</figcaption>
            </figure>
            </a>
        </Link>
        <div className="xtz">{gentk.price} {gentk.availability}</div>
        <a
            className="ipfs-link"
            href={gentk.artifact_uri}
            title="View IPFS"
        >
            <img
                loading="lazy"
                src="https://dwodb1f89mlko.cloudfront.net/icons/external-link-square-regular.svg"
                alt="View on IPFS"
            />
        </a>
    </div>
;

export default CollectionItem;
