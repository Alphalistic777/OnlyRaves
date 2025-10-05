import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';
import { motion } from 'framer-motion';
import { User, Mail, Save, Lock, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';



export function Profile() {
    const { user, userData, signOut } = useAuth();
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        age: '',
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                username: userData.username || '',
                age: userData.age?.toString() || '',
            });
        }
    }, [userData]);

    const handleUpdate = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from('user_data')
                .update({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    username: formData.username,
                    age: formData.age ? parseInt(formData.age) : null,
                })
                .eq('user_id', user.id);

            if (error) throw error;

            toast.success('Profil aktualisiert!');
            setEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Fehler beim Aktualisieren');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    if (!user || !userData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-rainbow-pink border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-8"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-rainbow-gradient rounded-full flex items-center justify-center">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    {userData.first_name || userData.username || 'Profil'}
                                </h1>
                                <p className="text-gray-400">Dein OnlyRaves Account</p>
                            </div>
                        </div>

                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="btn-secondary flex items-center space-x-2"
                            >
                                <User className="w-4 h-4" />
                                <span>Profil Bearbeiten</span>
                            </button>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Personal Info */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white mb-4">Persönliche Daten</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        <User className="w-4 h-4 inline mr-2" />
                                        Vorname
                                    </label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white"
                                        />
                                    ) : (
                                        <div className="px-3 py-2 text-white">
                                            {userData.first_name || 'Nicht angegeben'}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        <User className="w-4 h-4 inline mr-2" />
                                        Nachname
                                    </label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white"
                                        />
                                    ) : (
                                        <div className="px-3 py-2 text-white">
                                            {userData.last_name || 'Nicht angegeben'}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        <User className="w-4 h-4 inline mr-2" />
                                        Username
                                    </label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white"
                                        />
                                    ) : (
                                        <div className="px-3 py-2 text-white">
                                            {userData.username || 'Nicht angegeben'}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        <Calendar className="w-4 h-4 inline mr-2" />
                                        Alter
                                    </label>
                                    {editing ? (
                                        <input
                                            type="number"
                                            name="age"
                                            min="18"
                                            max="99"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white"
                                        />
                                    ) : (
                                        <div className="px-3 py-2 text-white">
                                            {userData.age ? `${userData.age} Jahre` : 'Nicht angegeben'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Account Info */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white mb-4">Account Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        <Mail className="w-4 h-4 inline mr-2" />
                                        Email
                                    </label>
                                    <div className="px-3 py-2 text-gray-400">
                                        {user.email}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={() => {
                                            toast.success('Die funktion gibts noch nicht, du kek');
                                        }}
                                        className="text-rainbow-pink hover:text-rainbow-purple transition-colors text-sm flex items-center space-x-2"
                                    >
                                        <Lock className="w-4 h-4" />
                                        <span>Passwort ändern (noch nicht)</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {editing && (
                        <div className="flex space-x-4 mt-8 pt-8 border-t border-gray-600">
                            <button
                                onClick={() => {
                                    setEditing(false);
                                    setFormData({
                                        first_name: userData.first_name || '',
                                        last_name: userData.last_name || '',
                                        username: userData.username || '',
                                        age: userData.age?.toString() || '',
                                    });
                                }}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                            >
                                Abbrechen
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={loading}
                                className="flex-1 btn-primary flex items-center justify-center space-x-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        <span>Speichern</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Sign Out Button */}
                    <div className="mt-8 pt-8 border-t border-gray-600 text-center">
                        <button
                            onClick={async () => {
                                await signOut();
                                window.location.href = '/';
                            }}
                            className="text-red-400 hover:text-red-300 transition-colors"
                        >
                            Abmelden (neiin biite bleiiben^^)
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}