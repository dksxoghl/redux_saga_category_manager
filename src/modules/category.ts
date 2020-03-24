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



// export const set_true = (category) => ({
//     type: SETTRUE, category
// });
// export const category_list = (list) => ({
//     type: GETLIST, list
// });
// export const change_show = () => ({
//     type: CHANGESHOW
// })



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
        // case UPDATE_REDNER_CATEGORY:
        //     return {
        //          category: {
        //             ...state.category,
        //             data: state.category.data.map((item) => {
        //                 if (item !== action.payload) {
        //                     // 이는 관심없는 요소입니다 - 그대로 유지하세요
        //                     return item;
        //                 }
        //                 // 그게 아니면, 우리가 원하는것입니다. - 업데이트된 값을 반환하세요
        //                 return action.payload;
        //             })
        //         }
        //     }


        // case SETTRUE:
        //     return state.map((item, index) => {
        //         if (index + 1 !== action.category.id) {
        //             // 이는 관심없는 요소입니다 - 그대로 유지하세요
        //             return item;
        //         }
        //         // 그게 아니면, 우리가 원하는것입니다. - 업데이트된 값을 반환하세요
        //         return {
        //             ...item,
        //             show: !action.category.show
        //         };
        //     });
        // case CHANGESHOW:
        //     return state;

        default:
            return state;
    }
}