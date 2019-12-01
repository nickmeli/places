import { FILTER_CHANGED } from '../constants';

export interface FilterChanged {
    type: FILTER_CHANGED,
    payload: any
}

export type FilterAction = FilterChanged ;

export function setFilter(center: any): FilterChanged {
    return { 
        type: FILTER_CHANGED,
        payload: center
    }
}