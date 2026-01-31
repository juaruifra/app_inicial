import { supabase } from "../lib/supabaseClient";
import { PedidoConDetalle } from "../types/Pedido";

type PedidoRow = {
  id: number;
  codigo: string;
  cliente_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  creado_por: number;
  notas: string | null;
};

export async function fetchPedidosByCliente(
  clienteId: number
): Promise<PedidoConDetalle[]> {
  const { data, error } = await supabase
    .from("pedidos")
    .select("*")
    .eq("cliente_id", clienteId)
    .order("fecha_inicio", { ascending: false });

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  // De momento devolvemos pedidos sin lineas
  // Mantiene el contrato de PedidoConDetalle
  return data.map((row: PedidoRow) => ({
    id: row.id,
    codigo: row.codigo,
    clienteId: row.cliente_id,
    fechaInicio: row.fecha_inicio,
    fechaFin: row.fecha_fin,
    estado: row.estado as any,
    creadoPor: row.creado_por,
    notas: row.notas ?? undefined,
    cliente: undefined as any,
    direccionEntrega: undefined,
    direccionRecogida: undefined,
    lineas: [],
    totalUnidades: 0,
    totalImporte: 0,
  }));
}
