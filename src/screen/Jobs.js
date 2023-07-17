import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Jobs = ({ navigation }) => {
    const clear_home = require('../assets/images/badge-wash.png')
    const market = require('../assets/images/phu-hop-mua-sam-300721.png')
    const all_clean = require('../assets/images/badge-bathroom.png')
    const air = require('../assets/images/badge-insurrance.png')
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Dịch vụ</Text>
            <View style={styles.service}>
                <View style={styles.box_service}>
                    <TouchableOpacity
                        testID='navigate_listJob'
                        onPress={() => navigation.navigate('Công việc mới đăng')}
                    >
                        <View style={styles.border_image}>
                            <Image style={styles.image} source={clear_home} />
                        </View>
                        <Text style={styles.name}>Dọn dẹp nhà</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.box_service}>
                    <TouchableOpacity>
                        <View style={styles.border_image}>
                            <Image style={styles.image} source={all_clean} />
                        </View>
                        <Text style={styles.name}>Tổng vệ sinh</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.box_service}>
                    <TouchableOpacity>
                        <View style={styles.border_image}>
                            <Image style={styles.image} source={market} />
                        </View>
                        <Text style={styles.name}>Đi chợ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.box_service}>
                    <TouchableOpacity>
                        <View style={styles.border_image}>
                            <Image style={styles.image} source={air} />
                        </View>
                        <Text style={styles.name}>Vệ sinh máy lạnh</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        marginTop: 30,
        marginHorizontal: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
    service: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 30,
        justifyContent: 'space-around',
    },
    box_service: {
        width: 65,
        height: 65,
    },
    image: {
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
    border_image: {
        borderRadius: 20,
        backgroundColor: '#fff3e8',
        padding: 15
    },
    name: {
        marginTop: 10,
        alignSelf: 'center',
        textAlign: 'center'
    }


})

export default Jobs;