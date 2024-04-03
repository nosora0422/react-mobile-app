import { createTheme } from '@rneui/themed';

const themePalette = {
    primary: '#A6FF96',
    secondery: '#383838',
    ternery: '#F8FF95',
    button:'#ffffff',
    outline:'#404040',
    onDark:'#ffffff',
    darkContainer:'#2E2E2E',
    inputContainer:'#1a1a1a',
}

export const darkTheme = createTheme({    
    components: {
        Button: {
            buttonStyle: {
                width: '100%',
                display: 'flex',
                alignItems:'center',
                justifyContent: 'space-between',
                raised: true,
                borderRadius: 12,
                backgroundColor: themePalette.button,
                paddingVertical: 4,
            },
            titleStyle: {
                color: themePalette.secondery,
                fontSize: 48,
                fontWeight:'normal',
                fontFamily: 'Archivo_200ExtraLight',
                textAlign: 'left',
            },
            icon: {
                color: themePalette.secondery,
            },
            type: 'clear',
        },
        Text: {
            h1Style: {
                color: themePalette.onDark,
                fontSize:48,
                fontWeight:'normal',
                fontFamily: 'Archivo_200ExtraLight',
            },
            h2Style: {
                color: themePalette.primary,
                fontSize: 48,
                fontWeight:'normal',
                fontFamily: 'Archivo_700Bold',
            },
            h3Style: {
                color: themePalette.onDark,
                fontSize: 18,
                fontWeight:'normal',
                fontFamily: 'Archivo_200ExtraLight',
            },
            h4Style: {
                color: themePalette.secondery,
                fontSize: 24,
                fontWeight:'normal',
                fontFamily: 'Archivo_200ExtraLight',
            },
            style: {
                color: themePalette.onDark,
                fontSize: 16,
                fontWeight:'normal',
                fontFamily: 'Archivo_300Light',
            }
        },      
        FAB: {
            buttonStyle: {
                raised: true,
                borderRadius: 15,
                backgroundColor: "#75C2F6",
            },
            titleStyle: {
                color: themePalette.alternate,
            },
            icon: {
                color: themePalette.alternate,            
            },
            style:{
                position: 'absolute',
                bottom: 80,
                right: 24,
            },
            type: 'clear',
        },
        ButtonGroup : {
            containerStyle:{
                height: 32,
                width: 600,
                backgroundColor: 'transparent',
                borderWidth: 0,
            },
            buttonContainerStyle:{
                borderRadius: 30,
                marginRight: 8,
                borderWidth: 1,
                borderColor: themePalette.outline,
            },
            selectedButtonStyle:{
                borderRadius: 30,
                backgroundColor: themePalette.primary,
            },
            selectedTextStyle:{
                color: themePalette.secondery,
            },
            textStyle: {
                color: themePalette.onDark,
            }
        },
    },


});