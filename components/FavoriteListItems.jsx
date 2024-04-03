import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Icon } from '@rneui/themed';

export default function FavoriteListItems({ itemData, navigationRefer }){
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
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
    }, [favorites]);

    const removeFavorite = async (itemToRemove) => {
        try {
            const storedFavorites = await AsyncStorage.getItem('myPlace');
            if (storedFavorites) {
                let favoritesArray = JSON.parse(storedFavorites);
                // Find the index of the item to remove
                const indexToRemove = favoritesArray.findIndex(item => item === itemToRemove);
                if (indexToRemove !== -1) {
                    // Remove the item from the favoritesArray
                    favoritesArray.splice(indexToRemove, 1);
                    // Update AsyncStorage with the modified array
                    await AsyncStorage.setItem('myPlace', JSON.stringify(favoritesArray));
                    // Optionally, update state to reflect the change
                    setFavorites(favoritesArray);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        //TouchableOpacity enables the entire container can be clicked.
        <View>
            <TouchableOpacity 
                onPress={() => navigationRefer.navigate('FavoriteDetails', {
                    placeId: itemData.id,
                    data: itemData, 
                })
                }
            >
                <View style={myStyles.cardContainer}>
                    <Image 
                        source={itemData.image_url === '' ? require('../assets/yelp_logo.jpg') : {uri: itemData.image_url}}
                        style={myStyles.cardImge}
                    />
                    <View style={myStyles.chipWrapperLeft}>
                        <Text style={myStyles.chip}>{itemData.is_closed ? 'Closed' : 'Open Now'}</Text>
                    </View>
                    <View style={myStyles.chipWrapperRight}>
                        <Icon 
                            name='trash-can'
                            type='material-community'
                            size={24}
                            color='#383838'
                            onPress={()=>{removeFavorite(itemData.id)}}
                        />
                    </View>
                    
                    <View style={myStyles.cardName}>
                        <Text h4>{itemData.name}</Text>
                        <Icon 
                            name='right'
                            type='antdesign'
                            size={24}
                            containerStyle={{
                                backgroundColor:'#A6FF96', 
                                borderRadius:30,
                                marginLeft:20,
                                padding:4,
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const myStyles = StyleSheet.create({
    cardContainer:{
        position: 'relative',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding:8,
        marginBottom: 10,
    },
    cardImge:{
        width: '100%',
        height: 86,
        borderRadius: 10,
        marginBottom: 4,
    },
    cardName:{
        marginVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chipWrapperLeft:{
        position: 'absolute', 
        top:20, 
        left: 20,
    },
    chipWrapperRight:{
        position: 'absolute', 
        top: 4, 
        right: 6,
        padding:4,
        backgroundColor:'#ffffff',
        borderBottomLeftRadius: 12,
    },
    chip:{
        paddingHorizontal:8,
        paddingVertical: 4,
        color: "#383838",
        fontSize: 10,
        fontWeight:'normal',
        fontFamily: 'Archivo_500Medium',
        margin:-5,
        backgroundColor: '#A6FF96',
        borderRadius: 20,
    }
   
})