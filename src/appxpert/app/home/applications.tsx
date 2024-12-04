import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from "react-native";
import logoStyles from '../../styles/logo';
import { Ionicons } from '@expo/vector-icons';
import KanbanColumn from "@/components/KanbanColumn";
import { RootStackParamList } from "../app";
import { StackScreenProps } from '@react-navigation/stack';
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "@/context/AccountContext";
import { ApplicationData } from "@/models/Application";

type ApplicationsScreenProps = StackScreenProps<RootStackParamList, 'ApplicationsHome'>;

const Applications: React.FC<ApplicationsScreenProps> = ({navigation}) => {
    const accountContext = useContext(AccountContext); 
    const [applications, setApplications] = useState<ApplicationData[]>([]);
    const [applicationsData, setApplicationsData] = useState<Record<string, ApplicationData[]>>({});

    const backlogCards = [
        { title: "Software Engineer", company: "Google" },
        { title: "Frontend Engineer", company: "Microsoft" },
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

    const actionCards = [
        { title: "Software Engineer", company: "Google" },
        { title: "Software Engineer", company: "Microsoft" },
        { title: "Software Engineer", company: "Amazon" },
    ];

    const waitingCards = [
        { title: "Software Engineer", company: "Google" },
        { title: "Software Engineer", company: "Microsoft" },
        { title: "Software Engineer", company: "Amazon" },
    ];

    const offerCards = [
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
                    <TouchableOpacity onPress={() => navigation.navigate('NewApplication')}>
                        <Ionicons name={'add-outline'} size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {console.log('Future work')}}>
                        <Ionicons name={'search-outline'} size={18}/>
                    </TouchableOpacity>
                </View>
            </View>
            {applications.length > 0 ? (
                <FlatList
                    data={applications}
                    keyExtractor = {(item) => item.id}
                    renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {}}>
                        <View>
                            <Text>{item.applicationId} - {item.position}</Text>
                            <Text>{item.salary}</Text>
                        </View>
                    </TouchableOpacity>
                    )}
                />
                ) : (
                <Text>No applications</Text>
            )}
            <ScrollView horizontal contentContainerStyle={styles.kanbanContainer}>
                <KanbanColumn title="Opportunities" cards={backlogCards} />
                <KanbanColumn title="Applied" cards={appliedCards} />
                <KanbanColumn title="Action Required" cards={actionCards} />
                <KanbanColumn title="Waiting for Response" cards={waitingCards} />
                <KanbanColumn title="Offer Received" cards={offerCards} />
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