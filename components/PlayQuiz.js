import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getFirestore, collection, query, getDocs, where, doc } from 'firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons';
import firebaseApp from '../config';


const db = getFirestore(firebaseApp);

const PlayQuiz = ({ route }) => {
    const [pergunta, setpergunta] = useState([]);
    const [resposta, setresposta] = useState([]);
    const [busca, setBusca] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [jogando, setJogando] = useState(false);
    const [contador, setContador] = useState(3);
    const [exibirOla, setExibirOla] = useState(false);
    const [segundoContador, setSegundoContador] = useState(10);
    const [larguraBarraTempo2, setLarguraBarraTempo2] = useState(370);
    const [quizId, setQuizId] = useState(route.params.id);
    const [respostaCerta, setRespostaCerta] = useState();
    const [respostaSelecionada, setRespostaSelecionada] = useState(null);
    const [indicePergunta, setIndicePergunta] = useState(0);
    const [qtdCerta, setQtdCerta] = useState(0);
    const [qtdErrada, setQtdErrada] = useState(0);

    const Navigator = useNavigation();

    useEffect(() => {
        fetchData();
    }, [quizId]);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        try {
            setCarregando(true);
            const collectionRef = collection(db, 'Pergunta');
            const querySnapshot = await getDocs(query(collectionRef, where('quiz', '==', quizId)));

            const perguntaData = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                perguntaData.push({
                    id: doc.id,
                    titulo: data.titulo
                });
            });

            setpergunta(perguntaData);
           
            const arrayId = perguntaData.map((el) => {
                return el.id
            })

            const collectionRef2 = collection(db, 'Resposta');
            const querySnapshot2 = await getDocs(query(collectionRef2, where('pergunta', 'in', arrayId)));

            const respostaData = [];

            querySnapshot2.forEach((doc) => {
                const data = doc.data();
                respostaData.push({
                    id: doc.id,
                    titulo: data.titulo,
                    correta: data.correta,
                    pergunta:data.pergunta
                });
            });
            setresposta(respostaData);
            setCarregando(false);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setCarregando(false);
        }
    };
    let intervalIdContador; 
    let intervalIdSegundoContador;
    const iniciarJogo = () => {
        setJogando(true);
    
        intervalIdContador = setInterval(() => {
            setContador((prevContador) => {
                if (prevContador > 1) {
                    return prevContador - 1;
                } else {
                    clearInterval(intervalIdContador);
                    iniciarSegundoContador();
                    setExibirOla(true);
                    return 0;
                }
            });
        }, 1000);
    };

    const iniciarSegundoContador = () => {
        intervalIdSegundoContador = setInterval(() => {
            setSegundoContador((prevContador) => {
                if (prevContador > 0) {
                    setLarguraBarraTempo2((prevLargura) => {
                        const novaLargura = prevLargura - (370 / 10);
                        return novaLargura >= 0 ? novaLargura : 0;
                    });
                    return prevContador - 1;
                } else {
                    clearInterval(intervalIdSegundoContador);
                    return 0;
                }
            });
        }, 1000);
    };
    const jogar = () => {
        iniciarJogo();
    };

    function verificarResposta(resposta) {

        setRespostaSelecionada(resposta.id);
        if (resposta.correta) {
            setRespostaCerta(resposta.id);
            setQtdCerta(prevQtdCerta => prevQtdCerta + 1);
           
        }
        else
        {
            setQtdErrada(prevQtdCerta => prevQtdCerta + 1);
        }
        setContador(0);
        setSegundoContador(0);



    }

    const proximaPergunta = () => {
        clearInterval(intervalIdContador);
        clearInterval(intervalIdSegundoContador);
    
        setIndicePergunta((prevIndice) => prevIndice + 1);
        const indice = indicePergunta + 1;
        if(indice == pergunta.length)
        {
           const resultado = {qtdCerta,qtdErrada}
            Navigator.navigate('ResultadoQuiz',resultado);
        }

        setRespostaCerta(null);
        setRespostaSelecionada(null);
        setLarguraBarraTempo2(370);
        setSegundoContador(10);
        iniciarSegundoContador();
    };

    return (
        <View style={styles.container}>
            <View style={styles.verde}>
                <View style={styles.voltar}>
                    <TouchableOpacity>
                        <FontAwesome5 style={styles.texto} name='arrow-left' size={24} color='black' />
                    </TouchableOpacity>
                    <Text style={[styles.texto, { marginLeft: 5 }]}>
                        Quiz</Text>
                </View>
            </View>
            {contador === 0 && larguraBarraTempo2 > 0 && (
                <View style={styles.barraTempo}>
                    <View style={[styles.barraTempo2, { width: larguraBarraTempo2 }]}>
                        <FontAwesome5 style={{ marginLeft: 10 }} name='clock' size={14} color='white' />
                        <Text style={styles.tempo}>{segundoContador}</Text>

                    </View>
                </View>
            )}
            {contador === 0 && <Text style={styles.tituloQuestao}>Questão {indicePergunta + 1}/{pergunta.length}</Text>}
            <View style={styles.branco}>
                {!jogando ? (
                    <TouchableOpacity onPress={jogar} style={styles.botaoAula}>
                        <Text style={{ color: 'white', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 18 }}>Jogar</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        {contador > 0 && <Text style={styles.contador}>{contador}</Text>}
                        {contador === 0 && larguraBarraTempo2 > 0 && (
                            <>
                                <Text style={styles.pergunta}>{pergunta[indicePergunta]?.titulo}</Text>
                                <Text style={styles.tituloQuestao}>Respostas:</Text>
                                {resposta
                                    .filter(resp => resp.pergunta === pergunta[indicePergunta]?.id)
                                    .map((resp, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.respostaBox,
                                                {
                                                    backgroundColor:
                                                        resp.id === respostaCerta
                                                            ? 'green'
                                                            : resp.id === respostaSelecionada
                                                                ? 'red'
                                                                : '#ccc',
                                                },
                                            ]} onPress={() => verificarResposta(resp)}>
                                            <Text key={index} style={styles.resposta}>{resp.titulo}</Text>
                                        </TouchableOpacity>
                                    ))}

                                <TouchableOpacity style={styles.proximaPergunta} onPress={proximaPergunta}>
                                    <Text style={{ color: 'white' }}>Próximo</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        {larguraBarraTempo2 === 0 && <Text style={styles.pergunta}>Acabou</Text>}
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#3D5E3D'
    },
    verde: {
        flex: 0.2,
        backgroundColor: '#3D5E3D',
        flexDirection: 'row'
    },
    branco: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'column',
        alignItems: 'center'
    },
    botaoAula: {
        width: 120,
        height: 40,
        marginTop: 200,
        marginBottom: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    contador: {
        fontSize: 32,
        marginTop: 20,
        marginBottom: 20,
        marginTop: 150
    },
    voltar: {
        marginBottom: 20,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    texto: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Roboto',
    },
    barraTempo: {
        width: 370,
        height: 23,
        backgroundColor: 'red',
        borderRadius: 16,
        marginHorizontal: 15
    },
    barraTempo2: {
        width: 370,
        height: 23,
        backgroundColor: 'green',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    tempo: {
        color: 'white',
        marginLeft: 5,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 16
    },
    tituloQuestao: {
        marginTop: 8,
        marginLeft: 15,
        marginBottom: 8,
        color: 'white',
        fontSize: 24
    },
    pergunta: {
        fontSize: 21,
        marginTop: 16
    },
    respostaBox: {
        width: 350,
        height: 40,
        borderRadius: 20,
        marginBottom: 10,
        backgroundColor: '#ccc',
        paddingLeft: 20,
        justifyContent: 'center'
    },
    proximaPergunta: {
        width: 80,
        height: 40,
        backgroundColor: '#3D5E3D',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 20

    }
});

export default PlayQuiz;
