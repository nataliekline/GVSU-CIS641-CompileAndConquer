import { DocumentData, addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore"

import { Account } from "@/models/Account";
import { db } from '../config/fb-config'

const ACCOUNT_PATH = "accounts";

export function createNewAccount(accountObject: { name: string; email: string; }, responseFunction: { (response: any): void; (arg0: void): void; }) {
    console.log("llega esto", accountObject);
    const docRef = doc(db, ACCOUNT_PATH, accountObject.email.toString());
    setDoc(docRef, accountObject)
        .then((response) => {
            console.log("Account Created Succesfully");
            responseFunction(response);
        }).catch((error) => {
            console.log("Error creating a new Account ", error)
        });
}

export function deleteAccount(email: string, callback: () => void) {
    const accountRef = doc (db, ACCOUNT_PATH, email);
    deleteDoc(accountRef)
        .then(() => {
            console.log("Account with email", email, "deleted successfully");
            callback();
        }).catch ((error) => {
            console.error("Error deleting account", error);
        });
}

export function updateAccount(email: string, updatedFields: any, callback: () => void) {
    const accountRef = doc (db, ACCOUNT_PATH, email);
    updateDoc(accountRef, updatedFields)
        .then(() => {
            console.log("Account with email", email, "updated successfully");
            callback();
        }).catch ((error) => {
            console.error("Error updating account", error);
        });
}

export function getAccount(email: string, callback: (response: any) => void) {
    const accountRef = doc (db, ACCOUNT_PATH, email);
    getDoc(accountRef)
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

export function setupListenerOverAccount(email: string , updateFunc: (account : Account) => void){
    const unsub = onSnapshot(doc(db, ACCOUNT_PATH, email), (doc) => {
        const acccountResponse = doc.data() as Account
        updateFunc(acccountResponse);
    }, (error) => {
        console.error(error);
    });
}


