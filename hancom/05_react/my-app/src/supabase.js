import { createClient } from '@supabase/supabase-js'

// Supabase 프로젝트 URL과 공개 키 (anon key는 클라이언트에 노출되어도 안전한 공개 키)
const supabaseUrl = 'https://ulcbqogcyxpttwhhgkww.supabase.co'
const supabaseAnonKey = 'sb_publishable_VNmdcI-WNtxfYmu8UCSNbw_WNKlgdDi'

// Supabase 클라이언트 생성 및 내보내기 (Auth, DB 등 모든 기능을 이 인스턴스로 사용)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
