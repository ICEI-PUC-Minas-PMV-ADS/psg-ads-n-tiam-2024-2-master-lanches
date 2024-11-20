import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    FlatList,
    TextInput,
    Alert,
    TouchableOpacity,
    Animated,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/MaterialIcons"; // Instale react-native-vector-icons
import styles from "./style";
import { findAllEstoque, updateEstoque, initializeEstoque } from "../../../../api/estoque";
import { accessUser } from "../../../contexts/UserContext";

const StockManagement = () => {
    const [estoque, setEstoque] = useState([]);
    const [loading, setLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(true);
    const rotation = new Animated.Value(collapsed ? 0 : 1); // Estado para animação da rotação
    const {ADM}  = accessUser()
    const userRole = ADM? "admin" : "user" ;

    useEffect(() => {
        const fetchEstoque = async () => {
            try {
                const data = await findAllEstoque();
                console.log("Estoque:", data);
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

    const handleUpdate = async (idProduto, quantidade) => {
        if (userRole !== "admin") {
            Alert.alert("Permissão negada", "Apenas administradores podem alterar o estoque.");
            return;
        }

        try {
            const item = estoque.find((item) => item.idProduto === idProduto);
            if (!item) throw new Error("Item não encontrado");

            const updatedItem = { ...item, quantidadeDisponivel: quantidade };
            await updateEstoque(idProduto, updatedItem);

            setEstoque((prev) =>
                prev.map((item) => (item.idProduto === idProduto ? updatedItem : item))
            );

            Alert.alert("Sucesso", "Estoque atualizado com sucesso.");
        } catch (error) {
            console.error("Erro ao atualizar estoque:", error.message);
            Alert.alert("Erro", "Não foi possível atualizar o estoque.");
        }
    };

    const handleInitializeEstoque = async () => {
        if (userRole !== "admin") {
            Alert.alert("Permissão negada", "Apenas administradores podem inicializar o estoque.");
            return;
        }

        try {
            await initializeEstoque(10); // Inicializa com 10 documentos
            Alert.alert("Sucesso", "Estoque inicializado com sucesso.");
        } catch (error) {
            console.error("Erro ao inicializar estoque:", error.message);
            Alert.alert("Erro", "Não foi possível inicializar o estoque.");
        }
    };

    const toggleExpanded = () => {
        const newValue = collapsed ? 1 : 0;
        /* Animated.timing(rotation, {
            toValue: newValue,
            duration: 500,
            easing: Animated.Easing.inOut(Animated.Easing.quad),
            useNativeDriver: true,
        }).start(); */
        setCollapsed(!collapsed);
    };

    const rotationStyle = {
        transform: [
            {
                rotate: rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["-90deg", "90deg"], // Rotação lateral
                }),
            },
        ],
    };

    return (
        <View style={styles.container}>
            <View style={styles.functionContainer}>
                <Text style={{ color: "white" }}>Gerenciamento de Estoque</Text>
                <TouchableOpacity onPress={toggleExpanded} style={styles.toggleButton}>
                    <Animated.View style={rotationStyle}>
                        <Icon name="keyboard-arrow-right" size={24} color="#fff" />
                    </Animated.View>
                </TouchableOpacity>
                <Collapsible collapsed={collapsed}>
                    {loading ? (
                        <Text>Carregando estoque...</Text>
                    ) : (
                        <FlatList
                            data={estoque}
                            keyExtractor={(item) => item.idProduto}
                            renderItem={({ item }) => (
                                <View style={styles.stockItem}>
                                    <Text style={styles.itemTitle}>{item.nomeProduto}</Text>
                                    <Text style={styles.itemText}>
                                        Quantidade: {item.quantidadeDisponivel}
                                    </Text>
                                    {userRole === "admin" && (
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Nova quantidade"
                                            placeholderTextColor="#fff"
                                            keyboardType="numeric"
                                            onSubmitEditing={(e) =>
                                                handleUpdate(
                                                    item.idProduto,
                                                    Number(e.nativeEvent.text)
                                                )
                                            }
                                        />
                                    )}
                                </View>
                            )}
                        />
                    )}
                </Collapsible>
            </View>
        </View>
    );
};

export default StockManagement;