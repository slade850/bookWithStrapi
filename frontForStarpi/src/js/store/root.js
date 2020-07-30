import { combineReducers } from 'redux';

import auth from './authStore';
import books from './bookStore';

const creatRootReducer = combineReducers({
    //add imported reducer
    auth,
    books
});

export default creatRootReducer;