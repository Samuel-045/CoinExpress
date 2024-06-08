import * as React from 'react';
import { Text, SafeAreaView, StyleSheet, Image, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

//Stack navigator
import TelaIniciall from './telas/telaInicial';
import TelaLoginn from './telas/telaLogin';
import TelaCadastro from './telas/telaCadastro';
//Tab navigator
import TelaMoedas from './telas/telaMoedas';
import TelaConversao from './telas/telaConversao'
import TelaPerfil from './telas/telaPerfil';
import TelaNoticias from './telas/TelaNoticias';

//Objetos usados para a criação de navegação
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabViews() {
  return (
    <Tab.Navigator
      initialRouteName='Moedas'
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#FFB45B', 
        tabBarInactiveTintColor: 'white', 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#020507',
          borderTopWidth: 0,
        },
        
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Moedas') {
            iconName = focused ? 'server' : 'server-outline';
          } else if (route.name === 'Conversao') {
            iconName = focused ? 'swap-vertical' : 'swap-vertical-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }else if (route.name === 'Noticias') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          }
          
          // Você pode retornar qualquer componente que quiser aqui!
          return <Icon name={iconName} size={size} color={color} />;
        },
        
      })}
    >
      <Tab.Screen name={'Moedas'} component={TelaMoedas} />
      <Tab.Screen name={'Conversao'} component={TelaConversao} />
          <Tab.Screen name={'Noticias'} component={TelaNoticias} />
      <Tab.Screen name={'Perfil'} component={TelaPerfil} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName=" ">
        <Stack.Screen name=" " options={{ headerStyle: { backgroundColor: '#040D12'}, headerShown: false,}} component={TelaIniciall} />
        <Stack.Screen name="Login" options={{ headerStyle: { backgroundColor: '#040D12'}, headerShown: false,}}component={TelaLoginn} />
        <Stack.Screen name="Cadastro" options={{ headerStyle: { backgroundColor: '#040D12'}, headerShown: false,}}component={TelaCadastro} />
        <Stack.Screen name="Noticias" options={{ headerStyle: { backgroundColor: '#040D12'}, headerShown: false,}}component={TelaNoticias} />
        <Stack.Screen name="TabViews" options={{ headerStyle: { backgroundColor: '#040D12'}, headerShown: false,}}component={TabViews} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
       
const styles = StyleSheet.create({
 
});


