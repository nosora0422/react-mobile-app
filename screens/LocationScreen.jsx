import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonGroup from '../components/ButtonGroup';
import myStyles from '../style/styleSheet';


export default function LocationScreen({ navigation }){

    const [timeValue, setTimeValue] = useState(0);
    const locationList = ['Vancouver', 'Burnaby', 'Richmond', 'Coquitlam'];
    const [unixTime, setUnixTime] = useState(0);

    useEffect(() => {
        // Calculate current hour and set it to timeValue
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        setTimeValue(currentHour * 60 * 60);
    }, []);

    useEffect(() => {
        calculateUnixTime(timeValue);
    }, [timeValue]);

    const calculateUnixTime = (selectedTime) => {
        const currentDate = new Date();
        currentDate.setHours(Math.floor(selectedTime / 3600), Math.floor((selectedTime % 3600) / 60), 0, 0);
        const unixTime = Math.floor(currentDate.getTime() / 1000);
        setUnixTime(unixTime);
    };

    // console.log(unixTime);

    const handleTimeChange = (selectedValue) => {
        // Update the time value state variable
        setTimeValue(selectedValue);
        // Calculate and update the Unix time based on the selected time
        calculateUnixTime(selectedValue);
    };

    //label is what users see and value is what the actually store in state.
    const firstDrop = [
        { value: 24 * 60 * 60, label: '12 a.m.' },
        { value: 23 * 60 * 60, label: '11 p.m.' },
        { value: 22 * 60 * 60, label:'10 p.m.' },
        { value: 21 * 60 * 60, label: '9 p.m.' },
        { value: 20 * 60 * 60, label: '8 p.m.' },
        { value: 19 * 60 * 60, label: '7 p.m.' },
        { value: 18 * 60 * 60, label: '6 p.m.' },
        { value: 17 * 60 * 60, label: '5 p.m.' },
        { value: 16 * 60 * 60, label: '4 p.m.' },
        { value: 15 * 60 * 60, label: '3 p.m.' },
        { value: 14 * 60 * 60, label: '2 p.m.' },
        { value: 13 * 60 * 60, label: '1 p.m.' },
        { value: 12 * 60 * 60, label: '12 a.m.' },
        { value: 11 * 60 * 60, label: '11 a.m.' },
        { value: 10 * 60 * 60, label: '10 a.m.' },
        { value: 9 * 60 * 60, label: '9 a.m.' },
        { value: 8 * 60 * 60, label: '8 a.m.' },
        { value: 7 * 60 * 60, label: '7 a.m.' },
        { value: 6 * 60 * 60, label: '6 a.m.' },
        { value: 5 * 60 * 60, label: '5 a.m.' },
        { value: 4 * 60 * 60, label: '4 a.m.' },
        { value: 3 * 60 * 60, label: '3 a.m.' },
        { value: 2 * 60 * 60, label: '2 a.m.' },
        { value: 1 * 60 * 60, label: '1 a.m.' },
    ];
    

    return (
        <ScrollView style={myStyles.backgroundContainer}>
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={myStyles.background}
            />
            <View style={myStyles.container}>
                <View style={{flexDirection:'row'}}>
                    <Text h1>Hello </Text>
                    {/* will add prop to pass user name from onboarding later on */}
                    <Text h2>Sora</Text>
                    <Text h1>,</Text>
                </View>
                <Text h3>Looking for a place for tonight?</Text>
                <View style={myStyles.inputInfo}>
                    <Text style={{paddingHorizontal: 8}}>Until what time do you want to stay?</Text>
                    <View style={myStyles.inputBox}>
                            <Dropdown
                                style={myStyles.timeDropdown}
                                placeholderStyle={{color: '#ffffff'}}
                                activeColor='#5b5b5b'
                                selectedTextStyle={{color: '#ffffff'}}
                                containerStyle={{ backgroundColor: '#000000'}}
                                itemTextStyle={{ color: '#ffffff'}}
                                data={firstDrop}
                                value={timeValue}
                                placeholder='9:00'
                                labelField="label"
                                valueField="value"
                                onChange={item => {
                                    handleTimeChange(item.value);
                                }} 
                            />
                        </View>
                </View>
                
                <View>
                    <ButtonGroup 
                        buttonList={locationList} 
                        navigationRefer={navigation}
                        isCategory={false}
                        selectedTime={unixTime}
                    />
                </View>
            </View>
        </ScrollView>
    )
}
