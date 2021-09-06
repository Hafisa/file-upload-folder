import React, { useState, useEffect } from 'react';
import { registerUser } from '../data/api';
import { useHistory } from 'react-router-dom';
import '../App.css';
const RegisterUser = () => {

    const history = useHistory()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const user = {
            username,
            password
        }
        await registerUser(user).then(() => {
            history.push("/login")
        })
    }
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-6">
                    <form>
                        <h5 className="text-danger font-weight-bolder border-bottom">Register</h5>
                        <div className="col">
                            <div className="col-12 p-2">
                                <input type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="enter Username" className="form-control" />
                            </div>
                            <div className="col-12 mt-10 p-2">
                                <input type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="enter password" className="form-control" />
                            </div>
                            <div className="col-12 mt-10 p-2">
                                <button type="button"
                                    onClick={() => handleSubmit()}
                                    className="btn btn-dark btn-lg btn-block">SUBMIT</button>
                            </div>
                            <div className="col-12 mt-10 p-2 text-center">
                                <a href="/login">Login here</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterUser;
