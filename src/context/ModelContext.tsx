import { createContext, ReactNode, useState } from "react";

interface ModelContextType {
    open: boolean;
    toggle: () => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

const ModelProvider = ({children}:{children:ReactNode})=>{
    const [open,setOpen] = useState<boolean>(false);

    const toggle=()=>setOpen(e=>!e);

    return (
    <ModelContext.Provider value={{ open,toggle }}>
        {children}
    </ModelContext.Provider>
    );
}

export { ModelContext, ModelProvider }; 