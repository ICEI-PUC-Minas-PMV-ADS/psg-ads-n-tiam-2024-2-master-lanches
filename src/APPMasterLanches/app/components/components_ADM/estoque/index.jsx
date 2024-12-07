import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TextInput, Alert } from "react-native";
import styles from "./style";
import { findAllEstoque, updateEstoque } from "../../../../api/estoque";
import { accessUser } from "../../../contexts/UserContext";

const StockManagement = ({ setLoaded }) => {
    const [estoque, setEstoque] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userRole } = accessUser();

    useEffect(() => {
        const fetchEstoque = async () => {
            try {
                setLoaded(false); // Marca como não carregado
                const data = await findAllEstoque();
                setEstoque(data);
            } catch (error) {
                console.error("Erro ao carregar estoque:", error.message);
                Alert.alert("Erro", "Não foi possível carregar o estoque.");
            } finally {
                setLoading(false);
            }
        };

        fetchEstoque();
    }, []);

    useEffect(() => {
        if (!loading) {
            setLoaded(true); // Marca como carregado somente após a renderização
        }
    }, [loading]);

    const handleUpdate = async (idProduto, quantidade) => {
        if (userRole !== "Admin") {
            Alert.alert("Permissão negada", "Apenas administradores podem alterar o estoque.");
            return;
        }

        try {
            const updatedItem = { quantidadeDisponivel: quantidade };
            await updateEstoque(idProduto, updatedItem);

            setEstoque((prev) =>
                prev.map((item) =>
                    item.idProduto === idProduto
                        ? { ...item, quantidadeDisponivel: quantidade }
                        : item
                )
            );

            Alert.alert("Sucesso", "Estoque atualizado com sucesso.");
        } catch (error) {
            console.error("Erro ao atualizar estoque:", error.message);
            Alert.alert("Erro", "Não foi possível atualizar o estoque.");
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.stockItem}>
            <Text style={styles.itemTitle}>{item.nomeProduto}</Text>
            <Text style={styles.itemText}>
                Quantidade: {item.quantidadeDisponivel}
            </Text>
            {userRole === "Admin" && (
                <TextInput
                    style={styles.input}
                    placeholder="Nova quantidade"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    onSubmitEditing={(e) =>
                        handleUpdate(item.idProduto, Number(e.nativeEvent.text))
                    }
                />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={{color: 'white'}}>Carregando estoque...</Text>
            ) : (
                <FlatList
                    data={estoque}
                    nestedScrollEnabled={true}
                    keyExtractor={(item) => item.idProduto}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

export default StockManagement;