import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListJob = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>

            {/* Show jobs */}
            <View style={styles.box_job}>
                <Text style={styles.p}>CÔNG VIỆC GẦN NHẤT</Text>
                <View style={styles.line}>
                    <Ionicons name={'calendar-outline'} size={25} color={'#ff8c0f'} />
                    <Text style={styles.text}>Thứ Năm, 29/07/2021</Text>
                </View>
                <View style={styles.line}>
                    <Ionicons name={'timer-outline'} size={25} color={'#ff8c0f'} />
                    <Text style={styles.text}>3 giờ, 14:00 đến 17:00</Text>
                </View>
                <View style={styles.line}>
                    <Ionicons name={'location-outline'} size={25} color={'#ff8c0f'} />
                    <Text style={styles.text}>16 K12 Trường Sơn, Hoà Thọ Tây, Cẩm Lệ, Đà Nẵng</Text>
                </View>
                <View style={styles.hr}>
                    <Text></Text>
                </View>
                <View style={styles.status_line}>
                    <View style={styles.status}>
                        <Text>Tình trạng: </Text>
                        <Text style={{
                            backgroundColor: '#f5e6ec',
                            color: 'red',
                            paddingHorizontal: 10,
                            borderRadius: 10,
                            padding: 5,
                        }}>Đã huỷ</Text>
                    </View>
                    <Text style={styles.h4}>Đăng lại</Text>
                </View>
            </View>

            {/* New job */}
            <TouchableOpacity
                testID='navigate_newJob'
                onPress={() => navigation.navigate('Tạo công việc')}
                style={styles.create_job}
            >
                <Ionicons name={'add-circle'} size={35} color={'#47d173'} />
                <Text style={styles.h4}>Đặt công việc mới</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box_job: {
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#c2c2c2',
        borderWidth: 1
    },
    p: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5
    },
    line: {
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        marginHorizontal: 15,
        fontSize: 16,
        color: 'gray'
    },
    hr: {
        margin: -20,
        borderTopColor: '#c2c2c2',
        borderTopWidth: 1,
        marginVertical: 10
    },
    status_line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    status: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    create_job: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10
    },
    h4: {
        color: '#47d173',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,

    }
})

export default ListJob;