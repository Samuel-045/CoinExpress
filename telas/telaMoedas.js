import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  Pressable,
  Image,
  StyleSheet,
  BackHandler,
  Modal,
} from "react-native";
import Componentes, { BotaoPesquisar, BotaoFechar } from '../components/BotaoPesquisar';

const TelaListaMoedas = () => {
  const [jsonData, setJsonData] = useState([]);
  const [activity, setActivity] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeCoin, setNomeCoin] = useState('');
  const [imagemCoin, setImageCoin] = useState('');
  const [maximoCoin, setMaximoCoin] = useState('');
  const [minimoCoin, setMinimoCoin] = useState('');
  const [picoCoin, setPicoCoin] = useState('');
  const [text, setText] = useState('');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-7jqtuMxNHVoXdsJ4jiNHsqXR'
    }
  };

  const URL = "https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd";

  const fetchCurrencies = async () => {
    setActivity(true);
    try {
      const response = await fetch(URL, options);
      const data = await response.json();
      setJsonData(data);
      setFilteredCurrencies(data);
      setActivity(false);
    } catch (error) {
      console.error(error);
      setActivity(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    setFilteredCurrencies(
      jsonData.filter(currency =>
        currency.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, jsonData]);

  const Moeda = ({ item, eventoMoeda }) => (
    <View style={Estilos.item}>
      <Pressable onPress={eventoMoeda}>
        <Text style={Estilos.textoNomeCoin}>{item.market_cap_rank}-{item.name}</Text>
        <Image source={{ uri: item.image }} style={Estilos.imagemMoeda} />
        <Text style={Estilos.texto}>${item.current_price}</Text>
      </Pressable>
    </View>
  );

  const renderItem = ({ item }) => (
    <Moeda
      item={item}
      eventoMoeda={() => {
        setNomeCoin(item.name);
        setMaximoCoin(item.high_24h);
        setMinimoCoin(item.low_24h);
        setImageCoin(item.image);
        setPicoCoin(item.ath);
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
            <Text style={Estilos.modalTextTitle}>{nomeCoin}</Text>
            <Image source={{ uri: imagemCoin }} style={Estilos.imagemLogoModalMoeda} />
            <Text style={Estilos.modalText}>Preço Máximo 24H: ${maximoCoin}</Text>
            <Text style={Estilos.modalText}>Preço Mínimo 24H: ${minimoCoin}</Text>
            <Text style={Estilos.modalText}>Pico Máximo: ${picoCoin}</Text>
            <View >
              <BotaoFechar funcao={() => setModalVisible(!modalVisible)} text={"Fechar"} />
            </View>
          </View>
        </View>
      </Modal>
      <View style={Estilos.containerr}>
        <Image source={require('../assets/Logo_1.png')} style={Estilos.imagemLogo} />
        <Text style={Estilos.textoTitulo}>CoinExpress</Text>
        <TextInput
          style={Estilos.searchInput}
          placeholder="Pesquisar moeda"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setText('')}
        />
      </View>
      {activity ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          style={Estilos.containerr}
          data={filteredCurrencies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}

const Estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040D12',
  },
  containerr: {
    alignItems: 'center',
  },
  texto: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  textoTitulo: {
    color: 'white',
    textAlign: 'center',
    paddingTop: '2%',
    paddingBottom: '20%',
    fontSize: 30,
  },
  textoNomeCoin: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
  },
  item: {
    width: 350,
    height: 170,
    backgroundColor: 'white',
    borderRadius: 70,
    marginVertical: 8,
  },
  imagemMoeda: {
    width: 80,
    height: 80,
    margin: '2%',
    alignSelf: 'center',
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
  imagemLogoModalMoeda: {
    width: 60,
    height: 60,
    flexDirection: 'center',
    marginBottom: 15,
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#040D12",
    borderRadius: 15,
    padding: 35,
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
    width: 100,
    height: 20,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: "center",
    color: 'white'
  },
  modalText: {
    width: 200,
    height: 20,
    marginBottom: 15,
    textAlign: "center",
    color: 'white',
    fontWeight: 'bold',
  },
  searchInput: {
     height: 40,
    width:250,
    textAlign:'center',
    color:'black',
    borderColor:'white',
    borderWidth: 2,
    backgroundColor:'white',
    borderRadius:14
  },
});

export default TelaListaMoedas;
