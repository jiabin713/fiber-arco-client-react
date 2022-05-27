export interface StaffRecord {
  id: string;
  username: string;
  name: string;
  email: string;
  mobile: string;
  avatar: string;
  gender: string;
  organization_id: string;
  position_id: string;
  role_id: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
}

export interface StaffParams {
  username: string;
  name: string;
  email: string;
  mobile: string;
  organization_id: string;
  position_id: string;
  role_id: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
}

export interface StaffRequest {
  id: string;
  username: string;
  name: string;
  email: string;
  mobile: string;
  avatar: string;
  gender: string;
  organization_id: string;
  position_id: string;
  role_id: string;
  status: string;
  sort: number;
  remark: string;
}
