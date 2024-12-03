import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

export const cleanExpiredCache = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const pixKeys = keys.filter((key) => key.startsWith("pix_"));

        for (const key of pixKeys) {
            const storedData = await AsyncStorage.getItem(key);
            if (storedData) {
                const data = JSON.parse(storedData);

                // Verifica se o cache expirou
                if (data.expiresAt < Date.now()) {
                    // Exclui o arquivo local (QR Code)
                    if (data.QRCode_Path) {
                        await FileSystem.deleteAsync(data.QRCode_Path, { idempotent: true });
                    }

                    // Remove os dados do AsyncStorage
                    await AsyncStorage.removeItem(key);
                }
            }
        }
    } catch (error) {
        console.error("Erro ao limpar cache expirado:", error);
    }
};