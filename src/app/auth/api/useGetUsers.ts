import { http } from '@/app/api/http';
import { useQuery } from '@tanstack/react-query';

const getUsers = async () => {
  const { data } = await http.get(`DuDupedrosa`);

  return data;
};

export const useGetUsers = () => {
  return useQuery(['getUsers'], getUsers);
};
