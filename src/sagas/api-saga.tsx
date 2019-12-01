import { takeEvery, call, put, select } from "redux-saga/effects";
import { MARKERS_REQUESTED, MARKERS_LOADED } from '../constants';
import { getMarkersPrimise } from '../helpers/DataService';

export function* watcherSaga() {
    yield takeEvery(MARKERS_REQUESTED, workerSaga);
}

function* workerSaga(action: any) {
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

function getData(service: any, center: any, filter: any) {
    return getMarkersPrimise(service, center, filter);
}