import React, { Component } from 'react';
import { MarkerObject } from '../models/Marker';

export interface Props {
    Marker: MarkerObject;
}

export class PlacesItem extends Component<Props, object> {
    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="card" style={{marginBottom: '5px'}}>
                        <img src={this.props.Marker.photo} className="card-img-top" alt=""/>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.Marker.title}</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}