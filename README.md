# NextCloudの死活監視＆通知

## 死活監視のみならこっちのほうが手軽

### [UptimeRobot](https://uptimerobot.com/)

やっていることはだいたいこのプログラムと同じ

* 定期実行で対象にアクセス
* ステータス見て落ちてたら、メール通知

[参考記事](http://kakedashi-xx.com:25214/index.php/2021/12/11/post-3794/)

## 開発について（メッセージやサイクルの変更等）

### 1. ローカルに環境整える

* git cloneでよしなに
* ```npm i```で必要モジュールを取得
  * nodejsが入ってなければインストールが必要
* 環境変数追加
  * ルートディレクトリに『.env』ファイルを追加し、最低限下記を設定
  * ```NEXTCLOUD_URL="https://xxxxx/"```
  * ```LINE_TOKENS="xxx"```（通知対象者の追加の項参照）
* ターミナルで```npm run dev```打てば起動できます

### 2. サーバーにデプロイ

* 適当に。。。（Heroku等々。ざっくりとした流れは下記に）
* 取得している情報に流出したからどうこうできるモノではないので、どこにホスティングしても大丈夫です。（上記で記述した2つの環境変数だけは注意が必要であるため、そこだけはgit管理せずに気をつけてください）
* 今後の拡張性を考慮し『helmet』や『cors』の設定をmain.tsに施してますが、よりスリム化したければ消してください。(外部に露出するAPIを生やさなければ不要です。)

#### Herokuデプロイのざっくりとした流れ

* Herokuにアカウント作成（要メールアドレス）
* HerokuのAccountSettingsのメニューから「API　Key」でAPI　Keyを生成
* GitHub の project の setting > secrets から登録する（ダブルクォーテーションは不要）
  * HEROKU_API_KEY(項2)
  * HEROKU_APP（デプロイ先のHEROKUアプリ名を指定します）
  * HEROKU_EMAIL（Herokuアカウントのメールアドレス）
  * NEXTCLOUD_URL
  * LINE_TOKENS
* Herokuで新規アプリ作成
* GitHubのリポジトリと連携
* GitHubの『main』リポジトリにプルする
* デプロイが完了

※ただし、Herokuは30分ごとにスリープするするので、Heroku SchedulerというHerokuアプリがスリープしてても指定時間にコマンドを実行してくれるツールでcurlしてあげる必要あり

## 通知対象者の追加

### 1. LINE Notifyのアカウントと友達になる

* [LINE Notify](https://notify-bot.line.me/ja/)のサイトにアクセス
* QRコードが表示されているのでスマートフォンでQRコードを読み取り友達になってください

### 2. LINE Notifyのサイトにログインする

* LINE Notifyのサイトの右上にログインリンクがあるので選択して進みます。
* ログイン情報の入力を求められるので、自身のLINEアカウントの情報を入力しましょう。
  * 新しくLINEアカウントを作成する訳ではないので注意しましょう。

### 3. アクセストークンの発行

* 右上のメニューからマイページを選択します
* ページ下部のトークンを発行するボタンを選択します
  * トークン名: 任意の文字列を入れてください
  * 通知を送信するトークルーム:『1:1でLINE Notifyからの通知を受け取る』等
* トークン文字列を控える

### 4. 環境変数に追加

環境変数『LINE_TOKENS』に"aaaaa,bbbbb,ccccc"と言うかたちで対象者をカンマ区切りで設定

## 参考ドキュメント

### [Nextcloud 12 Server Administration Manual](https://docs.nextcloud.com/server/12/admin_manual/operations/considerations_on_monitoring.html#status-php)

Nextcloudは、アプリケーションサーバーが稼働しているかどうかを判断するための非常にシンプルなメカニズムを提供します。
各Nextcloudサーバーでstatus.phpファイルを呼び出します。このファイルは、サーバーのルートNextcloudディレクトリ（デフォルトでは/status.php）にあります。サーバーが正常に機能している場合、応答は次のようになります。

{ "installed" ："true" 、"version" ："6.0.0.16" 、"versionstring" ："6.0.1" 、"edition" ："" }

### [Cron Examples](https://crontab.guru/examples.html)

定期実行のスケジューリングはCronを使用しています。
Examplesから周期を決定してください

### [LINE Notify API Document](https://notify-bot.line.me/doc/ja/)

『axios』というfetchモジュールでAPIをPostしてます。
メッセージの修正や戻り値による処理分け等はドキュメント参照のこと
