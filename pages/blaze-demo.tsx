import React, { useEffect, useRef, useState } from 'react';

type HistoryEntry = {
  id: string;
  bet: number;
  result: 'win' | 'lose' | 'cashout';
  multiplier: number;
  payout: number;
  time: string;
};

function fmt(n: number) {
  return n.toFixed(2);
}

export default function BlazeDemo() {
  const [balance, setBalance] = useState<number>(1000);
  const [bet, setBet] = useState<number>(10);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [running, setRunning] = useState<boolean>(false);
  const [crashAt, setCrashAt] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const intervalRef = useRef<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  function randomCrashPoint() {
    // random crash between ~1.10 and ~15.00 (demo)
    const min = 1.1;
    const max = 15;
    return +(Math.random() * (max - min) + min).toFixed(2);
  }

  function startRound() {
    if (running) return;
    if (bet <= 0) {
      setMessage('Aposta deve ser > 0');
      return;
    }
    if (bet > balance) {
      setMessage('Saldo insuficiente');
      return;
    }
    setMessage(null);
    setBalance(b => +(b - bet));
    setMultiplier(1);
    const crash = randomCrashPoint();
    setCrashAt(crash);
    setRunning(true);

    // accelerate multiplier growth for demo; update every 50ms
    intervalRef.current = window.setInterval(() => {
      setMultiplier(prev => {
        // growth curve: faster over time
        const next = +(prev + Math.max(0.01, prev * 0.018)).toFixed(2);
        // check crash
        if (crash !== null && next >= crash) {
          // crash happened
          window.clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setRunning(false);
          const entry: HistoryEntry = {
            id: String(Date.now()),
            bet,
            result: 'lose',
            multiplier: crash,
            payout: 0,
            time: new Date().toLocaleTimeString(),
          };
          setHistory(h => [entry, ...h].slice(0, 30));
          setMessage(`Crashed em x${fmt(crash)} — perdeu`);
          return crash;
        }
        return next;
      });
    }, 50);
  }

  function cashOut() {
    if (!running) return;
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
    const payout = +(bet * multiplier).toFixed(2);
    setBalance(b => +(b + payout).toFixed(2));
    const entry: HistoryEntry = {
      id: String(Date.now()),
      bet,
      result: 'cashout',
      multiplier,
      payout,
      time: new Date().toLocaleTimeString(),
    };
    setHistory(h => [entry, ...h].slice(0, 30));
    setMessage(`Cashout: recebeu ${fmt(payout)} (x${fmt(multiplier)})`);
    setMultiplier(prev => prev); // keep current multiplier visible
  }

  function quickBet(amount: number) {
    setBet(amount);
    setMessage(null);
  }

  function resetDemo() {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setBalance(1000);
    setBet(10);
    setMultiplier(1);
    setRunning(false);
    setCrashAt(null);
    setHistory([]);
    setMessage('Demo reiniciado');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-5xl mx-auto flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-rose-600">Blaze Demo</div>
          <div className="text-sm text-gray-500">Imitação visual e lógica apenas para demonstração</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-gray-500">Saldo (demo)</div>
            <div className="font-mono font-semibold text-lg">R$ {fmt(balance)}</div>
          </div>
          <button
            onClick={resetDemo}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            title="Reiniciar demo"
          >
            Reiniciar
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: controls */}
        <aside className="col-span-1 space-y-4">
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-600 mb-2">Aposta</div>
            <input
              type="number"
              value={bet}
              onChange={e => setBet(Number(e.target.value))}
              min={1}
              step={1}
              className="w-full border rounded px-3 py-2 mb-3"
            />
            <div className="flex gap-2 mb-3">
              {[1, 5, 10, 50, 100].map(a => (
                <button
                  key={a}
                  onClick={() => quickBet(a)}
                  className="px-3 py-2 bg-venobet text-white rounded text-sm"
                >
                  R$ {a}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={startRound}
                disabled={running}
                className={`flex-1 px-3 py-2 rounded text-white ${running ? 'bg-gray-400' : 'bg-rose-600 hover:bg-rose-700'}`}>
                {running ? 'Rodando...' : 'Iniciar (apostar)'}
              </button>
              <button
                onClick={cashOut}
                disabled={!running}
                className={`px-4 py-2 rounded ${running ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200'}`}>
                Sacar
              </button>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              Multiplicador alvo (demo): {crashAt ? `x${fmt(crashAt)}` : '—'}
            </div>
            {message && <div className="mt-2 text-sm text-gray-700">{message}</div>}
          </div>

          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm font-semibold mb-2">Dicas</div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>- Esta é uma simulação, sem dinheiro real.</li>
              <li>- O crash é gerado aleatoriamente a cada rodada.</li>
              <li>- Use o botão Sacar antes do crash para ganhar a aposta × multiplicador atual.</li>
            </ul>
          </div>
        </aside>

        {/* Center: crash visual */}
        <section className="col-span-2 space-y-4">
          <div className="p-6 bg-white rounded shadow flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">Crash — Simulação</div>
              <div className="font-mono font-semibold text-xl">x{fmt(multiplier)}</div>
            </div>

            <div className="w-full h-48 bg-gradient-to-t from-gray-100 to-white rounded border flex items-end overflow-hidden">
              {/* visual bar */}
              <div
                style={{
                  height: `${Math.min(100, (Math.log(multiplier + 1) / Math.log(16)) * 100)}%`,
                }}
                className={`w-full bg-rose-500 transition-all duration-50 flex items-end justify-center text-white font-bold`}
              >
                <div className="text-xs p-2">x{fmt(multiplier)}</div>
              </div>
            </div>

            <div className="w-full mt-4 text-sm text-gray-600">
              {running ? (
                <div>Rodando… tente sacar antes do crash!</div>
              ) : (
                <div>Pronto. Aperte "Iniciar (apostar)" para começar uma rodada demo.</div>
              )}
            </div>
          </div>

          <div className="p-4 bg-white rounded shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">Histórico</div>
              <div className="text-xs text-gray-500">rodadas recentes</div>
            </div>

            {history.length === 0 && <div className="text-sm text-gray-500">Sem histórico ainda.</div>}

            <ul className="space-y-2">
              {history.map(h => (
                <li key={h.id} className="flex items-center justify-between border rounded p-2">
                  <div>
                    <div className="text-sm font-medium">
                      R$ {fmt(h.bet)} → {h.result === 'lose' ? 'Perdeu' : 'Ganhou'}
                    </div>
                    <div className="text-xs text-gray-500">
                      x{fmt(h.multiplier)} • payout R$ {fmt(h.payout)} • {h.time}
                    </div>
                  </div>
                  <div className={`text-sm font-semibold ${h.result === 'lose' ? 'text-rose-600' : 'text-green-600'}`}>
                    {h.result === 'lose' ? '- R$0' : `+ R$${fmt(h.payout)}`}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto mt-8 text-xs text-gray-400">
        Esta página é uma imitação UI/UX para demonstração — NÃO é um sistema de apostas reais. Use somente para desenvolvimento e testes.
      </footer>
    </div>
  );
}
