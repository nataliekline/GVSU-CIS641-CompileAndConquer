import React, { ReactNode, createContext, useState } from "react";

interface AccountContextType {
    account: AccountType;
    setAccountState: (vals: Partial<typeof initialAccountState>) => void;
}

export const initialAccountState: AccountType = {
    name: "",
    email: "",
    age: "",
    profession: ""
};

export interface AccountType {
    name: string;
    email: string;
    age: string;
    profession: string;
}

export const AccountContext = createContext<AccountContextType>({
    account: initialAccountState,
    setAccountState: () => {},
});

interface AccountContextProviderProps {
    children: ReactNode;
}

export const AccountContextProvider: React.FC<AccountContextProviderProps> = ({ children }) => {
    const [accountState, setAccountState] = useState(initialAccountState);

    const updateAccountStateObject = (vals: Partial<typeof initialAccountState>) => {
        setAccountState((prevState) => ({
            ...prevState,
            ...vals,
        }));
    };

    const value: AccountContextType = {
        account: accountState,
        setAccountState: updateAccountStateObject,
    };

    return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};