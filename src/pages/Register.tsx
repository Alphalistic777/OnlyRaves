import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        username: '',
        age: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwörter stimmen nicht überein');
            setLoading(false);
            return;
        }

        if (parseInt(formData.age) < 18) {
            setError('Du musst mindestens 18 Jahre alt sein');
            setLoading(false);
            return;
        }

        try {
            await signUp(formData.email, formData.password, {
                first_name: formData.firstName,
                last_name: formData.lastName,
                username: formData.username,
                age: parseInt(formData.age),
            });
            navigate('/');
        } catch (error: any) {
            setError(error.message || 'Registrierung fehlgeschlagen');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rainbow-pink/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rainbow-purple/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="glass-card p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold rainbow-text mb-2">Neu bei OnlyRaves</h1>
                        <p className="text-gray-400">Werde Teil unserer wilden Community</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                                    Vorname
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400 text-sm"
                                        placeholder="Vorname"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                                    Nachname
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400 text-sm"
                                        placeholder="Nachname"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full pl-9 pr-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400 text-sm"
                                    placeholder="Username eingeben"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-9 pr-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400 text-sm"
                                    placeholder="deine@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                    Passwort
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400 text-sm"
                                        placeholder="Passwort eingeben"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                                    Bestätigen
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400 text-sm"
                                        placeholder="Passwort eingeben"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">
                                Alter
                            </label>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                min="18"
                                max="99"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400 text-sm"
                                placeholder="18"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3"
                        >
              <span className="flex items-center justify-center space-x-2">
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <>
                        <span>Registrieren</span>
                        <ArrowRight className="w-5 h-5" />
                    </>
                )}
              </span>
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Bereits Mitglied?{' '}
                            <Link
                                to="/login"
                                className="text-rainbow-pink hover:text-rainbow-purple transition-colors font-semibold"
                            >
                                Hier anmelden
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}