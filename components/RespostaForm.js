import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../config';

const db = getFirestore(firebaseApp);
const clienteCollection = collection(db, "Resposta");

export default function RespostaForm({ route }) {
    const Navigator = useNavigation();
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState(false)
    const [resposta, setresposta] = useState({ titulo: "", pergunta: route.params,correta:false })
    const [respostaId, setrespostaId] = useState(route.params);
    const [checked, setChecked] = useState(false);




    async function cadastrar() {
        setCarregando(true);
        try {
          
            const novaResposta = {
                ...resposta,
                pergunta: respostaId,
                correta: checked
            };
    
            const docRef = await addDoc(clienteCollection, novaResposta);
            Alert.alert("Criado com sucesso");
            Navigator.navigate("Resposta");
            setCarregando(false);

        } catch (error) {
            console.error("Erro ao adicionar o documento:", error);
            setCarregando(false);
        }

    }
    return (
        <View style={styles.container}>
            <View style={styles.voltar}>
                <TouchableOpacity>
                    <FontAwesome5 style={styles.texto} name='arrow-left' size={24} color='black' />
                </TouchableOpacity>
                <Text style={[styles.texto, { marginLeft: 5 }]}>
                    Inserir resposta</Text>
            </View>
            <View style={styles.form}>
                {carregando ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator color={'#3D5E3D'} size={50}></ActivityIndicator>
                    </View>
                ) : (
                    <>
                        <Text style={styles.o}>Cadastrar uma resposta</Text>
                        {erro && <Text style={[styles.erroLogin]}>{erro}</Text>}
                        <ScrollView>
                            <Text style={styles.label}>Titulo</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setresposta({ titulo: text, pergunta: route.params })}
                                value={resposta.titulo}
                            />
                            <CheckBox
                                title='Resposta certa'
                                checked={checked}
                                onPress={() => setChecked(!checked)}
                            />
                            {/* <Text style={styles.erro}>{erroNome}</Text>  */}

                            <Text style={[styles.erro, { position: 'relative', bottom: 30 }]}></Text>
                            <TouchableOpacity onPress={cadastrar} style={styles.button}>
                                <Text style={styles.textButton}>Cadastrar</Text>
                            </TouchableOpacity>

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
        fontSize: 30,
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
    label: {
        fontSize: 14,
        color: '#777',
        marginHorizontal: 24,
        marginTop: 24
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
    }

})