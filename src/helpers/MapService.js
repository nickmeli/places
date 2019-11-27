import { creaMarkerInfoWindow } from './MarkerService';


export function createGoogleMap(googleMapRef, currentLocation) {
    return new window.google.maps.Map(googleMapRef.current, {
        zoom: 12,
        center: currentLocation,
        disableDefaultUI: true,
    });
}

export function createDrawingManager(googleMap) {
    var drawingManager = new window.google.maps.drawing.DrawingManager({
        defaultDrawingMode: 'circle',
        drawingMode: window.google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: window.google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['circle']
        },
        markerOptions: { icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' },
        circleOptions: {
            fillColor: '#000000',
            fillOpacity: 0.05,
            strokeWeight: 2,
            clickable: false,
            editable: false,
            zIndex: 1
        }
    });
    drawingManager.setMap(googleMap);

    return drawingManager;
}

export function setListeners(drawingManager, callback) {
    window.google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
        callback(event);
    });
}

export function createMarkerObject(lat, lng, title, photo, googleMap) {
    var infowindow = new window.google.maps.InfoWindow({
        content: creaMarkerInfoWindow(title, photo)
    });

    var marker = new window.google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: googleMap,
        infowindow: infowindow
        // icon: marker.icon
    });

    return marker;
}

export function createPlacesService(googleMap) {
    return new window.google.maps.places.PlacesService(googleMap);
}
