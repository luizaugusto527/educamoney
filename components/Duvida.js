import { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import Collapsible from "react-native-collapsible";

export default function Duvida() {
    const [isCollapsed1, setIsCollapsed1] = useState(true);
    const [isCollapsed2, setIsCollapsed2] = useState(true);
    const [isCollapsed3, setIsCollapsed3] = useState(true);

    const toggleAccordion1 = () => {
        setIsCollapsed1(!isCollapsed1);
    };

    const toggleAccordion2 = () => {
        setIsCollapsed2(!isCollapsed2);
    };

    const toggleAccordion3 = () => {
        setIsCollapsed3(!isCollapsed3);
    };

    return (
        <View style={styles.container}>
            <View style={styles.verde}>
                <View style={styles.voltar}>
                    <TouchableOpacity>
                        <FontAwesome5 style={styles.texto} name='arrow-left' size={24} color='black' />
                    </TouchableOpacity>
                    <Text style={[styles.texto, { marginLeft: 5 }]}>
                        Dúvidas</Text>
                </View>
            </View>
            <View style={styles.branco}>
                <View style={{marginTop:50}}>
                    <View style={styles.pergunta}>
                        <TouchableOpacity onPress={toggleAccordion1}>
                            <View style={styles.titulo}>
                                <FontAwesome5 style={{marginRight:20}} name={isCollapsed1 ? 'arrow-right' : 'arrow-down'} size={19} color='black' />
                                <Text style={styles.perguntatitulo}>Qual a necessidade dessa aplicação?</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Collapsible collapsed={isCollapsed1} style={{width:320}}>
                        <Text style={{marginLeft:38}} >Essa aplicação tem como objetivo principal, auxiliar os jovens a aprenderem a utilizar seu dinheiro da melhor forma possÃ­vel desde cedo.</Text>
                    </Collapsible>
                </View>
                <View>
                    <View style={styles.pergunta}>
                        <TouchableOpacity onPress={toggleAccordion2}>
                            <View style={styles.titulo}>
                                <FontAwesome5 style={{marginRight:20}} name={isCollapsed2 ? 'arrow-right' : 'arrow-down'} size={19} color='black' />
                                <Text style={styles.perguntatitulo}>O que é um orçamento e por que ela é importante ?</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Collapsible collapsed={isCollapsed2} style={{width:320}}>
                        <Text style={{marginLeft:38}} >Um orçamento é um plano que ajuda a controlar suas despesas e receitas. Ele é importante porque permite que você saiba para onde seu dinheiro está indo, ajuda a evitar gastos excessivos e a poupar para atingir suas metas financeiras.
</Text>
                    </Collapsible>
                </View>
                <View>
                    <View style={styles.pergunta}>
                        <TouchableOpacity onPress={toggleAccordion3}>
                            <View style={styles.titulo}>
                                <FontAwesome5 style={{marginRight:20}} name={isCollapsed3 ? 'arrow-right' : 'arrow-down'} size={19} color='black' />
                                <Text style={styles.perguntatitulo}>Quais são os benefícios de começar a investir desde jovem?</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Collapsible collapsed={isCollapsed3} style={{width:320}}>
                        <Text style={{marginLeft:38}} >Começar a investir desde jovem tem várias vantagens. Isso permite que você aproveite o poder dos juros compostos, construa riqueza ao longo do tempo e tenha mais flexibilidade financeira no futuro.</Text>
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
    pergunta:{
        marginTop:40
    },
    perguntatitulo:{
        fontSize:19
    },
    titulo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20, // Ajuste conforme necessário
        paddingVertical: 10, // Ajuste conforme necessário
    },
    
});
