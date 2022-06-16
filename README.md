# NextCloudの死活監視＆通知

## 開発について（メッセージやサイクルの変更等）

### 1. ローカルに環境整える

1. git cloneでよしなに
2. ```npm i```で必要モジュールを取得
  2.1 nodejsが入ってなければインストールが必要
3. 環境変数追加
  3.1 ルートディレクトリに『.env』ファイルを追加し、最低限下記を設定
  3.2 ```NEXTCLOUD_URL="https://xxxxx/"```
  3.3 ```LINE_TOKENS="xxx"```（通知対象者の追加の項参照）
4. ターミナルで```npm run dev```打てば起動できます

### 2. サーバーにデプロイ

* 適当に。。。（Heroku等々。ざっくりとした流れは下記に）
* 取得している情報に流出したからどうこうできるモノではないので、どこにホスティングしても大丈夫です。(上記で記述した2つの環境変数だけは注意が必要であるため、そこだけはgit管理せずに気をつけてください)
* 今後の拡張性を考慮し『helmet』や『cors』の設定をmain.tsに施してますが、よりスリム化したければ消してください。(外部に露出するAPIを生やさなければ不要です。)

#### Herokuデプロイのざっくりとした流れ

1. Herokuにアカウント作成（要メールアドレス）
2. HerokuのAccountSettingsのメニューから「API　Key」でAPI　Keyを生成
3. github の project の setting > secrets から登録する
  3.1 HEROKU_API_KEY(項2)
  3.2 HEROKU_APP(デプロイ先のHEROKUアプリ名を指定します)
  3.3 HEROKU_EMAIL(Herokuアカウントのメールアドレス)
  3.4 HD_NEXTCLOUD_URL(設定する値は前述の通りだが、接頭語『HD_』をつける)
  3.5 HD_LINE_TOKENS(同上)
4. Herokuで新規アプリ作成
5. githubのリポジトリと連携
6. githubの『main』リポジトリにプルする
7. デプロイが完了

※[HD_をつける理由](egtr6upw1dy3Jdym16a8hSOM9rL3mb651Uo4NCuIcNp)

## 通知対象者の追加

### 1. LINE Notifyのアカウントと友達になる

1. [LINE Notify](https://notify-bot.line.me/ja/)のサイトにアクセス
2. QRコードが表示されているのでスマートフォンでQRコードを読み取り友達になって下さい。

### 2. LINE Notifyのサイトにログインする

1. LINE Notifyのサイトの右上にログインリンクがあるので選択して進みます。
2. ログイン情報の入力を求められるので、自身のLINEアカウントの情報を入力しましょう。
  2.1 新しくLINEアカウントを作成する訳ではないので注意しましょう。

### 3. アクセストークンの発行

1. 右上のメニューからマイページを選択します
2. ページ下部のトークンを発行するボタンを選択します
  2.1 トークン名: 任意の文字列を入れて下さい
  2.2 通知を送信するトークルーム: 『1:1でLINE Notifyからの通知を受け取る』等
3. トークン文字列を控える

### 4. 環境変数に追加

環境変数『LINE_TOKENS』に"aaaaa,bbbbb,ccccc"と言うかたちで対象者をカンマ区切りで設定

## 参考ドキュメント

### [Nextcloud 12 Server Administration Manual](https://docs.nextcloud.com/server/12/admin_manual/operations/considerations_on_monitoring.html#status-php)

Nextcloudは、アプリケーションサーバーが稼働しているかどうかを判断するための非常にシンプルなメカニズムを提供します。
各Nextcloudサーバーでstatus.phpファイルを呼び出します。このファイルは、サーバーのルートNextcloudディレクトリ（デフォルトでは/status.php）にあります。サーバーが正常に機能している場合、応答は次のようになります。

{ "インストール済み" ："true" 、"バージョン" ："6.0.0.16" 、"バージョン文字列" ："6.0.1" 、"エディション" ："" }

### [Cron Examples](https://crontab.guru/examples.html)

定期実行のスケジューリングはCronを使用しています。
Examplesから周期を決定してください

### [LINE Notify API Document](https://notify-bot.line.me/doc/ja/)

『axios』というfetchモジュールでAPIをPostしてます。
メッセージの修正や戻り値による処理分け等はドキュメント参照のこと
