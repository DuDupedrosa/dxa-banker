import { http } from '@/app/api/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const validateToken = async (payload: object) => {
  const { data } = await http.post(
    `user/forgot-password-link/validate`,
    payload
  );
  return data;
};

export const useValidateToken = () => {
  const queryClient = useQueryClient();

  return useMutation((payload: object) => {
    return validateToken(payload);
  }, {});
};
