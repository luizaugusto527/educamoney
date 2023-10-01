import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text,TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import YoutubeIframe from "react-native-youtube-iframe";


export default function AulaVideo({ route }) {


    const [videoId, setVideoId] = useState('');

    useEffect(() => {
        if (route.params.url) {
            geturl(route.params.url);
        }
    }, [route.params.url]);

    function geturl(url) {
        const videoId = url.split("v=")[1];
        console.log(videoId);
        setVideoId(videoId);
    }

    return (
        <>
            <View style={styles.voltar}>
                <TouchableOpacity>
                    <FontAwesome5 style={styles.texto} name='arrow-left' size={24} color='black' />
                </TouchableOpacity>
                <Text style={[styles.texto, { marginLeft: 5 }]}>
                    {route.params.titulo}</Text>
            </View>
            <View style={styles.card}>
                <YoutubeIframe height={300} videoId={videoId} ></YoutubeIframe>
            </View>
            <View style={styles.descricao} >
                <Text style={styles.descricaoTitulo}>Descrição</Text>
                <Text style={styles.descricaoTexto}>{route.params.descricao}</Text>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    card: {
        marginTop: 80
    },
    descricao: {
        marginLeft: 16,
        position: 'relative',
        bottom: 50
    },
    descricaoTitulo: {
        fontSize: 21,
        fontWeight: 'bold'
    },
    descricaoTexto: {
        fontSize: 17
    },
    voltar: {
        position:'relative',
        top:40,
        left:10,
        flexDirection: 'row',
        alignItems: 'center'
      },
      texto: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Roboto',
      }
})

