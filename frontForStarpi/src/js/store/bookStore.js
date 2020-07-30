import { combineReducers } from "redux";
import api from '../utils/api';


export const getBooks = () => {
    return dispatch => {
        dispatch({ type: 'FETCH_BOOKS' });

        return api
            .get('/books')
            .then(res=> dispatch({ type: 'SET_BOOKS', payload: res.data }))
            .catch(error => {
                throw error;
            })
    }
}

export const getBorrowedBooks = () => {
    return dispatch => {   
        dispatch({ type: 'FETCH_BORROWED_BOOKS' });
        
        return api
            .get('/user-borrows-books')
            .then(res => dispatch({ type: 'SET_BORROWED_BOOKS', payload: res.data }))
            .catch(err => console.log(err))
    }
} 



export const borrowBook = (get, userId, id) => {
    return dispatch => {
        dispatch({ type: "CLEAR_BOOKS" });
        dispatch({type: "CLEAR_BORROWED_BOOKS"});
        dispatch({ type: "BORROW_BOOK" });

        if(get == 'borrow'){
            const body = {
                borrowDate: new Date(),
                book: id.id,
                status: 'pending',
                user: userId
            }
            return api.post('/user-borrows-books', body)
            .then(res => {
                    api.put(`/books/${id}`, { available: false })
                    .then(result => getBorrowedBooks())
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
        if(get == 'return'){
            const body = {
                returnDate: new Date(),
                status: 'returned'
            }
            return api.put(`/user-borrows-books/${id.id}`, body)
            .then(res => {
                api.put(`/books/${id.bookId}`, { available: true })
                .then(result => getBorrowedBooks())
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
    }
}

const defaultAllBooks = {
    isLoading: false,
    books: []
}

const defaultBorrowedBooks = {
    isLoading: false,
    books: []
}

const allBooks = (state = defaultAllBooks, action) => {
    const allBooksAction = {
        "SET_BOOKS": {...state, isLoading: true, books: action.payload},
        "CLEAR_BOOKS": defaultAllBooks
    }
    return allBooksAction[action.type] || state;
}

const borrowedBooks = (state = defaultBorrowedBooks, action) => {
    const borrowedBooksAction = {
        "SET_BORROWED_BOOKS": {...state, isLoading: true, books: action.payload},
        "CLEAR_BORROWED_BOOKS": defaultBorrowedBooks
    }
    return borrowedBooksAction[action.type] || state;
}

const booksFunction = (state = false, action) => {
    const booksFuntionAction = {
        "FETCH_BOOKS": true,
        "BORROW_BOOK": true
    }
    return booksFuntionAction[action.type] || state;
}

const books = combineReducers({
    allBooks,
    borrowedBooks,
    borrowBook,
    booksFunction
});

export default books;