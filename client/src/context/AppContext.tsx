import { createContext, useContext, useState } from "react";

// Add Typing
export interface AppContextType {
	life: number;
	setLife: React.Dispatch<React.SetStateAction<number>>;
    story:number;
    setStory:React.Dispatch<React.SetStateAction<number>>;
	comPoints:number;
	setComPoints:React.Dispatch<React.SetStateAction<number>>;
	inventory:number[];
	setInventory:React.Dispatch<React.SetStateAction<number[]>>;
}

interface AppProviderProps {
	children: React.ReactNode;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: AppProviderProps) {
	//States you want to pass in the context
	const [life, setLife] = useState<number>(100);
    const [story, setStory] = useState<number>(0);
	const [comPoints, setComPoints] = useState<number>(0)
	const [inventory, setInventory] = useState<number[]>([])

	return (
		<AppContext.Provider value={{ life, setLife, story, setStory, comPoints, setComPoints, inventory, setInventory }}>
			{children}
		</AppContext.Provider>
	);
}

// Call this custom hook to safely consume the context in your components
export function useAppContext() {
	const context = useContext(AppContext);
	if (context === null) {
		throw new Error("Context is null");
	}
	return context;
}
