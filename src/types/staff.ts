
export type StaffProfile = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: 'admin' | 'staff';
  user_type: 'staff';
  company_id: string | null;
};
