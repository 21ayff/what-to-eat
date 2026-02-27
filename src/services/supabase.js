import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rjafjjbvjrisyvmkutpv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_3NmA63e0J9Yq0J418quMqQ_wSvdBHca'

export const supabase = createClient(supabaseUrl, supabaseKey)
