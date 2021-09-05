# TableHTMLGenerator

## Description

スプレッドシート上の表からtableのHTMLを生成する

## Todo

- [x] 基本のテーブル構造を生成
  - [X] 1行内のセルにあるテキスト全てにBoldが適用されていたらテーブルのヘッダーとみなす
- [ ] シートにスタイルがなかった場合にデフォルトスタイルを設定
- [ ] 結合セルも生成

## Memo

- セルや文字に適用した装飾は全部まとめては取れない
  - 取れた
    - テキストのスタイルは `range.getTextStyles()`
      - フォンﾄサイズ
      - フォントカラー
      - フォントファミリー
      - 太字かどうか
      - 斜体かどうか
      - 打ち消し線の有無
      - 下線の有無
- 背景をまとめて取るには`range.getBackgrounds()`
- 行の高さは`sheet.getRowHeight( rowPosition )`
- 列の幅は`sheet.getColunmWidth( columnPosition )`
- セル内でのテキストの上下配置は`range.getVerticalAlignments()`
  - bottom
  - middle
  - top
- セル内でのテキストの左右配置は`range.getHorizontalAlignments()`
  - left
  - center
  - right
