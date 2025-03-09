import { Text, View, StyleSheet, TextInput, Alert, Pressable } from "react-native";
import { useState  } from "react";
import { Link , router } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submit() {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            }
        };
    

        fetch(`http://localhost:8080/login?email=${email}&password=${password}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Invalid credentials');
                }
                return response.text();
            })
            .then((token) => {
                if (token && token.length > 0) {
                    global.token = token;
                    Alert.alert("Success", "Login successful!", [
                        {
                            text: "OK",
                            onPress: () => {
                                router.navigate("/NavigationMenu");
                            }
                        }
                    ]);
                } else {
                    Alert.alert("Error", "Invalid credentials");
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Error", "Login failed");
            });
    }

    return (
        <View style={myStyle.container}>
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
                <Text>Login</Text>
            </Pressable>

            <Link href="/register" style={myStyle.links}>
                Register New Account
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
