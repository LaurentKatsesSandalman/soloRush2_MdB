import { createContext, useContext, useState } from "react";

// Add Typing
export interface AppContextType {
	life: number;
	MAX_LIFE: number;
	setLife: React.Dispatch<React.SetStateAction<number>>;
	story: number;
	setStory: React.Dispatch<React.SetStateAction<number>>;
	comPoints: number;
	setComPoints: React.Dispatch<React.SetStateAction<number>>;
	inventory: number[];
	setInventory: React.Dispatch<React.SetStateAction<number[]>>;
	lastEvent:string;
	setLastEvent: React.Dispatch<React.SetStateAction<string>>;
}

interface AppProviderProps {
	children: React.ReactNode;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: AppProviderProps) {
	//States you want to pass in the context
	const MAX_LIFE = 100
	const [life, setLife] = useState<number>(MAX_LIFE);
	const [story, setStory] = useState<number>(0);
	const [comPoints, setComPoints] = useState<number>(0)
	const [inventory, setInventory] = useState<number[]>([])
	const [lastEvent, setLastEvent] = useState<string>("")

	return (
		<AppContext.Provider value={{ life, setLife, story, setStory, comPoints, setComPoints, inventory, setInventory, MAX_LIFE, lastEvent, setLastEvent }}>
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
