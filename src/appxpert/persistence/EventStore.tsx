import { DocumentData, addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore"
import { Event, EventData } from "@/models/Event";

import { ACCOUNT_PATH } from "./AccountStore";
import { db } from '../config/fb-config'

export const EVENT_PATH = "events";

export function createNewEvent(email:string, event:Event , responseFunction: { (response: any): void;}) {
    const accountRef = doc(db, ACCOUNT_PATH, email);
    const eventRef = collection(accountRef, EVENT_PATH);
    addDoc(eventRef, event)
    .then((responseRef) => {
        responseFunction(responseRef);
    }).catch((error) => {
        console.error("Error creating new event", error);
    });
}

export function deleteEvent(email:string, eventId: string, callback: () => void) {
    const accountRef = doc(db, ACCOUNT_PATH, email);
    const eventRef = doc(accountRef, EVENT_PATH, eventId);
    deleteDoc(eventRef)
        .then(() => {
            console.log("Event with id", eventId, "deleted successfully");
            callback();
        }).catch ((error) => {
            console.error("Error deleting event", error);
        });
}

export function updateAccount(email:string, eventId: string, updatedFields: any, callback: () => void) {
    const accountRef = doc(db, ACCOUNT_PATH, email);
    const eventRef = doc(accountRef, EVENT_PATH, eventId);
    updateDoc(eventRef, updatedFields)
        .then(() => {
            console.log("Account with email", email, "updated successfully");
            callback();
        }).catch ((error) => {
            console.error("Error updating account", error);
        });
}

export function getEvent(email:string, eventId: string, callback: (response: any) => void) {
    const accountRef = doc (db, ACCOUNT_PATH, email);
    const eventRef = doc(accountRef, EVENT_PATH, eventId);
    getDoc(eventRef)
    .then((doc) => {
        if (doc.exists()) {
            callback(doc.data());
        } else {
            console.log("Account does not exists");
        }
    }).catch ((error) => {
        console.error("Error updating account", error);
    });
}

export function setupListenerOverEvents(email: string , callback: (response: Record<string, EventData[]>) => void){
    const accountRef = doc(db, ACCOUNT_PATH, email);
    const subCollectionRef = collection(accountRef, EVENT_PATH);
    const unsubscribe = onSnapshot(subCollectionRef, (querySnapshot) => {
        const fetchedEvents: Record<string, EventData[]> = {};
        if (!querySnapshot.empty) {
            const results: any[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data() as Event;
                const date = data.date;
        
                if (!fetchedEvents[date]) {
                    fetchedEvents[date] = [];
                }
                fetchedEvents[date].push({ ...data, id: doc.id });
            });
        } 
        callback(fetchedEvents);
    },(error) => {
        console.error(error)
    });

    return unsubscribe;
}
