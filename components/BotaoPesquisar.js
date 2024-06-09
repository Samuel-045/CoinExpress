import React,{useState} from 'react';
import { View,Button, StyleSheet,Text,TouchableOpacity,Image,Pressable,TextInput, } from 'react-native';



function BotaoPesquisar({ funcao, funcaoL, funcaoS, text, textD }) {
  return (
    <View style={Estilos.botaoPesquisar}>
      <TouchableOpacity onPress={funcao} style={Estilos.pressionavel}>
        <Image source={require('../assets/Pesquisar.png')} style={Estilos.imagem} />
      </TouchableOpacity>

      <TouchableOpacity onPress={funcaoL}>
        <TextInput
          style={Estilos.textoInput}
          onPress={funcaoL}
          onChangeText={funcaoS}
          value={text}
          placeholder={textD}
          placeholderTextColor="#888"
        />
      </TouchableOpacity>
    </View>
  );
}
function BotaoFechar({ funcao, text}) {
  return (
    <View style={Estilos.botaoFechar}>
      <TouchableOpacity onPress={funcao} style={Estilos.pressionavelFechar}>
      <Text style={Estilos.textoFechar}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
function BotaoIniciar({ funcao, text}) {
  return (
    <View style={Estilos.botaoIniciar}>
      <TouchableOpacity onPress={funcao} style={Estilos.pressionavelIniciar}>
      <Text style={Estilos.textoIniciar}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

function BotaoCad({ funcao, text}) {
  return (
    <View style={Estilos.botaoCad}>
      <TouchableOpacity onPress={funcao} style={Estilos.pressionavelIniciar}>
      <Text style={Estilos.textoCad}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

function BotaoLog({ funcao, text}) {
  return (
    <View style={Estilos.botaoLog}>
      <TouchableOpacity onPress={funcao} style={Estilos.pressionavelIniciar}>
      <Text style={Estilos.textoLog}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

export {BotaoPesquisar,BotaoFechar,BotaoIniciar,BotaoCad,BotaoLog }

const Estilos =StyleSheet.create({

  botaoPesquisar:{
   backgroundColor:'white',
    width:300,
    height:40,
     flexDirection:'row',
   justifyContent:'center',
    borderRadius:30,
  },
  botaoFechar:{
  backgroundColor:'white',
  width:70,
  height:50,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:30, 
  elevation: 3, 
},
botaoIniciar:{
  backgroundColor:'#FFB45B',
  width:140,
  height:50,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:30, 
  elevation: 3, 
},
botaoCad:{
  backgroundColor:'#FFAB47',
  width:130,
  height:35,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:10, 
  elevation: 3, 
},
botaoLog:{
  width:130,
  height:35,
  justifyContent:'center',
  alignItems:'center',
  borderColor:'#FFAB47',
  borderBottomWidth:1,
  borderRadius:30, 
  elevation: 3, 
},

 textoCad: {
  color: 'black',
  textAlign: 'center',
  textAlignVertical:'center', 
  fontSize: 16,
},
textoLog: {
  color: 'white',
  textAlign: 'center',
  textAlignVertical: 'center', 
  fontSize: 13,
},
  textoFechar: {
  color: 'black',
  textAlign: 'center',
  textAlignVertical: 'center', 
  fontSize: 15,
},
textoIniciar: {
  color: 'black',
  textAlign: 'center',
  textAlignVertical: 'center',
  fontSize: 18,
},
   textoInput: {
    height: 40,
    width:250,
    textAlign:'center',
    color:'black',
    borderColor:'white',
    borderWidth: 2,
    backgroundColor:'white',
    borderRadius:14
  },
  imagem:{
     width:25,
    height:25,
  },
  pressionavel:{
    justifyContent:'center',
     textAlign:'center',
     borderRadius:30,
     
  },
  pressionavelFechar: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30,
  backgroundColor: 'white', 
},
pressionavelIniciar: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30, 
}
})
