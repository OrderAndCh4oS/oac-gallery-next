import Link from 'next/link';
import styles from './objkt-viewer/styles.module.css';
import Image from 'next/image';

const FxHashItem = ({gentk}) => {
    return <div className="box">
        <Link href={`https://www.fxhash.xyz/gentk/${gentk.id}`} passHref>
            <a>
                <figure>
                    <Image
                        width={600}
                        height={600}
                        className={styles.img}
                        src={'https://ipfs.io/ipfs/' + gentk.metadata.displayUri.slice(7)}
                        alt={gentk.title}
                    />
                    <figcaption>{gentk.id}</figcaption>
                </figure>
            </a>
        </Link>
        <a
            className="ipfs-link"
            href={'https://ipfs.io/ipfs/' + gentk.metadata.artifactUri.slice(7)}
            title="View IPFS"
        >
            <img
                loading="lazy"
                src="https://dwodb1f89mlko.cloudfront.net/icons/external-link-square-regular.svg"
                alt="View on IPFS"
            />
        </a>
    </div>;
};

export default FxHashItem;
