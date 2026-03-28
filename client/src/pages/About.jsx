import React from "react";
import { Users, GraduationCap, Handshake, Sprout, Globe, Heart } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const team = [
    { name: "Kholofelo Robyn Rababalela", role: "Visionary & Project Lead", bio: "Leading the strategy for urban resilience and sustainable township growth." },
    { name: "Kea Pule", role: "Community Engagement", bio: "Bridging the gap between technology and face-to-face community impact." },
    { name: "Karabo Mokwena", role: "Technical Director", bio: "Architecting the open-source infrastructure for Harvest For All." },
    { name: "Lisakhanya Ndwandwa", role: "Sustainability Expert", bio: "Ensuring our agricultural and waste models meet 2026 standards." },
    { name: "Matthew Willemse", role: "Operations Manager", bio: "Managing regional workshops and university partnership logistics." },
  ];

  const partners = [
    { name: "UWC Innovation Hub", type: "R&D Partner", mission: "Driving research in urban agricultural sustainability." },
    { name: "CPUT", type: "Educational Partner", mission: "Facilitating youth workshops and certification programs." },
    { name: "MICT SETA 2026", type: "Event Stakeholder", mission: "Strategic oversight for the National Skills Challenge." }
  ];

  return (
    <div className="section-fade py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#166534]/10 text-[#166534] px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-6"
          >
            The Mission
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black font-heading mb-8 leading-none">
            Space into <span className="text-[#166534]">Source</span>.
          </h1>
          <p className="text-xl text-[#111827]/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Harvest For All is a production-ready modernization platform designed to solve food insecurity and unemployment in Western Cape townships through technology-driven urban farming and waste-to-wealth models.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <Users className="w-10 h-10 text-[#166534]" />
            <h2 className="text-3xl font-black font-heading uppercase tracking-tight">The Founders</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[3rem] border border-emerald-100 shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 transition-all group-hover:scale-110" />
                <h3 className="text-xl font-black text-[#111827] mb-1 relative z-10">{member.name}</h3>
                <p className="text-[#166534] text-xs font-black uppercase tracking-widest mb-4 relative z-10">{member.role}</p>
                <p className="text-sm text-[#111827]/60 font-medium leading-relaxed relative z-10">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div className="bg-[#111827] text-white rounded-[4rem] p-12 md:p-20 mb-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 text-emerald-400 mb-6">
                  <Handshake className="w-8 h-8" />
                  <span className="text-sm font-black uppercase tracking-widest">Strategic Collaboration</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black font-heading mb-6 leading-tight">
                  Powered by <span className="text-emerald-400">Excellence</span>.
                </h2>
                <p className="text-lg text-gray-400 font-medium leading-relaxed mb-10">
                  Through our partnerships with CPUT and the UWC Innovation Hub, we translate academic research into actionable township workshops and face-to-face mentorship.
                </p>
                <div className="flex flex-wrap gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                   {/* Placeholder for University Logos */}
                   <div className="h-12 w-24 bg-white/20 rounded-xl animate-pulse flex items-center justify-center font-black text-[10px]">UWC</div>
                   <div className="h-12 w-24 bg-white/20 rounded-xl animate-pulse flex items-center justify-center font-black text-[10px]">CPUT</div>
                   <div className="h-12 w-24 bg-white/20 rounded-xl animate-pulse flex items-center justify-center font-black text-[10px]">MICT SETA</div>
                </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-1 gap-6">
                {partners.map((p, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-black text-emerald-400">{p.name}</h4>
                      <span className="text-[10px] font-black uppercase bg-white/10 px-3 py-1 rounded-full">{p.type}</span>
                    </div>
                    <p className="text-sm text-gray-400 font-medium">{p.mission}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { icon: Globe, t: "Open Source", d: "A free, informative resource for all community members in the Western Cape." },
            { icon: GraduationCap, t: "Educational", d: "Focusing on hand-on workshops and face-to-face engagement strategies." },
            { icon: Heart, t: "Impact Driven", d: "Measuring our success by the socio-economic empowerment of township youth." }
          ].map((v, i) => (
            <div key={i}>
              <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <v.icon className="w-8 h-8 text-[#166534]" />
              </div>
              <h4 className="text-xl font-black mb-3 font-heading">{v.t}</h4>
              <p className="text-sm text-[#111827]/60 font-medium leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
