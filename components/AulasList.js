import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function AulasList({ item }) {

        
    const Navigator = useNavigation();

    function aulaDetalhe() {
        Navigator.navigate("AulaDetalhe",item);
    }

    return (
        <TouchableOpacity onPress={aulaDetalhe}>
            <View style={styles.card}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text style={styles.duracao}>  <FontAwesome5 style={styles.duracao} name='clock' size={13} color='black' /> {item.duracao}:00 minutos</Text>
                <Text style={styles.descricao}>{item.descricao}</Text>
            </View>
        </TouchableOpacity>
    );

}
const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 10,
        width: 350,
        height: 130,
        marginBottom:20
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
    }

})