import getGallerySectionsByOwner from '../../api/get-gallery-sections-by-owner';
import GalleryItem from '../../components/gallery-item';
import CollectionItem from '../../components/collection-item';

export async function getServerSideProps({params}) {
    const {ownerAddress} = params;
    let collection;
    try {
        collection = await getGallerySectionsByOwner(ownerAddress);
    } catch(e) {
        collection = [];
    }

    return {
        props: {collection}
    };
}

const OwnerAddress = ({collection}) => {
    console.log(collection);
    return (
        <>
            {collection.map(objkt => <CollectionItem key={objkt.id} objkt={objkt}/>)}
        </>
    );
};

export default OwnerAddress;
