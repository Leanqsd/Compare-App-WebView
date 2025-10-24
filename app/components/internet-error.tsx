import { Image, StyleSheet, Text, View } from "react-native";

const InternetError = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/nointernet.png')} style={styles.errorImage}/>
            <View style={styles.container}>
                <Text style={styles.errorText}>Sin conexion a internet. Vuelva a intentarlo nuevamente</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#414d61ff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorImage: {
    width: 150,
    height: 150,
    marginBottom: 40
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  reloadButton: {
    backgroundColor: '#d70b51',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 60,
  },
  reloadText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countdown: {
    color: 'white',
    padding: 20,
    borderRadius: 30,
    fontWeight: 700,
    backgroundColor: '#DA285C',
    marginTop: 10,
  },
  logo: {
    width: 200,
    height: 100,
    marginTop: 80
  },
});

export default InternetError