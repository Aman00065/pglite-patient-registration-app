export interface Patient {
  id: string
  first_name: string
  last_name: string
  date_of_birth: string
  gender: string
  email?: string | null
  phone?: string | null
  address?: string | null
  medical_history?: string | null
  created_at: string
}
