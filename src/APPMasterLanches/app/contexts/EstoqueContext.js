import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { findAllEstoque } from "../entrances/EstoqueEntrance";

export const EstoqueContext = createContext();

export const EstoqueProvider = ({ children }) => {
    const [estoque, setEstoque] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        sincronizarEstoque();
    }, []);

    const getLocalVersion = async () => {
        const version = await AsyncStorage.getItem("estoque.version");
        return version ? parseInt(version, 10) : 0;
    };

    const saveLocalVersion = async (version) => {
        await AsyncStorage.setItem("estoque.version", version.toString());
    };

    const sincronizarEstoque = async () => {
        setLoading(true);

        try {
            const localVersion = await getLocalVersion();
            const { version, data } = await findAllEstoque();

            if (version > localVersion) {
                setEstoque(data);
                await AsyncStorage.setItem("estoque", JSON.stringify(data));
                await saveLocalVersion(version);
            } else {
                const cachedData = await AsyncStorage.getItem("estoque");
                setEstoque(cachedData ? JSON.parse(cachedData) : []);
            }
        } catch (error) {
            console.error("Erro ao sincronizar estoque:", error);
        }

        setLoading(false);
    };

    return (
        <EstoqueContext.Provider value={{ estoque, loading, sincronizarEstoque }}>
            {children}
        </EstoqueContext.Provider>
    );
};
