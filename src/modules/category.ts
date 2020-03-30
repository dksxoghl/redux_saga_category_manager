import NewOrder from "../Category/components/NewOrder";

export type Data = {
    id: string;
    name: string;
    parent_id: string;
    order: number;
    status: string;
    active: string;
}
export type Category = {
    category: {
        loading: boolean,
        data: Array<Data>,
        error: any,
    }
}

const CHANGEHIDE = 'CHANGEHIDE'
const CHANGESHOW = 'CHANGESHOW'
const CHANGENAME= 'CHANGENAME';
const CHANGEACTIVE= 'CHANGEACTIVE';
const CHANGEORDER= 'CHANGEORDER';

export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_ERROR = 'GET_CATEGORY_ERROR';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_REDNER_CATEGORY = 'ADD_REDNER_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_REDNER_CATEGORY = 'UPDATE_REDNER_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_REDNER_CATEGORY = 'DELETE_REDNER_CATEGORY';
export const ADD_SUBCATEGORY = 'ADD_SUBCATEGORY';
export const ADD_REDNER_SUBCATEGORY = 'ADD_REDNER_SUBCATEGORY';

export const change_show = (id) => ({
    type: CHANGESHOW,
    payload: id
});
export const change_hide = (id) => ({
    type: CHANGEHIDE,
    payload: id
});
export const change_name=(id,name)=>({
    type: CHANGENAME,
    payload: {id,name}
});
export const change_active=(id,active)=>({
    type: CHANGEACTIVE,
    payload: {id,active}
});
export const change_order=(list)=>({
    type: CHANGEORDER,
    payload: list
});
export const get_category = () => ({
    type: GET_CATEGORY
})
export const add_category = (list) => ({
    type: ADD_CATEGORY,
    payload: list
})
export const add_subCategory = (list) => ({
    type: ADD_SUBCATEGORY,
    payload: list
})
export const update_category = (list) => ({
    type: UPDATE_CATEGORY,
    payload: list
})
export const delete_category = (id, deleteList) => ({
    type: DELETE_CATEGORY,
    payload: id,
    deleteList
})



const initialState: Category =
// { id: 'a0', name: '대', parent_id: null, order: 1, status: 'show', active: true }
{
    category: {
        loading: false,
        data: [],
        error: null,
    }
}
    ;

export default function category_reducer(state: Category = initialState, action) {
    const oldList = state.category.data;
    switch (action.type) {
        case GET_CATEGORY:
            // state = [];
            return {
                ...state, category: {
                    loading: true,
                    data: null,
                    error: null,
                }
            }
        case GET_CATEGORY_SUCCESS:
            return {
                ...state, category: {
                    loading: false,
                    data: action.payload,
                    error: null,
                }
            }
        case GET_CATEGORY_ERROR:
            return {
                ...state, category: {
                    loading: false,
                    data: action.payload,
                    error: action.error,
                }
            }
        case ADD_REDNER_CATEGORY:
            return {
                ...state, category: {
                    ...state.category,
                    data: oldList.concat(action.payload.parent),
                }
            }
        case ADD_REDNER_SUBCATEGORY:
            return {
                category: {
                    ...state.category,
                    data: [...action.payload.addArr.slice(0, action.payload.num), action.payload.parent, ...action.payload.addArr.slice(action.payload.num, state.category.data.length)]
                }
            }
        case DELETE_REDNER_CATEGORY:
            return {
                category: {
                    ...state.category,
                    data: NewOrder(action.deleteList)
                }
            }
        case CHANGESHOW:
            return {
                category: {
                    ...state.category,
                    data: oldList.map(list => {
                        if (list.parent_id === action.payload) {
                            console.log(true);
                            return ({ ...list, status: 'show' });
                        }
                        return list;
                    })
                }
            }
        case CHANGEHIDE: {
            const id = action.payload;
            return {
                category: {
                    ...state.category,
                    data: oldList.map(list => {
                        let pId;
                        if (list.parent_id)
                            pId = list.parent_id.slice(0, id.length);   //수정필요
                        if (id === pId) {
                            return ({ ...list, status: 'hide' });
                        }
                        return list;
                    })
                }
            }
        }
        case CHANGENAME : {
            if(!action.payload) return state;
            return {
                category:{
                    ...state.category,
                    data: oldList.map(list => {
                                if (list.id === action.payload.id) {
                                    return ({ ...list, name: action.payload.name });
                                }
                                return list;
                            })
                }
            }
        }
        case CHANGEACTIVE : {
            console.log(action.payload);
            const id = action.payload.id;
            const aId = action.payload.id + ':';
            return {
                category:{
                    ...state.category,
                    data: oldList.map(list => {
                                if (id.length === 0) return list;
                                if (list.id.slice(0, id.length + 1) === aId) {
                                    return ({ ...list, active:  action.payload.active });
                                }
                                if (list.id === id) {
                                    return ({ ...list, active: action.payload.active });
                                }
                                return list;
                            })
                }
            }
        }
        case CHANGEORDER : {
            return {
                category:{
                    ...state.category,
                    data: action.payload
                }
            }
        }

        default:
            return state;
    }
}