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

const getHorizonalAlignments = (range: GoogleAppsScript.Spreadsheet.Range): string[][] => {
    return range.getHorizontalAlignments();
};

const getVerticalAlignments = (range: GoogleAppsScript.Spreadsheet.Range): string[][] => {
    return range.getVerticalAlignments();
};

const getMergedCellA1Notations = (
    range: GoogleAppsScript.Spreadsheet.Range,
    rowIndex: number,
    numRows: number,
    columnIndex: number,
    numColumns: number
): number[][] => {
    const a1Notations = [];
    for (let i = rowIndex; i <= rowIndex + numRows - 1; i++) {
        for (let j = columnIndex; j <= columnIndex + numColumns - 1; j++) {
            a1Notations.push([i, j]);
        }
    }
    return a1Notations;
};

const getMergedRanges = (range: GoogleAppsScript.Spreadsheet.Range, sheetMap: any[][]) => {
    const mergedRanges = range.getMergedRanges();
    mergedRanges.forEach(range => {
        const rowIndex: number = range.getRowIndex();
        const numRows: number = range.getNumRows();
        const columnIndex: number = range.getColumn();
        const numColumns: number = range.getNumColumns();
        

        for (let i = rowIndex - 1; i <= rowIndex - 1 + numRows - 1; i++) {
            for (let j = columnIndex - 1; j <= columnIndex - 1 + numColumns - 1; j++) {
                const isMergeStartCell: boolean = i === rowIndex - 1 && j === columnIndex - 1;
                if (isMergeStartCell) {
                    sheetMap[i][j].rowSpan = numRows;
                    sheetMap[i][j].colSpan = numColumns;
                }

                sheetMap[i][j].isMerged = true;
                sheetMap[i][j].isMergeStartCell = isMergeStartCell;
            }
        }
    });
    return sheetMap;
}

export { getBackgrounds, getCellTextStyles, getHorizonalAlignments, getVerticalAlignments, getMergedRanges };
