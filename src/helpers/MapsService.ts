import { creaMarkerInfoWindow } from './MarkerService';
import { MarkerObject } from '../components/models/Marker';

export class MapsHelper {
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