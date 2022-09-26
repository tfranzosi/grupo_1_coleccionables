import React from 'react';
import LastCreatedinDB from './LastCreatedinDB';
import CategoriesCount from './CategoriesCount';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastCreatedinDB />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <CategoriesCount />

        </div>
    )
}

export default ContentRowCenter;