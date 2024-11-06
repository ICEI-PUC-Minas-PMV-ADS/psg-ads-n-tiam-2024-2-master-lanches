import { Text, View } from "react-native";
import styles from "./style";
import InputComponent from '../../components/input/search'
import BottomBar from "../../components/bottomBar";

export default function SearchScreen () {
    return(
        <View style={styles.container}>
            <InputComponent style={styles.input} />
            <BottomBar />
        </View>
    );
}