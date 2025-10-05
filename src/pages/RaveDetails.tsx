import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { useAuth } from '../context/AuthContext';
import type { Rave } from '../types';
import { motion } from 'framer-motion';
import {
    Music,
    MapPin,
    Calendar,
    Ticket,
    User,
    Trash2,
    Edit,
    ShoppingCart,
    Share2
} from 'lucide-react';
import toast from 'react-hot-toast';

export function RaveDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [rave, setRave] = useState<Rave | null>(null);
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        if (id) {
            fetchRave();
        }
    }, [id, user]);

    useEffect(() => {
        if (rave && user) {
            setIsOwner(rave.user_id === user.id);
        }
    }, [rave, user]);

    const fetchRave = async () => {
        try {
            const { data, error } = await supabase
                .from('rave_data')
                .select(`
          *,
          genre:genre_id(*),
          promoter:user_id(*)
        `)
                .eq('rave_id', id)
                .single();

            if (error) throw error;
            setRave(data);
        } catch (error) {
            console.error('Error fetching rave:', error);
            toast.error('Rave nicht gefunden');
            navigate('/raves');
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async () => {
        if (!user) {
            toast.error('Bitte melde dich an, um Tickets zu buchen');
            navigate('/login');
            return;
        }

        try {
            const { error } = await supabase
                .from('cart')
                .insert({
                    user_id: user.id,
                    rave_id: id,
                });

            if (error) throw error;
            toast.success('Rave zum Warenkorb hinzugefügt!');
        } catch (error: any) {
            if (error.code === '23505') {
                toast.error('Rave bereits im Warenkorb');
            } else {
                toast.error('Fehler beim Hinzufügen');
            }
        }
    };

    const deleteRave = async () => {
        if (!confirm('Möchtest du diesen Rave wirklich löschen?')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('rave_data')
                .delete()
                .eq('rave_id', id);

            if (error) throw error;
            toast.success('Rave gelöscht');
            navigate('/raves');
        } catch (error) {
            console.error('Error deleting rave:', error);
            toast.error('Fehler beim Löschen');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('de-DE', {
            weekday: 'long',
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

    if (!rave) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-300 mb-4">Rave nicht gefunden</h2>
                    <Link to="/raves" className="btn-primary">
                        <span>Zurück zu allen Raves</span>
                    </Link>
                </div>
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
                    className="glass-card overflow-hidden"
                >
                    {/* Header */}
                    <div className="relative">
                        <div className="h-64 bg-gradient-to-r from-rainbow-pink via-rainbow-purple to-rainbow-blue relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/30" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Music className="w-24 h-24 text-white/50" />
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-6 right-6">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h1 className="text-4xl font-black text-white mb-2">{rave.rave_name}</h1>
                                    {rave.genre && (
                                        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium">
                      {rave.genre.genre_name}
                    </span>
                                    )}
                                </div>

                                <div className="text-right">
                                    <div className="text-3xl font-black text-white">
                                        {rave.ticket_price ? `€${rave.ticket_price}` : 'Free'}
                                    </div>
                                    <div className="text-sm text-white/80">pro Ticket</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Event Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-rainbow-pink" />
                                    <div>
                                        <div className="font-semibold">Datum</div>
                                        <div className="text-gray-400">{formatDate(rave.rave_date)}</div>
                                    </div>
                                </div>

                                {rave.city && (
                                    <div className="flex items-center space-x-3">
                                        <MapPin className="w-5 h-5 text-rainbow-pink" />
                                        <div>
                                            <div className="font-semibold">Location</div>
                                            <div className="text-gray-400">
                                                {rave.street && `${rave.street}, `}
                                                {rave.zip_code && `${rave.zip_code} `}
                                                {rave.city}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {rave.promoter && (
                                    <div className="flex items-center space-x-3">
                                        <User className="w-5 h-5 text-rainbow-pink" />
                                        <div>
                                            <div className="font-semibold">Promoter</div>
                                            <div className="text-gray-400">
                                                {rave.promoter.first_name || rave.promoter.username || 'Unbekannt'}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center space-x-3">
                                    <Ticket className="w-5 h-5 text-rainbow-pink" />
                                    <div>
                                        <div className="font-semibold">Ticketpreis</div>
                                        <div className="text-gray-400">
                                            {rave.ticket_price ? `€${rave.ticket_price}` : 'Kostenlos'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {rave.rave_description && (
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4">Beschreibung</h3>
                                <p className="text-gray-300 leading-relaxed">{rave.rave_description}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {!isOwner ? (
                                <>
                                    <button
                                        onClick={addToCart}
                                        className="flex-1 btn-primary flex items-center justify-center space-x-2"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        <span>In den Warenkorb</span>
                                    </button>

                                    <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                                        <Share2 className="w-5 h-5" />
                                        <span>"hallo ich bin ein button"</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={`/raves/${rave.rave_id}/edit`}
                                        className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                                    >
                                        <Edit className="w-5 h-5" />
                                        <span>Bearbeiten (noch nicht)</span>
                                    </Link>

                                    <button
                                        onClick={deleteRave}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                        <span>Löschen</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <Link
                        to="/raves"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ← Zurück zu allen Raves
                    </Link>
                </div>
            </div>
        </div>
    );
}