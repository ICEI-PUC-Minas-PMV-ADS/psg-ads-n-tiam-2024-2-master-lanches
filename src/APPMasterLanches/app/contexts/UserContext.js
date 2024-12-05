import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUsuarioInfo, logout, login, cadastro } from '../../api/usuario';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [usuario, setUsuario] = useState(null); // Dados do usuário logado
    const [pagamento, setPagamento] = useState(null); // Pagamento atual
    const [pedidoAtual, setPedidoAtual] = useState(null); // Pedido em andamento
    const [historicoPedidos, setHistoricoPedidos] = useState([]); // Histórico de pedidos

    // Carrega informações do usuário ao iniciar
    useEffect(() => {
        const fetchUsuario = async () => {
            const token = await AsyncStorage.getItem("token");
            if (!token) return;
            const dados = await AsyncStorage.getItem("usuario");
            if (dados)
            {
                setUsuario(dados);
                return;
            }

            try {
                const dadosUsuario = await getUsuarioInfo();
                setUsuario(dadosUsuario);
                await AsyncStorage.setItem("usuario", JSON.stringify(dadosUsuario));
            } catch (error) {
                console.error("Erro ao carregar informações do usuário:", error.message);
            }
        };
        fetchUsuario();
    }, []);

    const salvarPagamento = (novoPagamento) => {
        setPagamento(novoPagamento);
        AsyncStorage.setItem("pagamento", JSON.stringify(novoPagamento));
    };

    const limparPagamento = () => {
        setPagamento(null);
        AsyncStorage.removeItem("pagamento");
    };

    const salvarPedidoAtual = (pedido) => {
        setPedidoAtual(pedido);
        AsyncStorage.setItem("pedidoAtual", JSON.stringify(pedido));
    };

    const cancelarPedidoAtual = () => {
        setPedidoAtual(null);
        AsyncStorage.removeItem("pedidoAtual");
    };

    const adicionarPedidoHistorico = (pedido) => {
        setHistoricoPedidos((prev) => [...prev, pedido]);
        AsyncStorage.setItem("historicoPedidos", JSON.stringify([...historicoPedidos, pedido]));
    };

    const logoutUsuario = async () => {
        try {
            await logout();
            setUsuario(null);
            limparPagamento();
            setPedidoAtual(null);
            setHistoricoPedidos([]);
            await AsyncStorage.clear();
        } catch (error) {
            console.error("Erro ao fazer logout:", error.message);
        }
    };

    // Método de login
    const loginUsuario = async (email, senha) => {
        try {
            const dadosLogin = await login(email, senha);
            const dadosUsuario = await getUsuarioInfo();
            setUsuario(dadosUsuario);
            console.log("Dados Usuario: " + JSON.stringify(usuario));

            await AsyncStorage.setItem("usuario", JSON.stringify(dadosUsuario));
        } catch (error) {
            console.error("Erro ao fazer login:", error.message);
            throw error;
        }
    };

    // Método de cadastro
    const cadastrarUsuario = async (dadosCadastro) => {
        try {
            const resultadoCadastro = await cadastro(dadosCadastro);
            if (resultadoCadastro) {
                await loginUsuario(dadosCadastro.email, dadosCadastro.senha);
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error.message);
            throw error;
        }
    };

    return (
        <UserContext.Provider
            value={{
                usuario,
                setUsuario,
                pagamento,
                salvarPagamento,
                limparPagamento,
                pedidoAtual,
                salvarPedidoAtual,
                cancelarPedidoAtual,
                historicoPedidos,
                adicionarPedidoHistorico,
                logoutUsuario,
                loginUsuario,
                cadastrarUsuario,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

// Hook para usar o contexto
export function accessUser() {
    return useContext(UserContext);
}