
const GETLIST = 'GETLIST'
const SETTRUE = 'SETTRUE'
const CHANGESHOW = 'CHANGESHOW'

export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_ERROR = 'GET_CATEGORY_ERROR';

export const get_category = () => ({
    type: GET_CATEGORY
})


export const set_true = (category) => ({
    type: SETTRUE, category
});
export const category_list = (list) => ({
    type: GETLIST, list
});
export const change_show = () => ({
    type: CHANGESHOW
})



const initialState =
// { id: 'a0', name: '대', parent_id: null, order: 1, status: 'show', active: true }
{
    category: {
        loading: false,
        data: null,
        error: null,
    }
}
    ;

export default function category_reducer(state = initialState, action) {
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
            // state = [];
            return {
                ...state, category: {
                    loading: false,
                    data: action.payload,
                    error: null,
                }
            }
        case GET_CATEGORY_ERROR:
            // state = [];
            return {
                ...state, category: {
                    loading: false,
                    data: action.payload,
                    error: action.error,
                }
            }
        // return (state||state.category.data.concat(action.list));
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
        case CHANGESHOW:
            return state;

        default:
            return state;
    }
}