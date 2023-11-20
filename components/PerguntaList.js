import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



export default function PerguntaList({ item }) {
    const Navigator = useNavigation();


    function perguntaDetalhe() {
        Navigator.navigate("PerguntaDetalhe", item);
    }
    function repostadetalhe() {
        Navigator.navigate("Resposta", item.id);
    }
   


    return (
        <TouchableOpacity onPress={perguntaDetalhe}>
            <View style={styles.card}>
                <View>
                    <Text style={styles.titulo}>{item.titulo}</Text>
                </View>
                <View style={styles.botoes}>
                    <TouchableOpacity   style={styles.botao} onPress={perguntaDetalhe}>
                        <Text  style={{color:'white',fontWeight:'bold'}}>Editar/Excluir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={[styles.botao, { width: 140 }]} onPress={repostadetalhe}>
                        <Text  style={{color:'white',fontWeight:'bold'}}>Cadastrar respostas</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

}
const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 10,
        width: 350,
        height: 150,
        marginBottom: 20
    },
    titulo: {
        marginTop: 10,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        fontSize: 17,
        marginLeft: 15
    },
    descricao: {
        marginTop: 10,
        fontFamily: 'Roboto',
        marginLeft: 15
    },
    botoes:{
        flexDirection:'row',
        gap:15,
        marginLeft:17,
        marginTop:16
    },
    botao: {
        width: 105,
        height: 30,
        marginTop: 8,
        marginBottom: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
      },
    botaoPergunta: {
        width: 125,
        height: 30,
        marginTop: 8,
        marginBottom: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
      }

})