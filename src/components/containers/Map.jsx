import React, { Component } from 'react';
import { MarkerObject } from '../models/Marker';
import { createGoogleMap, createDrawingManager, setListeners, createMarkerObject, createPlacesService } from '../../helpers/MapService';
import { PlacesList } from './PlacesList';

class Map extends Component {
    previusObjects = null;
    googleMapRef = React.createRef();
    googleMap;
    drawingManager;
    placesService;
    currentLocation = {};
    openedMarker = null;

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
        // this.currentLocation = {
        //     lat: 53.797556,
        //     lng: -1.539957
        // }
        // this.googleMap = createGoogleMap(this.googleMapRef, this.currentLocation);
        // this.drawingManager = createDrawingManager(this.googleMap);
        // setListeners(this.drawingManager, this.overlayComplete);
        // this.placesService = createPlacesService(this.googleMap);

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
            }, function () {

            });
        }
    }

    createPlacesService = () => {
        this.placesService = new window.google.maps.places.PlacesService(this.googleMap);
    }

    createMarker = (markerObj) => {
        var marker = createMarkerObject(markerObj, this.googleMap);

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
        if (this.previusObjects) {
            this.previusObjects['overlay'].setMap(null);
        }
        this.previusObjects = event;
        if (event.type == "circle") {
            var center = { lat: event.overlay.center.lat(), lng: event.overlay.center.lng() };
            var radius = event.overlay.radius;

            var request = {
                location: center,
                radius: radius,
                type: [],
                name: ''
            };
            if (this.state.selected_type != 'all') {
                request.type.push(this.state.selected_type);
            }
            if (this.state.keyword) {
                request.name = this.state.keyword;
            }
            this.setState({ center: center, radius: radius });
            this.removeAllMarkers();
            var temp_markers = [];
            this.placesService.nearbySearch(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var marker = new MarkerObject(
                            results[i].geometry.location.lat(),
                            results[i].geometry.location.lng(),
                            results[i].icon,
                            results[i].name,
                            '',
                            results[i].photos && results[i].photos.length > 0 ? results[i].photos[0].getUrl() : '',
                            null
                        );
                        marker.marker = this.createMarker(marker);
                        temp_markers.push(marker);
                    }
                    this.setState({ markers: temp_markers });
                    // map.setCenter(results[0].geometry.location);
                }
                else {
                    console.log('Error: ', status);
                }
            });
        }
    }

    removeAllMarkers = () => {
        for (var marker of this.state.markers) {
            marker.marker.setMap(null);
        }
    }

    selectChanged = (event) => {
        this.setState({ selected_type: event.target.value }, () => {
            var request = {
                location: this.state.center,
                radius: this.state.radius,
                type: [],
                name: ''
            };
            if (this.state.selected_type != 'all') {
                request.type.push(this.state.selected_type);
            }
            if (this.state.keyword) {
                request.name = this.state.keyword;
            }

            this.removeAllMarkers();
            var temp_markers = [];
            this.placesService.nearbySearch(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var marker = new MarkerObject(
                            results[i].geometry.location.lat(),
                            results[i].geometry.location.lng(),
                            results[i].icon,
                            results[i].name,
                            '',
                            results[i].photos && results[i].photos.length > 0 ? results[i].photos[0].getUrl() : '',
                            null
                        );
                        marker.marker = this.createMarker(marker);
                        temp_markers.push(marker);
                    }
                    this.setState({ markers: temp_markers });
                }
                else {
                    console.log('Error: ', status);
                }
            });
        });
    }

    inputChanged = (event) => {
        this.setState({ keyword: event.target.value }, () => {

        });
    }

    keyDown = (event) => {
        if (event.key !== 'Enter') {
            return;
        }
        var request = {
            location: this.state.center,
            radius: this.state.radius,
            type: [],
            name: ''
        };
        if (this.state.selected_type != 'all') {
            request.type.push(this.state.selected_type);
        }
        if (this.state.keyword) {
            request.name = this.state.keyword;
        }

        this.removeAllMarkers();
        var temp_markers = [];
        this.placesService.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var marker = new MarkerObject(
                        results[i].geometry.location.lat(),
                        results[i].geometry.location.lng(),
                        results[i].icon,
                        results[i].name,
                        '',
                        results[i].photos && results[i].photos.length > 0 ? results[i].photos[0].getUrl() : '',
                        null
                    );
                    marker.marker = this.createMarker(marker);
                    temp_markers.push(marker);
                }
                this.setState({ markers: temp_markers });
            }
            else {
                console.log('Error: ', status);
            }
        });
    }

    render() {

        return (
            <div className="row" style={{marginRight: '0px'}}>
                <div className="col-lg-3" style={{ paddingLeft: '30px' }}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div style={{ textAlign: 'left' }}>
                                <div className="alert alert-success" role="alert" style={{marginBottom: '5px', marginTop: '5px'}}>
                                    Press the 'Circle' on the google maps at the TOP CENTER of the map to select the area.
                                </div>
                                <div className="form-group" style={{marginBottom: '5px'}}>
                                    <label>Places type</label>
                                    <select value={this.state.selected_type} onChange={this.selectChanged} className="form-control">
                                        <option value="all">All</option>
                                        <option value="bank">Bank</option>
                                        <option value="bar">Bar</option>
                                        <option value="museum">Museum</option>
                                        <option value="restaurant">Restaurant</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Search for</label>
                                    <input type="text" className="form-control" id="search_for" value={this.state.keyword} onChange={this.inputChanged} onKeyDown={this.keyDown} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <PlacesList Markers={this.state.markers} />
                        </div>
                    </div>

                </div>
                <div className="col-lg-9" style={{paddingRight: '0px'}}>
                    <div
                        id="google-map"
                        ref={this.googleMapRef}
                        style={{ width: '100%', height: '100vh' }}
                    />
                </div>
            </div>
        );
    }
}

export default Map;