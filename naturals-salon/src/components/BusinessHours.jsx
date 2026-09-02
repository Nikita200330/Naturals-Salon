import { Clock } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';
import { getStoreStatus } from '../utils/businessHours';
import { useEffect, useState } from 'react';

export default function BusinessHours() {
  const [status, setStatus] = useState(() => getStoreStatus());
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {

    // Get current day in IST
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istDate = new Date(utc + (3600000 * 5.5));
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentDay(days[istDate.getDay()]);

    // Optional: Update status every minute
    const interval = setInterval(() => {
      
    setStatus(getStoreStatus());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 bg-brand-950/80 border-t border-brand-800/30">
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-brand-900/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-brand-700/50 shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-600/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-12 relative z-10">
            
            <div className="flex-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-800 border border-brand-600/50 mb-6 text-gold-300">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-gold-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
                Visit Us
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                Business Hours
              </h2>
              <p className="text-brand-200 mb-8">
                We are open 7 days a week to provide you with professional salon services when you need them.
              </p>
              
              <div className="inline-flex items-center gap-3 bg-brand-950/80 px-5 py-3 rounded-xl border border-brand-800">
                <div className="relative flex h-3 w-3">
                  {status.isOpen && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${status.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </div>
                <span className="font-semibold text-white tracking-wide">
                  {status.text}
                </span>
              </div>
            </div>

            <div className="flex-1 bg-brand-950/50 rounded-2xl p-6 border border-brand-800/50">
              <ul className="flex flex-col gap-3">
                {businessInfo.openingHours.map((schedule) => {
                  const isToday = currentDay === schedule.day;
                  return (
                    <li 
                      key={schedule.day} 
                      className={`flex justify-between items-center py-2 px-4 rounded-lg transition-colors ${
                        isToday 
                          ? 'bg-brand-800/80 border border-brand-600/50 text-white shadow-inner' 
                          : 'text-brand-300 hover:bg-brand-800/30'
                      }`}
                    >
                      <span className={`font-medium ${isToday ? 'text-gold-300' : ''}`}>
                        {schedule.day}
                      </span>
                      <span className={isToday ? 'font-semibold' : ''}>
                        {schedule.hours}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
