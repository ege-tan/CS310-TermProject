import { Stack } from "expo-router";


export default function AppLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#007AFF',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>

            <Stack.Screen 
                name="index"
                options={{
                    title: 'Login',
                    headerShown: true,
                    headerBackVisible: false,
                }}/>

            <Stack.Screen 
                name="register"
                options={{
                    title: 'Register',
                }}/>

            <Stack.Screen 
                name="friends"
                options={{
                    title: 'Friends',
                }}/>

            <Stack.Screen 
                name="chat"
                options={{
                    title: 'Chat',
                }}/>

            <Stack.Screen 
                name="groups"
                options={{
                    title: 'Groups',
                }}/>

            <Stack.Screen 
                name="groupchat"
                options={{
                    title: 'Group Chat',
                }}/>

            <Stack.Screen 
                name="groupdetails"
                options={{
                    title: 'Group Details',
                }}/>
                
        </Stack>
    );
}
