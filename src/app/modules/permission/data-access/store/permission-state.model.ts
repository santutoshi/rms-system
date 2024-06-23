import { ModuleNode } from '../modal';

export interface PermissionStateModel {
  errorMessage: Error | null;
  isLoading: boolean;
  permissionList: Array<ModuleNode>;
}

export const initialPermissionStateModel: PermissionStateModel = {
  errorMessage: null,
  isLoading: false,
  permissionList: [],
};
