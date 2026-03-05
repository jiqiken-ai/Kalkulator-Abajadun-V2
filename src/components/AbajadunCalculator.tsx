import { useState, useMemo, useRef } from 'react';
import html2canvas from 'html2canvas';
import { ABAJADUN_DATA, ASMAUL_HUSNA } from '../constants';
import { AbajadunChar, AsmaulHusnaItem } from '../types';
import { Trash2, RotateCcw, Download, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AbajadunCalculator() {
  const [currentInput, setCurrentInput] = useState<AbajadunChar[]>([]);
  const captureRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const total = useMemo(() => {
    return currentInput.reduce((sum, item) => sum + item.v, 0);
  }, [currentInput]);

  const combinations = useMemo(() => {
    if (total === 0) return [];
    const findCombos = (target: number, list: AsmaulHusnaItem[]) => {
      const res: AsmaulHusnaItem[][] = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].v === target) res.push([list[i]]);
      }
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          if (list[i].v + list[j].v === target) res.push([list[i], list[j]]);
        }
      }
      return res;
    };
    const result = findCombos(total, ASMAUL_HUSNA);
    return result.slice(0, 3);
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

  const saveAsImage = async () => {
    if (!captureRef.current || isSaving) return;
    setIsSaving(true);
    try {
      const canvas = await html2canvas(captureRef.current, { backgroundColor: '#ffffff', scale: 2 });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `Abajadun-${total}.png`;
      link.click();
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full">
      <div ref={captureRef} className="p-6 bg-white">
        <div className="text-center mb-6">
          <h1 className="text-sm font-bold uppercase tracking-widest text-slate-400">Kalkulator Abajadun</h1>
          <div className="h-px w-12 bg-emerald-500 mx-auto mt-2" />
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-center mb-6 shadow-inner">
          <div className="text-3xl min-h-[40px] mb-2 font-arabic flex justify-center gap-1 flex-wrap text-emerald-400" dir="rtl">
            {currentInput.length > 0 ? currentInput.map((item, idx) => <span key={idx}>{item.h}</span>) : <span>...</span>}
          </div>
          <div className="text-5xl font-bold text-white">{total}</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase border-b pb-2">
            <Info size={12} className="text-emerald-500" /> Kombinasi Asmaul Husna
          </div>
          <div className="space-y-2">
            {combinations.map((combo, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-xl border-l-4 border-emerald-500">
                {combo.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="font-bold">{item.n}</span>
                    <span className="text-emerald-600">{item.v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50 border-t">
        <div className="grid grid-cols-4 gap-2 mb-6" dir="rtl">
          {ABAJADUN_DATA.map((item, idx) => (
            <button key={idx} onClick={() => handleAddChar(item)} className="bg-white border p-3 rounded-xl hover:bg-emerald-50 transition-all shadow-sm">
              <span className="text-2xl font-bold">{item.h}</span>
              <span className="block text-[10px] text-slate-400">{item.v}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={handleDeleteLast} className="bg-orange-500 text-white py-3 rounded-xl font-bold text-sm">Hapus</button>
          <button onClick={handleClearAll} className="bg-rose-500 text-white py-3 rounded-xl font-bold text-sm">Reset</button>
          <button onClick={saveAsImage} className="col-span-2 bg-emerald-600 text-white py-4 rounded-xl font-bold text-sm">
            {isSaving ? 'Memproses...' : 'Simpan Hasil (Gambar)'}
          </button>
        </div>
      </div>
    </div>
  );
}
