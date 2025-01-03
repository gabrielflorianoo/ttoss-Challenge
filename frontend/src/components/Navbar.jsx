import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsLogged(true);
        }
    });

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLogged(false);
    };

    return (
        <nav
            className="navbar is-primary"
            role="navigation"
            aria-label="main navigation"
        >
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/" className="navbar-item">
                        Ranking de Videos
                    </Link>
                    <Link to="/vote" className="navbar-item">
                        Votar
                    </Link>
                    <Link to="/add-video" className="navbar-item">
                        Adicionar Video
                    </Link>
                </div>

                {isLogged ? (
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-danger" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link to="/signup" className="button is-light">
                                    Sign up
                                </Link>
                                <Link to="/login" className="button is-primary">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
