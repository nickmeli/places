import React, { Component } from 'react';
import { PlacesItem } from './PlacesItem';
import { MarkerObject } from '../models/Marker';

export class PlacesList extends Component {
    constructor(props) {
        super(props);
    }
    
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