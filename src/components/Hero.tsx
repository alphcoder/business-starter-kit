export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Создаём бренды,<br />которые запоминают
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Брендинг, веб-разработка и маркетинг для малого и среднего бизнеса.
          От идеи до запуска — берём всё на себя.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="#contact" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-semibold hover:opacity-90">
            Оставить заявку
          </a>
          <a href="#services" className="px-8 py-3 border border-gray-600 rounded-lg text-white hover:bg-gray-800">
            Наши услуги
          </a>
        </div>
      </div>
    </section>
  );
}
