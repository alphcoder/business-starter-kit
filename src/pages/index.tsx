import Head from 'next/head';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Starter Kit — Сайт для бизнеса</title>
        <meta name="description" content="Брендинг, веб-разработка и маркетинг для бизнеса" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-gray-900 min-h-screen text-white">
        <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <span className="text-xl font-bold">Starter Kit</span>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#services" className="hover:text-white">Услуги</a>
              <a href="#contact" className="hover:text-white">Контакты</a>
            </div>
          </div>
        </nav>

        <Hero />
        <Services />

        <section id="contact" className="py-20 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Оставить заявку</h2>
          <ContactForm />
        </section>

        <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800">
          © 2026 Starter Kit. Все права защищены.
        </footer>
      </main>
    </>
  );
}
