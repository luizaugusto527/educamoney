import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../config';

const db = getFirestore(firebaseApp);
LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: [
        'Jan.', 'Fev.', 'Mar.', 'Abr.', 'Maio', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'
    ],
    dayNames: [
        'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
    ],
    dayNamesShort: [
        'Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'
    ],
};

LocaleConfig.defaultLocale = 'pt-br';

export default function Organizar() {
    const [carregando, setCarregando] = useState(false)
    const [organizacao, setOrganizacao] = useState()

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setCarregando(true);
            const q = query(collection(db, 'Organizacao'));
            const querySnapshot = await getDocs(q);
            const datas = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data().data;
                datas.push(data);
            });

            setOrganizacao(datas);

            setCarregando(false);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setCarregando(false);
        }
    };

    const markedDates = {};

    // organizacao.forEach(data => {
    //     markedDates[data] = { marked: true, selected: true, selectedColor: 'green' };
    // });
    const Navigator = useNavigation();


    const [date, setDate] = useState('');
    const renderCustomHeader = (date) => {

        return (
            <View style={styles.customHeader}>
                <Text style={styles.customHeaderText}>{date.toString('MMMM yyyy', 'pt-br')}</Text>
            </View>
        );
    }

    const renderCustomArrow = (direction) => {

        const arrowText = direction === 'left' ? <FontAwesome5 name='arrow-left' size={14} />
            : <FontAwesome5 name='arrow-right' size={14} />

        return (
            <View style={styles.customArrow}>
                <Text style={styles.customArrowText}>{arrowText}</Text>
            </View>
        );
    }
    const renderCustomDay = (day) => {
        return (

            <Text style={styles.customDayText}>a</Text>

        );
    }
    const organizacaolist = () => {
        Navigator.navigate("OrganizacaoDetalhe", date)
    }
    const organizacaoForm = () => {
        Navigator.navigate("OrganizacaoForm")
    }

    return (
        <View style={styles.container}>
            <View style={styles.verde}>
                <View style={styles.voltar}>
                    <TouchableOpacity>
                        <FontAwesome5 style={styles.texto} name='arrow-left' size={24} color='black' />
                    </TouchableOpacity>
                    <Text style={[styles.texto, { marginLeft: 5 }]}>
                        Organização</Text>
                </View>
            </View>
            <View style={styles.branco}>
                <Calendar
                    style={{ width: 370, marginTop: 24 }}
                    renderHeader={(date) => renderCustomHeader(date)}
                    renderArrow={(direction) => renderCustomArrow(direction)}
                    renderDay={(day) => renderCustomDay(day)}
                    onDayPress={(date) => setDate(date.dateString)}
                    markedDates={markedDates}
                />

                <TouchableOpacity style={styles.organizacaoButton} onPress={organizacaolist}>
                    <Text style={styles.organizacaoButtonText}>Verificar Receitas / Despesas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.organizacaoButton} onPress={organizacaoForm}>
                    <Text style={styles.organizacaoButtonText}>Criar Receitas / Despesas</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
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
    }
});
