import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, Title } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';

export default function AccountCreation() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Student");
    const [code, setCode] = useState("");

    function generateUniqueCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCode(result);
    }

    useEffect(() => {
        generateUniqueCode()
      }, []);
    

    async function InitialiseMatiere(data: number, matiere: number) {
        generateUniqueCode()
        try {
            generateUniqueCode()
            await axios.post(`http://10.0.2.2:5094/Matiere/Create`, {
                userId: data,
                matiereId: matiere,
                level: 0,
            });
        } catch (error) {
            console.log(error);
            alert("Pas de matière");
        }
    }

    async function createAccount() {

        if (firstname === "" || lastname === "" || mail === "" || password === "") {
            console.log("Please fill all the fields");
            return;
        }
        const roleId = role === "Student" ? 1 : role === "Teacher" ? 2 : 3;
        try {
            const response = await axios.post(`http://10.0.2.2:5094/User/Create`, {
                email: mail,
                password: password,
                code: code,
                firstName: firstname,
                lastName: lastname,
                roleId: roleId,
            });

            await AsyncStorage.setItem("user", JSON.stringify(response.data));
            console.log(response.data["id"]);

            InitialiseMatiere(response.data["id"], 1);
            InitialiseMatiere(response.data["id"], 2);
            InitialiseMatiere(response.data["id"], 3);
            InitialiseMatiere(response.data["id"], 4);

            if (roleId === 1) {
                router.push('/Student/avatar');
            } else if(roleId === 2) {
                router.push('/Teacher/CreateClasse');
            }
            else{
                router.push('/Parent/homeParent'); 
            }
        } catch (error) {
            console.log(error);
            alert("Les champs ne sont pas corrects");
        }
    }

    return (
        <View style={styles.generalcontainer}>
            <View style={styles.container}>
                <Title>S'inscrire</Title>
                <TextInput mode="outlined" style={styles.input} label="Prénom" onChangeText={text => setFirstname(text)} value={firstname}></TextInput>
                <TextInput mode="outlined" style={styles.input} label="Nom" onChangeText={text => setLastname(text)} value={lastname}></TextInput>
                <TextInput mode="outlined" style={styles.input} label="Email" onChangeText={text => setMail(text)} value={mail}></TextInput>
                <TextInput mode="outlined" style={styles.input} secureTextEntry={true} label="Mot de passe" onChangeText={text => setPassword(text)} value={password}></TextInput>
                
                <Picker
                    selectedValue={role}
                    style={styles.picker}
                    onValueChange={(itemValue) => setRole(itemValue)}
                >
                    <Picker.Item label="Student" value="Student" />
                    <Picker.Item label="Teacher" value="Teacher" />
                    <Picker.Item label="Parent" value="Parent" />
                </Picker>

                <Button mode="contained" onPress={() => createAccount()}>S'inscrire</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 20,
    },
    input: {
        width: "80%",
    },
    picker: {
        width: "80%",
        height: 50,
    },
    generalcontainer: {
        flex: 1,
        padding: 20,
        flexDirection: "column",
    },
});
