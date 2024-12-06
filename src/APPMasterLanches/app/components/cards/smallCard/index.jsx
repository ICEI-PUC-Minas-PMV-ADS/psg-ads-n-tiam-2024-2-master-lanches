import React, { useState } from 'react';
import { TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styles from './style';
import DefaultImage from '../../../assets/Default_noLoad.jpg';

function SmallCard({ url, onPress }) {
    const [loading, setLoading] = useState(true);
    const imageSource = url ? { uri: url } : DefaultImage;

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {loading && <ActivityIndicator size="small" color="#4CAF50" />}
            <Image
                source={imageSource}
                style={styles.imagem}
                onLoadEnd={() => setLoading(false)}
            />
        </TouchableOpacity>
    );
}

export default React.memo(SmallCard);