import { AxiosError } from 'axios';

export function getValidationError(axiosError: AxiosError | any) {
  let errorMessage = '';
  if (axiosError.response?.data?.errors){
    errorMessage = Object.values(axiosError.response.data.errors)[0] as string;
  }

  return errorMessage;
}