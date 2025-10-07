import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Music, Sparkles, Zap, Heart } from 'lucide-react';

export function Home() {
    const { user, userData } = useAuth();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rainbow-pink/20 rounded-full blur-3xl animate-pulse-slow" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rainbow-purple/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rainbow-blue/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-6">
                            <span className="rainbow-text neon-glow">OnlyRaves</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 mb-8">
                            {user
                                ? `Willkommen zurück, ${userData?.first_name || 'Raver'}! Bereit für dein nächstes Abenteuer?`
                                : 'Willkommen Raver! Entdecke die wildesten Partys und buche deine Tickets im Handumdrehen.'
                            }
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Link
                                to="/raves"
                                className="bg-gradient-to-r from-rainbow-pink to-rainbow-purple text-white text-lg px-8 py-4 rounded-full flex items-center space-x-2 shadow-md hover:scale-105 transition"
                            >
                                <Music className="w-5 h-5" />
                                <span>Raves entdecken</span>
                            </Link>


                            {user && (
                                <Link
                                    to="/promotion"
                                    className="btn-secondary text-lg px-8 py-4"
                                >
                  <span className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Eigene Raves</span>
                  </span>
                                </Link>
                            )}
                        </div>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <div className="glass-card p-6 text-center">
                            <div className="w-12 h-12 bg-rainbow-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                            <p className="text-gray-400">Schnelle Buchung und sofortige Bestätigung deiner Tickets</p>
                        </div>

                        <div className="glass-card p-6 text-center">
                            <div className="w-12 h-12 bg-neon-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Für Raver</h3>
                            <p className="text-gray-400">Von Ravern für Raver - wir verstehen deine Bedürfnisse</p>
                        </div>

                        <div className="glass-card p-6 text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-rainbow-pink to-rainbow-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Premium Experience</h3>
                            <p className="text-gray-400">Exklusive Events und VIP-Zugang für unsere Community</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why OnlyRaves */}
            <section className="py-20 bg-dark-800/50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 rainbow-text">Warum OnlyRaves?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-5xl mb-4">🎭</div>
                            <h3 className="text-xl font-semibold mb-2">Anonym & Sicher</h3>
                            <p className="text-gray-400">Deine Privatsphäre ist uns wichtig. Wir sammeln jegliche Daten über dich und verkaufen sie weiter. Bei Risiken und Nebenwirkungen strangulieren sie ihren Arzt oder Apotheker</p>
                        </div>

                        <div className="text-center">
                            <div className="text-5xl mb-4">🌈</div>
                            <h3 className="text-xl font-semibold mb-2">LGBTQ+ Friendly</h3>
                            <p className="text-gray-400">Eine sichere und inclusive Community für alle.</p>
                        </div>

                        <div className="text-center">
                            <div className="text-5xl mb-4">🔥</div>
                            <h3 className="text-xl font-semibold mb-2">Kinky Vibes</h3>
                            <p className="text-gray-400">Entdecke Events mit extra Spice und freizügiger Atmosphäre.</p>
                        </div>

                        <div className="text-center">
                            <div className="text-5xl mb-4">💎</div>
                            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                            <p className="text-gray-400">Nur die besten Locations und exklusive Partnerschaften.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold mb-6">Bereit für dein nächstes Abenteuer?</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Tausende Raver vertrauen bereits auf OnlyRaves für ihre unvergesslichen Nächte (wegen Filmriss du weißt, jaja).
                    </p>

                    {!user && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/login"
                                className="btn-primary px-8 py-4 text-lg"
                            >
                                <span>Login</span>
                            </Link>
                            <Link
                                to="/register"
                                className="btn-secondary px-8 py-4 text-lg"
                            >
                                Jetzt registrieren
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}