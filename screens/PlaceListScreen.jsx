import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Icon, ButtonGroup, Button, FAB } from '@rneui/themed';

import PlaceListItem from '../components/PlaceListItem';
import myStyles from '../style/styleSheet';
import apiKey from '../apikey';

export default function CategoryListScreen({ navigation, route }){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataResult, setDataResult] = useState([]);
    const [category, setCategory] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [limit, setLimit] = useState(10);
    const { area, time } = route.params;

    const ref = useRef(null);

    const handleCategory = (selectedIndex) => {
        const categoryOptions = ['','coffee', 'food', 'pubs', 'karaoke', 'nightlife'];
        setCategory(categoryOptions[selectedIndex]);
    };

    const convertUnixToTime = (unixTime) => {
        const date = new Date(unixTime * 1000); // Convert to milliseconds
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two-digit format for minutes
        return `${hours}:${minutes}`;
    };

    const fetchData = () => {
        const options = {
            method: 'GET',
            url: 'https://api.yelp.com/v3/businesses/search',
            params: {
                term: category,
                location: area,
                open_at: time,
                sort_by: 'best_match',
                limit: limit,
            },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
          };

        axios.request(options)
        .then(
            (result)=>{
            setDataResult(result.data); 
            setIsLoaded(true);
            }
        )
        .catch((error)=>{
            setError(error);
            setIsLoaded(true);
            console.log(error);
        })
    }
  
    useEffect(() => { fetchData(); },[category, limit]);


    const handleLoadMore = () => {
        setLimit(prev => prev + limit); // Update startIndex to load next set of items
        fetchData(); // Fetch next set of items
    };

    const handleScrollToTop = () => {
        // Scroll to the top of the ScrollView when FAB is clicked
        if (ref.current) {
            ref.current.scrollTo({ y: 0, animated: true });
        }
    };

    return (
        <View >
            <ScrollView ref={ref} style={myStyles.backgroundContainer}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                    style={myStyles.background}
                />
                <View style={myStyles.container}>
                    <View style={myStyles.timePlaceDisplay}>
                        <Text h3>Place open at {convertUnixToTime(time)}</Text>
                        <Text>&#40;Total {dataResult.total} places&#41;</Text>
                    </View>
                    <View style={myStyles.location}>
                        <Text h1>{area}</Text>
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
                    <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <ButtonGroup
                                buttons={['All','Coffee', 'Restaurants', 'Pubs', 'Karaoke', 'Nightlife']}
                                selectedIndex={selectedIndex}
                                onPress={(selectedIndex) => {
                                    setSelectedIndex(selectedIndex);
                                    handleCategory(selectedIndex);
                                }}
                                containerStyle={{ marginBottom: 8 }}
                            />
                        </ScrollView>
                    </View>
                    <View>               
                        { displayDataResults(error, isLoaded, dataResult, navigation) }
                        <Button 
                            title='Load More'
                            onPress={handleLoadMore}
                            icon={{
                                name: 'reload',
                                type: 'material-community',
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
                </View>
                
            </ScrollView>
            <FAB
                icon={{ 
                    name: 'arrow-up',
                    type: 'material-community',
                }}
                size="small"
                onPress={handleScrollToTop}
            />
        </View>
    )
}

function displayDataResults(error, isLoaded, dataResult, navigation){

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
                    color="#00ff00" 
                />
            </View>
        )
    } else if(dataResult.businesses === undefined ){
        return (
            <View>
                <Text>No items to display.</Text>
            </View>
        )
    } else{
        return (
            <PlaceListItem 
                itemData={dataResult.businesses}
                navigationRefer={navigation} 
            />
        )
    }
}
    

