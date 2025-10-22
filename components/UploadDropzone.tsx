'use client';
import { useState } from 'react';
import { useBirdStore } from '@/lib/store';

export default function UploadDropzone() {
  const [loading, setLoading] = useState(false);
  const addResults = useBirdStore((s) => s.addResults);

  const onClickMockIdentify = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/birds/identify', { method: 'POST' });
      if (!res.ok) throw new Error('identify failed');
      const data = await res.json();
      addResults(data);
    } catch (e) {
      console.error(e);
      alert('判定に失敗しました（モック）');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border-2 border-dashed p-8 text-center">
      <p className="mb-4 text-sm text-gray-600">画像ファイルをドラッグ&ドロップ（Step1はダミー）</p>
      <button
        onClick={onClickMockIdentify}
        disabled={loading}
        className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-60"
      >
        {loading ? '判定中…' : '判定する（ダミー）'}
      </button>
    </div>
  );
}
