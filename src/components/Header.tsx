import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Music, ShoppingCart, User, LogOut, PlusCircle } from 'lucide-react';

export function Header() {
    const { user, userData, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <header className="sticky top-0 z-50 glass-card border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-rainbow-gradient rounded-lg animate-rainbow" />
                        <span className="text-2xl font-bold rainbow-text">OnlyRaves</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/raves"
                            className="flex items-center space-x-1 text-white hover:text-rainbow-pink transition-colors"
                        >
                            <Music className="w-4 h-4" />
                            <span>Raves</span>
                        </Link>

                        {user && (
                            <>
                                <Link
                                    to="/cart"
                                    className="flex items-center space-x-1 text-white hover:text-rainbow-pink transition-colors"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>Warenkorb</span>
                                </Link>

                                <Link
                                    to="/promotion"
                                    className="flex items-center space-x-1 text-white hover:text-rainbow-pink transition-colors"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    <span>Promotion</span>
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                <span className="text-sm text-gray-300">
                  Willkommen, {userData?.first_name || userData?.username || 'Raver'}
                </span>
                                <div className="flex items-center space-x-2">
                                    <Link
                                        to="/profile"
                                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                    >
                                        <User className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-white hover:text-rainbow-pink transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn-primary"
                                >
                                    <span>Registrieren</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}