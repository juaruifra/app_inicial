// Clientes
export const clientesQueryKey = ["clientes"] as const;

export const clienteQueryKey = (id: number) => ["clientes", id] as const;

// Dejamos preparados pedidos 
export const pedidosQueryKey = ["pedidos"] as const;

export const pedidosByClienteQueryKey = (clienteId: number) => 
    ["pedidos", "cliente", clienteId] as const;
