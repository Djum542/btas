import React, { useRef } from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from "react-native-raw-bottom-sheet";
import firestore from '@react-native-firebase/firestore'

const Register = ({ navigation, route }) => {

    // Require image
    const VN = require('../assets/images/vn.png')
    const TH = require('../assets/images/thai.jpg')
    const US = require('../assets/images/usa.png')
    const HK = require('../assets/images/HK.png')

    // Create var
    let listPhoneNumber = []
    const refRBSheet = useRef();
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [introCode, setIntroCode] = useState('')
    const [error, setError] = useState('')
    const [areaNumber, setAreaNumber] = useState('+84')
    const [flag, setFlag] = useState(VN)

    // Create account with phone number
    const onRegister = async (areaNumber, phoneNumber) => {
        let phone = areaNumber + phoneNumber
        await getPhoneNumber(phone)
        if (name && phoneNumber) {
            if (Array.isArray(listPhoneNumber._docs) && listPhoneNumber._docs.length) {
                setError('Số điện thoại đã tồn tại.')
            } else {
                setError('')
                navigation.replace('Xác thực tài khoản', {
                    phoneNumber: phone,
                    name: name,
                    email: email,
                    introCode: introCode,
                })
            }
        }
        console.log(listPhoneNumber._docs);

    }

    // Get phone number exited
    const getPhoneNumber = async (phoneNumber) => {
        listPhoneNumber = await firestore().collection('users')
            .where('phoneNumber', '==', phoneNumber)
            .get()
    }

    // Select Area number
    const hanldeAreaNumber = (code, flag) => {
        setAreaNumber(code)
        setFlag(flag)
        refRBSheet.current.close()
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView testID='scrollId' style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Rất vui được gặp bạn</Text>
                    <Text style={styles.p}>Tạo ngay tài khoản để trải nghiệm dịch vụ.</Text>
                </View>

                {/* Name */}
                <Text style={styles.titleInput}>Họ và tên</Text>
                <TextInput
                    testID='name_input'
                    style={styles.input}
                    onChangeText={setName}
                    placeholder="John Lengend"
                    borderColor={'#bdbdbd'}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Text style={styles.error}>{name ? '' : 'Thông tin bắt buộc'}</Text>

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
                        placeholder='0987123456'
                        onChangeText={setPhoneNumber}
                        borderColor={'#bdbdbd'}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <Text style={styles.error}>{error}</Text>

                {/* Email */}
                <Text style={styles.titleInput}>Email</Text>
                <TextInput
                    testID='mail_input'
                    style={styles.input}
                    onChangeText={setEmail}
                    placeholder="johnlegend@gmail.com"
                    autoCapitalize="none"
                    autoCorrect={false}
                    borderColor={'#bdbdbd'}
                />

                {/* Code */}
                <Text style={styles.titleInput}>Mã giới thiệu</Text>
                <TextInput
                    testID='verify_input'
                    style={styles.input}
                    onChangeText={setIntroCode}
                    placeholder="123456"
                    autoCapitalize="none"
                    autoCorrect={false}
                    borderColor={'#bdbdbd'}
                />
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.footerLeft}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.p}>Tôi đồng ý cới các </Text>
                        <Text style={styles.textLink}>Điều khoản </Text>
                        <Text style={styles.p}>& </Text>
                        <Text style={styles.textLink}>Chính </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textLink}>sách </Text>
                        <Text style={styles.p}>của bTaske</Text>
                    </View>
                </View>

                <TouchableOpacity
                    testID='navigate_verify_page'
                    onPress={() => onRegister(areaNumber, phoneNumber)}
                >
                    <View style={[styles.footerRight, { backgroundColor: (name && phoneNumber) ? '#47d173' : '#ebebeb' }]}>
                        <Ionicons name={'chevron-forward'} size={40} color={'#fff'} />
                    </View>
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
                        opacity: 0.95
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
                    onPress={() => hanldeAreaNumber('+84', VN)}
                >
                    <View style={styles.AreaCode}>
                        <Image style={styles.flag} source={VN} />
                        <Text style={[styles.p, { marginHorizontal: 20 }]}>VN +84</Text>
                    </View>
                </TouchableOpacity>

                {/* Thailand */}
                <TouchableOpacity
                    testID='choose_th_btn'
                    onPress={() => hanldeAreaNumber('+66', TH)}
                >
                    <View style={styles.AreaCode}>
                        <Image style={styles.flag} source={TH} />
                        <Text style={[styles.p, { marginHorizontal: 20 }]}>TH +66</Text>
                    </View>
                </TouchableOpacity>

                {/* HongKong */}
                <TouchableOpacity
                    testID='choose_hk_btn'
                    onPress={() => hanldeAreaNumber('+852', HK)}
                >
                    <View style={styles.AreaCode}>
                        <Image style={styles.flag} source={HK} />
                        <Text style={[styles.p, { marginHorizontal: 20 }]}>HK +852</Text>
                    </View>
                </TouchableOpacity>

                {/* US */}
                <TouchableOpacity
                    testID='choose_us_btn'
                    onPress={() => hanldeAreaNumber('+1', US)}
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
        padding: 20
    },

    header: {
        marginTop: 10,
        marginBottom: 30
    },

    phoneArea: {
        flexDirection: 'row',
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
        color: '#524e4e'
    },

    error: {
        color: 'red',
        marginTop: -20,
        marginBottom: 10,
        alignSelf: 'flex-end'
    },

    flag: {
        width: 25,
        height: 20,
        marginLeft: 5
    },

    AreaCode: {
        flexDirection: 'row',
        marginHorizontal: 40,
        marginBottom: 30,
        alignItems: 'center'
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
    },

    textLogin: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#47d173'
    },

    footer: {
        // flex: 130,
        marginTop: -10,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        flexDirection: 'row',
        paddingBottom: 30,
        paddingTop: 20,
    },

    footerRight: {
        justifyContent: 'center',
        marginLeft: 10,
        padding: 10,
        borderRadius: 10,
    },

    textLink: {
        fontSize: 18,
        color: '#47d173',
        textDecorationLine: 'underline'
    }

})

export default Register