import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import type { Rave, Genre, FilterOptions } from '../types';
import { motion } from 'framer-motion';
import { Music, MapPin, Calendar, Filter, X } from 'lucide-react';

export function Raves() {
    const [raves, setRaves] = useState<Rave[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<FilterOptions>({});
    const [filteredRaves, setFilteredRaves] = useState<Rave[]>([]);

    useEffect(() => {
        fetchRaves();
        fetchGenres();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [raves, filters]);

    const fetchRaves = async () => {
        try {
            const { data, error } = await supabase
                .from('rave_data')
                .select(`
          *,
          genre:genre_id(*),
          promoter:user_id(*)
        `)
                .order('rave_date', { ascending: true });

            if (error) throw error;
            setRaves(data || []);
        } catch (error) {
            console.error('Error fetching raves:', error);
        } finally {
            setLoading(false);
        }
    };

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

    const applyFilters = () => {
        let filtered = [...raves];

        if (filters.genre) {
            filtered = filtered.filter(rave => rave.genre?.genre_name === filters.genre);
        }

        if (filters.city) {
            filtered = filtered.filter(rave =>
                rave.city?.toLowerCase().includes(filters.city!.toLowerCase())
            );
        }

        if (filters.dateFrom) {
            filtered = filtered.filter(rave =>
                new Date(rave.rave_date) >= new Date(filters.dateFrom!)
            );
        }

        if (filters.dateTo) {
            filtered = filtered.filter(rave =>
                new Date(rave.rave_date) <= new Date(filters.dateTo!)
            );
        }

        if (filters.priceRange) {
            filtered = filtered.filter(rave =>
                rave.ticket_price &&
                rave.ticket_price >= filters.priceRange![0] &&
                rave.ticket_price <= filters.priceRange![1]
            );
        }

        setFilteredRaves(filtered);
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold rainbow-text mb-2">Alle Raves</h1>
                        <p className="text-gray-400">Entdecke die wildesten Partys in deiner Nähe</p>
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="btn-secondary flex items-center space-x-2"
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </div>

                {/* Filters */}
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glass-card p-6 mb-8"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Filter</h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                                <select
                                    value={filters.genre || ''}
                                    onChange={(e) => setFilters({ ...filters, genre: e.target.value || undefined })}
                                    className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white"
                                >
                                    <option value="">Alle Genres</option>
                                    {genres.map((genre) => (
                                        <option key={genre.genre_id} value={genre.genre_name}>
                                            {genre.genre_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Stadt</label>
                                <input
                                    type="text"
                                    value={filters.city || ''}
                                    onChange={(e) => setFilters({ ...filters, city: e.target.value || undefined })}
                                    placeholder="z.B. Berlin"
                                    className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white placeholder-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Datum von</label>
                                <input
                                    type="date"
                                    value={filters.dateFrom || ''}
                                    onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value || undefined })}
                                    className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Datum bis</label>
                                <input
                                    type="date"
                                    value={filters.dateTo || ''}
                                    onChange={(e) => setFilters({ ...filters, dateTo: e.target.value || undefined })}
                                    className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rainbow-pink focus:border-transparent text-white"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => setFilters({})}
                            className="mt-4 text-sm text-rainbow-pink hover:text-rainbow-purple transition-colors"
                        >
                            Filter zurücksetzen
                        </button>
                    </motion.div>
                )}

                {/* Raves Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRaves.map((rave, index) => (
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

                                <Link
                                    to={`/raves/${rave.rave_id}`}
                                    className="w-full btn-primary text-center block"
                                >
                                    <span>Rave Details</span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredRaves.length === 0 && (
                    <div className="text-center py-12">
                        <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">Keine Raves gefunden</h3>
                        <p className="text-gray-400">Versuche es mit anderen Filtern oder schau später wieder vorbei.</p>
                    </div>
                )}
            </div>
        </div>
    );
}