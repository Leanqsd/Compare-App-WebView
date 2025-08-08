import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function App() {
    //para inyectar Javascript
    const webviewRef = useRef<WebView>(null);
    //observa y almacena las views 
    const [canGoBackWeb, setCanGoBackWeb] = useState(false);
    //maneja la navegación entre pantallas dentro de la app
    const router = useRouter();


  //funcionalidad de gesto/boton de retroceder entre las views
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
        const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
        );
        return () => subscription.remove();
    }, [canGoBackWeb, router]);


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style='dark' />
      <WebView
      ref={webviewRef}
        source={{ uri: 'https://5543b159b91f.ngrok-free.app' }} //dominio provisional usando ngrok para alojar la web
        onNavigationStateChange={(navState) => setCanGoBackWeb(navState.canGoBack)}
        style={{ flex: 1 }}
        javaScriptEnabled={true}

      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
});