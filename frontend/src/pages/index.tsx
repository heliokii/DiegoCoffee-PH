import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import LayoutGuest from '../layouts/Guest';
import { getPageTitle } from '../config';
import SectionMain from '../components/SectionMain';
import BaseButton from '../components/BaseButton';
import {
  mdiCoffee,
  mdiGlassCocktail,
  mdiHamburger,
  mdiMapMarker,
  mdiEmail,
  mdiCreation,
  mdiCalendarClock,
  mdiInstagram,
  mdiArrowDown,
  mdiBottleWine,
} from '@mdi/js';
import BaseIcon from '../components/BaseIcon';
import CardBoxModal from '../components/CardBoxModal';

const DecorativeElements = () => (
  <div className='fixed inset-0 pointer-events-none overflow-hidden z-0'>
    <div className='absolute top-[10%] left-[5%] animate-float opacity-10'>
      <BaseIcon path={mdiCoffee} size={120} className='text-diego-accent' />
    </div>
    <div className='absolute top-[40%] right-[5%] animate-float opacity-10 delay-1000'>
      <BaseIcon
        path={mdiGlassCocktail}
        size={150}
        className='text-diego-accent'
      />
    </div>
    <div className='absolute bottom-[10%] left-[15%] animate-float opacity-10 delay-500'>
      <BaseIcon path={mdiBottleWine} size={100} className='text-diego-accent' />
    </div>
  </div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-diego-navy/95 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-8'}`}
    >
      <div className='container mx-auto px-6 flex justify-between items-center'>
        <Link href='#home' className='flex items-center group'>
          <img
            src='/logo.png'
            alt='Diego by atelorie'
            className='h-12 md:h-14 w-auto object-contain hover:opacity-90 transition-opacity'
          />
        </Link>
        <div className='hidden md:flex items-center space-x-10'>
          {['Home', 'About', 'Menu', 'Locations', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className='text-white font-display font-normal uppercase tracking-[0.2em] text-xs hover:text-diego-accent transition-colors'
            >
              {item}
            </a>
          ))}
          <a
            href='https://instagram.com/diego.byatelorie'
            target='_blank'
            rel='noopener noreferrer'
            className='text-white hover:text-diego-accent transition-colors'
          >
            <BaseIcon path={mdiInstagram} size={24} />
          </a>
        </div>
        <a
          href='#contact'
          className='bg-diego-accent hover:bg-yellow-500 text-white px-6 py-2 rounded-full font-display uppercase tracking-widest text-[10px] shadow-xl transform hover:scale-105 transition-all'
        >
          Book Event
        </a>
      </div>
    </nav>
  );
};

const DiegoHero = () => (
  <section
    id='home'
    className='relative min-h-screen flex items-center justify-center bg-diego-navy text-white overflow-hidden'
  >
    <div className='absolute inset-0 opacity-20'>
      <div className='absolute top-20 left-10 w-96 h-96 bg-diego-accent rounded-full blur-[120px] animate-pulse'></div>
      <div className='absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px] animate-pulse delay-700'></div>
    </div>
    <div className='container mx-auto px-6 relative z-10 text-center'>
      <div className='mb-8 inline-block animate-chaos-shake'>
        <BaseIcon
          path={mdiCreation}
          size={64}
          className='text-diego-accent animate-sparkle'
        />
      </div>
      <h1 className='text-7xl md:text-[12rem] font-heading text-diego-accent mb-4 drop-shadow-2xl hover:rotate-2 transition-transform cursor-default select-none'>
        Diego
      </h1>
      <p className='text-2xl md:text-5xl font-comic font-normal mb-12 italic tracking-[0.2em] uppercase opacity-90'>
        Coffee • Cocktails • Chaos 💙
      </p>
      <h2 className='text-4xl md:text-6xl font-display font-normal mb-16 max-w-4xl mx-auto leading-[1.1] tracking-tight'>
        A little playground in Lucena. <br className='hidden md:block' />
        <span className='text-diego-accent bg-white/5 px-4 rounded-3xl backdrop-blur-sm'>
          Beautifully unhinged.
        </span>
      </h2>
      <div className='flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8'>
        <a
          href='#menu'
          className='group bg-diego-accent hover:bg-yellow-500 text-white px-12 py-5 rounded-full text-2xl font-display transition-all transform hover:scale-110 shadow-[0_20px_50px_rgba(250,204,21,0.4)] flex items-center space-x-4'
        >
          <span>Drink the feelings</span>
          <BaseIcon
            path={mdiArrowDown}
            size={24}
            className='group-hover:translate-y-1 transition-transform'
          />
        </a>
        <a
          href='#contact'
          className='border-4 border-white hover:bg-white hover:text-diego-navy text-white px-12 py-5 rounded-full text-2xl font-display transition-all transform hover:scale-105 uppercase tracking-widest'
        >
          Play with Diego
        </a>
      </div>
      <div className='mt-20'>
        <p className='text-white/40 font-display text-sm uppercase tracking-[0.5em] animate-bounce'>
          This is your sign
        </p>
      </div>
    </div>
  </section>
);

