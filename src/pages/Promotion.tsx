import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';
import type { Rave, Genre } from '../types';
import { motion } from 'framer-motion';
import {
    Plus,
    Music,
    Calendar,
    MapPin,
    Edit,
    Trash2,
    Eye,
    X
} from 'lucide-react';
import toast from 'react-hot-toast';

export function Promotion() {
    const [raves, setRaves] = useState<Rave[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user, userData } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        rave_name: '',
        rave_date: '',
        rave_description: '',
        ticket_price: '',
        genre_id: '',
        street: '',
        zip_code: '',
        city: '',
    });

    const fetchMyRaves = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('rave_data')
                .select(`
          *,
          genre:genre_id(*)
        `)
                .eq('user_id', user?.id)
                .order('rave_date', { ascending: true });

            if (error) throw error;
            setRaves(data || []);
        } catch (error) {
            console.error('Error fetching raves:', error);
            toast.error('Fehler beim Laden deiner Raves');
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        if (user) {
            fetchMyRaves();
            fetchGenres();
        } else {
            navigate('/login');
        }
    }, [user, fetchMyRaves, navigate]);

    const fetchGenres = async () => {
        try {
            const { data, error } = await supabase
                .from('genre')
                .select('*')
                .order('genre_name');

            if (error) throw error;
            setGenres(data || []);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { error } = await supabase
                .from('rave_data')
                .insert({
                    user_id: user?.id,
                    ...formData,
                    ticket_price: formData.ticket_price ? parseFloat(formData.ticket_price) : null,
                });

            if (error) throw error;

            toast.success('Rave erfolgreich erstellt!');
            setShowForm(false);
            setFormData({
                rave_name: '',
                rave_date: '',
                rave_description: '',
                ticket_price: '',
                genre_id: '',
                street: '',
                zip_code: '',
                city: '',
            });
            fetchMyRaves();
        } catch (error) {
            console.error('Error creating rave:', error);
            toast.error('Fehler beim Erstellen');
        }
    };

    const deleteRave = async (raveId: string) => {
        if (!confirm('Möchtest du diesen Rave wirklich löschen?')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('rave_data')
                .delete()
                .eq('rave_id', raveId);

            if (error) throw error;

            toast.success('Rave gelöscht');
            fetchMyRaves();
        } catch (error) {
            console.error('Error deleting rave:', error);
            toast.error('Fehler beim Löschen');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-rainbow-pink border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold rainbow-text mb-2">Meine Raves</h1>
                        <p className="text-gray-400">
                            Willkommen, {userData?.first_name || 'Promoter'}! Verwalte deine Events
                        </p>
                    </div>

                    <button
                        onClick={() => setShowForm(true)}
                        className="btn-secondary flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Neuer Rave</span>
                    </button>
                </div>

                {/* Raves Grid */}
                {raves.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">Noch keine Raves</h3>
                        <p className="text-gray-400 mb-6">
                            Erstelle deinen ersten Rave und erreiche tausende von Partygästen!
                        </p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="btn-primary"
                        >
                            <span>Jetzt Rave erstellen</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {raves.map((rave, index) => (
                            <motion.div
                                key={rave.rave_id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-card hover:scale-105 transition-transform duration-200"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-2">{rave.rave_name}</h3>
                                            {rave.genre && (
                                                <span className="inline-block px-3 py-1 bg-rainbow-pink/20 text-rainbow-pink rounded-full text-sm font-medium">
                          {rave.genre.genre_name}
                        </span>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-rainbow-pink">
                                                {rave.ticket_price ? `€${rave.ticket_price}` : 'Free'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-gray-300">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <span className="text-sm">{formatDate(rave.rave_date)}</span>
                                        </div>

                                        {rave.city && (
                                            <div className="flex items-center text-gray-300">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span className="text-sm">{rave.city}</span>
                                            </div>
                                        )}
                                    </div>

                                    {rave.rave_description && (
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                            {rave.rave_description}
                                        </p>
                                    )}

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => navigate(`/raves/${rave.rave_id}`)}
                                            className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-1"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span>Ansehen</span>
                                        </button>

                                        <button
                                            onClick={() => navigate(`/raves/${rave.rave_id}/edit`)}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1"
                                        >
                                            <Edit className="w-4 h-4" />
                                            <span>Bearbeiten (noch nicht)</span>
                                        </button>

                                        <button
                                            onClick={() => deleteRave(rave.rave_id)}
                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Create Rave Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-white">Neuen Rave erstellen</h2>
                                    <button
                                        onClick={() => setShowForm(false)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Rave Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.rave_name}
                                                onChange={(e) => setFormData({ ...formData, rave_name: e.target.value })}
                                                className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400"
                                                placeholder="z.B. Neon Dreams Festival"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Datum *
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.rave_date}
                                                onChange={(e) => setFormData({ ...formData, rave_date: e.target.value })}
                                                className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Beschreibung
                                        </label>
                                        <textarea
                                            value={formData.rave_description}
                                            onChange={(e) => setFormData({ ...formData, rave_description: e.target.value })}
                                            className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400 h-24"
                                            placeholder="Beschreibe dein Event..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Ticketpreis (€)
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={formData.ticket_price}
                                                onChange={(e) => setFormData({ ...formData, ticket_price: e.target.value })}
                                                className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400"
                                                placeholder="0.00"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Genre
                                            </label>
                                            <select
                                                value={formData.genre_id}
                                                onChange={(e) => setFormData({ ...formData, genre_id: e.target.value })}
                                                className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white"
                                            >
                                                <option value="">Genre wählen</option>
                                                {genres.map((genre) => (
                                                    <option key={genre.genre_id} value={genre.genre_id}>
                                                        {genre.genre_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Straße
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.street}
                                                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                                className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400"
                                                placeholder="Musterstraße 123"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                PLZ
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.zip_code}
                                                onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                                                className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400"
                                                placeholder="12345"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Stadt
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400"
                                                placeholder="Berlin"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex space-x-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                                        >
                                            Abbrechen
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 btn-primary"
                                        >
                                            <span>Rave erstellen</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
