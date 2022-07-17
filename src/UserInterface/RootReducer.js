const initalState = {
    Product: {},
    // user: {}
}

export default function RootReducer(state = initalState, action) {
    switch (action.type) {

        case 'ADD_Product':
            state.Product[action.payload[0]] = action.payload[1]
            console.log( state.Product)

            return ({ Product: state.Product})
            
        case 'DEL_Product':
           delete state.Product[action.payload[0]] 
            console.log( state.Product)

            return ({ Product: state.Product})
        
        default:
            return (state)

    }
}