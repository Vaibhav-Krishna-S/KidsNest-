import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import logo from '../../../5fc54084e9c789eb7f3ffced9922d6c6.webp';
import {
  type LucideIcon,
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Brain, CalendarDays,
  Check, ChevronDown, CirclePlay, Clock3, Compass, Heart, Instagram, Mail,
  MapPin, Menu, MessageCircle, Music2, Palette, Phone, Quote, ShieldCheck,
  Sparkles, Star, Users, X, Youtube, Facebook, Leaf, Footprints, Target,
  Accessibility, Lightbulb, TreePine, Dumbbell, Send, Eye, Sun
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

const programs = [
  { title: 'Play Group', age: '1.5–2.5 years', description: 'A joyful first step into structured learning, friendship and exploration.', color: 'bg-[#dff3ec]', icon: Leaf },
  { title: 'Nursery', age: '2.5–3.5 years', description: 'Building confidence, communication and early learning skills through play.', color: 'bg-[#fff1bd]', icon: Sun },
  { title: 'LKG', age: '3.5–4.5 years', description: 'Developing foundational academic and social skills through engaging activities.', color: 'bg-[#ffe0d6]', icon: Sparkles },
  { title: 'UKG', age: '4.5–5.5 years', description: 'Preparing young learners for their next big adventure with confidence and curiosity.', color: 'bg-[#e9e1f8]', icon: Compass },
];

const teachers = [
  { name: 'Ms. Nivetha', role: 'Early Childhood Educator', detail: 'B.Ed · Early Years', area: 'Language & storytelling', quote: 'Every child learns differently. Our job is to help them discover how they shine.', initials: 'N', tint: 'bg-[#ffd9cb]' },
  { name: 'Ms. Meera', role: 'Lead Facilitator', detail: 'Montessori Certified', area: 'Creative exploration', quote: 'The smallest questions often open the biggest doors to learning.', initials: 'M', tint: 'bg-[#d7edf0]' },
  { name: 'Ms. Kavya', role: 'Movement & Music Guide', detail: 'B.A. Psychology', area: 'Expression & wellbeing', quote: 'When children feel safe to be themselves, learning starts to feel like joy.', initials: 'K', tint: 'bg-[#e6ddf4]' },
];

const gallery = [
  { label: 'Classroom Activities', tone: 'sky', caption: 'Curious hands at work' },
  { label: 'Art & Craft', tone: 'coral', caption: 'Colour outside the lines' },
  { label: 'Outdoor Play', tone: 'mint', caption: 'Room to run and wonder' },
  { label: 'Celebrations', tone: 'yellow', caption: 'Little moments, big memories' },
  { label: 'Reading Corner', tone: 'lavender', caption: 'Stories take flight here' },
  { label: 'Nature Day', tone: 'peach', caption: 'A closer look at the world' },
];

const faqs = [
  ['What age groups does Kids Nest accept?', 'Kids Nest welcomes little learners from approximately 1.5 to 5.5 years across Play Group, Nursery, LKG and UKG. Our team is happy to guide you to the right starting point.'],
  ['What programs are available?', 'Our early years programs are designed around each stage of development: Play Group, Nursery, LKG and UKG. Every program blends play, movement, conversation, creativity and gentle academic foundations.'],
  ['What are the school timings?', 'Our indicative school day is 9:00 AM to 1:00 PM. Timings are editable and may vary by program. Please speak with our admissions team for the current schedule.'],
  ['How do I apply for admission?', 'Start by sending an enquiry or booking a school visit. We will share availability, answer your questions and walk you through the simple next steps.'],
  ['Can parents visit the campus?', 'Absolutely. A visit is the best way to experience the nest. Book a school visit and our team will arrange a convenient time to show you around.'],
  ['What activities are included?', 'Children explore art, stories, music, rhymes, cognitive games, nature, physical play, early literacy, early numeracy and social skills through hands-on experiences.'],
  ['How does Kids Nest ensure child safety?', 'Safety is woven into our environment, routines and relationships. We maintain child-friendly spaces, mindful supervision and clear communication with families.'],
  ['Do you provide transportation?', 'Transportation details are currently being finalised. Contact us and we will share the latest availability for your area.'],
  ['How can parents communicate with teachers?', 'Our educators make room for regular parent communication, sharing observations and celebrating each child’s progress together.'],
];

const testimonials = [
  { quote: 'Kids Nest has been such a wonderful experience for our child. The teachers are caring, patient and incredibly supportive.', name: 'Priya & Arjun', child: 'Parents of a Nursery learner', initials: 'P' },
  { quote: 'We love how learning feels natural here. Our daughter comes home with a new story, question or little discovery every day.', name: 'Divya R.', child: 'Parent of an LKG learner', initials: 'D' },
  { quote: 'From our first visit, we felt a genuine warmth. The team notices the little things that make our son feel confident.', name: 'Karthik S.', child: 'Parent of a Play Group learner', initials: 'K' },
  { quote: 'It feels like a place where children are known, not just taught. That trust means everything to us.', name: 'Maya & Rohan', child: 'Parents of a UKG learner', initials: 'M' },
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
  const links = [['our story', 'story'], ['programs', 'programs'], ['approach', 'approach'], ['campus', 'campus'], ['FAQs', 'faqs']];
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#d8e2df]/70 bg-[#fffaf1]/90 backdrop-blur-xl">
      <div className="container-wide flex h-[76px] items-center justify-between">
        <BrandMark />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map(([label, id]) => <a key={id} href={`#${id}`} className="text-[.76rem] font-bold capitalize tracking-[.03em] text-[#527285] transition-colors hover:text-[#1e9cb1]" data-testid={`link-nav-${id}`}>{label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onEnquire} className="hidden rounded-full bg-[#1e9cb1] px-5 py-3 text-xs font-bold text-white shadow-[0_8px_20px_rgba(30,156,177,.2)] transition-all hover:-translate-y-0.5 hover:bg-[#177e90] sm:inline-flex" data-testid="button-header-enquire">Book a school visit <ArrowUpRight className="ml-2 size-4" /></button>
          <button onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-full bg-[#eef5f2] text-[#203047] lg:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav className="border-t border-[#d8e2df] bg-[#fffaf1] px-5 py-5 lg:hidden" aria-label="Mobile navigation">
        <div className="container-wide grid gap-1">
          {links.map(([label, id]) => <a onClick={() => setOpen(false)} key={id} href={`#${id}`} className="rounded-xl px-3 py-3 font-bold capitalize text-[#203047] hover:bg-[#eaf5f0]" data-testid={`link-mobile-${id}`}>{label}</a>)}
          <button onClick={() => { setOpen(false); onEnquire(); }} className="mt-2 rounded-xl bg-[#1e9cb1] px-4 py-3 text-left font-bold text-white" data-testid="button-mobile-enquire">Book a school visit</button>
        </div>
      </nav>}
    </header>
  );
}

function Hero({ onEnquire }: { onEnquire: () => void }) {
  return (
    <section id="home" className="paper-grain relative overflow-hidden bg-[#dff3f5] pt-[76px]">
      <div className="absolute -left-24 top-28 size-64 rounded-full bg-[#f8d568]/40 blur-3xl" />
      <div className="absolute right-[-120px] top-20 size-96 rounded-full bg-[#c8e9dc]/80 blur-3xl" />
      <div className="container-wide relative grid min-h-[720px] items-center gap-12 py-16 lg:grid-cols-[.93fr_1.07fr] lg:py-24">
        <div className="relative z-10 reveal is-visible">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#afd9d7] bg-[#f5fffb]/80 px-3 py-2 text-[.68rem] font-bold uppercase tracking-[.15em] text-[#277784]"><Sparkles className="size-3.5" /> Coimbatore’s little learning world</div>
          <h1 className="max-w-[620px] font-display text-[clamp(3.6rem,7.2vw,6.8rem)] leading-[.91] tracking-[-.065em] text-[#203047]">Where little minds <em className="relative inline-block not-italic text-[#ef775f]">grow,</em> explore & <span className="relative whitespace-nowrap text-[#1e9cb1]">shine<span className="absolute -right-7 -top-5 text-2xl font-bold text-[#f3c94f]">+</span></span></h1>
          <p className="mt-7 max-w-[530px] text-[1.03rem] leading-8 text-[#527285]">Welcome to Kids Nest — a joyful learning space in Coimbatore where curiosity is encouraged, creativity is celebrated, and every little learner gets the care they deserve.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => scrollToId('story')} className="inline-flex items-center rounded-full bg-[#203047] px-6 py-4 text-sm font-bold text-white shadow-[0_10px_24px_rgba(32,48,71,.18)] transition-all hover:-translate-y-1 hover:bg-[#304a63]" data-testid="button-explore">Explore Kids Nest <ArrowDown className="ml-2.5 size-4" /></button>
            <button onClick={onEnquire} className="inline-flex items-center rounded-full border-2 border-[#203047]/15 bg-[#fffaf1]/70 px-6 py-4 text-sm font-bold text-[#203047] transition-all hover:-translate-y-1 hover:border-[#1e9cb1] hover:text-[#1e9cb1]" data-testid="button-hero-visit">Book a school visit <ArrowUpRight className="ml-2.5 size-4" /></button>
          </div>
          <div className="mt-10 flex items-center gap-3 text-xs font-bold text-[#527285]"><span className="grid size-9 place-items-center rounded-full bg-[#f8d568] text-[#203047]"><ShieldCheck className="size-4" /></span> A safe · happy · nurturing place for little learners</div>
        </div>
        <HeroIllustration />
      </div>
      <div className="absolute bottom-[-1px] left-0 right-0 h-12 bg-[#fffaf1] [clip-path:ellipse(65%_70%_at_50%_100%)]" />
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative mx-auto h-[470px] w-full max-w-[610px] reveal is-visible delay-2" aria-label="Illustrated placeholder for a joyful Kids Nest classroom">
      <div className="absolute left-[7%] top-[7%] h-16 w-40 rounded-[50%] bg-white/70 blur-[1px] cloud-drift" />
      <div className="absolute right-[7%] top-[22%] h-12 w-28 rounded-[50%] bg-white/60 blur-[1px] cloud-drift" style={{ animationDelay: '-11s' }} />
      <div className="absolute right-[8%] top-[1%] size-16 rotate-12 rounded-full border-4 border-[#f3c94f] bg-[#fff8d8] shadow-[0_8px_0_rgba(243,201,79,.2)] float-slower" />
      <div className="absolute bottom-[3%] left-[2%] size-16 rounded-full bg-[#ef775f] shadow-[0_8px_0_rgba(188,82,67,.15)] float-slow" />
      <div className="absolute left-[4%] top-[32%] text-4xl font-bold text-[#f3c94f] float-slow">+</div>
      <div className="absolute right-[1%] top-[52%] text-3xl font-bold text-[#1e9cb1] float-slower">+</div>
      <div className="absolute inset-x-[7%] bottom-[8%] top-[10%] rotate-[-2deg] rounded-[44px] border-[10px] border-white bg-[#f3c94f] p-3 shadow-[0_30px_70px_rgba(47,77,96,.18)]">
        <div className="relative h-full overflow-hidden rounded-[29px] bg-[#90d2d7]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#a8e2e1_0%,#d4f0d6_57%,#78be8e_58%,#61a877_100%)]" />
          <div className="absolute left-[12%] top-[15%] h-[34%] w-[41%] rounded-t-[50%] border-[12px] border-b-0 border-[#ef775f] bg-[#fff2cd]" />
          <div className="absolute left-[19%] top-[24%] h-[21%] w-[12%] bg-[#9edcdd] shadow-[36px_0_0_#9edcdd]" />
          <div className="absolute left-[5%] right-[5%] top-[55%] h-4 rounded-full bg-[#5c9d76]" />
          <div className="absolute bottom-[8%] left-[9%] h-28 w-24 rotate-[-7deg] rounded-[44%_44%_10px_10px] bg-[#ef775f]"><span className="absolute -top-10 left-5 size-16 rounded-full bg-[#8a5a46]" /><span className="absolute right-[-35px] top-3 size-8 rounded-full bg-[#ef775f]" /></div>
          <div className="absolute bottom-[6%] left-[38%] h-36 w-24 rotate-[4deg] rounded-[45%_45%_10px_10px] bg-[#657fc6]"><span className="absolute -top-9 left-4 size-16 rounded-full bg-[#c98c6d]" /><span className="absolute left-[-25px] top-10 h-8 w-12 rotate-[20deg] rounded-full bg-[#657fc6]" /></div>
          <div className="absolute bottom-[9%] right-[12%] h-28 w-24 rotate-[7deg] rounded-[44%_44%_10px_10px] bg-[#8ac6a2]"><span className="absolute -top-10 left-4 size-16 rounded-full bg-[#c98c6d]" /><span className="absolute right-[-28px] top-5 h-8 w-12 rotate-[-25deg] rounded-full bg-[#8ac6a2]" /></div>
          <div className="absolute bottom-[4%] left-[20%] h-5 w-20 rounded-full bg-[#f5cf5f]" />
          <div className="absolute left-[53%] top-[17%] h-16 w-24 rounded-[40%] bg-white/75" />
          <div className="absolute bottom-[2%] right-[10%] rounded-full bg-[#fff7d6] px-3 py-2 text-[.6rem] font-bold uppercase tracking-[.12em] text-[#4b7c77]">replace with classroom photo</div>
        </div>
      </div>
      <div className="absolute bottom-[2%] right-[2%] rotate-[4deg] rounded-2xl bg-white px-4 py-3 shadow-[0_12px_25px_rgba(47,77,96,.12)]"><p className="font-display text-lg text-[#203047]">wonder lives here</p><div className="mt-1 flex gap-1 text-[#f3c94f]"><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /></div></div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text, centered = false }: { eyebrow: string; title: string; text?: string; centered?: boolean }) {
  return <div className={`${centered ? 'mx-auto text-center' : ''} max-w-[690px] reveal`}><span className="eyebrow">{eyebrow}</span><h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.4rem)] leading-[.96] tracking-[-.055em] text-[#203047]">{title}</h2>{text && <p className="mt-5 max-w-[590px] text-[1rem] leading-7 text-[#617686]">{text}</p>}</div>;
}

