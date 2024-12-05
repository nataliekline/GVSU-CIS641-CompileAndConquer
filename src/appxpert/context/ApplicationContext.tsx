import React, { createContext, useContext, useState, ReactNode } from 'react';

type ApplicationContextType = {
    appliedCards: any[];
    actionCards: any[];
    waitingCards: any[];
    offerCards: any[];
    rejectedCards: any[];
    totalApplications: number;
    setCards: (cards: any[]) => void;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [appliedCards, setAppliedCards] = useState<any[]>([]);
    const [actionCards, setActionCards] = useState<any[]>([]);
    const [waitingCards, setWaitingCards] = useState<any[]>([]);
    const [offerCards, setOfferCards] = useState<any[]>([]);
    const [rejectedCards, setRejectedCards] = useState<any[]>([]);

    const totalApplications = appliedCards.length 
        + actionCards.length 
        + waitingCards.length 
        + offerCards.length 
        + rejectedCards.length;

    const setCards = (cards: any[]) => {
        setAppliedCards([]);
        setActionCards([]);
        setWaitingCards([]);
        setOfferCards([]);
        setRejectedCards([]);
        
        cards.forEach((card) => {
            if (card.status === "Applied") {
                setAppliedCards((prev) => [...prev, card]);
            } else if (card.status === "Action Required") {
                setActionCards((prev) => [...prev, card]);
            } else if (card.status === "Waiting for Response") {
                setWaitingCards((prev) => [...prev, card]);
            } else if (card.status === "Offer Received") {
                setOfferCards((prev) => [...prev, card]);
            } else if (card.status === "Rejected") {
                setRejectedCards((prev) => [...prev, card]);
            }
        });
    };

    return (
        <ApplicationContext.Provider value={{
            appliedCards,
            actionCards,
            waitingCards,
            offerCards,
            rejectedCards,
            totalApplications,
            setCards,
        }}>
            {children}
        </ApplicationContext.Provider>
    );
};

export const useApplicationContext = (): ApplicationContextType => {
    const context = useContext(ApplicationContext);
    if (!context) {
        throw new Error('useApplicationContext must be used within an ApplicationProvider');
    }
    return context;
};
