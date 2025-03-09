import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

interface GroupDetails {
    id: string;
    name: string;
    creationTime: string;
    memberEmails: string[];
}

export default function GroupDetails() {
    const [group, setGroup] = useState<GroupDetails | null>(null);
    const { groupId } = useLocalSearchParams();

    useEffect(() => {
        fetchGroupDetails();
    }, []);

    function fetchGroupDetails() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.token
            },
        };

        fetch(`http://localhost:8080/groups/${groupId}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setGroup(data);
            })
            .catch((error) => console.error(error));
    }

    if (!group) {
        return (
            <View style={myStyle.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const formattedDate = new Date(group.creationTime).toLocaleString();

    return (
        <ScrollView style={myStyle.container}>
            <View style={myStyle.section}>
                <Text style={myStyle.groupName}>{group.name}</Text>
                <Text style={myStyle.creationTime}>Created: {formattedDate}</Text>
            </View>

            <View style={myStyle.section}>
                <Text style={myStyle.sectionTitle}>Members</Text>
                {group.memberEmails.map((member, index) => (
                    <Text key={index} style={myStyle.memberItem}>
                        {member}
                    </Text>
                ))}
            </View>
        </ScrollView>
    );
}

const myStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "lightblue",
    },
    section: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    groupName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    creationTime: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    memberItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        fontSize: 16,
    },
});