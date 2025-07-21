import { vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import GamePage from "./GamePage";
import { describe, it, expect } from "vitest";
import { AppContext } from "../../context/AppContext";

// vi.mock('fetch')
// const mockedFetch = fetch

// global.fetch = vi.fn();

const fakeContext = {
  life: 42,
  MAX_LIFE: 100,
  inventory: [3],
  comPoints: 12,
  lastEvent: "Vous êtes tout nu",
  sandal: true,
  story: 1,
  setSandal: () => {},
  setLife: () => {},
  setStory: () => {},
  setComPoints: () => {},
  setInventory: () => {},
  setLastEvent: () => {},
};


describe("GamePage component",()=>{

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("should display chapter data",async()=>{
//arrange
const mockChapter = {
    story_id: 1,
    chapter_id: 1,
    chapter_desc: "la chambre",

    exit1_id: 1,
    exit1_desc: "la porte",

    exit2_id: 2,
    exit2_desc: "la fenetre",

    exit3_id: 3,
    exit3_desc: "la cheminée",
}
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockChapter,
    }));

    // Act: Render the component
    render(<AppContext.Provider value={fakeContext}>
<GamePage />
    </AppContext.Provider>
    );

    // Assert
    await waitFor(() => {
     expect(screen.getByText('la chambre')).toBeInTheDocument();
     expect(screen.getByText('la fenetre')).toBeInTheDocument();
     expect(screen.getByText('la porte')).toBeInTheDocument();
     expect(screen.getByText('la cheminée')).toBeInTheDocument();
     });
    })
})