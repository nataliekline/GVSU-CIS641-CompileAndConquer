import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';

interface CardProps {
    applicationId: string;
    title: string;
    company: string;
    onPress: (applicationId: string) => void;
}

const Card: React.FC<CardProps> = ({ applicationId, title, company, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(applicationId)}>
        <View style={styles.cardContainer}>
            <View>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardCompany}>{company}</Text>
            </View>
            <Octicons name="chevron-right" size={16} color="black" />
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 225,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardCompany: {
        fontSize: 12,
        color: '#6b7280',
    },
});

export default Card;