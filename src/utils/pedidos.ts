import { EstadoPedido } from "../data/mockApi";

type EstadoPedidoUI = {
  label: string;
  color: string;
};

export function getEstadoPedidoUI(
  estado: EstadoPedido
): EstadoPedidoUI {
  switch (estado) {
    case "FINALIZADO":
      return {
        label: "FINALIZADO",
        color: "#2e7d32", // verde
      };

    case "PREPARADO":
      return {
        label: "PREPARADO",
        color: "#ef6c00", // naranja
      };

    case "ENTREGADO":
      return {
        label: "ENTREGADO",
        color: "#1565c0", // azul
      };

    case "PENDIENTE_REVISION":
      return {
        label: "PENDIENTE",
        color: "#f9a825", // amarillo
      };

    case "DEVUELTO":
      return {
        label: "DEVUELTO",
        color: "#6a1b9a", // morado
      };

    default:
      return {
        label: estado,
        color: "#616161", // gris
      };
  }
}
