import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { store } from '../store';

const DescriptionTask = ({ navigation, route }) => {

    const refRBSheet = useRef()
    const [edited, setEdited] = useState(false)
    const [job, setJob] = useState()
    const [changeNote, setChangeNote] = useState(false)
    const [changeAddress, setChangeAddress] = useState(false)
    const [price, setPrice] = useState()
    const [note, setNote] = useState('')
    const [address, setAddress] = useState('')
    const [duration, setDuration] = useState()
    const [changeDuration, setChangeDuration] = useState(false)
    const { id } = route.params

    // reRender
    useEffect(() => {
        let unmounted = false
        if (!unmounted) {
            getInfoJob()
            // console.log('hi: ' + id);
        }
        return () => { unmounted = true };
    }, [])

    // Get jobs
    const getInfoJob = async () => {
        await firestore().collection('jobs')
            .doc(id)
            .get()
            .then(querySnapshot => { setJob(querySnapshot._data) })
    }

    // Change information job
    const onChangeLineTask = (input) => {
        setEdited(true)
        if (input == 'note') {
            setChangeNote(true)
        }
        if (input == 'duration') {
            console.log(job.duration);
            refRBSheet.current.open()
        }
        if (input == 'address') {
            setChangeAddress(true)
        }
        if (input == 'date') {

        }
    }

    // Handle note
    const handleNote = () => {
        setChangeNote(false)
        job.note = note
    }

    // Handle address
    const handleAddress = () => {
        setChangeAddress(false)
        job.address = address
    }

    // Handle duration
    const onSetDuration = (value) => {
        setDuration(value)
        handlePrice(value)
        job.duration = value
        refRBSheet.current.close()
        // console.log(job);
    }

    // Handle price
    const handlePrice = (value) => {
        let total = 0
        total += 100000 * value
        if (job.cook) {
            total += 50000
        }
        if (job.ironing) {
            total += 50000
        }
        if (job.tools) {
            total += 30000
        }
        // console.log(total);
        setPrice(total)
        job.price = total
    }

    // Handle change job
    const handleChangeJob = async () => {
        await firestore().collection('jobs')
            .doc(id)
            .set({
                address: job.address,
                choosePeople: job.choosePeople,
                cook: job.cook,
                date: job.date,
                duration: job.duration,
                ironing: job.ironing,
                name: job.name,
                note: job.note,
                pet: job.pet,
                price: job.price,
                staff: job.staff,
                time: job.time,
                tools: job.tools,
                uid: store.getState().app.token,
                status: job.status
            })
        setEdited(false)
        Alert.alert(
            "Thông báo",
            "Cập nhật công việc thành công",
            [
                {
                    text: "OK"
                }
            ]
        )
    }

    const cancelTask = () => {
        if (job.status == 'CANCELED') {
            Alert.alert(
                "Thông báo",
                "Bạn có chắc muốn mở lại công việc này",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: async () => {
                            await firestore().collection('jobs')
                                .doc(id)
                                .update({
                                    status: 'WAITING'
                                })
                            navigation.goBack()
                        }
                    }
                ]
            )
        } else {
            Alert.alert(
                "Thông báo",
                "Bạn có chắc muốn huỷ công việc này",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: async () => {
                            await firestore().collection('jobs')
                                .doc(id)
                                .update({
                                    status: 'CANCELED'
                                })
                            navigation.goBack()
                        }
                    }
                ]
            )
        }


    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                testID='scroll_infoJob'
            >
                {/* Address */}
                <View style={styles.header}>
                    <Text testID='header' style={styles.title}>Vị trí làm việc</Text>
                    <TouchableOpacity
                        onPress={cancelTask}
                    >
                        <Text style={[styles.cancel, { color: (job) ? (job.status == 'CANCELED') ? '#47d173' : 'red' : '#fff', borderColor: (job) ? (job.status == 'CANCELED') ? '#47d173' : 'red' : '#fff' }]}>{(job) ? (job.status == 'CANCELED') ? 'Đặt lại' : 'Huỷ viêc' : ''}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.area_content}>
                    <View style={styles.address_title}>
                        <Text testID='home_number' style={styles.p}>{(job) ? (job.address).split(',', 1) : ''}</Text>
                        <TouchableOpacity
                            testID='change_address'
                            onPress={() => onChangeLineTask('address')}
                        >
                            <Ionicons style={styles.icon} name={'pencil-sharp'} size={20} color={'#47d173'} />
                        </TouchableOpacity>
                    </View>
                    <Text testID='address' style={styles.text}>{(job) ? job.address : ''}</Text>

                    {/* Change note */}
                    {(changeAddress) ?
                        <View style={styles.changeNote}>
                            <TextInput
                                testID='input_address'
                                style={styles.input}
                                placeholder={(job) ? job.address : ''}
                                onChangeText={setAddress}
                            />
                            <TouchableOpacity
                                testID='save_address'
                                onPress={handleAddress}
                                style={styles.btn}
                            >
                                <Text>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                        : <Text></Text>
                    }

                </View>

                {/* Jobs description */}
                <Text style={styles.title}>Thông tin công việc</Text>
                <View style={styles.area_content}>
                    <Text style={styles.p}>Thời gian làm việc</Text>
                    <View style={styles.line_time}>
                        <Text style={styles.left_line}>Ngày làm việc </Text>
                        <Text testID='date' style={styles.right_line}>{(job) ? job.date : ''} - {job ? job.time : ''}</Text>
                        <TouchableOpacity
                            onPress={() => onChangeLineTask('date')}
                        >
                            <Ionicons style={styles.icon} name={'pencil-sharp'} size={20} color={'#47d173'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line_time}>
                        <Text style={styles.left_line} >Làm trong</Text>
                        <Text testID='time' style={[styles.right_line, { marginRight: 30 }]}>{(job) ? job.duration + job.ironing + job.cook + ' giờ' : ''}</Text>
                        {/* <TouchableOpacity
                            onPress={() => onChangeLineTask('time')}
                        >
                            <Ionicons style={styles.icon} name={'pencil-sharp'} size={20} color={'#47d173'} />
                        </TouchableOpacity> */}
                    </View>

                    <View style={styles.hr}>
                        <Text></Text>
                    </View>

                    <Text style={styles.p}>Chi tiết công việc</Text>
                    <View style={styles.line_time}>
                        <Text style={styles.left_line}>Khối lượng</Text>
                        <Text testID='duration' style={styles.right_line}>{
                            (job) ?
                                (job.duration == 2) ? '55m2 / 2 phòng' : (job.duration == 3) ? '85m2 / 3 phòng' : (job.duration == 4) ? '105m2 / 4 phòng' : ''
                                : ''
                        }</Text>
                        <TouchableOpacity
                            testID='change_duration'
                            onPress={() => onChangeLineTask('duration')}
                        >
                            <Ionicons style={styles.icon} name={'pencil-sharp'} size={20} color={'#47d173'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line_time}>
                        <Text style={styles.left_line}>Ghi chú</Text>
                        <Text testID='note' style={styles.right_line}>{(job) ? job.note : ''}</Text>
                        <TouchableOpacity
                            testID='change_note'
                            onPress={() => onChangeLineTask('note')}
                        >
                            <Ionicons style={styles.icon} name={'pencil-sharp'} size={20} color={'#47d173'} />
                        </TouchableOpacity>
                    </View>

                    {/* Change note */}
                    {(changeNote) ?
                        <View style={styles.changeNote}>
                            <TextInput
                                testID='input_note'
                                style={styles.input}
                                placeholder={(job) ? job.note : ''}
                                onChangeText={setNote}
                            />
                            <TouchableOpacity
                                testID='save_note'
                                onPress={handleNote}
                                style={styles.btn}
                            >
                                <Text>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                        : <Text></Text>
                    }

                </View>

                {/* Pay */}
                <Text style={styles.title}>Phương thức thanh toán</Text>
                <View style={styles.area_content}>
                    <View style={styles.total}>
                        <Text style={styles.pay}>$ Tiền mặt</Text>
                        <Text testID='price' style={styles.price}>{(job) ? job.price : ''} VND</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            {(edited) ?
                <View style={styles.footer}>
                    <TouchableOpacity
                        testID='createJob'
                        style={styles.button}
                        onPress={handleChangeJob}
                    >
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Lưu</Text>
                    </TouchableOpacity>
                </View> : <Text></Text>
            }

            {/* Duration option */}
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "#bfbbbb",
                        opacity: 1
                    },
                    draggableIcon: {
                        backgroundColor: "#000",
                        marginBottom: 20
                    }
                }}
            >
                <TouchableOpacity
                    testID='duration_2'
                    onPress={() => onSetDuration(2)}
                >
                    <View style={[styles.area, { borderColor: (job) ? (job.duration === 2) ? '#ff8c0f' : '#c2c2c2' : '#c2c2c2' }]}>
                        <Text style={styles.head_area}>2 giờ</Text>
                        <Text style={styles.content_area}>55m2 / 2 phòng</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    testID='duration_3'
                    onPress={() => onSetDuration(3)}
                >
                    <View style={[styles.area, { borderColor: (job) ? (job.duration === 3) ? '#ff8c0f' : '#c2c2c2' : '#c2c2c2' }]}>
                        <Text style={styles.head_area}>3 giờ</Text>
                        <Text style={styles.content_area}>85m2 / 3 phòng</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    testID='duration_4'
                    onPress={() => onSetDuration(4)}
                >
                    <View style={[styles.area, { borderColor: (job) ? (job.duration === 4) ? '#ff8c0f' : '#c2c2c2' : '#c2c2c2' }]}>
                        <Text style={styles.head_area}>4 giờ</Text>
                        <Text style={styles.content_area}>105m2 / 4 phòng</Text>
                    </View>
                </TouchableOpacity>
            </RBSheet>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cancel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        padding: 7,
        marginTop: 10
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
        justifyContent: 'space-between',
        marginBottom: 10
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
        marginVertical: 5,
        alignItems: 'baseline'
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
    icon: {
        paddingLeft: 10
    },
    input: {
        borderColor: '#c2c2c2',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        flex: 4
    },
    changeNote: {
        flexDirection: 'row',
        flex: 1
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#47d173',
        marginLeft: 5
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
    },
    area: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 20,
        alignItems: 'center'
    },
    head_area: {
        fontWeight: 'bold',
        fontSize: 16,
        alignItems: 'center'
    },
    content_area: {
        color: 'gray',
    },
})

export default DescriptionTask;