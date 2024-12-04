import React, { createContext, useContext, useState, ReactNode } from 'react';

type ApplicationContextType = {
    totalApplications: number;
    setTotalApplications: React.Dispatch<React.SetStateAction<number>>;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [totalApplications, setTotalApplications] = useState<number>(0);

    return (
        <ApplicationContext.Provider value={{ totalApplications, setTotalApplications }}>
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
