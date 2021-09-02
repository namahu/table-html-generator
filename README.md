# TableHTMLGenerator

## Description

スプレッドシート上の表からtableのHTMLを生成する

## Todo

- [x] 基本のテーブル構造を生成
- [ ] シートにスタイルがなかった場合にデフォルトスタイルを設定
- [ ] 結合セルも生成

## Memo

- セルや文字に適用した装飾は全部まとめては取れない
  - 取れた
    - テキストのスタイルは `getTextStyles()`
