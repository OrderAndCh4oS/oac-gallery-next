const GalleryItem = ({item}) =>
    <div className="box">
        <a href={`https://hicetnunc.xyz/objkt/${item.id}`}>
            <figure>
                <picture>
                    <source
                        srcSet={`https://d3bhtvw4pec0yx.cloudfront.net/fit-in/800x800/filters:format(webp)/${item.id}.png`}
                        type="image/webp"
                    />
                    <img
                        loading="lazy"
                        src={`https://d3bhtvw4pec0yx.cloudfront.net/fit-in/800x800/${item.id}.png`}
                        alt={`Objkt ${item.id}: ${item.description}`}
                        title={item.title}
                    />
                </picture>
                <figcaption>{item.id}</figcaption>
            </figure>
        </a>
        <div className="xtz">{item.price} {item.availability}</div>
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
