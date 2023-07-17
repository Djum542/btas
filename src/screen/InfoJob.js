import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { store } from '../store';

const InfoJob = (props) => {

    const navigation = useNavigation();
    const [job, setJob] = useState()
    const [phone, setPhone] = useState()
    const [name, setName] = useState()

    useEffect(() => {
        setJob(store.getState().app.job)
        getPhoneNumber()
        console.log(job);
    }, [job])

    const getPhoneNumber = async () => {
        await firestore().collection('users')
            .where('uid', '==', store.getState().app.token)
            .get()
            .then(querySnapshot => {
                querySnapshot._docs.forEach((doc) => {
                    setPhone(doc._data.phoneNumber)
                    setName(doc._data.name)
                })
            })
    }

    const handleCreateJob = async () => {
        firestore().collection('jobs').add({
            address: job.address,
            choosePeople: job.choosePeople,
            cook: job.cook,
            date: job.date,
            duration: job.duration,
            ironing: job.ironing,
            name: name,
            note: job.note,
            pet: job.pet,
            price: job.price,
            staff: 'null',
            status: 'WAITING',
            time: job.time,
            tools: job.tools,
            uid: store.getState().app.token
        })
        Alert.alert(
            "Thông báo",
            "Tạo công việc thành công",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => navigation.navigate('Trang chính') }
            ])
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                testID='scroll_infoJob'
            >
                {/* Address */}
                <Text style={styles.title}>Vị trí làm việc</Text>
                <View style={styles.area_content}>
                    <View style={styles.address_title}>
                        <Text style={styles.p}>{(job) ? (job.address).split(",", 1) : ''}</Text>
                        <TouchableOpacity style={styles.btn_change}>
                            <Text style={styles.change}>Thay đổi</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text}>{(job) ? job.address : ''}</Text>
                    <Text style={styles.p}>{(name) ? name : ''}</Text>
                    <Text>Số điện thoại: {(phone) ? phone : ''}</Text>
                </View>

                {/* Jobs description */}
                <Text style={styles.title}>Thông tin công việc</Text>
                <View style={styles.area_content}>
                    <Text style={styles.p}>Thời gian làm việc</Text>
                    <View style={styles.line_time}>
                        <Text style={styles.left_line}>Ngày làm việc </Text>
                        <Text style={styles.right_line}>{(job) ? job.date : ''} - {job ? job.time : ''}</Text>
                    </View>
                    <View style={styles.line_time}>
                        <Text style={styles.left_line} > Làm trong</Text>
                        <Text style={styles.right_line}>{(job) ? job.duration + job.ironing + job.cook + ' giờ ' : ''}, từ:  {job ? job.time : ''}</Text>
                    </View>

                    <View style={styles.hr}>
                        <Text></Text>
                    </View>

                    <Text style={styles.p}>Chi tiết công việc</Text>
                    <View style={styles.line_time}>
                        <Text style={styles.left_line}>Khối lượng</Text>
                        <Text style={styles.right_line}>{
                            (job) ?
                                (job.duration == 2) ? '55m2 / 2 phòng' : (job.duration == 3) ? '85m2 / 3 phòng' : (job.duration == 4) ? '105m2 / 4 phòng' : ''
                                : ''
                        }</Text>
                    </View>
                    <View style={styles.line_time}>
                        <Text style={styles.left_line}> Ghi chú</Text>
                        <Text style={styles.right_line}>{(job) ? job.note : ''}</Text>
                    </View>
                </View>

                {/* Pay */}
                <Text style={styles.title}>Phương thức thanh toán</Text>
                <View style={styles.area_content}>
                    <Text style={styles.pay}>$ Tiền mặt</Text>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.total}>
                    <Text style={styles.price}>Tổng cộng:</Text>
                    <Text style={styles.price}> {(job) ? job.price : '' / 1000},000 VND</Text>
                </View>
                <TouchableOpacity
                    testID='createJob'
                    style={styles.button}
                    onPress={handleCreateJob}
                >
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Đăng việc</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginHorizontal: 20,
        marginVertical: 10,
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
    area_content: {
        margin: 20,
        padding: 20,
        borderColor: '#c2c2c2',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    address_title: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    p: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    change: {
        color: '#47d173',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
        paddingHorizontal: 10
    },
    btn_change: {
        backgroundColor: '#f0f0f0',
        borderRadius: 15

    },
    text: {
        marginBottom: 10
    },
    line_time: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    hr: {
        borderTopColor: '#c2c2c2',
        borderTopWidth: 1,
        marginVertical: 10
    },
    left_line: {
        flex: 1,
        color: '#c2c2c2'
    },
    right_line: {
        flex: 2,
        textAlign: 'right'
    },
    pay: {
        fontSize: 18,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#47d173',
        marginBottom: 20
    },
    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    }
})

export default InfoJob;