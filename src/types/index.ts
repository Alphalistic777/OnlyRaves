// Database types based on Supabase schema

export interface User {
    id: string;
    email?: string;
    user_metadata?: {
        first_name?: string;
        last_name?: string;
        username?: string;
    };
}

export interface UserData {
    user_id: string;
    first_name: string | null;
    last_name: string | null;
    username: string | null;
    age: number | null;
}

export interface Genre {
    genre_id: string;
    genre_name: string;
    hardness: number;
}

export interface Rave {
    rave_id: string;
    user_id: string;
    genre_id: string | null;
    rave_name: string;
    rave_date: string;
    rave_description: string | null;
    ticket_price: number | null;
    street: string | null;
    zip_code: string | null;
    city: string | null;
    // Joined data
    genre?: Genre;
    promoter?: UserData;
}

export interface Cart {
    cart_id: string;
    user_id: string;
    rave_id: string;
    // Joined data
    rave?: Rave;
}

export interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, userData: Partial<UserData>) => Promise<void>;
    signOut: () => Promise<void>;
}

export interface FilterOptions {
    genre?: string;
    dateFrom?: string;
    dateTo?: string;
    city?: string;
    priceRange?: [number, number];
}