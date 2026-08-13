"use client";

import Image from "../src/image";
import { useMemo, useState } from "react";

type Project = {
  id: number;
  image: string;
  country: string;
  city: string;
  status: "精選" | "新案" | "即將完售";
  zh: string;
  en: string;
  rooms: string;
  area: string;
  price: string;
  delivery: string;
};

const projects: Project[] = [
  { id: 1, image: "/images/hero.jpg", country: "美國", city: "紐約", status: "精選", zh: "曼哈頓天際奢邸", en: "MANHATTAN SKYLINE RESIDENCES", rooms: "1–3 房", area: "18–42 坪", price: "USD 1.25M 起", delivery: "現房" },
  { id: 2, image: "/images/project-1.jpg", country: "美國", city: "波士頓", status: "新案", zh: "查爾斯河畔名邸", en: "CHARLES RIVER COLLECTION", rooms: "1–3 房", area: "16–36 坪", price: "USD 850K 起", delivery: "2027 Q2" },
  { id: 3, image: "/images/project-2.jpg", country: "英國", city: "倫敦", status: "精選", zh: "西敏河岸御邸", en: "WESTMINSTER RIVERSIDE", rooms: "Studio–3 房", area: "12–31 坪", price: "GBP 680K 起", delivery: "2026 Q4" },
  { id: 4, image: "/images/project-3.jpg", country: "澳洲", city: "墨爾本", status: "新案", zh: "雅拉河城市寓所", en: "YARRA CITY RESIDENCES", rooms: "1–3 房", area: "14–33 坪", price: "AUD 720K 起", delivery: "2028 Q1" },
  { id: 5, image: "/images/project-4.jpg", country: "美國", city: "加州", status: "即將完售", zh: "灣區森活美學居", en: "BAY AREA GARDEN HOMES", rooms: "2–4 房", area: "28–58 坪", price: "USD 1.08M 起", delivery: "2026 Q3" },
  { id: 6, image: "/images/project-5.jpg", country: "美國", city: "亞利桑那", status: "精選", zh: "鳳凰城沙漠藝境", en: "SONORAN DESERT LIVING", rooms: "2–4 房", area: "32–66 坪", price: "USD 590K 起", delivery: "現房" },
];

