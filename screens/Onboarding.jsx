import { View, Image } from "react-native";
import { Button, Text } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';

import myStyles from '../style/styleSheet';

export default function OnBoarding({ setShowOnboarding }){
    
    return (
        <View style={myStyles.backgroundContainer}>
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={myStyles.background}
            />
            
            <View style={myStyles.onBoardingContainer}>
                <View>
                    <Image 
                        source={require('../assets/example-logo.png')}
                        style={{width: 200, height: 150,}}
                    />
                </View>
                <Text h1>Welcome!</Text>
                <View style={{paddingTop: 50,}}>
                    <Button 
                        title="Let's start"
                        onPress={() => setShowOnboarding(false)}
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
            </View>
        </View>
    )
}