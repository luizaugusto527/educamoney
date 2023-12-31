import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebaseApp, { storage } from '../config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signOut} from 'firebase/auth';


export const Menu = ({ route }) => {
  const [imageUrl, setImageUri] = useState("");
  const nome =  route.params.nome;
  const id = route.params.id;
  const Navigator = useNavigation();
  function acessar(menu) {
    if (menu == "UsuarioForm") {
      Navigator.navigate(menu,route.params);
    }
    else{
      Navigator.navigate(menu);
      
    }
   
    
  }
  async function logout() {
    try {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
     
      Navigator.navigate("Login");
    } catch (error) {
      console.error('Erro durante o logout:', error);
    }
  }

  useEffect(() => {
    // Fun��o para buscar a imagem do Firebase Storage
    async function buscarImagem() {
        try {
            const storageRef = ref(storage, 'image/' + id + '.jpg');
            const imageUri = await getDownloadURL(storageRef);
            setImageUri(imageUri);
           
        } catch (error) {

            console.error("Erro ao buscar a imagem:", error);
        }
    }


    buscarImagem();
}, [id]);


  return (
   <ScrollView>
     <View style={styles.container}>
      <View style={styles.verde}>
        <Text style={styles.texto}>Oi, {nome} !</Text>
        <View style={styles.avatar}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.imageInAvatar} />}
        </View>
      </View> 
      <View style={styles.branco}>
       <TouchableOpacity onPress={()=>acessar('UsuarioForm')}>
        <View  style={styles.menu}>
        <Image  source={require('../assets/menu/icon-user.png')} style={{width:45,height:45}}/>
        <Text>Usuário</Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>acessar('Organizar')} >
        <View  style={styles.menu}>
        <Image  source={require('../assets/menu/icon-dollar.png')} style={{width:45,height:45}}/>
          <Text>Organizar gastos</Text>
        </View>
        
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>acessar('Questao')}>
        <View  style={styles.menu}>
        <Image  source={require('../assets/menu/icon-puzzle.png')} style={{width:45,height:45}}/>
         
        <Text>Puzzle</Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity  onPress={()=>acessar('Aula')}>
        <View  style={styles.menu}>
        <Image  source={require('../assets/menu/icon-aulas.png')} style={{width:39,height:61}}/>
         
         <Text>Aula</Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>acessar('Duvida')}>
        <View  style={styles.menu}>
        <Image  source={require('../assets/menu/icon-duvida.png')} style={{width:47,height:55}}/>
         
         <Text>Duvida</Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity  onPress={()=>logout()} >
        <View  style={styles.menu}>
        <Image  source={require('../assets/menu/icon-sair.png')} style={{width:47,height:55}}/>
         
         <Text>Sair</Text>
        </View>
       </TouchableOpacity>
     
      </View>
    </View>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#3D5E3D'
  },
  verde: {
    flex: 0.3, 
    backgroundColor: '#3D5E3D',
    flexDirection:'row'
  },
  branco: {
    flex: 1, 
    marginTop:15,
    backgroundColor: 'white', 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around'
  },
  menu: {
    width:150,
    height:150,
    marginTop:20,
    backgroundColor:'#E9AE24',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'

  },
  texto:{
    marginTop:80,
    marginLeft:30,
    fontSize:30,
    color:'white'
  },
  tituloMenu:{
    fontFamily:'Roboto',
    fontSize:19,
    fontWeight:'bold'
  },
  logo:{
   width:100,
   height:100,
   backgroundColor:'white',
   borderRadius:50,
   borderWidth:4,
   borderColor:'#E9AE24',
   marginTop:65,
   marginLeft:120
  },
  avatar: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 75,
    overflow: 'hidden',
    position: 'relative',
    marginTop:65,
    marginLeft:90
},
  imageInAvatar: {
    width: '100%',
    height: '100%',
    position: 'absolute',
}
});
