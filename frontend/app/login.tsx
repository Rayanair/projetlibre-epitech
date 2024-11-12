import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { router } from "expo-router"
import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Appbar, Button, TextInput, Title } from "react-native-paper"

export default function Login() {
    const [mail,setMail] = useState("")
    const [password,setPassword] = useState("")

     async function loginToApp() {
        try {

            const data = await axios.post("http://10.0.2.2:5094/User/Login",{
                email : mail,
                password : password
            })
            await AsyncStorage.setItem("user", JSON.stringify(data.data))
            router.push('/Student/homeStudent')
        } catch (error) {
            alert("email ou mot de passe incorrect")
        }
            
    }
    return(
        <View style={styles.generalcontainer}>
            <View style={styles.container}>
                <Title>Se connecter</Title>
                <TextInput mode="outlined" style={styles.input} label="Email" onChangeText={text => setMail(text)} value={mail} ></TextInput> 
                <TextInput secureTextEntry={true} mode="outlined" style={styles.input}  label="Mot de passe" onChangeText={text => setPassword(text)} value={password} ></TextInput> 
                <Button mode="contained" onPress={() => loginToApp()}>Se connecter</Button>  
                <TouchableOpacity onPress={() => router.push('/accountcreation')}>
                    <Text style={{color: 'blue'}}>
                        Pas de compte ? Créez en un !
                    </Text>
                </TouchableOpacity>
            
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      gap : 20
    },
    input : {
        width : "80%",
    },
    generalcontainer : {
        flex : 1,
        padding : 20,
        flexDirection : "column",
    },
  });