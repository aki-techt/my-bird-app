'use client'
import { useBirdStore } from '@/lib/store'
import { useState } from 'react'
import PreviewDialog from './PreviewDialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default function ResultsTable() {
  const results = useBirdStore((s) => s.results)
  const reset = useBirdStore((s) => s.reset)
  const [openId, setOpenId] = useState<string | null>(null)
  const current = results.find((r) => r.id === openId)

  if (results.length === 0) {
    return (
      <div className="rounded-2xl border p-10 text-center text-gray-600">
        まだ結果がありません。<span className="underline">アップロード</span> から判定してみましょう。
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="text-right">
        <Button variant="secondary" size="sm" onClick={reset}>
          リセット
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日時</TableHead>
              <TableHead>ファイル名</TableHead>
              <TableHead>推定種</TableHead>
              <TableHead>確度</TableHead>
              <TableHead>生息</TableHead>
              <TableHead>詳細</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((r) => (
              <TableRow key={r.id} className="hover:bg-gray-50/50">
                <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                <TableCell>{r.filename}</TableCell>
                <TableCell>{r.species}</TableCell>
                <TableCell>{Math.round(r.confidence * 100)}%</TableCell>
                <TableCell>{r.habitat}</TableCell>
                <TableCell>
                  <Button variant="link" onClick={() => setOpenId(r.id)}>
                    プレビュー
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PreviewDialog
        open={!!openId}
        onOpenChange={(o) => !o && setOpenId(null)}
        text={current?.previewText ?? ''}
      />
    </div>
  )
}
