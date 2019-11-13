import { creaMarkerInfoWindow } from './MarkerService';
import { MarkerObject } from '../components/models/Marker';

export class MapsHelper {
    public static createGoogleMap = (googleMapRef: any, currentLocation: any) => {
        return new (window as any).google.maps.Map(googleMapRef.current, {
            zoom: 12,
            center: currentLocation,
            disableDefaultUI: true,
        });
    }

    public static createDrawingManager = (googleMap: any) => {
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
                editable: true,
                zIndex: 1
            }
        });
        drawingManager.setMap(googleMap);

        return drawingManager;
    }

    public static setListeners = (drawingManager: any, callback: any) => {
        (window as any).google.maps.event.addListener(drawingManager, 'overlaycomplete', (event: any) => {
            callback(event);
        });
    }

    public static createMarker = (markerObj: MarkerObject, googleMap: any) => {
        var infowindow = new (window as any).google.maps.InfoWindow({
            content: creaMarkerInfoWindow(markerObj)
        });
        markerObj.infowindow = infowindow;

        var marker = new (window as any).google.maps.Marker({
            position: { lat: markerObj.lat, lng: markerObj.lng },
            map: googleMap,
            infowindow: infowindow
            // icon: marker.icon
        });

        return marker;
    }

    public static createPlacesService: any = (googleMap: any) => {
        return new (window as any).google.maps.places.PlacesService(googleMap);
    }
}