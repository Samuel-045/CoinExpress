import { Text, SafeAreaView, StyleSheet, Image, View, Button } from 'react-native';

import Componentes, {BotaoIniciar} from '../components/BotaoPesquisar';

function telaIniciall({navigation}){
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.imagem} source={require('../assets/Logo_1.png')} />
        <Text style={styles.texto}>CoinExpress</Text>
        <View style={styles.botaoContainer}>
         <BotaoIniciar funcao={() => navigation.navigate('Login')}text={"Começar"}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default telaIniciall

const styles = StyleSheet.create({
  container: {
    flex: 1,
     marginTop:'6%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#040D12',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imagem: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  texto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: 'center',
    width:300,
    marginBottom: 20,
  },
  botaoContainer: {
    marginTop: 280,
  },
});