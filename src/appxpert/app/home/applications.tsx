import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import logoStyles from '../../styles/logo';
import { Ionicons } from '@expo/vector-icons';
import KanbanColumn from "@/components/KanbanColumn";

const Applications = () => {
    const toDoCards = [
        { title: "Software Engineer", company: "Google" },
        { title: "Software Engineer", company: "Microsoft" },
        { title: "Software Engineer", company: "Amazon" },
        { title: "Software Engineer", company: "Google" },
        { title: "Software Engineer", company: "Microsoft" },
        { title: "Software Engineer", company: "Amazon" },
        { title: "Software Engineer", company: "Google" },
        { title: "Software Engineer", company: "Microsoft" },
        { title: "Software Engineer", company: "Amazon" },
    ];
    
    const appliedCards = [
        { title: "Software Engineer", company: "Google" },
        { title: "Software Engineer", company: "Microsoft" },
        { title: "Software Engineer", company: "Amazon" },
        { title: "Software Engineer", company: "Google" },
        { title: "Software Engineer", company: "Microsoft" },
    ];

    const inProgressCards = [
        { title: "Software Engineer", company: "Google" },
        { title: "Software Engineer", company: "Microsoft" },
        { title: "Software Engineer", company: "Amazon" },
    ];

    const rejectedCards = [
        { title: "Software Engineer", company: "Google" },
        { title: "Software Engineer", company: "Microsoft" },
        { title: "Software Engineer", company: "Amazon" },
        { title: "Software Engineer", company: "Google" },
        { title: "Software Engineer", company: "Microsoft" },
        { title: "Software Engineer", company: "Amazon" },
        { title: "Software Engineer", company: "Google" },
        { title: "Software Engineer", company: "Microsoft" },
        { title: "Software Engineer", company: "Amazon" },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={{...logoStyles.appText, color: '#7AC2FD'}}>App</Text>
                <Text style={logoStyles.xpertText}>Xpert</Text>
            </View>
            <View style={styles.introContainer}>
                <Text style={styles.applicationsText}>Applications</Text>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={() => {console.log('Future work')}}>
                        <Ionicons name={'add-outline'} size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {console.log('Future work')}}>
                        <Ionicons name={'search-outline'} size={18}/>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView horizontal contentContainerStyle={styles.kanbanContainer} style={{ flex: 1 }}>
                <KanbanColumn title="To Do" cards={toDoCards} />
                <KanbanColumn title="Applied" cards={appliedCards} />
                <KanbanColumn title="In Progress" cards={inProgressCards} />
                <KanbanColumn title="Rejected" cards={rejectedCards} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 32,
    },
    introContainer: {
        paddingVertical: 24,
        paddingHorizontal: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    applicationsText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    kanbanContainer: {
        paddingBottom: 16,
        flexDirection: 'row',
        width: 'auto',
    },
});

export default Applications;