import { MARKERS_REQUESTED, MARKERS_LOADED } from '../constants';


export interface MarkersRequested {
    type: MARKERS_REQUESTED,
    service: any
}

export interface MarkersLoaded {
    type: MARKERS_LOADED,
    payload: any
}

export type MarkersAction = MarkersRequested | MarkersLoaded ;

export function getMarkers(service: any): MarkersRequested {
    return {
        type: MARKERS_REQUESTED,
        service: service
    }
}