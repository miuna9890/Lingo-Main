import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ofuxcybiaalpnafsswou.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdXhjeWJpYWFscG5hZnNzd291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNTA5MzUsImV4cCI6MjAzMjgyNjkzNX0.RujmbMzYZv7V4vvUx06w8Z5e5NejLA8H_ZCs6hDYkOI'
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
  