import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Image, View, Alert, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../../config'; 
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const db = getFirestore(firebaseApp);


export default function FormLogin() {
    const [verSenha, setVersenha] = useState(true)
    const [user, setUser] = useState({ nome: "", email: "", senha: "" })
    const [erro, setErro] = useState("")
    const [erroEmail, setErroEmail] = useState("")
    const [erroNome, setErroNome] = useState("")
    const [erroSenha, setErroSenha] = useState("")
    const [carregando, setCarregando] = useState(false)

    const clienteCollection = collection(db, "Usuario");

    const [icone, setIcone] = useState('eye-off')

    const Navigator = useNavigation();

    function trocaIcone() {
        setVersenha(!verSenha);
        icone === 'eye' ? setIcone('eye-off') : setIcone('eye')

    }

    async function validar() {
        setCarregando(true);
        const email = user.email;
        const senha = user.senha;
        const nome = user.nome;
        let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
        if (!regex.test(email)) {
            setErroEmail("E-mail Inválido");
        } else {
            setErroEmail("");
        }
    
        if (senha === '') {
            setErroSenha("Senha Inválida");
        } else {
            setErroSenha("");
        }
    
        if (nome === '') {
            setErroNome("Nome Inválido");
        } else {
            setErroNome("");
        }
    
        if (!regex.test(email) || senha === '' || nome === '') {
            setCarregando(false);
            return;
        }
    
    
        const q = query(collection(db, "Usuario"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.size > 0) {
            setErro("Este e-mail já está em uso.");
            setCarregando(false)
        } else {
            setErro("");
            cadastrar(user);
        }
    }
  
    async function cadastrar(user) {
        try {
            const docRef = await addDoc(clienteCollection, user);
            const auth = getAuth(firebaseApp); 
            await createUserWithEmailAndPassword(auth, user.email, user.senha); 
            Alert.alert("Criado com sucesso");
            Navigator.navigate("Login");
            setCarregando(false);

          } catch (error) {
            console.error("Erro ao adicionar o documento:", error);
            setCarregando(false);
          }
         
          };

    function logar() {
        Navigator.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../images/logo.png')} style={styles.logo} />
            <Text style={styles.titulo}>EducaMoney</Text>
            <View style={styles.form}>
                {carregando ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator color={'#3D5E3D'} size={50}></ActivityIndicator>
                    </View>
                ) : (
                    <>
                        <Text style={styles.o}>Cadastre-se!</Text>
                        {erro && <Text style={[styles.erroLogin]}>{erro}</Text>}
                        <ScrollView>
                            <Text style={styles.label}>Nome</Text>
                            <TextInput style={styles.input} onChangeText={(text) => setUser({ ...user, nome: text })} value={user.nome} />
                            <Text style={styles.erro}>{erroNome}</Text>
                            <Text style={styles.label}>E-mail</Text>
                            <TextInput style={styles.input} onChangeText={(text) => setUser({ ...user, email: text })} value={user.email} />
                            <Text style={styles.erro}>{erroEmail}</Text>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput style={styles.input} secureTextEntry={verSenha} onChangeText={(text) => setUser({ ...user, senha: text })} value={user.senha} />
                            <TouchableOpacity style={styles.icon} onPress={trocaIcone}>
                                <Ionicons name={icone} size={28} color="black" />
                            </TouchableOpacity>
                            <Text style={[styles.erro, { position: 'relative', bottom: 30 }]}>{erroSenha}</Text>
                            <TouchableOpacity onPress={validar} style={styles.button}>
                                <Text style={styles.textButton}>Cadastrar</Text>
                            </TouchableOpacity>
                            <Text style={styles.logar}>Ja possui conta? Entre <Text style={styles.link} onPress={logar}>aqui</Text></Text>
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
    logo: {
        width: 110,
        height: 114,
        marginTop: 50
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
        width: 315,
        height: 54,
        backgroundColor: '#3D5E3D',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 32,
        flexDirection: 'row',
        borderRadius: 10
    },
    loadingContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
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