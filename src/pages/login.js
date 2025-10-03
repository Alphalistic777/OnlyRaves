// src/pages/login.js
import { layout } from '../components/layout.js';
import { login } from '../supabase/auth.js';

export function loginHTML(errorMsg = '') {
    return `
    <h1>Login</h1>
    ${errorMsg ? `<p style="color:#ff00cc">${errorMsg}</p>` : ''}
    <form action="/login" method="post">
      <label>Email<br><input type="email" name="email" required /></label><br><br>
      <label>Passwort<br><input type="password" name="password" required /></label><br><br>
      <button type="submit">Einloggen</button>
    </form>
    <p>Noch kein Konto? <a href="/register">Hier registrieren</a></p>`;
}

export async function loginPOST(body, res) {
    try {
        await login(body.email, body.password);
        res.writeHead(302, { Location: '/raves' }).end();
    } catch (err) {
        const html = layout(loginHTML(err.message), { title: 'Login', active: '/login' });
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' }).end(html);
    }
}