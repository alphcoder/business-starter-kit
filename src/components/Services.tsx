const services = [
  { icon: '🎨', title: 'Брендинг', desc: 'Логотип, фирменный стиль, гайдлайн' },
  { icon: '💻', title: 'Веб-разработка', desc: 'Сайты, лендинги, интернет-магазины' },
  { icon: '📱', title: 'Мобильная адаптация', desc: 'Pixel-perfect под все устройства' },
  { icon: '🔗', title: 'Интеграции', desc: 'CRM, платежи, аналитика, Telegram' },
  { icon: '🚀', title: 'SEO-оптимизация', desc: 'Скорость, метатеги, структура' },
  { icon: '📊', title: 'Аналитика', desc: 'Метрика, конверсии, A/B тесты' },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Наши услуги</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {services.map((s) => (
          <div key={s.title} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors">
            <div className="text-3xl mb-3">{s.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
            <p className="text-gray-400 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
