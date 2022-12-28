import Link from 'next/link';
import Image from 'next/image';

const FxHashItem = ({gentk}) => {
    return <div className="box">
        <Link href={`https://www.fxhash.xyz/gentk/${gentk.id}`} passHref>
            <a>
                <figure>
                    <Image
                        width={600}
                        height={600}
                        src={'https://nftstorage.link/ipfs/' + gentk.metadata.displayUri.slice(7)}
                        alt={gentk.title}
                    />
                    <figcaption>{gentk.id}</figcaption>
                </figure>
            </a>
        </Link>
        <a
            className="ipfs-link"
            href={'https://nftstorage.link/ipfs/' + gentk.metadata.artifactUri.slice(7)}
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
