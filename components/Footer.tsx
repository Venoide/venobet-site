export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <div>© {new Date().getFullYear()} Venobet</div>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="/terms">Termos</a>
          <a href="/privacy">Privacidade</a>
        </div>
      </div>
    </footer>
  )
}
