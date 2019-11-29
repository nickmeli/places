export class MapClass {
    static googleMapRef = null;
    static googleMap = null;
    static drawingManager = null;
    static placesService = null;

    static initiate(currentLocation, callback) {
        this.createGoogleMap(currentLocation);
        this.createDrawingManager();
        this.setListeners(callback);
        this.createPlacesService();
    }

    static createGoogleMap(currentLocation) {
        this.googleMap = new window.google.maps.Map(this.googleMapRef.current, {
            zoom: 12,
            center: currentLocation,
            disableDefaultUI: true,
        });
    }
    
    static createDrawingManager () {
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
        drawingManager.setMap(this.googleMap);
    
        this.drawingManager = drawingManager;
    }
    
    static setListeners (callback) {
        window.google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
            callback(event);
        });
    }
    
    static createPlacesService () {
        this.placesService = new window.google.maps.places.PlacesService(this.googleMap);
    }
}