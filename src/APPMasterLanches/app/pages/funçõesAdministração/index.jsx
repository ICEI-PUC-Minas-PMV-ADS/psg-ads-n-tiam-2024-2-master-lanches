import React, { useState } from "react";
import { View, Text } from "react-native";
import BottomBar from "../../components/bottomBar";
import StockManagement from "../../components/components_ADM/estoque";
import CustomAccordion from "../../components/CustomAccordion";
import styles from "./style";

const AdministrationFunctions = () => {
    const [sections, setSections] = useState([
        {
            title: "Gerenciar Estoque",
            content: (
                <StockManagement
                    setLoaded={(loaded) => updateLoaded(0, loaded)}
                />
            ),
            loaded: false,
        },
        {
            title: "Outra Função",
            content: <Text style={styles.contentText}>Conteúdo de outra função aqui.</Text>,
            loaded: true,
        },
        
    ]);

    const updateLoaded = (index, loaded) => {
        setSections((prev) =>
            prev.map((section, i) =>
                i === index ? { ...section, loaded } : section
            )
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.functionContainer}>
                <CustomAccordion sections={sections} />
            </View>
            <BottomBar />
        </View>
    );
};

export default AdministrationFunctions;