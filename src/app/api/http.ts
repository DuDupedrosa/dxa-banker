import { errorStatusEnum } from '@/helper/enums/ErrorStatusEnum';
import axios from 'axios';

export const http = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});

http.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    const errStatus = error.response.status;
    const pathName = window.location.pathname;
    const router = {
      auth: '/auth',
      resetPasswordStep3: '/auth/new-password2',
    };

    // locais em que pode dar 401 mas o tratamento desse erro é feito diretamente no componente
    if (
      errStatus === errorStatusEnum.UNAUTHORIZED &&
      pathName !== router.auth &&
      pathName !== router.resetPasswordStep3
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.setItem('unauthorized', 'true');
      window.location.href = '/auth';
    }

    return Promise.reject(error);
  }
);
