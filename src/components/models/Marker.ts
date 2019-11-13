export class MarkerObject {
    lat: number = 0;
    lng: number = 0;
    icon: string = '';
    title: string = '';
    infoWindowContent: string = '';
    photo: string = '';
    marker: any;
    infowindow: any = null;

    constructor(lat: number, lng: number, icon: string, title: string, infoWindowContent: string, photo: string, marker: any) {
        this.lat = lat;
        this.lng = lng;
        this.icon = icon;
        this.title = title;
        this.infoWindowContent = infoWindowContent;
        this.photo = photo;
        this.marker = marker;
    }
}