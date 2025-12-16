'use client' // ← クライアント側でSupabaseのSDKを使う

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

//Supabase クライアントを初期化
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

//テーブル表示用の型を定義
type Dummy = {
  id: string
  name: string
  inserted_at: string
}

// ページコンポーネントをデフォルトエクスポート
export default function Page() {
  // Supabase から取得したデータ（Dummy 型の配列）を保持する state
  const [items, setItems] = useState<Dummy[]>([])

  useEffect(() => {
    const fetchData = async () => {
      // Supabase の "dummy_table" からデータを取得（inserted_at の降順で並び替え）
      const { data, error } = await supabase
        .from('dummy_table')
        .select('*')
        .order('inserted_at', { ascending: false })

      if (error) {
        console.error('データ取得エラー:', error)
      } else {
        setItems(data as Dummy[])
      }
    }

    fetchData()
  }, [])

  // ページの描画部分
  return (
    <main>
      <h1 className="text-xl font-bold mb-4">Dummy Table 一覧</h1>
      <ul className="list-disc list-inside">
        {items.map((item) => (
          <li key={item.id}>
            {item.name}（追加日: {new Date(item.inserted_at).toLocaleString()}）
          </li>
        ))}
      </ul>
      <Link href="/about">Aboutページへ</Link>
    </main>
  )
}