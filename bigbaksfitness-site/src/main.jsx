import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function Icon({ name, className = "icon" }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const icons = {
    dumbbell: <svg {...common}><path d="M6.5 6.5 17.5 17.5"/><path d="M21 14l-7 7"/><path d="M3 10l7-7"/><path d="M18 11l-5 5"/><path d="M11 6 6 11"/><path d="M21 17l-4 4"/><path d="M7 3 3 7"/></svg>,
    calendar: <svg {...common}><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="m9 16 2 2 4-5"/></svg>,
    mail: <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>,
    phone: <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.7a16 16 0 0 0 6.3 6.3l1.24-1.24a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/></svg>,
    instagram: <svg {...common}><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></svg>,
    star: <svg {...common}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    trophy: <svg {...common}><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M5 5H3v3a4 4 0 0 0 4 4"/><path d="M19 5h2v3a4 4 0 0 1-4 4"/></svg>,
    flame: <svg {...common}><path d="M8.5 14.5A3.5 3.5 0 0 0 12 22a7 7 0 0 0 7-7c0-4-2-6.5-5-9 .5 2.5-1 4-2.5 4.5C10 8 9.5 5.5 10 2 6.5 4.5 5 8 5 12a7 7 0 0 0 3.5 2.5z"/></svg>,
    check: <svg {...common}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-5"/></svg>
  };
  return icons[name] || icons.check;
}

function App() {
  const businessEmail = "Sankarehbakary7@gmail.com";
  const phoneNumber = "857-334-7041";
  const instagram = "Just_BigBaks";
  const [form, setForm] = useState({ name: "", phone: "", package: "", message: "" });

  const packages = useMemo(() => [
    { title: "Single Session", detail: "1 Hour", price: "$65", tag: "Great Start" },
    { title: "Single Session", detail: "30 Minutes", price: "$45", tag: "Quick Burn" },
    { title: "5 Sessions", detail: "2 Week Commitment", price: "$275", tag: "Starter Plan" },
    { title: "10 Sessions", detail: "1 Month Commitment", price: "$500", tag: "Most Popular" },
    { title: "12 Sessions", detail: "1 Month Commitment", price: "$600", tag: "Elite Plan" },
    { title: "Couples Session", detail: "1 Hour", price: "$100", tag: "Train Together" }
  ], []);

  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const submitBooking = async (e) => {
  e.preventDefault();

  if (!form.name.trim() || !form.phone.trim() || !form.package) {
    alert("Please add your name, phone number, and package before sending.");
    return;
  }

  try {
    const response = await fetch("https://formspree.io/f/mzebqlyj", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        package: form.package,
        message: form.message,
        _subject: "New BigBaks Fitness Booking Request",
      }),
    });

    if (!response.ok) {
      throw new Error("Booking request failed");
    }

    alert("Booking request sent! BigBaks will contact you soon.");

    setForm({
      name: "",
      phone: "",
      package: "",
      message: "",
    });
  } catch (error) {
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <div className="brand">
            <div className="logo-mark"><Icon name="dumbbell" /></div>
            <div><div className="brand-name">BigBaks</div><div className="brand-sub">Fitness</div></div>
          </div>
          <nav className="nav-links">
            <a href="#services">Services</a><a href="#pricing">Pricing</a><a href="#booking">Book Online</a><a href="#contact">Contact</a>
          </nav>
          <button className="btn btn-accent" onClick={() => scrollToSection("booking")}>Book Now</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">Personal Training • Fitness Coaching • Motivation</div>
              <h1>Build Strength. <span>Build Confidence.</span></h1>
              <p className="lead">BigBaks helps you train harder, move better, and stay locked in. Whether you are starting your fitness journey or leveling up, every session is built to push you toward real results.</p>
              <div className="hero-actions"><button className="btn btn-accent" onClick={() => scrollToSection("booking")}>Start Training</button><button className="btn btn-outline" onClick={() => scrollToSection("pricing")}>View Prices</button></div>
            </div>
            <div className="hero-card"><div className="hero-visual"><div className="round-icon"><Icon name="dumbbell" /></div><div className="eyebrow">Motivation Starts Here</div><h2>Train Hard. Stay Ready.</h2><p>Fitness sessions built for strength, confidence, and real progress.</p></div></div>
          </div>
        </section>

        <section id="services" className="section container">
          <div className="section-head"><div className="eyebrow">What BigBaks Offers</div><h2>Training made for your goals</h2></div>
          <div className="card-grid">
            {[{icon:"flame",title:"Fat Loss Training",text:"High-energy sessions designed to burn calories and build discipline."},{icon:"trophy",title:"Strength Building",text:"Progressive workouts to help you gain strength, shape, and confidence."},{icon:"star",title:"1-on-1 Coaching",text:"Personal attention, motivation, and workout guidance every step of the way."}].map(item => <article className="info-card" key={item.title}><Icon name={item.icon}/><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </section>

        <section id="pricing" className="section section-dark">
          <div className="container">
            <div className="section-head"><div className="eyebrow">Training Packages</div><h2>Choose your plan</h2></div>
            <div className="price-grid">{packages.map(pkg => <article className="price-card" key={pkg.title+pkg.detail}><div className="pill">{pkg.tag}</div><h3>{pkg.title}</h3><p>{pkg.detail}</p><div className="price">{pkg.price}</div><div className="included"><Icon name="check"/> Motivational coaching included</div></article>)}</div>
          </div>
        </section>

        <section className="section container why-grid"><div className="motivation-card"><div><div className="eyebrow">No Excuses</div><h2>Your Next Rep Matters</h2><p>Every session is a chance to become stronger than yesterday.</p></div></div><div><div className="eyebrow">Why Train With BigBaks?</div><h2>You bring the goal. BigBaks brings the push.</h2><p className="lead">Training is not just about lifting weights. It is about discipline, confidence, and showing up for yourself. BigBaks gives you the support and energy you need to keep going.</p><div className="feature-grid">{["Custom workouts","Accountability","Beginner friendly","Couples sessions"].map(x=><div className="feature" key={x}>{x}</div>)}</div></div></section>

        <section id="booking" className="booking-section"><div className="container booking-grid"><div><div className="eyebrow light">Book Online</div><h2>Ready to start?</h2><p>Send your booking request and BigBaks will contact you to confirm your session time.</p><div className="contact-list"><a href={`tel:${phoneNumber.replace(/-/g,"")}`}><Icon name="phone"/>{phoneNumber}</a><a href={`mailto:${businessEmail}`}><Icon name="mail"/>{businessEmail}</a><a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer"><Icon name="instagram"/>@{instagram}</a></div></div><form className="booking-form" onSubmit={submitBooking}><h3>Request a Session</h3><input placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/><input placeholder="Phone number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required/><select value={form.package} onChange={e=>setForm({...form,package:e.target.value})} required><option value="">Choose a package</option>{packages.map(pkg=><option key={pkg.title+pkg.detail}>{pkg.title} - {pkg.detail} - {pkg.price}</option>)}</select><textarea placeholder="Tell me your fitness goal" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/><button className="btn btn-dark" type="submit"><Icon name="calendar"/>Send Booking Request</button></form></div></section>
      </main>
      <footer id="contact" className="footer"><div className="container"><h2>BigBaks Fitness</h2><p>Build Strength. Build Confidence.</p><p>Call/Text: {phoneNumber} • Email: {businessEmail} • Instagram: @{instagram}</p><small>© 2026 BigBaks Fitness. All rights reserved.</small></div></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
