import { StyleSheet } from 'react-native';

const myStyles = StyleSheet.create({
    backgroundContainer:{
        height: '100%',
        backgroundColor:'#2F2F2F',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    onBoardingContainer:{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 24,
        paddingBottom:100,
    },
    container:{
        marginHorizontal: 24,
        paddingBottom:100,
    },
    timeDropdown:{
        padding: 8,
        width: '100%',
    },
    dropdown: {
        height:40,
        marginVertical:4,
        width: 100,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    inputInfo:{
        marginVertical: 22,
        padding: 8,
        borderRadius:12,
        borderColor: '#404040',
        borderWidth: 1,
    },
    inputBox:{
        marginTop: 8,
        borderRadius: 8,
        backgroundColor:'#000000',
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        color: '#ffffff'
    },
    input:{
        padding: 8,
        color: '#ffffff',
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    timePlaceDisplay:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    location:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    slide:{
        flexDirection: 'row',
        height:200,
    },
    slideItem:{
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 12, 
    },
    carouselImg:{
        width: '100%',
        height: 200,
        objectFit: 'cover',
        borderRadius: 12,
    },
    detailList:{
        flexDirection: 'column',
        gap: 8,
        padding: 12,
        marginVertical: 30,
    },
    detailListItem:{
        flexDirection: 'row',
    },
    hoursBox:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerBox:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    flatList:{
        // minHeight: 2000,
        flexGrow: 1,
        paddingBottom: 100,
    },

})

export default myStyles;