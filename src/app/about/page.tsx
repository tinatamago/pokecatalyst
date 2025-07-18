'use client'

import Link from 'next/link'

export default function About() {
  return (
    <main>
      <h1>Aboutページ</h1>
      <p>これはアバウトページです。</p>
      <Link href="/">トップページへ戻る</Link>
    </main>
  )
}