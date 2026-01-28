import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  ActivityIndicator,
  FAB,
  Searchbar,
  Text,
  useTheme,
} from "react-native-paper";
import { router } from "expo-router";

import ClienteItem from "./ClienteItem";
import ClienteFormModal from "./form/ClienteFormModal";
import { ClienteFormValues } from "./form/clienteForm.types";
import { useConfirmAction } from "../../hooks/useConfirmAction";

// ahora importamos el tipo desde src/types
import { Cliente } from "../../types/Cliente";
// usaremos React Query para listar
import { useClientes } from "../../hooks/clientes/useClientes";
import { useCreateCliente } from "../../hooks/clientes/useCreateCliente";
import { useDeleteCliente } from "../../hooks/clientes/useDeleteCliente";
import { deleteClienteApi, createClienteApi } from "../../services/clientesSupabaseService";

export default function ClientesScreen() {
  // Buscador
  const [search, setSearch] = useState("");
  // Control modal creación
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const { confirm, ConfirmDialogUI } = useConfirmAction();
  const theme = useTheme();

  // React Query: obtener lista de clientes desde Supabase
  const {
    data: clientes,      // array de Cliente[] o undefined
    isLoading,
    error,
    refetch,             // por si quieres forzar recarga manual
  } = useClientes();

  const createClienteMutation = useCreateCliente();
  const deleteClienteMutation = useDeleteCliente();

  // Valores iniciales para el formulario de creación
  const createInitialValues: ClienteFormValues = {
    nombre: "",
    nifCif: "",
    telefono: "",
    email: "",
    notas: "",
    activo: true,
  };

  // Filtrado de clientes en memoria según el texto de búsqueda
  const filteredClientes = useMemo(() => {
    if (!clientes) return [];

    const text = search.toLowerCase().trim();
    if (!text) return clientes;

    return clientes.filter((cliente) => {
      return (
        cliente.nombre.toLowerCase().includes(text) ||
        cliente.email?.toLowerCase().includes(text) ||
        cliente.telefono?.includes(text)
      );
    });
  }, [clientes, search]);

  // Manejar borrado con confirmación
  const handleDeleteCliente = (cliente: Cliente) => {
    confirm({
        title: "Borrar cliente",
        message: `¿Seguro que quieres borrar a ${cliente.nombre}?`,
        action: () => deleteClienteMutation.mutateAsync(cliente.id),
    });
    };

  // Estados de carga / error
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error cargando clientes: {error.message}</Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Searchbar
          placeholder="Buscar cliente"
          value={search}
          onChangeText={setSearch}
          style={styles.searchbar}
        />

        {filteredClientes.length === 0 ? (
          <Text style={styles.emptyText}>No se han encontrado clientes</Text>
        ) : (
          <FlatList
            data={filteredClientes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ClienteItem
                cliente={item}
                onPress={() => {
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
          onPress={() => setIsCreateModalVisible(true)}
          style={styles.fab}
        />
      </View>

      {/* Modal de creación de cliente */}
      <ClienteFormModal
        visible={isCreateModalVisible}
        title="Crear cliente"
        initialValues={createInitialValues}
        onSubmit={async (data) => {
            await createClienteMutation.mutateAsync(data);
            setIsCreateModalVisible(false);
        }}
        onDismiss={() => {
          setIsCreateModalVisible(false);
        }}
      />

      {/* Modal reutilizable de confirmación */}
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
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
