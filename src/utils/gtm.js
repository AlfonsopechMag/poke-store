// gtm.js
import TagManager from "react-gtm-module";
const gtmId = "GTM--KRNXFCKQ"; // Replace with your GTM ID

export const initializeTagManager = () => {
  TagManager.initialize({ gtmId });
};