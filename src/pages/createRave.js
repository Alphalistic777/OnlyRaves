// src/pages/createRave.js
import { layout } from '../components/layout.js';
import { supabase } from '../supabase/supabase.js';
import { getUser } from '../supabase/auth.js';

/* HTML */
export async function createRaveHTML(errorMsg = '', genres = [], addresses = []) {
    const genreOptions = genres.map(g => `<option value="${g.genre_id}">${g.genre_name}</option>`).join('');
    const addressOptions = addresses.map(a =>
        `<option value="${a.address_id}">${a.strasse}, ${a.plz} ${a.ort}</option>`).join('');

    return `
    <h1>Neuen Rave erstellen</h1>
    ${errorMsg ? `<p style="color:#ff00cc">${errorMsg}</p>` : ''}
    <form action="/create-rave" method="post">
      <label>Name<br><input type="text" name="rave_name" required /></label><br><br>
      <label>Datum & Uhrzeit<br><input type="datetime-local" name="date" required /></label><br><br>

      <label>Genre<br>
        <select name="genre_id" required>
          <option value="">–– bitte wählen ––</option>${genreOptions}
        </select>
      </label><br><br>

      <label>Adresse<br>
        <select name="address_id" required>
          <option value="">–– bitte wählen ––</option>${addressOptions}
        </select>
      </label><br><br>

      <label>Promoter-Name<br><input type="text" name="promoter_name" /></label><br><br>
      <label>Line-Up<br><textarea name="lineup" rows="3"></textarea></label><br><br>
      <label>Ticket-Preis (in Cent)<br><input type="number" name="ticket_price" min="0" required /></label><br><br>

      <button type="submit">Rave erstellen</button>
    </form>`;
}

/* Daten laden  */
async function getGenres() {
    const { data, error } = await supabase.from('r_genre').select('*').order('genre_name');
    return error ? [] : data;
}
async function getAddresses() {
    const { data, error } = await supabase.from('r_address').select('*').order('strasse');
    return error ? [] : data;
}

/*  POST  */
export async function createRavePOST(body, res) {
    try {
        const user = await getUser();
        if (!user) throw new Error('Nicht eingeloggt');
        if (!user.promoter) throw new Error('Nur Promoter dürfen Raves erstellen');

        const { error } = await supabase.from('r_rave').insert({
            rave_name: body.rave_name,
            date: body.date,
            genre_id: Number(body.genre_id),
            address_id: Number(body.address_id),
            promoter_name: body.promoter_name || null,
            lineup: body.lineup || null,
            ticket_price: Number(body.ticket_price)
        });
        if (error) throw error;

        res.writeHead(302, { Location: '/raves' }).end();
    } catch (err) {
        const genres = await getGenres();
        const addresses = await getAddresses();
        const html = layout(
            await createRaveHTML(err.message, genres, addresses),
            { title: 'Rave erstellen', active: '/create-rave' }
        );
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' }).end(html);
    }
}