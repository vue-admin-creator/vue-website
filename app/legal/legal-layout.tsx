import Image from "../../src/image";

export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return <main className="legal-shell"><header className="legal-header"><a href="#/"><Image src="/images/vue-logo-official.png" alt="VUE 臻域國際不動產" width={260} height={107} /></a></header><article className="legal-page"><a className="back" href="#/">← 返回首頁</a><h1>{title}</h1>{children}</article></main>;
}

export function LegalContact() {
  return <div className="legal-contact"><h2>聯絡資訊</h2><p>公司名稱：臻域國際不動產有限公司（VUE International Real Estate）</p><p>統一編號：60307872</p><p>地址：臺北市信義區忠孝東路4段563號11樓</p><p>電子郵件：<a href="mailto:info@vue.com.tw">info@vue.com.tw</a></p></div>;
}
