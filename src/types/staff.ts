
export type StaffProfile = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: 'admin' | 'staff' | 'provider' | 'company';
  user_type: 'admin' | 'staff' | 'provider' | 'company';
  company_id: string | null;
  created_at: string;
  updated_at: string;
};
