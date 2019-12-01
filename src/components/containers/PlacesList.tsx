import React, { Component } from 'react';
import { PlacesItem } from './PlacesItem';
import { connect } from "react-redux";
import { MarkerObject } from '../models/Marker';
import { RootState } from '../../reducers';

export interface Props {
    markers: any[];
}

class PlacesList extends Component<Props, object> {
    objectsToMarkers = () => {
        let temp_markers = [];
        for (let item of this.props.markers) {
            var marker = new MarkerObject(
                item.geometry.location.lat(),
                item.geometry.location.lng(),
                item.icon,
                item.name,
                '',
                item.photos && item.photos.length > 0 ? item.photos[0].getUrl() : '',
                null
            );
            temp_markers.push(marker);
        }
        return temp_markers;
    }

    render () {
        const objects = this.objectsToMarkers();

        return (
            <div className="places-list">
                {objects.map((value, index) => {
                    return <PlacesItem key={index} Marker={value} />
                })}
            </div>
        );
    }
}

function mapStateToProps(state: RootState) {
    return {
        markers: state.markers.markers
    };
}

const Places = connect(mapStateToProps, {  })(PlacesList);

export { Places };