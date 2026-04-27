import { useState } from "react";

const SERVICES = [
  { id: "clean", name: "تنظيف عميق", icon: "✨", price: 80, time: "يوم واحد", desc: "تنظيف شامل من الداخل والخارج" },
  { id: "paint", name: "إعادة تلوين", icon: "🎨", price: 150, time: "٢-٣ أيام", desc: "تلوين احترافي بألوان متعددة" },
  { id: "sole", name: "تغيير نعل", icon: "👟", price: 120, time: "يومين", desc: "استبدال النعل بالكامل" },
  { id: "restore", name: "ترميم كامل", icon: "🔧", price: 250, time: "٣-٥ أيام", desc: "إصلاح وتجديد شامل للحذاء" },
  { id: "laces", name: "تغيير رباط", icon: "🎀", price: 30, time: "نفس اليوم", desc: "ربطات جلد أو قماش بألوان" },
  { id: "polish", name: "تلميع وصيانة", icon: "💎", price: 60, time: "نفس اليوم", desc: "تلميع وحماية الجلد" },
];

const TIMES = ["10:00 ص", "11:00 ص", "12:00 م", "01:00 م", "03:00 م", "04:00 م", "05:00 م", "06:00 م"];

const STEPS = ["الخدمة", "الموعد", "بياناتك", "تأكيد"];

function generateRef() {
  return "SH-" + Math.random().toString(36).substr(2, 6).toUpperCase();
}

