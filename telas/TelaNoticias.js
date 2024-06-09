import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  Modal,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import Componentes, { BotaoPesquisar, BotaoFechar } from '../components/BotaoPesquisar';

const TelaListaNoticias = () => {
  const [jsonData, setJsonData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tituloNoticia, setTituloNotica] = useState('');
  const [descricao, setDescricao] = useState('');
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');
  const [activity, setActivity] = useState(false); // Adicionado o estado activity

  const API_KEY = 'c32b4cd62a9943c3bd0ddb2662c3171c';
  const URL = `https://newsapi.org/v2/everything?q=criptomoedas&from=2024-06-01&sortBy=popularity&language=pt&apiKey=${API_KEY}`;

  const Apignews = async (url) => {
    try {
      setActivity(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }
      const data = await response.json();
      setJsonData(data.articles);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    } finally {
      setActivity(false);
    }
  };

  const BuscarNoticias = () => {
    Apignews(URL);
  };

  useEffect(() => {
    BuscarNoticias();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  const Noticia = ({ item, eventoNoticia }) => (
    <View style={Estilos.item}>
      <Pressable onPress={eventoNoticia}>
        <Text style={Estilos.textoNomeNoticia}>{item.title}</Text>
        <Image source={require('../assets/88162.png')} style={Estilos.imagemNoticia} />
        <Text style={Estilos.texto}>{item.url}</Text>
        <Text style={Estilos.texto}>{item.publishedAt}</Text>
      </Pressable>
    </View>
  );

  const renderItem = ({ item }) => (
    <Noticia
      item={item}
      eventoNoticia={() => {
        setTituloNotica(item.title);
        setDescricao(item.description);
        setUrl(item.url);
        setData(item.publishedAt);
        setModalVisible(true);
      }}
    />
  );

  return (
    <SafeAreaView style={Estilos.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <View style={Estilos.centeredView}>
          <View style={Estilos.modalView}>
            <Image source={require('../assets/Logo_1.png')} style={Estilos.imagemLogoModal} />
            <Text style={Estilos.modalTextTitle}>{tituloNoticia}</Text>
            <Text style={Estilos.modalText}>{descricao}</Text>
            <Text style={Estilos.modalDadaUrl}>{url}</Text>
            <Text style={Estilos.modalDadaUrl}>{data}</Text>
            <View>
              <BotaoFechar funcao={() => setModalVisible(!modalVisible)} text={"Fechar"} />
            </View>
          </View>
        </View>
      </Modal>
      <View style={Estilos.containerr}>
        <Image source={require('../assets/Logo_1.png')} style={Estilos.imagemLogo} />
        <Text style={Estilos.textoTitulo}>CoinExpress</Text>
        <Text style={Estilos.textoTitulo2}>Noticias</Text>
      </View>
      {activity ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          style={{ marginTop: 10 }}
          data={jsonData}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
        />
      )}
    </SafeAreaView>
  );
}

const Estilos = StyleSheet.create({
  container: {
    width: '120%',
    height: '40%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#040D12',
    marginTop: '6%',
    paddingRight: '17%'
  },
  containerr: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
  },
  textoTitulo: {
    color: 'white',
    textAlign: 'center',
    paddingTop: '2%',
    paddingBottom: '20%',
    fontSize: 30,
  },
  textoTitulo2: {
    color: 'white',
    textAlign: 'center',
    paddingTop: '2%',
    paddingBottom: '5%',
    fontSize: 20,
  },
  textoNomeNoticia: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    margin:10,
    fontSize: 15,
  },
  item: {
    width: 350,
    height: 280,
    backgroundColor: 'white',
    borderRadius: 30,
    marginVertical: 8,
  },
  imagemNoticia: {
    width: 150,
    height: 150,
    margin: '2%',
    alignSelf: 'center',
    borderWidth:10,
    borderRadius:20,
    borderColor:'black',
  },
  imagemLogo: {
    width: 50,
    height: 50,
    marginTop: '10%',
    alignSelf: 'center',
  },
  imagemLogoModal: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "#040D12",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTextTitle: {
    width: 200,
    height: 50,
    fontSize:15,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: "center",
    color: 'white'
  },
  modalText: {
    width: 300,
    height: 100,
    marginTop:50,
    marginBottom: 10,
    textAlign: "center",
    color: 'white',
    fontSize:15,
    fontWeight: 'bold',
  },
  modalDadaUrl: {
    width: 300,
    height: 20,
    marginTop:20,
    marginBottom: 15,
    textAlign: "center",
    color: 'white',
    fontSize:10,
    fontWeight: 'bold',
  },
});

export default TelaListaNoticias;