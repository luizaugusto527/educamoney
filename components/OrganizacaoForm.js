import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome,FontAwesome5, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import { getFirestore, collection,addDoc  } from 'firebase/firestore';
import firebaseApp from '../config';
import { format } from 'date-fns';

const db = getFirestore(firebaseApp);
const clienteCollection = collection(db, "Organizacao");

export default function OrganizacaoForm() {

    const Navigator = useNavigation();
    const [carregando, setCarregando] = useState(false);
    const [date, setDate] = useState(new Date());
    const [erro, setErro] = useState(false);
    const [showData, setShowData] = useState(false);
    const [organizacao, setOrganizacao] = useState({descricao:'',data:new Date(),valor:'',tipo:''});
    const [operacao, setOperacao] = useState("Criada");
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleError, setIsVisibleError] = useState(false);

  function teste() {
    console.log('aaa');
  }
    const toggleVisibility = (excluida) => {
        if (excluida)
            setOperacao("Excluida");
        setIsVisible(!isVisible);
        excluida ? Navigator.goBack() : null;
    };

    const toggleVisibilityError = (excluida) => {
        if (excluida)
            setOperacao("Excluir");
        excluida ? Navigator.navigate("OrganizacaoList") : null;
        setIsVisibleError(!isVisibleError);
    };

    async function cadastrar() {
        setCarregando(true);
        try {
            if (typeof organizacao.data == 'object') {
                organizacao.data = organizacao.data.toISOString().slice(0, 10)
            }

            const docRef = await addDoc(clienteCollection, organizacao);
            setIsVisible(true)
            setCarregando(false);

          } catch (error) {
            console.error("Erro ao adicionar o documento:", error);
            setCarregando(false);
          }
         

    }



    function showModalDate() {
        setShowData(true);
    }

    const handleDateChange = (event, selectedDate) => {
        setShowData(false);
        if (selectedDate) {
            setDate(selectedDate);
            setOrganizacao({ ...organizacao, data: selectedDate });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.voltar}>
                <TouchableOpacity>
                    <FontAwesome5 style={styles.texto} name='arrow-left' size={24} color='black' />
                </TouchableOpacity>
                <Text style={[styles.texto, { marginLeft: 5,width:200 }]}>
                    Receitas/Despesas</Text>
            </View>
            <View style={styles.form}>
                {carregando ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator color={'#3D5E3D'} size={50}></ActivityIndicator>
                    </View>
                ) : (
                    <>
                        <Text style={styles.o}>Receitas/Despesas</Text>
                        {erro && <Text style={[styles.erroLogin]}>{erro}</Text>}
                        <ScrollView>
                            <Text style={styles.label}>Data</Text>
                            <View style={styles.data}>
                                <TextInput
                                    style={[styles.inputData, { width: 150 }]}
                                    value={format(new Date(organizacao.data), 'dd/MM/yyy')}
                                />
                                <TouchableOpacity style={styles.dataIcon} onPress={showModalDate} >
                                    <FontAwesome5 name='calendar-day' size={21} color='black' />
                                </TouchableOpacity>
                            </View>
                            {showData && (
                                <DateTimePicker
                                    mode='date'
                                    value={date}
                                    onChange={handleDateChange}
                                    textColor='red'
                                />
                            )}

                            <Text style={styles.label}>Descrição</Text>
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={(text) => setOrganizacao({ ...organizacao, descricao: text })}
                                value={organizacao.descricao}
                            />
                            <Text style={styles.label}>Valor</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setOrganizacao({ ...organizacao, valor: text })}
                                value={organizacao.valor}
                            />
                            <Text style={styles.label}>Tipo</Text>
                            <RadioButton.Group onValueChange={newValue => setOrganizacao({ ...organizacao, tipo: newValue })} value={organizacao.tipo} >
                                <View style={styles.radio}>
                                    <View>
                                        <Text>Receita</Text>
                                        <RadioButton value="Receita" />
                                    </View>
                                    <View style={{marginLeft:15}}>
                                        <Text>Despesas</Text>
                                        <RadioButton value="Despesas" />
                                    </View>
                                </View>
                            </RadioButton.Group>
                            <View style={styles.botoesArea}>
                                <TouchableOpacity onPress={cadastrar} style={styles.button}>
                                    <Text style={styles.textButton}>Cadastrar</Text>
                                </TouchableOpacity>
                           
                            </View>
                            {isVisible &&
                                <View style={styles.box}>
                                    <FontAwesome name='check' size={60} color='#0BAC00' />
                                    <Text style={styles.textBox}>organizacao {operacao} com sucesso!!!</Text>
                                    <TouchableOpacity onPress={toggleVisibility} style={styles.boxOk}><Text style={styles.textBox}>OK</Text></TouchableOpacity>
                                </View>}
                            {isVisibleError &&
                                <View style={styles.box}>
                                    <Ionicons name="close-circle-outline" size={80} color='#FF4500' />
                                    <Text style={styles.textBox}>Erro ao {operacao}!!!</Text>
                                    <TouchableOpacity onPress={toggleVisibilityError} style={styles.boxOk}><Text style={styles.textBox}>OK</Text></TouchableOpacity>
                                </View>}
                        </ScrollView>
                    </>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3D5E3D'
    },

    titulo: {
        fontSize: 35,
        fontFamily: 'Roboto',
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    o: {
        fontSize: 25,
        fontFamily: 'Roboto',
        marginTop: 19,
        marginHorizontal: 24,

    },
    u: {
        fontSize: 20,
        fontFamily: 'Roboto',
        marginTop: 8,
        marginHorizontal: 24,
        color: '#9932CC'

    },
    input: {
        width: 315,
        height: 50,
        borderBottomWidth: 1,
        marginHorizontal: 24,
        padding: 0,
        fontSize: 23
    },
    inputData: {
        width: 315,
        height: 50,
        borderBottomWidth: 1,
        marginHorizontal: 24,
        padding: 0,
        fontSize: 21,
    },
    label: {
        fontSize: 14,
        color: '#777',
        marginHorizontal: 24,
        marginTop: 24
    },
    botoesArea: {
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    button: {
        marginTop: 50,
        width: 315,
        height: 54,
        backgroundColor: '#3D5E3D',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 32,
        flexDirection: 'row',
        borderRadius: 10
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 21,
        fontWeight: 'bold'
    },
    icon: {
        position: 'relative',
        left: 310,
        bottom: 40
    },
    logar: {
        fontSize: 15,
        color: '#777',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10
    },
    erro: {
        fontSize: 14,
        marginLeft: 24,
        color: 'red'
    },
    erroLogin: {
        fontSize: 20,
        marginLeft: 24,
        color: 'red'
    },
    voltar: {
        width: 120,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 250,
        flexDirection: 'row',
        alignItems: 'center'
    },
    texto: {
        fontSize: 20,
        marginTop: 35,
        marginBottom: 30,
        color: 'white',
        fontFamily: 'Roboto',
        alignItems: 'center'
    },
    form: {
        width: '100%',
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline'
    },
    box: {
        width: 350,
        height: 200,
        backgroundColor: 'white',
        position: 'absolute',
        marginTop: 100,
        marginHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 25
    },
    textBox: {
        fontSize: 19
    },
    boxOk: {
        marginTop: 10
    },
    data: {
        flexDirection: 'row'
    },
    dataIcon: {
        marginTop: 12,
        right: 45
    },
    radio: {
        flexDirection: 'row',
        marginTop:5,
        marginLeft:20
    }

})