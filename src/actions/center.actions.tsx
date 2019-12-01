import { CENTER_CHANGED } from '../constants';

export interface CenterChanged {
    type: CENTER_CHANGED,
    payload: any
}

export type CenterAction = CenterChanged ;

export function setCenter(center: any): CenterChanged {
    return { 
        type: CENTER_CHANGED,
        payload: center
    }
}