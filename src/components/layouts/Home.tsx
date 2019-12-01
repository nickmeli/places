import React from 'react';
import Map from '../containers/Map';
import { Places } from '../containers/PlacesList';
import { SearchForm } from '../containers/SearchForm';

class Home extends React.Component {
    render() {
        return (
        <div className="Home">
            <div className="row" style={{marginRight: '0px'}}>
                <div className="col-lg-3" style={{ paddingLeft: '30px' }}>
                    <div className="row">
                        <div className="col-sm-12">
                            <SearchForm />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <Places />
                        </div>
                    </div>

                </div>
                <div className="col-lg-9" style={{paddingRight: '0px'}}>
                    <Map />
                </div>
            </div>
        </div>)
    };
}

export default Home;