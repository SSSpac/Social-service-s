'use server'
import {createServerClient} from '@supabase/ssr'
import { Database } from "./database.types";
import { cookies } from 'next/headers';

export const createClient = async () => {
    const cookieStores = await cookies();

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStores.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({
                            name, value, options }) => {
                            cookieStores.set(name, value, options);
                        })
                    }
                    catch {
                        
                    }
                }
            }
        }   
    )
}  