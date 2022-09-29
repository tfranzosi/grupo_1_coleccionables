import React from 'react';
import ContentRowTop from './ContentRowTop';

function ContentWrapper({products, users}){

    return (
        <React.Fragment>
            {/*<!-- Content Wrapper -->*/}
            <div id="content-wrapper" className="d-flex flex-column">
                {/*<!-- Main Content -->*/}
                <div id="content">
                    <ContentRowTop products={products} users={users}/>
                </div>
            </div>    
        </React.Fragment>
    )
}
export default ContentWrapper;