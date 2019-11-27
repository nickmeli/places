import { takeEvery, call, put, select } from "redux-saga/effects";
import { MARKERS_REQUESTED, MARKERS_LOADED } from '../constants';
import { getMarkersPrimise } from '../helpers/DataService';

export default function* watcherSaga() {
    yield takeEvery(MARKERS_REQUESTED, workerSaga);
}

function* workerSaga(action) {
    try {
        const center = yield select(state => state.center);
        const filter = yield select(state => state.filter);
        
        const payload = yield call(getData, action.service, center, filter);
        yield put({ type: MARKERS_LOADED, payload });
    }
    catch (e) {
        yield put({ type: "API_ERRORED", payload: e });
    }
}

function getData(service, center, filter) {
    return getMarkersPrimise(service, center, filter);
}