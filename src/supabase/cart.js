// src/supabase/cart.js
import { supabase } from './supabase.js';

export async function addToCart(raveId) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase.from('r_cart').insert({
        user_id: user.id,
        rave_id: raveId
    });
    if (error) throw error;
}

export async function listCart() {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return [];

    const { data, error } = await supabase
        .from('r_cart')
        // JOIN zu Rave + Genre + Address
        .select(`
      cart_id,
      rave: rave_id (
        rave_id, rave_name, date, ticket_price,
        genre: genre_id (genre_name),
        address: address_id (land, plz, ort, strasse)
      )
    `)
        .eq('user_id', user.id);

    if (error) {
        console.error('listCart-Fehler:', error);
        return [];
    }
    return data;
}

export async function removeFromCart(cartId) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
        .from('r_cart')
        .delete()
        .eq('cart_id', cartId)
        .eq('user_id', user.id);   // double-check ownership
    if (error) throw error;
}

export async function clearCart() {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
        .from('r_cart')
        .delete()
        .eq('user_id', user.id);
    if (error) throw error;
}