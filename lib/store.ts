import {create} from "zustand";
import { BirdPrediction } from "./types";

type State = {
  results: BirdPrediction[];
  addResults: (items: BirdPrediction[]) => void; // 引数にBirdPrediction[]を取りなにも返さない。UIの状態を更新するだけだから。
  reset: () => void;
}

// zustandのcreate関数で状態ストアを作成
export const useBirdStore = create<State>((set) => ({
  results: [],
  addResults: (items) => set((s) => ({results: [...items,...s.results] })),
  //itemsは引数=新しく取得する判定結果の配列のため、新しい結果を前にコピーして、過去の結果をその後ろにコピーするということ。
  reset: () => set({results: []}), // resultsを空に戻す
}))

// 以下の形で呼び出し可能。
// const results = useBirdStore((state) => state.results);
// const addResults = useBirdStore((state) => state.addResults);


