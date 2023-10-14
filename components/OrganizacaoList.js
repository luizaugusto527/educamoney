import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import format from 'date-fns/format';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import firebaseApp from '../config';
import { Button } from 'react-native-paper';

const db = getFirestore(firebaseApp);


export default function OrganizacaoList({ item }) {

    const [carregando, setCarregando] = useState(false)
    const [isVisibleError, setIsVisibleError] = useState(false);
    const [operacao, setOperacao] = useState("Excluída")
    const [isVisible, setIsVisible] = useState(false);



    const Navigator = useNavigation();


    function editarOrganizacao() {
        Navigator.navigate("OrganizacaoEditar", item);
    }


    return (
        <>
            <TouchableOpacity onPress={editarOrganizacao}>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.titulo}>{item.descricao}</Text>
                        <Text style={styles.duracao}>  <FontAwesome5 style={styles.duracao} name='calendar' size={13} color='#3D5E3D' /> {format(new Date(item.data), 'dd/MM/yyyy')}</Text>
                        <Text style={styles.descricao}>{item.tipo} </Text>
                        <Text style={[styles.descricao, { color: item.tipo == 'Receita' ? 'green' : '#FF4500' }]}>Valor: R${item.valor}</Text>
                        <View style={styles.acoes}>
                            <TouchableOpacity style={styles.botao} onPress={editarOrganizacao} >
                                <Text style={styles.botaoTexto}> Editar/Excluir</Text>
                            </TouchableOpacity>

                        </View>
                    </View>



                </View>

            </TouchableOpacity>

        </>


    );

}
const styles = StyleSheet.create({
    card: {
        marginTop: 35,
        borderWidth: 1,
        borderRadius: 10,
        width: 350,
        height: 180,
        marginBottom: 20,
        flexDirection: 'row'
    },
    thumbnail: {
        marginTop: 30,
        marginLeft: 20
    },
    titulo: {
        marginTop: 10,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        fontSize: 17,
        marginLeft: 15
    },
    duracao: {
        marginTop: 10,
        fontFamily: 'Roboto',
        marginLeft: 10
    },
    descricao: {
        marginTop: 10,
        fontFamily: 'Roboto',
        marginLeft: 15
    },
    botao: {
        width: 110,
        height: 35,
        backgroundColor: '#3D5E3D',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 15,
        borderRadius: 15
    },
    botaoTexto: {
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: 13
    },
    acoes: {
        flexDirection: 'row'
    },

})