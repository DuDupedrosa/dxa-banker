import { http } from '@/app/api/http';
import { useQuery } from '@tanstack/react-query';

const getCompanies = async () => {
  const token = localStorage.getItem('token');
  const { data } = await http.get(`investmentvehicle`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetCompanies = () => {
  return useQuery(['getCompanies'], getCompanies);
};
