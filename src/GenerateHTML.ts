import { TextStyle } from "./SheetStyle";

const generateStyle = (textStyle: TextStyle) => {
    return "font-size: " + textStyle.fontSize + ";"
        + "font-family: " + textStyle.fontFamily + ";"
        + "color: " + textStyle.foregroudColor + ";";
}

export { generateStyle };
