import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, Alert, TextInput } from "react-native";
import { Link } from "expo-router";

export default function Friends() {
    const [friends, setFriends] = useState([]);
    const [newFriendEmail, setNewFriendEmail] = useState("");
    const [pendingRequests, setPendingRequests] = useState([]);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + global.token
        },
    };

    useEffect(() => {
        fetchFriends();
        fetchPendingRequests();
    }, []);

    function fetchFriends() {
        fetch("http://localhost:8080/friends", requestOptions)
            .then((response) => response.json())
            .then((json) => setFriends(json))
            .catch((error) => console.error(error));
    }

    function fetchPendingRequests() {
        fetch("http://localhost:8080/friends/pending", requestOptions)
            .then((response) => response.json())
            .then((json) => setPendingRequests(json))
            .catch((error) => console.error(error));
    }

    function sendFriendRequest() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.token
            },
        };

        fetch(`http://localhost:8080/friends/add?email=${newFriendEmail}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                Alert.alert(result);
                setNewFriendEmail("");
            })
            .catch((error) => console.error(error));
    }

    function acceptFriendRequest(email: string) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.token
            },
        };

        fetch(`http://localhost:8080/friends/accept?email=${email}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                Alert.alert(result);
                fetchFriends();
                fetchPendingRequests();
            })
            .catch((error) => console.error(error));
    }

    return (
        <View style={myStyle.container}>

            <View style={myStyle.section}>
                <Text style={myStyle.sectionTitle}>Add New Friend</Text>
                <TextInput
                    style={myStyle.textBoxes}
                    value={newFriendEmail}
                    onChangeText={(text) => setNewFriendEmail(text)}
                    placeholder="Friend's email"
                    autoCapitalize="none"
                />
                <Pressable style={myStyle.buttons} onPress={sendFriendRequest}>
                    <Text>Send Friend Request</Text>
                </Pressable>
            </View>

            <View style={myStyle.section}>
                <Text style={myStyle.sectionTitle}>Pending Friend Requests</Text>
                {pendingRequests && pendingRequests.length > 0 ? (
                    pendingRequests.map((email, index) => (
                        <View key={index} style={myStyle.requestItem}>
                            <Text style={myStyle.texts}>{email}</Text>
                            <Pressable 
                                style={myStyle.acceptButton}
                                onPress={() => acceptFriendRequest(email)}
                            >
                                <Text style={myStyle.acceptButtonText}>Accept</Text>
                            </Pressable>
                        </View>
                    ))
                ) : (
                    <Text style={myStyle.noRequestsText}>No pending requests</Text>
                )}
            </View>

            <View style={myStyle.section}>
                <Text style={myStyle.sectionTitle}>My Friends</Text>
                {friends.map((friend, index) => (
                    <View key={index} style={myStyle.friendItem}>
                        <Text style={myStyle.texts}>{friend}</Text>
                        <Link 
                            href={{
                                pathname: "/chat",
                                params: { friendEmail: friend }
                            }}
                            style={myStyle.links}
                        >
                            Chat
                        </Link>
                    </View>
                ))}
            </View>
        </View>
    );
}

const myStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "lightblue",
    },
    section: {
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textBoxes: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    requestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    friendItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    buttons: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 5,
        minWidth: 80,
        alignItems: 'center',
    },
    acceptButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    links: {
        color: 'blue',
        backgroundColor: 'lightblue',
        padding: 8,
        borderRadius: 5,
    },
    texts: {
        fontSize: 16,
    },
    noRequestsText: {
        fontStyle: 'italic',
        color: '#666',
        textAlign: 'center',
        padding: 10,
    }
});