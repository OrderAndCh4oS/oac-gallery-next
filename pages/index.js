import galleryData from '../data/gallery-data';
import GallerySection from '../components/gallery-section';
import getObjktData from '../api/get-objkt-data';

export async function getServerSideProps(context) {
  const objkts = await getObjktData();
  const gallerySections = galleryData.map(({title, items}) => ({title, items: items.map(id => (objkts[id]))}))
  return {
    props: {gallerySections}, // will be passed to the page component as props
    revalidate: 900,
  }
}

export default function Home({gallerySections}) {
  return (
    <>
      {gallerySections.map(section => <GallerySection section={section} />)}
    </>
  )
}
