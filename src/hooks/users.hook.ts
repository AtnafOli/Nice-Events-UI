import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";

export const useUsers = () => {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: authService.getAllUsers,
  });

  const blockUserMutation = useMutation({
    mutationFn: authService.blockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const unblockUserMutation = useMutation({
    mutationFn: authService.unblockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const blockUser = (userId: number) => blockUserMutation.mutate(userId);
  const unblockUser = (userId: number) => unblockUserMutation.mutate(userId);

  return {
    users,
    isLoading,
    isError,
    error,
    blockUser,
    unblockUser,
    isBlocking: blockUserMutation.isPending,
    isUnblocking: unblockUserMutation.isPending,
    blockError: blockUserMutation.error,
    unblockError: unblockUserMutation.error,
  };
};
