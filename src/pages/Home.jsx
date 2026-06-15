import AnimatedSection from '../components/AnimatedSection'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Coffee, Wifi, MapPin, Clock } from 'lucide-react'
import { coffeeMenu, foodMenu } from '../data/menuData'
import MenuCard from '../components/MenuCard'
import heroImg from '../assets/Home.WebP'
import aboutImg from '../assets/about.WebP'
import ctaHomeImg from '../assets/cta-home.WebP'
import WaveDivider from '../components/WaveDivider'
import { Helmet } from 'react-helmet-async'



function Home() {
  const navigate = useNavigate()
  return (
    <div>
       <Helmet>
        <title>Senja Coffee & Co. | Coffee Shop Cikarang</title>
        <meta name="description" content="Tempat ngopi santai dengan suasana hangat, kopi berkualitas, dan senja yang selalu indah di Cikarang, Jawa Barat." />
      </Helmet>
      {/* Hero Section */}
      <section
        className="h-[95vh] flex flex-col justify-center items-center text-center text-white bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <h1 className="text-5xl font-bold mb-4">Senja Coffee & Co</h1>
        <p className="text-xl mb-6">Tempat ngopi santai untuk menikmati senja</p>
        <Link
        to="/menu"
        className="bg-amber-700 hover:bg-amber-800 px-6 py-3 rounded-full font-semibold transition"
        >
         Lihat Menu
        </Link>

    {/* Gradient fade ke section berikutnya */}
       <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white"></div>
      </section>

      {/* About Teaser */}
      <AnimatedSection direction="up" delay={0.1}>
      <section className="flex flex-col md:flex-row items-center gap-8 px-8 py-16 max-w-5xl mx-auto">
        <img
          src={aboutImg}
          alt="Suasana Senja Coffee & Co"
          className="rounded-lg w-full md:w-1/2"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4 text-amber-900">Tentang Kami</h2>
          <p className="text-gray-700 mb-4">
            Senja Coffee & Co adalah tempat ngopi dengan suasana hangat dan nyaman,
            cocok untuk bersantai, bekerja, atau berkumpul bersama teman.
          </p>
          <Link to="/about" className="text-amber-700 font-semibold hover:underline">
            Selengkapnya →
          </Link>
        </div>
      </section>
      </AnimatedSection>

      <WaveDivider color="#fffbeb" />  {/* #fffbeb = warna amber-50, warna section selanjutnya */}
      
      {/* Why Choose Us */}
      <AnimatedSection direction="up" delay={0.1}>
      <section className="bg-amber-50 px-8 py-16 ">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-12">Mengapa Pilih Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Coffee className="w-10 h-10 text-amber-700 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Kopi Premium</h3>
              <p className="text-gray-600 text-sm">Biji kopi pilihan dengan rasa konsisten</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Wifi className="w-10 h-10 text-amber-700 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Wifi Cepat</h3>
              <p className="text-gray-600 text-sm">Cocok untuk kerja atau belajar</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <MapPin className="w-10 h-10 text-amber-700 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Lokasi Strategis</h3>
              <p className="text-gray-600 text-sm">Mudah dijangkau terletak di pusat kota</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Clock className="w-10 h-10 text-amber-700 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Buka Setiap Hari</h3>
              <p className="text-gray-600 text-sm">Siap menemani harimu kapan saja</p>
            </div>
          </div>
        </div>
      </section>
      </AnimatedSection>

      <WaveDivider color="#ffffff" flip />

      {/* Featured Menu Section */}
      <AnimatedSection direction="up" delay={0.1}>
      <section className="bg-white px-8 pt-8 pb-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-amber-900">Menu Favorit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <MenuCard
            name={coffeeMenu[4].name}
            price={coffeeMenu[4].price}
            image={coffeeMenu[4].image}
            onClick={() => navigate('/menu', { state: { openItem: coffeeMenu[4] } })}
          />
          <MenuCard
            name={coffeeMenu[2].name}
            price={coffeeMenu[2].price}
            image={coffeeMenu[2].image}
            onClick={() => navigate('/menu', { state: { openItem: coffeeMenu[2] } })}
          />
          <MenuCard
            name={foodMenu[0].name}
            price={foodMenu[0].price}
            image={foodMenu[0].image}
            onClick={() => navigate('/menu', { state: { openItem: foodMenu[0] } })}
          />
        </div>
      </section>
      </AnimatedSection>


      {/* CTA Emosional */}
      <AnimatedSection direction="fade" delay={0.1}>
      <section
        className="relative flex items-center justify-center text-center text-white bg-cover bg-center py-32"
        style={{ backgroundImage: `url(${ctaHomeImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-amber-950"></div>

        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <p className="text-amber-300 font-semibold uppercase text-sm tracking-widest mb-4">
             Sudah lama tidak ngopi santai?
          </p>
          <h2 className="text-1.5xl md:text-2xl font-bold mb-6 leading-tight">
             Senja Selalu Indah,<br />Apalagi dengan Kopi Kami
          </h2>
          <p className="text-amber-100 text-lg mb-15">
            Temukan ketenangan di setiap cangkir — hadir untuk menemani harimu,
            dari pagi yang sibuk hingga senja yang damai.
          </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/menu')}
            className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-7 py-2 rounded-full transition text-lg shadow-lg"
          >
           Lihat Menu Kami
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="bg-transparent hover:bg-white/10 text-white font-semibold px-7 py-2 rounded-full border-2 border-amber-300 text-amber-300 hover:text-white transition text-lg"
          >
             Kunjungi Kami
          </button>
        </div>
      </div>
    </section>
    </AnimatedSection>

    </div>
  )
}

export default Home