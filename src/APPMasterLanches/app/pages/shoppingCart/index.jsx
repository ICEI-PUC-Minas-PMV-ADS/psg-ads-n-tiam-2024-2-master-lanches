import { Text, View } from "react-native";
import BottomBar from "../../components/bottomBar";
import styles from "./style";

export default function ShoppingCart () {
    return (
        <View style={styles.container}>
            <BottomBar />
        </View>
    );
}