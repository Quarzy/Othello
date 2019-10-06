# TypeScript Practice

TypeScript勉強会用リポジトリ

## 推奨環境

- node v10の最新バージョン

## 初期設定

nodeを直接インストールする方法と、Dockerを使う方法の2種類ある

### node をインストールする場合

参考： https://atlas.docbase.io/posts/253968#nodejs%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB

1. nodebrew をインストールする。

1. node をインストールする。

    - node のバージョンに気をつけること。

### Docker を使う場合

1. [Dockerの公式サイト](https://www.docker.com/)からDocker for Macをインストールする

    https://docs.docker.com/docker-for-mac/install/#download-docker-for-mac

## Dockerの起動・終了

Docker を使わない場合、この節は確認しなくてもよい。

※Docker Desktop が起動していることを確認すること。

### 起動方法

1. `docker/node.sh` を実行する
    ```sh:
    sh docker/node.sh
    ```
    
    - 起動が完了すると `root@6be044c2f4b6:~/Typescript-Practice#` と表示され、入力待ち状態になる。( `6be044c2f4b6` は Docker 起動ごとに変化する。)
           
### 終了方法

1. 通常の Linux と同様 `exit` でDockerを終了できる。

## ビルド方法

webpack を使って JavaScript ファイルをビルドする。

ブラウザで動作する JavaScript ファイルを作成する場合は、このビルド方法でビルドすること。

この方法で作成した JavaScript ファイルは複数の TypeScript ファイルをまとめるため、複雑な構成になっている。
1つ1つの JavaScript がどのように作成されるか確認したい場合は、下の「TypeScript 標準のトランスパイル」で作成するとよい。

1. ビルドしたい回のディレクトリに移動する

    ```sh:
    cd src/00
    ```
    
1. 以下のコマンドを実行しビルドする

    ```sh:
    npm run build
    ```
    
ビルドすると `src/{番号}/main/dist/js` 下に JavaScript ファイルが作成される。
JavaScript ファイル名は chain-case に変換される。

### ビルド対象

ビルドの対象となるファイルは `src/{番号}/main/ts` 直下の TypeScript ファイルである。

## TypeScript 標準のトランスパイル

TypeScript ファイルを JavaScript ファイルにトランスパイルする。

この方法で作成した JavaScript ファイルは<span style="color: red;">ブラウザで動作しない可能性がある。</span>

1. トランスパイルしたい回のディレクトリに移動する

    ```sh:
    cd src/00
    ```
    
1. 以下のコマンドを実行しトランスパイルする

    ```sh:
    npx tsc
    ```
    
    ※ `npm` ではなく `npx` であることに注意。 (最後は `m` ではなく `x` )

`src/{番号}/main/js-compiled` 下に JavaScript ファイルが作成される。

### ビルド対象

ビルドの対象となるファイルは `src/{番号}/main/ts` 下 (サブディレクトリを含む) の TypeScript ファイルである。
