import GalleryItem from './gallery-item';

const GallerySection = ({section}) =>
    <section>
        <h2>{section.title}</h2>
        <div className="row">
            {section.items.map(item => <>{item ? <GalleryItem key={item.token_id} item={item} /> : null}</>)}
        </div>
    </section>;

export default GallerySection;
