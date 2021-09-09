import { generateRowHTML } from "./GenerateHTML";
import { getBackgrounds, getCellTextStyles, getHorizonalAlignments, getMergedRanges, getVerticalAlignments, TextStyle } from "./SheetStyle";

const createOutputHTML = (generatedHTML: string): GoogleAppsScript.HTML.HtmlOutput => {
    const template = HtmlService.createTemplateFromFile("client/index").getRawContent();
    const replacedTemplate = template.replace(
        /\{\{ generatedHTML \}\}/,
        generatedHTML
    );

    const html = HtmlService.createTemplate(replacedTemplate);

    html.css = "client/Stylesheet.html";

    return html.evaluate();
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

const generate2DArray = (row: number, column: number) => {
    return [...Array(row)].map(() => Array(column).fill(null).map(() => ({
        isMerged: false,
        isMergeStartCell: false
    })));
};
const generateTableHTML = () => {

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const range = sheet.getDataRange();

    const sheetData = range.getValues();
    const textStyles = getCellTextStyles(range);
    const backGrounds: string[][] = getBackgrounds(range);
    const horizonalAlignments: string[][] = getHorizonalAlignments(range);
    const verticalAlignments: string[][] = getVerticalAlignments(range);

    const sheetMap = generate2DArray(sheetData.length, sheetData[0].length)

    const mergedRangesMappedSheet = getMergedRanges(range, sheetMap);

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
                    mergedRangesMappedSheet[index],
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
                mergedRangesMappedSheet[index],
                false
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


