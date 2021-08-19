import GallerySection from '../components/gallery-section';
import getGallerySections from '../api/get-gallery-sections';
import { useState } from 'react';

export async function getStaticProps(context) {
    const gallerySections = await getGallerySections();
    console.log(gallerySections)
    return {
        props: {gallerySections},
        revalidate: 300,
    };
}

export default function Home({gallerySections}) {
    const [filteredSections, setFilteredSections] = useState(gallerySections);

    const handleFilter = (event) => {
        const filter = event.target.value;
        const nextFilteredSections = filter === 'for-sale'
            ? gallerySections
                .filter(gs => gs.items.some(i => i.swaps.length))
                .map(gs => ({...gs, items: gs.items.filter(i => i.swaps.length)}))
            : gallerySections;
        setFilteredSections(nextFilteredSections);
    };

    return (
        <>
            <label htmlFor='filter' className='label'>Filter</label>
            <select onChange={handleFilter} className='select' id='filter'>
                <option value={'all'}>All</option>
                <option value={'for-sale'}>For Sale</option>
            </select>
            {filteredSections.map(
                section => <GallerySection key={section.title} section={section}/>)}
        </>
    );
}
