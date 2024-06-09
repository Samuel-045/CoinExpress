import React,{useState , useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, SafeAreaView, StyleSheet, TextInput, View, Button, Modal } from 'react-native';
import Componentes, {BotaoCad,BotaoLog,BotaoFechar} from '../components/BotaoPesquisar';


function telaLoginn({navigation}){
  let [textE, setChangeTextE] = useState('');
  let [textS, setChangeTextS] = useState('');
  
  let [emailBanco, setChangeEmail] = useState('');
  let [senhaBanco, setChangesenha] = useState('');

  let [visibleModal, setModalVisible] = useState(false);
  let [textModal, setTextModal] = useState('');

  let booEmail
  textE == '' ? booEmail = false : booEmail = true

  let booSenha
  textS == '' ? booSenha = false : booSenha = true

  async function read(){
    let usuario

    try{
      const json = await AsyncStorage.getItem('DadosUsuario')
      if(json != null){
        usuario = JSON.parse(json)
        setChangeEmail(usuario.Email)
        setChangesenha(usuario.Senha)
        
        console.log(Email)
        console.log(Senha)
      }
    }catch(error){
      console.error('Erro ao buscar dados no AsyncStorage', error.message);
    }
  }

  useEffect(() => {
    read()
  }, [textS])

  function verifica(){
    if(booEmail && booSenha){
  
      if(emailBanco === textE && senhaBanco === textS){        
        navigation.navigate("TabViews")
      }else{
        setTextModal("Senha ou usuário incorreto(s)!!!")
        setModalVisible(true)
      }
    }else{
      setTextModal("Os campos não foram preenchidos corretamente!!!")
      setModalVisible(true)
    }
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.textoA}>BEM VINDO DE VOLTA!</Text>
        <TextInput
          style={styles.input}
          onChangeText={setChangeTextE}
          placeholder="Digite seu email"
          value={textE}
        />
        <TextInput
          style={styles.input}
          onChangeText={setChangeTextS}
          placeholder="Digite sua senha"
          value={textS}
        />
      </View>

      <Modal animationType="slide" transparent={true} visible={visibleModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.stModalText}>{textModal}</Text>
            <View style={styles.button}>
            <BotaoFechar funcao={() => setModalVisible(!setModalVisible)}text={"Fechar"}/>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.botoes}>
      <BotaoCad funcao={verifica}text={"Fazer Login"}/>
      <BotaoLog funcao={() => navigation.navigate('Cadastro')}text={"Realizar cadastro"}/>
      </View>
    </SafeAreaView>
  )
}

export default telaLoginn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#040D12',
    marginTop:'6%',
    padding: 8,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textoA:{
    color:"white",
    fontSize: 25,
    marginTop:30,
    marginBottom:80,
  },
 botoes:{
   marginBottom:'30%',
 },
  button:{
  alignItems: 'center',
 },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:10,
    width:280,
    marginBottom:20,
    backgroundColor:'white'
  },
    centeredView:{
    width: '80%',
    marginTop: 300,
    marginLeft: "10%",
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  stModalText:{
    marginBottom:20
  },
});
