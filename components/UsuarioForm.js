import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, FontAwesome5,Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, doc, updateDoc} from 'firebase/firestore';
import firebaseApp from '../config';

const db = getFirestore(firebaseApp);
const clienteCollection = collection(db, "Usuario");

export default function UsuarioForm({ route }) {

    const Navigator = useNavigation();
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState(false)
    const [usuario, setUsuario] = useState(route.params)
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleError, setIsVisibleError] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
      };
    const toggleVisibilityError = () => {
        setIsVisibleError(!isVisibleError);
      };

    async function atualizar() {
        setCarregando(true);
        try {
            const docRef = doc(db, 'Usuario', usuario.id);

            const camposAtualizados = {
                email: usuario.email,
                nome: usuario.nome
              };
        
            
            await updateDoc(docRef, camposAtualizados);
            setCarregando(false);
            toggleVisibility();

          } catch (error) {
            console.error("Erro ao atualizar a aula:", error);
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
                    Inserir Aula</Text>
            </View>
            <View style={styles.form}>
                {carregando ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator color={'#3D5E3D'} size={50}></ActivityIndicator>
                    </View>
                ) : (
                    <>
                        <Text style={styles.o}>Aula</Text>
                        {erro && <Text style={[styles.erroLogin]}>{erro}</Text>}
                        <ScrollView>
                            <Text style={styles.label}>Nome</Text>
                            <TextInput style={styles.input} onChangeText={(text) => setUsuario({ ...usuario, nome: text })} value={usuario.nome} />
                             {/* <Text style={styles.erro}>{erroNome}</Text>  */}
                            <Text style={styles.label}>E-mail</Text>
                            <TextInput style={styles.input} onChangeText={(text) => setUsuario({ ...usuario, email: text })} value={usuario.email} />
           
                           <View style={styles.botoesArea}>
                            <TouchableOpacity onPress={atualizar} style={styles.button}>
                                    <Text style={styles.textButton}>Atualizar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button,{backgroundColor: '#FF4500'}]}>
                                    <Text style={styles.textButton}>Excluir</Text>
                                </TouchableOpacity>
                           </View>
                           {isVisible && 
                           <View style={styles.box}>
                                <FontAwesome name='check' size={60} color='#0BAC00' />
                                <Text style={styles.textBox}>Aula atualizada com sucesso!!!</Text>
                                <TouchableOpacity onPress={toggleVisibility} style={styles.boxOk}><Text style={styles.textBox}>OK</Text></TouchableOpacity>
                            </View>}
                           {isVisibleError && 
                           <View style={styles.box}>
                                <Ionicons name="close-circle-outline" size={80} color='#FF4500' />
                                <Text style={styles.textBox}>Erro ao atualizar!!!</Text>
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
    botoesArea:{
        justifyContent:'space-around',
        flexDirection:'row'
    },
    button: {
        marginTop: 50,
        width: 150,
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
    box:{
        width: 350,
        height: 200,
        backgroundColor: 'white',
        position:'absolute',
        marginTop:100,
        marginHorizontal:25,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:25
    },
    textBox:{
        fontSize:19
    },
    boxOk:{
        marginTop:10
    }

})