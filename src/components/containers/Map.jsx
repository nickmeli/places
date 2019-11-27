import React, { Component } from 'react';
import { createGoogleMap, createDrawingManager, setListeners, createMarkerObject, createPlacesService } from '../../helpers/MapService';
import { connect } from "react-redux";
import { getMarkers, setCenter } from '../../actions';

class Map extends Component {
    previusObjects = null;
    googleMapRef = React.createRef();
    googleMap;
    drawingManager;
    placesService;
    currentLocation = {};
    openedMarker = null;
    markers = [];

    constructor(props) {
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

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                this.googleMap = createGoogleMap(this.googleMapRef, this.currentLocation);
                this.drawingManager = createDrawingManager(this.googleMap);
                setListeners(this.drawingManager, this.overlayComplete);
                this.placesService = createPlacesService(this.googleMap);
                this.props.setPlacesService(this.placesService);
            }, function () {

            });
        }
    }

    createPlacesService = () => {
        this.placesService = new window.google.maps.places.PlacesService(this.googleMap);
    }

    createMarker = (lat, lng, title, photo) => {
        var marker = createMarkerObject(lat, lng, title, photo, this.googleMap);

        marker.addListener('click', () => {
            if (this.openedMarker) {
                this.openedMarker.infowindow.close(this.googleMap, this.openedMarker);
            }
            marker.infowindow.open(this.googleMap, marker);
            this.openedMarker = marker;
        });

        return marker;
    }

    overlayComplete = (event) => {
        this.removeAllMarkers();

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
                request.type.push(this.state.selected_type);
            }
            if (this.state.keyword) {
                request.name = this.state.keyword;
            }
            this.setState({ center: center, radius: radius });

            this.props.setCenter({ center: center, radius: radius });
            this.props.getMarkers(this.placesService);
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
            let marker = this.createMarker(item.geometry.location.lat(), item.geometry.location.lng(), item.name, item.photos && item.photos.length > 0 ? item.photos[0].getUrl() : '');
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

function mapStateToProps(state) {
    return {
        markers: state.markers.markers
    };
}

// export default Map;
export default connect(
    mapStateToProps,
    { getMarkers, setCenter }
)(Map);