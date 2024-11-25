import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { AccountContext } from "@/context/AccountContext";
import { LinearGradient } from 'expo-linear-gradient';
import logoStyles from '../../styles/logo';
import { useContext } from "react";

const Dashboard = () => {
    const accountContext = useContext(AccountContext);

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
                            <Text style={styles.circleText}>3</Text>
                        </LinearGradient>
                        <Text style={styles.regularPaddingText}>{" applications"}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.regularPaddingText}>{"and had "}</Text>
                        <LinearGradient
                            colors={['#7AC2FDA3', '#497497A3']}
                            style={styles.circleGradient}
                        >
                            <Text style={styles.circleText}>5</Text>
                        </LinearGradient>
                        <Text style={styles.regularPaddingText}>{" company-related events."}</Text>
                    </View>
                </View>

                <Text style={styles.regularPaddingText}>Great work!</Text>
                <Text style={styles.overallText}>Overall</Text>

                {/* Delete Me */}
                <View style={{justifyContent: 'center', alignContent: 'center', height: 175}}>
                    <Text>Chart goes here, delete me after!</Text>
                </View>
                {/* Delete Me */}

                <View style={styles.footerContainer}>
                    <View style={styles.textRow}>
                        <Text style={styles.boldText}>Average Time of Response: </Text>
                        <Text style={styles.regularText}>20 days</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.boldText}>Total Applications Submitted: </Text>
                        <Text style={styles.regularText}>58</Text>
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
});

export default Dashboard;