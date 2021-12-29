import GallerySection from '../components/gallery-section';
import getGallerySections from '../api/get-gallery-sections';
import {createRef, useState} from 'react';
import styles from './styles.module.css';

export async function getStaticProps(context) {
    const gallerySections = await getGallerySections();

    return {
        props: {gallerySections},
        revalidate: 300
    };
}

function filterSections(filter, gallerySections) {
    return filter === 'for-sale'
        ? gallerySections
            .filter(gs => gs.items.some(i => i.swaps.length))
            .map(gs => ({...gs, items: gs.items.filter(i => i.swaps.length)}))
        : gallerySections;
}

function sortSections(sort, filteredSections) {
    return filteredSections.map(fs => ({
        ...fs,
        items: fs.items.sort((a, b) => {
            let minA = Math.min(...a.swaps.map(swap => swap.price));
            let minB = Math.min(...b.swaps.map(swap => swap.price));
            return sort === 'low-to-high' ? minA - minB : minB - minA;
        })
    }));
}

export default function Home({gallerySections}) {
    const [sections, setSections] = useState(gallerySections);
    const filterRef = createRef();
    const sortRef = createRef();

    const handleChange = () => {
        const filter = filterRef.current.value;
        const sort = sortRef.current.value;
        let nextSections = filterSections(filter, [...gallerySections]);
        if(sort !== 'none') {
            nextSections = sortSections(sort, nextSections);
        }
        setSections(nextSections);
    };

    return (
        <>
            <div className={styles.filterBar}>
                <div>
                    <label htmlFor="filter" className="label">Filter</label>
                    <select
                        onChange={handleChange}
                        className="select"
                        id="filter"
                        ref={filterRef}
                    >
                        <option value={'all'}>All</option>
                        <option value={'for-sale'}>For Sale</option>
                    </select>
                </div>
                <div className={styles.marginLeft}>
                    <label htmlFor="sort" className="label">Sort (per collection)</label>
                    <select
                        onChange={handleChange}
                        className="select"
                        id="sort"
                        ref={sortRef}
                    >
                        <option value={'none'}>None</option>
                        <option value={'low-to-high'}>Low to High</option>
                        <option value={'high-to-low'}>High to Low</option>
                    </select>
                </div>
            </div>
            {sections.map((section, i) => <GallerySection
                key={`${section.title}_${i}`}
                section={section}
            />)}
        </>
    );
}
