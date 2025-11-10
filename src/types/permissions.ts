export enum PERMISSIONS {
  _WRITE = "create",
  _READ = "read",
  _UPDATE = "update",
  _DELETE = "delete",
}

export type Permissions = Array<PERMISSIONS>;
