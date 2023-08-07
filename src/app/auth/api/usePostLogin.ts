import { http } from '@/app/api/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Login = async (payload: object) => {
  const { data } = await http.post(`user/token`, payload);
  return data;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation((payload: object) => {
    return Login(payload);
  }, {});
};
