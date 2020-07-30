import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getBooks, getBorrowedBooks, borrowBook } from '../store/bookStore';

const Protected = () => {

    const dispatch = useDispatch();

    const userId = useSelector(state => state.auth.user.detail.id);
    const booksLoad = useSelector(state => state.books.allBooks.isLoading);
    const borrowedBooksLoad = useSelector(state => state.books.borrowedBooks.isLoading);
    const books = useSelector(state => state.books.allBooks.books);
    const booksBorrowed = useSelector(state => state.books.borrowedBooks.books);

    useEffect(() => {
        dispatch(getBooks())
        dispatch(getBorrowedBooks())   
    }, [borrowedBooksLoad])


    return (
        <div>
            <section className="allBooks">
                <h1>All Books Available</h1>
                { booksLoad && books.map((book, i) => {
                    if(book.available){
                        console.log(book)
                        return (
                            <div className="book" key={i}>
                                <h2>{book.name}</h2>
                                <p>{book.synopsis}</p>
                                <p>{book.author.firstName}</p>
                                <button className="actionBtn" onClick={() => dispatch(borrowBook('borrow', userId, {id: book.id}))}>Borrow Book</button>
                            </div>
                        )
                    }
                })}
            </section>
            <section className="borrowedBooks">
                <h1>Borrowed Books</h1>
                { borrowedBooksLoad && booksBorrowed.map((borrowed, i) => {
                    if(borrowed.user.id === userId && borrowed.status === "pending"){
                        return (
                            <div className="borrowed" key={i}>
                                <h2>{borrowed.book.name}</h2>
                                <p>borrowed at: {borrowed.borrowDate}</p>
                                <p>return befor: { new Date(borrowed.borrowDate).setDate(borrowed.borrowDate.split('-')[2] + 15).toLocaleString('en-GB', { timeZone: 'UTC' })}</p>
                                <button className="actionBtn" onClick={() => dispatch(borrowBook('return', userId, {id: borrowed.id, bookId: borrowed.book.id}))}>Return Book</button>
                            </div>
                        )
                    }
                })}
            </section>
        </div>
            )
}

export default Protected;