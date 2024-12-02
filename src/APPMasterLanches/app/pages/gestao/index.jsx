import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from 'react-native';
import BottomBar from '../../components/bottomBar';
import PedidoForm from "../../components/PedidoForm";
import Listagem from "../../components/Listagem";
import styles from './style';

const PedidosList = () => {
    const [pedidos, setPedidos] = useState([]); // Estado para armazenar os pedidos
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [editingPedido, setEditingPedido] = useState(null); // Estado para editar um pedido
  
    // Função para buscar todos os pedidos
    useEffect(() => {
      const loadPedidos = async () => {
        try {
          const data = await findAllPedidos(); // Chama a API para buscar todos os pedidos
          setPedidos(data); // Atualiza o estado com os pedidos
        } catch (error) {
          console.error("Erro ao carregar pedidos:", error.message);
        } finally {
          setLoading(false); // Finaliza o carregamento
        }
      };
  
      loadPedidos();
    }, []);
  
    // Função para excluir um pedido
    const handleDelete = async (id) => {
      try {
        await deletePedido(id); // Deleta o pedido da API
        setPedidos(pedidos.filter((pedido) => pedido.id !== id)); // Remove o pedido da lista local
      } catch (error) {
        console.error("Erro ao deletar pedido:", error.message);
      }
    };
  
    // Função para editar um pedido
    const handleEdit = (pedido) => {
      setEditingPedido(pedido); // Define o pedido como sendo editado
      navigation.navigate("PedidoForm", { pedido }); // Navega para o formulário de edição
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Gestão de Pedidos</Text>
  
        {loading ? (
          <Text>Carregando pedidos...</Text> // Mensagem de carregamento
        ) : (
          <FlatList
            data={pedidos} // Dados dos pedidos
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.itemText}>{item.descricao}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleEdit(item)} // Chama a função de edição
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDelete(item.id)} // Chama a função de deletar
                  >
                    <Text style={styles.buttonText}>Deletar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()} // Extraí a chave única para cada item
          />
        )}
  
        <PedidoForm pedido={editingPedido} setEditingPedido={setEditingPedido} />
      </View>
    );
  };
  
  export default PedidosList;