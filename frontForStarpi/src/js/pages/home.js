import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {

    const booksLoad = useSelector(state => state.books.allBooks.isLoading);
    const books = useSelector(state => state.books.allBooks.books);

    return (
        <div>
            <h1>Welcome to library</h1>
            { booksLoad && books.map((book, i) => {
                    return (
                        <div className="book" key={i}>
                            <h2>{book.name}</h2>
                            <p>{book.synopsis}</p>
                            <p>{book.author.firstName}</p>
                        </div>
                        )
                    })
            }
        </div>
            )
}

export default Home;