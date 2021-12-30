import GallerySection from '../components/gallery-section';
import getGallerySections from '../api/get-gallery-sections';
import {createRef, useState} from 'react';
import styles from './styles.module.css';

export async function getStaticProps(context) {
    let gallerySections;
    try {
        gallerySections = await getGallerySections();
    } catch(e) {
        gallerySections = [];
    }

    return {
        props: {gallerySections},
        revalidate: 300
    };
}

function filterProjects(filter, gallerySections) {
    return filter !== 'all'
        ? gallerySections.filter(gs => gs.title === filter)
        : gallerySections;
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
    const projectRef = createRef();
    const filterRef = createRef();
    const sortRef = createRef();

    const handleChange = () => {
        const project = projectRef.current.value;
        const filter = filterRef.current.value;
        const sort = sortRef.current.value;
        let nextSections = filterProjects(project, [...gallerySections]);
        nextSections = filterSections(filter, nextSections);
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
                    <label htmlFor="sort" className="label">Sort (per
                                                            collection)</label>
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
                <div className={styles.marginLeft}>
                    <label htmlFor="project" className="label">Project</label>
                    <select
                        onChange={handleChange}
                        className="select"
                        id="project"
                        ref={projectRef}
                    >
                        <option value={'all'}>All</option>
                        {gallerySections.map(section => <option
                            key={`${section.title}_opt`}
                            value={section.title}
                        >{section.title}</option>)}
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
