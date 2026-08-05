import React, { useState } from 'react';

type Player = 'X' | 'O' | null;

function calculateWinner(board: Player[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

const Square: React.FC<{ value: Player; onClick: () => void }> = ({ value, onClick }) => (
  <button
    onClick={onClick}
    className="w-20 h-20 border border-gray-400 flex items-center justify-center text-2xl font-bold bg-white hover:bg-gray-100"
  >
    {value}
  </button>
);

function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);
  const status = winner ? `Vencedor: ${winner}` : board.every(Boolean) ? 'Empate!' : `Próximo: ${xIsNext ? 'X' : 'O'}`;

  function handleClick(i: number) {
    if (board[i] || winner) return;
    const next = board.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setBoard(next);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Jogo da Velha</h2>
      <div className="mb-3">{status}</div>
      <div className="grid grid-cols-3 gap-0 w-max mb-4" role="grid" aria-label="Jogo da Velha">
        {board.map((v, i) => (
          <Square key={i} value={v} onClick={() => handleClick(i)} />
        ))}
      </div>
      <button onClick={reset} className="px-4 py-2 bg-blue-600 text-white rounded">Reiniciar</button>
    </div>
  );
}

export default function Games() {
  const games = [
    { id: 'tictactoe', name: 'Jogo da Velha', desc: 'Clássico 3x3 jogável' },
    { id: 'slot-1', name: 'Slot Classic', desc: 'Slot demo 3x3 — placeholder' },
    { id: 'roulette-1', name: 'Roleta', desc: 'Roleta demo — placeholder' },
    { id: 'blackjack-1', name: 'Blackjack', desc: 'Blackjack demo — placeholder' },
  ];

  const [selected, setSelected] = useState(games[0].id);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6">Jogos — Demo</h1>

      <div className="md:flex md:gap-8">
        <aside className="md:w-64 mb-6 md:mb-0">
          <ul className="space-y-3">
            {games.map(g => (
              <li key={g.id}>
                <button
                  onClick={() => setSelected(g.id)}
                  className={`w-full text-left p-3 rounded border ${selected === g.id ? 'bg-venobet text-white' : 'bg-white'}`}>
                  <div className="font-semibold">{g.name}</div>
                  <div className="text-sm text-gray-600">{g.desc}</div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1">
          <div className="border rounded p-4 shadow-sm">
            {selected === 'tictactoe' && <TicTacToe />}

            {selected !== 'tictactoe' && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">{games.find(g => g.id === selected)?.name}</h2>
                <p className="text-gray-600 mb-4">{games.find(g => g.id === selected)?.desc}</p>
                <p className="text-sm text-gray-500">Esta é uma demo/placeholder. Posso integrar a lógica do jogo aqui — quer que eu implemente Slot, Roleta ou Blackjack jogável?</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <p className="mt-6 text-sm text-gray-500">Obs: os jogos marcados como placeholder precisam de implementação específica ou integração.</p>
    </section>
  );
}
