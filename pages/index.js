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
            {sections.map((section, i) => <GallerySection
                key={`${section.title}_${i}`}
                section={section}
            />)}
        </>
    );
}
