import { MARKERS_REQUESTED } from '../constants';

export function getMarkers(service) {
    return { 
        type: MARKERS_REQUESTED,
        service: service
    }
}