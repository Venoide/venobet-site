import Link from 'next/link'

export default function Home() {
  return (
    <section className="text-center">
      <h1 className="text-4xl font-extrabold mb-4">Bem-vindo à Venobet</h1>
      <p className="text-lg text-gray-600 mb-8">Landing profissional para sua marca de cassino.</p>

      <div className="flex justify-center gap-4">
        <Link href="/games">
          <a className="bg-venobet-dark text-white px-6 py-3 rounded">Ver Jogos</a>
        </Link>
        <Link href="/contact">
          <a className="border border-venobet px-6 py-3 rounded text-venobet">Contato</a>
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Catálogo de jogos</h2>
        <p className="text-gray-600">Slots, Roleta e Blackjack — demos e catálogo.</p>
      </section>
    </section>
  )
}