const BrandStory = () => (
  <section
    id='about'
    className='py-32 bg-white text-diego-navy relative overflow-hidden'
  >
    <div className='absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-diego-accent/5 rounded-full blur-3xl'></div>
    <div className='container mx-auto px-6'>
      <div className='flex flex-col lg:flex-row items-center gap-20'>
        <div className='lg:w-1/2 mb-12 lg:mb-0'>
          <div className='inline-block px-6 py-2 bg-diego-navy text-white text-sm font-display rounded-full mb-10 uppercase tracking-[0.3em]'>
            The Brand Story
          </div>
          <h2 className='text-6xl md:text-9xl font-heading text-diego-accent mb-10 -ml-2 leading-none'>
            Our Story
          </h2>
          <p className='text-2xl md:text-4xl leading-snug mb-10 font-light tracking-tight'>
            Mabuhay to Diego! From beachfront brews to cozy haunts, we bring fun
            to every sip. Diego is more than just a shop; it&apos;s your{' '}
            <span className='font-bold underline decoration-diego-accent decoration-[10px] underline-offset-8'>
              playground in Quezon
            </span>
            .
          </p>
          <div className='relative mb-12'>
            <div className='absolute -left-10 top-0 bottom-0 w-2 bg-diego-accent rounded-full'></div>
            <p className='text-2xl font-sans leading-relaxed italic text-diego-navy/70 pl-6'>
              &quot;Making specialty coffee and cocktails accessible, fun, and
              beautifully chaotic for everyone.&quot;
            </p>
          </div>
          <div className='p-10 bg-diego-navy text-white rounded-[4rem] rounded-tr-none shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform relative group'>
            <div className='absolute -top-6 -right-6 w-20 h-20 bg-diego-accent rounded-full flex items-center justify-center animate-chaos-shake group-hover:scale-110 transition-transform'>
              <BaseIcon path={mdiCreation} size={32} color='white' />
            </div>
            <h3 className='text-4xl font-heading mb-6 text-diego-accent'>
              Celebrating 2 Years!
            </h3>
            <p className='text-xl opacity-90'>
              Our main playground in Pleasantville, Lucena is still the heart of
              the chaos. Join the party! #PlayWithDiego
            </p>
          </div>
        </div>
        <div className='lg:w-1/2 relative'>
          <div className='grid grid-cols-2 gap-6 relative z-10'>
            <div className='space-y-6'>
              <div className='h-80 bg-diego-navy rounded-4xl overflow-hidden shadow-2xl transform -rotate-2'>
                <img
                  src='https://images.pexels.com/photos/1233528/pexels-photo-1233528.jpeg?auto=compress&cs=tinysrgb&w=800'
                  alt='Drink'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='h-64 bg-diego-accent rounded-4xl overflow-hidden shadow-2xl transform rotate-2'>
                <img
                  src='https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800'
                  alt='Vibe'
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
            <div className='space-y-6 mt-12'>
              <div className='h-64 bg-gray-200 rounded-4xl overflow-hidden shadow-2xl transform rotate-3'>
                <img
                  src='https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&w=800'
                  alt='Shop'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='h-80 bg-diego-navy rounded-4xl overflow-hidden shadow-2xl transform -rotate-1'>
                <img
                  src='https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=800'
                  alt='Details'
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </div>
          <div className='absolute -bottom-10 -left-10 w-48 h-48 bg-white border-[12px] border-diego-accent rounded-full flex items-center justify-center text-diego-navy shadow-[0_30px_60px_rgba(0,0,0,0.1)] z-20 animate-spin-slow'>
            <p className='text-center font-black text-2xl leading-tight'>
              100%
              <br />
              UNHINGED
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MenuPreview = () => {
  const [activeTab, setActiveTab] = useState('Coffee');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const categories = [
    { name: 'Coffee', icon: mdiCoffee },
    { name: 'Cocktail', icon: mdiGlassCocktail },
    { name: 'Food', icon: mdiHamburger },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/menu_items');
        setItems(response.data.rows || []);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => item.item_type === activeTab);

  return (
    <section id='menu' className='py-32 bg-gray-50 relative overflow-hidden'>
      <div className='absolute top-1/2 left-0 w-96 h-96 bg-diego-accent/5 blur-3xl rounded-full'></div>
      <div className='container mx-auto px-6 text-center relative z-10'>
        <h2 className='text-7xl md:text-9xl font-heading text-diego-accent mb-6'>
          Playground Menu
        </h2>
        <p className='mb-20 text-2xl font-display tracking-[0.3em] text-diego-navy uppercase opacity-60 italic'>
          Experiment with flavors
        </p>

        <div className='flex flex-wrap justify-center mb-20 gap-6'>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={`flex items-center space-x-4 px-10 py-5 rounded-[2rem] transition-all transform duration-300 ${
                activeTab === cat.name
                  ? 'bg-diego-accent text-white scale-110 shadow-[0_20px_40px_rgba(250,204,21,0.3)] rotate-2'
                  : 'bg-white text-diego-navy hover:bg-gray-100 hover:scale-105 shadow-md'
              }`}
            >
              <BaseIcon path={cat.icon} size={32} />
              <span className='font-black text-xl uppercase tracking-widest'>
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className='py-32 flex flex-col items-center'>
            <div className='w-24 h-24 border-8 border-diego-accent border-t-transparent rounded-full animate-spin mb-8 shadow-xl'></div>
            <p className='font-black text-2xl text-diego-navy animate-pulse uppercase tracking-widest'>
              Organizing the chaos...
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group bg-white p-12 rounded-[4rem] shadow-xl hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100 text-left cursor-pointer relative overflow-hidden ${idx % 2 === 0 ? 'lg:translate-y-12' : ''}`}
              >
                <div className='absolute top-0 right-0 w-32 h-32 bg-diego-accent/5 rounded-bl-[4rem] transition-all group-hover:bg-diego-accent/20'></div>
                {item.is_featured && (
                  <div className='absolute top-6 left-6 bg-diego-accent text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-sparkle shadow-lg'>
                    Must Try
                  </div>
                )}
                <div className='flex justify-between items-start mb-8 relative z-10 pt-4'>
                  <h3 className='text-4xl font-bold group-hover:text-diego-accent transition-colors leading-tight pr-4'>
                    {item.title}
                  </h3>
                  <div className='flex flex-col items-end'>
                    <span className='text-diego-accent font-black text-3xl'>
                      ₱{item.price}
                    </span>
                  </div>
                </div>
                <p className='text-gray-500 mb-10 text-xl leading-relaxed relative z-10 font-light'>
                  {item.description}
                </p>
                <div className='flex items-center justify-between relative z-10'>
                  <div className='flex items-center space-x-3 text-sm font-black text-diego-navy uppercase tracking-widest group-hover:text-diego-accent transition-all'>
                    <span>View Ingredients</span>
                    <BaseIcon
                      path={mdiCreation}
                      size={20}
                      className='group-hover:rotate-45 transition-transform'
                    />
                  </div>
                  <div className='w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-diego-accent group-hover:text-white transition-colors'>
                    <BaseIcon
                      path={mdiArrowDown}
                      size={20}
                      className='-rotate-90'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className='mt-32 p-16 bg-diego-navy rounded-[5rem] text-white inline-block shadow-2xl transform rotate-1 relative overflow-hidden group'>
          <div className='absolute inset-0 bg-diego-accent opacity-0 group-hover:opacity-10 transition-opacity'></div>
          <p className='text-3xl font-heading mb-4 italic'>
            Feeling adventurous?
          </p>
          <p className='text-diego-accent text-2xl font-black tracking-[0.3em] uppercase animate-pulse'>
            Ask our Baristas for the &quot;Chaos special&quot;!
          </p>
          <div className='absolute -bottom-10 -right-10 opacity-10 rotate-12 group-hover:scale-125 transition-transform'>
            <BaseIcon path={mdiCreation} size={150} />
          </div>
        </div>
      </div>

      <CardBoxModal
        title={selectedItem?.title || ''}
        buttonColor='info'
        buttonLabel='Got it!'
        isActive={!!selectedItem}
        onConfirm={() => setSelectedItem(null)}
        onCancel={() => setSelectedItem(null)}
      >
        <div className='p-6'>
          <div className='flex items-center justify-center mb-10'>
            <div className='w-24 h-24 bg-diego-accent/10 rounded-4xl flex items-center justify-center animate-chaos-shake'>
              <BaseIcon
                path={mdiCreation}
                size={48}
                className='text-diego-accent'
              />
            </div>
          </div>
          <h4 className='text-diego-navy font-black uppercase tracking-[0.3em] text-xs mb-6 text-center opacity-50'>
            What&apos;s inside the chaos
          </h4>
          <p className='text-3xl italic mb-10 text-center leading-tight'>
            &quot;{selectedItem?.description}&quot;
          </p>
          <div className='flex flex-wrap justify-center gap-4 mb-10'>
            {selectedItem?.ingredients
              ?.split(',')
              .map((ing: string, i: number) => (
                <span
                  key={i}
                  className='bg-diego-navy/5 px-6 py-3 rounded-2xl text-lg font-bold border border-diego-navy/5 text-diego-navy'
                >
                  {ing.trim()}
                </span>
              ))}
          </div>
          <div className='mt-10 pt-10 border-t-4 border-dashed border-gray-100 flex items-center justify-between'>
            <div>
              <p className='font-heading text-3xl text-diego-navy'>
                Diego Special
              </p>
              <p className='text-[10px] font-black uppercase tracking-[0.4em] text-diego-accent'>
                #PlayWithDiego
              </p>
            </div>
            <span className='text-5xl font-black text-diego-accent'>
              ₱{selectedItem?.price}
            </span>
          </div>
        </div>
      </CardBoxModal>
    </section>
  );
};

const ContactBooking = ({ locations }: { locations: any[] }) => {
  const [activeForm, setActiveForm] = useState<'reservation' | 'pitch'>(
    'reservation',
  );
  const [formData, setFormData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError('');

    try {
      if (activeForm === 'reservation') {
        await axios.post('/reservations', {
          data: {
            ...formData,
            reservation_start: new Date(formData.date + 'T' + formData.time),
            status: 'pending',
          },
        });
      } else {
        await axios.post('/pitches', {
          data: {
            ...formData,
            submitted_at: new Date(),
            notified: false,
          },
        });
      }
      setSuccess(true);
      setFormData({});
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(
        err.response?.data?.message ||
          'Something went wrong. Chaos in the server!',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id='contact'
      className='py-32 bg-diego-navy text-white relative overflow-hidden'
    >
      <div className='absolute top-0 right-0 w-[800px] h-[800px] bg-diego-accent opacity-5 rounded-full -mr-[400px] -mt-[400px]'></div>
      <div className='container mx-auto px-6 relative z-10'>
        <div className='flex flex-col lg:flex-row gap-24 items-center'>
          <div className='lg:w-1/2'>
            <h2 className='text-7xl md:text-9xl font-heading text-diego-accent mb-10 leading-none'>
              Let&apos;s Play
            </h2>
            <p className='text-3xl md:text-4xl mb-16 font-light leading-snug opacity-90'>
              Planning a birthday, wedding, or corporate event? Or maybe you
              have a wild collaboration idea?
              <span className='block mt-6 text-diego-accent font-bold text-5xl italic tracking-tighter animate-chaos-shake'>
                &quot;This is your sign&quot;
              </span>
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 mb-16'>
              <div className='flex items-center space-x-8 p-10 bg-white/5 rounded-[3rem] hover:bg-white/10 transition-all border border-white/10 group cursor-default'>
                <div className='bg-diego-accent p-6 rounded-3xl shadow-2xl group-hover:rotate-12 transition-transform'>
                  <BaseIcon path={mdiEmail} size={40} color='white' />
                </div>
                <div>
                  <p className='text-[10px] uppercase tracking-[0.4em] text-white/40 mb-2 font-black'>
                    Pitch your idea
                  </p>
                  <p className='text-3xl font-bold group-hover:text-diego-accent transition-colors'>
                    hello@diego.ph
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-8 p-10 bg-white/5 rounded-[3rem] hover:bg-white/10 transition-all border border-white/10 group cursor-default'>
                <div className='bg-diego-accent p-6 rounded-3xl shadow-2xl group-hover:-rotate-12 transition-transform'>
                  <BaseIcon path={mdiMapMarker} size={40} color='white' />
                </div>
                <div>
                  <p className='text-[10px] uppercase tracking-[0.4em] text-white/40 mb-2 font-black'>
                    The Playgrounds
                  </p>
                  <p className='text-3xl font-bold group-hover:text-diego-accent transition-colors'>
                    Lucena • Sariaya
                  </p>
                </div>
              </div>
            </div>

            <div className='p-12 border-4 border-dashed border-white/10 rounded-[4rem] opacity-40 hover:opacity-100 transition-opacity text-center lg:text-left'>
              <p className='font-heading text-4xl mb-4 italic text-diego-accent'>
                Play with Diego
              </p>
              <p className='uppercase tracking-[0.5em] text-sm font-black opacity-60'>
                #DiegoByAteLorie #PlayWithDiego
              </p>
            </div>
          </div>

          <div className='lg:w-1/2 w-full'>
            <div className='bg-white text-diego-navy p-12 md:p-20 rounded-[5rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative overflow-hidden transform lg:rotate-1'>
              <div className='flex mb-12 bg-gray-100 p-3 rounded-[2.5rem]'>
                <button
                  onClick={() => {
                    setActiveForm('reservation');
                    setSuccess(false);
                  }}
                  className={`flex-1 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all duration-300 ${activeForm === 'reservation' ? 'bg-diego-accent text-white shadow-2xl' : 'text-diego-navy hover:bg-gray-200'}`}
                >
                  Book Your Chaos
                </button>
                <button
                  onClick={() => {
                    setActiveForm('pitch');
                    setSuccess(false);
                  }}
                  className={`flex-1 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all duration-300 ${activeForm === 'pitch' ? 'bg-diego-accent text-white shadow-2xl' : 'text-diego-navy hover:bg-gray-200'}`}
                >
                  Pitch an Idea
                </button>
              </div>

              {success ? (
                <div className='py-24 text-center animate-fade-in'>
                  <div className='w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner'>
                    <BaseIcon
                      path={mdiCreation}
                      size={64}
                      className='animate-sparkle'
                    />
                  </div>
                  <h3 className='text-5xl font-heading mb-6 text-diego-accent'>
                    Message Received!
                  </h3>
                  <p className='text-2xl text-gray-500 mb-12 font-light'>
                    The chaos is being organized. We&apos;ll get back to you
                    soon!
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className='bg-diego-navy text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-diego-accent transition-colors shadow-xl'
                  >
                    Send another plan
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className='space-y-10 animate-fade-in'
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                    <div className='relative group'>
                      <label className='block text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-diego-accent transition-colors'>
                        Your Name
                      </label>
                      <input
                        required
                        name='name'
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        type='text'
                        className='w-full bg-gray-50 border-4 border-transparent border-b-gray-100 focus:border-b-diego-accent rounded-2xl px-8 py-5 focus:outline-none transition-all font-bold text-lg'
                        placeholder='Diego de la Vega'
                      />
                    </div>
                    <div className='relative group'>
                      <label className='block text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-diego-accent transition-colors'>
                        Your Email
                      </label>
                      <input
                        required
                        name='email'
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        type='email'
                        className='w-full bg-gray-50 border-4 border-transparent border-b-gray-100 focus:border-b-diego-accent rounded-2xl px-8 py-5 focus:outline-none transition-all font-bold text-lg'
                        placeholder='diego@play.ph'
                      />
                    </div>
                  </div>

                  {activeForm === 'reservation' ? (
                    <>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                        <div className='relative group'>
                          <label className='block text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-diego-accent transition-colors'>
                            Date
                          </label>
                          <input
                            required
                            name='date'
                            value={formData.date || ''}
                            onChange={handleInputChange}
                            type='date'
                            className='w-full bg-gray-50 border-4 border-transparent border-b-gray-100 focus:border-b-diego-accent rounded-2xl px-8 py-5 focus:outline-none transition-all font-bold text-lg'
                          />
                        </div>
                        <div className='relative group'>
                          <label className='block text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-diego-accent transition-colors'>
                            Time
                          </label>
                          <input
                            required
                            name='time'
                            value={formData.time || ''}
                            onChange={handleInputChange}
                            type='time'
                            className='w-full bg-gray-50 border-4 border-transparent border-b-gray-100 focus:border-b-diego-accent rounded-2xl px-8 py-5 focus:outline-none transition-all font-bold text-lg'
                          />
                        </div>
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                        <div className='relative group'>
                          <label className='block text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-diego-accent transition-colors'>
                            Party Size
                          </label>
                          <input
                            required
                            name='party_size'
                            value={formData.party_size || ''}
                            onChange={handleInputChange}
                            type='number'
                            min='1'
                            className='w-full bg-gray-50 border-4 border-transparent border-b-gray-100 focus:border-b-diego-accent rounded-2xl px-8 py-5 focus:outline-none transition-all font-bold text-lg'
                            placeholder='2'
                          />
                        </div>
                        <div className='relative group'>
                          <label className='block text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-diego-accent transition-colors'>
                            Location
                          </label>
                          <select
                            required
                            name='location'
                            value={formData.location || ''}
                            onChange={handleInputChange}
                            className='w-full bg-gray-50 border-4 border-transparent border-b-gray-100 focus:border-b-diego-accent rounded-2xl px-8 py-5 focus:outline-none transition-all font-bold text-lg appearance-none cursor-pointer'
                          >
                            <option value=''>Select Location</option>
                            {locations.map((loc) => (
                              <option key={loc.id} value={loc.id}>
                                {loc.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className='relative group'>
                      <label className='block text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-diego-accent transition-colors'>
                        Pitch Type
                      </label>
                      <select
                        name='pitch_type'
                        value={formData.pitch_type || 'event'}
                        onChange={handleInputChange}
                        className='w-full bg-gray-50 border-4 border-transparent border-b-gray-100 focus:border-b-diego-accent rounded-2xl px-8 py-5 focus:outline-none transition-all font-bold text-lg appearance-none cursor-pointer'
                      >
                        <option value='event'>Event Space</option>
                        <option value='collaboration'>
                          Brand Collaboration
                        </option>
                        <option value='sponsorship'>Sponsorship</option>
                        <option value='other'>Something Else</option>
                      </select>
                    </div>
                  )}

                  <div className='relative group'>
                    <label className='block text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-diego-accent transition-colors'>
                      The Message
                    </label>
                    <textarea
                      required
                      name='message'
                      value={formData.message || ''}
                      onChange={handleInputChange}
                      rows={4}
                      className='w-full bg-gray-50 border-4 border-transparent border-b-gray-100 focus:border-b-diego-accent rounded-2xl px-8 py-5 focus:outline-none transition-all font-bold text-lg'
                      placeholder='Tell us about your chaotic plan...'
                    ></textarea>
                  </div>

                  {error && (
                    <p className='text-red-500 font-bold text-sm bg-red-50 p-6 rounded-2xl border-l-8 border-red-500 animate-chaos-shake'>
                      {error}
                    </p>
                  )}

                  <button
                    disabled={submitting}
                    className={`group w-full bg-diego-accent hover:bg-yellow-500 text-white font-black py-6 rounded-[2.5rem] transition-all duration-300 shadow-[0_20px_50px_rgba(250,204,21,0.3)] transform hover:-translate-y-2 flex items-center justify-center space-x-6 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className='uppercase tracking-[0.4em] text-xl'>
                      {submitting ? 'Sending...' : 'Let&apos;s Play!'}
                    </span>
                    {!submitting && (
                      <BaseIcon
                        path={mdiCreation}
                        size={32}
                        className='group-hover:rotate-180 transition-transform duration-500'
                      />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Locations = ({ locations }: { locations: any[] }) => {
  return (
    <section id='locations' className='py-32 bg-white relative overflow-hidden'>
      <div className='container mx-auto px-6 text-center'>
        <h2 className='text-7xl md:text-[10rem] font-heading text-diego-accent mb-12 leading-none'>
          Find the Chaos
        </h2>
        <p className='mb-24 text-2xl font-display tracking-[0.5em] text-diego-navy uppercase opacity-30 italic'>
          Locate the Playground
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-32'>
          {locations.map((loc) => (
            <div key={loc.id} className='group cursor-default relative'>
              <div className='h-96 bg-diego-navy rounded-[4rem] overflow-hidden mb-10 shadow-2xl relative border-8 border-white group-hover:rotate-2 transition-transform duration-500'>
                <div className='absolute inset-0 bg-diego-navy/40 group-hover:bg-diego-navy/10 transition-colors z-10'></div>
                <img
                  src={
                    loc.name.includes('Lucena')
                      ? 'https://images.pexels.com/photos/1233528/pexels-photo-1233528.jpeg'
                      : 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg'
                  }
                  alt={loc.name}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                />
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20'>
                  <div className='bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl'>
                    <BaseIcon
                      path={mdiMapMarker}
                      size={48}
                      className='text-diego-accent animate-bounce'
                    />
                  </div>
                </div>
              </div>
              <h3 className='text-4xl font-black text-diego-navy mb-4 group-hover:text-diego-accent transition-colors uppercase tracking-tighter leading-none'>
                {loc.name}
              </h3>
              <p className='text-xl text-gray-400 mb-8 font-medium italic max-w-xs mx-auto'>
                {loc.address}
              </p>
              <div className='inline-flex items-center space-x-3 bg-diego-navy text-white px-8 py-4 rounded-3xl shadow-xl group-hover:bg-diego-accent transition-colors'>
                <BaseIcon
                  path={mdiCalendarClock}
                  size={24}
                  className='text-diego-accent group-hover:text-white'
                />
                <span className='font-black text-xs uppercase tracking-[0.2em]'>
                  {loc.hours}
                </span>
              </div>
              {loc.name.includes('Lucban') && (
                <div className='mt-8 bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] animate-pulse border-2 border-red-100 inline-block'>
                  ⚠️ Closing soon - Still open til Jan 24!
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='bg-gray-50 p-20 rounded-[5rem] border-4 border-dashed border-gray-200 max-w-5xl mx-auto relative overflow-hidden group'>
          <div className='absolute -top-10 -left-10 w-40 h-40 bg-diego-accent/5 rounded-full group-hover:scale-150 transition-transform duration-700'></div>
          <h4 className='text-4xl font-heading mb-12 text-diego-navy'>
            Special Holiday Hours
          </h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 text-left relative z-10'>
            <div className='p-10 bg-white rounded-[3rem] shadow-xl border border-gray-100 transform -rotate-1 group-hover:rotate-0 transition-transform'>
              <p className='font-black text-diego-accent uppercase text-xs tracking-[0.4em] mb-4'>
                Dec 23 & 26–30
              </p>
              <p className='text-3xl font-bold text-diego-navy'>3PM – 11PM</p>
            </div>
            <div className='p-10 bg-white rounded-[3rem] shadow-xl border border-gray-100 opacity-40 transform rotate-1 group-hover:rotate-0 transition-transform'>
              <p className='font-black text-gray-400 uppercase text-xs tracking-[0.4em] mb-4'>
                Dec 24–25 & 31
              </p>
              <p className='text-3xl font-bold text-gray-400 italic underline decoration-red-500 decoration-4'>
                Closed for the Chaos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function DiegoApp() {
  const title = 'Diego Coffee & Cocktail Studio';
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/locations').then((res) => setLocations(res.data.rows || []));
  }, []);

  return (
    <div className='scroll-smooth font-sans text-diego-navy selection:bg-diego-accent selection:text-white bg-white'>
      <Head>
        <title>{getPageTitle('Diego')}</title>
        <meta
          name='description'
          content='Diego Coffee & Cocktail Studio - Your playground in Quezon Province. Coffee, Cocktails, Chaos.'
        />
      </Head>

      <Navbar />
      <DecorativeElements />

      <main>
        <DiegoHero />
        <BrandStory />
        <MenuPreview />
        <Locations locations={locations} />
        <ContactBooking locations={locations} />
      </main>

      <footer className='bg-diego-navy text-white py-32 border-t border-white/5 relative overflow-hidden'>
        <div className='absolute bottom-0 right-0 w-[600px] h-[600px] bg-diego-accent opacity-5 rounded-full -mb-[300px] -mr-[300px]'></div>
        <div className='container mx-auto px-6 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-20 mb-20'>
            <div className='lg:col-span-2'>
              <img
                src='/logo.png'
                alt='Diego by atelorie'
                className='h-20 w-auto object-contain mb-8'
              />
              <p className='text-2xl font-sans opacity-60 italic mb-12 max-w-md font-light leading-relaxed'>
                Your little playground in Lucena and beyond. Drink the feelings,
                embrace the chaos, and play with Diego.
              </p>
              <div className='flex space-x-6'>
                {['instagram', 'facebook', 'tiktok'].map((social) => (
                  <a
                    key={social}
                    href='#'
                    className='w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center hover:bg-diego-accent hover:-translate-y-2 transition-all transform hover:rotate-12 group'
                  >
                    <BaseIcon
                      path={mdiCreation}
                      size={28}
                      className='group-hover:animate-chaos-shake'
                    />
                  </a>
                ))}
              </div>
            </div>
            <div className='grid grid-cols-2 gap-12 lg:col-span-2'>
              <div>
                <h4 className='font-display uppercase tracking-[0.4em] text-xs mb-10 text-white/30'>
                  Navigation
                </h4>
                <ul className='space-y-6 text-xl font-sans font-bold'>
                  <li>
                    <a
                      href='#home'
                      className='hover:text-diego-accent transition-colors'
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href='#about'
                      className='hover:text-diego-accent transition-colors'
                    >
                      The Story
                    </a>
                  </li>
                  <li>
                    <a
                      href='#menu'
                      className='hover:text-diego-accent transition-colors'
                    >
                      Playground Menu
                    </a>
                  </li>
                  <li>
                    <a
                      href='#locations'
                      className='hover:text-diego-accent transition-colors'
                    >
                      Locations
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='font-display uppercase tracking-[0.4em] text-xs mb-10 text-white/30'>
                  Admin & Legal
                </h4>
                <ul className='space-y-6 text-xl font-sans font-bold mb-12'>
                  <li>
                    <Link
                      href='/privacy-policy'
                      className='hover:text-diego-accent transition-colors'
                    >
                      Privacy Chaos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/terms-of-use'
                      className='hover:text-diego-accent transition-colors'
                    >
                      Rules of the Playground
                    </Link>
                  </li>
                </ul>
                <Link
                  href='/login'
                  className='inline-flex bg-diego-accent text-white px-10 py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-diego-navy transition-all shadow-2xl transform -rotate-2 hover:rotate-0'
                >
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
          <div className='pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8'>
            <div className='text-center md:text-left'>
              <p className='text-sm opacity-40 font-bold mb-2'>
                © 2026 <span>{title}</span>. All feelings reserved.
              </p>
              <p className='text-[10px] uppercase tracking-[0.8em] opacity-20 font-black'>
                Beautifully unhinged
              </p>
            </div>
            <div className='bg-white/5 px-8 py-4 rounded-2xl backdrop-blur-sm border border-white/5'>
              <p className='text-xs uppercase tracking-[0.4em] text-diego-accent font-black'>
                #PlayWithDiego
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

DiegoApp.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
