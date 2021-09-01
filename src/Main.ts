const getActiveSheetData = (): any[][] => {
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const activeSheet = spreadSheet.getActiveSheet();

    const sheetData = activeSheet.getRange("A1").getDataRegion().getValues();

    return sheetData;
};

const createOutputHTML = (generatedHTML: string): GoogleAppsScript.HTML.HtmlOutput => {
    const outputHTML = `
        <!DOCTYPE html>
        <html lang="ja">
            <head>
                <base target="_top">
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    textarea {
                        border-radius: 4px;
                        font-size: 16px;
                        height: 72vh;
                        margin: 4px;
                        overflow: scroll;
                        padding: 4px;
                        width: 280px;
                    }
                </style>
            </head>
            <body>
            <textarea disabled>${generatedHTML}</textarea>
            </body>
        </html>
    `;

    return HtmlService.createHtmlOutput(outputHTML);

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

    const htmlOutput = createOutputHTML("<table>" + generatedHTML + "</table>")
        .setTitle("HTML変換結果");
    SpreadsheetApp.getUi().showSidebar(htmlOutput);
};


