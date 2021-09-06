import React, { useState, useEffect } from 'react';
import { UserLogin } from '../data/api';
import { useHistory } from 'react-router-dom';
import '../App.css';
const LoginUser = ({ setLogoutUser }) => {

    const history = useHistory()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        const user = {
            username,
            password
        }
        await UserLogin(user).then((response) => {
            if (response.data.status === "success") {
                localStorage.setItem(
                    "login",
                    JSON.stringify({
                        userLogin: true,
                        token: response.data,
                    })
                );
                setLogoutUser(false);
                history.push("/home")
            }
            else if (response.data.status === "error") {
                setError(response.data.error)
            }
        })
    }
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-6">
                    <h5 className="text-danger font-weight-bolder border-bottom">Login Here</h5>
                    <div className="col">
                        <div className="col-12 p-2">
                            <input type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="enter Username" className="form-control" />
                        </div>
                        <div className="col-12 mt-10 p-2">
                            <input type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="enter password" className="form-control" />
                        </div>
                        <div className="col-12 mt-10 p-2">
                            <button type="button"
                                onClick={() => handleSubmit()}
                                className="btn btn-dark btn-lg btn-block">LOGIN</button>
                        </div>
                        <div className="col-12 mt-10 p-2">
                            {error &&
                                <label className="text-danger">{error}</label>
                            }
                        </div>
                        <div className="col-12 mt-10 p-2 text-center">
                            <a href="/register">Register </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginUser;