function StorySection() {
  const stats = [['editable', 'Happy little learners'], ['editable', 'Expert educators'], ['editable', 'Fun learning activities'], ['editable', 'Years of nurturing childhoods']];
  return <section id="story" className="section-pad bg-[#fffaf1]">
    <div className="container-wide grid items-center gap-16 lg:grid-cols-[.86fr_1.14fr]">
      <div className="relative min-h-[450px] reveal">
        <div className="absolute left-[12%] top-[10%] size-[70%] rounded-[50%_50%_45%_45%] bg-[#dff3ec]" />
        <div className="absolute left-[30%] top-[8%] h-60 w-32 rounded-[55%_45%_0_0] bg-[#84bf8e]" />
        <div className="absolute left-[22%] top-[8%] size-32 rounded-full bg-[#84bf8e] shadow-[77px_24px_0_#98cb92,35px_-31px_0_#a6d49e]" />
        <div className="absolute bottom-[14%] left-[19%] h-28 w-24 rounded-[45%_45%_15px_15px] bg-[#ef775f]"><span className="absolute -top-10 left-3 size-16 rounded-full bg-[#d29a78]" /></div>
        <div className="absolute bottom-[10%] right-[24%] h-32 w-24 rounded-[45%_45%_15px_15px] bg-[#f3c94f]"><span className="absolute -top-11 left-3 size-16 rounded-full bg-[#af755b]" /></div>
        <div className="absolute bottom-[38%] right-[15%] rotate-6 rounded-xl bg-white px-4 py-3 shadow-[0_12px_24px_rgba(47,77,96,.13)]"><Heart className="size-5 fill-[#ef775f] text-[#ef775f]" /><p className="mt-1 font-display text-sm">big dreams<br />start small</p></div>
        <div className="absolute bottom-[9%] left-[8%] rounded-full border-2 border-dashed border-[#62ae9c] px-4 py-2 text-xs font-bold text-[#438b7d]">play • explore • grow</div>
      </div>
      <div>
        <SectionHeading eyebrow="Welcome to Kids Nest" title="A little nest for big dreams" text="Kids Nest provides a nurturing environment where children learn through play, exploration, creativity, stories, music, movement, social interaction and hands-on activities. We make space for the whole child — curious, capable and wonderfully themselves." />
        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(([number, label], index) => <div key={label} className={`rounded-2xl border border-[#e5ded0] bg-white/65 p-4 reveal delay-${index % 3 + 1}`} data-testid={`stat-card-${index}`}><strong className="block font-display text-[1.55rem] leading-none text-[#1e9cb1]">{number}</strong><span className="mt-2 block text-[.68rem] font-bold leading-4 text-[#617686]">{label}</span></div>)}
        </div>
      </div>
    </div>
  </section>;
}

