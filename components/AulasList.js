import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



export default function AulasList({ item }) {
    const [videoId, setVideoId] = useState('');
    const Navigator = useNavigation();

    useEffect(() => {
        getVideoId();
    }, []);

    function getVideoId() {
        const url = item.url;
        const videoId = url.split("v=")[1];
        setVideoId(videoId);
    }

    function aulaDetalhe() {
        Navigator.navigate("AulaDetalhe", item);
    }
    function assistirAula() {
        Navigator.navigate("AulaVideo", item);
    }

    return (
        <TouchableOpacity onPress={aulaDetalhe}>
            <View style={styles.card}>
                <TouchableOpacity style={styles.thumbnail} onPress={assistirAula}>
                    <Image source={{ uri: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` }} style={{ width: 100, height: 85 }} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.titulo}>{item.titulo}</Text>
                    <Text style={styles.duracao}>  <FontAwesome5 style={styles.duracao} name='clock' size={13} color='black' /> {item.duracao}:00 minutos</Text>
                    <Text style={styles.descricao}>{item.descricao}</Text>
                    <TouchableOpacity style={styles.botaoAssistir} onPress={assistirAula} >
                        <Text style={styles.assitir}>Assistir Aula</Text>
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
        width: 370,
        height: 150,
        marginBottom: 20,
        flexDirection: 'row'
    },
    thumbnail:{
        marginTop:30,
        marginLeft:20
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
    botaoAssistir: {
        width: 90,
        height: 30,
        backgroundColor: '#3D5E3D',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 15,
        borderRadius: 15
    },
    assitir: {
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: 13
    }

})