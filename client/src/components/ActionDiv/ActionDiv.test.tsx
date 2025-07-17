import { render, screen } from "@testing-library/react";
import ActionDiv from "./ActionDiv";
import { AppContext } from "../../context/AppContext";
import { describe, it, expect } from "vitest";

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

describe("display tests", () => {
  it(`should display "vie actuelle: ${fakeContext.life}", a value of 12 in communisme, the last event "vous etes tout nu", and "vous portez des sandales"`, () => {
    render(
      <AppContext.Provider value={fakeContext}>
        <ActionDiv />
      </AppContext.Provider>
    );

    expect(
      screen.getByText(
        `Vie actuelle : ${fakeContext.life} (vous portez des sandales)`
      )
    ).toBeInTheDocument();
    expect(
    screen.getByText(`Niveau de communisme : ${fakeContext.comPoints}`)
  ).toBeInTheDocument();
  expect(screen.getByText(`Vous êtes tout nu`)).toBeInTheDocument();
  });
  
});
