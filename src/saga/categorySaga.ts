import {call,put,takeEvery} from 'redux-saga/effects';
import * as apiCategory from '../api/apiCategory';
import {GET_CATEGORY_SUCCESS,GET_CATEGORY_ERROR,GET_CATEGORY} from '../modules/category';
function* getCategorySaga(){
    try {
        const list=yield call(apiCategory.getLists);
        yield put({
            type:GET_CATEGORY_SUCCESS,
            payload:list
        })
    } catch (error) {
        yield put({
            type:GET_CATEGORY_ERROR,
            payload:error,
            error:true
        })
    }    
}
export function* categorySaga(){
    yield takeEvery(GET_CATEGORY,getCategorySaga);
}