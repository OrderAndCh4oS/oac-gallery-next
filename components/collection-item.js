import Link from 'next/link'

const CollectionItem = ({objkt}) =>
    <div className="box">
        <Link href={`/objkt/${objkt.id}`} passHref>
            <a>
            <figure>
                <img
                    src={'https://nftstorage.link/ipfs/' + objkt.display_uri.slice(7)}
                    alt={objkt.title}
                />
                <figcaption>{objkt.id}</figcaption>
            </figure>
            </a>
        </Link>
        <div className="xtz">{objkt.price} {objkt.availability}</div>
        <a
            className="ipfs-link"
            href={objkt.artifact_uri}
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
