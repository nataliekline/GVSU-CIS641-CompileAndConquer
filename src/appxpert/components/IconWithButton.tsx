import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Divider } from 'react-native-paper';

type IoniconsIconNames = 
    | 'person-circle-outline'
    | 'notifications-circle-outline'
    | 'arrow-back-circle-outline'
    | 'close-circle-outline'

interface IconButtonProps {
    icon: IoniconsIconNames;
    label: string;
    onPress: () => void;
  }
  
  const IconButton: React.FC<IconButtonProps> = ({ icon, label, onPress }) => {
    return (
      <>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.iconWithButton]}>
            <Ionicons name={icon} size={20} color={'white'} />
            <Button mode='text' textColor='white' labelStyle={styles.buttonLabel}>
              {label}
            </Button>
          </View>
        </TouchableOpacity>
        <Divider />
      </>
    );
  };

const styles = StyleSheet.create({
    buttonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconWithButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
});

export default IconButton;
