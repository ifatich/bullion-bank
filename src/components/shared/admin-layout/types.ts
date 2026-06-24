export type AdminNavIcon = 'home' | 'user' | 'document' | 'admin' | 'profile' | 'approval'

export interface AdminNavItem {
  label: string
  icon: AdminNavIcon
  active?: boolean
  href?: string
  route?: string
}
