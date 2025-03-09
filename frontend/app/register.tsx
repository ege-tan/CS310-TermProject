import { Text, View, StyleSheet, TextInput, Alert, Pressable } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }),
        };

        fetch("http://localhost:8080/register", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                Alert.alert("Success", result);
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Error", "Registration failed");
            });
    }

    return (
        <View style={myStyle.container}>
            <Text>First Name</Text>
            <TextInput 
                style={myStyle.textBoxes} 
                onChangeText={(text) => setFirstName(text)}
            />

            <Text>Last Name</Text>
            <TextInput 
                style={myStyle.textBoxes} 
                onChangeText={(text) => setLastName(text)}
            />

            <Text>Email</Text>
            <TextInput 
                style={myStyle.textBoxes} 
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
            />

            <Text>Password</Text>
            <TextInput 
                style={myStyle.textBoxes} 
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />

            <Pressable style={myStyle.buttons} onPress={submit}>
                <Text>Register</Text>
            </Pressable>

            <Link href="/" style={myStyle.links}>
                Back to Login
            </Link>
        </View>
    );
}

const myStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgreen",
    },
    textBoxes: {
        height: 40,
        width: 200,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    buttons: {
        marginTop: 10,
        backgroundColor: 'lightblue',
        color: 'black',
        height: 40,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    links: {
        color: 'blue',
        backgroundColor: 'lightblue',
        marginTop: 10,
    }
});
