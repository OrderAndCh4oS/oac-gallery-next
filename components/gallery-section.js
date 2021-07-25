import GalleryItem from './gallery-item';

const GallerySection = ({section}) =>
    <section>
        <h2>{section.title}</h2>
        <div className="row">
            {section.items.map(item => <GalleryItem item={item} />)}
        </div>
    </section>;

export default GallerySection;