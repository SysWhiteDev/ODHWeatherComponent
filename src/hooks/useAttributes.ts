import {create} from "zustand";

type Attributes = {
    enableWebcamsPage?: boolean;
    startingPosition?: Array<number>;
    enableBigPopup?: boolean;
    enableBigPopupTakefullviewport?: boolean;
}

type AttributesStore = {
    attributes: Attributes,
}

export default create<AttributesStore>()((set) => ({
    attributes: {},
}))
