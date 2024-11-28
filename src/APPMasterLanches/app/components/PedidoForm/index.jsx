import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TextInput, Alert } from "react-native";

const PedidoForm = ({ pedido, setEditingPedido }) => {
  const [formData, setFormData] = useState({
    descricao: "",
    cliente: "",
    status: "Em andamento",
  });

  useEffect(() => {
    if (pedido) {
      setFormData({
        descricao: pedido.descricao,
        cliente: pedido.cliente,
        status: pedido.status,
      });
    }
  }, [pedido]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (pedido) {
        await updatePedido(pedido.id, formData);
        setEditingPedido(null); // Reset the form after editing
      } else {
        await criarPedido(formData);
      }
      setFormData({ descricao: "", cliente: "", status: "Em andamento" });
    } catch (error) {
      console.error("Erro ao salvar pedido:", error.message);
    }
  };
  
  {/* <div>
    <h2><Text>Oi</Text>{{pedido ? "Editar Pedido" : "Criar Novo Pedido"}}</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Descrição:</label>
        <input
          type="text"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Cliente:</label>
        <input
          type="text"
          name="cliente"
          value={formData.cliente}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Em andamento">Em andamento</option>
          <option value="Finalizado">Finalizado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>
      <button type="submit">{pedido ? "Atualizar Pedido" : "Criar Pedido"}</button>
    </form>
  </div> */}
  return (
    <View>

    </View>
  );
};

export default PedidoForm;
