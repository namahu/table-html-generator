import { getCellTextStyles, TextStyle } from "./SheetStyle";

const getActiveSheetDataRange = (): GoogleAppsScript.Spreadsheet.Range => {
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const activeSheet = spreadSheet.getActiveSheet();

    return activeSheet.getRange("A1").getDataRegion();
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

/**
 * 行に含まれるテキスト全てにBoldのスタイルが適用されているかを調べる関数
 * 
 * @param {TextStyle[]} textStyles - セル内のテキストに適用されているスタイル
 * @return {boolean} - trueだったらヘッダー
 */
const isHeader = (textStyles: TextStyle[]): boolean => {
    return textStyles.every(style => style.isBold === true);
}

const generateTableHTML = () => {

    const range = getActiveSheetDataRange();

    const sheetData = range.getValues();
    const textStyles = getCellTextStyles(range);

    const tableHeaders: string[] = [];
    const bodyContents: string[] = [];

    sheetData.forEach((row, index) => {

        if (isHeader(textStyles[index])) {
            const rowHTMLStr = row.map(cell => {
                return "<th>" + cell + "</th>";
            }).join("");
            tableHeaders.push("<tr>" + rowHTMLStr + "</tr>");
            return;
        }

        const contents = row.map(cell => {
            return "<td>" + cell + "</td>";
        }).join("");
        bodyContents.push("<tr>" + contents + "</tr>");
    });

    Logger.log("<table>" + tableHeaders + bodyContents + "</table>");

    const htmlOutput = createOutputHTML(
        "<table><thead>" + tableHeaders.join("") +
        "</thead><tbody>" + bodyContents.join("") +
        "</tbody></table>"
    ).setTitle("HTML変換結果");
    
    SpreadsheetApp.getUi().showSidebar(htmlOutput);
};


