import React from 'react';
import LastCreatedinDB from './LastCreatedinDB';
import CategoriesCount from './CategoriesCount';

function ContentRowCenter({products}){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastCreatedinDB />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <CategoriesCount products={products}/>

        </div>
    )
}

export default ContentRowCenter;