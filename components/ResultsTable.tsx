'use client';
import { useBirdStore } from '@/lib/store';
import { useState } from 'react';
import PreviewDialog from './PreviewDialog';

export default function ResultsTable() {
  const results = useBirdStore((s) => s.results);
  const [openId, setOpenId] = useState<string | null>(null);

  const current = results.find((r) => r.id === openId);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">日時</th>
            <th className="p-2">ファイル名</th>
            <th className="p-2">推定種</th>
            <th className="p-2">確度</th>
            <th className="p-2">生息</th>
            <th className="p-2">詳細</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{new Date(r.createdAt).toLocaleString()}</td>
              <td className="p-2">{r.filename}</td>
              <td className="p-2">{r.species}</td>
              <td className="p-2">{Math.round(r.confidence * 100)}%</td>
              <td className="p-2">{r.habitat}</td>
              <td className="p-2">
                <button className="text-blue-600 underline" onClick={() => setOpenId(r.id)}>
                  プレビュー
                </button>
              </td>
            </tr>
          ))}
          {results.length === 0 && (
            <tr>
              <td className="p-6 text-center text-gray-500" colSpan={6}>
                まだ結果がありません。/upload から判定してみましょう。
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <PreviewDialog
        open={!!openId}
        onOpenChange={(o) => !o && setOpenId(null)}
        text={current?.previewText ?? ''}
      />
    </div>
  );
}
