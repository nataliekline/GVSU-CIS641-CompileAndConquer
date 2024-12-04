import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from './Card';

interface KanbanColumnProps {
  title: string;
  cards: { 
    applicationId: string, 
    title: string; 
    company: string, 
    onPress: (applicationId: string) => void 
  }[];
  navigation: any;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, cards, navigation }) => {
  const handlePressApplication = (applicationId: string) => {
    navigation.navigate('NewApplication', { applicationId });
  }

  return (
    <LinearGradient
      colors={['#7AC2FD', '#155080']}
      style={styles.kanbanView}
    >
      <Text style={styles.kanbanViewTitle}>{title}</Text>
      <ScrollView>
        {cards.map((card, index) => (
          <Card 
            key={index} 
            applicationId={card.applicationId}
            title={card.title} 
            company={card.company}
            onPress={handlePressApplication}
          />
        ))}
      </ScrollView>
    </LinearGradient>
  )
};

const styles = StyleSheet.create({
    kanbanView: {
        borderRadius: 12,
        padding: 12,
        marginRight: 8,
        width: 250,
    },
    kanbanViewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
});

export default KanbanColumn;