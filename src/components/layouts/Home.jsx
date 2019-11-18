import React from 'react';
import Map from '../containers/Map';

class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <Map ShowMarker={false} />
            </div>
        );
    }
}

export default Home;