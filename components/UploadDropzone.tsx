'use client'
import { useState, useRef } from 'react'
import { useBirdStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function UploadDropzone() {
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState<string>('')
  const fileRef = useRef<HTMLInputElement | null>(null)
  // useRef : DOM要素を参照し、オブジェクト（辞書）を返す

  // Zustandのグローバル状態を取得し、判定結果をストアに追加
  const addResults = useBirdStore((s) => s.addResults)

  // オブジェクト.プロパティでアクセス可能。?はもしあったらという条件分岐。
  const onPickFile = () => fileRef.current?.click()

  // React.ChangeEventHandler<HTMLInputElement>:TypeScriptの型定義。HTMLのinput要素で起きるonChangeイベントを扱う関数と伝えている
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    
    // e.targetプロパティ内にfilesという名前でFileList型で格納されている。もしリストがあれば[0]（一番最初）を取得といいうこと
    const f = e.target.files?.[0]

    // 三項演算子。もしfがあればf.name利用。なければ空文字。
    setFileName(f ? f.name : '')
  }

  const onClickMockIdentify = async () => {
    setLoading(true)
    try {
      // Step1はダミー：ファイル送信はせずPOSTだけ
      const res = await fetch('/api/birds/identify', { method: 'POST' })
      if (!res.ok) throw new Error('identify failed')
      const data = await res.json()
      addResults(data)

      // 成功時通知
      toast.success('判定完了（ダミー）', { description: '結果一覧に追加しました。' })
    } catch (e) {
      console.error(e)

      // 失敗時通知
      toast.error('判定に失敗しました', { description: '時間を置いて再度お試しください。' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border-2 border-dashed p-8 text-center space-y-4">
      <p className="text-sm text-gray-600">
        画像ファイルを選択してください（Step1はダミー判定で進みます）
      </p>

      <div className="flex items-center justify-center gap-3">
        <Button variant="secondary" onClick={onPickFile} disabled={loading}>
          ファイルを選択
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
          aria-hidden
        />
        <span className="text-xs text-gray-500">
          {fileName ? fileName : '未選択'}
        </span>
      </div>

      <div>
        <Button onClick={onClickMockIdentify} disabled={loading} aria-busy={loading}>
          {loading ? '判定中…' : '判定する（ダミー）'}
        </Button>
      </div>

      <p className="text-xs text-gray-500">
        ※ Step2で実ファイルをFastAPIに送る実装に切り替えます
      </p>
    </div>
  )
}
