import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { ThemeToggle } from '@/components/theme-toggle';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import logo from '../../../5fc54084e9c789eb7f3ffced9922d6c6.webp';
import {
  type LucideIcon,
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Brain, CalendarDays,
  Check, ChevronDown, CirclePlay, Clock3, Compass, Heart, Instagram, Mail,
  MapPin, Menu, MessageCircle, Music2, Palette, Phone, ShieldCheck,
  Sparkles, Star, Users, X, Youtube, Facebook, Leaf, Target,
  Accessibility, Lightbulb, TreePine, Dumbbell, Send, Eye, Sun, Baby, Moon, School
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

const programs = [
  { title: 'Play Group', age: '2-3 years', description: 'A warm, engaging, and nurturing start that encourages curiosity and joyful learning.', color: 'bg-[var(--card-playgroup)]', icon: Leaf },
  { title: 'Pre-KG', age: '3-4 years', description: 'Meaningful experiences that encourage creativity, confidence, and communication.', color: 'bg-[var(--card-prekg)]', icon: Sun },
  { title: 'LKG', age: '4-5 years', description: 'A nurturing environment for self-expression, exploration, and holistic development.', color: 'bg-[var(--card-lkg)]', icon: Sparkles },
  { title: 'UKG', age: '5-6 years', description: 'A joyful learning environment that values each child\'s individual growth and care.', color: 'bg-[var(--card-ukg)]', icon: Compass },
];
const teachers = [
  { name: 'Ms. Nivetha', role: 'Early Childhood Educator', detail: 'B.Ed · Early Years', area: 'Language & storytelling', quote: 'Every child learns differently. Our job is to help them discover how they shine.', initials: 'N', tint: 'bg-[var(--bg-section-peach)]' },
  { name: 'Ms. Meera', role: 'Lead Facilitator', detail: 'Montessori Certified', area: 'Creative exploration', quote: 'The smallest questions often open the biggest doors to learning.', initials: 'M', tint: 'bg-[var(--bg-section-sky)]' },
  { name: 'Ms. Kavya', role: 'Movement & Music Guide', detail: 'B.A. Psychology', area: 'Expression & wellbeing', quote: 'When children feel safe to be themselves, learning starts to feel like joy.', initials: 'K', tint: 'bg-[var(--bg-section-lavender)]' },
];

const faqs = [
  ['What age groups does Kids Nest accept?', 'Infant care is available from 12 months. Our school programs are Play Group (2-3 years), Pre-KG (3-4 years), LKG (4-5 years), and UKG (5-6 years).'],
  ['What programs are available?', 'Our early years programs are designed around each stage of development: Play Group, Pre-KG, LKG and UKG. Every program blends play, movement, conversation, creativity and gentle academic foundations.'],
  ['What are the school timings?', 'School office hours are 9:00 AM to 5:00 PM. Daycare is available from 8:00 AM to 6:00 PM. Please contact our admissions team for program-specific schedules.'],
  ['How do I apply for admission?', 'Start by sending an enquiry or booking a school visit. We will share availability, answer your questions and walk you through the simple next steps.'],
  ['Can parents visit the campus?', 'Absolutely. A visit is the best way to experience the nest. Book a school visit and our team will arrange a convenient time to show you around.'],
  ['What activities are included?', 'Children explore art, stories, music, rhymes, cognitive games, nature, physical play, early literacy, early numeracy and social skills through hands-on experiences.'],
  ['How does Kids Nest ensure child safety?', 'Safety is our top priority. Kids Nest maintains a secure, child-friendly environment with multiple layers of protection: CCTV surveillance throughout the campus for continuous monitoring, experienced and trained staff members with expertise in early childhood care, child-friendly furniture designed for safety and comfort, and dedicated security personnel on-site. We combine these physical safeguards with mindful supervision, clear routines, and regular communication with families to create a nurturing space where children can thrive with confidence.'],
  ['Do you provide transportation?', 'Transportation details are currently being finalised. Contact us and we will share the latest availability for your area.'],
  ['How can parents communicate with teachers?', 'Our educators make room for regular parent communication, sharing observations and celebrating each child\'s progress together.'],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function BrandMark() {
  return (
    <a href="#home" className="flex items-center group" data-testid="link-brand" aria-label="Kids Nest home">
      <span className="relative h-[70px] w-[148px] shrink-0 overflow-hidden" aria-hidden="true">
        <img src={logo} alt="" className="absolute left-1/2 top-1/2 w-[180px] max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-multiply transition-transform group-hover:scale-[1.04]" />
      </span>
    </a>
  );
}

function Header({ onEnquire }: { onEnquire: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [['home', 'home'], ['our story', 'story'], ['founder', 'founder'], ['programs', 'programs'], ['activities', 'activities'], ['facility', 'facility'], ['gallery', 'gallery'], ['events', 'events'], ['contact', 'contact']];
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-subtle/70 bg-page/90 backdrop-blur-xl">
      <div className="container-wide flex h-[76px] items-center justify-between">
        <BrandMark />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {links.map(([label, id]) => <a key={id} href={`#${id}`} className="text-[.74rem] font-bold capitalize tracking-[.03em] text-secondary transition-colors hover:text-[#E8231A]" data-testid={`link-nav-${id}`}>{label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={onEnquire} className="hidden rounded-full bg-[#E8231A] px-5 py-3 text-xs font-bold text-white shadow-[0_8px_20px_rgba(232,35,26,.2)] transition-all hover:-translate-y-0.5 hover:bg-[#C41A12] sm:inline-flex" data-testid="button-header-enquire">Book a school visit <ArrowUpRight className="ml-2 size-4" /></button>
          <button onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-full bg-[#eef5f2] text-primary lg:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav className="border-t border-subtle bg-page px-5 py-5 lg:hidden" aria-label="Mobile navigation">
        <div className="container-wide grid gap-1">
          {links.map(([label, id]) => <a onClick={() => setOpen(false)} key={id} href={`#${id}`} className="rounded-xl px-3 py-3 font-bold capitalize text-primary hover:bg-[#eaf5f0]" data-testid={`link-mobile-${id}`}>{label}</a>)}
          <button onClick={() => { setOpen(false); onEnquire(); }} className="mt-2 rounded-xl bg-[#E8231A] px-4 py-3 text-left font-bold text-white" data-testid="button-mobile-enquire">Book a school visit</button>
        </div>
      </nav>}
    </header>
  );
}

function Hero({ onEnquire }: { onEnquire: () => void }) {
  return (
    <section id="home" className="paper-grain relative overflow-hidden bg-section-hero pt-[76px]">
      <div className="absolute -left-24 top-28 size-64 rounded-full bg-[var(--brand-yellow)]/40 blur-3xl" />
      <div className="absolute right-[-120px] top-20 size-96 rounded-full bg-[var(--brand-mint)]/80 blur-3xl" />
      <div className="container-wide relative grid min-h-[720px] items-center gap-12 py-16 lg:grid-cols-[.93fr_1.07fr] lg:py-24">
        <div className="relative z-10 reveal is-visible">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--brand-teal)] bg-[var(--brand-navy)] px-3 py-2 text-[.68rem] font-bold uppercase tracking-[.15em] text-[var(--brand-cream)]"><Sparkles className="size-3.5" /> Coimbatore's little learning world</div>
          <h1 className="max-w-[620px] font-display text-[clamp(3.6rem,7.2vw,6.8rem)] leading-[.91] tracking-[-.065em] text-primary">Where little minds <em className="relative inline-block not-italic text-brand-coral">grow,</em> explore & <span className="relative whitespace-nowrap text-brand-teal">shine<span className="absolute -right-7 -top-5 text-2xl font-bold text-brand-gold">+</span></span></h1>
          <p className="mt-7 max-w-[530px] text-[1.03rem] leading-8 text-secondary">Welcome to Kidsnest - a warm, safe, and engaging learning space in Coimbatore for children aged 12 months and above, where curiosity is encouraged, creativity is celebrated, and every little learner gets the individual care they deserve.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => scrollToId('story')} className="inline-flex items-center rounded-full bg-[#E8231A] px-6 py-4 text-sm font-bold text-white shadow-[0_10px_24px_rgba(232,35,26,.18)] transition-all hover:-translate-y-1 hover:bg-[#C41A12]" data-testid="button-explore">Explore Kids Nest <ArrowDown className="ml-2.5 size-4" /></button>
            <button onClick={onEnquire} className="inline-flex items-center rounded-full border-2 border-primary/15 bg-page/70 px-6 py-4 text-sm font-bold text-primary transition-all hover:-translate-y-1 hover:border-brand-teal hover:text-brand-teal" data-testid="button-hero-visit">Book a school visit <ArrowUpRight className="ml-2.5 size-4" /></button>
          </div>
          <div className="mt-10 flex items-center gap-3 text-xs font-bold text-secondary"><span className="grid size-9 place-items-center rounded-full bg-[var(--brand-yellow)] text-primary"><ShieldCheck className="size-4" /></span> A safe · happy · nurturing place for little learners</div>
        </div>
        <HeroIllustration />
      </div>
      <div className="absolute bottom-[-1px] left-0 right-0 h-12 bg-page [clip-path:ellipse(65%_70%_at_50%_100%)]" />
    </section>
  );
}

function HeroIllustration() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="relative mx-auto w-full reveal is-visible delay-2">
      <div className="space-y-6">
        {/* Decorative elements */}
        <div className="relative">
          <div className="absolute right-[5%] top-[-10px] size-12 rotate-12 rounded-full border-4 border-[var(--brand-yellow)] bg-[var(--brand-cream)] shadow-[0_8px_0_rgba(255,212,90,.2)]" />
          <div className="absolute left-[5%] bottom-[-20px] size-12 rounded-full bg-[var(--brand-coral)] shadow-[0_8px_0_rgba(255,128,107,.15)]" />
        </div>

        {/* Full-width video container */}
        <div className="relative w-full rounded-[44px] border-[8px] border-white bg-[var(--brand-yellow)] p-3 shadow-[0_30px_70px_rgba(32,48,71,.12)]">
          <div className="relative w-full overflow-hidden rounded-[29px] bg-black/5 group cursor-pointer aspect-video">
            <video
              ref={videoRef}
              src="/kidsnest-promo.mp4"
              poster="/gallery/hero.jpeg"
              className="absolute inset-0 h-full w-full object-contain"
              controls={isPlaying}
              controlsList="nodownload"
              loop
              playsInline
              preload="metadata"
              aria-label="Kids Nest school promo video"
            />
            {!isPlaying && (
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 hover:bg-black/30 group-hover:bg-black/30"
                aria-label="Play Kids Nest promo video"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="grid size-16 place-items-center rounded-full bg-white shadow-lg transition-transform group-hover:scale-110">
                    <CirclePlay className="size-8 text-[var(--brand-teal)] fill-[var(--brand-teal)]" />
                  </div>
                  <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-[#203047] shadow-md transition-opacity group-hover:opacity-100">Click to Watch Our Story</span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Wonder lives here badge */}
        <div className="flex justify-end">
          <div className="rotate-[4deg] rounded-2xl bg-white px-4 py-3 shadow-[0_12px_25px_rgba(32,48,71,.12)]">
            <p className="font-display text-lg text-[var(--brand-navy)]">wonder lives here</p>
            <div className="mt-1 flex gap-1 text-[var(--brand-yellow)]">
              <Star className="size-3 fill-current" />
              <Star className="size-3 fill-current" />
              <Star className="size-3 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text, centered = false }: { eyebrow: string; title: string; text?: string; centered?: boolean }) {
  return <div className={`${centered ? 'mx-auto text-center' : ''} max-w-[690px] reveal`}><span className="eyebrow">{eyebrow}</span><h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.4rem)] leading-[.96] tracking-[-.055em] text-primary">{title}</h2>{text && <p className="mt-5 max-w-[590px] text-[1rem] leading-7 text-tertiary">{text}</p>}</div>;
}

function StorySection() {
  const stats = [['12+', 'Months & above welcome'], ['Small', 'Class sizes for individual care'], ['Holistic', 'Child development focus'], ['4', 'Programs offered']];
  return <section id="story" className="section-pad bg-page">
    <div className="container-wide grid items-stretch gap-16 lg:grid-cols-[.86fr_1.14fr]">
      <div className="relative self-stretch reveal">
        <div className="absolute inset-4 overflow-hidden rounded-[40px] shadow-[0_24px_60px_rgba(32,48,71,.14)]">
          <img src="/gallery/story.jpeg" alt="Kids at Kidsnest" className="h-full w-full object-cover" />
        </div>
        <div className="absolute bottom-[10%] right-[-4%] rotate-6 rounded-xl bg-card px-4 py-3 shadow-[0_12px_24px_rgba(32,48,71,.08)]"><Heart className="size-5 fill-[var(--brand-coral)] text-[var(--brand-coral)]" /><p className="mt-1 font-display text-sm">big dreams<br />start small</p></div>
        <div className="absolute bottom-[6%] left-[4%] rounded-full border-2 border-dashed border-[var(--brand-mint)] px-4 py-2 text-xs font-bold text-[var(--brand-mint)]">play • explore • grow</div>
      </div>
      <div>
        <SectionHeading eyebrow="Welcome to Kidsnest" title="A little nest for big dreams" text="Kidsnest was founded with a simple yet meaningful vision - to support working mothers and fathers by creating a warm, safe, and engaging environment for children aged 12 months and above. Today, we are a unique child-centric learning space that focuses on holistic growth, joyful learning, and individual care." />
        <div className="mt-8 grid gap-5">
          <div className="rounded-2xl border border-light bg-card/70 p-5">
            <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-brand-teal"><Lightbulb className="size-4" /> Our Vision</span>
            <p className="text-sm leading-7 text-secondary">At Kidsnest School, our vision is to develop confident, compassionate, and independent young learners by providing a nurturing and stimulating environment that serves as a strong foundation for every child to blossom at his or her own pace. We strive to create meaningful learning experiences that encourage curiosity, creativity, self-expression, and a lifelong love for learning, while helping children grow into responsible and caring individuals.</p>
          </div>
          <div className="rounded-2xl border border-light bg-card/70 p-5">
            <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-brand-coral"><Target className="size-4" /> Our Mission</span>
            <p className="text-sm leading-7 text-secondary">At Kidsnest School, our mission is to create a joyful, safe, and nurturing environment where every child feels valued, confident, and inspired to learn. We believe that early childhood is the foundation for lifelong success, and we are committed to helping children grow intellectually, emotionally, socially, and creatively through meaningful learning experiences. Our goal is to foster curiosity, kindness, independence, and strong values while encouraging every child to explore their unique talents and abilities. Through play-based learning, innovative activities, and caring guidance, we strive to build happy learners and confident individuals who are prepared for the future. We also believe in building a strong partnership with parents to ensure the holistic development and well-being of every child entrusted to our care.</p>
          </div>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(([number, label], index) => <div key={label} className={`rounded-2xl border border-light bg-card/65 p-4 reveal delay-${index % 3 + 1}`} data-testid={`stat-card-${index}`}><strong className="block font-display text-[1.55rem] leading-none text-brand-teal">{number}</strong><span className="mt-2 block text-[.68rem] font-bold leading-4 text-tertiary">{label}</span></div>)}
        </div>
      </div>
    </div>
  </section>;
}

function FounderSection() {
  return (
    <section id="founder" className="section-pad bg-section-peach">
      <div className="container-wide">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          {/* Founder photo card */}
          <div className="relative mx-auto w-full max-w-[420px] reveal">
            <div className="absolute -left-4 -top-4 size-48 rounded-full bg-[var(--brand-yellow)]/20 blur-2xl" />
            <div className="absolute -bottom-4 -right-4 size-48 rounded-full bg-[var(--brand-teal)]/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[36px] border-4 border-card shadow-[0_24px_60px_rgba(32,48,71,.14)]">
              <img src="/ratna-devi.jpeg" alt="Mrs. Retna Devi, Founder of Kidsnest School" className="w-full object-cover" />
              <div className="bg-card p-6 text-center">
                <h3 className="font-display text-2xl text-primary">Mrs. Retna Devi</h3>
                <p className="mt-1 text-sm font-bold text-brand-teal">Founder, Kidsnest School</p>
                <p className="mt-3 text-xs leading-6 text-tertiary">A vision for a warm, safe, and engaging environment where children can learn, explore, and thrive.</p>
              </div>
            </div>
          </div>

          {/* Founder story */}
          <div className="reveal delay-1">
            <span className="eyebrow">Our founder</span>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.2rem)] leading-[.96] tracking-[-.055em] text-primary">
              A vision born from <span className="text-brand-coral">purpose</span> & <span className="text-brand-teal">heart</span>
            </h2>
            <p className="mt-6 leading-7 text-secondary">
              Kidsnest School was founded by <strong className="text-primary">Mrs. Retna Devi</strong> with a simple yet meaningful vision - to support working mothers and fathers by creating a warm, safe, and engaging environment for children aged 12 months and above.
            </p>
            <p className="mt-4 leading-7 text-secondary">
              What started as a nurturing space for young children has today evolved into a unique, child-centric learning model that focuses on holistic growth, joyful learning, and individual care.
            </p>
            <p className="mt-4 leading-7 text-secondary">
              Driven by passion, dedication, and a deep understanding of early childhood development, Mrs. Retna Devi envisioned a place where children could learn, explore, and thrive with confidence in a loving and stimulating atmosphere.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-light bg-card/80 p-4">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-brand-teal"><Heart className="size-3.5 fill-current" /> Founded with love</span>
                <p className="mt-2 text-sm leading-6 text-tertiary">Started to support working parents by giving their children a safe, stimulating home away from home.</p>
              </div>
              <div className="rounded-2xl border border-light bg-card/80 p-4">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-brand-coral"><TreePine className="size-3.5" /> Growing every day</span>
                <p className="mt-2 text-sm leading-6 text-tertiary">Today Kidsnest continues to uphold that founding vision - fostering curiosity, creativity, values, and lifelong learning.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  return <section id="programs" className="section-pad bg-section-mint">
    <div className="container-wide">
      <div className="flex flex-wrap items-end justify-between gap-7"><SectionHeading eyebrow="The early years" title="A program for every first step" text="Thoughtfully paced programs designed around each stage of development - blending play, movement, creativity, early literacy, and gentle academic foundations." /><span className="mb-2 hidden rounded-full border border-light bg-card/60 px-4 py-2 text-xs font-bold text-secondary md:inline-flex"><span className="mr-2 size-2 rounded-full bg-brand-coral" />Admissions open for the coming term</span></div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {programs.map(({ title, age, description, color, icon: Icon }, index) => <article key={title} className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/20 ${color} p-7 shadow-[0_10px_20px_rgba(32,48,71,0.08)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_18px_30px_rgba(32,48,71,0.12)]`} data-testid={`program-card-${index}`}>
          <div className="mb-10 flex items-start justify-between"><span className="grid size-12 place-items-center rounded-2xl bg-card/70 text-primary shadow-sm"><Icon className="size-6" /></span><span className="rounded-full border border-primary/10 bg-card/70 px-3 py-1 text-[.68rem] font-bold text-secondary">{age}</span></div>
          <h3 className="font-display text-[1.4rem] font-semibold leading-tight text-primary">{title}</h3><p className="mt-2 min-h-[72px] flex-1 text-sm leading-6 text-secondary">{description}</p>
          <button onClick={() => scrollToId('contact')} className="mt-5 inline-flex items-center self-start text-xs font-bold text-primary underline decoration-primary/25 underline-offset-4 transition-colors hover:text-brand-teal" data-testid={`button-program-${index}`}>Learn more <ArrowUpRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
          <div className="absolute -bottom-10 -right-9 size-28 rounded-full border-[14px] border-card/25" />
        </article>)}
      </div>
    </div>
  </section>;
}


function LittleNestSection({ onEnquire }: { onEnquire: () => void }) {
  const services = [
    { icon: Baby, title: 'Infant Care', description: 'Care for babies', color: 'bg-card-playgroup', iconColor: 'text-brand-teal' },
    { icon: Sun, title: 'Full-Day Daycare', description: 'Care throughout the working day', color: 'bg-card-prekg', iconColor: 'text-brand-gold' },
    { icon: School, title: 'After-School Care', description: 'A place to stay after school', color: 'bg-card-lkg', iconColor: 'text-brand-coral' },
    { icon: Moon, title: 'After-School Activities', description: 'Activities children can join after school', color: 'bg-card-ukg', iconColor: 'text-brand-purple' },
  ];
  return (
    <section id="little-nest" className="section-pad bg-page">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-7">
          <SectionHeading
            eyebrow="The Little Nest"
            title="Care that grows with your child"
            text="From their earliest days through their school years, The Little Nest offers infant care, full-day daycare, after-school care, and activities - all at Kids Nest."
          />
          <button onClick={onEnquire} className="mb-2 hidden items-center gap-2 rounded-full bg-[#E8231A] px-5 py-3 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#C41A12] md:inline-flex" data-testid="button-littlenest-enquire">Enquire now <ArrowUpRight className="ml-1 size-3.5" /></button>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map(({ icon: Icon, title, description, color, iconColor }, index) => (
            <div key={title} className={`group rounded-[24px] ${color} p-6 transition-all hover:-translate-y-2`} data-testid={`littlenest-card-${index}`}>
              <span className={`grid size-12 place-items-center rounded-2xl bg-card/70 ${iconColor}`}>
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-xl text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-secondary">{description}</p>
              <button onClick={onEnquire} className="mt-5 inline-flex items-center text-xs font-bold text-primary underline decoration-primary/25 underline-offset-4 transition-colors hover:text-brand-teal" data-testid={`button-littlenest-${index}`}>Find out more <ArrowUpRight className="ml-1.5 size-3.5" /></button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeachersSection() {
  return <section id="teachers" className="section-pad bg-page">
    <div className="container-wide"><SectionHeading eyebrow="The people who make the place" title="Little learners deserve big hearts" text="Our teachers are more than educators - they are mentors, storytellers, cheerleaders and trusted companions on every child's learning journey." />
      <div className="mt-12 grid gap-5 md:grid-cols-3">{teachers.map((teacher, index) => <article className="group overflow-hidden rounded-[28px] border border-light bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-card)]" key={teacher.name} data-testid={`teacher-card-${index}`}>
        <div className={`relative flex h-56 items-end justify-center overflow-hidden ${teacher.tint}`}><div className="absolute left-5 top-5 rounded-full bg-card/65 px-3 py-1 text-[.6rem] font-bold uppercase tracking-[.15em] text-secondary">meet the team</div><div className="relative h-40 w-36 rounded-t-[70px] bg-[#c98c6d]"><div className="absolute -top-5 left-2 size-32 rounded-full bg-[#835c4d]" /><div className="absolute left-5 top-10 size-3 rounded-full bg-[var(--brand-navy)] shadow-[34px_0_0_var(--brand-navy)]" /><div className="absolute left-11 top-[78px] h-2 w-9 rounded-full bg-[var(--brand-coral)]" /><div className="absolute -left-3 top-24 h-28 w-10 rotate-[16deg] rounded-full bg-[#c98c6d]" /><div className="absolute -right-3 top-24 h-28 w-10 rotate-[-16deg] rounded-full bg-[#c98c6d]" /><span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-display text-3xl text-white/80">{teacher.initials}</span></div></div>
        <div className="p-6"><h3 className="font-display text-2xl text-primary">{teacher.name}</h3><p className="mt-1 text-sm font-bold text-brand-teal">{teacher.role}</p><div className="mt-4 flex flex-wrap gap-2 text-[.68rem] font-bold text-tertiary"><span className="rounded-full bg-section-mint/60 px-2.5 py-1">{teacher.detail}</span><span className="rounded-full bg-section-peach/60 px-2.5 py-1">{teacher.area}</span></div><p className="mt-5 text-sm italic leading-6 text-tertiary">"{teacher.quote}"</p></div>
      </article>)}</div>
    </div>
  </section>;
}

function WhySection() {
  const pillars = [
    {
      icon: Users,
      title: 'Small Class Sizes',
      description: 'We maintain small class sizes to ensure every child receives individual attention, care, and guidance.',
      color: 'bg-card-playgroup',
      iconColor: 'text-brand-teal',
    },
    {
      icon: Heart,
      title: 'Low Child-to-Teacher Ratio',
      description: 'Our low child-to-teacher ratio helps us understand each child\'s unique learning style and support their emotional, social, and academic growth effectively.',
      color: 'bg-card-prekg',
      iconColor: 'text-brand-yellow',
    },
    {
      icon: Sparkles,
      title: 'Beyond the Classroom',
      description: 'Learning at Kidsnest goes beyond textbooks and classrooms. Through hands-on activities, celebrations, creative arts, music, movement, storytelling, games, and experiential learning, children explore the world around them with joy and curiosity.',
      color: 'bg-card-lkg',
      iconColor: 'text-brand-coral',
    },
    {
      icon: Lightbulb,
      title: 'Dynamic & Passionate Staff',
      description: 'Our dedicated educators are passionate about early childhood learning and committed to creating a positive and inspiring atmosphere where every child feels safe, valued, and encouraged to shine. We strive to make learning a happy journey filled with discovery, friendship, and lifelong memories.',
      color: 'bg-card-ukg',
      iconColor: 'text-brand-teal',
    },
  ];
  const features = [[ShieldCheck, 'Child-friendly & safe campus'], [Palette, 'Activity-based learning'], [Leaf, 'Holistic child development'], [Accessibility, 'Individual attention'], [Music2, 'Creative & fun activities'], [MessageCircle, 'Strong parent-teacher communication']];
  return (
    <section className="section-pad bg-page">
      <div className="container-wide">
        <SectionHeading eyebrow="The Kidsnest difference" title="Why parents choose Kidsnest" text="A considered beginning matters. We bring warmth, intention and a whole lot of joy to every part of the day." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => {
            const PillarIcon = pillar.icon;
            return (
              <div key={pillar.title} className={`group rounded-[24px] ${pillar.color} p-6 transition-all hover:-translate-y-2`} data-testid={`pillar-${index}`}>
                <span className={`grid size-12 place-items-center rounded-2xl bg-card/70 ${pillar.iconColor}`}>
                  <PillarIcon className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-xl text-primary">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-secondary">{pillar.description}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {features.map(([Icon, label], index) => {
            const FeatureIcon = Icon as typeof Heart;
            return (
              <div key={label as string} className="group flex items-center gap-3 rounded-2xl border border-light bg-input p-4 transition-all hover:-translate-y-1 hover:border-brand-teal hover:shadow-[var(--shadow-card)]" data-testid={`feature-${index}`}>
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-section-mint/60 text-brand-teal transition-colors group-hover:bg-brand-yellow group-hover:text-primary">
                  <FeatureIcon className="size-4" />
                </span>
                <span className="text-xs font-bold text-primary">{label as string}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const activities = [
  { label: 'Classroom Activities', tone: 'sky', caption: 'Curious hands at work', photo: '/gallery/gallery-1.jpeg' },
  { label: 'Art & Craft', tone: 'coral', caption: 'Little hands, big creativity', photo: '/gallery/gallery-2.jpeg' },
  { label: 'Outdoor Play', tone: 'mint', caption: 'Room to run and wonder', photo: '/gallery/gallery-3.jpeg' },
  { label: 'Celebrations', tone: 'yellow', caption: 'Every moment worth celebrating', photo: '/gallery/gallery-4.jpeg' },
  { label: 'Creative Play', tone: 'lavender', caption: 'Imagination has no limits', photo: '/gallery/gallery-5.jpeg' },
  { label: 'Active Play', tone: 'peach', caption: 'Energy, joy and lots of fun', photo: '/gallery/gallery-6.jpeg' },
];

function ActivitiesSection() {
  return <section id="activities" className="section-pad bg-section-mint"><div className="container-wide"><div className="flex flex-wrap items-end justify-between gap-6"><SectionHeading eyebrow="A window into our days" title="Every Day Is an Adventure." text="The best kind of learning feels a lot like play." /><div className="mb-1 flex items-center gap-2 text-xs font-bold text-secondary"><Eye className="size-4 text-brand-teal" /> Tap a story to take a closer look</div></div>
    <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">{activities.map((item, index) => <div key={item.label} className={`group relative overflow-hidden rounded-[24px] text-left ${index === 5 ? 'bg-[#1a2530]' : ''} ${index === 1 || index === 4 ? 'aspect-[.9]' : 'aspect-[1.1]'}`} data-testid={`button-gallery-${index}`}><img src={item.photo} alt={item.label} className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105 ${index === 5 ? 'object-contain' : 'object-cover'}`} /><div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-transparent to-transparent" /><span className="absolute bottom-5 left-5 right-5 text-white"><small className="block text-[.62rem] font-bold uppercase tracking-[.13em] text-white/75">{item.label}</small><strong className="mt-1 block font-display text-lg leading-tight">{item.caption}</strong></span></div>)}</div>
  </div></section>;
}

type GalleryItem = { src: string; category: string; type: 'photo' | 'video' };

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'talent-show', label: 'Talent Show' },
  { key: 'childrens-day', label: "Children's Day" },
  { key: 'farewell-day', label: 'Farewell Day' },
  { key: 'world-photography-day', label: 'World Photography Day' },
  { key: 'mango-day', label: 'Mango Day' },
  { key: 'field-trip', label: 'Field Trip' },
  { key: 'world-thrift-day', label: 'World Thrift Day' },
  { key: 'our-kids', label: 'Our Kids' },
  { key: 'our-teachers', label: 'Our Teachers' },
  { key: 'our-campus', label: 'Our Campus' },
  { key: 'other-memories', label: 'Other Memories' },
];