function ProgramsSection() {
  return <section id="programs" className="section-pad bg-[#edf6f3]">
    <div className="container-wide">
      <div className="flex flex-wrap items-end justify-between gap-7"><SectionHeading eyebrow="The early years" title="A place for every first step" text="Thoughtfully paced programs that meet children where they are, and give them room to become." /><span className="mb-2 hidden rounded-full border border-[#c7ded7] bg-white/60 px-4 py-2 text-xs font-bold text-[#527285] md:inline-flex"><span className="mr-2 size-2 rounded-full bg-[#ef775f]" />Admissions open for the coming term</span></div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {programs.map(({ title, age, description, color, icon: Icon }, index) => <article key={title} className={`group relative overflow-hidden rounded-[28px] ${color} p-6 transition-transform duration-300 hover:-translate-y-2`} data-testid={`program-card-${index}`}>
          <div className="mb-14 flex items-start justify-between"><span className="grid size-12 place-items-center rounded-2xl bg-white/70 text-[#203047]"><Icon className="size-6" /></span><span className="rounded-full bg-white/65 px-3 py-1 text-[.63rem] font-bold text-[#527285]">{age}</span></div>
          <h3 className="font-display text-2xl tracking-[-.04em] text-[#203047]">{title}</h3><p className="mt-2 min-h-[65px] text-sm leading-6 text-[#527285]">{description}</p>
          <button onClick={() => scrollToId('contact')} className="mt-5 inline-flex items-center text-xs font-bold text-[#203047] underline decoration-[#203047]/25 underline-offset-4 transition-colors hover:text-[#1e9cb1]" data-testid={`button-program-${index}`}>Learn more <ArrowUpRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
          <div className="absolute -bottom-10 -right-9 size-28 rounded-full border-[14px] border-white/25" />
        </article>)}
      </div>
    </div>
  </section>;
}

