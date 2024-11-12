import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AppGradient = ({ children }: { children: any }) => {
    return (
        <LinearGradient
        colors={['#7AC2FD', '#155080']}
        style={{flex: 1}}
        >
            <View style={{flex: 1}}>{children}</View>
        </LinearGradient>
    )
}

export default AppGradient