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

import { useConfirmAction } from "../../hooks/useConfirmAction";


export default function ClientesScreen() {

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);

    // Controla si el modal de cliente está abierto o cerrado
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

    const { confirm, ConfirmDialogUI } = useConfirmAction();

    const createInitialValues: ClienteFormValues = {
    nombre: "",
    nifCif: "",
    telefono: "",
    email: "",
    notas: "",
    activo: true,
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

    const handleDeleteCliente = (cliente: Cliente) => {

        confirm({
            title: "Borrar cliente",
            message: `¿Seguro que quieres borrar a ${cliente.nombre}?`,
            action: () => deleteCliente(cliente.id),
            onSuccess: () => {
                loadClientes();
            },
        });

    };

    // useEffect(() => {
    //     loadClientes();   
    // }, []);

    // Utilizamos useFocusEffect para recargar al volver a la pantalla
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
                            onDelete={() => handleDeleteCliente(item)}
                        />
                        )}
                    />
                )}


                <FAB
                    icon="plus"
                    onPress={() => 

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
            <ConfirmDialogUI />

            
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