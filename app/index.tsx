import NetInfo from '@react-native-community/netinfo';
import * as Linking from 'expo-linking';
import { SplashScreen, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import InternetError from './components/internet-error';
import { BASE_URL, HOST_NAME, MOBILE_TYPE } from './constants';

//keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  //Javascript Inject
  const webviewRef = useRef<WebView>(null);
  //observa y almacena las views 
  const [canGoBackWeb, setCanGoBackWeb] = useState(false);
  //maneja la navegación entre pantallas dentro de la app
  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);
  //edge to edge
  const insets = useSafeAreaInsets();
  const [hasInternet, setHasInternet] = useState(true);

  const linkedUrl = Linking.useLinkingURL();
  const [uri, setUri] = useState<string>(`${BASE_URL}?movilType=${MOBILE_TYPE}`);

  //Gets the initial URL and uses it the first time the app is opened.
  useEffect(() => {
    const getInitialLink = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        console.log(`Initial URL: ${initialUrl}`);

        if (initialUrl && initialUrl.includes(HOST_NAME)) {
          setUri(initialUrl);
        } else {
          setUri(`${BASE_URL}?movilType=${MOBILE_TYPE}`);
        }
      } catch (error){
        console.error("error al obtener la URL inicial", error);
        setUri(`${BASE_URL}?movilType=${MOBILE_TYPE}`);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    getInitialLink(); 
  }, []);

  //
  useEffect (() =>{
    if (linkedUrl) {
      console.log(`Deep link recibido: ${linkedUrl}`);
      const { hostname } = Linking.parse(linkedUrl);

      if (hostname === HOST_NAME) {
        setUri(linkedUrl);
      }
    }
  }, [linkedUrl]);
 

  //Allows to go back in webview
  useEffect(() => {
    const backAction = () => {
      if (canGoBackWeb && webviewRef.current) {
        webviewRef.current.goBack();
        return true; // Consumimos el evento → no se cierra la app
      }
      if (router.canGoBack()) {
        router.back();
        return true;
      }
      return true; // Bloquea el cierre automático
    };
    const goBackAction = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => goBackAction.remove();
  }, [canGoBackWeb, router]);

  useEffect (() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setHasInternet((state.isConnected ?? false) && (state.isInternetReachable ?? false));
    });
    return () => unsubscribe()
  }, []);


  return (
    hasInternet ? (
    <SafeAreaProvider style={{ backgroundColor: '#ffffff', paddingTop: insets.top }} >
      <StatusBar style='dark' />
      <WebView
        ref={webviewRef}
        source={{ uri: 'https://225597c0021a.ngrok-free.app' }} //dominio provisional usando ngrok para alojar la web
        onNavigationStateChange={(navState) => setCanGoBackWeb(navState.canGoBack)}
        style={{ flex: 1 }}
        javaScriptEnabled={true}

      />
    </SafeAreaProvider> )
    : (
    <InternetError></InternetError>
  ));
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
});