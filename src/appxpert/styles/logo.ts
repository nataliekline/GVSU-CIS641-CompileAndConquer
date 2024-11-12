import { StyleSheet } from 'react-native';

const logo = StyleSheet.create({
    appText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 2,
        textShadowColor: 'rgba(10, 10, 10, 0.50)', 
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4, 
    },
    xpertText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333333',
        letterSpacing: 2,
        textShadowColor: 'rgba(51, 51, 51, 0.50)',
        textShadowOffset: { width: 0, height: 4 }, 
        textShadowRadius: 2, 
    },
});

export default logo;
