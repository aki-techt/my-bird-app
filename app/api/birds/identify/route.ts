// 画像判定時のバックエンド（サーバーサイド）処理

// NextRequest = リクエスト情報の型
// NextResponse = レスポンスのJSONを作る
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';


export async function POST(_req: NextRequest) {
  // _reqはダミーAPIだから利用していない。
  // _を付けないとTypeScript/ESLintで警告をされるため_を付ける慣習がある

  // 本来は FormData の file を読むが、Step1は固定ダミー返却
  const now = new Date().toISOString();
  const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

  // Math.random()：0以上1未満 のランダムな小数を返す。
  // arr.length：配列の要素数
  // Math.random() * arr.length：配列の要素数未満のランダムな数値を作成
  // Math.floor：小数点以下を切りすてて整数にする

  // <T,>:Tという型パラメータを受け取る関数の宣言。受け取る配列の中の要素の型がそのまま使われる


  const species = ['メジロ', 'シジュウカラ', 'スズメ', 'カワセミ', 'ハクセキレイ'];
  const habitats = ['市街地', '森林', '河川', '湖沼', '農地'];

  const res = Array.from({ length: 2 }).map(() => ({
    id: randomUUID(),
    filename: 'uploaded.jpg',
    species: pick(species),
    confidence: Math.round((0.6 + Math.random() * 0.4) * 100) / 100,
    habitat: pick(habitats),
    previewText: 'この種は日本各地に広く分布。雑食性で季節によって餌が変わります（モック）',
    createdAt: now,
  }));

  return NextResponse.json(res);
}