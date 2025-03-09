// app/navigation.tsx
import { View, StyleSheet, Text, Pressable ,Image } from "react-native";
import { Link ,router } from "expo-router";

export default function NavigationMenu() {
    const handleLogout = () => {
        global.token = null;
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <Link href="/friends" style={styles.menuItem}>
                    <Text style={styles.menuText}>Friends</Text>
                </Link>

                <Link href="/groups" style={styles.menuItem}>
                    <Text style={styles.menuText}>Groups</Text>
                </Link>

                <Pressable onPress={handleLogout} style={[styles.menuItem, styles.logoutButton]}>
                    <Text style={styles.logoutText}>Logout</Text>
                </Pressable>
            </View>
            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <Image style={styles.logoStyle} source={require("../assets/images/logo-sabanci.jpg")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightpink',
        padding: 20,
    },
    logoStyle: {
        marginBottom: 20,
        resizeMode:'contain',
        width : 300,
    },
    menuContainer: {
        marginTop: 20,
        alignItems: 'center',
        gap: 15,
    },
    menuItem: {
        backgroundColor: 'skyblue',
        width: '80%',
        padding: 15,
        borderRadius: 10,
        marginBottom: 5,
    },
    menuText: {
        color: 'blue',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: 'red',
        marginTop: 10,
    },
    logoutText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
    },
});