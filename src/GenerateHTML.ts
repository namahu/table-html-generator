import { TextStyle } from "./SheetStyle";

const generateStyle = (textStyle: TextStyle): string => {
    return "font-size: " + textStyle.fontSize + ";"
        + "font-family: " + textStyle.fontFamily + ";"
        + "color: " + textStyle.foregroudColor + ";";
};

const generateRowHTML = (row: any[], textStyles: TextStyle[], isHeader: boolean) => {
    const tag = isHeader ? "th" : "td";
    return row.map((cell, index) => {
        const style = generateStyle(textStyles[index]);
        return '      <' + tag +  ' style="' + style + '">'
            + cell
            + '</' + tag + '>\n';
    }).join("");
};

export { generateRowHTML };
