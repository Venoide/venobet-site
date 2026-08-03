import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-venobet text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="font-bold text-2xl">Venobet</a>
        </Link>

        <nav className="space-x-4">
          <Link href="/"><a>Home</a></Link>
          <Link href="/games"><a>Jogos</a></Link>
          <Link href="/about"><a>Sobre</a></Link>
          <Link href="/responsibility"><a>Responsabilidade</a></Link>
          <Link href="/contact"><a>Contato</a></Link>
        </nav>
      </div>
    </header>
  )
}
