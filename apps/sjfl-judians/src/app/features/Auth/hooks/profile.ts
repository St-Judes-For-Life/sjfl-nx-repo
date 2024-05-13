import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile } from '../services/profile.service';

export function useFetchProfile() {
  return useMutation({ mutationFn: getUserProfile });
}

export function useGetProfile() {
  return useQuery({ queryKey: ['profile'], queryFn: getUserProfile });
}

export function useUpdateProfile() {
  return useMutation({ mutationFn: updateUserProfile });
}
