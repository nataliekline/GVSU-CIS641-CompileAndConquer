import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from './Card';

interface KanbanColumnProps {
  title: string;
  cards: { title: string; company: string }[]; // Array of card data
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, cards }) => (
  <LinearGradient
    colors={['#7AC2FD', '#155080']}
    style={styles.kanbanView}
  >
    <Text style={styles.kanbanViewTitle}>{title}</Text>
    <ScrollView>
      {cards.map((card, index) => (
        <Card key={index} title={card.title} company={card.company} />
      ))}
    </ScrollView>
  </LinearGradient>
);

const styles = StyleSheet.create({
    kanbanView: {
        borderRadius: 12,
        padding: 12,
        marginRight: 8,
    },
    kanbanViewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
});

export default KanbanColumn;