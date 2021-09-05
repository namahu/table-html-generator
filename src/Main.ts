import { generateRowHTML } from "./GenerateHTML";
import { getBackgrounds, getCellTextStyles, getHorizonalAlignments, getVerticalAlignments, TextStyle } from "./SheetStyle";

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

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const range = sheet.getRange("A1").getDataRegion();

    const sheetData = range.getValues();
    const textStyles = getCellTextStyles(range);
    const backGrounds: string[][] = getBackgrounds(range);
    const horizonalAlignments: string[][] = getHorizonalAlignments(range);
    const verticalAlignments: string[][] = getVerticalAlignments(range);

    const tableHeaders: string[] = [];
    const bodyContents: string[] = [];

    sheetData.forEach((row, index) => {

        const rowPosition: number = index + 1;
        const rowHeight: number = sheet.getRowHeight(rowPosition);

        if (isHeader(textStyles[index])) {
            tableHeaders.push(
                '    <tr style="height: ' + rowHeight + 'px;">\n'
                + generateRowHTML(
                    sheet,
                    row,
                    textStyles[index],
                    backGrounds[index],
                    horizonalAlignments[index],
                    verticalAlignments[index],
                    true
                )
                + "    </tr>\n"
            );
            return;
        }

        bodyContents.push(
            '    <tr style="height: ' + rowHeight + 'px;">\n'
            + generateRowHTML(
                sheet,
                row,
                textStyles[index],
                backGrounds[index],
                horizonalAlignments[index],
                verticalAlignments[index],
                true
            )
            + "    </tr>\n"
        );
    });

    Logger.log("<table>" + tableHeaders + bodyContents + "</table>");

    const htmlOutput = createOutputHTML(
        "<table>\n  <thead>\n" + tableHeaders.join("") +
        "  </thead>\n  <tbody>\n" + bodyContents.join("") +
        "  </tbody>\n</table>"
    ).setTitle("HTML変換結果");
    
    SpreadsheetApp.getUi().showSidebar(htmlOutput);
};


