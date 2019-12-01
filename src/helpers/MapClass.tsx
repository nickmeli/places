import { creaMarkerInfoWindow } from './MarkerService';

export class MapClass {
    static googleMapRef: any = null;
    static googleMap: any = null;
    static drawingManager: any = null;
    static placesService: any = null;

    static initiate(currentLocation: any, callback: any) {
        this.createGoogleMap(currentLocation);
        this.createDrawingManager();
        this.setListeners(callback);
        this.createPlacesService();
    }

    static createGoogleMap(currentLocation: any) {
        this.googleMap = new (window as any).google.maps.Map(this.googleMapRef.current, {
            zoom: 12,
            center: currentLocation,
            disableDefaultUI: true,
        });
    }
    
    static createDrawingManager () {
        var drawingManager = new (window as any).google.maps.drawing.DrawingManager({
            defaultDrawingMode: 'circle',
            drawingMode: (window as any).google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: (window as any).google.maps.ControlPosition.TOP_CENTER,
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
    
    static setListeners (callback: any) {
        (window as any).google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: any) => {
            callback(event);
        });
    }
    
    static createPlacesService () {
        this.placesService = new (window as any).google.maps.places.PlacesService(this.googleMap);
    }

    public static createMarkerObject(lat: number, lng: number, title: string, photo: string, googleMap: any): any {
        var infowindow = new (window as any).google.maps.InfoWindow({
            content: creaMarkerInfoWindow(title, photo)
        });
    
        var marker = new (window as any).google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: googleMap,
            infowindow: infowindow
            // icon: marker.icon
        });
    
        return marker;
    }
}