const GALLERY_FILES_BY_CATEGORY: Record<string, readonly string[]> = {
  all: [
    '/new-gallery/all/all-01.jpeg',
    '/new-gallery/all/all-02.jpeg',
    '/new-gallery/all/all-03.jpeg',
    '/new-gallery/all/all-04.jpeg',
    '/new-gallery/all/all-05.jpeg',
    '/new-gallery/all/all-06.jpeg',
    '/new-gallery/all/all-08.jpeg',
    '/new-gallery/all/all-09.jpeg',
    '/new-gallery/all/all-10.jpeg',
    '/new-gallery/all/all-11.jpeg',
    '/new-gallery/all/all-13.jpeg',
    '/new-gallery/all/all-14.jpeg',
  ],
  'childrens-day': [
    '/new-gallery/childrens-day/cd-01.jpeg',
    '/new-gallery/childrens-day/cd-02.jpeg',
    '/new-gallery/childrens-day/cd-03.jpeg',
  ],
  'farewell-day': [
    '/new-gallery/farewell-day/WhatsApp Image 2026-10-01 at 2.03.41 PM.jpeg',
    '/new-gallery/farewell-day/WhatsApp Image 2026-10-01 at 2.03.43 PM.jpeg',
    '/new-gallery/farewell-day/WhatsApp Image 2026-10-01 at 2.03.44 PM.jpeg',
    '/new-gallery/farewell-day/WhatsApp Image 2026-10-01 at 2.03.45 PM.jpeg',
    '/new-gallery/farewell-day/WhatsApp Image 2026-10-01 at 2.03.46 PM.jpeg',
    '/new-gallery/farewell-day/WhatsApp Image 2026-10-01 at 2.03.47 PM.jpeg',
    '/new-gallery/farewell-day/WhatsApp Image 2026-10-01 at 2.03.49 PM.jpeg',
    '/new-gallery/farewell-day/image1.jpeg',
    '/new-gallery/farewell-day/image2.jpeg',
  ],
  'field-trip': [
    '/new-gallery/field-trip/ft-01.jpeg',
    '/new-gallery/field-trip/ft-02.jpeg',
    '/new-gallery/field-trip/ft-03.jpeg',
    '/new-gallery/field-trip/ft-04.jpeg',
    '/new-gallery/field-trip/ft-05.jpeg',
  ],
  'mango-day': [
    '/new-gallery/mango-day/WLP08607.jpg',
    '/new-gallery/mango-day/WLP08618.jpg',
    '/new-gallery/mango-day/WLP08891.jpg',
    '/new-gallery/mango-day/WLP08908.jpg',
    '/new-gallery/mango-day/WLP08923.jpg',
    '/new-gallery/mango-day/WLP09377.jpg',
    '/new-gallery/mango-day/WLP09389.jpg',
    '/new-gallery/mango-day/WLP09391.jpg',
    '/new-gallery/mango-day/WLP09393.jpg',
    '/new-gallery/mango-day/WLP09395.jpg',
    '/new-gallery/mango-day/WLP09400.jpg',
    '/new-gallery/mango-day/WLP09405.jpg',
    '/new-gallery/mango-day/WLP09433.jpg',
    '/new-gallery/mango-day/WLP09536.jpg',
    '/new-gallery/mango-day/WLP09549.jpg',
    '/new-gallery/mango-day/WLP09563.jpg',
    '/new-gallery/mango-day/WLP09588.jpg',
    '/new-gallery/mango-day/WLP09601.jpg',
    '/new-gallery/mango-day/WLP09603.jpg',
    '/new-gallery/mango-day/WLP09617.jpg',
    '/new-gallery/mango-day/WLP09625.jpg',
    '/new-gallery/mango-day/WLP09638.jpg',
    '/new-gallery/mango-day/WLP09759.jpg',
    '/new-gallery/mango-day/WLP09764.jpg',
    '/new-gallery/mango-day/WLP09768.jpg',
    '/new-gallery/mango-day/WLP09776.jpg',
    '/new-gallery/mango-day/WLP09795.jpg',
    '/new-gallery/mango-day/WLP09887.jpg',
    '/new-gallery/mango-day/WLP09891.jpg',
    '/new-gallery/mango-day/WLP09896.jpg',
    '/new-gallery/mango-day/WLP09901.jpg',
    '/new-gallery/mango-day/WLP09902.jpg',
    '/new-gallery/mango-day/WLP09930.jpg',
  ],
  'other-memories': [
    '/new-gallery/other-memories/WhatsApp Video 2026-10-01 at 4.35.41 PM.mp4',
    '/new-gallery/other-memories/WhatsApp Video 2026-10-01 at 4.35.42 PM.mp4',
    '/new-gallery/other-memories/WhatsApp Video 2026-10-01 at 9.57.02 AM.mp4',
    '/new-gallery/other-memories/vid1.mp4',
  ],
  'our-campus': [
    '/new-gallery/our-campus/WLP09934.jpg',
    '/new-gallery/our-campus/WLP09936.jpg',
    '/new-gallery/our-campus/WLP09944.jpg',
    '/new-gallery/our-campus/WhatsApp Image 2026-09-30 at 11.42.39 AM.jpeg',
    '/new-gallery/our-campus/WhatsApp Image 2026-09-30 at 11.42.40 AM.jpeg',
    '/new-gallery/our-campus/WhatsApp Image 2026-10-01 at 1.27.17 PM.jpeg',
    '/new-gallery/our-campus/image_1.jpeg',
    '/new-gallery/our-campus/image_2.jpeg',
    '/new-gallery/our-campus/image_3.jpeg',
    '/new-gallery/our-campus/image_4.jpeg',
    '/new-gallery/our-campus/image_5.jpeg',
    '/new-gallery/our-campus/image_6.jpeg',
  ],
  'our-kids': [
    '/new-gallery/our-kids/61d2d7f4-5127-42cb-a606-8abc7f735ab1.JPG.jpeg',
    '/new-gallery/our-kids/63581a13-251f-4143-9e93-b8ca1f0eb9bf.JPG.jpeg',
    '/new-gallery/our-kids/IMG_1440.jpg.jpeg',
    '/new-gallery/our-kids/IMG_1443.jpg.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-09-30 at 11.37.28 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 1.21.01 PM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 1.21.03 PM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.13.40 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.13.41 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.13.42 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.13.44 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.13.47 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.13.49 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.13.51 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.13.52 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.13.53 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.13.55 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.14.32 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.14.33 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.14.34 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.14.37 AM.jpeg',
    '/new-gallery/our-kids/WhatsApp Image 2026-10-01 at 10.14.39 AM.jpeg',
    '/new-gallery/our-kids/image_1.jpeg',
    '/new-gallery/our-kids/image_10.jpeg',
    '/new-gallery/our-kids/image_11.jpeg',
    '/new-gallery/our-kids/image_12.jpeg',
    '/new-gallery/our-kids/image_13.jpeg',
    '/new-gallery/our-kids/image_14.jpeg',
    '/new-gallery/our-kids/image_15.jpeg',
    '/new-gallery/our-kids/image_2.jpeg',
    '/new-gallery/our-kids/image_3.jpeg',
    '/new-gallery/our-kids/image_4.jpeg',
    '/new-gallery/our-kids/image_5.jpeg',
    '/new-gallery/our-kids/image_6.jpeg',
    '/new-gallery/our-kids/image_7.jpeg',
    '/new-gallery/our-kids/image_8.jpeg',
    '/new-gallery/our-kids/image_9.jpeg',
  ],
  'our-teachers': [
    '/new-gallery/our-teachers/WhatsApp Image 2026-10-01 at 1.21.02 PM.jpeg',
    '/new-gallery/our-teachers/WhatsApp Image 2026-10-01 at 1.21.03 PM.jpeg',
    '/new-gallery/our-teachers/WhatsApp Image 2026-10-01 at 2.04.34 PM.jpeg',
    '/new-gallery/our-teachers/WhatsApp Image 2026-10-01 at 2.04.35 PM.jpeg',
    '/new-gallery/our-teachers/image_1.jpeg',
    '/new-gallery/our-teachers/imge_2.jpeg',
  ],
  'talent-show': [
    '/new-gallery/talent-show/WhatsApp Image 2026-10-01 at 2.04.46 PM.jpeg',
    '/new-gallery/talent-show/WhatsApp Image 2026-10-01 at 2.04.47 PM.jpeg',
    '/new-gallery/talent-show/WhatsApp Image 2026-10-01 at 2.04.48 PM.jpeg',
    '/new-gallery/talent-show/WhatsApp Image 2026-10-01 at 2.04.49 PM.jpeg',
    '/new-gallery/talent-show/WhatsApp Image 2026-10-01 at 2.04.50 PM.jpeg',
    '/new-gallery/talent-show/WhatsApp Image 2026-10-01 at 2.04.51 PM.jpeg',
    '/new-gallery/talent-show/WhatsApp Image 2026-10-01 at 2.04.52 PM.jpeg',
    '/new-gallery/talent-show/WhatsApp Image 2026-10-01 at 4.35.41 PM.jpeg',
    '/new-gallery/talent-show/ts-01.jpeg',
    '/new-gallery/talent-show/ts-02.jpeg',
    '/new-gallery/talent-show/ts-03.jpeg',
    '/new-gallery/talent-show/ts-04.jpeg',
    '/new-gallery/talent-show/ts-05.jpeg',
    '/new-gallery/talent-show/ts-06.jpeg',
    '/new-gallery/talent-show/ts-07.jpeg',
    '/new-gallery/talent-show/ts-08.jpeg',
    '/new-gallery/talent-show/ts-09.jpeg',
    '/new-gallery/talent-show/ts-10.jpeg',
    '/new-gallery/talent-show/ts-11.jpeg',
    '/new-gallery/talent-show/ts-12.jpeg',
    '/new-gallery/talent-show/ts-13.jpeg',
    '/new-gallery/talent-show/ts-14.jpeg',
  ],
  'world-photography-day': [
    '/gallery/campus-playzone.jpeg',
    '/image.png',
    '/new-gallery/world-photography-day/wpd-01.jpeg',
    '/new-gallery/world-photography-day/wpd-04.jpeg',
    '/new-gallery/world-photography-day/wpd-05.jpeg',
    '/new-gallery/world-photography-day/wpd-06.jpeg',
    '/new-gallery/world-photography-day/wpd-07.jpeg',
    '/new-gallery/world-photography-day/wpd-08.jpeg',
    '/new-gallery/world-photography-day/wpd-09.jpeg',
    '/new-gallery/world-photography-day/wpd-10.jpeg',
    '/new-gallery/world-photography-day/wpd-11.jpeg',
  ],
  'world-thrift-day': ['/new-gallery/world-thrift-day/wtd-01.jpeg'],
};