function TeachersSection() {
  return <section id="teachers" className="section-pad bg-[#fffaf1]">
    <div className="container-wide"><SectionHeading eyebrow="The people who make the place" title="Little learners deserve big hearts" text="Our teachers are more than educators — they are mentors, storytellers, cheerleaders and trusted companions on every child’s learning journey." />
      <div className="mt-12 grid gap-5 md:grid-cols-3">{teachers.map((teacher, index) => <article className="group overflow-hidden rounded-[28px] border border-[#e5ded0] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-card)]" key={teacher.name} data-testid={`teacher-card-${index}`}>
        <div className={`relative flex h-56 items-end justify-center overflow-hidden ${teacher.tint}`}><div className="absolute left-5 top-5 rounded-full bg-white/65 px-3 py-1 text-[.6rem] font-bold uppercase tracking-[.15em] text-[#527285]">meet the team</div><div className="relative h-40 w-36 rounded-t-[70px] bg-[#c98c6d]"><div className="absolute -top-5 left-2 size-32 rounded-full bg-[#835c4d]" /><div className="absolute left-5 top-10 size-3 rounded-full bg-[#203047] shadow-[34px_0_0_#203047]" /><div className="absolute left-11 top-[78px] h-2 w-9 rounded-full bg-[#ef775f]" /><div className="absolute -left-3 top-24 h-28 w-10 rotate-[16deg] rounded-full bg-[#c98c6d]" /><div className="absolute -right-3 top-24 h-28 w-10 rotate-[-16deg] rounded-full bg-[#c98c6d]" /><span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-display text-3xl text-white/80">{teacher.initials}</span></div></div>
        <div className="p-6"><h3 className="font-display text-2xl text-[#203047]">{teacher.name}</h3><p className="mt-1 text-sm font-bold text-[#1e9cb1]">{teacher.role}</p><div className="mt-4 flex flex-wrap gap-2 text-[.68rem] font-bold text-[#617686]"><span className="rounded-full bg-[#eef5f2] px-2.5 py-1">{teacher.detail}</span><span className="rounded-full bg-[#fff3d0] px-2.5 py-1">{teacher.area}</span></div><p className="mt-5 text-sm italic leading-6 text-[#617686]">“{teacher.quote}”</p></div>
      </article>)}</div>
    </div>
  </section>;
}

