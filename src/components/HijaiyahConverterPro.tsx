import { useState, useEffect } from 'react';
import { Search, Copy, Sparkles, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DATABASE_ARAB: Record<string, string> = {
  "ahmad": "أحمد", "muhammad": "محمد", "abdullah": "عبد الله", "abdurrahman": "عبد الرحمن",
  "aziz": "عزيز", "malik": "مالك", "karim": "كريم", "ali": "علي", "umar": "عمر",
  "utsman": "عثمان", "hasan": "حسن", "husain": "حسين", "hamzah": "حمزة", "syam": "شم",
  "zainal": "زين ال", "zainuddin": "زين الدين", "fadli": "فضلي", "fadhil": "فاضل",
  "fauzi": "فوزي", "farhan": "فرحان", "faris": "فارس", "rizki": "رزقي", "rizqi": "رزقي",
  "hakim": "حكيم", "hadi": "هادي", "hidayat": "هداية", "ihsan": "احسان", "iqbal": "اقبال",
  "ilham": "الهام", "lutfi": "لطفي", "luthfi": "لطفي", "maulana": "مولانا", "munir": "منير",
  "syafiq": "شفيق", "syahrul": "شحرول", "syamsul": "شمس ال", "salman": "سلمان",
  "alfarisi": "الفارسي", "taufik": "توفيق", "taufiq": "توفيق", "taufiqurrahman": "توفيق الرحمن",
  "wahid": "واحد", "wahyu": "واحي", "yasin": "يasin", "yusuf": "يوسف", "yunus": "يونس",
  "zakaria": "زكريا", "zaki": "زكي", "zulfikar": "ذو الفقار", "zulfahmi": "ذو الفهمي",
  "naufal": "نوفل", "nabil": "نبيل", "akbar": "أكبر", "azhar": "أزهر", "aisyah": "عائشة",
  "annisa": "أنيسة", "anisa": "أنيسة", "nur": "نور", "zahra": "زهرة", "fatimah": "فاطمة",
  "khadijah": "خديجة", "maryam": "مريم", "safira": "سفيرة", "salma": "سلمى",
  "salsabila": "سلسبيل", "syifa": "شفاء", "aulia": "أولياء", "najwa": "نجوى",
  "nabila": "نبيلة", "nadia": "نادية", "rahma": "رحمة", "rahmawati": "رحمة واتي",
  "laila": "ليلى", "layla": "ليلى", "amira": "أميرة", "zahira": "زاهرة",
  "hafsah": "حfصة", "rania": "رانية", "yasmin": "ياسمين", "hanifa": "حنيفة",
  "ainun": "عينون", "qonita": "قانتة", "syakira": "شاكرة"
};

const MAP_KONSONAN: Record<string, string> = {
  'b': 'ب', 'c': 'ج', 'd': 'د', 'f': 'ف', 'g': 'غ', 'h': 'ه', 'j': 'ج',
  'k': 'ك', 'l': 'ل', 'm': 'م', 'n': 'ن', 'p': 'ف', 'q': 'ق', 'r': 'ر',
  's': 'س', 't': 'ت', 'v': 'ف', 'w': 'و', 'x': 'كس', 'y': 'ي', 'z': 'ز'
};

export default function HijaiyahConverterPro() {
  const [inputNama, setInputNama] = useState('');
  const [autoResult, setAutoResult] = useState('');
  const [internetQuery, setInternetQuery] = useState('');
  const [liveResult, setLiveResult] = useState<{ text: string; suggestions: string[]; loading: boolean }>({
    text: '', suggestions: [], loading: false
  });

  const rumusIndo = (word: string) => {
    let res = "";
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      let next = word[i + 1];
      if (char === 'i') { res += "ي"; if (next === 'y' || next === 'a') i++; continue; }
      if (char === 'o') { res += (i === word.length - 1) ? "ا" : "و"; continue; }
      if (char === 'a') res += "ا";
      else if (char === 'u') res += "و";
      else if (char === 'e') res += (i === 0) ? "اي" : "ي";
      else if (MAP_KONSONAN[char]) {
        if (char === 's' && next === 'y') { res += "ش"; i++; }
        else if (char === 'n' && next === 'g') { res += "نغ"; i++; }
        else if (char === 'n' && next === 'y') { res += "ني"; i++; }
        else res += MAP_KONSONAN[char];
      }
    }
    return res;
  };

  useEffect(() => {
    if (!inputNama.trim()) { setAutoResult(''); return; }
    const kataArr = inputNama.toLowerCase().trim().split(/\s+/);
    const hasil = kataArr.map(word => DATABASE_ARAB[word] ? DATABASE_ARAB[word] : rumusIndo(word));
    setAutoResult(hasil.join(" "));
  }, [inputNama]);

  const cariTransliterasi = async () => {
    if (!internetQuery.trim()) return;
    setLiveResult(prev => ({ ...prev, loading: true, text: 'Mencari...', suggestions: [] }));
    try {
      const response = await fetch(`https://inputtools.google.com/request?text=${encodeURIComponent(internetQuery)}&itc=ar-t-i0-und&num=5&cp=0&cs=1&ie=utf-8&oe=utf-8&app=test`);
      const data = await response.json();
      if (data[0] === "SUCCESS") {
        const results = data[1][0][1];
        setLiveResult({ loading: false, text: results[0], suggestions: results.slice(1) });
      } else {
        setLiveResult({ loading: false, text: 'Tidak ditemukan.', suggestions: [] });
      }
    } catch (error) {
      setLiveResult({ loading: false, text: 'Error koneksi.', suggestions: [] });
    }
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert("Penulisan disalin!");
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-emerald-900 flex items-center justify-center gap-2">
          <Sparkles className="text-emerald-500" /> Konverter Hijaiyah Pro
        </h2>
        <div className="h-1 w-16 bg-emerald-500 mx-auto mt-2 rounded-full" />
      </div>

      <div className="space-y-4">
        <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
          Konversi Otomatis (Rumus & Database):
        </label>
        <input
          type="text"
          value={inputNama}
          onChange={(e) => setInputNama(e.target.value)}
          placeholder="Ketik nama (Contoh: Syam)"
          className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-600 focus:outline-none transition-all text-base sm:text-lg"
        />
        <AnimatePresence>
          {autoResult && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50 border-2 border-emerald-600 p-4 sm:p-6 rounded-2xl text-center shadow-sm">
              <div className="text-3xl sm:text-5xl font-arabic text-emerald-900 mb-4 leading-relaxed" dir="rtl">{autoResult}</div>
              <button onClick={() => copyToClipboard(autoResult)} className="flex items-center gap-2 mx-auto px-4 py-2 bg-white border border-emerald-200 rounded-lg text-[10px] sm:text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors">
                <Copy size={14} /> SALIN HASIL
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-blue-50 p-4 sm:p-6 rounded-2xl border border-blue-200 shadow-sm space-y-4">
        <label className="block text-xs sm:text-sm font-bold text-blue-900 uppercase tracking-wider">
          Cari Penulisan Hijaiyah (Live Search):
        </label>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={internetQuery}
            onChange={(e) => setInternetQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && cariTransliterasi()}
            placeholder="Cari ejaan hijaiyah..."
            className="w-full p-3 sm:p-4 border-2 border-blue-100 rounded-xl focus:border-blue-600 focus:outline-none transition-all text-sm sm:text-base"
          />
          <button onClick={cariTransliterasi} className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 sm:py-4 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
            <Search size={18} /> CARI
          </button>
        </div>
        <AnimatePresence>
          {(liveResult.text || liveResult.loading) && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 sm:p-6 rounded-xl border border-blue-200 text-center shadow-sm">
              <div className="text-[10px] sm:text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Hasil Penulisan:</div>
              <div className="text-2xl sm:text-4xl font-arabic text-blue-900 my-4 leading-relaxed" dir="rtl">{liveResult.text}</div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {liveResult.suggestions.map((s, i) => (
                  <button key={i} onClick={() => setLiveResult(prev => ({ ...prev, text: s }))} className="px-3 py-1 bg-slate-100 hover:bg-blue-100 rounded-full text-[10px] sm:text-xs text-slate-600 border border-slate-200">{s}</button>
                ))}
              </div>
              <button onClick={() => copyToClipboard(liveResult.text)} className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 text-[10px] sm:text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
                <Copy size={14} /> SALIN PENULISAN
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-amber-50 p-4 sm:p-5 rounded-2xl border-l-4 border-amber-400 text-[10px] sm:text-[11px] text-slate-600 leading-relaxed shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-amber-800 font-bold uppercase tracking-wider">
          <Info size={14} /> KETENTUAN DATABASE & RUMUS:
        </div>
        <ul className="space-y-1">
          <li>• <b>Syam:</b> Menggunakan huruf Syin (ش) ➔ <b>شم</b></li>
          <li>• <b>Retno:</b> Akhiran 'o' menjadi Alif (ا) ➔ <b>ريتنا</b></li>
          <li>• <b>Riyanti:</b> 'i' + 'y' ditulis satu 'Ya' (ي) ➔ <b>ريانti</b></li>
          <li>• <b>Nama Arab:</b> Sesuai Ejaan Baku (Zahrul, Salman, dll).</li>
        </ul>
      </div>
    </div>
  );
}
