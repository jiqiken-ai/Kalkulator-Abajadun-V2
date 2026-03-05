import { useState, useMemo, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Trash2, RotateCcw, Download, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ABAJADUN_DATA = [
  { h: 'ا', v: 1 }, { h: 'ب', v: 2 }, { h: 'ج', v: 3 }, { h: 'د', v: 4 }, { h: 'ه', v: 5 }, { h: 'و', v: 6 }, { h: 'ز', v: 7 }, { h: 'ح', v: 8 }, { h: 'ط', v: 9 },
  { h: 'ي', v: 10 }, { h: 'ك', v: 20 }, { h: 'ل', v: 30 }, { h: 'م', v: 40 }, { h: 'ن', v: 50 }, { h: 'س', v: 60 }, { h: 'ع', v: 70 }, { h: 'ف', v: 80 }, { h: 'ص', v: 90 },
  { h: 'ق', v: 100 }, { h: 'ر', v: 200 }, { h: 'ش', v: 300 }, { h: 'ت', v: 400 }, { h: 'ث', v: 500 }, { h: 'خ', v: 600 }, { h: 'ذ', v: 700 }, { h: 'ض', v: 800 }, { h: 'ظ', v: 900 }, { h: 'غ', v: 1000 }
];

const ASMAUL_HUSNA = [
  { n: "Allah", a: "الله", v: 66, m: "Allah" },
  { n: "Ar-Rahman", a: "الرحمن", v: 298, m: "Maha Pengasih" },
  { n: "Ar-Rahim", a: "الرحيم", v: 258, m: "Maha Penyayang" },
  { n: "Al-Malik", a: "الملك", v: 90, m: "Maha Merajai" },
  { n: "Al-Quddus", a: "القدوس", v: 170, m: "Maha Suci" },
  { n: "As-Salam", a: "السلام", v: 131, m: "Maha Sejahtera" },
  { n: "Al-Mu'min", a: "المؤمن", v: 136, m: "Maha Pemberi Keamanan" },
  { n: "Al-Muhaimin", a: "المهيمن", v: 145, m: "Maha Memelihara" },
  { n: "Al-Aziz", a: "العزيز", v: 94, m: "Maha Perkasa" },
  { n: "Al-Jabbar", a: "الجبار", v: 206, m: "Maha Berkuasa" },
  { n: "Al-Mutakabbir", a: "المتكبر", v: 662, m: "Maha Memiliki Kebesaran" },
  { n: "Al-Khaliq", a: "الخالق", v: 731, m: "Maha Pencipta" },
  { n: "Al-Bari", a: "البارئ", v: 213, m: "Maha Melepaskan" },
  { n: "Al-Mushawwir", a: "المصور", v: 336, m: "Maha Membentuk Rupa" },
  { n: "Al-Ghaffar", a: "الغفار", v: 1281, m: "Maha Pengampun" },
  { n: "Al-Qahhar", a: "القهار", v: 306, m: "Maha Menundukkan" },
  { n: "Al-Wahhab", a: "الوهاب", v: 14, m: "Maha Pemberi Karunia" },
  { n: "Ar-Razzaq", a: "الرزاق", v: 308, m: "Maha Pemberi Rezeki" },
  { n: "Al-Fattah", a: "الفتاح", v: 489, m: "Maha Pembuka Rahmat" },
  { n: "Al-Alim", a: "العليم", v: 150, m: "Maha Mengetahui" },
  { n: "Al-Qabidh", a: "القابض", v: 903, m: "Maha Menyempitkan" },
  { n: "Al-Basit", a: "الباسط", v: 72, m: "Maha Melapangkan" },
  { n: "Al-Khafidh", a: "الخافض", v: 1481, m: "Maha Merendahkan" },
  { n: "Ar-Rafi", a: "الرافع", v: 351, m: "Maha Meninggikan" },
  { n: "Al-Muizz", a: "المعز", v: 117, m: "Maha Memuliakan" },
  { n: "Al-Mudhill", a: "المذل", v: 770, m: "Maha Menghinakan" },
  { n: "As-Sami", a: "السميع", v: 180, m: "Maha Mendengar" },
  { n: "Al-Bashir", a: "البصير", v: 302, m: "Maha Melihat" },
  { n: "Al-Hakam", a: "الحكم", v: 68, m: "Maha Menetapkan" },
  { n: "Al-Adl", a: "العدل", v: 104, m: "Maha Adil" },
  { n: "Al-Latif", a: "اللطيف", v: 129, m: "Maha Lembut" },
  { n: "Al-Khabir", a: "الخبير", v: 812, m: "Maha Mengenal" },
  { n: "Al-Halim", a: "الحليم", v: 88, m: "Maha Penyantun" },
  { n: "Al-Azim", a: "العظيم", v: 1020, m: "Maha Agung" },
  { n: "Al-Ghafur", a: "الغفور", v: 1286, m: "Maha Pengampun" },
  { n: "Asy-Syakur", a: "الشكور", v: 526, m: "Maha Menghargai" },
  { n: "Al-Aliy", a: "العلي", v: 110, m: "Maha Tinggi" },
  { n: "Al-Kabir", a: "الكبير", v: 232, m: "Maha Besar" },
  { n: "Al-Hafiz", a: "الحفيظ", v: 998, m: "Maha Memelihara" },
  { n: "Al-Muqit", a: "المقيت", v: 550, m: "Maha Pemberi Kecukupan" },
  { n: "Al-Hasib", a: "الحسيب", v: 80, m: "Maha Membuat Perhitungan" },
  { n: "Al-Jalil", a: "الجليل", v: 73, m: "Maha Luhur" },
  { n: "Al-Karim", a: "الكريم", v: 270, m: "Maha Pemurah" },
  { n: "Ar-Raqib", a: "الرقيب", v: 312, m: "Maha Mengawasi" },
  { n: "Al-Mujib", a: "المجيب", v: 55, m: "Maha Mengabulkan" },
  { n: "Al-Wasi", a: "الواسع", v: 137, m: "Maha Luas" },
  { n: "Al-Hakim", a: "الحكيم", v: 78, m: "Maha Bijaksana" },
  { n: "Al-Wadud", a: "الودود", v: 20, m: "Maha Mengasihi" },
  { n: "Al-Majid", a: "المجيد", v: 57, m: "Maha Mulia" },
  { n: "Al-Baith", a: "الباعث", v: 573, m: "Maha Membangkitkan" },
  { n: "Asy-Syahid", a: "الشهيد", v: 319, m: "Maha Menyaksikan" },
  { n: "Al-Haqq", a: "الحق", v: 108, m: "Maha Benar" },
  { n: "Al-Wakil", a: "الوكيل", v: 66, m: "Maha Memelihara" },
  { n: "Al-Qawiyy", a: "القوي", v: 116, m: "Maha Kuat" },
  { n: "Al-Matin", a: "المتين", v: 500, m: "Maha Kokoh" },
  { n: "Al-Waliyy", a: "الولي", v: 46, m: "Maha Melindungi" },
  { n: "Al-Hamid", a: "الحميد", v: 62, m: "Maha Terpuji" },
  { n: "Al-Muhsi", a: "المحصي", v: 148, m: "Maha Mengalkulasi" },
  { n: "Al-Mubdi", a: "المبدئ", v: 56, m: "Maha Memulai" },
  { n: "Al-Muid", a: "المعيد", v: 124, m: "Maha Mengembalikan" },
  { n: "Al-Muhyi", a: "المحيي", v: 68, m: "Maha Menghidupkan" },
  { n: "Al-Mumit", a: "المميت", v: 490, m: "Maha Mematikan" },
  { n: "Al-Hayy", a: "الحي", v: 18, m: "Maha Hidup" },
  { n: "Al-Qayyum", a: "القيوم", v: 156, m: "Maha Mandiri" },
  { n: "Al-Wajid", a: "الواجد", v: 14, m: "Maha Menemukan" },
  { n: "Al-Majid", a: "الماجد", v: 48, m: "Maha Mulia" },
  { n: "Al-Wahid", a: "الواحد", v: 19, m: "Maha Tunggal" },
  { n: "Al-Ahad", a: "الأحد", v: 13, m: "Maha Esa" },
  { n: "As-Samad", a: "الصمد", v: 134, m: "Maha Dibutuhkan" },
  { n: "Al-Qadir", a: "القادر", v: 305, m: "Maha Menentukan" },
  { n: "Al-Muqtadir", a: "المقتدر", v: 744, m: "Maha Berkuasa" },
  { n: "Al-Muqaddim", a: "المقدم", v: 184, m: "Maha Mendahulukan" },
  { n: "Al-Muakkhir", a: "المؤخر", v: 846, m: "Maha Mengakhirkan" },
  { n: "Al-Awwal", a: "الأول", v: 37, m: "Maha Awal" },
  { n: "Al-Akhir", a: "الآخر", v: 801, m: "Maha Akhir" },
  { n: "Az-Zahir", a: "الظاهر", v: 1106, m: "Maha Nyata" },
  { n: "Al-Batin", a: "الباطن", v: 62, m: "Maha Tersembunyi" },
  { n: "Al-Wali", a: "الوالي", v: 47, m: "Maha Memerintah" },
  { n: "Al-Mutaali", a: "المتعالي", v: 541, m: "Maha Tinggi" },
  { n: "Al-Barr", a: "البر", v: 202, m: "Maha Dermawan" },
  { n: "At-Tawwab", a: "التواب", v: 409, m: "Maha Penerima Tobat" },
  { n: "Al-Muntaqim", a: "المنتقm", v: 680, m: "Maha Pemberi Balasan" },
  { n: "Al-Afuww", a: "العفو", v: 156, m: "Maha Pemaaf" },
  { n: "Ar-Rauf", a: "الرؤوف", v: 286, m: "Maha Pengasuh" },
  { n: "Malikul-Mulk", a: "مالك الملك", v: 212, m: "Maha Penguasa Kerajaan" },
  { n: "Dzul-Jalali wal-Ikram", a: "ذو الجلال والإكرام", v: 1100, m: "Maha Pemilik Kebesaran dan Kemuliaan" },
  { n: "Al-Muqsit", a: "المقسط", v: 209, m: "Maha Pemberi Keadilan" },
  { n: "Al-Jami", a: "الجامع", v: 114, m: "Maha Mengumpulkan" },
  { n: "Al-Ghaniyy", a: "الغني", v: 1060, m: "Maha Kaya" },
  { n: "Al-Mughni", a: "المغني", v: 1100, m: "Maha Pemberi Kekayaan" },
  { n: "Al-Mani", a: "المانع", v: 161, m: "Maha Mencegah" },
  { n: "Ad-Dharr", a: "الضار", v: 1001, m: "Maha Penimpa Kemudaratan" },
  { n: "An-Nafi", a: "النافع", v: 201, m: "Maha Pemberi Manfaat" },
  { n: "An-Nur", a: "النور", v: 256, m: "Maha Menerangi" },
  { n: "Al-Hadi", a: "الهادي", v: 20, m: "Maha Pemberi Petunjuk" },
  { n: "Al-Badi", a: "البديع", v: 86, m: "Maha Pencipta Indah" },
  { n: "Al-Baqi", a: "الباقي", v: 113, m: "Maha Kekal" },
  { n: "Al-Warith", a: "الوارث", v: 707, m: "Maha Pewaris" },
  { n: "Ar-Rasyid", a: "الرشيد", v: 514, m: "Maha Pandai" },
  { n: "As-Sabur", a: "الصبور", v: 298, m: "Maha Sabar" }
];

export default function AbajadunCalculator() {
  const [currentInput, setCurrentInput] = useState<{h: string, v: number}[]>([]);
  const captureRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const total = useMemo(() => {
    return currentInput.reduce((sum, item) => sum + item.v, 0);
  }, [currentInput]);

  const combinations = useMemo(() => {
    if (total === 0) return [];
    const findCombos = (target: number, list: typeof ASMAUL_HUSNA) => {
      const res: (typeof ASMAUL_HUSNA)[] = [];
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
    return result.map(combo => [...combo].sort((a, b) => b.v - a.v)).slice(0, 3);
  }, [total]);

  const handleAddChar = (char: {h: string, v: number}) => {
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
      <div ref={captureRef} className="p-4 sm:p-6 bg-white">
        <div className="text-center mb-6">
          <h1 className="text-sm font-bold uppercase tracking-widest text-slate-400">Kalkulator Abajadun</h1>
          <div className="h-px w-12 bg-emerald-500 mx-auto mt-2" />
        </div>

        <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 text-center mb-6 shadow-inner">
          <div className="text-2xl sm:text-3xl min-h-[40px] mb-2 font-arabic flex justify-center gap-1 flex-wrap text-emerald-400" dir="rtl">
            {currentInput.length > 0 ? currentInput.map((item, idx) => <span key={idx}>{item.h}</span>) : <span>...</span>}
          </div>
          <div className="text-4xl sm:text-5xl font-bold text-white tabular-nums">{total}</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase border-b pb-2">
            <Info size={12} className="text-emerald-500" /> Kombinasi Asmaul Husna
          </div>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {combinations.length > 0 ? (
                combinations.map((combo, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#f8fafc] border-l-4 border-emerald-500 p-3 sm:p-4 rounded-r-2xl shadow-sm">
                    <div className="space-y-4">
                      {combo.map((item, i) => (
                        <div key={i} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <span className="text-base sm:text-lg font-bold text-slate-800">{item.n}</span>
                              <span className="text-base sm:text-lg font-arabic text-emerald-600">{item.a}</span>
                            </div>
                            <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg font-mono font-bold text-xs sm:text-sm">{item.v}</span>
                          </div>
                          <p className="text-[10px] sm:text-xs italic text-slate-400 mt-1">{item.m}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-2 border-t border-dashed border-slate-200 text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      HISAB: {combo.map(x => x.v).join(' + ')} = {total}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-300 italic text-sm">
                  {total === 0 ? "Masukkan huruf untuk melihat kombinasi..." : "Tidak ada kombinasi tepat."}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 bg-slate-50 border-t">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-6" dir="rtl">
          {ABAJADUN_DATA.map((item, idx) => (
            <button key={idx} onClick={() => handleAddChar(item)} className="bg-white border border-slate-200 p-2 sm:p-3 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all shadow-sm active:scale-95">
              <span className="text-xl sm:text-2xl font-bold text-slate-800">{item.h}</span>
              <span className="block text-[9px] sm:text-[10px] text-slate-400 font-mono">{item.v}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={handleDeleteLast} className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm transition-colors active:scale-95">Hapus</button>
          <button onClick={handleClearAll} className="bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl font-bold text-sm transition-colors active:scale-95">Reset</button>
          <button onClick={saveAsImage} className="col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-sm transition-colors active:scale-95 shadow-lg shadow-emerald-600/20">
            {isSaving ? 'Memproses...' : 'Simpan Hasil (Gambar)'}
          </button>
        </div>
      </div>
    </div>
  );
}
