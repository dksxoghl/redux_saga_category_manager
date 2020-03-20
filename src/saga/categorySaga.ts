import { call, put, takeEvery,all} from 'redux-saga/effects';
import * as apiCategory from '../api/apiCategory';
import { GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR, GET_CATEGORY, ADD_CATEGORY, ADD_REDNER_CATEGORY, ADD_REDNER_SUBCATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY,DELETE_REDNER_CATEGORY, ADD_SUBCATEGORY } from '../modules/category';
function* getCategorySaga() {
    try {
        const list = yield call(apiCategory.getLists);
        yield put({
            type: GET_CATEGORY_SUCCESS,
            payload: list
        })
    } catch (error) {
        yield put({
            type: GET_CATEGORY_ERROR,
            payload: error,
            error: true
        })
    }
}
function* addCategorySaga(action) {
    console.log(action);
    yield call(apiCategory.addList, action.payload.parent);
    yield put({
        type: ADD_REDNER_CATEGORY,
        payload: action.payload
    });

}
function* addSubCategorySaga(action) {
    console.log(action);
    yield call(apiCategory.addList, action.payload.parent);
    yield all(action.payload.addArr.map((list) => {
        if (list.order > action.payload.num) {
            console.log(list);
            return call(apiCategory.updateList, list);
        }
    }));
    yield put({
        type: ADD_REDNER_SUBCATEGORY,
        payload: action.payload
    });
}

function* updateCategorySaga(action) {
    const list = yield call(apiCategory.updateList, action.payload);
    console.log(list);
    // yield put({
    //     type:UPDATE_REDNER_CATEGORY,
    //     payload:action.payload
    // })
}
function* deleteCategorySaga(action) {
    yield call(apiCategory.deleteList, action.payload);
    yield all(action.deleteList.map((list) => {
            return call(apiCategory.updateList, list);
        }
    ));
    yield put({
        type:DELETE_REDNER_CATEGORY,
        payload:action.payload,
        deleteList:action.deleteList
    })
}


export function* categorySaga() {
    yield takeEvery(GET_CATEGORY, getCategorySaga);
    yield takeEvery(ADD_CATEGORY, addCategorySaga);
    yield takeEvery(ADD_SUBCATEGORY, addSubCategorySaga);
    yield takeEvery(UPDATE_CATEGORY, updateCategorySaga);
    yield takeEvery(DELETE_CATEGORY, deleteCategorySaga);
}