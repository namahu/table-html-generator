const onOpen = () => {
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    spreadSheet.addMenu("HTML変換", [
        {name: "HTML変換", functionName: "generateTableHTML"}
    ]);
}
