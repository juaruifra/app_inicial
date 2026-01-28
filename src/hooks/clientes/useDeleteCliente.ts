import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClienteApi } from "../../services/clientesSupabaseService";
import { clientesQueryKey } from "../queryKeys";

export function useDeleteCliente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clienteId: number) => deleteClienteApi(clienteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientesQueryKey });
    },
  });
}
