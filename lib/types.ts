export type BirdPrediction = {
  id: string;
  filename: string;
  species: string; // 推定名（ダミー）
  confidence: number; // 0-1
  habitat: string; // 生息地（ダミー）
  notes?: string; // 補足
  previewText: string; // LLMプレビュー文（ダミー）
  createdAt: string; // ISO
}