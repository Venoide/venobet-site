import Header from './components/Header'
import Footer from './components/Footer'
import Link from 'next/link'

export default function BlazeDemo() {
  return (
    <>
      <Header />

      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Blaze — Demo</h1>
        <p className="text-gray-600 mb-6">Esta é uma página de demonstração para integrar o Blaze. Por enquanto é um placeholder — substitua pelo seu embed/SDK.</p>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="border rounded p-4 bg-white shadow-sm">
            <h2 className="font-semibold mb-2">Embed (placeholder)</h2>
            <div className="bg-gray-100 flex items-center justify-center border rounded h-64">
              <span className="text-gray-500">Coloque aqui o iframe ou o componente do Blaze</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">Se usar iframe, troque o elemento acima por: &lt;iframe src=\"URL_DO_BLAZE\" className=\"w-full h-full\" /&gt;</p>
          </section>

          <aside className="border rounded p-4 bg-white shadow-sm">
            <h2 className="font-semibold mb-2">Ações</h2>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="bg-venobet text-white px-4 py-2 rounded text-center"
              >
                Abrir demo (nova aba)
              </a>

              <Link href="/games">
                <a className="border px-4 py-2 rounded text-center">Voltar para Jogos</a>
              </Link>

            </div>

            <div className="mt-4 text-sm text-gray-500">
              <strong>Dica:</strong> substitua os placeholders pelo SDK/iframe e qualquer script necessário para a integração real.
            </div>
          </aside>
        </div>

        <p className="mt-6 text-sm text-gray-500">Obs: essas ações são placeholders — substitua pelos seus embeds, integrações ou links externos ao Blaze.</p>
      </main>

      <Footer />
    </>
  )
}
