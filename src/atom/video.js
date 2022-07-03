import { atom } from "recoil";

export const videoState = atom({
  key: "videoState",
  default: null,
});

export const idState = atom({ key: "idState", default: null });
export const typeState = atom({ key: "typeState", default: "" });
export const trailerState = atom({ key: "trailerState", default: false });
