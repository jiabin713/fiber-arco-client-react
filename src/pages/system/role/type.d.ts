export interface RoleRecord {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
}

export interface RoleParams {
  name: string;
  code: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
}

export interface RoleRequest {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
}
