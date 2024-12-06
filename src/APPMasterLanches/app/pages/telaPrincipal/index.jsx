import React from 'react';
import { View, Text, FlatList, ScrollView, SectionList } from 'react-native';
import styles from './style';
import BottomBar from '../../components/bottomBar';
import Header from '../../components/header';
import LargeCard from '../../components/cards/largeCard';
import SmallCard from '../../components/cards/smallCard';
import MediumCard from '../../components/cards/mediumCard';
import { useProducts } from '../../contexts/ProductContext';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { nomeCategorias } = useProducts();
    console.log("Categorias carregadas: " + JSON.stringify(nomeCategorias));

    const sections = [
        { title: 'NOVIDADES', data: [{ key: 'novidades', component: <LargeCard produtoId={"3"} /> }] },
        {
            title: 'CATEGORIAS', data: [{
                key: 'categorias', component: (
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                        {nomeCategorias && nomeCategorias.map((categoria, index) => (
                            <View key={index} style={styles.cardContainer} aria-label={categoria.nome}>
                                <SmallCard
                                    onPress={() => navigation.navigate('Categorias', { nomeCategoria: categoria.nome })}
                                    url={categoria.imagem} // substituir por uma imagem da categoria em especifico
                                />
                            </View>
                        ))}
                    </ScrollView>
                )
            }]
        },
        { title: 'EXPLORAR', data: [{ key: 'explorar', component: <MediumCard /> }] },
    ];

    return (
        <View style={styles.container}>
            <Header />
            <SectionList
                sections={sections}
                keyExtractor={(item, index) => item.key + index}
                renderItem={({ item, section }) => (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        {item.component}
                    </View>
                )}
                contentContainerStyle={styles.sectionListContainer}
            />
            <BottomBar />
        </View>
    );
};

export default HomeScreen;