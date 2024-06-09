// Importando os módulos necessários do React Native e de terceiros
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, ActivityIndicator, ScrollView,Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

// Definindo o componente principal do conversor de moeda
const ConversorMoeda = () => {
  // Definindo os estados para as variáveis do componente
  const [moedas, setMoedas] = useState([]); // Lista de moedas disponíveis
  const [moedasFiltradas, setMoedasFiltradas] = useState([]); // Lista de moedas filtradas pela pesquisa
  const [moedaDe, setMoedaDe] = useState(null); // Moeda de origem selecionada
  const [moedaPara, setMoedaPara] = useState(null); // Moeda de destino selecionada
  const [quantidade, setQuantidade] = useState(''); // Quantidade a ser convertida
  const [quantidadeConvertida, setQuantidadeConvertida] = useState(''); // Quantidade convertida
  const [modalMoedaDeVisivel, setModalMoedaDeVisivel] = useState(false); // Visibilidade do modal da moeda de origem
  const [modalMoedaParaVisivel, setModalMoedaParaVisivel] = useState(false); // Visibilidade do modal da moeda de destino
  const [carregando, setCarregando] = useState(true); // Estado de carregamento da aplicação
  const [consultaPesquisa, setConsultaPesquisa] = useState(''); // Consulta de pesquisa para filtrar moedas

  // Efeito para carregar as moedas ao montar o componente
  useEffect(() => {
    buscarMoedas();
  }, []);

  // Efeito para converter a moeda quando a moeda de origem, a moeda de destino ou a quantidade são alteradas
  useEffect(() => {
    if (quantidade !== '' && moedaDe && moedaPara) {
      converterMoeda();
    }
  }, [moedaDe, moedaPara, quantidade]);

  // Efeito para filtrar as moedas com base na consulta de pesquisa
  useEffect(() => {
    setMoedasFiltradas(
      moedas.filter(moeda =>
        moeda.nome.toLowerCase().includes(consultaPesquisa.toLowerCase())
      )
    );
  }, [consultaPesquisa, moedas]);

  // Função para buscar as moedas da API ao montar o componente
  const buscarMoedas = async () => {
    try {
      const resposta = await axios.get('https://api.coinpaprika.com/v1/coins');
      const moedasFiltradas = resposta.data
        .filter(moeda => moeda.rank > 0) // Excluir moedas sem classificação
        .map(moeda => ({ id: moeda.id, nome: moeda.symbol }));
      setMoedas(moedasFiltradas);
      setMoedasFiltradas(moedasFiltradas);
      setMoedaDe(moedasFiltradas[0]); // Selecionar a primeira moeda como moeda de origem
      setMoedaPara(moedasFiltradas[1]); // Selecionar a segunda moeda como moeda de destino
      setCarregando(false); // Indicar que o carregamento foi concluído
    } catch (erro) {
      console.error(erro);
    }
  };

  // Função para converter a moeda usando a API
  const converterMoeda = async () => {
    try {
      const resposta = await axios.get(`https://api.coinpaprika.com/v1/price-converter?base_currency_id=${moedaDe.id}&quote_currency_id=${moedaPara.id}&amount=${quantidade}`);
      setQuantidadeConvertida(resposta.data.price.toFixed(2));
    } catch (erro) {
      console.error(erro);
    }
  };

  // Função para alternar a visibilidade do modal da moeda de origem
  const alternarModalMoedaDe = () => {
    setModalMoedaDeVisivel(!modalMoedaDeVisivel);
  };

  // Função para alternar a visibilidade do modal da moeda de destino
  const alternarModalMoedaPara = () => {
    setModalMoedaParaVisivel(!modalMoedaParaVisivel);
  };

  // Função para trocar a moeda de origem e destino
  const trocarMoedas = () => {
    const temp = moedaDe;
    setMoedaDe(moedaPara);
    setMoedaPara(temp);
  };

  // Função para renderizar um item de moeda na lista
  const renderizarItemMoeda = ({ item, alternarModal, setMoeda }) => (
    <TouchableOpacity onPress={() => { setMoeda(item); alternarModal(); }}>
      <Text style={styles.modalItem}>{item.nome}</Text>
    </TouchableOpacity>
  );

  // Retorna um indicador de carregamento se a aplicação estiver carregando
  if (carregando) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Renderiza o conteúdo do componente, incluindo modais e elementos de interface
  return (
    <View style={styles.container}>
    <View style={styles.containerr}>
     <Image source={require('../assets/Logo_1.png')} style={styles.imagemLogo} />
    <Text style={styles.textoTitulo}>CoinExpress</Text>  
    </View >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Conversor</Text>
        <View style={styles.currencyContainer}>
          <Text style={{ color: 'black' }}>De</Text>
          <TouchableOpacity style={styles.currencySelector} onPress={alternarModalMoedaDe}>
            <Text style={{ color: 'black', borderColor: 'black',
    borderBottomWidth: 2,
    padding:4,
    borderRadius: 8, }}>{moedaDe?.nome}    ⇲</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />
        </View>
        <Ionicons style={styles.swapIcon} name="swap-vertical" size={24} color='white' onPress={trocarMoedas} />
        <View style={styles.currencyContainer}>
          <Text style={{ color: 'black'}}>Para</Text>
          <TouchableOpacity style={styles.currencySelector} onPress={alternarModalMoedaPara}>
            <Text style={{ color: 'black', borderColor: 'black',borderBottomWidth: 2,
    padding:4,
    borderRadius: 8, }}>{moedaPara?.nome}    ⇲</Text>
          </TouchableOpacity>
          <Text style={styles.convertedAmount}>{quantidadeConvertida}</Text>
        </View>
      </ScrollView>

      {/* Modal para selecionar a moeda de origem */}
      <Modal visible={modalMoedaDeVisivel} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="close" size={24} color="white" style={styles.closeIcon} onPress={alternarModalMoedaDe} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar moeda"
              placeholderTextColor="#ccc"
              value={consultaPesquisa}
              onChangeText={setConsultaPesquisa}
            />
            <FlatList
              data={moedasFiltradas}
              renderItem={({ item }) => renderizarItemMoeda({ item, alternarModal: alternarModalMoedaDe, setMoeda: setMoedaDe })}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </Modal>

      {/* Modal para selecionar a moeda de destino */}
      <Modal visible={modalMoedaParaVisivel} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="close" size={24} color="white" style={styles.closeIcon} onPress={alternarModalMoedaPara} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar moeda"
              placeholderTextColor="#ccc"
              value={consultaPesquisa}
              onChangeText={setConsultaPesquisa}
            />
            <FlatList
              data={moedasFiltradas}
              renderItem={({ item }) => renderizarItemMoeda({ item, alternarModal: alternarModalMoedaPara, setMoeda: setMoedaPara })}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040D12',
     marginTop:'6%',
  },
  containerr: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom:'30%',
  },
  textoTitulo: {
    color: 'white',
    textAlign:'center',
    paddingTop:'2%',
    paddingBottom:'15%',
    fontSize:30,
  },
  title: {
    fontSize: 25,
    width:200,
    marginTop:7,
    paddingBottom:20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  imagemLogo: {
    width: 50,
    height: 50,
     marginTop: '10%',
    alignSelf: 'center',
  },
  currencyContainer: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
   backgroundColor: 'white',
    borderRadius: 8,
  },
  currencySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
    backgroundColor: 'white',
  },
  convertedAmount: {
    fontSize: 24,
    color: 'black',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '60%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'white',
    backgroundColor: 'black',
    marginVertical: 10,
    width: '100%',
  },
  modalItem: {
    padding: 16,
    fontSize: 18,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%',
    textAlign: 'center',
  },
  swapIcon: {
    marginVertical: 16,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
});

export default ConversorMoeda;
