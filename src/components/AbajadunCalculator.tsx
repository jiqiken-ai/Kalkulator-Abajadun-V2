import { useState, useEffect } from 'react';
import { Calculator, History, Trash2, Info, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ABAJADUN_MAP: Record<string, number> = {
  'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, 'ء': 1,
  'ب': 2,
  'ج': 3,
  'د': 4,
  'ه': 5, 'ة': 5,
  'و': 6,
  'ز': 7,
  'ح': 8,
  'ط': 9,
  'ي': 10, 'ى': 10,
  'ك': 20,
  'ل': 30,
  'م': 40,
  'ن': 50,
  'س': 60,
  'ع': 70,
  'ف': 80,
  'ص': 90,
  'ق': 100,
  'ر': 200,
  'ش': 300,
  'ت': 400,
  'ث': 500,
  'خ': 600,
  'ذ': 700,
  'ض': 800,
  'ظ': 900,
  'غ': 1000
};

const ASMAUL_HUSNA = [
  { nama: "Ar-Rahman", arab: "الرحمن", nilai: 298, arti: "Maha Pengasih" },
  { nama: "Ar-Rahim", arab: "الرحيم", nilai: 258, arti: "Maha Penyayang" },
  { nama: "Al-Malik", arab: "الملك", nilai: 90, arti: "Maha Merajai" },
  { nama: "Al-Quddus", arab: "القدوس", nilai: 170, arti: "Maha Suci" },
  { nama: "As-Salam", arab: "السلام", nilai: 131, arti: "Maha Sejahtera" },
  { nama: "Al-Mu'min", arab: "المؤمن", nilai: 136, arti: "Maha Pemberi Keamanan" },
  { nama: "Al-Muhaimin", arab: "المهيمن", nilai: 145, arti: "Maha Memelihara" },
  { nama: "Al-Aziz", arab: "العزيز", nilai: 94, arti: "Maha Perkasa" },
  { nama: "Al-Jabbar", arab: "الجبار", nilai: 206, arti: "Maha Berkuasa" },
  { nama: "Al-Mutakabbir", arab: "المتكبر", nilai: 662, arti: "Maha Memiliki Kebesaran" },
  { nama: "Al-Khaliq", arab: "الخالق", nilai: 731, arti: "Maha Pencipta" },
  { nama: "Al-Bari", arab: "البارئ", nilai: 213, arti: "Maha Melepaskan" },
  { nama: "Al-Mushawwir", arab: "المصور", nilai: 336, arti: "Maha Membentuk Rupa" },
  { nama: "Al-Ghaffar", arab: "الغفار", nilai: 1281, arti: "Maha Pengampun" },
  { nama: "Al-Qahhar", arab: "القهار", nilai: 306, arti: "Maha Menundukkan" },
  { nama: "Al-Wahhab", arab: "الوهاب", nilai: 14, arti: "Maha Pemberi Karunia" },
  { nama: "Ar-Razzaq", arab: "الرزاق", nilai: 308, arti: "Maha Pemberi Rezeki" },
  { nama: "Al-Fattah", arab: "الفتاح", nilai: 489, arti: "Maha Pembuka Rahmat" },
  { nama: "Al-Alim", arab: "العليم", nilai: 150, arti: "Maha Mengetahui" },
  { nama: "Al-Qabidh", arab: "القابض", nilai: 903, arti: "Maha Menyempitkan" },
  { nama: "Al-Basit", arab: "الباسط", nilai: 72, arti: "Maha Melapangkan" },
  { nama: "Al-Khafidh", arab: "الخافض", nilai: 1481, arti: "Maha Merendahkan" },
  { nama: "Ar-Rafi", arab: "الرافع", nilai: 351, arti: "Maha Meninggikan" },
  { nama: "Al-Muizz", arab: "المعز", nilai: 117, arti: "Maha Memuliakan" },
  { nama: "Al-Mudhill", arab: "المذل", nilai: 770, arti: "Maha Menghinakan" },
  { nama: "As-Sami", arab: "السميع", nilai: 180, arti: "Maha Mendengar" },
  { nama: "Al-Bashir", arab: "البصير", nilai: 302, arti: "Maha Melihat" },
  { nama: "Al-Hakam", arab: "الحكم", nilai: 68, arti: "Maha Menetapkan" },
  { nama: "Al-Adl", arab: "العدل", nilai: 104, arti: "Maha Adil" },
  { nama: "Al-Latif", arab: "اللطيف", nilai: 129, arti: "Maha Lembut" },
  { nama: "Al-Khabir", arab: "الخبير", nilai: 812, arti: "Maha Mengenal" },
  { nama: "Al-Halim", arab: "الحليم", nilai: 88, arti: "Maha Penyantun" },
  { nama: "Al-Azim", arab: "العظيم", nilai: 1020, arti: "Maha Agung" },
  { nama: "Al-Ghafur", arab: "الغفور", nilai: 1286, arti: "Maha Pengampun" },
  { nama: "Asy-Syakur", arab: "الشكور", nilai: 526, arti: "Maha Menghargai" },
  { nama: "Al-Aliy", arab: "العلي", nilai: 110, arti: "Maha Tinggi" },
  { nama: "Al-Kabir", arab: "الكبير", nilai: 232, arti: "Maha Besar" },
  { nama: "Al-Hafiz", arab: "الحفيظ", nilai: 998, arti: "Maha Memelihara" },
  { nama: "Al-Muqit", arab: "المقيت", nilai: 550, arti: "Maha Pemberi Kecukupan" },
  { nama: "Al-Hasib", arab: "الحسيب", nilai: 80, arti: "Maha Membuat Perhitungan" },
  { nama: "Al-Jalil", arab: "الجليل", nilai: 73, arti: "Maha Luhur" },
  { nama: "Al-Karim", arab: "الكريم", nilai: 270, arti: "Maha Pemurah" },
  { nama: "Ar-Raqib", arab: "الرقيب", nilai: 312, arti: "Maha Mengawasi" },
  { nama: "Al-Mujib", arab: "المجيب", nilai: 55, arti: "Maha Mengabulkan" },
  { nama: "Al-Wasi", arab: "الواسع", nilai: 137, arti: "Maha Luas" },
  { nama: "Al-Hakim", arab: "الحكيم", nilai: 78, arti: "Maha Bijaksana" },
  { nama: "Al-Wadud", arab: "الودود", nilai: 20, arti: "Maha Mengasihi" },
  { nama: "Al-Majid", arab: "المجيد", nilai: 57, arti: "Maha Mulia" },
  { nama: "Al-Baith", arab: "الباعث", nilai: 573, arti: "Maha Membangkitkan" },
  { nama: "Asy-Syahid", arab: "الشهيد", nilai: 319, arti: "Maha Menyaksikan" },
  { nama: "Al-Haqq", arab: "الحق", nilai: 108, arti: "Maha Benar" },
  { nama: "Al-Wakil", arab: "الوكيل", nilai: 66, arti: "Maha Memelihara" },
  { nama: "Al-Qawiyy", arab: "القوي", nilai: 116, arti: "Maha Kuat" },
  { nama: "Al-Matin", arab: "المتين", nilai: 500, arti: "Maha Kokoh" },
  { nama: "Al-Waliyy", arab: "الولي", nilai: 46, arti: "Maha Melindungi" },
  { nama: "Al-Hamid", arab: "الحميد", nilai: 62, arti: "Maha Terpuji" },
  { nama: "Al-Muhsi", arab: "المحصي", nilai: 148, arti: "Maha Mengalkulasi" },
  { nama: "Al-Mubdi", arab: "المبدئ", nilai: 56, arti: "Maha Memulai" },
  { nama: "Al-Muid", arab: "المعيد", nilai: 124, arti: "Maha Mengembalikan" },
  { nama: "Al-Muhyi", arab: "المحيي", nilai: 68, arti: "Maha Menghidupkan" },
  { nama: "Al-Mumit", arab: "المميت", nilai: 490, arti: "Maha Mematikan" },
  { nama: "Al-Hayy", arab: "الحي", nilai: 18, arti: "Maha Hidup" },
  { nama: "Al-Qayyum", arab: "القيوم", nilai: 156, arti: "Maha Mandiri" },
  { nama: "Al-Wajid", arab: "الواجد", nilai: 14, arti: "Maha Menemukan" },
  { nama: "Al-Majid", arab: "الماجد", nilai: 48, arti: "Maha Mulia" },
  { nama: "Al-Wahid", arab: "الواحد", nilai: 19, arti: "Maha Tunggal" },
  { nama: "Al-Ahad", arab: "الأحد", nilai: 13, arti: "Maha Esa" },
  { nama: "As-Samad", arab: "الصمد", nilai: 134, arti: "Maha Dibutuhkan" },
  { nama: "Al-Qadir", arab: "القادر", nilai: 305, arti: "Maha Menentukan" },
  { nama: "Al-Muqtadir", arab: "المقتدر", nilai: 744, arti: "Maha Berkuasa" },
  { nama: "Al-Muqaddim", arab: "المقدم", nilai: 184, arti: "Maha Mendahulukan" },
  { nama: "Al-Muakkhir", arab: "المؤخر", nilai: 846, arti: "Maha Mengakhirkan" },
  { nama: "Al-Awwal", arab: "الأول", nilai: 37, arti: "Maha Awal" },
  { nama: "Al-Akhir", arab: "الآخر", nilai: 801, arti: "Maha Akhir" },
  { nama: "Az-Zahir", arab: "الظاهر", nilai: 1106, arti: "Maha Nyata" },
  { nama: "Al-Batin", arab: "الباطن", nilai: 62, arti: "Maha Tersembunyi" },
  { nama: "Al-Wali", arab: "الوالي", nilai: 47, arti: "Maha Memerintah" },
  { nama: "Al-Mutaali", arab: "المتعالي", nilai: 541, arti: "Maha Tinggi" },
  { nama: "Al-Barr", arab: "البر", nilai: 202, arti: "Maha Dermawan" },
  { nama: "At-Tawwab", arab: "التواب", nilai: 409, arti: "Maha Penerima Tobat" },
  { nama: "Al-Muntaqim", arab: "المنتقم", nilai: 630, arti: "Maha Pemberi Balasan" },
  { nama: "Al-Afuww", arab: "العفو", nilai: 156, arti: "Maha Pemaaf" },
  { nama: "Ar-Rauf", arab: "الرؤوف", nilai: 286, arti: "Maha Pengasuh" },
  { nama: "Malikul-Mulk", arab: "مالك الملك", nilai: 212, arti: "Maha Penguasa Kerajaan" },
  { nama: "Dzul-Jalali wal-Ikram", arab: "ذو الجلال والإكرام", nilai: 1100, arti: "Maha Pemilik Kebesaran dan Kemuliaan" },
  { nama: "Al-Muqsit", arab: "المقسط", nilai: 209, arti: "Maha Pemberi Keadilan" },
  { nama: "Al-Jami", arab: "الجامع", nilai: 114, arti: "Maha Mengumpulkan" },
  { nama: "Al-Ghaniyy", arab: "الغني", nilai: 1060, arti: "Maha Kaya" },
  { nama: "Al-Mughni", arab: "المغني", nilai: 1100, arti: "Maha Pemberi Kekayaan" },
  { nama: "Al-Mani", arab: "المانع", nilai: 161, arti: "Maha Mencegah" },
  { nama: "Ad-Dharr", arab: "الضار", nilai: 1001, arti: "Maha Penimpa Kemudaratan" },
  { nama: "An-Nafi", arab: "النافع", nilai: 201, arti: "Maha Pemberi Manfaat" },
  { nama: "An-Nur", arab: "النور", nilai: 256, arti: "Maha Menerangi" },
  { nama: "Al-Hadi", arab: "الهادي", nilai: 20, arti: "Maha Pemberi Petunjuk" },
  { nama: "Al-Badi", arab: "البديع", nilai: 86, arti: "Maha Pencipta Indah" },
  { nama: "Al-Baqi", arab: "الباقي", nilai: 113, arti: "Maha Kekal" },
  { nama: "Al-Warith", arab: "الوارث", nilai: 707, arti: "Maha Pewaris" },
  { nama: "Ar-Rasyid", arab: "الرشيد", nilai: 514, arti: "Maha Pandai" },
  { nama: "As-Sabur", arab: "الصبور", nilai: 298, arti: "Maha Sabar" }
];

export default function AbajadunCalculator() {
  const [inputText, setInputText] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const [history, setHistory] = useState<{ text: string; value: number }[]>([]);
  const [matchingNames, setMatchingNames] = useState<typeof ASMAUL_HUSNA>([]);

  useEffect(() => {
    let total = 0;
    for (const char of inputText) {
      if (ABAJADUN_MAP[char]) {
        total += ABAJADUN_MAP[char];
      }
    }
    setTotalValue(total);

    if (total > 0) {
      const matches = ASMAUL_HUSNA.filter(name => name.nilai === total);
      setMatchingNames(matches);
    } else {
      setMatchingNames([]);
    }
  }, [inputText]);

  const addToHistory = () => {
    if (inputText && totalValue > 0) {
      setHistory([{ text: inputText, value: totalValue }, ...history.slice(0, 4)]);
    }
  };

  const clearAll = () => {
    setInputText('');
    setHistory([]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <Sparkles className="text-emerald-500" />
          Hisab Abajadun
        </h2>
        <p className="text-slate-400 text-xs mt-1">Kalkulator Nilai Huruf Hijaiyah</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end px-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Input Teks Arab</label>
          <button onClick={clearAll} className="text-slate-300 hover:text-red-400 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
        <textarea
          dir="rtl"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="أبجد هوز..."
          className="w-full h-32 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-3xl font-arabic focus:border-emerald-500 focus:outline-none transition-all resize-none text-slate-700"
        />
      </div>

      <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-200 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest mb-1">Total Nilai Hisab</div>
          <div className="text-5xl font-bold tabular-nums">{totalValue}</div>
        </div>
        <Calculator className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 rotate-12" />
      </div>

      <AnimatePresence>
        {matchingNames.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-3"
          >
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Asmaul Husna Terkait</div>
            <div className="grid gap-2">
              {matchingNames.map((name, idx) => (
                <div key={idx} className="bg-white border border-emerald-100 p-3 rounded-xl flex items-center justify-between group hover:border-emerald-300 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-700">{name.nama}</div>
                      <div className="text-[10px] text-slate-400">{name.arti}</div>
                    </div>
                  </div>
                  <div className="text-xl font-arabic text-emerald-600">{name.arab}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {history.length > 0 && (
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Riwayat Terakhir</div>
          <div className="space-y-2">
            {history.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-lg font-arabic text-slate-600 truncate max-w-[150px]" dir="rtl">{item.text}</div>
                <div className="flex items-center gap-2">
                  <div className="h-px w-8 bg-slate-200" />
                  <div className="font-bold text-emerald-600">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-2xl flex gap-3">
        <Info className="text-blue-400 shrink-0" size={18} />
        <p className="text-[10px] text-blue-700 leading-relaxed">
          Nilai dihitung berdasarkan sistem <b>Abajadun Maghribi/Masyriqi</b> standar. 
          Masukkan teks dalam huruf Hijaiyah murni untuk hasil yang akurat.
        </p>
      </div>
    </div>
  );
}
