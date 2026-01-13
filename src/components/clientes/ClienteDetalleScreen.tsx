import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator, Button, Card, Divider, Text, SegmentedButtons,List  } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";

import { Cliente } from "../../data/mockApi";
import { getClienteById, updateCliente, deleteCliente } from "../../services/clientesService";

import { PedidoConDetalle } from "../../data/mockApi";
import { getPedidosByCliente } from "../../services/pedidosService";
import PedidoItem from "./PedidoItem";
// Modal reutilizable de crear / editar cliente
import ClienteFormModal from "./form/ClienteFormModal";

// Tipo del formulario (Cliente sin id)
import { ClienteFormValues } from "./form/clienteForm.types";

import { useConfirmAction } from "../../hooks/useConfirmAction";

export default function ClienteDetalleScreen() {

    // Leemos el id de la ruta
    const { id } = useLocalSearchParams();

    // Estados del componente
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [pedidos, setPedidos] = useState<PedidoConDetalle[]>([]);
    const [isLoadingPedidos, setIsLoadingPedidos] = useState(true);

    // Controla si el modal de edición está abierto
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    // Todo lo necesario del hook de confirmación / error
    const { confirm, ConfirmDialogUI } = useConfirmAction();

    // Controla qué sección se está mostrando
    const [activeTab, setActiveTab] = useState<"info" | "pedidos">("info")

    // Carga los pedidos del cliente
    const loadPedidos = async () => {

        if (!id) return;

        try {
            const data = await getPedidosByCliente(Number(id));
            setPedidos(data);
            //console.log("Pedidos cargados:", data.length);
        } finally {
            setIsLoadingPedidos(false);
        }
    };

    // Carga el cliente por id
    const loadCliente = async () => {
        try {
            const clienteId = Number(id);
            const data = await getClienteById(clienteId);
            setCliente(data);
        } finally {
            setIsLoading(false);
        }
    };

    // Maneja el borrado del cliente con confirmación
    const handleDeleteCliente = (cliente: Cliente) => {
        confirm({
            title: "Borrar cliente",
            message: `¿Seguro que quieres borrar a ${cliente.nombre}?`,
            action: () => deleteCliente(cliente.id),
            onSuccess: () => {
                // Si todo va bien te envia a la lista de clientes
                router.replace("/clientes");
            },
        });
    };

    useEffect(() => {
        // Protección básica por si el id no existe
        if (!id || Array.isArray(id)) {
        setIsLoading(false);
        return;
        }

        loadCliente();
    }, [id]);

    useEffect(() => {
        loadPedidos();
    }, [id]);

    // Estado de carga
    if (isLoading) {
        return (
        <View style={styles.center}>
            <ActivityIndicator />
        </View>
        );
    }

    // Cliente no encontrado
    if (!cliente) {
        return (
        <View style={styles.center}>
            <Text>Cliente no encontrado</Text>
        </View>
        );
    }

    // Valores iniciales para el formulario de edición
    const editInitialValues: ClienteFormValues = {
        nombre: cliente.nombre,
        nifCif: cliente.nifCif ?? "",
        telefono: cliente.telefono ?? "",
        email: cliente.email ?? "",
        notas: cliente.notas ?? "",
        activo: cliente.activo,
    };

  // Cliente encontrado
  return (
    <View style={{ flex: 1 }}>
        {/* <AppHeader title="Detalle Cliente" /> */}

        {/* Botones de cambio de vista */}
        <View style={styles.tabsWrapper}>
            <SegmentedButtons
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "info" | "pedidos")}
            buttons={[
                {
                value: "info",
                label: "Datos del Cliente",
                },
                {
                value: "pedidos",
                label: "Pedidos",
                },
            ]}
            />
        </View>

        <ScrollView style={styles.container}
        contentContainerStyle={styles.scrollContent}>
            {activeTab === "info" && (
                <>
                    <Text variant="headlineSmall" style={styles.title}>
                    {cliente.nombre}
                    </Text>

                    <Card style={styles.card}>
                        <Card.Content>

                            <List.Item
                            title="Email"
                            description={cliente.email || "—"}
                            left={(props) => (
                                <List.Icon {...props} icon="email-outline" />
                            )}
                            />

                            <Divider />

                            <List.Item
                            title="DNI / CIF"
                            description={cliente.nifCif || "—"}
                            left={(props) => (
                                <List.Icon {...props} icon="card-account-details-outline" />
                            )}
                            />

                            <Divider />

                            <List.Item
                            title="Teléfono"
                            description={cliente.telefono || "—"}
                            left={(props) => (
                                <List.Icon {...props} icon="phone-outline" />
                            )}
                            />

                            <Divider />

                            <List.Item
                            title="Notas"
                            description={cliente.notas || "—"}
                            descriptionNumberOfLines={3}
                            left={(props) => (
                                <List.Icon {...props} icon="note-text-outline" />
                            )}
                            />

                            <Divider />

                            <List.Item
                            title="Estado"
                            description={cliente.activo ? "Activo" : "Inactivo"}
                            left={(props) => (
                                <List.Icon
                                {...props}
                                icon={
                                    cliente.activo
                                    ? "check-circle-outline"
                                    : "close-circle-outline"
                                }
                                color={cliente.activo ? "#2E7D32" : "#C62828"}
                                />
                            )}
                            />

                        </Card.Content>
                    </Card>


                    <Button
                    mode="outlined"
                    style={{ marginTop: 16 }}
                    onPress={() => setIsEditModalVisible(true)}
                    >
                    Editar cliente
                    </Button>

                    <Button
                    mode="contained"
                    buttonColor="#B00020"
                    textColor="white"
                    style={{ marginTop: 16 }}
                    icon="trash-can-outline"
                    onPress={() => handleDeleteCliente(cliente)}
                    >
                    Borrar cliente
                    </Button>
                </>
            )}

            {activeTab === "pedidos" && (
            <>
                <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                Pedidos
                </Text>

                {isLoadingPedidos ? (
                <ActivityIndicator style={{ marginTop: 8 }} />
                ) : pedidos.length === 0 ? (
                <Text style={{ marginTop: 8 }}>
                    Este cliente no tiene pedidos
                </Text>
                ) : (
                pedidos.map((p) => (
                    <PedidoItem
                    key={p.id}
                    pedido={p}
                    onPress={() => console.log("Pedido pulsado:", p.id)}
                    />
                ))
                )}
            </>
            )}


        </ScrollView>
        {/* Modal de edición de cliente */}
        <ClienteFormModal
        visible={isEditModalVisible}
        title="Editar cliente"
        initialValues={editInitialValues}
        onSubmit={async (data) => {
            // De momento solo mostramos los datos editados
            console.log("Editar cliente:", cliente.id, data);

            // Actualizamos el cliente en el mock
            const updatedCliente = await updateCliente(cliente.id, data);

            // Actualizamos el estado local para refrescar la pantalla
            setCliente(updatedCliente);

            // Cerramos el modal
            setIsEditModalVisible(false);
        }}
        onDismiss={() => {
            // Cerramos el modal sin guardar
            setIsEditModalVisible(false);
        }}
        />

        {/* Diálogo de confirmación / error */}
        <ConfirmDialogUI />

    </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    scrollContent: {
        paddingBottom: 32, // espacio extra para que el último pedido no quede pegado
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        marginBottom: 16,
    },

    card: {
        borderRadius: 12,
    },

    value: {
        marginTop: 4,
        marginBottom: 12,
    },

    divider: {
        marginVertical: 8,
    },
    tabsWrapper: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: "white",
    },
});
