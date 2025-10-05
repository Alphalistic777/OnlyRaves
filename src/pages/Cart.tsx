import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';
import type { Rave } from '../types';
import { motion } from 'framer-motion';
import {
    ShoppingCart,
    Trash2,
    Ticket,
    Calendar,
    MapPin,
    CreditCard,
} from 'lucide-react';
import toast from 'react-hot-toast';

export function Cart() {
    const [cartItems, setCartItems] = useState<Rave[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchCartItems();
        } else {
            navigate('/login');
        }
    }, [user]);

    const fetchCartItems = async () => {
        try {
            const { data, error } = await supabase
                .from('cart')
                .select(`
          *,
          rave:rave_id(*)
        `)
                .eq('user_id', user?.id);

            if (error) throw error;

            const items = data?.map(item => item.rave).filter(Boolean) || [];
            setCartItems(items);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            toast.error('Fehler beim Laden des Warenkorbs');
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (raveId: string) => {
        try {
            const { error } = await supabase
                .from('cart')
                .delete()
                .eq('user_id', user?.id)
                .eq('rave_id', raveId);

            if (error) throw error;

            setCartItems(cartItems.filter(item => item.rave_id !== raveId));
            toast.success('Rave aus Warenkorb entfernt');
        } catch (error) {
            console.error('Error removing from cart:', error);
            toast.error('Fehler beim Entfernen');
        }
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.ticket_price || 0);
        }, 0);
    };

    const handleCheckout = () => {
        toast.success('Checkout erfolgreich! 🎉');
        // In a real app, this would redirect to a payment processor
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <ShoppingCart className="w-8 h-8 text-rainbow-pink" />
                            <h1 className="text-3xl font-bold text-white">Warenkorb</h1>
                        </div>
                        <div className="text-sm text-gray-400">
                            {cartItems.length} {cartItems.length === 1 ? 'Event' : 'Events'}
                        </div>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="glass-card p-12 text-center">
                            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">Warenkorb ist leer</h3>
                            <p className="text-gray-400 mb-6">
                                Entdecke spannende Raves und füge sie zu deinem Warenkorb hinzu!
                            </p>
                            <button
                                onClick={() => navigate('/raves')}
                                className="btn-primary"
                            >
                                <span>Raves entdecken</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item, index) => (
                                    <motion.div
                                        key={item.rave_id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="glass-card p-4 flex items-center space-x-4"
                                    >
                                        <div className="w-16 h-16 bg-rainbow-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Ticket className="w-8 h-8 text-white" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold text-white truncate">
                                                {item.rave_name}
                                            </h3>

                                            <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{formatDate(item.rave_date)}</span>
                                                </div>

                                                {item.city && (
                                                    <div className="flex items-center space-x-1">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{item.city}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-xl font-bold text-rainbow-pink">
                                                {item.ticket_price ? `€${item.ticket_price}` : 'Free'}
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.rave_id)}
                                                className="text-sm text-gray-400 hover:text-red-400 transition-colors flex items-center space-x-1 mt-1"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                <span>Entfernen</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* cart zusammenfassung */}
                            <div className="lg:col-span-1">
                                <div className="glass-card p-6 sticky top-24">
                                    <h3 className="text-xl font-bold text-white mb-4">Zusammenfassung</h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-gray-300">
                                            <span>Kosten</span>
                                            <span>€{getTotalPrice().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-300">
                                            <span>Servicegebühr</span>
                                            <span>€{(getTotalPrice() * 0.1).toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-gray-600 pt-3">
                                            <div className="flex justify-between text-white font-bold text-lg">
                                                <span>Gesamt</span>
                                                <span className="text-rainbow-pink">
                          €{(getTotalPrice() * 1.1).toFixed(2)}
                        </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        className="w-full btn-primary flex items-center justify-center space-x-2 mb-4"
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        <span>Checkout (noch nicht)</span>
                                    </button>

                                    <div className="text-xs text-gray-400 text-center">
                                        Wir verkaufen deine Kontodaten weiter, nur an unsere vertrauten Partner natörlich.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}