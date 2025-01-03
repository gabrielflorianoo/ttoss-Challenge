import React, { useState } from 'react';
import { login } from '../api/Server';

const Login = () => {
    const [clicked, setClicked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password)
            .then((response) => {
                // Put the user in storage
                localStorage.setItem('user', JSON.stringify(response));
                window.location.href = '/';
            })
            .catch((error) => {
                console.error('There was an error logging in!', error);
                alert('Login failed!');
            });
    };

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-half">
                    <form onSubmit={handleSubmit}>
                        <h2 className="title is-4">Login</h2>

                        <div className="field">
                            <label className="label" htmlFor="email">
                                Email:
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="password">
                                Password:
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                            <button
                                    className="button is-primary"
                                    type="submit"
                                    disabled={email === '' || password === ''}
                                    onClick={() => setClicked(true)}
                                >
                                    {clicked ? (
                                        'Logging in...'
                                    ) : (
                                        'Login'
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
