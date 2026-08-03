export default function Games() {
  const games = [
    { id: 'slot-1', name: 'Slot Classic', desc: 'Slot demo 3x3' },
    { id: 'roulette-1', name: 'Roleta', desc: 'Roleta demo' },
    { id: 'blackjack-1', name: 'Blackjack', desc: 'Jogue contra a mesa (demo)' }
  ]

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Jogos — Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map(g => (
          <article key={g.id} className="border rounded p-4 shadow-sm">
            <h3 className="font-semibold text-lg">{g.name}</h3>
            <p className="text-gray-600 mb-4">{g.desc}</p>
            <div className="flex gap-2">
              <button className="bg-venobet text-white px-4 py-2 rounded">Jogar (Demo)</button>
              <button className="border px-4 py-2 rounded">Detalhes</button>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-500">Obs: essas ações são placeholders — substitua pelos seus embeds ou integrações.</p>
    </section>
  )
}
