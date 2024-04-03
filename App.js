import { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, Icon } from '@rneui/themed';
import { darkTheme } from './theme/darkTheme';
import { useFonts, 
  Archivo_100Thin,
  Archivo_200ExtraLight,
  Archivo_300Light,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  Archivo_700Bold,
  Archivo_800ExtraBold,
  Archivo_900Black
} from '@expo-google-fonts/archivo';

import LocationScreen from './screens/LocationScreen';
import SearchScreen from './screens/SearchScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import DetailScreen from './screens/DetailScreen';
import PlaceListScreen from './screens/PlaceListScreen';
import OnBoarding from './screens/Onboarding';

const LocationStack = createNativeStackNavigator();
function LocationStackScreen(){
  return (
    <LocationStack.Navigator
      screenOptions={{
        headerTintColor: '#ffffff',
        headerStyle: { 
          backgroundColor: '#000000', 
        },
        headerTitleStyle: {
          fontFamily: 'Archivo_600SemiBold', 
          fontWeight: 'normal',
        },

      }}
    >
      <LocationStack.Screen
        name="Location"
        component={LocationScreen}
      />
      <LocationStack.Screen
        name="LocationList"
        component={PlaceListScreen}
        options={{
          title: 'Location List',
        }}  
      />
      <LocationStack.Screen
        name="Details"
        component={DetailScreen}  
      />
    </LocationStack.Navigator>
  )
}


const SearchStack = createNativeStackNavigator();
function SearchStackScreen(){
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTintColor: '#ffffff',
        headerStyle: { 
          backgroundColor: '#000000', 
        },
        headerTitleStyle: {
          fontFamily: 'Archivo_600SemiBold', 
          fontWeight: 'normal',

        }
      }}
    >
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}  
      />
      <SearchStack.Screen
        name="SerchList"
        component={PlaceListScreen}  
      />
      <SearchStack.Screen
        name="Details"
        component={DetailScreen}  
      />
    </SearchStack.Navigator>
  )
}

const FavoriteStack = createNativeStackNavigator();
function FavoriteStackScreen(){
  return (
    <FavoriteStack.Navigator
      screenOptions={{
        headerTintColor: '#ffffff',
        headerStyle: { 
          backgroundColor: '#000000', 
        },
        headerTitleStyle: {
          fontFamily: 'Archivo_600SemiBold', 
          fontWeight: 'normal',

        }
      }}
    >
      <FavoriteStack.Screen
        name="Favorite"
        component={FavoriteScreen}  
      />
      <FavoriteStack.Screen
        name="FavoriteDetails"
        component={DetailScreen}
        options={{
          title: 'Details',
        }}  
      />
    </FavoriteStack.Navigator>
  )
}

const Tap = createBottomTabNavigator();
const onboardingStack = createNativeStackNavigator();

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  let [fontsLoaded] = useFonts({
    Archivo_100Thin,
    Archivo_200ExtraLight,
    Archivo_300Light,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Archivo_700Bold,
    Archivo_800ExtraBold,
    Archivo_900Black
  })
  
  if(!fontsLoaded) {
    return  (
      <View styles={myStyle.loadingContainer}>
        <ActivityIndicator size='large' color='#b9c8ff' />
      </View>
    )
  }

  if(showOnboarding) {
    return (
      <SafeAreaProvider>
         <ThemeProvider theme={darkTheme}>
          <NavigationContainer>
            <onboardingStack.Navigator
              screenOptions={{ headerShown: false }}
            >
              <onboardingStack.Screen
                name="Onboarding"
              >
                {props => <OnBoarding {...props} setShowOnboarding={setShowOnboarding} />}
              </onboardingStack.Screen>
            </onboardingStack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  } else{
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={darkTheme}>
          <NavigationContainer>
            <Tap.Navigator
              initialRouteName="LocationMain" 
              screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor:'#A6FF96',
                tabBarInactiveTintColor:'#ffffff',
                tabBarItemStyle:{
                  margin:8,
                },
                tabBarStyle: { 
                  borderRadius:50,
                  position: 'absolute',
                  bottom: 12,
                  marginHorizontal: 12,
                  backgroundColor: '#353535',
                  shadowColor: '#000000',
                  shadowOpacity: 0.5,
                  shadowRadius: 11,
                  borderColor: 'transparent',
                  height: 56,
                } 
              }}
            >
              <Tap.Screen 
                name="LocationMain"
                component={LocationStackScreen}
                options={{
                  title:'Place',
                  tabBarIcon:({ color, size }) => (
                    <Icon
                      type='material-community'
                      name="map-marker-outline"
                      color={color}
                      size={size}              
                    />
                  ),
                }}
              />
              <Tap.Screen 
                name="SearchMain"
                component={SearchStackScreen}
                options={{
                  title:'Search',
                  tabBarIcon:({ color, size }) => (
                    <Icon
                      type='material-community'
                      name="magnify"
                      color={color}
                      size={size}              
                    />
                  ),
                }}
              />
              <Tap.Screen 
                name="FavoriteMain"
                component={FavoriteStackScreen}
                options={{
                  title:'Favorite',
                  tabBarIcon:({ color, size }) => (
                    <Icon
                      type='material-community'
                      name="bookmark-outline"
                      color={color}
                      size={size}              
                    />
                  ),
                }}
              />
            </Tap.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}

const myStyle = StyleSheet.create({
  loadingContainer:{
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
})
