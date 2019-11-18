export function creaMarkerInfoWindow(marker) {
    var body = `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"` +
                `integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">`

    body += `<div class="card" style="width: 18rem; border: 0px solid rgba(0,0,0,.125);">`+
            `<img src="${marker.photo}" class="card-img-top" alt="...">`+
            `<div class="card-body">`+
            `<h5 class="card-title" style="color: #000;">${marker.title}</h5>`+
            `</div>`+
            `</div>`;

    return body;
}