import React, { Component } from 'react';
import { PlacesItem } from './PlacesItem';
import { MarkerObject } from '../models/Marker';

export interface Props {
    Markers: MarkerObject[];
}

export class PlacesList extends Component<Props, object> {
    render () {
        return (
            <div className="places-list">
                {this.props.Markers.map((value, index) => {
                    return <PlacesItem key={index} Marker={value} />
                })}
            </div>
        );
    }
}