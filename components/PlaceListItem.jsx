import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Icon } from '@rneui/themed';

export default function PlaceListItem({ itemData, navigationRefer, isLast }){
    return (
        <View>
            {itemData.map( item => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => navigationRefer.navigate('Details', {
                        placeId: item.id,
                        data: item, 
                    })
                    }
                >
                    <View style={isLast ? myStyles.cardContainer100 : myStyles.cardContainer}>
                        {/* if no image registered, display yelp logo */}
                        <Image 
                            source={item.image_url === '' ? require('../assets/yelp_logo.jpg') : {uri: item.image_url}}
                            style={myStyles.cardImge}
                        />
                        <View style={myStyles.chipWrapper}>
                            <Text style={myStyles.chip}>&#9733; {item.rating}</Text>
                        </View>
                        <View style={myStyles.cardName}>
                            <View style={{width: 250,}}>
                                <Text h4>{item.name}</Text>
                            </View>
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
            ))}
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
    cardContainer100:{
        position: 'relative',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding:8,
        marginBottom: 100,
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
    chipWrapper:{
        position: 'absolute', 
        top:20, 
        left: 20,
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
