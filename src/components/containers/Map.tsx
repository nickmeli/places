import React, { Component } from 'react';
import { MarkerObject } from '../models/Marker';
import { connect } from "react-redux";
import { getMarkers, setCenter } from '../../actions';
import { MapClass } from '../../helpers/MapClass';
import { RootState } from '../../reducers';

export interface Props {
    markers: any[],
    getMarkers: any,
    setCenter: any
}

export interface State {
    markers: MarkerObject[],
    center: any,
    radius: number,
    selected_type: string,
    keyword: string
}

class Map extends Component<Props, State> {
    previusObjects: any = null;
    googleMapRef: any = React.createRef();
    currentLocation: any = {};
    openedMarker: any = null;
    markers: any[] = [];

    constructor(props: Props) {
        super(props);

        this.state = {
            markers: [],
            center: null,
            radius: 0,
            selected_type: 'all',
            keyword: ''
        };
    }

    componentDidMount() {
        this.setState({ markers: [] });
        this.currentLocation = {
            lat: 53.797556,
            lng: -1.539957
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                MapClass.googleMapRef = this.googleMapRef;
                MapClass.initiate(this.currentLocation, this.overlayComplete);
            }, function () {

            });
        }
    }

    createMarker = (lat: number, lng: number, title: string, photo: string) => {
        var marker = MapClass.createMarkerObject(lat, lng, title, photo, MapClass.googleMap);

        marker.addListener('click', () => {
            if (this.openedMarker) {
                this.openedMarker.infowindow.close(MapClass.googleMap, this.openedMarker);
            }
            marker.infowindow.open(MapClass.googleMap, marker);
            this.openedMarker = marker;
        });

        return marker;
    }

    overlayComplete = (event: any) => {
        if (this.previusObjects) {
            this.previusObjects['overlay'].setMap(null);
        }
        this.previusObjects = event;
        if (event.type === "circle") {
            var center = { lat: event.overlay.center.lat(), lng: event.overlay.center.lng() };
            var radius = event.overlay.radius;

            var request = {
                location: center,
                radius: radius,
                type: [],
                name: ''
            };
            if (this.state.selected_type !== 'all') {
                request.type.push(this.state.selected_type as never);
            }
            if (this.state.keyword) {
                request.name = this.state.keyword;
            }
            this.setState({ center: center, radius: radius });
            this.props.setCenter({ center: center, radius: radius });
            this.props.getMarkers(MapClass.placesService);
        }
    }

    removeAllMarkers = () => {
        for (var marker of this.markers) {
            marker.setMap(null);
        }
    }

    objectsToMarkers = () => {
        this.removeAllMarkers();
        let temp_markers = [];
        for (let item of this.props.markers) {
            let marker = this.createMarker(item.geometry.location.lat(), 
                                           item.geometry.location.lng(), 
                                           item.name, 
                                           item.photos && item.photos.length > 0 ? item.photos[0].getUrl() : '');
            temp_markers.push(marker);
        }
        this.markers = temp_markers;
    }

    render() {
        this.objectsToMarkers();

        return (
            <div
                id="google-map"
                ref={this.googleMapRef}
                style={{ width: '100%', height: '100vh' }}
            />
        );
    }
}

function mapStateToProps(state: RootState) {
    return {
        markers: state.markers.markers
    };
}

export default connect(
    mapStateToProps,
    { getMarkers, setCenter }
)(Map);