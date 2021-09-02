const getCellTextStyles = (range: GoogleAppsScript.Spreadsheet.Range) => {
    const styles: GoogleAppsScript.Spreadsheet.TextStyle[][] = range.getTextStyles();
    return styles.map(row => {
        return row.map(cell => {
            return {
                fontFamily: cell.getFontFamily(),
                fontSize: cell.getFontSize(),
                foregroudColor: cell.getForegroundColor(),
                isBold: cell.isBold(),
                isItalic: cell.isItalic(),
                isStrikethrough: cell.isStrikethrough(),
                isUnderline: cell.isUnderline()
            };
        });
    })
};
