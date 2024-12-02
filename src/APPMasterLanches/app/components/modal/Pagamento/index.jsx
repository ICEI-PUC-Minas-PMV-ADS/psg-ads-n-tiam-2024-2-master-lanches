import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, TouchableOpacity, Clipboard, Alert } from "react-native";
/* import Clipboard from '@react-native-clipboard/clipboard'; */
import { createPagamento } from "../../../../api/pagamento";
import styles from "./style";

const ModalPagamento = ({ isVisible, onClose }) => {
    const [dadosPagamento, setDadosPagamento] = useState({
        amount: "",
        description: "",
        payerEmail: "",
        ExternalReference:"Apenas Teste",
    });
    //corrigir recebimento imagem qrCode
    const [responseData, setResponseData] = useState(null);

    const handleCreatePagamento = async () => {
        try {
            const response = await createPagamento(dadosPagamento);
            console.log(response)
            setResponseData(response);
        } catch (error) {
            Alert.alert("Erro", error.message);
        }
    };

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        Alert.alert("Copiado", "O código Pix foi copiado para a área de transferência.");
    };

    return (
        <View style={[styles.modal, isVisible ? styles.visible : styles.hidden]}>
            <View style={styles.container}>
                <Text style={styles.title}>Criar Pagamento</Text>
                {!responseData ? (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Valor (R$)"
                            keyboardType="numeric"
                            onChangeText={(value) => setDadosPagamento({ ...dadosPagamento, amount: parseFloat(value) })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição"
                            onChangeText={(value) => setDadosPagamento({ ...dadosPagamento, description: value })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail do Pagador"
                            onChangeText={(value) => setDadosPagamento({ ...dadosPagamento, payerEmail: value })}
                        />
                        <Button title="Gerar Pagamento" onPress={handleCreatePagamento} />
                    </>
                ) : (
                    <>
                        <Text style={styles.label}>QR Code:</Text>
                        <Image source={{ uri: responseData.qrCode }} style={styles.qrCode} />
                        <Text style={styles.label}>Código Pix:</Text>
                        <TouchableOpacity onPress={() => copyToClipboard(responseData.PixCode)}>
                            <Text style={styles.pixCode}>{responseData.pixCode}</Text>
                        </TouchableOpacity>
                        <Button title="Fechar" onPress={onClose} />
                    </>
                )}
            </View>
        </View>
    );
};

export default ModalPagamento;