const GALLERY_BY_TAB: Record<string, GalleryItem[]> = Object.fromEntries(
  Object.entries(GALLERY_FILES_BY_CATEGORY).map(([category, files]) => [
    category,
    files
      .map((src) => ({
        src,
        category,
        type: src.toLowerCase().endsWith('.mp4') ? 'video' : 'photo',
      }))
      .slice(0, 20),
  ]),
);

const ALL_PHOTOS = (GALLERY_BY_TAB.all ?? []).filter((item) => item.type === 'photo').slice(0, 20);

const getGalleryItems = (tab: string): GalleryItem[] => {
  if (tab === 'all') return ALL_PHOTOS;
  if (tab === 'other-memories') return GALLERY_BY_TAB[tab] ?? [];
  return (GALLERY_BY_TAB[tab] ?? []).filter((item) => item.type === 'photo').slice(0, 20);
};

function GalleryLightbox({ items, index, onClose, onChange }: { items: GalleryItem[]; index: number; onClose: () => void; onChange: (i: number) => void }) {
  const item = items[index];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onClose, onChange, items.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={onClose}>
      <button onClick={onClose} className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close">
        <X className="size-5" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onChange((index - 1 + items.length) % items.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 hidden sm:grid" aria-label="Previous">
        <ArrowLeft className="size-5" />
      </button>
      <div className="relative flex max-h-[90vh] max-w-4xl w-full items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <video src={item.src} controls autoPlay className="max-h-[85vh] w-full rounded-[20px] bg-black" />
        ) : (
          <img src={item.src} alt="Gallery" className="max-h-[85vh] w-full rounded-[20px] object-contain" />
        )}
      </div>
      <button onClick={(e) => { e.stopPropagation(); onChange((index + 1) % items.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 hidden sm:grid" aria-label="Next">
        <ArrowRight className="size-5" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-xs font-bold text-white/70">
        {index + 1} / {items.length}
      </div>
    </div>
  );
}

function GallerySection({ onOpen: _onOpen }: { onOpen: (index: number) => void }) {
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const filtered = getGalleryItems(activeTab);

  useEffect(() => { document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [lightboxIndex]);

  return (
    <section id="gallery" className="section-pad bg-page">
      <div className="container-wide">
        <SectionHeading eyebrow="A window into our world" title="Every moment, beautifully remembered" text="Browse through our memories — from everyday learning to special celebrations." />

        {/* Scrollable tabs */}
        <div ref={tabsRef} className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-[#E8231A] text-white shadow-[0_4px_12px_rgba(232,35,26,.3)]'
                  : 'bg-card border border-light text-secondary hover:border-[#E8231A] hover:text-[#E8231A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photo count */}
        <p className="mt-4 text-xs font-bold text-tertiary">{filtered.length} {filtered.length === 1 ? 'memory' : 'memories'}</p>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <button
              key={item.src}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-[18px] bg-[#1a1f2e] focus:outline-none focus:ring-2 focus:ring-[#E8231A]"
              aria-label={`Open ${item.category} ${item.type}`}
            >
              {item.type === 'video' ? (
                <>
                  <video src={item.src} className="h-full w-full object-cover" muted preload="metadata" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/50">
                    <div className="grid size-12 place-items-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                      <CirclePlay className="size-6 fill-[#E8231A] text-[#E8231A]" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={item.src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                  <span className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/80 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </section>
  );
}

function EventsSection() {
  const month = { name: 'October', number: '10', year: '2026' };
  const events = [
    { day: '02', title: 'Gandhi Jayanti', color: 'bg-card-prekg' },
    { day: '04', title: 'World Space Day', color: 'bg-card-lkg' },
    { day: '08', title: 'Air Force Day', color: 'bg-card-playgroup' },
    { day: '09', title: 'Brown Colour & World Post Office Day', color: 'bg-card-ukg' },
    { day: '15', title: 'World Student Day', color: 'bg-card-prekg' },
    { day: '16', title: 'Vijayadashami (Traditional Attire) & Thirukural Competition', color: 'bg-card-playgroup' },
    { day: '21', title: 'Vijayadasami Special Pooja & Walk-in Admissions', color: 'bg-card-lkg' },
    { day: '23', title: 'Rainbow Colour', color: 'bg-card-prekg' },
    { day: '30', title: 'Purple Colour', color: 'bg-card-lkg' },
    { day: '31', title: 'National Unity Day, World Thrift Day & Halloween Day', color: 'bg-card-ukg' },
  ];
  return <section id="upcoming-events" className="section-pad bg-page"><div className="container-wide"><div className="flex items-end justify-between gap-5"><SectionHeading eyebrow="Save the little dates" title={`${month.name} ${month.year} at Kids Nest`} text={`School events and celebrations for ${month.name} ${month.year}.`} /><button onClick={() => scrollToId('contact')} className="mb-2 hidden items-center gap-2 text-xs font-bold text-brand-teal md:flex" data-testid="button-event-enquiry">Ask about events <ArrowUpRight className="size-4" /></button></div><div className="mt-11 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{events.map(({ day, title, color }) => <article key={day} className={`relative overflow-hidden rounded-[24px] ${color} p-6`} data-testid={`upcoming-event-${day}`}><time dateTime={`${month.year}-${month.number}-${day}`} className="inline-flex items-center gap-2 text-xs font-bold text-secondary"><CalendarDays className="size-4 text-brand-coral" /> {month.name} {Number(day)}, {month.year}</time><h3 className="mt-5 max-w-[90%] font-display text-xl leading-tight text-primary">{title}</h3><div className="absolute -right-5 -top-5 size-24 rounded-full border-[12px] border-card/30" /></article>)}</div></div></section>;
}

const reviews = [
  '/gallery/review-1.jpeg',
  '/gallery/review-2.jpeg',
  '/gallery/review-3.jpeg',
  '/gallery/review-4.jpeg',
  '/gallery/review-5.jpeg',
  '/gallery/review-6.jpeg',
];

function TestimonialSection() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  function goTo(index: number) {
    const next = (index + reviews.length) % reviews.length;
    setActive(next);
    const card = scrollRef.current?.children[next] as HTMLElement;
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  return (
    <section id="reviews" className="section-pad bg-section-peach">
      <div className="container-wide">
        <SectionHeading centered eyebrow="Kind words from our nest" title="Loved by little learners & their families" text="Real words from real families - straight from the hearts of our Kidsnest parents." />
        <div className="relative mt-12">
          <div ref={scrollRef} className="flex gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
            {reviews.map((src, index) => (
              <button
                key={src}
                onClick={() => goTo(index)}
                className={`snap-center shrink-0 overflow-hidden rounded-[24px] border-4 bg-white transition-all duration-300 ${
                  active === index
                    ? 'border-brand-coral shadow-[0_16px_40px_rgba(239,119,95,.25)] scale-[1.02]'
                    : 'border-card/60 shadow-[var(--shadow-card)] scale-100 opacity-80 hover:opacity-100'
                } h-[290px] w-[260px] sm:h-[330px] sm:w-[300px] md:h-[360px] md:w-[320px]`}
                aria-label={`Review poster ${index + 1}`}
                data-testid={`button-review-${index}`}
              >
                <img src={src} alt={`Parent review ${index + 1}`} className="h-full w-full object-contain p-2" />
              </button>
            ))}
          </div>
          <button onClick={() => goTo(active - 1)} className="absolute -left-4 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-light bg-card text-primary shadow-[var(--shadow-card)] transition-colors hover:bg-brand-yellow hidden sm:grid" aria-label="Previous review" data-testid="button-review-prev"><ArrowLeft className="size-4" /></button>
          <button onClick={() => goTo(active + 1)} className="absolute -right-4 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-light bg-card text-primary shadow-[var(--shadow-card)] transition-colors hover:bg-brand-yellow hidden sm:grid" aria-label="Next review" data-testid="button-review-next"><ArrowRight className="size-4" /></button>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((_, index) => (
            <button key={index} onClick={() => goTo(index)} className={`h-2 rounded-full transition-all ${active === index ? 'w-7 bg-brand-coral' : 'w-2 bg-light/50'}`} aria-label={`Go to review ${index + 1}`} data-testid={`button-review-dot-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}



function FacilitySection() {
  const spaces = [
    { title: 'Classrooms', description: 'Bright, calm spaces made for curious hands.', photo: '/gallery/campus-classroom.jpeg' },
    { title: 'Activity areas', description: 'Room to paint, build, sing and make a happy mess.', photo: '/gallery/campus-activity.jpeg' },
    { title: 'Reading corner', description: 'A soft landing for stories, questions and quiet wonder.', photo: '/gallery/campus-reading-corner.jpeg' },
    { title: 'Outdoor play area', description: 'Fresh air, big movement and room to notice nature.', photo: '/gallery/campus-outdoor.jpeg' },
    { title: 'Play zone', description: 'Open-ended play that gives imagination the lead.', photo: '/gallery/campus-playzone.png' },
    { title: 'Music & activity space', description: 'A place for rhythm, expression and growing confidence.', photo: '/gallery/campus-music.jpeg' },
  ];
  return (
    <section id="facility" className="section-pad bg-page">
      <div className="container-wide">
        <SectionHeading eyebrow="Come see the nest" title="A campus designed for little discoveries" text="From the first hello to the final story, our spaces are warm, inviting and thoughtfully arranged around children." />
        <div className="mt-11 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {spaces.map(({ title, description, photo }, index) => (
            <div key={title} className="group relative overflow-hidden rounded-[22px]" data-testid={`facility-card-${index}`}>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#3c2828]">
                <img src={photo} alt={title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-xl text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-5 text-white/85">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConductedEventsSection() {
  const events = [
    { title: "Children's Day", description: 'A joyful celebration of childhood with games, performances, and lots of smiles.', photo: '/events/childrens-day.jpeg', color: 'bg-card-playgroup' },
    { title: 'World Photography Day', description: 'Little photographers explored the world through a lens, capturing their unique perspective.', photo: '/events/world-photography-day.jpeg', color: 'bg-card-prekg' },
    { title: "Fancy Dress Competition", description: 'Our little ones dressed as their favourite characters.', photo: '/events/fancy-dress.jpeg', color: 'bg-card-lkg' },
    { title: 'Mango Day', description: 'A fruity, fun-filled day celebrating the king of fruits with activities, crafts and yummy treats.', photo: '/events/mango-day.jpg', color: 'bg-card-ukg' },
  ];
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollEvents(direction: number) {
    const carousel = carouselRef.current;
    const firstCard = carousel?.firstElementChild as HTMLElement | null;
    if (!carousel || !firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0;
    carousel.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: 'instant' });
  }

  return (
    <section id="events" className="section-pad bg-page">
      <div className="container-wide">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Events we celebrated" title="Moments that made us smile" text="Every event at Kidsnest is a memory in the making — full of colour, laughter and little surprises." />
          <div className="mb-2 hidden gap-2 xl:flex">
            <button onClick={() => scrollEvents(-1)} className="grid size-10 place-items-center rounded-full border border-light bg-card text-primary shadow-[var(--shadow-card)] transition-colors hover:bg-brand-yellow" aria-label="Previous event" data-testid="button-events-prev"><ArrowLeft className="size-4" /></button>
            <button onClick={() => scrollEvents(1)} className="grid size-10 place-items-center rounded-full border border-light bg-card text-primary shadow-[var(--shadow-card)] transition-colors hover:bg-brand-yellow" aria-label="Next event" data-testid="button-events-next"><ArrowRight className="size-4" /></button>
          </div>
        </div>
        <div ref={carouselRef} className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:grid xl:grid-cols-4 xl:overflow-visible xl:pb-0 xl:snap-none" data-testid="events-carousel">
          {events.map(({ title, description, photo, color }, index) => (
            <article key={title} className={`group w-[84vw] max-w-[360px] shrink-0 snap-center overflow-hidden rounded-[28px] ${color} transition-all duration-300 hover:-translate-y-2 xl:w-auto xl:max-w-none xl:shrink`} data-testid={`conducted-event-${index}`}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={photo} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-secondary">{description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-3 flex justify-start gap-3 xl:hidden">
          <button onClick={() => scrollEvents(-1)} className="grid size-10 place-items-center rounded-full border border-light bg-card text-primary shadow-[var(--shadow-card)] transition-colors hover:bg-brand-yellow" aria-label="Previous event" data-testid="button-events-prev-mobile"><ArrowLeft className="size-4" /></button>
          <button onClick={() => scrollEvents(1)} className="grid size-10 place-items-center rounded-full border border-light bg-card text-primary shadow-[var(--shadow-card)] transition-colors hover:bg-brand-yellow" aria-label="Next event" data-testid="button-events-next-mobile"><ArrowRight className="size-4" /></button>
        </div>
      </div>
    </section>
  );
}

function CampusSection() {
  const photos = [
    { src: '/campus/campus-1.jpeg', alt: 'Kids at Kidsnest', span: 'lg:col-span-2 lg:row-span-2' },
    { src: '/campus/campus-2.jpeg', alt: 'Kidsnest Building', span: '' },
    { src: '/campus/campus-3.jpeg', alt: 'Kidsnest Building exterior', span: '' },
    { src: '/campus/campus-4.jpeg', alt: 'Kids learning', span: '' },
    { src: '/campus/campus-5.jpeg', alt: 'Activity hall', span: '' },
  ];
  return (
    <section id="campus" className="section-pad bg-page">
      <div className="container-wide">
        <SectionHeading eyebrow="Our campus" title="A place built for little explorers" text="Every corner of Kidsnest is thoughtfully designed to spark curiosity, encourage play and make children feel right at home." />
        <div className="mt-11 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:grid-rows-2">
          {photos.map(({ src, alt, span }, index) => (
            <div key={index} className={`group relative overflow-hidden rounded-[22px] ${span} aspect-[4/3]`} data-testid={`campus-photo-${index}`}>
              <img src={src} alt={alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return <section id="faqs" className="section-pad bg-section-peach"><div className="container-wide"><SectionHeading centered eyebrow="A little clarity" title="Questions parents often ask" text="Still wondering about something? We would love to talk it through." /><div className="mx-auto mt-11 max-w-3xl divide-y divide-light rounded-[26px] border border-light bg-page px-5 sm:px-8">{faqs.map(([question, answer], index) => <div key={question}><button onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-4 py-5 text-left" aria-expanded={open === index} data-testid={`button-faq-${index}`}><span className="font-bold text-primary">{question}</span><ChevronDown className={`size-5 shrink-0 text-brand-teal transition-transform ${open === index ? 'rotate-180' : ''}`} /></button>{open === index && <div className="pb-5 pr-8 text-sm leading-7 text-tertiary">{answer}</div>}</div>)}</div></div></section>;
}

function AdmissionsCTA({ onEnquire }: { onEnquire: () => void }) {
  return <section id="admissions" className="relative overflow-hidden bg-[var(--brand-coral)] py-20 text-white"><div className="absolute -right-24 -top-24 size-80 rounded-full border-[40px] border-white/10" /><div className="absolute -bottom-20 left-[15%] size-64 rounded-full border-[28px] border-[#ffd700]/20" /><div className="container-wide relative flex flex-col items-start justify-between gap-9 md:flex-row md:items-center"><div><span className="eyebrow text-white/90">Your next little adventure</span><h2 className="mt-4 max-w-2xl font-display text-[clamp(2.7rem,5.5vw,5rem)] leading-[.95] tracking-[-.05em]">Ready to begin their little adventure?</h2><p className="mt-5 max-w-xl leading-7 text-white/85">Come visit Kids Nest and discover a place where your child can learn, play, make friends and grow with confidence.</p></div><div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row"><button onClick={onEnquire} className="rounded-full bg-white px-6 py-4 text-sm font-bold text-[var(--brand-coral)] transition-all hover:-translate-y-1 hover:bg-[#f5f0e8]" data-testid="button-admissions-visit">Book a school visit <ArrowUpRight className="ml-2 inline size-4" /></button><button onClick={onEnquire} className="rounded-full border border-white/40 bg-white/15 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-white/25" data-testid="button-admissions-enquire">Enquire about admissions</button></div></div></section>;
}

function ContactSection() {
  return <section id="contact" className="section-pad bg-page"><div className="container-wide grid gap-12 lg:grid-cols-[.72fr_1.28fr]"><div><SectionHeading eyebrow="Let's talk about your little one" title="Come say hello" text="We're here to answer your questions, share our story and help you find the right beginning for your family." /><div className="mt-9 grid gap-4 text-sm"><div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-section-mint/60 text-brand-teal"><MapPin className="size-4" /></span><div><strong className="block text-primary">Kidsnest</strong><span className="text-tertiary">57, Indira Nagar, Sungam By-Pass Road,<br />Coimbatore - 641045</span></div></div><div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-card-prekg/60 text-[var(--icon-phone)]"><Phone className="size-4" /></span><div><strong className="block text-primary">Phone</strong><span className="text-tertiary">0422-2314991 / 7358136930</span></div></div><div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-card-lkg/60 text-brand-coral"><Mail className="size-4" /></span><div><strong className="block text-primary">Email</strong><span className="text-tertiary">kidsnestplayschool@outlook.com</span></div></div><div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-card-ukg/60 text-[var(--icon-clock)]"><Clock3 className="size-4" /></span><div><strong className="block text-primary">School hours</strong><span className="text-tertiary">School: 9 AM - 5 PM | Daycare: 8 AM - 6 PM</span></div></div></div><div className="mt-8 overflow-hidden rounded-[22px] border border-light"><iframe src="https://www.google.com/maps?q=57+Indira+Nagar+Sungam+Bye+Pass+Road+Coimbatore+641045&output=embed" width="100%" height="200" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Kidsnest location" /></div></div>
      <div className="rounded-[30px] border border-light bg-card p-6 shadow-[var(--shadow-card)] sm:p-9"><div className="mb-7 flex items-center justify-between"><div><h2 className="font-display text-3xl tracking-[-.04em] text-primary">Get in touch with us</h2><p className="mt-2 text-sm text-tertiary">Choose your preferred way to connect with Kids Nest.</p></div><span className="hidden size-12 place-items-center rounded-2xl bg-card-prekg text-[var(--brand-yellow)] sm:grid"><Send className="size-5" /></span></div><div className="grid gap-4 sm:grid-cols-3"><button className="rounded-full bg-brand-coral px-6 py-4 text-sm font-bold text-white transition-all hover:-translate-y-1" data-testid="button-contact-mail" onClick={() => window.location.href = 'mailto:kidsnestplayschool@outlook.com'}>Mail to Us <Mail className="ml-2 inline size-4" /></button><a href="https://wa.me/917358136930?text=Hi%20Kids%20Nest,%20I%20would%20like%20to%20know%20more%20about%20your%20programs." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-full bg-[#25D366] px-6 py-4 text-sm font-bold text-white transition-all hover:-translate-y-1" data-testid="button-contact-whatsapp">WhatsApp Chat <MessageCircle className="ml-2 size-4" /></a><a href="tel:04222314991" className="flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-bold text-white transition-all hover:-translate-y-1" data-testid="button-contact-call">Call Now <Phone className="ml-2 size-4" /></a></div></div>
    </div></section>;
}

function Footer() {
  const links = [['Home', 'home'], ['About', 'story'], ['Programs', 'programs'], ['Teachers', 'teachers'], ['Gallery', 'gallery'], ['Events', 'events'], ['Admissions', 'admissions'], ['Contact', 'contact']];
  return <footer className="bg-[var(--brand-navy)] py-12 text-[#f5f0e8]"><div className="container-wide"><div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]"><div><a href="#home" className="inline-flex items-center" data-testid="link-footer-brand" aria-label="Kidsnest home"><span className="relative h-[70px] w-[148px] shrink-0 overflow-hidden rounded-md bg-white" aria-hidden="true"><img src={logo} alt="" className="absolute left-1/2 top-1/2 w-[180px] max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-multiply transition-transform hover:scale-[1.04]" /></span></a><p className="mt-5 max-w-xs text-sm leading-6 text-[#e8f2f9]">Where little minds grow, explore & shine.</p>
        <div className="mt-6 flex gap-2"><a href="https://www.instagram.com/kids_nest_9/" target="_blank" rel="noopener noreferrer" aria-label="Kids Nest on Instagram" className="grid size-9 place-items-center rounded-full bg-white/15 transition-colors hover:bg-[var(--brand-coral)]" data-testid="link-instagram"><Instagram className="size-4" /></a><a href="https://www.facebook.com/kidsnestcoimbatore/" target="_blank" rel="noopener noreferrer" aria-label="Kids Nest on Facebook" className="grid size-9 place-items-center rounded-full bg-white/15 transition-colors hover:bg-[var(--brand-teal)]" data-testid="link-facebook"><Facebook className="size-4" /></a><a href="https://youtube.com/@learnwithkidsnest?si=pk04LoiiiWx7PZxP" target="_blank" rel="noopener noreferrer" aria-label="Kids Nest on YouTube" className="grid size-9 place-items-center rounded-full bg-white/15 transition-colors hover:bg-[var(--brand-coral)]" data-testid="link-youtube"><Youtube className="size-4" /></a></div></div><div><h2 className="text-xs font-bold uppercase tracking-[.18em] text-[var(--brand-yellow)]">Explore</h2><div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">{links.map(([label, id]) => <a key={id} href={`#${id}`} className="text-sm text-[#d4f1f9] transition-colors hover:text-white" data-testid={`link-footer-${id}`}>{label}</a>)}</div></div><div><h2 className="text-xs font-bold uppercase tracking-[.18em] text-[var(--brand-yellow)]">Visit the nest</h2><p className="mt-5 text-sm leading-6 text-[#d4f1f9]">57, Indira Nagar, Sungam By-Pass Road,<br />Coimbatore - 641045<br />0422-2314991 / 7358136930<br />kidsnestplayschool@outlook.com</p><a href="#contact" className="mt-5 inline-flex items-center text-sm font-bold text-white" data-testid="link-footer-contact">Start a conversation <ArrowUpRight className="ml-2 size-4" /></a></div></div><div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-xs text-[#a8c5d4] sm:flex-row"><span>© 2026 Kidsnest. All Rights Reserved.</span><span>Website Made by <a href="https://www.zethica.online" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-[var(--brand-yellow)] transition-colors">Zethica</a> | Made for curious beginnings.</span></div></div></footer>;
}

function Home() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elements = pageRef.current?.querySelectorAll('.reveal:not(.is-visible)');
    if (!elements) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <div ref={pageRef} className="site-shell min-h-screen bg-page"><Header onEnquire={() => { setEnquiryOpen(true); }} /><main><Hero onEnquire={() => setEnquiryOpen(true)} /><StorySection /><FounderSection /><ProgramsSection /><LittleNestSection onEnquire={() => setEnquiryOpen(true)} /><TeachersSection /><WhySection /><ActivitiesSection /><GallerySection onOpen={() => {}} /><EventsSection /><TestimonialSection /><FacilitySection /><ConductedEventsSection /><CampusSection /><FAQSection /><AdmissionsCTA onEnquire={() => setEnquiryOpen(true)} /><ContactSection /></main><Footer />
    <a href="#contact" className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-[#E8231A] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(232,35,26,.35)] transition-transform hover:-translate-y-1 sm:hidden" data-testid="link-mobile-floating-enquire"><MessageCircle className="size-4" /> Enquire now</a>
    {enquiryOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-primary/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setEnquiryOpen(false); }}><div className="relative w-full max-w-md rounded-[28px] bg-page p-7 shadow-[0_30px_80px_rgba(32,48,71,.28)]"><button onClick={() => setEnquiryOpen(false)} className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-section-mint/60 text-primary" aria-label="Close enquiry dialog" data-testid="button-enquiry-close"><X className="size-4" /></button><span className="grid size-11 place-items-center rounded-2xl bg-brand-gold text-primary"><Sparkles className="size-5" /></span><h2 id="enquiry-title" className="mt-5 font-display text-3xl text-primary">Let's plan a visit</h2><p className="mt-2 text-sm leading-6 text-tertiary">Share your details and the Kids Nest team will be in touch.</p><div className="mt-6 grid gap-3"><button className="mt-2 rounded-full bg-brand-coral px-6 py-4 text-sm font-bold text-white transition-all hover:-translate-y-1" data-testid="button-enquiry-submit" onClick={() => window.location.href = 'mailto:kidsnestplayschool@outlook.com'}>Mail to Us <Mail className="ml-2 inline size-4" /></button><a href="https://wa.me/917358136930?text=Hi%20Kids%20Nest,%20I%20would%20like%20to%20know%20more%20about%20your%20programs." target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center rounded-full bg-[#25D366] px-6 py-4 text-sm font-bold text-white transition-all hover:-translate-y-1" data-testid="button-enquiry-whatsapp">WhatsApp Chat <MessageCircle className="ml-2 size-4" /></a><a href="tel:04222314991" className="mt-2 flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-bold text-white transition-all hover:-translate-y-1" data-testid="button-enquiry-call">Call Now <Phone className="ml-2 size-4" /></a></div></div></div>}
  </div>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
