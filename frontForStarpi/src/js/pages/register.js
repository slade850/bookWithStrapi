import React, { useState } from 'react';
import api from '../utils/api';

const Register = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passConfirm, setPassConfirm] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage(null);
        setIsLoading(true);

        const body = {
            pseudo,
            email,
            password,
            passConfirm
        }

        api.post('user/register', body)
        .then(response => {
            setMessage(response.data.message)
        })
        .catch(err => {
            setMessage(err.response.data.message);
        })
        .finally(() => setIsLoading(false) )
    }    

    return(
        <form onSubmit={handleSubmit} >
        <div className="">
            <label>Pseudo</label>
            <input type="text" onChange={(ev)=> setPseudo(ev.target.value)} name='pseudo' value={pseudo} required />
        </div>
        <div className="">
            <label>Email</label>
            <input type="email" onChange={(ev)=> setEmail(ev.target.value)} name='email' value={email} required />
        </div>
        <div className="">
            <label>Password</label>
            <input type="password" onChange={(ev)=> setPassword(ev.target.value)} minLength="8" name='password' value={password} required />
        </div>
        <div className="">
            <label>Confirm Password</label>
            <input type="password" onChange={(ev)=> setPassConfirm(ev.target.value)} minLength="8" name='passConfirm' value={passConfirm} required />
        </div>
        <button type="submit">S'enregistrer</button><br />
        {message && <span>{message}</span>}
        </form>
    )
}

export default Register;