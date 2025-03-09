import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function GroupChat() {
    const [messages, setMessages] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const { groupId } = useLocalSearchParams();

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

        fetch(`http://localhost:8080/groups/${groupId}/messages`, requestOptions)
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

        fetch(`http://localhost:8080/groups/${groupId}/send?message=${newMessage}`, requestOptions)
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
        padding: 10,
        backgroundColor: "lightblue",
    },
    messageText: {
        backgroundColor: "white",
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    messagesContainer: {
        flex: 1,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    addMemberContainer: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    membersList: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    memberText: {
        backgroundColor: "white",
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        fontSize: 16,
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
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
});