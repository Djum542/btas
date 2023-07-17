import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SetPassword = ({ navigation, route }) => {

    const [password, setPassword] = useState("0")
    const { phoneNumber } = route.params
    const { name } = route.params
    const { email } = route.params
    const { introCode } = route.params
    const { UID } = route.params

    // Add to firebase
    const addUser = async () => {
        firestore().collection('users').add({
            email: email,
            introCode: introCode,
            name: name,
            password: password,
            phoneNumber: phoneNumber,
            uid: UID
        })
    }

    const handleAddUser = () => {
        if (password.length > 6) {
            addUser()
            navigation.replace('Đăng nhập')
            // console.log(email + introCode + name + password + phoneNumber + UID);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* Title */}
            <Text style={styles.p}>Vui lòng nhập mật khẩu. Mật khẩu này sẽ được sử dụng cho lần đăng nhập sau</Text>

            {/* Input */}
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                placeholder="Mật khẩu 6 - 12 ký tự, không khoảng trắng"
                autoCapitalize="none"
                autoCorrect={false}
                borderColor={'#bdbdbd'}
            />

            {/* Button */}
            <TouchableOpacity
                style={[styles.btnSave, { backgroundColor: password.length > 6 ? '#47d173' : '#ebebeb' }]}
                onPress={handleAddUser}
            >
                <Text style={[styles.p, { color: '#fff', fontWeight: 'bold' }]}>Hoàn thành</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },

    p: {
        fontSize: 18,
        fontWeight: '300',
        marginHorizontal: 20
    },

    input: {
        marginHorizontal: 20,
        fontSize: 18,
        height: 60,
        borderWidth: 1,
        marginTop: 50,
        marginBottom: 0,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        marginBottom: 30,
        color: 'black',
    },

    error: {
        color: 'red',
        marginTop: -20,
        marginBottom: 10,
        alignSelf: 'flex-end'
    },

    btnSave: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
})

export default SetPassword;