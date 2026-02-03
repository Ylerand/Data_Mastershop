import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const res = login(email, password);

        if (res.success) {
            if (res.role === 'admin') {
                window.location.hash = 'dashboard';
            } else {
                window.location.hash = 'account';
            }
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Iniciar Sesión</h2>
                <p>Bienvenido de nuevo a MasterShop</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nombre@ejemplo.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <button type="submit" className="btn-auth">ENTRAR</button>
                </form>

                <p className="auth-footer">
                    ¿Nuevo en MasterShop? <a href="#register">Crea una cuenta</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
