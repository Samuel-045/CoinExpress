import React,{useState , useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity , View} from 'react-native';

import HrComponent from '../components/hr'

function telaPerfil({navigation}){
  let [valueN, setChangeTextN] = useState('');
  let [valueE, setChangeTextE] = useState('');
  
 async function read(){
     try{
      const json = await AsyncStorage.getItem('DadosUsuario')
      if(json != null){
        var usuario = JSON.parse(json)
        setChangeTextN(usuario.Nome)
        setChangeTextE(usuario.Email)
        setChangeTextS(usuario.Senha)
        
      }
    }catch(error){
      console.error('Erro ao buscar dados no AsyncStorage', error.message);
    }
  }

  useEffect(() => {
    read()
  }, [])

  return(
    
    <SafeAreaView style={styles.container}>
      <View>  
        <Text style={styles.textoA}> Perfil </Text>
      </View> 

      <View>
        <Text style={styles.textoB}> Seus Dados </Text>
        <HrComponent/>
        
        <View  style={styles.dadosEopcoes}>
          <Text style={styles.textoC}>Nome:  {valueN}</Text>
          <Text style={styles.textoC}>Email:   {valueE} </Text>
          <Text style={styles.textoC}>Senha: ........ </Text>
        </View>
      </View>
     

      <View>
        <Text style={styles.textoB}> Opções </Text>
        <HrComponent/>

        <View  style={styles.dadosEopcoes}>
          <TouchableOpacity style={styles.botaoDeslog} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textoBt}>Deslogar</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}

export default telaPerfil

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040D12',
    padding: 8,
  },
  textoA:{
    alignSelf: 'center',
    color:"white",
    fontWeight:"bold",
    fontSize: 20,
    marginTop:100,
    marginBottom:20,
  },
  textoB:{
    color:"white",
    fontWeight:"bold",
    fontSize: 20,
    marginTop:30,
    marginLeft:10,
  },
  textoC:{
    color:"white",
  },
  textoBt:{
    fontWeight: 'Bold',
    alignSelf: 'center'
  },
  dadosEopcoes:{
     backgroundColor:'#000',
    padding:40,
    marginVertical:30,
    borderRadius:20
  },
  botaoDeslog:{
    alignSelf: 'center',
    backgroundColor: '#FFB45B',
    padding:10,
    borderRadius:10,
    width: 100
  },
});
