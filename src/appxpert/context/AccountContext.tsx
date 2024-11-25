import React, { ReactNode, createContext, useState } from "react";

import { Account } from "@/models/Account";

interface AccountContextType {
    account: Account;
    setAccountState: (vals: Account) => void;
}

export const initialAccountState: Account = {
    name: "",
    email: "",
    age: "",
    profession: ""
};


export const AccountContext = createContext<AccountContextType>({
    account: initialAccountState,
    setAccountState: () => {},
});

interface AccountContextProviderProps {
    children: ReactNode;
}

export const AccountContextProvider: React.FC<AccountContextProviderProps> = ({ children }) => {
    const [accountState, setAccountState] = useState(initialAccountState);

    const updateAccountStateObject = (vals: Account) => {
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