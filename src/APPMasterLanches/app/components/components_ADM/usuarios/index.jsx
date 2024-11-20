import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';

const userManagement = () => {

    return (
        <View style={styles.container}>
            <View style={styles.functionContainer}>
                <Text style={{color: 'white'}}>Pagina administrador</Text>
            </View>
        </View>
    );
};

export default userManagement;