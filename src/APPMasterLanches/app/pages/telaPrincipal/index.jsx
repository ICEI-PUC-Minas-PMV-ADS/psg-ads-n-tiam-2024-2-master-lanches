import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import styles from './style';
import BottomBar from '../../components/bottomBar';
import LargeCard from '../../components/cards/largeCard';
import SmallCard from '../../components/cards/smallCard';
import MediumCard from '../../components/cards/mediumCard';
import { useCart } from '../../contexts/CartContext';

const HomeScreen = () => {
    const { addToCart } = useCart();

    const handleAddToCart = (produto) => {
        addToCart(produto);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Section title="NOVIDADES">
                    <LargeCard produtoId={2} onAddToCart={handleAddToCart} />
                </Section>
                <Section title="CATEGORIAS">
                    <View style={styles.categorias}>
                        <SmallCard 
                            url="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.uCgQ0NnX0Vb7GoaDkyBBqwHaEG%26pid%3DApi&f=1&ipt=4465351326e21424a8a710f7efd7a3348c4519f12b083915226a32a027aefd4a&ipo=images"
                            onAddToCart={handleAddToCart} 
                        />
                        <SmallCard 
                            url="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F022%2F598%2F800%2Fnon_2x%2Ftasty-beef-burger-png.png&f=1&nofb=1&ipt=1424a825e236e08aff3ec5088abe05c67013024cfc4a06d0c406ac88c254cc7d&ipo=images" 
                            onAddToCart={handleAddToCart} 
                        />
                        <SmallCard 
                            url="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F10%2FPlus-Symbol-Vector-PNG-Cutout.png&f=1&nofb=1&ipt=40f35e8448f3a7433a433051918f28a07ece013c887f312f85fb9df573a6fbb0&ipo=images"
                            onAddToCart={handleAddToCart} 
                        />
                    </View>
                </Section>
                <Section title="EXPLORAR">
                    <MediumCard produtoId={1} onAddToCart={handleAddToCart} />
                </Section>
            </ScrollView>
            <BottomBar />
        </View>
    );
};

const Section = ({ title, children }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {children}
    </View>
);

export default HomeScreen;