function ApproachSection() {
  const activities = [[Palette, 'Art & craft'], [BookOpen, 'Storytelling'], [Music2, 'Music & rhymes'], [Brain, 'Cognitive games'], [Leaf, 'Nature exploration'], [Dumbbell, 'Physical activities'], [Target, 'Early literacy'], [Sparkles, 'Early numeracy'], [Users, 'Social skills']];
  const steps = ['Imagine', 'Explore', 'Create', 'Discover', 'Grow'];
  return <section id="approach" className="section-pad relative overflow-hidden bg-[#203047] text-white">
    <div className="absolute right-[-5%] top-[-10%] size-96 rounded-full bg-[#1e9cb1]/25 blur-3xl" /><div className="absolute bottom-[-20%] left-[-10%] size-96 rounded-full bg-[#ef775f]/20 blur-3xl" />
    <div className="container-wide relative"><div className="grid gap-14 lg:grid-cols-[.86fr_1.14fr]">
      <div><span className="eyebrow text-[#f3c94f]">Our learning philosophy</span><h2 className="mt-4 max-w-lg font-display text-[clamp(2.7rem,5vw,4.7rem)] leading-[.95] tracking-[-.055em]">Learning feels different when it begins with <span className="text-[#77cec0]">wonder.</span></h2><p className="mt-6 max-w-md leading-7 text-[#b6c9cc]">Children are active participants in their own learning. We follow their questions, offer the right invitation and celebrate every brave try.</p>
        <div className="mt-10 flex flex-wrap items-center gap-2">{steps.map((step, index) => <div key={step} className="flex items-center gap-2"><span className={`grid size-9 place-items-center rounded-full text-xs font-bold ${index === 4 ? 'bg-[#f3c94f] text-[#203047]' : 'border border-white/25 text-[#f3c94f]'}`}>{String(index + 1).padStart(2, '0')}</span><span className="text-xs font-bold text-[#f0f5eb]">{step}</span>{index < 4 && <ArrowRight className="mx-1 size-3 text-[#63838d]" />}</div>)}</div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">{activities.map(([Icon, label], index) => { const ActivityIcon = Icon as typeof Palette; return <div key={label as string} className={`rounded-2xl border border-white/10 p-5 ${index % 3 === 1 ? 'bg-[#2c5667]' : 'bg-white/[.07]'}`}><ActivityIcon className="mb-9 size-6 text-[#f3c94f]" /><span className="block text-sm font-bold text-[#f0f5eb]">{label as string}</span></div>; })}</div>
    </div></div>
  </section>;
}

function WhySection() {
  const features = [[Heart, 'Loving & caring environment'], [ShieldCheck, 'Child-friendly & safe campus'], [Users, 'Experienced educators'], [Palette, 'Activity-based learning'], [Leaf, 'Holistic child development'], [Accessibility, 'Individual attention'], [Music2, 'Creative & fun activities'], [MessageCircle, 'Strong parent-teacher communication']];
  return <section className="section-pad bg-[#fffaf1]"><div className="container-wide"><div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="The Kids Nest difference" title="Why parents choose Kids Nest" text="A considered beginning matters. We bring warmth, intention and a whole lot of joy to every part of the day." /><div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{features.map(([Icon, label], index) => { const FeatureIcon = Icon as typeof Heart; return <div key={label as string} className="group flex items-center gap-4 rounded-2xl border border-[#e5ded0] bg-[#fffdf8] p-4 transition-all hover:-translate-y-1 hover:border-[#abd6ce] hover:shadow-[var(--shadow-card)]" data-testid={`feature-${index}`}><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e8f4ef] text-[#2b9e99] transition-colors group-hover:bg-[#f3c94f] group-hover:text-[#203047]"><FeatureIcon className="size-5" /></span><span className="text-sm font-bold text-[#334b5a]">{label as string}</span></div>; })}</div></div></div></section>;
}

function GallerySection({ onOpen }: { onOpen: (index: number) => void }) {
  const tones: Record<string, string> = { sky: 'bg-[#9edadd]', coral: 'bg-[#f2a993]', mint: 'bg-[#9ecba6]', yellow: 'bg-[#f3d266]', lavender: 'bg-[#c8b9e2]', peach: 'bg-[#f5c7a7]' };
  return <section id="gallery" className="section-pad bg-[#edf6f3]"><div className="container-wide"><div className="flex flex-wrap items-end justify-between gap-6"><SectionHeading eyebrow="A window into our days" title="Little moments. Big memories." text="Every day is an adventure — and the ordinary moments are often the ones families remember most." /><div className="mb-1 flex items-center gap-2 text-xs font-bold text-[#527285]"><Eye className="size-4 text-[#1e9cb1]" /> Tap a story to take a closer look</div></div>
    <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">{gallery.map((item, index) => <button onClick={() => onOpen(index)} key={item.label} className={`group relative overflow-hidden rounded-[24px] text-left ${index === 1 || index === 4 ? 'aspect-[.9]' : 'aspect-[1.1]'}`} data-testid={`button-gallery-${index}`} aria-label={`Open ${item.label} gallery image`}><div className={`absolute inset-0 ${tones[item.tone]} transition-transform duration-500 group-hover:scale-105`}><div className="absolute left-[17%] top-[15%] size-20 rounded-full bg-white/50 blur-sm" /><div className="absolute bottom-[10%] left-[12%] h-20 w-20 rounded-[45%_45%_10px_10px] bg-[#ef775f]/80" /><div className="absolute bottom-[7%] left-[44%] h-28 w-20 rounded-[45%_45%_10px_10px] bg-[#5f88c2]/80" /><div className="absolute right-[10%] top-[20%] size-10 rounded-full border-4 border-white/50" /></div><div className="absolute inset-0 bg-gradient-to-t from-[#203047]/65 via-transparent to-transparent" /><span className="absolute bottom-5 left-5 right-5 text-white"><small className="block text-[.62rem] font-bold uppercase tracking-[.13em] text-white/75">{item.label}</small><strong className="mt-1 block font-display text-lg leading-tight">{item.caption}</strong></span><span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/85 text-[#203047] opacity-0 transition-opacity group-hover:opacity-100"><ArrowUpRight className="size-4" /></span></button>)}</div>
  </div></section>;
}

function EventsSection() {
  const events = [['01', 'Annual Day Celebration', 'Date to be announced', 'Kids Nest Campus', 'bg-[#fff1bd]'], ['02', 'Little Artists Day', 'Date to be announced', 'Art & creativity', 'bg-[#dff3ec]'], ['03', 'Sports Fiesta', 'Date to be announced', 'Games & activities', 'bg-[#ffe0d6]']];
  return <section id="events" className="section-pad bg-[#fffaf1]"><div className="container-wide"><div className="flex items-end justify-between gap-5"><SectionHeading eyebrow="Save the little dates" title="There is always something to look forward to" /><button onClick={() => scrollToId('contact')} className="mb-2 hidden items-center gap-2 text-xs font-bold text-[#1e9cb1] md:flex" data-testid="button-event-enquiry">Ask about events <ArrowUpRight className="size-4" /></button></div><div className="mt-11 grid gap-4 lg:grid-cols-3">{events.map(([num, title, date, place, color]) => <article key={title} className={`relative overflow-hidden rounded-[24px] ${color} p-6`}><span className="font-display text-5xl text-[#203047]/15">{num}</span><div className="mt-7"><h3 className="font-display text-2xl text-[#203047]">{title}</h3><div className="mt-4 grid gap-2 text-xs font-bold text-[#617686]"><span className="inline-flex items-center gap-2"><CalendarDays className="size-4 text-[#ef775f]" /> {date}</span><span className="inline-flex items-center gap-2"><MapPin className="size-4 text-[#1e9cb1]" /> {place}</span></div></div><div className="absolute -right-5 -top-5 size-24 rounded-full border-[12px] border-white/30" /></article>)}</div></div></section>;
}

function TestimonialSection() {
  const [active, setActive] = useState(0);
  const item = testimonials[active];
  return <section className="section-pad bg-[#f3e9e0]"><div className="container-wide"><SectionHeading centered eyebrow="Kind words from our nest" title="Loved by little learners & their families" /><div className="relative mx-auto mt-12 max-w-3xl rounded-[32px] bg-[#fffaf1] px-7 py-10 text-center shadow-[var(--shadow-soft)] sm:px-16"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#f3c94f] text-[#203047]"><Quote className="size-6" /></span><blockquote className="mt-7 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] leading-[1.2] tracking-[-.03em] text-[#203047]">“{item.quote}”</blockquote><div className="mt-7 flex items-center justify-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-[#b5ded8] font-display text-lg text-[#203047]">{item.initials}</span><div className="text-left"><strong className="block text-sm text-[#203047]">{item.name}</strong><span className="text-xs text-[#617686]">{item.child}</span></div></div><button onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)} className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-[#ded6c7] bg-white text-[#203047] transition-colors hover:bg-[#f3c94f]" aria-label="Previous testimonial" data-testid="button-testimonial-prev"><ArrowLeft className="size-4" /></button><button onClick={() => setActive((active + 1) % testimonials.length)} className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-[#ded6c7] bg-white text-[#203047] transition-colors hover:bg-[#f3c94f]" aria-label="Next testimonial" data-testid="button-testimonial-next"><ArrowRight className="size-4" /></button><div className="mt-8 flex justify-center gap-2">{testimonials.map((testimonial, index) => <button key={testimonial.name} onClick={() => setActive(index)} className={`h-2 rounded-full transition-all ${active === index ? 'w-7 bg-[#ef775f]' : 'w-2 bg-[#d8cdbd]'}`} aria-label={`Show testimonial ${index + 1}`} data-testid={`button-testimonial-dot-${index}`} />)}</div></div></div></section>;
}

function GrowthSection() {
  const areas = [[Brain, 'Cognitive growth'], [MessageCircle, 'Communication'], [Heart, 'Emotional development'], [Users, 'Social skills'], [Footprints, 'Physical development']];
  return <section className="section-pad bg-[#fffaf1]"><div className="container-wide grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]"><div><SectionHeading eyebrow="A whole-child approach" title="Growing more than just young minds" text="The early years are a time of remarkable growth. We nurture the thinking, feeling, moving and connecting that make each child uniquely whole." /><div className="mt-10 grid gap-2 sm:grid-cols-2">{areas.map(([Icon, label], index) => { const AreaIcon = Icon as typeof Brain; return <div className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[#edf6f3]" key={label as string}><span className="grid size-9 place-items-center rounded-full bg-[#dff3ec] text-[#2b9e99]"><AreaIcon className="size-4" /></span><span className="text-sm font-bold text-[#334b5a]">{label as string}</span></div>; })}</div></div><div className="relative min-h-[410px]"><div className="absolute left-[18%] top-[10%] size-[66%] rounded-[50%] bg-[#fff1bd]" /><div className="absolute bottom-[12%] left-[45%] h-[65%] w-10 rounded-full bg-[#8e6750]" /><div className="absolute bottom-[38%] left-[28%] h-12 w-48 rotate-[-30deg] rounded-full bg-[#79b881] shadow-[45px_38px_0_#79b881]" /><div className="absolute bottom-[50%] left-[47%] h-12 w-52 rotate-[28deg] rounded-full bg-[#9aca91] shadow-[-50px_37px_0_#9aca91]" /><div className="absolute left-[30%] top-[14%] size-20 rounded-full bg-[#79b881] shadow-[64px_16px_0_#9aca91,120px_-5px_0_#79b881,167px_28px_0_#9aca91]" /><div className="absolute bottom-[19%] left-[35%] size-14 rounded-full bg-[#ef775f] shadow-[85px_18px_0_#f3c94f,-68px_28px_0_#7eafcc]" /><span className="absolute bottom-[4%] right-[9%] rounded-full border-2 border-dashed border-[#62ae9c] px-4 py-2 text-xs font-bold text-[#438b7d]">rooted in care</span></div></div></section>;
}

function CampusSection() {
  const spaces = [['Classrooms', 'Bright, calm spaces made for curious hands.'], ['Activity areas', 'Room to paint, build, sing and make a happy mess.'], ['Reading corner', 'A soft landing for stories, questions and quiet wonder.'], ['Outdoor play area', 'Fresh air, big movement and room to notice nature.'], ['Play zone', 'Open-ended play that gives imagination the lead.'], ['Music & activity space', 'A place for rhythm, expression and growing confidence.']];
  return <section id="campus" className="section-pad bg-[#edf6f3]"><div className="container-wide"><SectionHeading eyebrow="Come see the nest" title="A campus designed for little discoveries" text="From the first hello to the final story, our spaces are warm, inviting and thoughtfully arranged around children." /><div className="mt-11 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{spaces.map(([title, description], index) => <div key={title} className="group overflow-hidden rounded-[22px] border border-[#d6e6df] bg-white/80" data-testid={`campus-card-${index}`}><div className={`relative h-32 ${['bg-[#b9e2e2]', 'bg-[#f5d478]', 'bg-[#d9cbed]', 'bg-[#a9d4a8]', 'bg-[#f5bea9]', 'bg-[#add5e5]'][index]}`}><div className="absolute bottom-0 left-[15%] h-20 w-14 rounded-t-[34px] bg-white/65" /><div className="absolute bottom-0 left-[42%] h-28 w-20 rounded-t-[40px] bg-[#ef775f]/70" /><div className="absolute right-[17%] top-[22%] size-11 rounded-full border-4 border-white/60" /></div><div className="p-5"><h3 className="font-display text-xl text-[#203047]">{title}</h3><p className="mt-1 text-sm leading-6 text-[#617686]">{description}</p></div></div>)}</div><div className="mt-8 text-center"><button onClick={() => scrollToId('gallery')} className="inline-flex items-center rounded-full bg-[#203047] px-6 py-4 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:bg-[#304a63]" data-testid="button-virtual-peek">Take a virtual peek <CirclePlay className="ml-2.5 size-4" /></button></div></div></section>;
}

function DaySection() {
  const day: [string, string, string, LucideIcon][] = [['9:00 AM', 'Good morning!', 'Welcome & circle time', Sun], ['9:30 AM', 'Let’s learn!', 'Activity-based learning', BookOpen], ['10:30 AM', 'Snack time', 'A moment to refuel together', Leaf], ['11:00 AM', 'Let’s create!', 'Art, music and making', Palette], ['12:00 PM', 'Outdoor fun', 'Movement and play', Dumbbell], ['12:45 PM', 'Story time', 'A gentle close to the day', BookOpen], ['1:00 PM', 'See you tomorrow!', 'Home with a happy heart', Heart]];
  return <section className="section-pad bg-[#fffaf1]"><div className="container-wide"><div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr]"><div><SectionHeading eyebrow="The rhythm of a day" title="Small rituals. Big belonging." text="A predictable, playful rhythm helps children feel secure enough to explore and brave enough to try something new." /><div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#fff1bd] px-4 py-2 text-xs font-bold text-[#765f21]"><Clock3 className="size-4" /> Indicative timings · editable</div></div><div className="relative"><div className="absolute bottom-4 left-[21px] top-4 w-px bg-[#dce5de]" />{day.map(([time, title, description, Icon], index) => { const DayIcon = Icon as typeof Sun; return <div className="relative flex gap-5 pb-6 last:pb-0" key={time}><span className={`relative z-10 grid size-[43px] shrink-0 place-items-center rounded-full border-4 border-[#fffaf1] ${index % 2 ? 'bg-[#dff3ec] text-[#2b9e99]' : 'bg-[#fff1bd] text-[#bc8d14]'}`}><DayIcon className="size-4" /></span><div className="flex flex-1 items-baseline justify-between gap-4 rounded-2xl border border-[#e5ded0] bg-white/60 px-4 py-3"><div><h3 className="font-display text-lg text-[#203047]">{title}</h3><p className="mt-0.5 text-xs text-[#617686]">{description}</p></div><time className="shrink-0 text-[.68rem] font-bold text-[#1e9cb1]">{time}</time></div></div>; })}</div></div></div></section>;
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return <section id="faqs" className="section-pad bg-[#f3e9e0]"><div className="container-wide"><SectionHeading centered eyebrow="A little clarity" title="Questions parents often ask" text="Still wondering about something? We would love to talk it through." /><div className="mx-auto mt-11 max-w-3xl divide-y divide-[#dfd2c3] rounded-[26px] border border-[#dfd2c3] bg-[#fffaf1] px-5 sm:px-8">{faqs.map(([question, answer], index) => <div key={question}><button onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-4 py-5 text-left" aria-expanded={open === index} data-testid={`button-faq-${index}`}><span className="font-bold text-[#334b5a]">{question}</span><ChevronDown className={`size-5 shrink-0 text-[#1e9cb1] transition-transform ${open === index ? 'rotate-180' : ''}`} /></button>{open === index && <div className="pb-5 pr-8 text-sm leading-7 text-[#617686]">{answer}</div>}</div>)}</div></div></section>;
}

function AdmissionsCTA({ onEnquire }: { onEnquire: () => void }) {
  return <section id="admissions" className="relative overflow-hidden bg-[#1e9cb1] py-20 text-white"><div className="absolute -right-24 -top-24 size-80 rounded-full border-[40px] border-white/10" /><div className="absolute -bottom-20 left-[15%] size-64 rounded-full border-[28px] border-[#f3c94f]/25" /><div className="container-wide relative flex flex-col items-start justify-between gap-9 md:flex-row md:items-center"><div><span className="eyebrow text-[#f3c94f]">Your next little adventure</span><h2 className="mt-4 max-w-2xl font-display text-[clamp(2.7rem,5.5vw,5rem)] leading-[.95] tracking-[-.05em]">Ready to begin their little adventure?</h2><p className="mt-5 max-w-xl leading-7 text-[#d3f0ed]">Come visit Kids Nest and discover a place where your child can learn, play, make friends and grow with confidence.</p></div><div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row"><button onClick={onEnquire} className="rounded-full bg-[#f3c94f] px-6 py-4 text-sm font-bold text-[#203047] transition-all hover:-translate-y-1 hover:bg-[#ffe18a]" data-testid="button-admissions-visit">Book a school visit <ArrowUpRight className="ml-2 inline size-4" /></button><button onClick={onEnquire} className="rounded-full border border-white/40 bg-white/10 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-white/20" data-testid="button-admissions-enquire">Enquire about admissions</button></div></div></section>;
}

function ContactSection() {
  const [sent, setSent] = useState(false);
  return <section id="contact" className="section-pad bg-[#fffaf1]"><div className="container-wide grid gap-12 lg:grid-cols-[.72fr_1.28fr]"><div><SectionHeading eyebrow="Let’s talk about your little one" title="Come say hello" text="We’re here to answer your questions, share our story and help you find the right beginning for your family." /><div className="mt-9 grid gap-4 text-sm"><div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#dff3ec] text-[#2b9e99]"><MapPin className="size-4" /></span><div><strong className="block text-[#203047]">Kids Nest</strong><span className="text-[#617686]">Coimbatore, Tamil Nadu</span></div></div><div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fff1bd] text-[#bc8d14]"><Phone className="size-4" /></span><div><strong className="block text-[#203047]">Phone</strong><span className="text-[#617686]">+91 [school phone]</span></div></div><div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#ffe0d6] text-[#d4634e]"><Mail className="size-4" /></span><div><strong className="block text-[#203047]">Email</strong><span className="text-[#617686]">[school email]</span></div></div><div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e9e1f8] text-[#8064a9]"><Clock3 className="size-4" /></span><div><strong className="block text-[#203047]">School hours</strong><span className="text-[#617686]">[editable school timings]</span></div></div></div><div className="mt-8 flex h-36 items-center justify-center rounded-[22px] border border-dashed border-[#b9cbc4] bg-[#edf6f3] text-center"><div><MapPin className="mx-auto size-6 text-[#1e9cb1]" /><p className="mt-2 text-xs font-bold text-[#527285]">Google Maps embed placeholder</p><span className="text-[.65rem] text-[#78909a]">Replace with campus location</span></div></div></div>
      <form className="rounded-[30px] border border-[#e5ded0] bg-white p-6 shadow-[var(--shadow-card)] sm:p-9" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><div className="mb-7 flex items-center justify-between"><div><h2 className="font-display text-3xl tracking-[-.04em] text-[#203047]">Tell us a little about your family</h2><p className="mt-2 text-sm text-[#617686]">We’ll get back to you with a warm hello.</p></div><span className="hidden size-12 place-items-center rounded-2xl bg-[#fff1bd] text-[#bc8d14] sm:grid"><Send className="size-5" /></span></div>{sent ? <div className="rounded-2xl bg-[#dff3ec] p-7 text-center" role="status" data-testid="status-form-success"><span className="mx-auto grid size-12 place-items-center rounded-full bg-[#62ae9c] text-white"><Check /></span><h3 className="mt-4 font-display text-2xl text-[#203047]">Thank you for reaching out</h3><p className="mt-2 text-sm leading-6 text-[#527285]">Your enquiry is ready to be connected to the Kids Nest team. We look forward to speaking with you.</p><button type="button" onClick={() => setSent(false)} className="mt-5 text-xs font-bold text-[#1e9cb1] underline underline-offset-4" data-testid="button-send-another">Send another enquiry</button></div> : <div className="grid gap-4 sm:grid-cols-2">{[['name', 'Your name', 'text'], ['phone', 'Phone number', 'tel'], ['email', 'Email address', 'email'], ['age', 'Child’s age / class', 'text']].map(([id, label, type]) => <label key={id} className="grid gap-2 text-xs font-bold text-[#527285]">{label}<input required name={id} type={type} placeholder={label} className="h-12 rounded-xl border border-[#e5ded0] bg-[#fffdf8] px-4 text-sm font-medium text-[#203047] placeholder:text-[#9aa8aa] transition-colors focus:border-[#1e9cb1] focus:outline-none focus:ring-2 focus:ring-[#1e9cb1]/20" data-testid={`input-${id}`} /></label>)}<label className="grid gap-2 text-xs font-bold text-[#527285] sm:col-span-2">Message<textarea required name="message" placeholder="What would you like to know?" className="min-h-[110px] resize-y rounded-xl border border-[#e5ded0] bg-[#fffdf8] p-4 text-sm font-medium text-[#203047] placeholder:text-[#9aa8aa] transition-colors focus:border-[#1e9cb1] focus:outline-none focus:ring-2 focus:ring-[#1e9cb1]/20" data-testid="input-message" /></label><button type="submit" className="rounded-full bg-[#203047] px-6 py-4 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:bg-[#304a63] sm:col-span-2" data-testid="button-contact-submit">Let’s talk about your little one <Send className="ml-2 inline size-4" /></button></div>}</form>
    </div></section>;
}

function Footer() {
  const links = [['Home', 'home'], ['About', 'story'], ['Programs', 'programs'], ['Teachers', 'teachers'], ['Gallery', 'gallery'], ['Events', 'events'], ['Admissions', 'admissions'], ['Contact', 'contact']];
  return <footer className="bg-[#203047] py-12 text-[#d1dede]"><div className="container-wide"><div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]"><div><a href="#home" className="inline-flex items-center" data-testid="link-footer-brand" aria-label="Kids Nest home"><span className="relative h-[70px] w-[148px] shrink-0 overflow-hidden rounded-md bg-white" aria-hidden="true"><img src={logo} alt="" className="absolute left-1/2 top-1/2 w-[180px] max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-multiply transition-transform hover:scale-[1.04]" /></span></a><p className="mt-5 max-w-xs text-sm leading-6 text-[#9db6bd]">Where little minds grow, explore & shine.</p>
        <div className="mt-6 flex gap-2"><a href="#contact" aria-label="Kids Nest on Instagram" className="grid size-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-[#ef775f]" data-testid="link-instagram"><Instagram className="size-4" /></a><a href="#contact" aria-label="Kids Nest on Facebook" className="grid size-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-[#1e9cb1]" data-testid="link-facebook"><Facebook className="size-4" /></a><a href="#contact" aria-label="Kids Nest on YouTube" className="grid size-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-[#ef775f]" data-testid="link-youtube"><Youtube className="size-4" /></a></div></div><div><h2 className="text-xs font-bold uppercase tracking-[.18em] text-[#f3c94f]">Explore</h2><div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">{links.map(([label, id]) => <a key={id} href={`#${id}`} className="text-sm text-[#a9c0c4] transition-colors hover:text-white" data-testid={`link-footer-${id}`}>{label}</a>)}</div></div><div><h2 className="text-xs font-bold uppercase tracking-[.18em] text-[#f3c94f]">Visit the nest</h2><p className="mt-5 text-sm leading-6 text-[#a9c0c4]">Coimbatore, Tamil Nadu<br />[school phone]<br />[school email]</p><a href="#contact" className="mt-5 inline-flex items-center text-sm font-bold text-white" data-testid="link-footer-contact">Start a conversation <ArrowUpRight className="ml-2 size-4" /></a></div></div><div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#78959d] sm:flex-row"><span>© 2026 Kids Nest. All Rights Reserved.</span><span>Made for curious beginnings.</span></div></div></footer>;
}

function Lightbox({ index, onClose, onChange }: { index: number; onClose: () => void; onChange: (index: number) => void }) {
  const item = gallery[index];
  const colors: Record<string, string> = { sky: 'bg-[#9edadd]', coral: 'bg-[#f2a993]', mint: 'bg-[#9ecba6]', yellow: 'bg-[#f3d266]', lavender: 'bg-[#c8b9e2]', peach: 'bg-[#f5c7a7]' };
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); if (event.key === 'ArrowRight') onChange((index + 1) % gallery.length); if (event.key === 'ArrowLeft') onChange((index - 1 + gallery.length) % gallery.length); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [index, onClose, onChange]);
  return <div className="fixed inset-0 z-50 grid place-items-center bg-[#203047]/85 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${item.label} gallery image`}><button onClick={onClose} className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white text-[#203047]" aria-label="Close gallery" data-testid="button-lightbox-close"><X /></button><div className={`relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-[28px] ${colors[item.tone]}`}><div className="absolute left-[17%] top-[15%] size-32 rounded-full bg-white/50 blur-sm" /><div className="absolute bottom-0 left-[12%] h-[48%] w-28 rounded-t-[50px] bg-[#ef775f]/80" /><div className="absolute bottom-0 left-[43%] h-[63%] w-32 rounded-t-[65px] bg-[#5f88c2]/80" /><div className="absolute bottom-0 right-[13%] h-[39%] w-24 rounded-t-[55px] bg-[#fff1bd]/90" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#203047]/75 to-transparent p-7 pt-20 text-white"><small className="font-bold uppercase tracking-[.16em] text-white/70">Kids Nest · placeholder visual</small><h2 className="mt-1 font-display text-3xl">{item.label}</h2><p className="mt-1 text-sm text-white/80">{item.caption}</p></div></div><div className="absolute bottom-6 flex gap-2"><button onClick={() => onChange((index - 1 + gallery.length) % gallery.length)} className="grid size-10 place-items-center rounded-full bg-white text-[#203047]" aria-label="Previous image" data-testid="button-lightbox-prev"><ArrowLeft className="size-4" /></button><button onClick={() => onChange((index + 1) % gallery.length)} className="grid size-10 place-items-center rounded-full bg-white text-[#203047]" aria-label="Next image" data-testid="button-lightbox-next"><ArrowRight className="size-4" /></button></div></div>;
}

function Home() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const closeLightbox = () => setLightbox(null);
  useEffect(() => {
    const elements = pageRef.current?.querySelectorAll('.reveal:not(.is-visible)');
    if (!elements) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => { document.body.style.overflow = lightbox !== null ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [lightbox]);
  return <div ref={pageRef} className="site-shell min-h-screen bg-[#fffaf1]"><Header onEnquire={() => { setEnquiryOpen(true); }} /><main><Hero onEnquire={() => setEnquiryOpen(true)} /><StorySection /><ProgramsSection /><TeachersSection /><ApproachSection /><WhySection /><GallerySection onOpen={setLightbox} /><EventsSection /><TestimonialSection /><GrowthSection /><CampusSection /><DaySection /><FAQSection /><AdmissionsCTA onEnquire={() => setEnquiryOpen(true)} /><ContactSection /></main><Footer />
    <a href="#contact" className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-[#ef775f] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(239,119,95,.35)] transition-transform hover:-translate-y-1 sm:hidden" data-testid="link-mobile-floating-enquire"><MessageCircle className="size-4" /> Enquire now</a>
    {lightbox !== null && <Lightbox index={lightbox} onClose={closeLightbox} onChange={setLightbox} />}
    {enquiryOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#203047]/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setEnquiryOpen(false); }}><div className="relative w-full max-w-md rounded-[28px] bg-[#fffaf1] p-7 shadow-[0_30px_80px_rgba(32,48,71,.28)]"><button onClick={() => setEnquiryOpen(false)} className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-[#eef5f2] text-[#203047]" aria-label="Close enquiry dialog" data-testid="button-enquiry-close"><X className="size-4" /></button><span className="grid size-11 place-items-center rounded-2xl bg-[#f3c94f] text-[#203047]"><Sparkles className="size-5" /></span><h2 id="enquiry-title" className="mt-5 font-display text-3xl text-[#203047]">Let’s plan a visit</h2><p className="mt-2 text-sm leading-6 text-[#617686]">Share your details and the Kids Nest team will be in touch.</p><form className="mt-6 grid gap-3" onSubmit={(event) => { event.preventDefault(); setEnquiryOpen(false); scrollToId('contact'); }}><input required placeholder="Your name" aria-label="Your name" className="h-12 rounded-xl border border-[#e5ded0] bg-white px-4 text-sm focus:border-[#1e9cb1] focus:outline-none" data-testid="input-enquiry-name" /><input required type="tel" placeholder="Phone number" aria-label="Phone number" className="h-12 rounded-xl border border-[#e5ded0] bg-white px-4 text-sm focus:border-[#1e9cb1] focus:outline-none" data-testid="input-enquiry-phone" /><button className="mt-2 rounded-full bg-[#203047] py-4 text-sm font-bold text-white transition-colors hover:bg-[#304a63]" type="submit" data-testid="button-enquiry-submit">Continue to enquiry <ArrowRight className="ml-2 inline size-4" /></button></form></div></div>}
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