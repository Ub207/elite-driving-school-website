import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#0A1628",
  accent: "#F59E0B",
  accentHover: "#D97706",
  white: "#FFFFFF",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray400: "#9CA3AF",
  gray600: "#4B5563",
  gray800: "#1F2937",
  overlay: "rgba(10, 22, 40, 0.85)",
};

/* ─── Animated Counter ─── */
function Counter({ end, suffix = "", label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black text-amber-500 mb-1 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        {count}{suffix}
      </div>
      <div className="text-sm uppercase tracking-[0.2em] text-slate-400 font-medium">{label}</div>
    </div>
  );
}

/* ─── Fade-in on scroll ─── */
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Testimonial Card ─── */
function TestimonialCard({ name, text, rating }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-1">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-slate-300 leading-relaxed mb-6 text-[15px]">"{text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-sm">
          {name.charAt(0)}
        </div>
        <span className="text-white font-semibold text-sm">{name}</span>
      </div>
    </div>
  );
}

/* ─── Course Card ─── */
function CourseCard({ title, price, features, popular }) {
  return (
    <div className={`relative rounded-2xl p-8 border transition-all duration-500 hover:-translate-y-2 ${popular ? "bg-gradient-to-br from-amber-500/10 to-amber-700/5 border-amber-500/50" : "bg-white/5 border-white/10 hover:border-amber-500/30"}`}>
      {popular && (
        <div className="absolute -top-3 left-8 bg-amber-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>{title}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-sm text-slate-400">From</span>
        <span className="text-4xl font-black text-amber-500" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>£{price}</span>
        <span className="text-sm text-slate-400">/hr</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
            <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${popular ? "bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/25" : "bg-white/10 text-white hover:bg-amber-500 hover:text-black"}`}>
        Book Now
      </button>
    </div>
  );
}

/* ─── Process Step ─── */
function ProcessStep({ num, title, desc, delay }) {
  return (
    <FadeIn delay={delay} className="relative">
      <div className="text-center group">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-amber-500 transition-all duration-500">
          <span className="text-3xl font-black text-amber-500" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {num}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed max-w-[240px] mx-auto">{desc}</p>
      </div>
    </FadeIn>
  );
}

/* ─── Main Component ─── */
export default function DrivingSchoolHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const heroSlides = [
    { headline: "Learn to Drive", highlight: "with Confidence", sub: "Professional driving instruction with 20+ years of excellence. Your journey to the road starts here." },
    { headline: "Expert", highlight: "Instructors", sub: "Certified professionals dedicated to making you a safe, skilled driver for life." },
    { headline: "Manual &", highlight: "Automatic", sub: "Choose the transmission that suits you. Flexible scheduling, competitive pricing." },
  ];

  useEffect(() => {
    const timer = setInterval(() => setHeroSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* ═══ NAVBAR ═══ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0A1628]/95 backdrop-blur-xl shadow-2xl shadow-black/30 py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-black tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em" }}>
                ELITE <span className="text-amber-500">DRIVING</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400 -mt-1">Training Academy</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Home", "About", "Courses", "Gallery", "FAQ", "Contact"].map((item) => (
              <a key={item} href="#" className="text-sm text-slate-300 hover:text-amber-500 transition-colors duration-300 font-medium relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:07500500545" className="flex items-center gap-2 text-sm text-slate-300 hover:text-amber-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              07 500 500 545
            </a>
            <button className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25">
              Enquire Now
            </button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0A1628]/98 backdrop-blur-xl border-t border-white/10 mt-3">
            <div className="px-6 py-6 space-y-4">
              {["Home", "About", "Courses", "Gallery", "FAQ", "Contact"].map((item) => (
                <a key={item} href="#" className="block text-slate-300 hover:text-amber-500 font-medium">{item}</a>
              ))}
              <button className="w-full bg-amber-500 text-black py-3 rounded-xl font-bold uppercase tracking-wider mt-4">Enquire Now</button>
            </div>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0f2035] to-[#0A1628]" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-amber-500/5 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[100px]" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-5 py-2 mb-8">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">Since 2004 • 20+ Years</span>
              </div>

              <div className="relative h-[180px] md:h-[160px] mb-8 overflow-hidden">
                {heroSlides.map((slide, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                      opacity: heroSlide === i ? 1 : 0,
                      transform: heroSlide === i ? "translateY(0)" : "translateY(30px)",
                    }}
                  >
                    <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}>
                      {slide.headline}
                      <br />
                      <span className="text-amber-500">{slide.highlight}</span>
                    </h1>
                  </div>
                ))}
              </div>

              <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-10">
                {heroSlides[heroSlide].sub}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-0.5 text-sm flex items-center gap-2">
                  Start Learning
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="border border-white/20 hover:border-amber-500/50 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 text-sm hover:bg-white/5">
                  View Courses
                </button>
              </div>

              {/* Slide indicators */}
              <div className="flex gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${heroSlide === i ? "w-10 bg-amber-500" : "w-4 bg-white/20 hover:bg-white/40"}`}
                  />
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="hidden lg:block relative">
              <div className="relative w-full h-[500px]">
                {/* Decorative circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-amber-500/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-amber-500/10" />
                {/* Car icon center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-3xl border border-amber-500/30 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-24 h-24 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.8}>
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-2-2.2-3.3C13 5.6 11.7 5 10.5 5H5.1c-.7 0-1.4.3-1.8.9L1.4 8.8C1.1 9.2 1 9.6 1 10v6c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
                {/* Floating badges */}
                <div className="absolute top-12 right-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 animate-[float_3s_ease-in-out_infinite]">
                  <div className="text-amber-500 font-black text-2xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>98%</div>
                  <div className="text-xs text-slate-400">Pass Rate</div>
                </div>
                <div className="absolute bottom-16 left-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 animate-[float_3s_ease-in-out_infinite_0.5s]">
                  <div className="text-amber-500 font-black text-2xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>1500+</div>
                  <div className="text-xs text-slate-400">Happy Learners</div>
                </div>
                <div className="absolute top-24 left-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 animate-[float_3s_ease-in-out_infinite_1s]">
                  <div className="text-green-400 font-bold text-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" /> DVSA Approved
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp floating */}
        <a href="https://wa.me/+447500500545" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-transform duration-300">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.03L.789 23.257a.75.75 0 00.913.913l4.227-1.495A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.39 0-4.598-.838-6.332-2.234l-.441-.354-2.564.906.906-2.564-.354-.441A9.961 9.961 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
        </a>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
        `}</style>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="relative py-16 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter end={20} suffix="+" label="Years Experience" />
            <Counter end={1500} suffix="+" label="Students Trained" />
            <Counter end={98} suffix="%" label="Pass Rate" />
            <Counter end={50} suffix="k+" label="Training Hours" />
          </div>
        </div>
      </section>

      {/* ═══ COURSES ═══ */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-amber-500/3 blur-[100px]" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-amber-500 text-sm font-bold uppercase tracking-[0.25em] mb-4 block">Our Courses</span>
              <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
                Tailored <span className="text-amber-500">For You</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <FadeIn delay={0.1}>
              <CourseCard
                title="Manual Driving Lessons"
                price="30"
                features={["Full vehicle control mastery", "Clutch & gear handling", "DVSA test preparation", "Flexible scheduling", "Pick-up & drop-off"]}
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <CourseCard
                title="Automatic Driving Lessons"
                price="30"
                popular
                features={["Easier to learn", "Focus on road awareness", "DVSA test preparation", "Ideal for beginners", "Pick-up & drop-off"]}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-24 relative bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="text-amber-500 text-sm font-bold uppercase tracking-[0.25em] mb-4 block">How It Works</span>
              <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
                Start Your <span className="text-amber-500">Journey</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <ProcessStep num="01" title="Book Consultation" desc="Schedule a free consultation to assess your needs and set your training plan." delay={0.1} />
            <ProcessStep num="02" title="Choose Your Course" desc="Select manual or automatic lessons with a schedule that fits your lifestyle." delay={0.2} />
            <ProcessStep num="03" title="Start Driving" desc="Begin your training with expert instructors and hit the road with confidence." delay={0.3} />
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-amber-500 text-sm font-bold uppercase tracking-[0.25em] mb-4 block">Why Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
                Reason To <span className="text-amber-500">Trust Us</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎓", title: "Certified Instructors", desc: "DVSA approved, experienced professionals dedicated to your success." },
              { icon: "💷", title: "Fair Pricing", desc: "Competitive rates with no hidden fees. Transparent from day one." },
              { icon: "🚗", title: "Modern Vehicles", desc: "Well-maintained, dual-control cars for safe and comfortable learning." },
              { icon: "🛡️", title: "Top Safety", desc: "Rigorous safety protocols ensuring your protection at all times." },
              { icon: "📍", title: "Pickup & Drop-off", desc: "Convenient door-to-door service for every lesson, always on time." },
              { icon: "⏰", title: "Flexible Schedule", desc: "Morning, evening, and weekend slots to fit your busy lifestyle." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="group bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-1">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 relative bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-amber-500 text-sm font-bold uppercase tracking-[0.25em] mb-4 block">Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
                What Our <span className="text-amber-500">Learners Say</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <TestimonialCard
                name="Tope Olafisoye"
                text="I just passed my test today! Farhan was my instructor and he was the best. He is so patient and knowledgeable. I'm so thankful for the confidence he gave me."
                rating={5}
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <TestimonialCard
                name="Samuel Robinson"
                text="My instructor Wahid was excellent, made everything easy to understand and I felt comfortable driving. Would definitely recommend to anyone!"
                rating={5}
              />
            </FadeIn>
            <FadeIn delay={0.3}>
              <TestimonialCard
                name="Amira Hassan"
                text="Brilliant driving school! Passed first time thanks to the amazing instruction. The pickup service was always on time and the car was great."
                rating={5}
              />
            </FadeIn>
          </div>

          {/* Trust score */}
          <FadeIn delay={0.4}>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-8 py-4">
                <span className="text-lg font-bold text-white">Excellent</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-slate-400 text-sm">Trust Score 4.5 • 1,500+ Reviews</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 relative text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
              Ready To <span className="text-amber-500">Hit The Road?</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
              Book your first lesson today and join thousands of successful drivers who started their journey with Elite Driving Training.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-amber-500 hover:bg-amber-400 text-black px-10 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 text-sm flex items-center gap-2">
                Book Free Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <a href="tel:07500500545" className="border border-white/20 hover:border-amber-500/50 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 text-sm hover:bg-white/5 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/10 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em" }}>
                    ELITE <span className="text-amber-500">DRIVING</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                With over 20 years of experience, we are proud to be one of the best local driving schools with a professional approach to teaching.
              </p>
              <div className="flex gap-3">
                {["facebook", "instagram", "twitter"].map((s) => (
                  <a key={s} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 transition-all duration-300 group">
                    <span className="text-slate-400 text-xs font-bold uppercase group-hover:text-black">{s[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
              <div className="space-y-3">
                {["About Us", "Courses", "Instructor Training", "Gallery", "FAQ", "Contact"].map((link) => (
                  <a key={link} href="#" className="block text-slate-400 hover:text-amber-500 text-sm transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <div className="space-y-3 text-slate-400 text-sm">
                <p>📞 07 500 500 545</p>
                <p>✉️ info@elitedrivingtraining.co.uk</p>
                <p>📍 Luton, United Kingdom</p>
                <p>🕐 Mon - Sun: 7am to 9pm</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-slate-500 text-xs">
            © 2025 Elite Driving Training. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
