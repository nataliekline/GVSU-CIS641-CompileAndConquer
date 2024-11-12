import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AppGradient = ({ children }: { children: any }) => {
    return (
        <LinearGradient
        colors={['#7AC2FD', '#155080']}
        style={{flex: 1}}
        >
            <SafeAreaView>{children}</SafeAreaView>
        </LinearGradient>
    )
}

export default AppGradient