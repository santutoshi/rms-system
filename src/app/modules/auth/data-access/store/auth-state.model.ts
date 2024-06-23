export interface AuthStateModel {
  errorMessage: Error | null;
  isLoading: boolean;
  token: string | null;
}

export const initialAuthStateModel: AuthStateModel = {
  errorMessage: null,
  isLoading: false,
  token: null,
};
