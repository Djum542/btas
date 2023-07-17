import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Register from './src/screen/Register';
import VerifyCode from './src/screen/VerifyCode';
import SetPassword from './src/screen/SetPassword';
import Jobs from './src/screen/Jobs';
import Service from './src/screen/Service';
import Setting from './src/screen/Setting';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';
import { Text } from 'react-native';
import LoginScreenContainer from './src/containers/LoginScreenContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListJob from './src/screen/ListJob';
import NewJob from './src/screen/NewJob';
import WorkTime from './src/screen/WorkTime';
import { NewJobScreenContainer, WorkTimeScreenContainer } from './src/containers';
import InfoJob from './src/screen/InfoJob';
import DescriptionTask from './src/screen/DescriptionTask';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tabs navigation
const tabScreen = () => (
  <Tab.Navigator
    initialRouteName="Scan"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Công việc') {
          iconName = focused
            ? 'list-circle'
            : 'list-circle-outline';
        }
        if (route.name === 'Dịch vụ') {
          iconName = focused ? 'options' : 'options-outline';
        }
        if (route.name === 'Cài đặt') {
          iconName = focused ? 'settings' : 'settings-outline'
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ff8c0f',
      tabBarInactiveTintColor: 'gray',
      headerShown: false
    })}
  >

    {/* Screen Menu */}
    <Tab.Screen
      testID='service'
      name="Dịch vụ"
      component={Jobs}
      options={{
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }} />
    <Tab.Screen
      testID='jobs'
      name="Công việc"
      component={Service}
      options={{

        headerTintColor: '#000000',
        headerTitleAlign: 'center',
      }} />
    <Tab.Screen
      testID='setting'
      name="Cài đặt"
      component={Setting}
      options={{
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }} />

  </Tab.Navigator>
);

// Jobs
const stackJobs = () => {
  return (
    <Stack.Navigator
      headerShown='false'
    >
      <Stack.Screen
        name='Công việc'
        component={Jobs}
      />
      <Stack.Screen
        name='Công việc mới đăng'
        component={ListJob}
      />
      <Stack.Screen
        name='Tạo công việc'
        component={NewJobScreenContainer}
      />
      <Stack.Screen
        name='Chọn thời gian làm việc'
        component={WorkTimeScreenContainer}
      />
    </Stack.Navigator>
  )
}

// Main Navigation
const App = () => {

  const [token, setToken] = useState(null)

  const getData = async () => {
    try {
      setToken(await AsyncStorage.getItem('@token'))
    } catch (e) {
      // error reading value
      setToken(null)
    }
  }

  useEffect(() => {
    getData()
  }, [token])

  return (
    <Provider store={store}>
      <PersistGate loading={(<Text>Loading</Text>)} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            {token == null ? (
              <>
                <Stack.Screen
                  name='Đăng nhập'
                  component={LoginScreenContainer}
                />
                <Stack.Screen
                  name='Đăng ký'
                  component={Register}
                />
                <Stack.Screen
                  name='Xác thực tài khoản'
                  component={VerifyCode}
                />
                <Stack.Screen
                  name='Đặt mật khẩu'
                  component={SetPassword}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name='Trang chính'
                  component={tabScreen}
                />
                <Stack.Screen
                  name='Công việc mới đăng'
                  component={ListJob}
                />
                <Stack.Screen
                  name='Tạo công việc'
                  component={NewJobScreenContainer}
                />
                <Stack.Screen
                  name='Chọn thời gian làm việc'
                  component={WorkTime}
                />
                <Stack.Screen
                  name='Xác nhận công việc'
                  component={InfoJob}
                />
                <Stack.Screen
                  name='Chi tiết'
                  component={DescriptionTask}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  options={{ headerShown: false }}
                  name='Trang chính'
                  component={tabScreen}
                />
                <Stack.Screen
                  name='Công việc mới đăng'
                  component={ListJob}
                />
                <Stack.Screen
                  name='Tạo công việc'
                  component={NewJobScreenContainer}
                />
                <Stack.Screen
                  name='Chọn thời gian làm việc'
                  component={WorkTimeScreenContainer}
                />
                <Stack.Screen
                  name='Xác nhận công việc'
                  component={InfoJob}
                />
                <Stack.Screen
                  name='Chi tiết'
                  component={DescriptionTask}
                />
              </>
            )}

          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
