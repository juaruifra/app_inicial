import { listClientes } from "../data/mockApi";
import type { Cliente } from "../data/mockApi";

export async function getClientes(): Promise<Cliente[]> {
  return listClientes();
}
