import AppGradient from '@/components/AppGradient';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, Text } from 'react-native';

const BackgroundScreen = () => {
  return (
    <AppGradient>
        <SafeAreaView>
            <Text style={{paddingTop: 40}}>Finally Working Woohoo!</Text>
        </SafeAreaView>
    </AppGradient>
  )
};

export default BackgroundScreen;
