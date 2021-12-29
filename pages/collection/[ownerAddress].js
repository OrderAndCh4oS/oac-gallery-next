import getGallerySectionsByOwner from '../../api/get-gallery-sections-by-owner';
import CollectionItem from '../../components/collection-item';
import {getTrimmedWallet} from '../../utilities/get-trimmed-wallet';

export async function getServerSideProps({params}) {
    const {ownerAddress} = params;
    let collection;
    try {
        collection = await getGallerySectionsByOwner(ownerAddress);
    } catch(e) {
        collection = [];
    }

    return {
        props: {ownerAddress, collection}
    };
}

const OwnerAddress = ({ownerAddress, collection}) => {
    return (
        <>
            <h2>{getTrimmedWallet(ownerAddress)} Collection</h2>
            {collection.map(
                objkt => <CollectionItem key={objkt.id} gentk={objkt}/>)}
        </>
    );
};

export default OwnerAddress;
