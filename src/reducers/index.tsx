import { combineReducers, Reducer } from 'redux';

import { markers } from './markers.reducer';
import { center } from './center.reducer';
import { filter } from './filter.reducer';
import { MarkersState, FilterState, CenterState } from '../types';

export interface RootState {
    markers: MarkersState;
    filter: FilterState;
    center: CenterState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    markers,
    center,
    filter
});

export default rootReducer;