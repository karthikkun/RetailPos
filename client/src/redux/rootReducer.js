const initialState = {
    
    loading : false,
    cartItems : []
}

export const rootReducer = (state = initialState, action) => {

    switch(action.type) {
        case 'ADD_TO_CART' : return {
            ...state,
            cartItems : [...state.cartItems, action.payload]
        }
        case 'UPDATE_CART' : return {
            ...state,
            cartItems : state.cartItems.map((item) => 
<<<<<<< Updated upstream
                item._id == action.payload._id 
=======
                item._id === action.payload._id 
>>>>>>> Stashed changes
                ? {...item, quantity : action.payload.quantity} : item
            )
        }
        case 'DELETE_FROM_CART' : return {
            ...state,
<<<<<<< Updated upstream
            cartItems : state.cartItems.filter((item) => item._id != action.payload._id)
=======
            cartItems : state.cartItems.filter((item) => item._id !== action.payload._id)
>>>>>>> Stashed changes
        }
        case 'SHOW_LOADING' : return {
            ...state,
            loading : true
        }
        case 'HIDE_LOADING' : return {
            ...state,
            loading : false
        }
        default : return state
    }
}