import { useState } from 'react';
import { Calculator, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AbajadunCalculator from './components/AbajadunCalculator';
import HijaiyahConverterPro from './components/HijaiyahConverterPro';

type Page = 'abajadun' | 'hijaiyah';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('abajadun');

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col items-center py-8 px-4 font-sans text-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col"
      >
        {/* Navigation Tabs */}
        <div className="flex bg-slate-100 p-1 m-4 rounded-2xl">
          <button
            onClick={() => setActivePage('abajadun')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${
              activePage === 'abajadun' 
                ? 'bg-white text-emerald-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Calculator size={16} />
            Abajadun
          </button>
          <button
            onClick={() => setActivePage('hijaiyah')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${
              activePage === 'hijaiyah' 
                ? 'bg-white text-emerald-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Languages size={16} />
            Konverter
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {activePage === 'abajadun' ? (
              <motion.div
                key="abajadun"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <AbajadunCalculator />
              </motion.div>
            ) : (
              <motion.div
                key="hijaiyah"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <HijaiyahConverterPro />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      <p className="mt-8 text-slate-400 text-xs font-medium text-center">
        Kalkulator Hisab Abajadun & Konverter Hijaiyah Pro
      </p>
    </div>
  );
}
