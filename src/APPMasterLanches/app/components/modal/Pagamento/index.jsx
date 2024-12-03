import React, { useState, useEffect } from 'react';
import {
    View, Text, Button, TouchableOpacity, Image, Alert,
    ActivityIndicator, TouchableWithoutFeedback, Keyboard
} from "react-native";
// import Clipboard from '@react-native-clipboard/clipboard'; Usa funções nativas
import * as Clipboard from 'expo-clipboard';
import { createPagamento } from "../../../../api/pagamento";
import styles from "./style";
import { cleanExpiredCache } from "../../../cleaners/Pix_cache_clean";

const ModalPagamento = ({ isVisible, onClose, data, onPagamentoFinalizado }) => {
    const [responseData, setResponseData] = useState(null);
    const [info, setInfo] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null); // Tempo restante
    const [closeCountdown, setCloseCountdown] = useState(null); // Temporizador para fechar após expirar

    useEffect(() => {
        if (isVisible && data && !responseData) {
            const externalReference = "#1234";
            setInfo({ ...data, ExternalReference: externalReference });
        }

        if (responseData) {
            const expirationTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutos
            setRemainingTime(expirationTime - new Date().getTime());

            const interval = setInterval(() => {
                const timeLeft = expirationTime - new Date().getTime();
                setRemainingTime(timeLeft);
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    handleTimeout();
                }
            }, 1000);

            return () => clearInterval(interval);
        }

        return () => {
            clearTimeout(timeoutId);
            if (closeCountdown) clearTimeout(closeCountdown);
        };
    }, [isVisible, data, responseData]);

    const handleCreatePagamento = async () => {
        setLoading(true);
        try {
            const timer = setTimeout(() => {
                setLoading(false);
                Alert.alert("Erro", "Tempo de espera excedido. Tente novamente mais tarde.");
                handleClose();
            }, 5 * 60 * 1000); // 5 minutos

            setTimeoutId(timer);

            const response = await createPagamento({
                amount: info.Valor,
                description: info.Descricao,
                payerEmail: info.Email,
                ExternalReference: info.ExternalReference,
            });
            clearTimeout(timer);
            setResponseData(response);
            onPagamentoFinalizado(response);
        } catch (error) {
            Alert.alert('Erro', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleTimeout = () => {
        Alert.alert("Tempo Expirado", "O pagamento foi cancelado automaticamente.");
        const countdown = setTimeout(handleClose, 30 * 1000); // Fecha após 30 segundos
        setCloseCountdown(countdown);
    };

    const handleClose = () => {
        setResponseData(null);
        onPagamentoFinalizado(null);
        onClose();
    };

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / (60 * 1000));
        const seconds = Math.floor((ms % (60 * 1000)) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        isVisible && (
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modal}>
                    <TouchableWithoutFeedback>
                        <View style={styles.container}>
                            <Text style={styles.title}>Criar Pagamento</Text>
                            {!responseData ? (
                                isLoading ? (
                                    <ActivityIndicator size="large" color="#007BFF" />
                                ) : info !== null ? (
                                    <>
                                        <Text style={styles.label}>Descrição: {info.Descricao}</Text>
                                        <Text style={styles.label}>Valor: R$ {info.Valor.toFixed(2)}</Text>
                                        <TouchableOpacity style={styles.button} onPress={handleCreatePagamento}>
                                            <Text style={styles.buttonText}>Gerar Pagamento</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : <ActivityIndicator size="large" color="#007BFF" />
                            ) : (
                                <>
                                    <Text style={styles.label}>QR Code:</Text>
                                    <Image source={{ uri: responseData.QRCode_Path }} style={styles.qrCode} />
                                    <Text style={styles.label}>Código Pix:</Text>
                                    <TouchableOpacity onPress={() => {Clipboard.setString(responseData.PixCode); Alert.alert('O código Pix foi copiado para a área de transferência.')}}>
                                        <Text style={styles.pixCode}>{responseData.PixCode}</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Tempo restante: {formatTime(remainingTime)}</Text>
                                </>
                            )}
                            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                                <Text style={styles.cancelButtonText}>Cancelar Pagamento</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        )
    );
};

export default ModalPagamento;