import React, { useState } from 'react';
import { TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styles from './style';

function SmallCard({ url, onPress }) {
    const [loading, setLoading] = useState(true);

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {loading && <ActivityIndicator size="small" color="#4CAF50" />}
            <Image
                source={{ uri: url || DefaultImage }}
                style={styles.imagem}
                onLoadEnd={() => setLoading(false)}
            />
        </TouchableOpacity>
    );
}

export default React.memo(SmallCard);