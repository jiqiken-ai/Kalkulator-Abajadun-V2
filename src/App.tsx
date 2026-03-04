import { useState, useMemo, useRef } from 'react';
import html2canvas from 'html2canvas';
import { ABAJADUN_DATA, ASMAUL_HUSNA } from './constants';
import { AbajadunChar, AsmaulHusnaItem } from './types';
import { Trash2, RotateCcw, Download, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentInput, setCurrentInput] = useState<AbajadunChar[]>([]);
  const captureRef = useRef<HTMLDivElement>(null);

  const total = useMemo(() => {
    return currentInput.reduce((sum, item) => sum + item.v, 0);
  }, [currentInput]);

  const combinations = useMemo(() => {
    if (total === 0) return [];

    const findCombos = (target: number, list: AsmaulHusnaItem[]) => {
      const res: AsmaulHusnaItem[][] = [];
      
      // Single
      for (let i = 0; i < list.length; i++) {
        if (list[i].v === target) res.push([list[i]]);
      }
      
      // Double
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          if (list[i].v + list[j].v === target) res.push([list[i], list[j]]);
        }
      }
      
      // Triple
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          for (let k = j + 1; k < list.length; k++) {
            if (list[i].v + list[j].v + list[k].v === target) {
              res.push([list[i], list[j], list[k]]);
            }
          }
        }
      }
      return res;
    };

    const result = findCombos(total, ASMAUL_HUSNA);
    // Sort each combination by value descending and take top 3
    return result.map(combo => [...combo].sort((a, b) => b.v - a.v)).slice(0, 3);
  }, [total]);

  const handleAddChar = (char: AbajadunChar) => {
    setCurrentInput(prev => [...prev, char]);
  };

  const handleDeleteLast = () => {
    setCurrentInput(prev => prev.slice(0, -1));
  };

  const handleClearAll = () => {
    setCurrentInput([]);
  };

  const [isSaving, setIsSaving] = useState(false);

  const saveAsImage = async () => {
    if (!captureRef.current || isSaving) return;
    
    setIsSaving(true);
    try {
      // Wait for animations to settle
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        // Ensure we capture the full element even if scrolled
        windowWidth: captureRef.current.scrollWidth,
        windowHeight: captureRef.current.scrollHeight,
      });

      // Convert to Blob for better mobile/iframe compatibility
      canvas.toBlob((blob) => {
        if (!blob) {
          setIsSaving(false);
          alert('Gagal memproses gambar.');
          return;
        }

        const url = URL.createObjectURL(blob);
        const fileName = `Abajadun-${total || 'hasil'}.png`;

        // Create a temporary link
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        
        // Append to body to ensure it works in all browsers
        document.body.appendChild(link);
        
        // Trigger download
        link.click();

        // Fallback for some mobile browsers where click() might be blocked in iframes
        // We provide a small delay then check if we should show a manual link
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          setIsSaving(false);
        }, 200);

      }, 'image/png', 1.0);

    } catch (error) {
      console.error('Failed to save image:', error);
      alert('Terjadi kesalahan saat menyimpan gambar. Silakan coba lagi.');
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col items-center py-8 px-4 font-sans text-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Header / Capture Area */}
        <div ref={captureRef} className="p-6" style={{ backgroundColor: '#ffffff' }}>
          <div className="text-center mb-6">
            <h1 className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: '#94a3b8' }}>Kalkulator Abajadun</h1>
            <div className="h-px w-12 mx-auto mb-4" style={{ backgroundColor: '#10b981' }} />
          </div>

          <div className="rounded-2xl p-6 text-center mb-6" style={{ backgroundColor: '#0f172a', boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' }}>
            <div className="text-3xl min-h-[40px] mb-2 font-arabic flex justify-center gap-1 flex-wrap" dir="rtl" style={{ color: '#34d399' }}>
              {currentInput.length > 0 ? (
                currentInput.map((item, idx) => (
                  <span key={idx}>{item.h}</span>
                ))
              ) : (
                <span style={{ color: '#475569' }}>...</span>
              )}
            </div>
            <div className="text-5xl font-bold tabular-nums" style={{ color: '#ffffff' }}>
              {total}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider border-b pb-2" style={{ color: '#94a3b8', borderColor: '#f1f5f9' }}>
              <Info size={12} style={{ color: '#10b981' }} />
              Kombinasi Asmaul Husna
            </div>

            <div className="space-y-3 min-h-[100px]">
              <AnimatePresence mode="popLayout">
                {combinations.length > 0 ? (
                  combinations.map((combo, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="border-l-4 p-4 rounded-r-xl"
                      style={{ backgroundColor: '#f8fafc', borderLeftColor: '#10b981', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
                    >
                      <div className="space-y-3">
                        {combo.map((item, iIdx) => (
                          <div key={iIdx} className="border-b last:border-0 pb-2 last:pb-0" style={{ borderColor: '#e2e8f0' }}>
                            <div className="flex justify-between items-baseline">
                              <span className="font-bold" style={{ color: '#1e293b' }}>{item.n}</span>
                              <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded" style={{ color: '#059669', backgroundColor: '#ecfdf5' }}>
                                {item.v}
                              </span>
                            </div>
                            <p className="text-xs italic mt-0.5" style={{ color: '#64748b' }}>{item.m}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-2 border-t border-dashed text-[10px] font-mono font-bold" style={{ borderColor: '#cbd5e1', color: '#94a3b8' }}>
                        HISAB: {combo.map(x => x.v).join(' + ')} = {total}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8" style={{ color: '#cbd5e1' }}>
                    <p className="text-sm italic">
                      {total === 0 ? "Masukkan huruf untuk melihat hasil..." : "Tidak ada kombinasi tepat."}
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Numpad & Controls */}
        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <div className="grid grid-cols-4 gap-2 mb-6" dir="rtl">
            {ABAJADUN_DATA.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleAddChar(item)}
                className="group flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 active:scale-95 transition-all shadow-sm"
              >
                <span className="text-2xl font-bold text-slate-800 group-hover:text-emerald-700">{item.h}</span>
                <span className="text-[10px] text-slate-400 font-mono group-hover:text-emerald-600">{item.v}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDeleteLast}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-orange-500/20 active:scale-95"
            >
              <Trash2 size={16} />
              Hapus
            </button>
            <button
              onClick={handleClearAll}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-rose-500/20 active:scale-95"
            >
              <RotateCcw size={16} />
              Reset
            </button>
            <button
              onClick={saveAsImage}
              disabled={isSaving}
              className={`col-span-2 flex items-center justify-center gap-2 py-4 px-4 text-white rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 ${
                isSaving 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
              }`}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Simpan Hasil (Gambar)
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
      
      <p className="mt-8 text-slate-400 text-xs font-medium">
        Kalkulator Hisab Abajadun & Asmaul Husna
      </p>
    </div>
  );
}
