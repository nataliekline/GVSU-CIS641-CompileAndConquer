import { DocumentData, addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore"

import { db } from '../config/fb-config'

const APPLICATIONS_PATH = "applications";

export function createNewApplication(applicationObject: { email: string; }, responseFunction: (arg0: void) => void) {
    const docRef = doc(db, APPLICATIONS_PATH, applicationObject.email);
    setDoc(docRef, applicationObject)
        .then((response) => {
            console.log("Application Created Succesfully");
            responseFunction(response);
        }).catch((error) => {
            console.log("Error creating a new Application ", error)
        });
}

export function deleteApplication(email: string, callback: () => void) { 
    const applicationRef = doc (db, APPLICATIONS_PATH, email);
    deleteDoc(applicationRef)
        .then(() => {
            console.log("Application with email", email, "deleted successfully");
            callback();
        }).catch ((error) => {
            console.error("Error deleting application", error);
        });
}

export function updateApplication(applicationId: any, updatedFields: any, callback: () => void) {
    const applicationRef = doc (db, APPLICATIONS_PATH, applicationId);
    updateDoc(applicationRef, updatedFields)
        .then(() => {
            console.log("Application with id", applicationId, "deleted successfully");
            callback();
        }).catch ((error) => {
            console.error("Error updating application", error);
        });
}

export function getApplication(email: string, callback: (arg0: any) => void) {
    const applicationRef = doc (db, APPLICATIONS_PATH, email);
    getDoc(applicationRef)
        .then((doc) => {
            if (doc.exists()) {
                callback(doc.data());
            } else {
                console.log("Application does not exists");
            }
        }).catch ((error) => {
            console.error("Error updating application", error);
        });
}
