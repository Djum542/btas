import OTPInputView from '@twotalltotems/react-native-otp-input'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth'

const VerifyCode = ({ navigation, route }) => {
    let clockCall = null
    let id = ''
    const defaultCountdown = 30
    const [UID, setUID] = useState()
    const [verifyCode, setVerifyCode] = useState("")
    const [countdown, setCountdown] = useState(defaultCountdown)
    const [confirm, setConfirm] = useState(null);
    const [error, setError] = useState('')
    const { phoneNumber } = route.params
    const { name } = route.params
    const { email } = route.params
    const { introCode } = route.params

    // Countdown OTP
    useEffect(() => {
        clockCall = setInterval(() => {
            decrementClock();
        }, 1000)
        return () => {
            clearInterval(clockCall)
        }
    })

    const decrementClock = () => {
        if (countdown == 0) {
            setCountdown(0)
            clearInterval(clockCall)
        } else {
            setCountdown(countdown - 1)
        }
    }

    // Send OTP code
    const signInWithPhoneNumber = async (phoneNumber) => {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        try {
            setConfirm(confirmation);
        } catch (error) {
            Alert('Số điện thoại không đúng.')
        }
    }

    // Confirm OTP
    const confirmCode = async (code) => {
        try {
            // console.log(confirm._auth._user.providerData);
            await confirm.confirm(code)
            id = confirm._auth._user.uid
        } catch (error) {
            Alert('Mã xác nhận số điện thoại không đúng')
        }
    }

    // Go to SetPassword
    const onVerifyCode = async () => {
        if (verifyCode.length === 6) {
            try {
                setError('')
                await confirmCode(verifyCode)
                // console.log(email + introCode + name + phoneNumber + UID)
                navigation.navigate('Đặt mật khẩu', {
                    phoneNumber: phoneNumber,
                    name: name,
                    email: email,
                    introCode: introCode,
                    UID: id
                })
            } catch (error) {
                alert(error)
                setError('Mã xác nhận không đúng')
            }

        }
    }

    useEffect(() => {
        signInWithPhoneNumber(phoneNumber)
    }, [phoneNumber])

    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.p}>Nhận mã kích hoạt gồm 6 chữ số đã được gửi đến số điện thoại của bạn.</Text>

            <View style={styles.containerInput}>
                {/* <OTPInputView
                    style={styles.rowOTP}
                    pinCount={6}
                    onCodeChanged={code => setVerifyCode(code)}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                /> */}
                <TextInput
                    testID='verifyCode_input'
                    style={styles.input}
                    onChangeText={setVerifyCode}
                    placeholder="123456"
                    autoCapitalize="none"
                    autoCorrect={false}
                    borderColor={'#bdbdbd'}
                />
            </View>

            {/* Error */}
            <Text style={styles.error}>{error}</Text>

            {/* Footer */}
            <View style={styles.footer}>
                {/* Countdown OTP */}
                <Text style={styles.p}>00:{countdown}</Text>

                {/* VerifyCode */}
                <TouchableOpacity
                    testID='verify_btn'
                    onPress={onVerifyCode}
                >
                    <View style={[styles.footerRight, { backgroundColor: (verifyCode.length === 6) ? '#47d173' : '#ebebeb' }]}>
                        <Ionicons name={'chevron-forward'} size={40} color={'#fff'} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },

    p: {
        fontSize: 18,
        fontWeight: '300'
    },

    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    rowOTP: {
        width: '80%',
        height: 200,
    },

    codeInputHighlightStyle: {
        marginTop: 50,
        paddingVertical: 11,
        width: 40,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },

    underlineStyleBase: {
        textAlign: 'center',
        width: 35,
        borderColor: '#a5a6a8',
        borderRadius: 30,
        borderWidth: 5,
        color: 'black',
        fontSize: 18
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

    error: {
        color: 'red',
        marginTop: -20,
        marginBottom: 30,
        marginRight: 20,
        alignSelf: 'flex-end'
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        left: 40,
        right: 40,
        bottom: 40,
    },

    footerRight: {
        backgroundColor: '#ebebeb',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        marginTop: -15
    },
})

export default VerifyCode;