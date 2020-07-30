import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearToken } from '../utils/local-storage';

const Header = () => {

    const dispatch = useDispatch()
    const userIslogged = useSelector(state => state.auth.user.isLogged)
    const user = useSelector(state => state.auth.user.detail)


    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {
                        userIslogged ?
                            (
                                <li>
                                    <span>{user.username}</span>
                                    <button onClick={() => { dispatch({type: "CLEAR_USER"}); clearToken() }}>Logout</button>
                                </li>
                            ) :
                            (
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            )
                    }
                    { !userIslogged &&
                    <li>
                        <Link to="/register">Register</Link>
                    </li>}
                    <li>
                        <Link to="/protected">Protected</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;