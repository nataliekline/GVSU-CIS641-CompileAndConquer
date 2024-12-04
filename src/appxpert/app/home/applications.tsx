import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from "react-native";
import logoStyles from '../../styles/logo';
import { Ionicons } from '@expo/vector-icons';
import KanbanColumn from "@/components/KanbanColumn";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "@/context/AccountContext";
import { ApplicationData } from "@/models/Application";
import { setupListenerOverApplications } from "@/persistence/ApplicationStore";

const Applications: React.FC<{ navigation: any }> = ({navigation}) => {
    const accountContext = useContext(AccountContext); 
    const [applicationsData, setApplicationsData] = useState<ApplicationData[]>([]);

    const backlogCards: { applicationId: string; title: string; company: string; onPress: (id: string) => void }[] = [];
    const appliedCards: { applicationId: string; title: string; company: string; onPress: (id: string) => void }[] = [];
    const actionCards: { applicationId: string; title: string; company: string; onPress: (id: string) => void }[] = [];
    const waitingCards: { applicationId: string; title: string; company: string; onPress: (id: string) => void }[] = [];
    const offerCards: { applicationId: string; title: string; company: string; onPress: (id: string) => void }[] = [];
    const rejectedCards: { applicationId: string; title: string; company: string; onPress: (id: string) => void }[] = [];    

    const handlePressApplication = (applicationId: string) => {
        navigation.navigate('NewApplication', { applicationId: applicationId });
    }

    useEffect(() => {
        const unsubscribe = setupListenerOverApplications(
            accountContext.account.email,
            (response: ApplicationData[]) => {
                setApplicationsData(response);
                console.log("Real-time applications:", response);
            }
        );
        return () => unsubscribe();
    }, []);

    applicationsData.forEach((application) => {
        const card = { 
            applicationId: application.id, 
            title: application.position, 
            company: application.companyName,
            onPress: handlePressApplication,
        };
    
        if (application.status === "Opportunities") {
            backlogCards.push(card);
        } else if (application.status === "Applied") {
            appliedCards.push(card);
        } else if (application.status === "Action Required") {
            actionCards.push(card);
        } else if (application.status === "Waiting for Response") {
            waitingCards.push(card);
        } else if (application.status === "Offer Received") {
            offerCards.push(card);
        } else if (application.status === "Rejected") {
            rejectedCards.push(card);
        }
    });

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
            <ScrollView horizontal contentContainerStyle={styles.kanbanContainer}>
                <KanbanColumn title="Opportunities" cards={backlogCards} navigation={navigation} />
                <KanbanColumn title="Applied" cards={appliedCards} navigation={navigation} />
                <KanbanColumn title="Action Required" cards={actionCards} navigation={navigation}/>
                <KanbanColumn title="Waiting for Response" cards={waitingCards} navigation={navigation}/>
                <KanbanColumn title="Offer Received" cards={offerCards} navigation={navigation}/>
                <KanbanColumn title="Rejected" cards={rejectedCards} navigation={navigation}/>
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