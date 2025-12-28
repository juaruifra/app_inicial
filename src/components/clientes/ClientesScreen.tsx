import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList  } from "react-native";
import AppHeader from "../layout/AppHeader";
import { ActivityIndicator, FAB, Searchbar, Text } from "react-native-paper";
import { Cliente } from "../../data/mockApi";
import { getClientes } from "../../services/clientesService";
import ClienteItem from "./ClienteItem";

export default function ClientesScreen() {

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);

    const loadClientes = async () => {
    try {
        const data = await getClientes();
        setClientes(data);
        console.log("Clientes cargados:", data.length);
    } finally {
        setIsLoading(false);
    }
    };

    useEffect(() => {
        loadClientes();
        
    }, []);

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
                        <ClienteItem cliente={item} />
                        )}
                    />
                )}


                <FAB
                    icon="plus"
                    onPress={() => console.log("Nuevo cliente")}
                    style={styles.fab}
                />

            </View>

            
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