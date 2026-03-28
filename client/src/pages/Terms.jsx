import React from "react";
import { ShieldAlert, BookOpen, Globe, UserCheck } from "lucide-react";

const Terms = () => {
  const sections = [
    { 
      title: "Open Source Mission", 
      icon: Globe,
      content: "Harvest For All is an open-source informative and educational platform. All agricultural, waste, and energy saving models are provided for the benefit of Western Cape township communities without charge."
    },
    { 
      title: "Educational Use Only", 
      icon: BookOpen,
      content: "The sustainable farming guides and resource-saving calculations are for educational purposes. Users are encouraged to verify site-specific conditions through our face-to-face mentorship workshops."
    },
    { 
      title: "Community Responsibility", 
      icon: UserCheck,
      content: "By using the platform, you agree to share your successes and challenges (Pros/Cons) through our community resilience hubs to help others grow safely and sustainably."
    },
    { 
      title: "Integrity & Safety", 
      icon: ShieldAlert,
      content: "Users must adhere to local municipal guidelines regarding water restrictions and waste disposal. Harvest For All is not responsible for external equipment installation (e.g., Solar panels) without professional oversight."
    }
  ];

  return (
    <div className="section-fade py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black font-heading mb-4 uppercase tracking-tight">Terms & <span className="text-[#166534]">Conditions</span></h2>
          <p className="text-sm font-black text-[#166534] uppercase tracking-widest">Open Informative & Educational Platform v1.0</p>
        </div>

        <div className="space-y-12">
          {sections.map((s, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] border border-emerald-100 shadow-xl flex flex-col md:flex-row gap-8 items-start">
               <div className="bg-emerald-50 p-4 rounded-2xl flex-shrink-0">
                  <s.icon className="w-8 h-8 text-[#166534]" />
               </div>
               <div>
                  <h3 className="text-2xl font-black font-heading mb-4 text-[#111827]">{s.title}</h3>
                  <p className="text-[#111827]/60 font-medium leading-relaxed">{s.content}</p>
               </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 border-t-2 border-emerald-100 text-center">
           <p className="text-xs text-[#111827]/40 font-bold uppercase tracking-widest leading-loose">
              © 2026 Harvest For All | Built for the MICT SETA National Skills Challenge | Western Cape, South Africa
           </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
