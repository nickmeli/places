
export function getMarkersPrimise(placesService: any, center: any, filter: any) {
    let service = placesService;
    let request = {
        location: center.center,
        radius: center.radius,
        type: filter.type,
        name: filter.name
    };
    
    return new Promise(function (resolve, reject) {
        service.nearbySearch(request, (results: any, status: any) => {
            if (status === (window as any).google.maps.places.PlacesServiceStatus.OK) {
                resolve(results);
            }
            else {
                console.log('Error: ', status);
                reject('Error: ' + status);
            }
        });
    });
}