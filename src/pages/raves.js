// src/pages/raves.js
import { supabase } from '../supabase/supabase.js';
import { addToCart } from '../supabase/cart.js';

/* ---------- Raves von Supabase ---------- */
export async function getRaves() {
    const { data, error } = await supabase
        .from('r_rave')
        .select(`*, r_genre!inner(genre_name), r_address!inner(land,plz,ort,strasse)`)
        .order('date', { ascending: true });

    if (error) {
        console.error('Supabase-Fehler:', error);
        return [];
    }
    return data;
}

/* ---------- Raves → HTML + Warenkorb-Button ---------- */
export function ravesToHTML(raves) {
    if (!raves.length) return '<p>Keine Raves gefunden.</p>';

    const list = raves.map(r => `
    <li>
      <strong>${r.rave_name}</strong>
      · ${new Date(r.date).toLocaleString('de-DE')}
      · ${r.r_genre.genre_name}<br>
      📍 ${r.r_address.strasse}, ${r.r_address.plz} ${r.r_address.ort} (${r.r_address.land})<br>
      🎟  ${(r.ticket_price / 100).toFixed(2)} €
      – Promoter: ${r.promoter_name || '–'}<br>
      <em>Line-up:</em> ${r.lineup || '–'}<br>

      <!-- In-den-Warenkorb-Button -->
      <form action="/cart" method="post" style="display:inline;margin-top:.5rem">
        <input type="hidden" name="rave_id" value="${r.rave_id}">
        <button type="submit" class="btn-cart">+ In den Warenkorb</button>
      </form>
    </li>`).join('');

    return `<h1>Upcoming Raves</h1><ul class="rave-list">${list}</ul>`;
}