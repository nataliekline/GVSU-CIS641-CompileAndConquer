import { Application, ApplicationData } from "@/models/Application";
import { DocumentData, QuerySnapshot, addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore"

import { ACCOUNT_PATH } from "./AccountStore";
import { db } from '../config/fb-config'

const APPLICATIONS_PATH = "applications";

export function createNewApplication(email: string, application: Application, responseFunction: { (response: any): void; }) {
    const accountRef = doc(db, ACCOUNT_PATH, email);
    const applicationRef = collection(accountRef, APPLICATIONS_PATH)
    addDoc(applicationRef, application)
        .then((responseRef) => {
            console.log("Application Created Succesfully");
            responseFunction(responseRef);
        }).catch((error) => {
            console.log("Error creating a new Application ", error)
        });
}

export function deleteApplication(email: string, applicationId: string, callback: () => void) { 
    const accountRef = doc(db, ACCOUNT_PATH, email);
    const applicationRef = doc (accountRef, APPLICATIONS_PATH, applicationId);
    deleteDoc(applicationRef)
        .then(() => {
            console.log("Application with email", email, "deleted successfully");
            callback();
        }).catch ((error) => {
            console.error("Error deleting application", error);
        });
}

export function updateApplication(email: string, applicationId: any, updatedFields: any, callback: () => void) {
    const accountRef = doc(db, ACCOUNT_PATH, email);
    const applicationRef = doc (accountRef, APPLICATIONS_PATH, applicationId);
    updateDoc(applicationRef, updatedFields)
        .then(() => {
            console.log("Application with id", applicationId, "deleted successfully");
            callback();
        }).catch ((error) => {
            console.error("Error updating application", error);
        });
}

export function getApplication(email: string, applicationId: string, callback: (response: Application) => void) {
    const accountRef = doc(db, ACCOUNT_PATH, email);
    const applicationRef = doc (accountRef, APPLICATIONS_PATH, applicationId);
    getDoc(applicationRef)
        .then((doc) => {
            if (doc.exists()) {
                callback(doc.data() as Application);
            } else {
                console.log("Application does not exists");
            }
        }).catch ((error) => {
            console.error("Error updating application", error);
        });
}

export function setupListenerOverApplications(email: string, callback: (response: ApplicationData[]) => void): () => void {
    const accountRef = doc(db, ACCOUNT_PATH, email);
    const applicationsRef = collection(accountRef, APPLICATIONS_PATH);

    const unsubscribe = onSnapshot(
        applicationsRef,
        (querySnapshot) => {
            const fetchedApplications: ApplicationData[] = [];

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const data = doc.data() as Application;
                    fetchedApplications.push({ ...data, id: doc.id });
                });
            }
            callback(fetchedApplications);
        },
        (error) => {
            console.error(error);
        }
    );

    return unsubscribe;
}

export function getApplicationsForPicker(email:string, callback: (response: any[]) => void) {
    const accountRef = doc(db, ACCOUNT_PATH, email);
    const applicationsRef = collection(accountRef, APPLICATIONS_PATH);

    getDocs(applicationsRef)
    .then((querySnapshot) => {
        const applications: any[] = [];
        querySnapshot.forEach((doc: any) => {
            const application = doc.data() as Application; 
            applications.push({label: application.companyName, value: doc.id})
        });
        callback(applications)
    }).catch((error) => {
        console.error("Could not get applications ", error);
    })
}
