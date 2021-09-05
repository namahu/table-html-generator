export type TextStyle = {
    fontFamily: string | null;
    fontSize: number | null;
    foregroudColor: string | null;
    isBold: boolean;
    isItalic: boolean;
    isStrikethrough: boolean;
    isUnderline: boolean;
}

const getCellTextStyles = (range: GoogleAppsScript.Spreadsheet.Range): TextStyle[][] => {
    const styles: GoogleAppsScript.Spreadsheet.TextStyle[][] = range.getTextStyles();
    return styles.map(row => {
        return row.map(cell => {
            return {
                fontFamily: cell.getFontFamily(),
                fontSize: cell.getFontSize(),
                foregroudColor: cell.getForegroundColor(),
                isBold: cell.isBold() as boolean,
                isItalic: cell.isItalic() as boolean,
                isStrikethrough: cell.isStrikethrough() as boolean,
                isUnderline: cell.isUnderline() as boolean
            };
        });
    })
};

const getBackgrounds = (range: GoogleAppsScript.Spreadsheet.Range): string[][] => {
    return range.getBackgrounds();
};

export { getBackgrounds, getCellTextStyles };
