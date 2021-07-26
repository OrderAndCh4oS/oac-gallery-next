import galleryData from '../data/gallery-data';
import GallerySection from '../components/gallery-section';
import getObjktData from '../api/get-objkt-data';

export async function getStaticProps(context) {
  const objkts = await getObjktData();
  const gallerySections = galleryData.map(({title, items}) => ({title, items: items.map(id => (objkts[id]))}))
  return {
    props: {gallerySections},
    revalidate: 300,
  }
}

export default function Home({gallerySections}) {
  return (
    <>
      {gallerySections.map(section => <GallerySection key={section.title} section={section} />)}
    </>
  )
}
