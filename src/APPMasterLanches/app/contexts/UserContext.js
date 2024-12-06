import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUsuarioInfo, logout, login, cadastro } from "../../api/usuario";

const EXPIRATION_TIME = 3 * 24 * 60 * 60 * 1000; // 3 dias em milissegundos
const UserContext = createContext();

export function UserProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [accessibleScreens, setAccessibleScreens] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagamento, setPagamento] = useState(null); 
    const [pedidoAtual, setPedidoAtual] = useState(null); 
    const [historicoPedidos, setHistoricoPedidos] = useState([]);

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const lastLogin = await AsyncStorage.getItem("lastLogin");
                const isExpired =
                    lastLogin && new Date().getTime() - parseInt(lastLogin, 10) > EXPIRATION_TIME;

                if (isExpired) {
                    await AsyncStorage.clear();
                    setIsLoading(false);
                    return;
                }

                const userData = await AsyncStorage.getItem("usuario");
                const screensData = await AsyncStorage.getItem("accessibleScreens");

                if (userData && screensData) {
                    setUsuario(JSON.parse(userData));
                    setAccessibleScreens(JSON.parse(screensData));
                }
            } catch (error) {
                console.error("Erro ao inicializar usuário:", error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeUser();
    }, []);

    const loginUsuario = async (email, senha) => {
        try {
            const loginData = await login(email, senha);
            const userInfo = await getUsuarioInfo();

            setUsuario(userInfo);
            setAccessibleScreens(loginData.role.accessibleScreens);

            await AsyncStorage.setItem("usuario", JSON.stringify(userInfo));
            await AsyncStorage.setItem("accessibleScreens", JSON.stringify(loginData.role.accessibleScreens));
            await AsyncStorage.setItem("lastLogin", new Date().getTime().toString());
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    };

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
            setAccessibleScreens([]);
            await AsyncStorage.clear();
        } catch (error) {
            console.error("Erro ao fazer logout:", error.message);
        }
    };

    // Método de login
/*     const loginUsuario = async (email, senha) => {
        try {
            const dadosLogin = await login(email, senha);
            setAccessibleScreens(dadosLogin.role.accessibleScreens)
            const dadosUsuario = await getUsuarioInfo();
            setUsuario(dadosUsuario);
            console.log("Dados Usuario: " + JSON.stringify(usuario));

            await AsyncStorage.setItem("usuario", JSON.stringify(dadosUsuario));
        } catch (error) {
            console.error("Erro ao fazer login:", error.message);
            throw error;
        }
    }; */

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
                pagamento,
                salvarPagamento,
                limparPagamento,
                pedidoAtual,
                salvarPedidoAtual,
                cancelarPedidoAtual,
                historicoPedidos,
                adicionarPedidoHistorico,
                cadastrarUsuario,
                usuario,
                accessibleScreens,
                loginUsuario,
                logoutUsuario,
                isLoading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function accessUser() {
    return useContext(UserContext);
}
