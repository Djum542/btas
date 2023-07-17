import firestore from '@react-native-firebase/firestore';
import React, { useRef, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {

    const navigation = useNavigation();
    // Require image
    const VN = require('../assets/images/vn.png')
    const TH = require('../assets/images/thai.jpg')
    const US = require('../assets/images/usa.png')
    const HK = require('../assets/images/HK.png')

    // Constructor
    const refRBSheet = useRef();
    const [phoneNumber, setPhoneNumber] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState("")
    const [areaNumber, setAreaNumber] = useState('+84')
    const [flag, setFlag] = useState(VN)

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@token', value)
        } catch (e) {
            // saving error
            console.log(e);
        }
    }

    // Method SignIn
    const signInWithPhoneNumber = async (areaNumber, phoneNumber) => {
        let phone = areaNumber + phoneNumber
        if (!phoneNumber || !password) {
            setError('Vui lòng nhập đầy đủ thông tin')
        } else {
            let users = await firestore().collection('users')
                .where('phoneNumber', '==', phone)
                .get()
                .then(querySnapshot => {
                    // console.log(querySnapshot._changes);
                    if (Array.isArray(querySnapshot._changes) && querySnapshot._changes.length) {

                        querySnapshot.forEach((doc) => {
                            // console.log(doc._data.password);
                            if (doc._data.password == password) {
                                setError('')
                                // console.log(doc._data.uid);
                                storeData(doc._data.uid)
                                props.onAddToken(doc._data.uid)
                                navigation.replace('Trang chính')
                            } else {
                                setError('Vui lòng kiểm tra lại số điện thoại và mật khẩu.')

                            }
                        })
                    } else {
                        setError('Tài khoản chưa được tạo.')
                    }
                })
        }
    }

    // Select Area number
    const handleAreaNumber = (code, flag) => {
        setAreaNumber(code)
        setFlag(flag)
        refRBSheet.current.close()
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Mừng trở lại</Text>
                <Text style={styles.p}>Vui lòng đăng nhập để tiếp tục.</Text>
            </View>

            {/* Phone number */}
            <Text style={styles.titleInput}>Số điện thoại</Text>
            <View style={styles.phoneArea}>
                <TouchableOpacity
                    testID='chooseCountryCode'
                    onPress={() => refRBSheet.current.open()}
                >
                    <View style={styles.areaNumber}>
                        <Image style={styles.flag} source={flag} />
                        <Text style={[styles.p, { marginHorizontal: 5 }]}>{areaNumber}</Text>
                        <Ionicons name={'caret-down'} size={20} color={'#4f4f4f'} />
                    </View>
                </TouchableOpacity>

                <TextInput
                    testID='phoneNumber_input'
                    style={[styles.input, { flex: 150 }]}
                    placeholder='Nhập số điện thoại'
                    onChangeText={setPhoneNumber}
                    borderColor={'#bdbdbd'}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            {/* Password */}
            <Text style={styles.titleInput}>Mật khẩu</Text>
            <TextInput
                testID='password_input'
                style={[styles.input, { marginHorizontal: 20 }]}
                onChangeText={setPassword}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
                borderColor={'#bdbdbd'}
            />

            {/* Error */}
            <Text style={styles.error}>{error}</Text>

            {/* Button */}
            <TouchableOpacity
                testID='login_btn'
                onPress={() => signInWithPhoneNumber(areaNumber, phoneNumber)}
                style={styles.btnLogin}
            >
                <Text style={styles.textLogin}>Đăng nhập</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.register}>
                    <Text style={styles.p}>Bạn chưa có tài khoản?</Text>

                    {/* onRegister */}
                    <TouchableOpacity
                        testID='navigate_register_btn'
                        onPress={() => navigation.navigate('Đăng ký')}
                    >
                        <Text style={styles.textLink}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                </View>

                {/* onForgot Password */}
                <TouchableOpacity style={styles.forgotPass}
                    testID='navigate_forgotPassword_btn'
                >
                    <Text style={styles.textLink}>Quên mật khẩu</Text>
                </TouchableOpacity>
            </View>

            {/* AreaCode */}
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "#bfbbbb",
                        opacity: 0.8
                    },
                    draggableIcon: {
                        backgroundColor: "#000",
                        marginBottom: 20
                    }
                }}
            >
                {/* Viet Nam */}
                <TouchableOpacity
                    testID='choose_vn_btn'
                    onPress={() => handleAreaNumber('+84', VN)}
                >
                    <View style={styles.AreaCode}>
                        <Image style={styles.flag} source={VN} />
                        <Text style={[styles.p, { marginHorizontal: 20 }]}>VN +84</Text>
                    </View>
                </TouchableOpacity>

                {/* Thailand */}
                <TouchableOpacity
                    testID='choose_th_btn'
                    onPress={() => handleAreaNumber('+66', TH)}
                >
                    <View style={styles.AreaCode}>
                        <Image style={styles.flag} source={TH} />
                        <Text style={[styles.p, { marginHorizontal: 20 }]}>TH +66</Text>
                    </View>
                </TouchableOpacity>

                {/* HongKong */}
                <TouchableOpacity
                    testID='choose_hk_btn'
                    onPress={() => handleAreaNumber('+852', HK)}
                >
                    <View style={styles.AreaCode}>
                        <Image style={styles.flag} source={HK} />
                        <Text style={[styles.p, { marginHorizontal: 20 }]}>HK +852</Text>
                    </View>
                </TouchableOpacity>

                {/* US */}
                <TouchableOpacity
                    testID='choose_us_btn'
                    onPress={() => handleAreaNumber('+1', US)}
                >
                    <View style={styles.AreaCode}>
                        <Image style={styles.flag} source={US} />
                        <Text style={[styles.p, { marginHorizontal: 20 }]}>US +1</Text>
                    </View>
                </TouchableOpacity>
            </RBSheet>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        marginTop: 30,
        marginBottom: 30,
        paddingHorizontal: 20
    },

    phoneArea: {
        flexDirection: 'row',
        marginHorizontal: 20
    },

    headerText: {
        // fontFamily: ''
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10
    },

    p: {
        fontSize: 18,
        fontWeight: '300'
    },

    titleInput: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#524e4e',
        marginHorizontal: 20
    },

    error: {
        color: 'red',
        marginTop: -20,
        marginBottom: 30,
        marginRight: 20,
        alignSelf: 'flex-end'
    },

    flag: {
        width: 25,
        height: 20,
        marginLeft: 5
    },

    areaNumber: {
        flex: 50,
        height: 60,
        backgroundColor: '#ebebeb',
        paddingHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 10,
    },

    AreaCode: {
        flexDirection: 'row',
        marginHorizontal: 40,
        marginBottom: 30,
        alignItems: 'center'
    },

    input: {
        fontSize: 18,
        height: 60,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 0,
        borderRadius: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        marginBottom: 30,
    },

    btnLogin: {
        backgroundColor: '#ebebeb',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20
    },

    textLogin: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#47d173'
    },

    footer: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center'
    },

    register: {
        flexDirection: 'row',
        marginBottom: 20
    },
    forgotPass: {
        alignSelf: 'center'
    },

    textLink: {
        fontSize: 18,
        color: '#47d173',
        fontWeight: 'bold',
        marginHorizontal: 10
    }
})

export default Login;