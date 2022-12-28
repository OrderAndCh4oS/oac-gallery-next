import Link from 'next/link'
import Image from 'next/image';

const ObjktBox = ({objkt}) =>
    <div className="box">
        <Link href={`https://objkt.com/asset/${objkt.fa2_address}/${objkt.token_id}`} passHref>
            <a>
                <figure>
                    <Image
                        width={600}
                        height={600}
                        src={'https://nftstorage.link/ipfs/' + objkt.display_uri.slice(7)}
                        alt={objkt.title}
                    />
                    <figcaption>{objkt.token_id}</figcaption>
                </figure>
            </a>
        </Link>
        <div className="xtz">{objkt.lowest_price_listing ? `${objkt.lowest_price_listing?.price * 0.000001}xtz`: 'SOLD'}</div>
        <a
            className="ipfs-link"
            href={'https://nftstorage.link/ipfs/' + objkt.artifact_uri.slice(7)}
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

export default ObjktBox;
