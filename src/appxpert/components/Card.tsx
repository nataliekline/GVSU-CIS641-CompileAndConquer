import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';

interface CardProps {
    title: string;
    company: string;
}

const Card: React.FC<CardProps> = ({ title, company }) => {
  return (
    <TouchableOpacity onPress={() => {console.log('Future Work')}}>
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