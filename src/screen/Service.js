import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { store } from '../store';

const Service = ({ navigation }) => {

    const [jobs, setJobs] = useState()

    const getData = async () => {
        let data = []
        await firestore().collection('jobs')
            .where('uid', '==', store.getState().app.token)
            .get()
            .then(querySnapshot => {
                querySnapshot._docs.forEach((doc) => {
                    let item = {}
                    item = doc._data,
                        item.id = doc._ref._documentPath._parts[1],
                        console.log(doc._ref._documentPath._parts[1]);
                    data.push(doc._data)
                })
            })
        setJobs(data)
    }

    useEffect(() => {
        let unmounted = false
        if (!unmounted) {
            getData()
        }
        return () => { unmounted = true };
    }, [])

    const renderItem = ({ item }) =>
    (
        <View style={styles.box_job} key={item.id}>
            <Text style={styles.p}>Dọn dẹp nhà</Text>
            <View style={styles.line}>
                <Ionicons name={'calendar-outline'} size={25} color={'#ff8c0f'} />
                <Text style={styles.text}>{item.date}</Text>
            </View>
            <View style={styles.line}>
                <Ionicons name={'timer-outline'} size={25} color={'#ff8c0f'} />
                <Text style={styles.text}>{item.duration + item.ironing + item.cook} giờ, từ {item.time}</Text>
            </View>
            <View style={styles.line}>
                <Ionicons name={'location-outline'} size={25} color={'#ff8c0f'} />
                <Text style={styles.text}>{item.address}</Text>
            </View>
            <View style={styles.hr}>
                <Text></Text>
            </View>
            <View style={styles.status_line}>
                <View style={styles.status}>
                    <Text style={{ fontSize: 16 }}>Tình trạng: </Text>
                    <TouchableOpacity
                    // onPress={}
                    >
                        <Text
                            testID='status'
                            style={{
                                color: (item.status == 'WAITING') ? '#ffee00' : (item.status == 'DONE') ? '#47d173' : (item.status == 'CANCELED') ? 'red' : '#ff8c0f',
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                padding: 5,
                                fontSize: 16
                            }}>{item.status}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Chi tiết', {
                        id: item.id
                    })}
                >
                    <Text style={styles.h4}>Chi tiết</Text>
                </TouchableOpacity>
            </View>
            <Text testID='staff'>{(item.staff == 'null' && item.status == 'WAITING') ? 'Đang chờ người nhận công việc...' : (item.staff != 'null' && item.status != 'CANCELED' || item.staff != 'null' && item.status != 'DONE') ? 'Đã có người nhận việc' : ''}</Text>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>

            {/* Title */}
            <Text style={styles.title}>Danh sách công việc</Text>

            {/* Show jobs */}
            <FlatList
                testID='scroll'
                data={jobs}
                renderItem={renderItem}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20
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
        alignItems: 'center'
    },
    status: {
        alignItems: 'center',
        flexDirection: 'row',
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

export default Service;