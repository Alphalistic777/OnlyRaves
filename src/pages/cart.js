// src/pages/cart.js
import { layout } from '../components/layout.js';
import { listCart, removeFromCart } from '../supabase/cart.js';
import { getUser } from '../supabase/auth.js';

/* ---------- Warenkorb → HTML ---------- */
export function cartHTML(items) {
    if (!items.length) return '<h1>Warenkorb</h1><p>Cart ist leer.</p>';

    const rows = items.map(i => `
    <li>
      <strong>${i.rave.rave_name}</strong>
      · ${new Date(i.rave.date).toLocaleString('de-DE')}
      · ${i.rave.genre.genre_name}<br>
      📍 ${i.rave.address.strasse}, ${i.rave.address.plz} ${i.rave.address.ort}<br>
      🎟  ${(i.rave.ticket_price / 100).toFixed(2)} €
      <form action="/cart/remove" method="post" style="display:inline;margin-left:1rem">
        <input type="hidden" name="cart_id" value="${i.cart_id}">
        <button type="submit" class="btn-remove">entfernen</button>
      </form>
    </li>`).join('');

    const total = (items.reduce((s, i) => s + i.rave.ticket_price, 0) / 100).toFixed(2);
    return `<h1>Warenkorb</h1><ul class="cart-list">${rows}</ul><p class="cart-total"><strong>Gesamt: ${total} €</strong></p>`;
}

/* ---------- POST-Handler (nur für Entfernen) ---------- */
export async function cartRemovePOST(body, res) {
    await removeFromCart(Number(body.cart_id));
    res.writeHead(302, { Location: '/cart' }).end();
}