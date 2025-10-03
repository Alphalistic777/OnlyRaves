// src/pages/register.js
import { layout } from '../components/layout.js';
import { supabase } from '../supabase/supabase.js';

/*  HTML  */
export function registerHTML(errorMsg = '', genres = []) {
    const promoterOptions = `
    <label>
      <input type="checkbox" name="promoter" />
      Ich bin Promoter
    </label><br><br>`;

    return `
    <h1>Registrierung</h1>
    ${errorMsg ? `<p style="color:#ff00cc">${errorMsg}</p>` : ''}
    <form action="/register" method="post">
      <label>Email<br><input type="email" name="email" required /></label><br><br>
      <label>Passwort (min. 6 Zeichen)<br><input type="password" name="password" required /></label><br><br>

      <h3>Persönliche Daten</h3>
      <label>Vorname<br><input type="text" name="firstName" required /></label><br><br>
      <label>Nachname<br><input type="text" name="lastName" required /></label><br><br>
      <label>Alter<br><input type="number" name="age" min="0" required /></label><br><br>

      ${promoterOptions}

      <button type="submit">Konto erstellen</button>
    </form>
    <p>Bereits registriert? <a href="/login">Zum Login</a></p>`;
}

/*  Auth + Profil anlegen supabase */
export async function registerPOST(body, res) {
    try {
        // 1. Supabase Auth anlegen
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
            email: body.email,
            password: body.password
        });
        if (signUpError) throw signUpError;

        // 2.  Public-Profil einfügen
        const user = authData.user;
        const { error: dbError } = await supabase.from('r_user').insert({
            user_id: user.id,
            first_name: body.firstName,
            last_name: body.lastName,
            age: Number(body.age),
            promoter: Boolean(body.promoter)
        });
        if (dbError) throw dbError;

        // 3. Weiterleiten zu Login
        res.writeHead(302, { Location: '/login' }).end();
    } catch (err) {
        const html = layout(registerHTML(err.message), { title: 'Registrierung', active: '/register' });
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' }).end(html);
    }
}