import { GlobalConfig } from 'ngx-toastr';

export const TOAST_CONFIG: Partial<GlobalConfig> = {
  timeOut: 3000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
  progressBar: true,
  progressAnimation: 'increasing',
  closeButton: true,
  maxOpened: 1,
};
