import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

/* ─── SVG Icons ─────────────────────────────────────────────────────────── */
const Icons = {
    megaphone: (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l19-9-9 19-2-8-8-2z" />
        </svg>
    ),
    target: (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
    ),
    share: (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
    ),
    layers: (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
        </svg>
    ),
    video: (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
    ),
    monitor: (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    ),
};

/* ─── Solution Sections ─────────────────────────────────────────────────── */
const sections = [
    {
        id: 'digital-marketing',
        iconKey: 'megaphone',
        title: 'Digital Marketing',
        accentColor: '#2AB6FB',
        tagline: 'Data-driven campaigns that grow your brand online',
        overview:
            'We craft end-to-end digital marketing strategies tailored to your business goals — combining organic and paid channels to maximize reach, engagement, and conversions across every stage of the customer journey.',
        services: [
            {
                name: 'Search Engine Optimization (SEO)',
                desc: 'Rank higher and stay there. We conduct in-depth keyword research, technical audits, on-page optimization, and off-page link building to grow your organic traffic consistently over time.',
                bullets: ['Keyword & competitor research', 'Technical SEO audits', 'On-page content optimization', 'Link building & authority growth', 'Monthly ranking reports'],
            },
            {
                name: 'Google Ads (SEM)',
                desc: 'Get in front of customers actively searching for your services. We set up, manage, and optimize Search, Display, and Shopping campaigns for maximum ROI.',
                bullets: ['Campaign strategy & setup', 'Ad copywriting & extensions', 'Bid management & A/B testing', 'Conversion tracking', 'Performance dashboards'],
            },
            {
                name: 'Email & WhatsApp Marketing',
                desc: 'Nurture leads and retain customers with personalised, well-timed messages. From welcome sequences to promotional blasts, we design campaigns that get opened and clicked.',
                bullets: ['List segmentation', 'Drip sequences & automation', 'WhatsApp broadcast campaigns', 'Template design', 'Open & click-rate analytics'],
            },
            {
                name: 'Content Marketing',
                desc: 'Build trust and authority with high-quality content. We plan, write, and distribute blog posts, infographics, and guides that attract your ideal audience and rank on search engines.',
                bullets: ['Content strategy & calendar', 'Blog & article writing', 'Infographic creation', 'Distribution & promotion', 'SEO-optimised copywriting'],
            },
        ],
    },
    {
        id: 'meta-ads',
        iconKey: 'target',
        title: 'Meta Ads & Social Advertising',
        accentColor: '#A855F7',
        tagline: 'Precision-targeted ads on Facebook & Instagram',
        overview:
            'We plan, launch, and optimise paid social campaigns on Meta platforms — from awareness funnels to direct-response ads — leveraging advanced targeting, creative testing, and ROAS-focused optimisation.',
        services: [
            {
                name: 'Facebook & Instagram Ads',
                desc: 'Reach your ideal customers with laser-focused targeting based on demographics, interests, behaviours, and custom audiences. We manage every stage of the campaign lifecycle.',
                bullets: ['Audience research & segmentation', 'Campaign structure & setup', 'Ad creative production', 'Pixel & conversion event setup', 'Ongoing bid optimisation'],
            },
            {
                name: 'Retargeting & Funnel Building',
                desc: 'Win back website visitors and warm audiences with smart retargeting funnels. We build multi-stage funnels that guide prospects from awareness to purchase.',
                bullets: ['Custom audience creation', 'Lookalike audience scaling', 'Dynamic product ads', 'Funnel strategy & mapping', 'Landing page alignment'],
            },
            {
                name: 'Creative Strategy & A/B Testing',
                desc: "Great ads start with great creative. We design, test, and iterate on ad creatives — static images, carousels, and video — to find what resonates best with your audience.",
                bullets: ['Creative concept & design', 'Video ad creation', 'Carousel & collection ads', 'Split testing frameworks', 'Winning creative scaling'],
            },
            {
                name: 'Reporting & Optimisation',
                desc: 'Transparent, actionable reporting so you always know where your money is going. We provide weekly performance reviews and make data-driven adjustments to keep ROAS climbing.',
                bullets: ['Weekly & monthly reports', 'ROAS & CPA tracking', 'Budget reallocation', 'Audience refresh cycles', 'Competitor ad monitoring'],
            },
        ],
    },
    {
        id: 'social-media',
        iconKey: 'share',
        title: 'Social Media Management',
        accentColor: '#00f2ea',
        tagline: 'Consistent, engaging presence across all platforms',
        overview:
            'We take the day-to-day burden of social media off your plate — from content planning and creation to community management and performance analytics — so your brand stays active, relevant, and growing.',
        services: [
            {
                name: 'Content Calendar & Strategy',
                desc: 'Never run out of ideas. We develop monthly content calendars aligned with your brand voice, seasonal campaigns, and audience interests — ensuring a steady stream of posts across all platforms.',
                bullets: ['Monthly content planning', 'Brand voice guidelines', 'Campaign & festival posts', 'Platform-specific formats', 'Hashtag strategy'],
            },
            {
                name: 'Creative Design & Copywriting',
                desc: 'Every post is crafted for visual impact and audience engagement. Our designers and copywriters produce scroll-stopping graphics paired with captions that drive likes, shares, and comments.',
                bullets: ['Custom graphic design', 'Engaging captions & CTAs', 'Reel & story templates', 'Brand-consistent creatives', 'Video short-form content'],
            },
            {
                name: 'Community Management',
                desc: 'We respond to comments, DMs, and mentions promptly — turning followers into loyal customers. We monitor conversations, handle queries, and keep your community active.',
                bullets: ['Comment & DM management', 'Review monitoring', 'Crisis communication', 'Audience engagement', 'Brand sentiment tracking'],
            },
            {
                name: 'Analytics & Growth Reporting',
                desc: "Understand what's working and what's not. We deliver monthly analytics reports covering reach, impressions, engagement rate, follower growth, and content performance.",
                bullets: ['Monthly performance reports', 'Engagement rate tracking', 'Follower growth analysis', 'Top-performing content review', 'Strategy adjustments'],
            },
        ],
    },
    {
        id: 'creative-design',
        iconKey: 'layers',
        title: 'Creative Design',
        accentColor: '#FDCB52',
        tagline: 'Visuals that stop the scroll and sell your brand',
        overview:
            'From brand identity to promotional posters and digital ads, our creative team delivers high-impact designs that communicate your message clearly, look premium, and are optimised for every platform.',
        services: [
            {
                name: 'Brand Identity & Logo Design',
                desc: 'Your brand is your first impression. We design logos, colour palettes, typography systems, and brand guidelines that create a consistent, professional identity across all touchpoints.',
                bullets: ['Logo design & variations', 'Brand colour & typography', 'Brand guidelines document', 'Business card & stationery', 'Social media kit'],
            },
            {
                name: 'Social Media Poster Design',
                desc: 'Eye-catching posters for every occasion — product launches, festival campaigns, offers, and brand awareness. Each design is tailored to the platform and sized for maximum impact.',
                bullets: ['Festival & occasion posts', 'Product highlight posters', 'Offer & promotional banners', 'Story & reel covers', 'Multi-size exports (FB, IG, WA)'],
            },
            {
                name: 'Digital Advertising Creatives',
                desc: 'Ad creatives that perform. We design static and animated banner ads, Meta ad sets, and display ads following best practices for CTR and conversion optimisation.',
                bullets: ['Meta ad creatives (all sizes)', 'Animated banner ads', 'Google Display creatives', 'A/B creative variants', 'Brand-consistent ad sets'],
            },
            {
                name: 'Print & Offline Design',
                desc: 'Take your brand offline with professionally designed print materials — brochures, flyers, standees, and hoardings that complement your digital presence.',
                bullets: ['Brochures & pamphlets', 'Flex & hoarding design', 'Event standees & banners', 'Packaging design', 'Menu & catalogue design'],
            },
        ],
    },
    {
        id: 'video-production',
        iconKey: 'video',
        title: 'Video Production',
        accentColor: '#EC4899',
        tagline: 'Professional ad videos that captivate and convert',
        overview:
            'From concept to final cut, we handle the entire video production process — scripting, on-location shooting, professional editing, and platform optimisation — delivering video content that drives real results.',
        services: [
            {
                name: 'Ad Video Shooting',
                desc: 'Professional on-location filming for brand ads, product showcases, and promotional campaigns. We handle lighting, direction, and camera work to deliver broadcast-quality footage.',
                bullets: ['On-location & studio shoots', 'Product & brand demos', 'Testimonial videos', 'Professional lighting & sound', 'Direction & storyboarding'],
            },
            {
                name: 'Reels & Short-Form Content',
                desc: "Short-form video is the fastest growing content format. We produce engaging Reels, YouTube Shorts, and TikTok-style videos optimised for each platform's algorithm.",
                bullets: ['Instagram & Facebook Reels', 'YouTube Shorts', 'Hook-driven scripting', 'Trending audio & text overlays', 'Platform-optimised exports'],
            },
            {
                name: 'Video Editing & Post-Production',
                desc: 'Raw footage transformed into polished, professional content. Our editors handle colour grading, motion graphics, sound design, captions, and platform-specific cuts.',
                bullets: ['Professional video editing', 'Colour grading & correction', 'Motion graphics & titles', 'Background music & SFX', 'Subtitles & captions'],
            },
            {
                name: 'Scriptwriting & Concept Development',
                desc: 'Every great video starts with a great script. Our content team develops compelling concepts and scripts aligned with your brand message and campaign objectives.',
                bullets: ['Creative concept development', 'Script & voiceover writing', 'Storyboarding', 'Brand tone alignment', 'CTA & conversion scripting'],
            },
        ],
    },
    {
        id: 'web-development',
        iconKey: 'monitor',
        title: 'Web Development',
        accentColor: '#F97316',
        tagline: 'Fast, beautiful, conversion-optimised websites',
        overview:
            'We design and build modern websites that look great, load fast, and turn visitors into customers — from landing pages to full business websites, built on the best technologies for performance and scalability.',
        services: [
            {
                name: 'Business Websites',
                desc: 'Professional multi-page websites that showcase your brand, services, and credibility. Built for speed, SEO, and mobile performance from day one.',
                bullets: ['Custom design & development', 'Mobile-first & responsive', 'SEO-optimised structure', 'Contact & lead gen forms', 'CMS integration'],
            },
            {
                name: 'Landing Pages',
                desc: 'High-converting landing pages for your ad campaigns. Every element — headline, layout, CTA — is engineered to maximise lead capture and minimise bounce rate.',
                bullets: ['Campaign-specific landing pages', 'A/B test-ready designs', 'Lead capture forms', 'Fast load times (<2s)', 'Analytics & heatmap integration'],
            },
            {
                name: 'E-Commerce Development',
                desc: "Sell online with a store that's easy to manage and a pleasure to buy from. We build custom e-commerce solutions with secure payments and smooth UX.",
                bullets: ['Product catalogue & cart', 'Payment gateway integration', 'Order & inventory management', 'Mobile shopping experience', 'SEO for product pages'],
            },
            {
                name: 'Maintenance & Support',
                desc: 'Your website is a living digital asset. We provide ongoing maintenance, security updates, content updates, and technical support to keep it running smoothly.',
                bullets: ['Regular security updates', 'Content & product updates', 'Performance monitoring', 'Uptime & backup management', 'Priority technical support'],
            },
        ],
    },
];

