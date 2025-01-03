import React, { useState } from 'react';
import { signup } from '../api/Server';

const Signup = () => {
    const [clicked, setClicked] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        signup(formData.name, formData.password, formData.email)
            .then((response) => {
                // Put the user in storage
                localStorage.setItem('user', JSON.stringify(response));
                window.location.href = '/';
            })
            .catch((error) => {
                console.error('There was an error signing up!', error);
                alert('Signup failed!');
            });
    };

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-half">
                    <h2 className="title is-4">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
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
                                    disabled={formData.name === '' || formData.email === '' || formData.password === ''}
                                    onClick={() => setClicked(true)}
                                >
                                    {clicked ? (
                                        'Signing Up...'
                                    ) : (
                                        'Sign Up'
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

export default Signup;
