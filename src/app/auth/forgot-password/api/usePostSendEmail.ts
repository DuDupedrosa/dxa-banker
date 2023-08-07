import { http } from '@/app/api/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const sendEmail = async (payload: object) => {
  const { data } = await http.post(`user/forgot-password-link`, payload);
  return data;
};

export const useSendEmail = () => {
  const queryClient = useQueryClient();

  return useMutation((payload: object) => {
    return sendEmail(payload);
  }, {});
};
