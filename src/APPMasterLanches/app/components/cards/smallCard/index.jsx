import { View, Text, Image } from "react-native";
import styles from "./style";

export default function SmallCard({ url }) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: url || 'https://exemplo.com/imagem-default.jpg' }} style={styles.imagem} />
        </View>
    );
}
