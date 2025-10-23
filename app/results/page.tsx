import ResultsTable from '@/components/ResultsTable'

export default function ResultsPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">判定結果一覧</h1>
      <ResultsTable />
    </section>
  )
}
