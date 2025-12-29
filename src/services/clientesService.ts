import { listClientes } from "../data/mockApi";
import type { Cliente } from "../data/mockApi";

export async function getClientes(): Promise<Cliente[]> {
  return listClientes();
}

export async function getClienteById(id: number): Promise<Cliente | null>{
  const clientes = await getClientes();
  return clientes.find(cliente => cliente.id === id) || null;
}
