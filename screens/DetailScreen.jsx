import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef, useEffect, useState } from 'react';
import { ScrollView, 
        View, 
        Image, 
        Linking, 
        TouchableOpacity, 
        Dimensions, 
        ActivityIndicator,
        Alert 
        } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Icon, Button } from '@rneui/themed';

import Carousel from 'react-native-anchor-carousel';
import myStyles from '../style/styleSheet';

export default function DetailScreen({ route }){
    const { placeId } = route.params;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [detailResult, setDetailResult] = useState([]);
    

    const options = {
        method: 'GET',
        url: `https://api.yelp.com/v3/businesses/${placeId}`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer'
        }
      };
    
  
    useEffect(() => {
      axios.request(options)
      .then(
        (result)=>{
          // console.log(result);
          setDetailResult(result.data); 
          setIsLoaded(true);
          // console.log(dataResult);
        }
      )
      .catch((error)=>{
        setError(error);
        setIsLoaded(true);
        console.log(error);
      })
    },[]);


    // console.log(detailResult);
    // console.log(detailResult.photos)
    // console.log(PlaceData[0].slideImg);


    return(
        <ScrollView style={myStyles.backgroundContainer}>
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={myStyles.background}
            />

            {displayDetialData(error, isLoaded, detailResult)}
        
        </ScrollView>
    )
}

function displayDetialData(error, isLoaded, detailResult) {
    const [isFavorite, setIsFavorite] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const openGoogleMaps = () => {
        const address = encodeURIComponent(detailResult.name);
        const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
        Linking.openURL(url);
    };

    const openYelpLink = () => {
        const yelpUrl = detailResult.url;
        Linking.openURL(yelpUrl);
    };
    
    const carouselRef = useRef(null);
    const { width: windowWidth } = Dimensions.get('window');
    
    const renderSlide = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[myStyles.slideItem]}
                onPress={() => {
                    carouselRef.current.scrollToIndex(index);
                }}
            >
                <Image 
                    source={{ uri:item }}
                    style={myStyles.carouselImg}                    
                />
            </TouchableOpacity>
        )
    };

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
    }, []);


    // open alert message when adding the same item in the favorite list
    const createTwoButtonAlert = () =>
        Alert.alert('Oops!', 'This already exists in the list', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

    //adds item in the favorite if it does not exist in the favorite list.
    const handleFav = async (item) => {
        setIsFavorite(prev => !prev);
        
        const storedFavorites = await AsyncStorage.getItem('myPlace');

        let favoritesArray = [];
        
        if (storedFavorites) {
            favoritesArray = JSON.parse(storedFavorites);
        }
        
        const isExistFavorite = favoritesArray.some(favItem => favItem === item);
    
        if (!isExistFavorite) {
            const updatedFavoritesArray = [...favoritesArray, item];
            await AsyncStorage.setItem('myPlace', JSON.stringify(updatedFavoritesArray));
            setFavorites(updatedFavoritesArray);
        } else {
            return createTwoButtonAlert();
        }
    };

    // console.log(favorites);

    // display days based on "day" in "open"
    function translateDays(number) {
        switch (number) {
            case 0:
                return 'Monday';
            case 1:
                return 'Tuesday';
            case 2:
                return 'Wednesday';
            case 3:
                return 'Thursday';
            case 4:
                return 'Friday';
            case 5:
                return 'Saturday';
            case 6:
                return 'Sunday';
            default:
                return 'All day'; 
        }
    }

    const convertTimeFormat = (timeString) => {
        // Split the time string into hours and minutes parts
        const hours = timeString.slice(0, 2);
        const minutes = timeString.slice(2);
        // Construct the formatted time string
        const formattedTime = `${hours}:${minutes}`;
        return formattedTime;
    };

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
    } else if(detailResult === undefined ){
        return(
            <View>
                <Text>No details to display.</Text>
            </View>
        )
    } else{       

        return(
            <View style={myStyles.container}>
                    <View>
                        <View style={myStyles.headerBox}>
                            <Text h3>
                                {detailResult.location.city} &#62; {detailResult.categories[0].title}
                            </Text>
                            <View style={{width:40}}>
                                <Icon
                                    type='ionicon'
                                    name={isFavorite ? 'heart' : 'heart-outline'}
                                    color='#FF2D67'
                                    onPress={() => handleFav(detailResult.id)}
                                />
                            </View>
                        </View>
                        <Text h1>{detailResult.name}</Text>                                                
                    </View>
                    {detailResult.photos.length > 0 ? 
                        <Carousel 
                            style={myStyles.slide}
                            data={detailResult.photos}
                            renderItem={renderSlide}
                            initialIndex={0}
                            itemWidth={windowWidth * 0.7}
                            separatorWidth={15}
                            containerWidth={windowWidth}
                            inActiveOpacity={0.3}
                            ref={carouselRef}
                            itemContainerStyle={myStyles.carouselImg}
                        /> : <Text>Image is not available.</Text>
                    }
                    <View style={myStyles.detailList}>
                        <View style={myStyles.detailListItem}>
                            <Icon
                                name='map-marker-outline'
                                type='material-community'
                                size={24}
                                color='#A6FF96'
                                containerStyle={{
                                    marginRight: 8,
                                }}
                            />
                            <Text>{detailResult.location.display_address.join(', ')}</Text>
                        </View>
                        <View style={myStyles.detailListItem}>
                            <Icon
                                name='globe-americas'
                                type='font-awesome-5'
                                size={24}
                                color='#A6FF96'
                                containerStyle={{
                                    marginRight: 8,
                                }}
                            />
                            <TouchableOpacity onPress={() => openYelpLink()}>
                                <Text>View On Yelp</Text>
                            </TouchableOpacity>
                            
                        </View>
                        <View style={myStyles.detailListItem}>
                            <Icon
                                name='phone'
                                type='material-community'
                                size={24}
                                color='#A6FF96'
                                containerStyle={{
                                    marginRight: 8,
                                }}
                            />
                            <Text>{detailResult.display_phone ? detailResult.display_phone : 'No Phone registered'}</Text>
                        </View>
                        <View style={myStyles.detailListItem}>
                            <Icon
                                name='star-rate'
                                type='materialIcons'
                                size={24}
                                color='#A6FF96'
                                containerStyle={{
                                    marginRight: 8,
                                }}
                            />
                            <Text>{detailResult.rating}</Text>
                        </View>
                        <View style={myStyles.detailListItem}>
                            <Icon
                                name='clock-time-four-outline'
                                type='material-community'
                                size={24}
                                color='#A6FF96'
                                containerStyle={{
                                    marginRight: 8,
                                }}
                            />
                            <View style={{width:'80%'}}>
                                {detailResult.hours[0].open.map(( item, index ) => (
                                    <View style={myStyles.hoursBox} key={index}>
                                        <Text>{translateDays(item.day)}</Text>
                                        <Text>{convertTimeFormat(item.start)} - {convertTimeFormat(item.end)}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                    <Button 
                        title='Google Map'
                        onPress={openGoogleMaps}
                        icon={{
                            name: 'arrow-up-right',
                            type: 'feather',
                            size: 48,
                            containerStyle:{
                                backgroundColor:'#A6FF96', 
                                borderRadius:30,
                                marginLeft:20,
                            }
                            
                        }}
                        iconPosition='right'
                    />  
                </View>
        )
    }

    
}
