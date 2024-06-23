import { Staff } from '../models/staff.model';

export interface StaffStateModel {
  isLoading: boolean;
  staffDetail: any;
  staffList: Array<Staff>;
  roleStaffList: Array<Staff>;
  totalCount: number;
}

export const initialStaffStateModel: StaffStateModel = {
  isLoading: false,
  staffDetail: {},
  staffList: [],
  roleStaffList: [],
  totalCount: 0,
};
