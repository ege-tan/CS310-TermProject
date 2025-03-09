// app/groups.tsx
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, Alert, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function Groups() {
    const [groups, setGroups] = useState([]);
    const [newGroupName, setNewGroupName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [addedMembers, setAddedMembers] = useState([]);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + global.token
        },
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    function fetchGroups() {
        fetch("http://localhost:8080/groups", requestOptions)
            .then((response) => response.json())
            .then((json) => setGroups(json))
            .catch((error) => {
                console.error(error);
                setGroups([]);
            });
    }

    function addMemberToList() {
        if (!memberEmail.trim()) {
            Alert.alert("Error", "Please enter member email");
            return;
        }

        if (addedMembers.includes(memberEmail)) {
            Alert.alert("Error", "This member is already added");
            return;
        }

        const verifyRequestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.token
            },
        };

        fetch("http://localhost:8080/friends", verifyRequestOptions)
            .then((response) => response.json())
            .then((friends) => {
                if (friends.includes(memberEmail)) {
                    setAddedMembers(addedMembers.concat(memberEmail));
                    setMemberEmail("");
                    Alert.alert("Success", "Member added to group");
                } else {
                    Alert.alert("Error", "You can only add your friends to the group");
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Error", "Failed to verify friend status");
            });
    }
    
    function createGroup() {
        if (!newGroupName.trim()) {
            Alert.alert("Error", "Please enter group name");
            return;
        }
        if (addedMembers.length === 0) {
            Alert.alert("Error", "Please add at least one member");
            return;
        }

        const createRequestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.token
            },
            body: JSON.stringify({
                name: newGroupName,
                memberEmails: addedMembers
            })
        };

        fetch("http://localhost:8080/groups/create", createRequestOptions)
            .then((response) => response.text())
            .then((result) => {
                Alert.alert(result);
                setNewGroupName("");
                setMemberEmail("");
                setAddedMembers([]);
                fetchGroups();
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Error", "Failed to create group");
            });
    }

    return (
        <ScrollView style={myStyle.container}>
            <View style={myStyle.createGroupForm}>
                <Text>Group Name</Text>
                <TextInput
                    style={myStyle.textBoxes}
                    value={newGroupName}
                    onChangeText={setNewGroupName}
                    placeholder="Enter group name"
                />

                <Text>Add Member Email</Text>
                <TextInput
                    style={myStyle.textBoxes}
                    value={memberEmail}
                    onChangeText={setMemberEmail}
                    placeholder="Enter member email"
                    autoCapitalize="none"
                />
                <Pressable 
                    style={myStyle.buttons}
                    onPress={addMemberToList}
                >
                    <Text>Add Member</Text>
                </Pressable>

                <Text style={myStyle.sectionTitle}>Added Members:</Text>
                {addedMembers.map((email, index) => (
                    <Text key={index} style={myStyle.memberItem}>
                        {email}
                    </Text>
                ))}

                <Pressable 
                    style={myStyle.buttons}
                    onPress={createGroup}
                >
                    <Text>Create Group</Text>
                </Pressable>
            </View>

            <Text style={myStyle.sectionTitle}>My Groups</Text>
            {groups.map((group, index) => (
                <View key={index} style={myStyle.groupItem}>
                    <Text style={myStyle.groupName}>{group.name}</Text>
                    <View style={myStyle.groupButtons}>
                        <Link 
                            href={{
                                pathname: "/groupdetails",
                                params: { groupId: group.id }
                            }}
                            style={myStyle.links}
                        >
                            Details
                        </Link>
                        <Link 
                            href={{
                                pathname: "/groupchat",
                                params: { groupId: group.id }
                            }}
                            style={myStyle.links}
                        >
                            Chat
                        </Link>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const myStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "lightblue",
    },
    createGroupForm: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    textBoxes: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    memberItem: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginVertical: 5,
    },
    groupItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
    },
    groupName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    groupButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttons: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 5,
    },
    links: {
        color: 'blue',
        backgroundColor: 'lightblue',
        padding: 8,
        borderRadius: 5,
    },
});