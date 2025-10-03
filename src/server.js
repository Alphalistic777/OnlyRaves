// src/server.js
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { supabase } from './supabase/supabase.js';
import { layout } from './components/layout.js';

// helper
import { loginHTML, loginPOST } from './pages/login.js';
import { registerHTML, registerPOST } from './pages/register.js';
import { profileHTML, profilePOST } from './pages/profile.js';
import { cartHTML } from './pages/cart.js';
import { getRaves, ravesToHTML } from './pages/raves.js';
import { createRaveHTML, createRavePOST } from './pages/createRave.js';

// Auth und Cart
import { getUser, logout } from './supabase/auth.js';
import { listCart, addToCart, removeFromCart } from './supabase/cart.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

/*  body parser  */
async function parseBody(req) {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    return Object.fromEntries(new URLSearchParams(Buffer.concat(chunks).toString()));
}

/* css */
const cssHandler = (fileName, res) => {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(readFileSync(join(__dirname, 'main', fileName), 'utf-8'));
};

/* peromoter helper */
async function getGenres() {
    const { data, error } = await supabase.from('r_genre').select('*').order('genre_name');
    return error ? [] : data;
}
async function getAddresses() {
    const { data, error } = await supabase.from('r_address').select('*').order('strasse');
    return error ? [] : data;
}

/* router */
const router = async (req, res) => {
    if (req.url === '/main/styles.css') return cssHandler('styles.css', res);
    if (req.url === '/main/layout.css') return cssHandler('layout.css', res);

    const user = await getUser();
    const authState = (title = '', active = '') => ({ user, title, active });

    try {
        switch (`${req.method} ${req.url}`) {
            case 'GET /':
                res.writeHead(302, { Location: '/raves' }).end();
                break;

            case 'GET /raves': {
                const raves = await getRaves();
                const html = layout(ravesToHTML(raves), authState('Upcoming Raves', '/raves'));
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(html);
                break;
            }

            /* auth */
            case 'GET /login': {
                const html = layout(loginHTML(), authState('Login', '/login'));
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(html);
                break;
            }
            case 'POST /login': {
                const body = await parseBody(req);
                await loginPOST(body, res);
                break;
            }

            case 'GET /register': {
                const html = layout(registerHTML(), authState('Registrierung', '/register'));
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(html);
                break;
            }
            case 'POST /register': {
                const body = await parseBody(req);
                await registerPOST(body, res);
                break;
            }
            case 'POST /logout': {
                await logout();
                res.writeHead(302, { Location: '/raves' }).end();
                break;
            }

            /* -profile */
            case 'GET /profile': {
                if (!user) return res.writeHead(302, { Location: '/login' }).end();
                const html = layout(await profileHTML(), authState('Profil', '/profile'));
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(html);
                break;
            }
            case 'POST /profile': {
                if (!user) return res.writeHead(401).end('Unauthorized');
                const body = await parseBody(req);
                await profilePOST(body, res);
                break;
            }

            /* cart */
            case 'GET /cart': {
                if (!user) return res.writeHead(302, { Location: '/login' }).end();
                const items = await listCart();
                const html = layout(cartHTML(items), authState('Warenkorb', '/cart'));
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(html);
                break;
            }
            case 'POST /cart': {
                if (!user) return res.writeHead(401).end('Unauthorized');
                const body = await parseBody(req);
                await addToCart(Number(body.rave_id));
                res.writeHead(302, { Location: '/cart' }).end();
                break;
            }
            case 'POST /cart/remove': {
                if (!user) return res.writeHead(401).end('Unauthorized');
                const body = await parseBody(req);
                await removeFromCart(Number(body.cart_id));
                res.writeHead(302, { Location: '/cart' }).end();
                break;
            }

            /* create rave (nur promoter) */
            case 'GET /create-rave': {
                if (!user || !user.promoter) return res.writeHead(403).end('Forbidden');
                const genres = await getGenres();
                const addresses = await getAddresses();
                const html = layout(
                    await createRaveHTML('', genres, addresses),
                    { title: 'Rave erstellen', active: '/create-rave' }
                );
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(html);
                break;
            }
            case 'POST /create-rave': {
                if (!user || !user.promoter) return res.writeHead(401).end('Unauthorized');
                const body = await parseBody(req);
                await createRavePOST(body, res);
                break;
            }

            default:
                res.writeHead(404).end('Not Found');
        }
    } catch (e) {
        console.error(e);
        res.writeHead(500).end('Internal Server Error');
    }
};

createServer(router).listen(PORT, () => {
    console.log(`🚀  Central server running → http://localhost:${PORT}`);
});