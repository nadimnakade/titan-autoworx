import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/components/ui/SplitText";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { BorderBeam } from "@/components/ui/BorderBeam";
import {
  ArrowUpRight,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Send,
  Camera,
  Play,
  AtSign,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const modules = [
  {
    id: "save",
    title: "Save Contact",
    sub: "vCARD // DIRECT",
    desc: "Add the Titan HQ directly to your phone — engineering, sales, and concierge.",
    icon: Mail,
    color: "from-titan-ember/30 to-transparent",
    accent: "232, 69, 60",
    action: "vCard.titan",
  },
  {
    id: "book",
    title: "Book Service",
    sub: "BAY REQUEST // ONLINE",
    desc: "Reserve a workshop bay, schedule a consultation, or arrange a pickup.",
    icon: Calendar,
    color: "from-titan-gold/30 to-transparent",
    accent: "242, 193, 78",
    action: "Open Calendar",
  },
  {
    id: "follow",
    title: "Follow Builds",
    sub: "LIVE TELEMETRY",
    desc: "Track every build in real-time — chassis progress, dyno graphs, and lap times.",
    icon: ArrowUpRight,
    color: "from-titan-steel/20 to-transparent",
    accent: "170, 178, 189",
    action: "Open Stream",
  },
  {
    id: "offers",
    title: "Current Offers",
    sub: "Q3 // 2026",
    desc: "Limited intake slots, fleet discounts, and partner program availability.",
    icon: Send,
    color: "from-titan-bone/20 to-transparent",
    accent: "232, 229, 221",
    action: "View Offers",
  },
];

export function SceneNetwork() {
  const ref = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".module-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0, rotateX: -20 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });

      // Command center rotating ring
      gsap.to(".cc-ring-1", { rotate: 360, duration: 30, repeat: -1, ease: "none" });
      gsap.to(".cc-ring-2", { rotate: -360, duration: 45, repeat: -1, ease: "none" });
      gsap.to(".cc-ring-3", { rotate: 360, duration: 60, repeat: -1, ease: "none" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="network"
      ref={ref}
      className="relative w-full py-32 md:py-48 bg-titan-void grain overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(232,69,60,0.1),transparent_50%)]" />

      {/* Rotating command rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] max-w-[1400px] max-h-[1400px] pointer-events-none">
        <div className="cc-ring-1 absolute inset-0 rounded-full border border-dashed border-titan-ember/15" />
        <div className="cc-ring-2 absolute inset-[6%] rounded-full border border-dashed border-titan-gold/10" />
        <div className="cc-ring-3 absolute inset-[12%] rounded-full border border-titan-steel/10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-titan-ember animate-pulse" />
            <span className="titan-label">SCENE 06 // COMMAND CENTER</span>
            <span className="h-1.5 w-1.5 rounded-full bg-titan-ember animate-pulse" />
          </div>
          <h2 className="titan-display text-titan-bone text-[clamp(3rem,9vw,8rem)] leading-[0.85] mb-6">
            <SplitText text="ENTER THE" trigger as="span" className="block" />
            <span className="block text-titan-ember">TITAN NETWORK.</span>
          </h2>
          <p className="text-titan-steel text-lg">
            We don't do contact forms. We operate a command center.
            Pick a module and route directly into the workshop floor.
          </p>
        </div>

        {/* Module grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-20 perspective-1000">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={m.id} className="module-card" style={{ perspective: "1000px" }}>
                <SpotlightCard
                  className="group cursor-pointer"
                  spotlightColor={m.accent}
                  spotlightSize={500}
                >
                  {i === 0 && <BorderBeam duration={9} />}
                  <div
                    onClick={() => setOpen(open === m.id ? null : m.id)}
                    className={`relative p-8 bg-gradient-to-br ${m.color} h-full min-h-[280px] flex flex-col justify-between`}
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="titan-label mb-2">// MODULE 0{i + 1}</div>
                        <h3 className="titan-display text-titan-bone text-3xl md:text-4xl">
                          {m.title}
                        </h3>
                        <div className="font-mono text-[10px] text-titan-ember mt-1 tracking-widest">
                          {m.sub}
                        </div>
                      </div>
                      <div className="relative">
                        <div className="h-14 w-14 rounded-full bg-titan-void/60 border border-titan-ember/30 grid place-items-center group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5 text-titan-ember" />
                        </div>
                        <div className="absolute -inset-1 rounded-full border border-titan-ember/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-titan-bone/90 text-sm leading-relaxed my-4 max-w-md">
                      {m.desc}
                    </p>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 titan-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-titan-ember group-hover:bg-titan-gold transition-colors" />
                        <span className="group-hover:text-titan-bone transition-colors">
                          {m.action}
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-titan-ember group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>

        {/* Command bar */}
        <div className="relative grid md:grid-cols-3 gap-4 mb-16">
          {[
            { l: "DIRECT LINE", v: "+49 30 5555 0101", icon: Phone },
            { l: "ENGINEERING", v: "engineers@titanaw.io", icon: Mail },
            { l: "WORKSHOP HQ", v: "BERLIN · DUBAI · DETROIT", icon: MapPin },
          ].map((c) => (
            <SpotlightCard
              key={c.l}
              className="p-5 group"
              spotlightColor="232, 69, 60"
              spotlightSize={300}
            >
              <div className="flex items-center gap-3">
                <c.icon className="h-4 w-4 text-titan-ember" />
                <div className="titan-label">{c.l}</div>
              </div>
              <div className="font-mono text-titan-bone text-lg mt-2 tracking-wider">
                {c.v}
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Direct contact form */}
        <div className="relative grid md:grid-cols-12 gap-6 border-t border-titan-steel/10 pt-12">
          <div className="md:col-span-5">
            <div className="titan-label mb-3">// DIRECT CHANNEL</div>
            <h3 className="titan-display text-titan-bone text-5xl mb-3">
              TRANSMIT
              <br />
              <span className="text-titan-ember">A REQUEST.</span>
            </h3>
            <p className="text-titan-steel text-sm max-w-sm">
              Direct line to the engineering floor. Every message is reviewed by
              a senior engineer — not a sales rep.
            </p>
            <div className="mt-6 flex items-center gap-3 titan-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-titan-ember animate-pulse" />
              <span>RESPONSE TIME // &lt; 4H</span>
            </div>
          </div>

          <form className="md:col-span-7 grid grid-cols-2 gap-3">
            <input
              placeholder="NAME"
              className="col-span-2 md:col-span-1 bg-titan-carbon/50 border border-titan-steel/15 clip-corner-sm px-4 py-3 font-mono text-xs tracking-widest text-titan-bone placeholder:text-titan-steel/40 focus:border-titan-ember outline-none transition-colors"
            />
            <input
              placeholder="EMAIL"
              type="email"
              className="col-span-2 md:col-span-1 bg-titan-carbon/50 border border-titan-steel/15 clip-corner-sm px-4 py-3 font-mono text-xs tracking-widest text-titan-bone placeholder:text-titan-steel/40 focus:border-titan-ember outline-none transition-colors"
            />
            <select
              className="col-span-2 md:col-span-1 bg-titan-carbon/50 border border-titan-steel/15 clip-corner-sm px-4 py-3 font-mono text-xs tracking-widest text-titan-bone focus:border-titan-ember outline-none transition-colors"
            >
              <option className="bg-titan-carbon">PROJECT TYPE</option>
              <option className="bg-titan-carbon">FULL BUILD</option>
              <option className="bg-titan-carbon">ENGINE ONLY</option>
              <option className="bg-titan-carbon">AERO PACKAGE</option>
              <option className="bg-titan-carbon">RESTORATION</option>
            </select>
            <select
              className="col-span-2 md:col-span-1 bg-titan-carbon/50 border border-titan-steel/15 clip-corner-sm px-4 py-3 font-mono text-xs tracking-widest text-titan-bone focus:border-titan-ember outline-none transition-colors"
            >
              <option className="bg-titan-carbon">BUDGET RANGE</option>
              <option className="bg-titan-carbon">€50K — €100K</option>
              <option className="bg-titan-carbon">€100K — €250K</option>
              <option className="bg-titan-carbon">€250K — €500K</option>
              <option className="bg-titan-carbon">€500K+</option>
            </select>
            <textarea
              placeholder="PROJECT BRIEF — Tell us about your machine, vision, and timeline."
              rows={4}
              className="col-span-2 bg-titan-carbon/50 border border-titan-steel/15 clip-corner-sm px-4 py-3 font-mono text-xs tracking-widest text-titan-bone placeholder:text-titan-steel/40 focus:border-titan-ember outline-none transition-colors resize-none"
            />
            <div className="col-span-2 flex flex-col md:flex-row items-start md:items-center gap-4 mt-2">
              <Magnetic>
                <AnimatedButton
                  variant="primary"
                  icon={<Send className="h-3.5 w-3.5" />}
                  onClick={() => undefined}
                >
                  Transmit Request
                </AnimatedButton>
              </Magnetic>
              <div className="titan-label">
                ENCRYPTED // TLS 1.3 // NO SALES REPS
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-titan-steel/10 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-9 w-9 grid place-items-center">
                <div className="absolute inset-0 border border-titan-ember/40" />
                <span className="font-display text-titan-ember text-lg">T</span>
              </div>
              <div>
                <div className="font-display text-titan-bone text-sm tracking-[0.3em]">
                  TITAN AUTOWORX
                </div>
                <div className="font-mono text-[9px] text-titan-steel tracking-[0.4em]">
                  EST. 2008
                </div>
              </div>
            </div>
            <p className="text-titan-steel text-sm max-w-xs">
              An automotive engineering company. Not a garage.
              <br />
              Engineered to handle anything on four wheels.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="titan-label mb-3">HQ</div>
            <div className="text-titan-bone text-sm leading-relaxed">
              Reinhardtstraße 12
              <br />
              10117 Berlin
              <br />
              Germany
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="titan-label mb-3">FOLLOW</div>
            <div className="flex flex-col gap-2">
              {[
                { l: "Instagram", icon: Camera },
                { l: "YouTube", icon: Play },
                { l: "X / Twitter", icon: AtSign },
              ].map((s) => (
                <a
                  key={s.l}
                  href="#"
                  data-cursor={s.l.toUpperCase()}
                  className="group flex items-center gap-2 text-titan-bone text-sm hover:text-titan-ember transition-colors"
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.l}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="titan-label mb-3">LEGAL</div>
            <div className="flex flex-col gap-1 text-titan-bone text-sm">
              <a href="#" className="hover:text-titan-ember">Imprint</a>
              <a href="#" className="hover:text-titan-ember">Privacy</a>
              <a href="#" className="hover:text-titan-ember">Press Kit</a>
            </div>
          </div>

          <div className="md:col-span-2 text-right">
            <div className="titan-label mb-3">SIGNAL</div>
            <div className="titan-display text-titan-ember text-3xl">2008—2026</div>
            <div className="titan-label mt-2">V 9.2.4</div>
          </div>
        </footer>

        {/* Big end mark */}
        <div className="mt-20 relative">
          <div className="titan-display text-titan-bone text-[clamp(4rem,18vw,18rem)] leading-[0.8] tracking-tighter text-stroke-thin">
            TITAN.
          </div>
          <div className="absolute bottom-2 right-0 titan-label">
            END OF TRANSMISSION
          </div>
        </div>
      </div>
    </section>
  );
}
