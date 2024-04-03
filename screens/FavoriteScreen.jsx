import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Icon } from '@rneui/themed';

import myStyles from '../style/styleSheet';
import FavoriteListItems from '../components/FavoriteListItems';

export default function FavoriteScreen({ navigation }){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataResult, setDataResult] = useState([]);
    const [favorites, setFavorites] = useState([])
    
    useEffect(() => {
        async function fetchDataForFavorites() {
            try {
                const requests = favorites.map(favorites => {
                    const options = {
                        method: 'GET',
                        url: `https://api.yelp.com/v3/businesses/${favorites}`,
                        headers: {
                            accept: 'application/json',
                            Authorization: 'Bearer'
                        }
                    };
                    return axios.request(options);
                });
                const responses = await Promise.all(requests);
                const dataResults = responses.map(response => response.data);
                setDataResult(dataResults);
                setIsLoaded(true);
            } catch (error) {
                setError(error);
                setIsLoaded(true);
                console.error(error);
            }
        }

        const favoritesFocus = navigation.addListener('focus', () => {
            async function getData() {
                try {
                    const value = await AsyncStorage.getItem('myPlace');
                    if (value !== null) {
                        setFavorites(JSON.parse(value));
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        
            getData();
        });

        fetchDataForFavorites();

        return favoritesFocus;
    }, [favorites, navigation]);


    // console.log(favorites);

    return (
        <View style={myStyles.backgroundContainer}>
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={myStyles.background}
            />
            <View style={myStyles.container}>
                <Text h3>Your saved places</Text>
                <View style={myStyles.location}>
                    <Text h1>Favorite List</Text>
                    <Icon
                        name='arrow-down-left'
                        type='feather'
                        size={48}
                        containerStyle={{
                            backgroundColor:'#A6FF96', 
                            borderRadius:30,
                            marginLeft:20,
                        }}
                    />
                </View>
                <View style={{paddingBottom: 100,}}>
                {favorites.length > 0 ? 
                displayFavoriteResults(error, isLoaded, dataResult, navigation) 
                : 
                <Text>No place has been added to the list.</Text>}
                </View>
            </View>
        </View>
    )
}

function displayFavoriteResults(error, isLoaded, dataResult, navigation){
    const renderListItem = ({ item }) => (
        <FavoriteListItems 
            itemData={item}
            navigationRefer={navigation}
        />
    )

    if(error){
        return (
            <View>
                <Text>Error: {error.message} </Text>
            </View>
        )
    } else if(!isLoaded){
        return (
            <View>
                <Text>Loading...</Text>
                <ActivityIndicator 
                    size="large"
                    color="#A6FF96" 
                />
            </View>
        )
    } else if(dataResult === undefined ){
        return(
            <View>
                <Text>No items to display.</Text>
            </View>
        )
    } else{
        return(
            <FlatList 
                data={dataResult}
                renderItem={renderListItem}
                keyExtractor={item => item.id}
                style={myStyles.flatList}
            />
        )
    }
}
    

