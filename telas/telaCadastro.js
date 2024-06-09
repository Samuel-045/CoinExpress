import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, SafeAreaView, StyleSheet, TextInput, View, Button, Modal} from 'react-native';
import Componentes, {BotaoCad,BotaoLog,BotaoFechar} from '../components/BotaoPesquisar';
function telaCadastro({ navigation }) {
  let [textN, onChangeTextN] = useState('');
  let [textE, onChangeTextE] = useState('');
  let [textS, onChangeTextS] = useState('');
  let [textCS, onChangeTextCS] = useState('');
  let [visibleModal, setModalVisible] = useState(false);
  let [textModal, setTextModal] = useState('');

  let booNome;
  const rxNome = /^([A-Za-z{ÃãàÀÁáÇçèÈÉéÍíÚúÙùÜüÓóÒòôÔ}]{1,})[\s]?([A-Za-z{ÃãàÀÁáÇçèÈÉéÍíÚúÙùÜüÓóÒòôÔ}]{1,}?)[\s]?$/
  rxNome.test(textN) ? (booNome = true) : (booNome = false); //Opr ternário

  let booEmail;
  const rxEmail = /^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/
  rxEmail.test(textE) ? (booEmail = true) : (booEmail = false);

  let booSenha;
  const rxSenha = /\w{8,}/
  if((textS != '' && textCS !='') && (textS == textCS)){
    if(rxSenha.test(textS)){
      booSenha = true
    }else{
      booSenha = false
    }
  }else{
    booSenha = false
  }

async function verifica() {
    if (booNome && booSenha && booEmail) {
      
      if (textS === textCS) {
        let usuario = {
          Nome : textN,
          Email : textE,
          Senha: textS,
        };

        try{
          await AsyncStorage.setItem('DadosUsuario', JSON.stringify(usuario), () => {
            console.warn('Dados salvos no AsyncStorage com sucesso!');
          });
          navigation.navigate('TabViews')
        }catch (error) {
          console.error('Erro ao salvar dados no AsyncStorage', error.message);
        }

      } else {
        setTextModal('Senhas estão diferentes!!!');
        setModalVisible(true);
      }

    } else {
      
      if(textN == "" || textE == "" || textS == ""){
        setTextModal("Há campos vazios!");

      }else{
        if(!booEmail){
          setTextModal("Email inválido!\nO email não pode conter letras maiúsculas");
        }else if(!booSenha){
          setTextModal("Senha inválida!\nA senha deve ter no mínimo 8 caracteres, contendo letras (minúsculas ou maiúsculas) ou números");
        }else if(!booNome){
          setTextModal("Nome inválido");
        }
        
      }
      setModalVisible(true);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.textoA}>BEM VINDO!</Text>
      </View>

      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTextN}
          placeholder="Digite seu primeiro nome"
          value={textN}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeTextE}
          placeholder="Digite seu email"
          value={textE}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeTextS}
          placeholder="Digite sua senha"
          value={textS}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeTextCS}
          placeholder="Confirme sua senha"
          value={textCS}
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

      <View>
       <BotaoCad funcao={verifica}text={"Realizar cadastro"}/>
       <BotaoLog funcao={() => navigation.navigate('Login')}text={"Fazer login"}/>
      </View>
    </SafeAreaView>
  );
}

export default telaCadastro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#040D12',
     marginTop:'6%',
    padding: 8,
  },
  textoA: {
    color: 'white',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  button:{
  alignItems: 'center',
 },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 280,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  centeredView: {
    width: '80%',
    marginTop: 300,
    marginLeft: '10%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  stModalText: {
    marginBottom: 20,
  },
});
