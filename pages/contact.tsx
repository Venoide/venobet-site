export default function Contact() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Contato</h1>

      <form className="max-w-md">
        <label className="block mb-2">
          <span className="text-sm">Nome</span>
          <input className="mt-1 block w-full border rounded px-3 py-2" name="name" />
        </label>

        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input className="mt-1 block w-full border rounded px-3 py-2" name="email" type="email" />
        </label>

        <label className="block mb-4">
          <span className="text-sm">Mensagem</span>
          <textarea className="mt-1 block w-full border rounded px-3 py-2" name="message" rows={4} />
        </label>

        <button type="submit" className="bg-venobet text-white px-4 py-2 rounded">Enviar</button>

        <p className="text-xs text-gray-500 mt-2">Obs: configure action/handler (SMTP / API) para envio real.</p>
      </form>
    </section>
  )
}
