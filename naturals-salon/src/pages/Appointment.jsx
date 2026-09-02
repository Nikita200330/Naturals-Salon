import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Phone, CheckCircle2, CalendarPlus, ChevronDown, MessageSquare, ArrowLeft, RefreshCw, Clock, Star, AlertCircle } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';
import { getServices } from '../services/servicesService';
import { createAppointment, checkAvailability } from '../services/appointmentService';

import SEO from '../components/SEO';

export default function Appointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const serviceParam = queryParams.get('service');
  
  const [servicesList, setServicesList] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const today = new Date().toLocaleDateString('en-CA'); 

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: today,
    time: ''
  });

  const [status, setStatus] = useState('idle');
  const [submitError, setSubmitError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [bookingSummary, setBookingSummary] = useState(null);
  
  // Availability state
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availabilityMode, setAvailabilityMode] = useState('preferred-time'); // preferred-time | slot-based

  useEffect(() => {
    const fetchSrv = async () => {
      try {
        const data = await getServices();
        setServicesList(data.data || []);
      } catch (err) {
        console.error("Error loading services", err);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchSrv();
  }, []);

  // Update initial service when services load
  useEffect(() => {
    if (serviceParam && servicesList.length > 0 && !formData.service) {
      const matched = servicesList.find(
        s => s.id.toLowerCase() === serviceParam.toLowerCase() || 
             (s.slug && s.slug.toLowerCase() === serviceParam.toLowerCase()) ||
             s.name.toLowerCase() === serviceParam.toLowerCase()
      );
      if (matched) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData(prev => ({ ...prev, service: matched.id }));
      }
    }
  }, [serviceParam, servicesList, formData.service]);

  // Check Availability
  useEffect(() => {
    let controller = new AbortController();
    
    const check = async () => {
      if (!formData.service || !formData.date) return;
      
      setCheckingAvailability(true);
      setAvailabilityMessage(null);
      
      try {
        const res = await checkAvailability(formData.service, formData.date);
        
        // Use aborted signal? Not directly in custom apiClient without passing signal, but we can ignore stale responses
        if (controller.signal.aborted) return;
        
        if (res.data) {
          setAvailabilityMode(res.data.mode || 'preferred-time');
          
          if (res.data.isClosed) {
            setAvailabilityMessage({ type: 'error', text: 'Salon is closed on this date.' });
            setAvailableSlots([]);
          } else if (res.data.mode === 'slot-based') {
            setAvailableSlots(res.data.availableSlots || []);
            if (!res.data.availableSlots?.length) {
              setAvailabilityMessage({ type: 'error', text: 'No available times for this date.' });
            }
          } else {
            setAvailableSlots([]);
            setAvailabilityMessage({ type: 'info', text: 'Final availability is confirmed by the salon.' });
          }
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error(err);
        setAvailabilityMessage({ type: 'error', text: 'Unable to verify availability right now.' });
      } finally {
        if (!controller.signal.aborted) {
          setCheckingAvailability(false);
        }
      }
    };
    
    check();
    
    return () => {
      controller.abort();
    };
  }, [formData.service, formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
    setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      alert("Please fill all required fields.");
      return;
    }

    setStatus('processing');
    setSubmitError(null);
    setFieldErrors({});

    try {
      const payload = {
        customerName: formData.name,
        mobile: formData.phone,
        serviceId: formData.service,
        preferredDate: formData.date,
        preferredTime: formData.time,
        message: formData.message || ''
      };

      const res = await createAppointment(payload);
      
      const formattedDate = new Date(formData.date).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
      
      const [hour, min] = formData.time.split(':');
      const time12h = new Date(2000, 0, 1, hour, min).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      
      const serviceObj = servicesList.find(s => s.id === formData.service) || { name: 'Service' };

      const rawSummary = `Hello Naturals Salon,\n\nI submitted an appointment request.\n\nName: ${formData.name}\nService: ${serviceObj.name}\nDate: ${formattedDate}\nPreferred Time: ${time12h}\nPhone: ${formData.phone}\nRequest ID: ${res.data?.id || 'N/A'}\n\nPlease confirm availability.`;

      setBookingSummary({
        raw: rawSummary,
        name: formData.name,
        service: serviceObj.name,
        date: formattedDate,
        time: time12h,
        phone: formData.phone,
        status: res.data?.status || 'PENDING',
        id: res.data?.id
      });
      
      setStatus('success');

      // Auto-redirect to WhatsApp
      const text = encodeURIComponent(rawSummary);
      const waPhone = businessInfo.phone.replace(/[^0-9]/g, '');
      const waLink = `https://wa.me/${waPhone}?text=${text}`;
      window.location.href = waLink;
    } catch (err) {
      setStatus('idle');
      
      if (err.status === 400 && err.fields) {
        setFieldErrors(err.fields);
        setSubmitError(err.message || 'Please check the highlighted fields.');
      } else if (err.status === 409) {
        if (err.code === 'APPOINTMENT_TIME_UNAVAILABLE') {
          setSubmitError('That preferred time is no longer available. Please choose another time.');
        } else if (err.code === 'DUPLICATE_APPOINTMENT_REQUEST') {
          setSubmitError('A similar appointment request was submitted recently.');
        } else {
          setSubmitError(err.message || 'Conflict submitting appointment.');
        }
      } else if (err.status === 429) {
        setSubmitError('Too many requests. Please wait a little and try again.');
      } else {
        setSubmitError('We couldn\'t submit your appointment request right now.');
      }
    }
  };

  const generateWhatsAppLink = () => {
    if (!bookingSummary) return '#';
    const text = encodeURIComponent(bookingSummary.raw);
    const waPhone = businessInfo.phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${waPhone}?text=${text}`;
  };

  const handleEditRequest = () => {
    setStatus('idle');
    setBookingSummary(null);
  };

  return (
    <>
      <SEO 
        title="Book Appointment | Naturals Salon Kalaburagi"
        description="Book your salon appointment online at Naturals Salon Kalaburagi. Fast, easy, and convenient scheduling for hair, beauty, and grooming services."
        url="/appointment"
      />
      <div className="pt-28 pb-24 min-h-screen relative overflow-hidden bg-dark-950">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-800/50 border border-brand-500/30 text-brand-300 text-xs font-bold tracking-widest uppercase mb-6">
             EASY SCHEDULING
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">
            Book an Appointment
          </h1>
          <p className="text-brand-300/80 text-lg max-w-xl mx-auto">
            Reserve your time for a premium salon experience. We'll get back to you quickly to confirm.
          </p>
        </div>

        <div className="glass-panel card-3d p-6 md:p-10 relative overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/20 rounded-full blur-[50px]"></div>

          {status === 'success' && bookingSummary ? (
            <div className="text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">Appointment Request Submitted</h2>
              <p className="text-brand-300/80 mb-8 max-w-md mx-auto">
                Thank you, <strong className="text-white">{bookingSummary.name}</strong>. Final confirmation will be provided by the salon.
              </p>
              
              <div className="bg-dark-900/50 rounded-2xl p-6 md:p-8 text-left border border-white/5 mb-8 max-w-md mx-auto shadow-inner">
                <h3 className="text-sm font-bold tracking-widest text-brand-400 uppercase mb-6 flex items-center gap-2">
                  <CalendarPlus className="w-4 h-4" /> Request Details
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-brand-300/60 text-sm">Service</span>
                    <span className="font-medium text-white">{bookingSummary.service}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-brand-300/60 text-sm">Date</span>
                    <span className="font-medium text-white">{bookingSummary.date}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-brand-300/60 text-sm">Preferred Time</span>
                    <span className="font-medium text-white">{bookingSummary.time}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-brand-300/60 text-sm">Status</span>
                    <span className="font-medium text-brand-400">{bookingSummary.status}</span>
                  </div>
                  {bookingSummary.id && (
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <span className="text-brand-300/60 text-sm">Request ID</span>
                      <span className="font-mono text-xs text-brand-400/70">{bookingSummary.id}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <a 
                  href={`tel:${businessInfo.phone}`}
                  className="btn-primary flex-1 bg-gradient-to-br from-brand-600 to-brand-800"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Call Salon to Confirm
                </a>
                <a 
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex-1 overflow-hidden bg-[#25D366] text-white px-8 py-3.5 rounded-2xl font-medium tracking-wide shadow-3d hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all duration-300 inline-flex items-center justify-center transform hover:-translate-y-1 active:translate-y-0"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  WhatsApp Salon
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-700">
              
              {submitError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">{submitError}</p>
                    {submitError === 'We couldn\'t submit your appointment request right now.' && (
                      <div className="mt-3 flex gap-3">
                         <a href={`tel:${businessInfo.phone}`} className="text-xs underline hover:text-white">Call Salon</a>
                         <span className="opacity-50">|</span>
                         <a href={`https://wa.me/${businessInfo.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-xs underline hover:text-white">WhatsApp Salon</a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    minLength={2} maxLength={100}
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full px-5 py-4 bg-dark-900/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all peer placeholder-transparent ${fieldErrors.customerName ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' : 'border-white/10 focus:ring-brand-500/50 focus:border-brand-500'}`}
                    placeholder="Full Name"
                  />
                  <label htmlFor="name" className="absolute left-5 top-4 text-brand-300/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs">
                    Full Name
                  </label>
                  {fieldErrors.customerName && <p className="text-red-400 text-xs mt-1 absolute -bottom-5">{fieldErrors.customerName}</p>}
                </div>

                <div className="relative group">
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    required
                    pattern="[0-9\+\-\s\(\)]+"
                    maxLength={20}
                    inputMode="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`block w-full px-5 py-4 bg-dark-900/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all peer placeholder-transparent ${fieldErrors.mobile ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' : 'border-white/10 focus:ring-brand-500/50 focus:border-brand-500'}`}
                    placeholder="Phone Number"
                  />
                  <label htmlFor="phone" className="absolute left-5 top-4 text-brand-300/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs">
                    Phone Number
                  </label>
                  {fieldErrors.mobile && <p className="text-red-400 text-xs mt-1 absolute -bottom-5">{fieldErrors.mobile}</p>}
                </div>
              </div>

              <div className="relative group">
                <select 
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className={`block w-full px-5 py-4 bg-dark-900/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${fieldErrors.serviceId ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' : 'border-white/10 focus:ring-brand-500/50 focus:border-brand-500'}`}
                >
                  <option value="" disabled className="text-gray-500">
                    {loadingServices ? 'Loading services...' : 'Select a service'}
                  </option>
                  {servicesList.map(service => (
                    <option key={service.id} value={service.id} className="bg-dark-800 text-white">{service.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400 pointer-events-none" />
                <label htmlFor="service" className="absolute left-5 top-1.5 text-xs text-brand-400 transition-all">
                  Service
                </label>
                {fieldErrors.serviceId && <p className="text-red-400 text-xs mt-1 absolute -bottom-5">{fieldErrors.serviceId}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input 
                    type="date" 
                    id="date"
                    name="date"
                    required
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    className={`block w-full px-5 py-4 bg-dark-900/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert ${fieldErrors.preferredDate ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' : 'border-white/10 focus:ring-brand-500/50 focus:border-brand-500'}`}
                  />
                  <label htmlFor="date" className="absolute left-5 top-1.5 text-xs text-brand-400 transition-all">
                    Preferred Date
                  </label>
                  {fieldErrors.preferredDate && <p className="text-red-400 text-xs mt-1 absolute -bottom-5">{fieldErrors.preferredDate}</p>}
                </div>

                <div className="relative group">
                  {availabilityMode === 'slot-based' && availableSlots.length > 0 ? (
                    <>
                      <select
                        id="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className={`block w-full px-5 py-4 bg-dark-900/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${fieldErrors.preferredTime ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' : 'border-white/10 focus:ring-brand-500/50 focus:border-brand-500'}`}
                      >
                        <option value="" disabled className="text-gray-500">Select available time</option>
                        {availableSlots.map(slot => (
                          <option key={slot} value={slot} className="bg-dark-800 text-white">{slot}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400 pointer-events-none" />
                    </>
                  ) : (
                    <input 
                      type="time" 
                      id="time"
                      name="time"
                      required
                      min="09:00"
                      max="21:00"
                      step="1800"
                      value={formData.time}
                      onChange={handleChange}
                      disabled={availabilityMessage?.type === 'error'}
                      className={`block w-full px-5 py-4 bg-dark-900/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert ${fieldErrors.preferredTime ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' : 'border-white/10 focus:ring-brand-500/50 focus:border-brand-500'} disabled:opacity-50`}
                    />
                  )}
                  
                  <label htmlFor="time" className="absolute left-5 top-1.5 text-xs text-brand-400 transition-all">
                    {availabilityMode === 'slot-based' ? 'Available Slot' : 'Preferred Time'}
                  </label>
                  {fieldErrors.preferredTime && <p className="text-red-400 text-xs mt-1 absolute -bottom-5">{fieldErrors.preferredTime}</p>}
                </div>
              </div>
              
              {/* Availability Message */}
              <div className="h-6 -mt-4">
                {checkingAvailability ? (
                  <p className="text-xs text-brand-400 flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin" /> Checking available times...</p>
                ) : availabilityMessage ? (
                  <p className={`text-xs ${availabilityMessage.type === 'error' ? 'text-red-400' : 'text-brand-300/70'}`}>
                    {availabilityMessage.text}
                  </p>
                ) : null}
              </div>

              <div className="relative group">
                <textarea 
                  id="message"
                  name="message"
                  rows="3" maxLength={500}
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full px-5 py-4 bg-dark-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all peer placeholder-transparent resize-none pt-6"
                  placeholder="Optional Message"
                ></textarea>
                <label htmlFor="message" className="absolute left-5 top-4 text-brand-300/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs">
                  Optional Message / Special Request
                </label>
              </div>

              <div className="pt-6 flex flex-col items-center">
                <button 
                  type="submit" 
                  disabled={status === 'processing' || availabilityMessage?.type === 'error'}
                  className="btn-primary w-full md:w-auto min-w-[300px] text-lg shadow-[0_0_20px_rgba(142,97,214,0.3)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {status === 'processing' && <RefreshCw className="w-5 h-5 animate-spin" />}
                  {status === 'processing' ? 'Submitting...' : 'Request Appointment'}
                </button>
                
                <a 
                  href={`tel:${businessInfo.phone}`}
                  className="mt-6 text-sm text-brand-400 hover:text-white transition-colors"
                >
                  Call Salon Instead
                </a>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
    </>
  );
}
