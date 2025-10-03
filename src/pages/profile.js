// src/pages/profile.js
import { layout } from '../components/layout.js';
import { supabase } from '../supabase/supabase.js';
import { getUser } from '../supabase/auth.js';

/* HTML  */
export async function profileHTML(errorMsg = '') {
    const user = await getUser();
    if (!user) return '<p>Bitte einloggen.</p>';

    const { data: profile } = await supabase
        .from('r_user')
        .select('first_name, last_name, age, promoter')
        .eq('user_id', user.id)
        .single();

    const checked = profile?.promoter ? 'checked' : '';

    return `
    <h1>Profil</h1>
    ${errorMsg ? `<p style="color:#ff00cc">${errorMsg}</p>` : ''}
    <form action="/profile" method="post">
      <label>Vorname<br><input type="text" name="firstName" value="${profile?.first_name || ''}" required /></label><br><br>
      <label>Nachname<br><input type="text" name="lastName" value="${profile?.last_name || ''}" required /></label><br><br>
      <label>Alter<br><input type="number" name="age" min="0" value="${profile?.age || ''}" required /></label><br><br>

      <label>
        <input type="checkbox" name="promoter" ${checked} />
        Ich bin Promoter
      </label><br><br>

      <button type="submit">Speichern</button>
    </form>

    <!-- Ausloggen-Button -->
    <form action="/logout" method="post" style="margin-top:2rem">
      <button type="submit">Ausloggen</button>
    </form>`;
}

/* Speichern  */
export async function profilePOST(body, res) {
    try {
        const user = await getUser();
        if (!user) throw new Error('Nicht eingeloggt');

        const { error } = await supabase
            .from('r_user')
            .upsert({
                user_id: user.id,
                first_name: body.firstName,
                last_name: body.lastName,
                age: Number(body.age),
                promoter: Boolean(body.promoter)
            }, { onConflict: 'user_id' });

        if (error) throw error;
        res.writeHead(302, { Location: '/profile' }).end();
    } catch (err) {
        const html = layout(await profileHTML(err.message), { title: 'Profil', active: '/profile' });
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' }).end(html);
    }
}