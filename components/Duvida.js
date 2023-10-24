import { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import Collapsible from "react-native-collapsible";

export default function Duvida() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [arrow, setArrow] = useState('arrow-right');

    const toggleAccordion = () => {
        setIsCollapsed(!isCollapsed);

        isCollapsed ? setArrow('arrow-down') : setArrow('arrow-right')
    };
    return (
        <View style={styles.container}>
            <View style={styles.verde}>
                <View style={styles.voltar}>
                    <TouchableOpacity>
                        <FontAwesome5 style={styles.texto} name='arrow-left' size={24} color='black' />
                    </TouchableOpacity>
                    <Text style={[styles.texto, { marginLeft: 5 }]}>
                        Dúvida</Text>
                </View>
            </View>
            <View style={styles.branco}>

                <View>
                    <View style={styles.pergunta}>
                        <TouchableOpacity onPress={toggleAccordion}>
                          <View> <Text>O APP é da gratuito?</Text> <FontAwesome5 name={arrow} size={24} color='black' /></View>
                        </TouchableOpacity>
                    </View>
                    <Collapsible collapsed={isCollapsed}>
                        <Text>Conteúdo do acordeão</Text>
                    </Collapsible>
                </View>

            </View>
        </View>
    )
}


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
    voltar: {
        marginBottom: 20,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    customHeader: {
        padding: 10,
        alignItems: 'center',
    },
    customHeaderText: {
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    customDayText: {
        fontSize: 16,
        color: 'white',
    },
    texto: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Roboto',
    },
    organizacaoButton: {
        marginTop: 50,
        width: 220,
        height: 45,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3D5E3D'
    },
    organizacaoButtonText: {
        color: 'white'
    },
    pergunta: {
        backgroundColor:'red',
        width:300,
        height:50,
        marginTop:20
    },
});
