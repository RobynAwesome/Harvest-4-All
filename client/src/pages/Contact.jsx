import React from "react";
import { Mail, Phone, MessageSquareCode, Users, HelpCircle, MapPin } from "lucide-react";

const Contact = () => {
  const channels = [
    {
      title: "Community Leaders",
      icon: Users,
      desc: "For regional workshops and face-to-face mentorship inquiries in Gugulethu, Khayelitsha, and beyond.",
      contact: "community@harvest4all.org.za"
    },
    {
      title: "Technical Help",
      icon: HelpCircle,
      desc: "Issues with logging your water savings, energy calculations, or the USSD mobile interface.",
      contact: "support@harvest4all.org.za"
    },
    {
      title: "Contact the Dev",
      icon: MessageSquareCode,
      desc: "Direct channel for open-source contributions, API feedback, or reporting platform bugs.",
      contact: "dev@harvest4all.org.za"
    }
  ];

  return (
    <div className="section-fade py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <div className="inline-block bg-[#115e59]/10 text-[#115e59] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-heading leading-tight mb-8">
            How Can We <span className="text-[#115e59]">Help?</span>
          </h2>
          <p className="text-lg text-[#111827]/50 max-w-xl mx-auto font-medium">
            Multiple support channels designed for Western Cape residents, community organizations, and open-source developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {channels.map((c, i) => (
             <div key={i} className="bg-white p-10 rounded-[3rem] border border-emerald-100 shadow-xl hover:shadow-2xl transition-all group">
                <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <c.icon className="w-8 h-8 text-[#115e59]" />
                </div>
                <h3 className="text-2xl font-black font-heading mb-4 text-[#111827]">{c.title}</h3>
                <p className="text-[#111827]/60 font-medium leading-relaxed mb-8">{c.desc}</p>
                <div className="flex items-center gap-2 text-[#115e59] font-black text-sm uppercase tracking-widest border-t border-emerald-50 pt-6">
                   <Mail className="w-4 h-4" />
                   {c.contact}
                </div>
             </div>
          ))}
        </div>

        <div className="bg-[#111827] text-white p-12 md:p-20 rounded-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h3 className="text-3xl font-black font-heading mb-6 tracking-tight">Visit Our <span className="text-emerald-400">Hubs</span></h3>
              <p className="text-lg text-gray-400 font-medium mb-12">
                We believe in face-to-face mentorship. Our university partners host regular workshops at the following locations:
              </p>
              <div className="space-y-6">
                {[
                  { name: "UWC Innovation Hub", area: "Bellville South", contact: "021 959 2911" },
                  { name: "CPUT Bellville Campus", area: "Symphony Way", contact: "021 959 6911" },
                ].map((hub, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                         <MapPin className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                         <h4 className="font-black text-emerald-400 italic">{hub.name}</h4>
                         <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{hub.area}</p>
                      </div>
                   </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-md">
               <h4 className="text-xl font-black mb-8 border-b border-white/10 pb-4">Send Quick Enquiry</h4>
               <form className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full bg-white/5 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 transition-all font-bold placeholder-gray-600 text-white" />
                  <input type="email" placeholder="Email Address" className="w-full bg-white/5 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 transition-all font-bold placeholder-gray-600 text-white" />
                  <textarea placeholder="How can we help you?" rows="4" className="w-full bg-white/5 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 transition-all font-bold placeholder-gray-600 text-white"></textarea>
                  <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all">Send Message</button>
               </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
