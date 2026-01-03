import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Shield, 
  AlertOctagon, 
  Heart, 
  Navigation, 
  Siren, 
  Radio,
  Loader2
} from 'lucide-react';

const EmergencyMode: React.FC = () => {
  const [active, setActive] = useState(false);
  const [locating, setLocating] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [nearbyHelp, setNearbyHelp] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const activateSafetyProtocol = () => {
    setActive(true);
    setLocating(true);
    setError(null);

    if (!navigator.geolocation) {
      setLocating(false);
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
        setTimeout(() => {
          setNearbyHelp([
            { name: "Central Police Precinct", type: "Police", distance: "0.8 km", time: "3 min", phone: "911" },
            { name: "Women's Crisis Center", type: "Support", distance: "1.2 km", time: "5 min", phone: "1-800-SAFE" },
            { name: "Metro General Hospital", type: "Medical", distance: "2.1 km", time: "8 min", phone: "911" },
          ]);
        }, 800);
      },
      (err) => {
        setLocating(false);
        setError("Unable to access location. Using national defaults.");
        setNearbyHelp([
           { name: "Emergency Services", type: "General", distance: "--", time: "--", phone: "911" },
           { name: "Cybercrime Hotline", type: "Support", distance: "National", time: "24/7", phone: "1091" },
        ]);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden bg-[#0f0505] text-white">
      
      {/* Background Pulse Effect */}
      {active && (
         <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         </div>
      )}

      <div className="relative z-10 w-full max-w-5xl px-4 py-12 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-6 border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.4)] animate-pulse">
            <Siren className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight uppercase">Emergency Mode</h2>
          <p className="text-red-200/70 text-lg max-w-xl mx-auto">
             Immediate safety protocol. Connection to verified authorities.
          </p>
        </div>

        {/* Main Activation Button */}
        <div className="w-full max-w-md mx-auto mb-16 relative">
          {!active ? (
            <div className="flex flex-col items-center">
              <button 
                onClick={activateSafetyProtocol}
                className="group relative w-64 h-64 rounded-full bg-gradient-to-br from-[#450a0a] to-[#7f1d1d] border-4 border-red-500/30 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(220,38,38,0.3)] hover:shadow-[0_0_100px_rgba(220,38,38,0.6)] cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute w-full h-full border-[2px] border-red-500/50 rounded-full animate-ping opacity-20"></div>
                
                <AlertOctagon className="w-16 h-16 text-white mb-2 drop-shadow-lg" />
                <span className="text-3xl font-black tracking-widest text-white drop-shadow-md">HELP</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-red-200 mt-1">Tap for Assistance</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#1a0505] border border-red-900/50 rounded-3xl p-8 shadow-2xl animate-fade-in-up w-full">
               <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-900/30">
                  <div className="flex items-center gap-2 text-red-500 font-mono text-sm uppercase tracking-widest">
                     <Radio className="w-4 h-4 animate-pulse" /> Live Tracking
                  </div>
                  <button onClick={() => setActive(false)} className="text-xs text-red-400/50 hover:text-red-400">CANCEL</button>
               </div>
               
               {locating ? (
                 <div className="py-12 flex flex-col items-center">
                   <Loader2 className="w-12 h-12 text-red-500 animate-spin mb-4" />
                   <p className="text-white font-medium">Triangulating verified safe zones...</p>
                 </div>
               ) : (
                 <div className="space-y-4">
                   {error ? (
                     <div className="p-4 bg-red-950/50 border border-red-800 rounded-lg text-red-200 text-sm text-center">
                       {error}
                     </div>
                   ) : (
                     <div className="p-4 bg-emerald-950/30 border border-emerald-900/50 rounded-lg flex items-center gap-3 mb-6">
                       <MapPin className="w-5 h-5 text-emerald-500" />
                       <div>
                         <p className="text-emerald-400 font-bold text-sm">Location Acquired</p>
                         <p className="text-emerald-500/50 text-xs font-mono">{location?.lat.toFixed(4)}, {location?.lng.toFixed(4)}</p>
                       </div>
                     </div>
                   )}

                   <div className="space-y-3">
                     {nearbyHelp.map((spot, idx) => (
                       <a 
                          href={`tel:${spot.phone}`}
                          key={idx} 
                          className="flex items-center justify-between p-4 bg-red-950/20 border border-red-900/30 rounded-xl hover:bg-red-900/20 hover:border-red-500/50 transition-all group"
                       >
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors">
                              {spot.type === 'Police' ? <Shield className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
                           </div>
                           <div>
                             <h4 className="text-white font-bold">{spot.name}</h4>
                             <p className="text-red-200/50 text-xs">{spot.distance} away • {spot.time}</p>
                           </div>
                         </div>
                         <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-lg text-white text-sm font-bold shadow-lg shadow-red-900/50 group-hover:scale-105 transition-transform">
                           <Phone className="w-4 h-4" /> CALL
                         </div>
                       </a>
                     ))}
                   </div>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* Global Numbers */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
           <a href="tel:911" className="bg-[#2a0a0a] border border-red-900/30 hover:border-red-600 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all">
             <span className="text-2xl font-black text-white">911</span>
             <span className="text-[10px] uppercase text-red-400">Emergency (US)</span>
           </a>
           <a href="tel:112" className="bg-[#2a0a0a] border border-red-900/30 hover:border-red-600 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all">
             <span className="text-2xl font-black text-white">112</span>
             <span className="text-[10px] uppercase text-red-400">Emergency (EU)</span>
           </a>
        </div>

      </div>
    </div>
  );
};

export default EmergencyMode;