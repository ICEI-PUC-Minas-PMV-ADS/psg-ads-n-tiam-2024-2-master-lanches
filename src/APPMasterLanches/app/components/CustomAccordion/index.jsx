import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import styles from "./style";

const CustomAccordion = ({
    sections,
    maxHeight = 500,
    headerStyle = {},
    headerTextStyle = {},
    contentStyle = {},
    defaultIconStyle = {},
}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [heights] = useState(() => sections.map(() => new Animated.Value(0)));
    const [calculatedHeights, setCalculatedHeights] = useState(
        sections.map(() => null)
    );
    const animatingRef = useRef(false);
    const intervalRefs = useRef([]);
    const iconState = useRef(sections.map((section) => section.icon)); // Estado para ícones

    useEffect(() => {
        // Limpa os intervalos ao desmontar o componente
        return () => {
            intervalRefs.current.forEach(clearInterval);
        };
    }, []);

    const waitForAnimation = (animatedValue, toValue, duration) => {
        return new Promise((resolve) => {
            Animated.timing(animatedValue, {
                toValue,
                duration,
                useNativeDriver: false,
            }).start(resolve);
        });
    };

    const toggleSection = async (index) => {
        if (animatingRef.current) return;
        animatingRef.current = true;

        const isActive = activeIndex === index;
        setActiveIndex(isActive ? null : index);

        for (let i = 0; i < sections.length; i++) {
            if (i === index && !isActive) {
                await waitForAnimation(heights[i], 1, 300);
            } else {
                Animated.timing(heights[i], {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
        }

        animatingRef.current = false;
    };

    const monitorSectionLoaded = (index) => {
        // Verifica continuamente se o `loaded` está `true`
        intervalRefs.current[index] = setInterval(() => {
            if (sections[index].loaded && calculatedHeights[index] === null) {
                clearInterval(intervalRefs.current[index]);
                intervalRefs.current[index] = null;
                const hiddenElement = document.querySelector(
                    `[data-index="hidden-${index}"]`
                );

                if (hiddenElement) {
                    const { height } = hiddenElement.getBoundingClientRect();
                    setCalculatedHeights((prev) => {
                        const newHeights = [...prev];
                        newHeights[index] = height;
                        console.log(`Altura definida para a seção no interval ${index}: ${height}`);
                        return newHeights;
                    });
                }
            }
        }, 100); // Verifica a cada 100ms
    };

    const handleClone = (content, extraProps) => {
        if (React.isValidElement(content)) {
            // Adiciona os estilos e funções diretamente ao componente clonado
            return React.cloneElement(content, {
                ...content.props,
                ...extraProps,
                style: [content.props?.style, extraProps.style, contentStyle], // Mantém estilos originais e adiciona novos
            });
        }
        return content;
    };

    function updateIcon(index, newIcon) {
        iconState.current[index] = newIcon; // Atualiza o ícone no estado
        setActiveIndex((prevState) => ({ ...prevState })); // Força re-renderização
    }    

    return (
        <View>
            {/* Pré-renderização invisível */}
            {sections.map((section, index) => (
                <View
                    key={`hidden-${index}`}
                    data-index={`hidden-${index}`}
                    style={{
                        position: "absolute",
                        opacity: 0,
                        top: 0,
                        left: 0,
                        width: "100%",
                    }}
                    onLayout={(event) => {
                        if (calculatedHeights[index] !== null) return;
                        if (!section.loaded) {
                            monitorSectionLoaded(index); // Inicia monitoramento
                            return;
                        }

                        const { height } = event.nativeEvent.layout;
                        setCalculatedHeights((prev) => {
                            const newHeights = [...prev];
                            newHeights[index] = height;
                            console.log(`Altura definida para a seção no layout ${index}: ${height}`);
                            return newHeights;
                        });
                    }}
                >
                    {section.content}
                </View>
            ))}

            {/* Acordeão real */}
            {sections.map((section, index) => (
                <View key={`accordion-${index}`}>
                    {/* Cabeçalho */}
                    <TouchableOpacity
                        style={[styles.header, headerStyle]}
                        onPress={() => toggleSection(index)}
                    >
                        <Text style={[styles.headerText, headerTextStyle]}>
                            {section.title}
                        </Text>
                        {iconState.current[index] && (
                            <View
                                style={[styles.icon, defaultIconStyle, section.iconStyle]}
                            >
                                {iconState.current[index]}
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Conteúdo com altura animada */}
                    <Animated.View
                        style={{
                            height: heights[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [
                                    0,
                                    Math.min(
                                        calculatedHeights[index] ?? maxHeight,
                                        maxHeight
                                    ),
                                ],
                            }),
                            overflow: "hidden",
                        }}
                    >
                        <View style={[styles.content]}>
                            {/* Clona o conteúdo com estilos e funções extras */}
                            {calculatedHeights[index] !== null
                                ? handleClone(section.content, {
                                    onLoad: () => console.log(`Section ${index} loaded`), // função que pode ser passada e usada diretamente
                                    updateIcon, // função que deve ser separada antes de ser usada (mais util)
                                    index, // Passa o índice para identificar a seção
                                    // Adicionar mais funções se necessario
                                })
                                : null}
                        </View>
                    </Animated.View>
                </View>
            ))}
        </View>
    );
};

export default CustomAccordion;