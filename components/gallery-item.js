import Link from 'next/link'

const GalleryItem = ({item}) =>
    <div className="box">
        <Link href={`https://objkt.com/asset/hicetnunc/${item.token_id}`} passHref>
            <a>
            <figure>
                <picture>
                    <source
                        srcSet={`https://d3bhtvw4pec0yx.cloudfront.net/fit-in/800x800/filters:format(webp)/${item.token_id}.png`}
                        type="image/webp"
                    />
                    <img
                        loading="lazy"
                        src={`https://d3bhtvw4pec0yx.cloudfront.net/fit-in/800x800/${item.token_id}.png`}
                        alt={`Objkt ${item.token_id}: ${item.description}`}
                        title={item.title}
                    />
                </picture>
                <figcaption>{item.token_id}</figcaption>
            </figure>
            </a>
        </Link>
        <div className="xtz">{item.lowest_price_listing ? `${item.lowest_price_listing?.price * 0.000001}xtz`: 'SOLD'}</div>
        <a
            className="ipfs-link"
            href={item.artifact_uri}
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

export default GalleryItem;
