import { initialValueRole } from '../const/roles.const';
import { Role } from '../models/roles';

export interface RoleStateModel {
  isLoading: boolean;
  roleDetail: Role;
  selectedRoleDetail: Role;
  roleList: Array<Role>;
  totalCount: number;
  assignedStaff: Array<any>;
}

export const initialRoleStateModel: RoleStateModel = {
  isLoading: false,
  roleDetail: initialValueRole,
  selectedRoleDetail: initialValueRole,
  roleList: [],
  totalCount: 0,
  assignedStaff: [],
};
