// ======== Initialize ========
const SET_ERROR = 'SET_ERROR'

let defaultState = {
    text: null
}

// ======== Reducer ========
const errorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                text: action.payload
            }
        default:
            return state
    }
}

// ======== Action creators (AC) ========
const setErrorAC = (text) => ({
    type: SET_ERROR,
    payload: text
})

// ======== Thunks ========
export const setError = (text) => async (dispatch) => {
    dispatch(setErrorAC(text))
    console.log(text)
    setTimeout(() => {
        dispatch(setError(null))
    }, 3000)
}


export default errorReducer