export function VueSite() {
  const [country, setCountry] = useState("全部地區");
  const [status, setStatus] = useState("全部狀態");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(() => projects.filter((project) => {
    const countryMatch = country === "全部地區" || project.country === country;
    const statusMatch = status === "全部狀態" || project.status === status;
    const haystack = `${project.zh} ${project.en} ${project.city}`.toLowerCase();
    return countryMatch && statusMatch && haystack.includes(query.toLowerCase().trim());
  }), [country, status, query]);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="VUE 臻域國際不動產｜回到首頁"><Image src="/images/vue-logo-official.png" alt="VUE 臻域國際不動產" width={260} height={107} priority /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="開啟選單">{menuOpen ? "關閉" : "選單"}</button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="主要導覽">
          <a href="#about" onClick={() => setMenuOpen(false)}>關於 VUE</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>建案推薦</a>
          <a href="#service" onClick={() => setMenuOpen(false)}>專業服務</a>
          <a className="nav-cta" href="https://tally.so/r/aQrWzq" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>預約諮詢</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <Image src="/images/hero.jpg" alt="紐約曼哈頓天際線" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">VUE · INTERNATIONAL REAL ESTATE</p>
          <h1>極致眼光<br />專業護航</h1>
          <p className="hero-copy">專注留學生家庭與國際家庭的全球置產規劃<br />從精準選址到長期守護，定義海外資產的新標準。</p>
          <a className="hero-link" href="https://tally.so/r/aQrWzq" target="_blank" rel="noreferrer">預約諮詢 / 報名線上講座 <span aria-hidden="true">↗</span></a>
        </div>
        <p className="hero-location">NEW YORK · USA</p>
      </section>

      <section className="intro section" id="about">
        <div><p className="section-index">01 — ABOUT VUE</p><h2>遠見所至，<br />皆為臻域。</h2></div>
        <div className="intro-copy"><p>在瞬息萬變的全球市場中，我們致力於為台灣客戶提供「一站式全球置產」的極致專業服務。</p><p>以全球視野洞察市場，以精品標準執行每個細節，讓跨境置產成為清晰、安心且值得信賴的旅程。</p></div>
      </section>

      <section className="values section" id="service">
        {[
          ["V", "VISION", "遠見", "以前瞻視野與深度分析，鎖定具保值與增值潛力的資產空間。"],
          ["U", "ULTIMATE", "極致", "從精準選址到後續服務，以精品產業對完美的標準守護每處細節。"],
          ["E", "EXPERTISE", "專業", "以跨國協調與風險控管實力，為每一份全球投資穩健護航。"],
        ].map(([letter, en, zh, copy]) => <article className="value" key={letter}><span>{letter}</span><p>{en}</p><h3>{zh}</h3><div className="rule" /><small>{copy}</small></article>)}
      </section>

      <section className="projects section" id="projects">
        <div className="projects-heading"><div><p className="section-index">02 — SELECTED PROJECTS</p><h2>全球嚴選建案</h2></div><p>以專業評估與長期眼光，為您精選世界關鍵城市中值得關注的居所與資產。</p></div>
        <div className="filters" aria-label="建案篩選">
          <label><span>地區</span><select value={country} onChange={(e) => setCountry(e.target.value)}><option>全部地區</option><option>美國</option><option>英國</option><option>澳洲</option></select></label>
          <label><span>狀態</span><select value={status} onChange={(e) => setStatus(e.target.value)}><option>全部狀態</option><option>精選</option><option>新案</option><option>即將完售</option></select></label>
          <label className="search"><span>搜尋</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="建案名稱或城市" /></label>
          <p>{String(filtered.length).padStart(2, "0")} PROJECTS</p>
        </div>
        <div className="project-grid">
          {filtered.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-image"><Image src={project.image} alt={`${project.city}${project.zh}`} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" /><span>{project.status}</span><p>{project.country} · {project.city}</p></div>
              <div className="project-body"><small>{project.en}</small><h3>{project.zh}</h3><dl><div><dt>房型</dt><dd>{project.rooms}</dd></div><div><dt>室內坪數</dt><dd>{project.area}</dd></div><div><dt>售價</dt><dd>{project.price}</dd></div><div><dt>交屋</dt><dd>{project.delivery}</dd></div></dl></div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <div className="empty"><p>目前沒有符合條件的建案</p><button onClick={() => { setCountry("全部地區"); setStatus("全部狀態"); setQuery(""); }}>清除篩選</button></div>}
      </section>

      <section className="global section"><p className="section-index">03 — GLOBAL NETWORK</p><div className="global-copy"><h2>美國深耕，<br />全球佈局。</h2><div><p>NEW YORK · BOSTON · CALIFORNIA · ARIZONA</p></div></div></section>

      <section className="contact" id="contact"><p>START YOUR GLOBAL JOURNEY</p><h2>讓世界，成為您的資產版圖。</h2><div className="contact-actions"><a href="https://tally.so/r/aQrWzq" target="_blank" rel="noreferrer">預約專業諮詢 <span>↗</span></a><a href="https://tally.so/r/aQrWzq" target="_blank" rel="noreferrer">報名線上講座 <span>↗</span></a></div></section>

      <footer>
        <div className="footer-main">
          <div className="footer-left"><div className="footer-brand"><Image src="/images/vue-logo-official.png" alt="VUE 臻域國際不動產" width={300} height={124} /></div><div className="company-info"><h3>聯絡資訊</h3><div className="company-lines"><p>統一編號：60307872</p><p><a href="mailto:info@vue.com.tw">info@vue.com.tw</a></p><p>臺北市信義區忠孝東路4段563號11樓</p></div></div></div>
          <div className="social-area"><h3>FOLLOW VUE</h3><div className="socials"><a className="instagram" href="https://www.instagram.com/vue.com.tw" target="_blank" rel="noreferrer" aria-label="Instagram"><Image src="/icons/instagram.svg" alt="" width={56} height={56} /></a><a href="https://www.facebook.com/vue.com.tw" target="_blank" rel="noreferrer" aria-label="Facebook"><Image src="/icons/facebook.svg" alt="" width={56} height={56} /></a><a href="https://page.line.me/vue.com.tw?openQrModal=true" target="_blank" rel="noreferrer" aria-label="LINE"><Image src="/icons/line.svg" alt="" width={56} height={56} /></a></div></div>
        </div>
        <div className="footer-bottom"><div className="legal-links"><a href="#/legal/privacy-policy">隱私權與免責聲明</a><span>|</span><a href="#/legal/terms-of-service">服務條款</a><span>|</span><a href="#/legal/real-estate-brokerage-license">不動產經紀業許可</a></div><p>© 2026 VUE 臻域國際不動產有限公司</p><p>VUE INTERNATIONAL REAL ESTATE</p></div>
      </footer>
    </main>
  );
}
