import AnimatedSection from '../components/AnimatedSection'
import { Coffee, Leaf, Users, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import WaveDivider from '../components/WaveDivider'
import abouthero from '../assets/about-hero.png'
import aboutstory from '../assets/about-story.png'
import galleryinterior from '../assets/gallery-interior.png'
import galleryroasting from '../assets/gallery-roasting.png'
import gallerybarista from '../assets/gallery-barista.png'
import cofeejourney from '../assets/coffee-journey.png'
import { Helmet } from 'react-helmet-async'



function About() {
  return (
  <div>
    <Helmet>
      <title>Tentang Kami | Senja Coffee & Co.</title>
      <meta name="description" content="Kenali cerita, nilai, dan perjalanan Senja Coffee & Co. — lahir dari kecintaan pada kopi sejak 2020." />
    </Helmet>

    {/* Hero Banner - tanpa animasi, langsung tampil */}
    <section
      className="h-[45vh] flex flex-col justify-center items-center text-center text-white bg-cover bg-center relative"
      style={{ backgroundImage: `url(${abouthero})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10">
        <AnimatedSection direction="down" delay={0.2}>
          <h1 className="text-5xl font-bold mb-4">Tentang Kami</h1>
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.4}>
          <p className="text-xl">Lebih dari sekadar kopi, ini adalah cerita kami</p>
        </AnimatedSection>
      </div>
    </section>

    {/* Our Story */}
    <AnimatedSection direction="up" delay={0.1}>
      <section className="flex flex-col md:flex-row-reverse items-center gap-12 px-8 py-20 max-w-5xl mx-auto">
        <img
          src={aboutstory}
          alt="Cerita Senja Coffee Co."
          className="rounded-lg w-full md:w-1/2 object-cover shadow-lg"
        />
        <div>
          <span className="text-amber-700 font-semibold uppercase text-sm tracking-wide">Cerita Kami</span>
          <h2 className="text-3xl font-bold mb-4 mt-2 text-amber-900">Lahir dari Kecintaan pada Kopi</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Senja Coffee & Co dimulai pada tahun 2020 dari sebuah ruangan kecil
            dengan satu mesin espresso dan mimpi besar: menciptakan tempat di mana
            setiap orang merasa diterima.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Kini, kami terus berkembang sambil menjaga nilai yang sama: kopi
            berkualitas, pelayanan tulus, dan suasana yang membuat siapa pun
            betah berlama-lama.
          </p>
        </div>
      </section>
    </AnimatedSection>

    {/* Our Values */}
    <section className="bg-amber-50 px-8 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedSection direction="up">
          <span className="text-amber-700 font-semibold uppercase text-sm tracking-wide">Nilai Kami</span>
          <h2 className="text-3xl font-bold text-amber-900 mt-2 mb-12">Yang Kami Pegang Setiap Hari</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <AnimatedSection direction="up" delay={0.1}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Coffee className="w-10 h-10 text-amber-700 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Kualitas</h3>
              <p className="text-gray-600 text-sm">Biji kopi pilihan, disangrai dengan presisi untuk rasa terbaik di setiap cangkir.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.2}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Leaf className="w-10 h-10 text-amber-700 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Keberlanjutan</h3>
              <p className="text-gray-600 text-sm">Bekerja sama dengan petani lokal dan mengurangi penggunaan plastik sekali pakai.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.3}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Heart className="w-10 h-10 text-amber-700 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Keramahan</h3>
              <p className="text-gray-600 text-sm">Setiap pelanggan disambut seperti teman lama yang baru pulang ke rumah.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.4}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Users className="w-10 h-10 text-amber-700 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Komunitas</h3>
              <p className="text-gray-600 text-sm">Mendukung musisi, seniman, dan kreator lokal melalui acara rutin kami.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Gallery */}
    <section className="px-8 py-20 max-w-5xl mx-auto">
      <AnimatedSection direction="up">
        <div className="text-center mb-12">
          <span className="text-amber-700 font-semibold uppercase text-sm tracking-wide">Galeri</span>
          <h2 className="text-3xl font-bold text-amber-900 mt-2">Suasana Senja Coffee & Co</h2>
        </div>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatedSection direction="left" delay={0.1}>
          <img src={galleryinterior} alt="Interior" className="rounded-lg w-full h-72 object-cover" />
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.2}>
          <img src={galleryroasting} alt="Proses Roasting" className="rounded-lg w-full h-72 object-cover" />
        </AnimatedSection>
        <AnimatedSection direction="right" delay={0.3}>
          <img src={gallerybarista} alt="Barista" className="rounded-lg w-full h-72 object-cover" />
        </AnimatedSection>
      </div>
    </section>

    {/* Coffee Journey */}
    <section className="bg-amber-900 text-white px-8 py-20">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
        <AnimatedSection direction="left" delay={0.1} className="w-full md:w-1/2">
          <img
            src={cofeejourney}
            alt="Dari Biji ke Cangkir"
            className="rounded-lg w-full object-cover"
          />
        </AnimatedSection>
        <AnimatedSection direction="right" delay={0.2} className="flex-1">
          <span className="text-amber-300 font-semibold uppercase text-sm tracking-wide">Dari Biji ke Cangkir</span>
          <h2 className="text-3xl font-bold mt-2 mb-4">Perjalanan Setiap Cangkir Kopi Kami</h2>
          <p className="text-amber-100 leading-relaxed">
            Kami memilih biji kopi terbaik dari perkebunan lokal, menyangrainya
            dengan resep yang telah disempurnakan selama bertahun-tahun, lalu
            menyeduhnya satu per satu oleh barista berpengalaman kami.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* CTA */}
    <AnimatedSection direction="up" delay={0.1}>
      <section className="px-8 py-16 max-w-5xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-amber-900 mb-4">Penasaran dengan Rasanya?</h3>
        <p className="text-gray-700 mb-6">
          Datang langsung ke Senja Coffee & Co dan rasakan sendiri suasananya.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3 rounded-full transition"
        >
          Hubungi & Kunjungi Kami
        </Link>
      </section>
    </AnimatedSection>
  </div>
)
}

export default About