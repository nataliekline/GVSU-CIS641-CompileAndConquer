import { AccountContext } from "@/context/AccountContext";
import { LinearGradient } from 'expo-linear-gradient';
import logoStyles from '../../styles/logo';
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useApplicationContext } from "@/context/ApplicationContext";

const Dashboard = () => {
    const accountContext = useContext(AccountContext);
    const { appliedCards, actionCards, waitingCards, offerCards, rejectedCards, countApplicationsSubmittedThisWeek, totalApplications } = useApplicationContext();

    const [applicationsThisWeek, setApplicationsThisWeek] = useState(0);

    const successRate = (actionCards.length + waitingCards.length + offerCards.length) === 0 
    ? 0 : Math.round(((actionCards.length + waitingCards.length + offerCards.length) / totalApplications) * 100);

    const inReviewRate = appliedCards.length === 0 
    ? 0 : Math.round((appliedCards.length / totalApplications) * 100);

    const rejectedRate = rejectedCards.length === 0 
    ? 0 : Math.round((rejectedCards.length / totalApplications) * 100);

    useEffect(() => {
        setApplicationsThisWeek(countApplicationsSubmittedThisWeek());
    }, [appliedCards, actionCards, waitingCards, offerCards, rejectedCards]);

    return (
        <SafeAreaView>
            <View style={styles.logoContainer}>
                <Text style={{...logoStyles.appText, color: '#7AC2FD'}}>App</Text>
                <Text style={logoStyles.xpertText}>Xpert</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.welcomeText}>Hi {accountContext.account.name}!</Text>

                <View style={styles.sentenceContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.regularPaddingText}>{"This week you submitted "}</Text>
                        <LinearGradient
                            colors={['#7AC2FDA3', '#497497A3']}
                            style={styles.circleGradient}
                        >
                            <Text style={styles.circleText}>{applicationsThisWeek}</Text>
                        </LinearGradient>
                        <Text style={styles.regularPaddingText}>{applicationsThisWeek === 1 ? " application" : " applications"}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.regularPaddingText}>{"and had "}</Text>
                        <LinearGradient
                            colors={['#7AC2FDA3', '#497497A3']}
                            style={styles.circleGradient}
                        >
                            <Text style={styles.circleText}>0</Text>
                        </LinearGradient>
                        <Text style={styles.regularPaddingText}>{" company-related events."}</Text>
                    </View>
                </View>

                <Text style={styles.regularPaddingText}>Great work!</Text>
                <Text style={styles.overallText}>Overall</Text>

                <View style={styles.container}>
                    <View style={styles.leftCircle}>
                        <LinearGradient
                        colors={['#D0CDC7', '#6A6865']}
                        style={styles.bigCircles}
                        >
                        <Text style={styles.bubbleText}>In Review</Text>
                        <Text style={styles.text}>{inReviewRate}%</Text>
                        </LinearGradient>
                    </View>
                    <View style={styles.middleCircle}>
                        <LinearGradient
                        colors={['#7AC2FD', '#2E4C65']}
                        style={styles.bigCircles}
                        >
                        <Text style={styles.bubbleText}>Success Rate</Text>
                        <Text style={styles.successText}>{successRate}%</Text>
                        </LinearGradient>
                    </View>
                    <View style={styles.rightCircle}>
                        <LinearGradient
                        colors={['#D0CDC7', '#6A6865']}
                        style={styles.bigCircles}
                        >
                        <Text style={styles.bubbleText}>Rejected</Text>
                        <Text style={styles.text}>{rejectedRate}%</Text>
                        </LinearGradient>
                    </View>
                </View>

                <View style={styles.footerContainer}>
                    <View style={styles.textRow}>
                        <Text style={styles.boldText}>Average Time of Response: </Text>
                        <Text style={styles.regularText}>Unknown</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.boldText}>Total Applications Submitted: </Text>
                        <Text style={styles.regularText}>{totalApplications}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 32,
    },
    bodyContainer: {
        padding: 40,
    },
    textRow: {
        flexDirection: 'row',
        padding: 8,
    },
    footerContainer: {
        paddingTop: 32,
    },
    boldText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    regularText: {
        fontSize: 16,
    },
    regularPaddingText: {
        fontSize: 16,
        paddingVertical: 8,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 32,
    },
    overallText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 32,
    },
    sentenceContainer: {
        paddingVertical: 8,
    },
    circleGradient: {
        width: 22,
        height: 22, 
        borderRadius: 12,
        marginTop: 6,
        justifyContent: 'center',
    },
    circleText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16, 
        textAlign: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
      },
    middleCircle: {
        width: 130,
        height: 130,
        borderRadius: 65,
        overflow: 'hidden',
        position: 'relative',
        marginHorizontal: 10,
        transform: [{ translateY: -50 }],
    },
    leftCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        marginHorizontal: 10,
        marginRight: -22,
    },
    rightCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        marginHorizontal: 10,
        marginLeft: -22,
    },
    bigCircles: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubbleText: {
        color: 'black',
        fontSize: 12,
        paddingBottom: 8,
    },
    text: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
    },
    successText: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
        paddingBottom: 8,
    },
});

export default Dashboard;