import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Chat() {
    const [messages, setMessages] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const { friendEmail } = useLocalSearchParams();

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, []);

    function fetchMessages() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.token
            },
        };

        fetch(`http://localhost:8080/messages?with=${friendEmail}`, requestOptions)
            .then((response) => response.text())
            .then((result) => setMessages(result))
            .catch((error) => console.error(error));
    }

    function sendMessage() {
        if (!newMessage.trim()) return;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.token
            },
        };

        fetch(`http://localhost:8080/messages/send?to=${friendEmail}&message=${newMessage}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                setNewMessage("");
                fetchMessages();
            })
            .catch((error) => console.error(error));
    }

    return (
        <View style={myStyle.container}>
            <View style={myStyle.messagesContainer}>
                {messages.split('\n').map((msg, index) => {
                    if (!msg) return null;
                    return (
                        <Text key={index} style={myStyle.messageText}>
                            {msg}
                        </Text>
                    );
                })}
            </View>

            <View style={myStyle.inputContainer}>
                <TextInput
                    style={myStyle.textBoxes}
                    value={newMessage}
                    onChangeText={(text) => setNewMessage(text)}
                    placeholder="Type a message..."
                    multiline
                />
                <Pressable style={myStyle.buttons} onPress={sendMessage}>
                    <Text>Send</Text>
                </Pressable>
            </View>
        </View>
    );
}

const myStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightblue",
        padding: 10,
    },
    messagesContainer: {
        flex: 1,
        marginBottom: 10,
    },
    messageText: {
        backgroundColor: "white",
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    textBoxes: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    buttons: {
        backgroundColor: 'lightblue',
        height: 40,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
});