/* ─── Service detail card ──────────────────────────────────────────────── */
const ServiceCard = ({ service, accentColor }) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            onClick={() => setOpen(o => !o)}
            style={{
                background: 'rgba(255,255,255,0.03)', border: `1px solid ${open ? accentColor + '44' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '1rem', padding: '1.4rem', cursor: 'pointer',
                transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { if (!open) e.currentTarget.style.borderColor = accentColor + '33'; }}
            onMouseLeave={e => { if (!open) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', margin: 0, lineHeight: 1.4 }}>{service.name}</h4>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ flexShrink: 0, transition: 'transform 0.25s ease', transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: '1.7', margin: '0.75rem 0 0', display: open ? 'block' : '-webkit-box', WebkitLineClamp: open ? 'unset' : 2, WebkitBoxOrient: 'vertical', overflow: open ? 'visible' : 'hidden' }}>
                {service.desc}
            </p>
            {open && (
                <ul style={{ marginTop: '1rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {service.bullets.map(b => (
                        <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.6 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '0.2rem' }}>
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {b}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

/* ─── Page ──────────────────────────────────────────────────────────────── */
const Solutions = () => {
    const [activeSection, setActiveSection] = useState(sections[0].id);
    const current = sections.find(s => s.id === activeSection);

    return (
        <div style={{ background: '#050505', minHeight: '100vh', paddingTop: '80px' }}>
            <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes orb-drift {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(40px,-30px) scale(1.1); }
        }
        .sol-hero-h { animation: fade-up 0.7s ease both; }
        .sol-hero-p { animation: fade-up 0.7s 0.12s ease both; }
        .sol-tab { cursor: pointer; transition: all 0.2s ease; border: none; font-family: inherit; }
        .sol-tab:hover { opacity: 1 !important; background: rgba(255,255,255,0.04) !important; }
        .sol-content { animation: fade-up 0.4s ease both; }
        @media (max-width: 900px) {
          .sol-layout { flex-direction: column !important; padding: 1.5rem 1rem 3rem !important; gap: 0 !important; }
          .sol-sidebar { flex-direction: row !important; flex-wrap: nowrap !important; overflow-x: auto !important; width: 100% !important; min-width: unset !important; max-width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; padding-right: 0 !important; padding-bottom: 1rem !important; margin-bottom: 1.5rem !important; gap: 0.4rem !important; scrollbar-width: none !important; -ms-overflow-style: none !important; }
          .sol-sidebar::-webkit-scrollbar { display: none !important; }
          .sol-sidebar-label { display: none !important; }
          .sol-tab { flex-shrink: 0 !important; padding: 0.5rem 0.85rem !important; font-size: 0.78rem !important; }
          .sol-tab span:last-child { display: none !important; }
          .sol-cards { grid-template-columns: 1fr !important; }
          .sol-content { padding: 0 !important; }
          .sol-cta { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

            {/* ── Hero ─────────────────────────────────────────────────── */}
            <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 2rem 3rem', textAlign: 'center', background: 'radial-gradient(ellipse at 50% 0%, #0a1628 0%, #050505 65%)' }}>
                <div style={{ position: 'absolute', top: '-60px', left: '-80px', width: '500px', height: '400px', background: 'radial-gradient(ellipse, rgba(42,182,251,0.12) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'orb-drift 10s ease-in-out infinite', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '20px', right: '-60px', width: '420px', height: '320px', background: 'radial-gradient(ellipse, rgba(168,85,247,0.10) 0%, transparent 70%)', filter: 'blur(36px)', animation: 'orb-drift 13s ease-in-out infinite reverse', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(42,182,251,0.08)', border: '1px solid rgba(42,182,251,0.2)', padding: '0.35rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2AB6FB', marginBottom: '1.5rem' }}>
                        ✦ What We Do
                    </div>
                    <h1 className="sol-hero-h" style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', fontWeight: '800', lineHeight: '1.15', letterSpacing: '-0.03em', background: 'linear-gradient(180deg, #fff 30%, #64748b 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.2rem' }}>
                        Our Solutions
                    </h1>
                    <p className="sol-hero-p" style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.75', maxWidth: '580px', margin: '0 auto' }}>
                        From social media and ad campaigns to websites and video production — everything your brand needs to grow digitally, under one roof.
                    </p>
                </div>
            </section>

            {/* ── Main layout ─────────────────────────────────────────── */}
            <div className="sol-layout" style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 5rem', gap: '3rem' }}>

                {/* Sidebar */}
                <aside className="sol-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: '230px', maxWidth: '250px', flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.07)', paddingRight: '2rem' }}>
                    <p className="sol-sidebar-label" style={{ fontSize: '0.68rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3f4f60', marginBottom: '0.5rem', flexShrink: 0, width: '100%' }}>Solution Areas</p>
                    {sections.map(s => {
                        const active = activeSection === s.id;
                        return (
                            <button key={s.id} className="sol-tab" onClick={() => setActiveSection(s.id)} style={{
                                display: 'flex', alignItems: 'center', gap: '0.55rem',
                                padding: '0.7rem 1rem', borderRadius: '0.6rem', textAlign: 'left',
                                background: active ? `${s.accentColor}14` : 'transparent',
                                border: active ? `1px solid ${s.accentColor}33` : '1px solid transparent',
                                color: active ? '#fff' : '#888',
                                fontWeight: active ? '700' : '500',
                                fontSize: '0.88rem',
                                whiteSpace: 'nowrap',
                            }}>
                                {/* SVG icon in accent color */}
                                <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                                    {Icons[s.iconKey](active ? s.accentColor : '#64748b')}
                                </span>
                                <span>{s.title}</span>
                                {active && (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={s.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </aside>

                {/* Content */}
                <div className="sol-content" key={current.id} style={{ flex: 1, minWidth: 0 }}>
                    {/* Section header */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '0.75rem' }}>
                            <div style={{ width: '42px', height: '42px', minWidth: '42px', borderRadius: '10px', background: `${current.accentColor}18`, border: `1px solid ${current.accentColor}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '3px' }}>
                                {Icons[current.iconKey](current.accentColor)}
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', fontWeight: '800', margin: 0, color: '#fff', lineHeight: 1.25 }}>{current.title}</h2>
                        </div>
                        <p style={{ fontSize: '0.95rem', color: current.accentColor, fontWeight: '600', marginBottom: '0.75rem' }}>{current.tagline}</p>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.8', maxWidth: '680px', borderLeft: `3px solid ${current.accentColor}`, paddingLeft: '1rem' }}>
                            {current.overview}
                        </p>
                    </div>

                    {/* Service cards */}
                    <div className="sol-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {current.services.map(srv => (
                            <ServiceCard key={srv.name} service={srv} accentColor={current.accentColor} />
                        ))}
                    </div>

                    {/* Per-section CTA */}
                    <div className="sol-cta" style={{ marginTop: '2.5rem', padding: '1.5rem', background: `${current.accentColor}0d`, border: `1px solid ${current.accentColor}22`, borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <p style={{ fontWeight: '700', fontSize: '1rem', color: '#fff', margin: '0 0 0.2rem' }}>Interested in {current.title}?</p>
                            <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Let's talk about how we can grow your business.</p>
                        </div>
                        <Link to="/contact" style={{ padding: '0.7rem 1.75rem', background: `linear-gradient(135deg, ${current.accentColor}, #A855F7)`, borderRadius: '6px', color: '#fff', fontWeight: '700', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                            Get a Free Quote →
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Solutions;
