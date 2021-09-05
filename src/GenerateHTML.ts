import { TextStyle } from "./SheetStyle";

const generateTextDecorationLineStyle = (
    isUnderline: boolean,
    isStrikethrough: boolean
) => {
    if (isUnderline && isStrikethrough) return "underline line-through";
    if (isUnderline) return "underline";
    if (isStrikethrough) return "line-through";
    return "none";
};

const generateStyle = (textStyle: TextStyle): string[] => {
    return [
        "font-size: " + textStyle.fontSize + "px;",
        "font-family: " + textStyle.fontFamily + ";",
        "color: " + textStyle.foregroudColor + ";",
        "font-weight: " + (textStyle.isBold ? "bold" : "normal") + ";",
        "font-style: " + (textStyle.isItalic ? "italic" : "normal") + ";",
        "text-decoration-line: " + (
            generateTextDecorationLineStyle(
                textStyle.isUnderline,
                textStyle.isStrikethrough
            )
        ) + ";"
    ];
};

const generateRowHTML = (row: any[], textStyles: TextStyle[], backGrounds: string[], isHeader: boolean) => {
    const tag = isHeader ? "th" : "td";
    return row.map((cell, index) => {
        const style = generateStyle(textStyles[index]);
        const backgroundColor: string = backGrounds[index];

        style.push("background-color: " + backgroundColor + ";");

        return '      <' + tag +  ' style="' + style.join("") + '">'
            + cell
            + '</' + tag + '>\n';
    }).join("");
};

export { generateRowHTML };
