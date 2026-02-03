import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Auth.css'; // Shared styles

const Register = () => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        const res = register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });

        if (res.success) {
            window.location.hash = 'account';
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Crear Cuenta</h2>
                <p>Únete a MasterShop y disfruta del lujo.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre Completo</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <input
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <button type="submit" className="btn-auth">REGISTRARSE</button>
                </form>

                <p className="auth-footer">
                    ¿Ya tienes cuenta? <a href="#login">Inicia Sesión aquí</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
