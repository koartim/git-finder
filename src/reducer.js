import { FETCH_USERS } from './actions';

const defaultState = {
    users: []
}


const reducer = (prevState = defaultState, action) => {
    switch(action.type) {
        case FETCH_USERS:
            console.log("here");
            return {...prevState, users: action.payload};
        default: 
            return prevState;
    }
}

export default reducer;