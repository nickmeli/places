
export function getMarkersPrimise(placesService, center, filter) {
    let service = placesService;
    let request = {
        location: center.center,
        radius: center.radius,
        type: filter.type,
        name: filter.name
    };
    
    return new Promise(function (resolve, reject) {
        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                resolve(results);
            }
            else {
                console.log('Error: ', status);
                reject('Error: ' + status);
            }
        });
    });
}