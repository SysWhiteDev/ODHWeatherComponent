import r2wc from "@r2wc/react-to-web-component";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const wcTest = r2wc(App, {
  props: {
    enableWebcamsPage: "boolean",
    startingPosition: "string",
    enableBigPopup: "boolean",
    enableBigPopupTakefullviewport: "boolean",
  },
});
customElements.define("weather-component", wcTest);

reportWebVitals();
