const getActiveSheetData = (): any[][] => {
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const activeSheet = spreadSheet.getActiveSheet();

    const sheetData = activeSheet.getRange("A1").getDataRegion().getValues();

    return sheetData;
};

const generateTableHTML = () => {
    const sheetData = getActiveSheetData();
    const generatedHTML = sheetData.map((row, index) => {
        if (index === 0) { // 1行目はヘッダー
            const headercontents = row.map((cell) => {
                return "<th>" + cell + "</th>";
            }).join("");

            return "<thead><tr>" + headercontents + "</tr></thead>";
        }

        const bodyContents = row.map(cell => {
            return "<td>" + cell + "</td>";
        }).join("");

        return "<tr>" + bodyContents + "</tr>";

    }).join("");

    Logger.log("<table>" + generatedHTML + "</table>");
};
