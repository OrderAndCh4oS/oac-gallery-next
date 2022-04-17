import Link from 'next/link'
import styles from './objkt-viewer/styles.module.css';
import Image from 'next/image';

const ObjktItem = ({objkt}) =>
    <div className="box">
        <Link href={`https://objkt.com/asset/${objkt.fa_contract}/${objkt.token_id}`} passHref>
            <a>
                <figure>
                    <Image
                        width={600}
                        height={600}
                        className={styles.img}
                        src={'https://ipfs.io/ipfs/' + objkt.display_uri.slice(7)}
                        alt={objkt.title}
                    />
                    <figcaption>{objkt.token_id}</figcaption>
                </figure>
            </a>
        </Link>
        <a
            className="ipfs-link"
            href={'https://ipfs.io/ipfs/' + objkt.artifact_uri.slice(7)}
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

export default ObjktItem;
