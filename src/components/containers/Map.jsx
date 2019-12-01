import React, { Component } from 'react';
import { createMarkerObject} from '../../helpers/MapService';
import { connect } from "react-redux";
import { getMarkers, setCenter } from '../../actions';
import { MapClass } from '../../helpers/MapClass';

class Map extends Component {
    googleMapRef = React.createRef();
    markers = [];

    constructor(props) {
        super(props);

        this.state = {
            openedMarker: null,
            currentLocation: {},
            previusObjects: null
        };
    }

    componentDidMount() {
        this.setState({ markers: [] });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({currentLocation: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }}, function () {
                    MapClass.googleMapRef = this.googleMapRef;
                    MapClass.initiate(this.state.currentLocation, this.overlayComplete);
                });
            }, function () {

            });
        }
    }

    createMarker = (lat, lng, title, photo) => {
        var marker = createMarkerObject(lat, lng, title, photo, MapClass.googleMap);

        marker.addListener('click', () => {
            if (this.openedMarker) {
                this.openedMarker.infowindow.close(MapClass.googleMap, this.openedMarker);
            }
            marker.infowindow.open(MapClass.googleMap, marker);
            this.setState({ openedMarker: marker});
        });

        return marker;
    }

    overlayComplete = (event) => {
        this.removeAllMarkers();

        if (this.state.previusObjects) {
            this.state.previusObjects['overlay'].setMap(null);
        }
        this.setState({ previusObjects: event});
        if (event.type === "circle") {
            
            var center = { lat: event.overlay.center.lat(), lng: event.overlay.center.lng() };
            var radius = event.overlay.radius;

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

export default connect(
    mapStateToProps,
    { getMarkers, setCenter }
)(Map);