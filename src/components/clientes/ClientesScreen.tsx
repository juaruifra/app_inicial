import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList} from "react-native";
import AppHeader from "../layout/AppHeader";
import { ActivityIndicator, FAB, Searchbar, Text } from "react-native-paper";
import { Cliente } from "../../data/mockApi";
import { getClientes,createCliente, deleteCliente } from "../../services/clientesService";
import ClienteItem from "./ClienteItem";
import { router, useFocusEffect } from "expo-router";
// Modal para crear / editar clientes
import ClienteFormModal from "./form/ClienteFormModal";

// Tipo de datos del formulario
import { ClienteFormValues } from "./form/clienteForm.types";

import ConfirmDialog from "../common/ConfirmDialog";

export default function ClientesScreen() {

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);

    // Controla si el modal de cliente está abierto o cerrado
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

    const createInitialValues: ClienteFormValues = {
    nombre: "",
    nifCif: "",
    telefono: "",
    email: "",
    notas: "",
    activo: true,
    };

    // Estado único del diálogo (confirmación / error)
    const [dialog, setDialog] = useState<{
        visible: boolean;
        title: string;
        message: string;
        variant: "confirm" | "error";
        onConfirm?: () => void;
    } | null>(null);

    // Ejecuta el borrado real y maneja errores controlados
    const doDeleteCliente = async (clienteId: number) => {

        try {
            // Borrado del cliente
            await deleteCliente(clienteId);

            // Cerramos el modal
            setDialog(null);

            // Recargamos la lista (tu función ya existe)
            await loadClientes();

        } catch (error) {

            // Mostramos el error en el mismo modal (modo error)
            const message =
            error instanceof Error
                ? error.message
                : "No se ha podido borrar el cliente";

            setDialog({
                visible: true,
                title: "Borrado no permitido",
                message,
                variant: "error",
            });
        }
    };


    // Abre el diálogo para confirmar borrado
    const askDeleteCliente = (cliente: Cliente) => {
        setDialog({
            visible: true,
            title: "Borrar cliente",
            message: `¿Seguro que quieres borrar a ${cliente.nombre}?`,
            variant: "confirm",
            onConfirm: () => doDeleteCliente(cliente.id),
        });
    };


    const loadClientes = async () => {
        try {
            const data = await getClientes();
            setClientes(data);
            console.log("Clientes cargados:", data.length);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect(() => {
    //     loadClientes();   
    // }, []);

    useFocusEffect(
        React.useCallback(() => {
            // Cada vez que la pantalla gana el foco,
            // recargamos la lista de clientes
            loadClientes();
        }, [])
    );

    useEffect(() => {
        const text = search.toLowerCase().trim();

        if (!text) {
            setFilteredClientes(clientes);
            return;
        }

        const filtered = clientes.filter((cliente) => {
            return (
            cliente.nombre.toLowerCase().includes(text) ||
            cliente.email?.toLowerCase().includes(text) ||
            cliente.telefono?.includes(text)
            );
        });

        setFilteredClientes(filtered);

    }, [search, clientes]);

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Barra superior reutilizable */}
            <AppHeader title="Clientes" />

            

            {/* Contenido principal de clientes */}
            <View style={styles.content}>

                <Searchbar
                placeholder="Buscar cliente"
                value={search}
                onChangeText={setSearch}
                style={styles.searchbar}
                />

                {filteredClientes.length === 0 ? (
                    <Text style={styles.emptyText}>
                        No se han encontrado clientes
                    </Text>
                    ) : (
                    <FlatList
                        data={filteredClientes}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                        <ClienteItem cliente={item} 
                            onPress={() => {
                                //alert("Click cliente " + item.id);
                                //router.push(`/clientes/${item.id}`);

                                router.push({
                                    pathname: "clientes/[id]",
                                    params: { id: item.id.toString() },
                                });
                            }}
                            onDelete={() => {
                                // Abrimos confirmación de borrado
                                askDeleteCliente(item);
                            }}
                        />
                        )}
                    />
                )}


                <FAB
                    icon="plus"
                    onPress={() => 
                        //console.log("Nuevo cliente")
                        // Abrimos el modal de creación
                        setIsCreateModalVisible(true)

                    }
                    style={styles.fab}
                />

            </View>

            {/* Modal de creación de cliente */}
            <ClienteFormModal
            visible={isCreateModalVisible}
            title="Crear cliente"
            initialValues={createInitialValues}
            onSubmit={async (data) => {
                // De momento solo mostramos los datos en consola
                console.log("Crear cliente:", data);

                // Creamos el cliente en el mock
                await createCliente(data);

                // Recargamos la lista
                await loadClientes();

                // Cerramos el modal
                setIsCreateModalVisible(false);
            }}
            onDismiss={() => {
                // Cerramos el modal sin guardar
                setIsCreateModalVisible(false);
            }}
            />

            {/* Modal reutilizable */}
            {dialog && (
            <ConfirmDialog
                visible={dialog.visible}
                title={dialog.title}
                message={dialog.message}
                variant={dialog.variant}
                confirmText={dialog.variant === "confirm" ? "Borrar" : "Aceptar"}
                cancelText="Cancelar"
                onConfirm={dialog.onConfirm}
                onCancel={() => setDialog(null)}
            />
            )}


            
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    flex: 1,
    paddingBottom: 80,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
    searchbar: {    
        marginBottom: 16,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 40,
        opacity: 0.6,
    }
});