export default function App() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [shoeType, setShoeType] = useState("");
  const [done, setDone] = useState(false);
  const [ref] = useState(generateRef);
  const [err, setErr] = useState("");

  const toggleService = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const total = SERVICES.filter(s => selected.includes(s.id)).reduce((a, s) => a + s.price, 0);
  const today = new Date().toISOString().split("T")[0];

  function next() {
    setErr("");
    if (step === 0 && selected.length === 0) { setErr("اختار خدمة واحدة على الأقل"); return; }
    if (step === 1 && (!date || !time)) { setErr("اختار التاريخ والوقت"); return; }
    if (step === 2) {
      if (!name.trim()) { setErr("اكتب اسمك"); return; }
      if (!phone.trim() || phone.length < 10) { setErr("رقم التليفون غلط"); return; }
      if (!shoeType) { setErr("اختار نوع الحذاء"); return; }
    }
    setStep(s => s + 1);
  }

  function confirm() { setDone(true); }

  function formatDate(d) {
    if (!d) return "";
    const dt = new Date(d);
    return dt.toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }

  if (done) return (
    <div style={styles.page}>
      <BG />
      <div style={{ maxWidth: 500, margin: "0 auto", padding: "40px 16px", textAlign: "center" }}>
        <div style={styles.successCard}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
          <h2 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 900, color: "#fff" }}>تم الحجز بنجاح!</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", margin: "0 0 24px" }}>هنتواصل معاك لتأكيد الموعد</p>

          <div style={styles.refBox}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>رقم الحجز</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#f9ca24", letterSpacing: 3 }}>{ref}</div>
          </div>

          <div style={{ ...styles.infoCard, marginTop: 20, textAlign: "right" }}>
            {[
              ["👤 الاسم", name],
              ["📱 التليفون", phone],
              ["📅 الموعد", `${formatDate(date)} - ${time}`],
              ["👟 نوع الحذاء", shoeType],
              ["🛠️ الخدمات", SERVICES.filter(s => selected.includes(s.id)).map(s => s.name).join("، ")],
              ["💰 الإجمالي", `${total} جنيه`],
            ].map(([k, v]) => (
              <div key={k} style={styles.infoRow}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{k}</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{v}</span>
              </div>
            ))}
          </div>

          <button style={{ ...styles.btnPrimary, marginTop: 24, width: "100%" }} onClick={() => window.location.reload()}>
            حجز جديد
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <BG />
      <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>👟</div>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>ShoeFix</h1>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>تجديد أحذيتك زي الجديدة</p>
        </div>
      </div>

      {/* Progress */}
      <div style={styles.progress}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700,
              background: i < step ? "#f9ca24" : i === step ? "linear-gradient(135deg,#6c5ce7,#a29bfe)" : "rgba(255,255,255,0.1)",
              color: i <= step ? "#1a1a2e" : "rgba(255,255,255,0.4)",
              boxShadow: i === step ? "0 0 16px rgba(108,92,231,0.5)" : "none",
              transition: "all 0.3s",
            }}>
              {i < step ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: 12, color: i === step ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: i === step ? 700 : 400 }}>{s}</span>
            {i < STEPS.length - 1 && <div style={{ width: 20, height: 2, background: i < step ? "#f9ca24" : "rgba(255,255,255,0.1)", borderRadius: 2 }} />}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px 100px" }}>

        {/* STEP 0: Services */}
        {step === 0 && (
          <div>
            <h2 style={styles.stepTitle}>اختار الخدمة اللي محتاجها 🛠️</h2>
            <p style={styles.stepSub}>ممكن تختار أكتر من خدمة</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {SERVICES.map(s => {
                const active = selected.includes(s.id);
                return (
                  <div key={s.id} onClick={() => toggleService(s.id)} style={{
                    ...styles.serviceCard,
                    border: active ? "2px solid #6c5ce7" : "1px solid rgba(255,255,255,0.1)",
                    background: active ? "rgba(108,92,231,0.2)" : "rgba(255,255,255,0.05)",
                    boxShadow: active ? "0 0 20px rgba(108,92,231,0.3)" : "none",
                  }}>
                    {active && <div style={styles.checkBadge}>✓</div>}
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>{s.desc}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "#f9ca24", fontWeight: 800, fontSize: 16 }}>{s.price} جنيه</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>⏱ {s.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {selected.length > 0 && (
              <div style={styles.totalBar}>
                <span>الإجمالي: <b style={{ color: "#f9ca24" }}>{total} جنيه</b></span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{selected.length} خدمة</span>
              </div>
            )}
          </div>
        )}

        {/* STEP 1: Date & Time */}
        {step === 1 && (
          <div>
            <h2 style={styles.stepTitle}>امتى يناسبك؟ 📅</h2>
            <p style={styles.stepSub}>اختار التاريخ والوقت المناسب</p>

            <div style={styles.card}>
              <label style={styles.label}>التاريخ</label>
              <input type="date" min={today} value={date} onChange={e => setDate(e.target.value)}
                style={styles.input} />
            </div>

            {date && (
              <div style={styles.card}>
                <label style={styles.label}>الوقت المتاح</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 8 }}>
                  {TIMES.map(t => (
                    <button key={t} onClick={() => setTime(t)} style={{
                      padding: "10px 4px", borderRadius: 12, border: "1px solid",
                      borderColor: time === t ? "#6c5ce7" : "rgba(255,255,255,0.1)",
                      background: time === t ? "rgba(108,92,231,0.3)" : "rgba(255,255,255,0.05)",
                      color: "#fff", fontSize: 13, fontFamily: "inherit", cursor: "pointer",
                      fontWeight: time === t ? 700 : 400, transition: "all 0.2s",
                    }}>{t}</button>
                  ))}
                </div>
              </div>
            )}

            {date && time && (
              <div style={{ ...styles.infoCard, marginTop: 12, textAlign: "center" }}>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>موعدك</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#f9ca24", marginTop: 4 }}>{formatDate(date)}</div>
                <div style={{ fontSize: 16, color: "#a29bfe", marginTop: 2 }}>الساعة {time}</div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Info */}
        {step === 2 && (
          <div>
            <h2 style={styles.stepTitle}>بياناتك 👤</h2>
            <p style={styles.stepSub}>عشان نتواصل معاك</p>

            <div style={styles.card}>
              {[
                { label: "الاسم الكامل", val: name, set: setName, ph: "مثال: أحمد محمد", type: "text" },
                { label: "رقم التليفون", val: phone, set: setPhone, ph: "01xxxxxxxxx", type: "tel" },
              ].map(({ label, val, set, ph, type }) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <label style={styles.label}>{label}</label>
                  <input type={type} value={val} onChange={e => set(e.target.value)} placeholder={ph}
                    style={styles.input} />
                </div>
              ))}

              <label style={styles.label}>نوع الحذاء</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8, marginBottom: 16 }}>
                {["رياضي 👟", "جلد 👞", "كاجوال 🥿", "بوت 🥾", "صندل 👡"].map(t => (
                  <button key={t} onClick={() => setShoeType(t)} style={{
                    padding: "8px 14px", borderRadius: 12, border: "1px solid",
                    borderColor: shoeType === t ? "#f9ca24" : "rgba(255,255,255,0.1)",
                    background: shoeType === t ? "rgba(249,202,36,0.2)" : "rgba(255,255,255,0.05)",
                    color: "#fff", fontSize: 13, fontFamily: "inherit", cursor: "pointer",
                    fontWeight: shoeType === t ? 700 : 400, transition: "all 0.2s",
                  }}>{t}</button>
                ))}
              </div>

              <label style={styles.label}>ملاحظات (اختياري)</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="لو عندك أي تفاصيل خاصة بالحذاء..." rows={3}
                style={{ ...styles.input, resize: "none" }} />
            </div>
          </div>
        )}

        {/* STEP 3: Confirm */}
        {step === 3 && (
          <div>
            <h2 style={styles.stepTitle}>مراجعة الحجز 📋</h2>
            <p style={styles.stepSub}>اتأكد من بياناتك قبل التأكيد</p>

            <div style={styles.card}>
              <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 15, color: "#a29bfe" }}>🛠️ الخدمات المختارة</div>
              {SERVICES.filter(s => selected.includes(s.id)).map(s => (
                <div key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span>{s.icon} {s.name}</span>
                  <span style={{ color: "#f9ca24", fontWeight: 700 }}>{s.price} جنيه</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontWeight: 800, fontSize: 18 }}>
                <span>الإجمالي</span>
                <span style={{ color: "#f9ca24" }}>{total} جنيه</span>
              </div>
            </div>

            <div style={styles.card}>
              {[
                ["📅 الموعد", `${formatDate(date)} - ${time}`],
                ["👟 نوع الحذاء", shoeType],
                ["👤 الاسم", name],
                ["📱 التليفون", phone],
                notes && ["📝 ملاحظات", notes],
              ].filter(Boolean).map(([k, v]) => (
                <div key={k} style={styles.infoRow}>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {err && (
          <div style={{ background: "rgba(231,76,60,0.2)", border: "1px solid rgba(231,76,60,0.4)", borderRadius: 12, padding: "12px 16px", marginTop: 12, color: "#e74c3c", fontSize: 14, fontWeight: 600 }}>
            ⚠️ {err}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{ ...styles.btnGhost, flex: 1 }}>← رجوع</button>
          )}
          {step < 3 ? (
            <button onClick={next} style={{ ...styles.btnPrimary, flex: 2 }}>التالي ←</button>
          ) : (
            <button onClick={confirm} style={{ ...styles.btnSuccess, flex: 2 }}>✅ تأكيد الحجز</button>
          )}
        </div>
      </div>
    </div>
  );
}

function BG() {
  return (
    <>
      <div style={{ position: "fixed", top: -150, right: -150, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(108,92,231,0.15), transparent)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,202,36,0.08), transparent)", pointerEvents: "none" }} />
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
    fontFamily: "'Tajawal', sans-serif",
    direction: "rtl",
    color: "#fff",
  },
  header: {
    display: "flex", alignItems: "center", gap: 14,
    padding: "24px 20px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(10px)",
    maxWidth: 600, margin: "0 auto",
  },
  logo: {
    width: 48, height: 48, borderRadius: 14,
    background: "linear-gradient(135deg,#6c5ce7,#f9ca24)",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
  },
  progress: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 8, padding: "16px 20px 20px",
    flexWrap: "wrap",
  },
  stepTitle: { margin: "0 0 6px", fontSize: 22, fontWeight: 900 },
  stepSub: { margin: "0 0 20px", color: "rgba(255,255,255,0.5)", fontSize: 14 },
  serviceCard: {
    borderRadius: 18, padding: 16, cursor: "pointer",
    transition: "all 0.2s", position: "relative",
  },
  checkBadge: {
    position: "absolute", top: 10, left: 10,
    width: 22, height: 22, borderRadius: "50%",
    background: "#6c5ce7", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12, fontWeight: 700,
  },
  totalBar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    background: "rgba(108,92,231,0.15)", border: "1px solid rgba(108,92,231,0.3)",
    borderRadius: 14, padding: "14px 18px", marginTop: 16, fontSize: 16,
  },
  card: {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18, padding: 18, marginBottom: 14,
  },
  label: { fontSize: 13, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 8 },
  input: {
    width: "100%", boxSizing: "border-box",
    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12, padding: "12px 16px", color: "#fff", fontSize: 15,
    outline: "none", fontFamily: "inherit", direction: "rtl",
    colorScheme: "dark",
  },
  infoCard: {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16, padding: 16,
  },
  infoRow: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: 12,
  },
  btnPrimary: {
    background: "linear-gradient(135deg,#6c5ce7,#a29bfe)", color: "#fff",
    border: "none", borderRadius: 14, padding: "14px 24px",
    fontFamily: "inherit", fontSize: 16, fontWeight: 700, cursor: "pointer",
  },
  btnGhost: {
    background: "rgba(255,255,255,0.07)", color: "#fff",
    border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "14px 24px",
    fontFamily: "inherit", fontSize: 15, cursor: "pointer",
  },
  btnSuccess: {
    background: "linear-gradient(135deg,#00b894,#00cec9)", color: "#fff",
    border: "none", borderRadius: 14, padding: "14px 24px",
    fontFamily: "inherit", fontSize: 16, fontWeight: 700, cursor: "pointer",
  },
  successCard: {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 28, padding: 32,
  },
  refBox: {
    background: "rgba(249,202,36,0.1)", border: "1px solid rgba(249,202,36,0.3)",
    borderRadius: 16, padding: "16px 24px", textAlign: "center",
  },
};
