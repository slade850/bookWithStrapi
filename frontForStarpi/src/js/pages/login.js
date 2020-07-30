import React, {useState, useEffect} from 'react';
import { doLogin } from '../store/authStore';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const history = useHistory();

    const dispatch = useDispatch();
    const message = useSelector(state => state.auth.authMessage.message);
    const logged = useSelector(state => state.auth.user.isLogged);

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        dispatch({type: "CLEAR_AUTH_MESSAGE"})
        const body = {
            identifier,
            password
        }
        dispatch(doLogin(body))
        .then(res => {
            setIsLoading(false)
        })
        .catch(err => {
            setIsLoading(false)
        })
    }
    
    useEffect(() => {
        const waitRedirect = setTimeout(() => {
            if(logged && !isLoading) history.push('/');
        }, 3000);
        return () => clearTimeout(waitRedirect);
    },[isLoading])

    return (
        <div className="">
            { isLoading ? <h2>loading</h2>
        : <form onSubmit={handleSubmit} >
            {message && <div className="">{message}</div>}
            <div className="">
                <label>Login* (Pseudo Or Email)</label>
                <input type="text" onChange={(ev)=> setIdentifier(ev.target.value)} name='identifier' value={identifier} required />
            </div>
            <div className="">
                <label>Password</label>
                <input type="password" onChange={(ev)=> setPassword(ev.target.value)} minLength="8" name='password' value={password} required />
            </div>
            <button type="submit">Se Connecter</button><br />
        </form> }
        </div>
    )
}

export default Login;