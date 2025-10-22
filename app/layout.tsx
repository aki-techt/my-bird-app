import './globals.css';
import Link from 'next/link';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  <html lang="ja">
    <body className="min-h-dvh bg-white text-gray-900">
      <header className="border-b">
        <nav className="max-w-6xl mx-auto p-4 flex gap-6">
          <Link href="/upload" className="hover:underline">アップロード</Link>
          <Link href="/results" className="hover:underline">判定結果一覧</Link>
        </nav>
      </header>
      <main>{children}</main>
    </body>
</html>
);
}