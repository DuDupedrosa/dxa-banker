import { http } from '@/app/api/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const sendNewPassword = async (payload: object) => {
  const { data } = await http.post(`user/forgot-password-link/reset`, payload);
  return data;
};

export const useSendNewPassword = () => {
  const queryClient = useQueryClient();

  return useMutation((payload: object) => {
    return sendNewPassword(payload);
  }, {});
};
