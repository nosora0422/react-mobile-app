import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import { View, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Icon, Button, FAB } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';

import myStyles from '../style/styleSheet';
import PlaceListItem from '../components/PlaceListItem';
import apiKey from '../apikey';


export default function SearchScreen({ navigation }){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [searchTerm, setSerchTerm] = useState('');
    const [limit, setLimit] = useState(10);

    const ref = useRef(null);

    const fetchData = () => {
        const options = {
            method: 'GET',
            url: 'https://api.yelp.com/v3/businesses/search',
            params: {
                term: searchTerm,
                location: 'vancouver',
                is_closed: false,
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
                setSearchResult(result.data); 
                setIsLoaded(true);
            }
        )
        .catch((error)=>{
            setError(error);
            setIsLoaded(true);
            console.log(error);
        })
    }

    useEffect(() => { fetchData(); },[searchTerm, limit]);
    useEffect(() => { setLimit(10); },[searchTerm]);

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
        <View>
            <ScrollView ref={ref} style={myStyles.backgroundContainer}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                    style={myStyles.background}
                />
                <View style={myStyles.container}>
                    <View style={myStyles.location}>
                        <Text h1>Search Place</Text>
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
                    
                    <View style={[myStyles.inputInfo, {marginVertical: 10}]}>
                        <Text>e.g. "food" or "restaurants"</Text>
                        <View style={myStyles.inputBox}>
                            <TextInput
                                style={myStyles.input}
                                onChangeText={setSerchTerm}
                                value={searchTerm}
                            />
                        </View>
                    </View>
                    <View>
                        { displaySearchResult(error, isLoaded, searchResult, navigation) }
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
            </ScrollView >
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


function displaySearchResult(error, isLoaded, searchResult, navigation){

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
    } else if(searchResult.businesses === undefined ){
        return (
            <View>
                <Text>No items to display.</Text>
            </View>
        )
    } else{
        return (
            <PlaceListItem 
                itemData={searchResult.businesses}
                navigationRefer={navigation} 
            />
        )
    }
}
