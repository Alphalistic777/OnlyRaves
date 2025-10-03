// src/supabase/auth.js
import { supabase } from './supabase.js';

/* ------------------  helpers  ------------------ */
export async function register({ email, password, firstName, lastName, age }) {
    // 1. create auth user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { first_name: firstName, last_name: lastName, age } }

    });
    if (signUpError) throw signUpError;

    // 2. create public profile row (r_user)
    const user = authData.user;
    const { error: dbError } = await supabase.from('r_user').insert({
        user_id: user.id,
        first_name: firstName,
        last_name: lastName,
        age,
        promoter: false
    });
    if (dbError) throw dbError;

    return user;
}

export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export async function getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // optional: public profile fields mitliefern
    const { data: profile } = await supabase
        .from('r_user')
        .select('first_name, last_name, age, promoter')
        .eq('user_id', user.id)
        .single();
    return { ...user, ...profile };
}