import React, { useEffect, useState } from "react";

const PedidosList = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPedido, setEditingPedido] = useState(null);

  useEffect(() => {
    const loadPedidos = async () => {
      try {
        const data = await findAllPedidos();
        setPedidos(data);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPedidos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePedido(id);
      setPedidos(pedidos.filter((pedido) => pedido.id !== id));
    } catch (error) {
      console.error("Erro ao deletar pedido:", error.message);
    }
  };

  const handleEdit = (pedido) => {
    setEditingPedido(pedido);
  };

  return (
    <div>
      <h1>Gestão de Pedidos</h1>
      {loading ? (
        <p>Carregando pedidos...</p>
      ) : (
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido.id}>
              <span>{pedido.descricao}</span>
              <button onClick={() => handleEdit(pedido)}>Editar</button>
              <button onClick={() => handleDelete(pedido.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      )}
      <PedidoForm pedido={editingPedido} setEditingPedido={setEditingPedido} />
    </div>
  );
};

export default PedidosList;