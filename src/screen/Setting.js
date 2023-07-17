import React from 'react'
import { SafeAreaView, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
const Setting = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Cài đặt</Text>
            <TouchableOpacity
                onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Đăng nhập' }],
                })}
            >
                <Text>Đăng xuất</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 18
    }
})

export default Setting;