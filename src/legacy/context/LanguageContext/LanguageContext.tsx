import React, {createContext, useState} from 'react';

export const LanguageContext = createContext<any>({theme: 'eng', undefined})


export const LanguageProvider: React.FC<any> = ({children}:any) => {
    const [language, setLanguage] = useState('Ru')

    return <LanguageContext.Provider value={{language , setLanguage}}>
        {children}
    </LanguageContext.Provider>
}
