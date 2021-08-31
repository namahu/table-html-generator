const getActiveSheetData = (): any[][] => {
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const activeSheet = spreadSheet.getActiveSheet();

    const sheetData = activeSheet.getRange("A1").getDataRegion().getValues();

    return sheetData;
};

const generateTableHTML = () => {};
