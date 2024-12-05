import AppGradient from "@/components/AppGradient";
import { AccountContext } from "@/context/AccountContext";
import { Application } from "@/models/Application";
import { createNewApplication, deleteApplication, getApplication, updateApplication } from "@/persistence/ApplicationStore";
import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, ScrollView} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button, TextInput } from "react-native-paper";
  
const STATUS_OPTIONS = [
    { label: 'Applied', value: 'Applied' },
    { label: 'Action Required', value: 'Action Required' },
    { label: 'Waiting for Response', value: 'Waiting for Response' },
    { label: 'Offer Received', value: 'Offer Received' },
    { label: 'Rejected', value: 'Rejected' },
]

const FORMAT_OPTIONS = [
    { label: 'In-Person', value: 'In-Person' },
    { label: 'Hybrid', value: 'Hybrid' },
    { label: 'Remote', value: 'Remote' }
]

const SALARY_OPTIONS = [
    { label: 'Less than $50,000', value: 'Less than $50,000' },
    { label: '$50,000 - $74,999', value: '$50,000 - $74,999' },
    { label: '$75,000 - $99,999', value: '$75,000 - $99,999' },
    { label: '$100,000 - $149,999', value: '$100,000 - $149,999' },
    { label: '$150,000 and above', value: '$150,000 and above' }
]

const NewApplication: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const accountContext = useContext(AccountContext);
    const card = route.params?.card || {
        position: "",
        companyName: "",
        status: "",
        dateSubmitted: new Date().toISOString().split('T')[0],
    };

    const [applicationData, setApplicationData] = useState(card);
    const [isFocus, setIsFocus] = useState(false);

    const handleChange = (field: keyof Application, value: string) => {
        setApplicationData((prev: Application) => ({ ...prev, [field]: value }));
    }

    function handleSave() {
        console.log(applicationData);
        if (applicationData.id) {
            updateApplication (accountContext.account.email, applicationData.id, applicationData, () => {
                console.log("Application updated successfully")
                navigation.goBack();
            })
        } else {
            createNewApplication(accountContext.account.email, applicationData, (responseMessage) => {
                console.log("Application created succesfully")
                navigation.goBack();
            });
        }
    }

    const handleDelete = () => {
        console.log(applicationData);
        Alert.alert(
            "Confirm",
            "Are you sure you want to delete this application?",
            [
              {
                text: "Yes",
                onPress: () => {
                    deleteApplication(accountContext.account.email, applicationData.id, () => {
                        console.log("Application deleted Successfully");
                        navigation.goBack();
                    });
                },
              },
              {
                text: "No",
              },
            ]
        );
    }

    useEffect(() => {
        if (route.params?.id) {
            getApplication(accountContext.account.email, route.params.id, (data) => {
                if (data) {
                    setApplicationData(data);
                }
            });
        }
    }, [route.params?.id]);

    return (
        <AppGradient>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.text}>Application Information</Text>
                    <TextInput
                        mode='outlined'
                        theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
                        label="Position"
                        autoCapitalize='none'
                        value= {applicationData.position}
                        onChangeText={(text) => handleChange('position', text)}
                        style={styles.input}
                    />
                    <TextInput
                        mode='outlined'
                        theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
                        label="Company"
                        autoCapitalize='none'
                        value= {applicationData.companyName}
                        onChangeText={(text) => handleChange('companyName', text)}
                        style={styles.input}
                    />
                    <TextInput
                        mode='outlined'
                        theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
                        label="Date Submitted"
                        autoCapitalize='none'
                        value= {applicationData.dateSubmitted}
                        onChangeText={(text) => handleChange('dateSubmitted', text)}
                        style={{marginBottom: 20}}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={STATUS_OPTIONS}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Status' : '...'}
                        value={applicationData.status}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            handleChange('status', item.value)
                            setIsFocus(false);
                        }}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={FORMAT_OPTIONS}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Format' : '...'}
                        value={applicationData.format}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            handleChange('format', item.value)
                            setIsFocus(false);
                        }}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={SALARY_OPTIONS}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Salary' : '...'}
                        value={applicationData.salary}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            handleChange('salary', item.value)
                            setIsFocus(false);
                        }}
                    />
                    <TextInput
                        mode='outlined'
                        theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
                        label="Location"
                        autoCapitalize='none'
                        value= {applicationData.location}
                        onChangeText={(text) => handleChange('location', text)}
                        style={styles.input}
                    />
                    <TextInput
                        mode='outlined'
                        theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
                        label="Link"
                        autoCapitalize='none'
                        value= {applicationData.link}
                        onChangeText={(text) => handleChange('link', text)}
                        style={styles.input}
                    />
                    <View style= {{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={handleSave}>
                                    <Button mode='contained' style={styles.button} labelStyle={styles.buttonLabel}>
                                        {applicationData.id ? 'Update' : 'Create'}
                                    </Button>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Button mode='contained' style={styles.button} labelStyle={styles.buttonLabel}>
                                        Back
                                    </Button>
                                </TouchableOpacity>
                            </View>
                            {applicationData.id && (
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={handleDelete}>
                                        <Button mode='contained' style={styles.button} labelStyle={styles.buttonLabel}>
                                            Delete
                                        </Button>
                                    </TouchableOpacity>
                                </View>
                            )}
                    </View>
                </View>
            </ScrollView>
        </AppGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 40, 
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E4C65',
        paddingBottom: 16,
        paddingTop: 30
    },
    input: {
        marginBottom: 12,
    },
    buttonContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center', 
    },
    button: {
        backgroundColor: '#4D3E3E',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dropdown: {
        height: 50,
        borderColor: '#808080',
        borderWidth: 0.5,
        borderRadius: 4,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        marginBottom: 18,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#2E3130'
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default NewApplication;