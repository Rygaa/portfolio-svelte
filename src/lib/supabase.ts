import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';
import type { Database } from './database.types';

const supabaseUrl = process.env['SUPABASE_URL'] || '';
const supabaseKey = process.env['SUPABASE_ANON_KEY'] || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
export const shouldTrack = env['PUBLIC_SHOULD_TRACK'] === 'true';

console.log('🔧 Supabase initialized | Tracking:', shouldTrack);
