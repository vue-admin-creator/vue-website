import { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "./image";
import { ProjectRecord, supabase } from "./supabase";

const emptyProject: Omit<ProjectRecord, "id"> = {
  title_zh: "",
  title_en: "",
  country: "美國",
  city: "",
  status: "精選",
  rooms: "",
  area: "",
  price: "",
  delivery: "",
  image_url: null,
  image_path: null,
  sort_order: 0,
  is_published: false,
};

export function AdminApp() {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [editing, setEditing] = useState<ProjectRecord | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const loadProjects = useCallback(async () => {
    const { data, error } = await supabase.from("projects").select("*").order("sort_order");
    if (error) throw error;
    setProjects(data ?? []);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }: any) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event: string, next: any) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user?.id) { setIsAdmin(null); return; }
    supabase.from("admin_users").select("user_id").eq("user_id", session.user.id).maybeSingle()
      .then(({ data, error }: any) => {
        if (error) { setMessage(error.message); setIsAdmin(false); return; }
        setIsAdmin(Boolean(data));
        if (data) loadProjects().catch((err) => setMessage(err.message));
      });
  }, [session, loadProjects]);

  if (!session) return <Login />;
  if (isAdmin === null) return <div className="admin-loading">正在確認管理權限…</div>;
  if (!isAdmin) return <main className="admin-access"><h1>尚未開通管理權限</h1><p>{session.user.email}</p><p>請由網站負責人將此帳號加入管理員名單。</p><button onClick={() => supabase.auth.signOut()}>登出</button></main>;

  async function togglePublished(project: ProjectRecord) {
    setBusy(true);
    const { error } = await supabase.from("projects").update({ is_published: !project.is_published }).eq("id", project.id);
    setBusy(false);
    if (error) return setMessage(error.message);
    setMessage(project.is_published ? "建案已下架" : "建案已上架");
    await loadProjects();
  }

  return (
    <main className="admin-shell">
      <header className="admin-header"><div><Image src="/images/vue-logo-official.png" alt="VUE" width={170} height={70} /><span>建案管理後台</span></div><button onClick={() => supabase.auth.signOut()}>登出</button></header>
      <section className="admin-content">
        <div className="admin-title"><div><p>PROJECT MANAGEMENT</p><h1>建案管理</h1></div><button className="admin-primary" onClick={() => { setCreating(true); setEditing(null); }}>＋ 新增建案</button></div>
        {message && <p className="admin-message">{message}</p>}
        <div className="admin-list">
          {projects.map((project) => <article className="admin-row" key={project.id}>
            <div className="admin-thumb">{project.image_url ? <img src={project.image_url} alt="" /> : <span>尚無圖片</span>}</div>
            <div className="admin-row-copy"><small>{project.city} · {project.status}</small><h2>{project.title_zh}</h2><p>{project.title_en}</p></div>
            <span className={project.is_published ? "publish-badge live" : "publish-badge"}>{project.is_published ? "已上架" : "未上架"}</span>
            <div className="admin-actions"><button onClick={() => { setEditing(project); setCreating(false); }}>編輯</button><button disabled={busy} onClick={() => togglePublished(project)}>{project.is_published ? "下架" : "上架"}</button></div>
          </article>)}
        </div>
      </section>
      {(creating || editing) && <ProjectEditor initial={editing ?? emptyProject} onClose={() => { setEditing(null); setCreating(false); }} onSaved={async (note) => { setMessage(note); setEditing(null); setCreating(false); await loadProjects(); }} />}
    </main>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false); if (error) setMessage("登入失敗，請確認信箱與密碼。");
  }
  return <main className="admin-login"><form onSubmit={submit}><Image src="/images/vue-logo-official.png" alt="VUE 臻域國際不動產" width={240} height={99} /><p>PROJECT MANAGEMENT</p><h1>建案管理後台</h1><label>登入信箱<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><label>密碼<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>{message && <span className="login-error">{message}</span>}<button disabled={busy}>{busy ? "登入中…" : "登入"}</button><a href="#/">← 返回官網</a></form></main>;
}

function ProjectEditor({ initial, onClose, onSaved }: { initial: Omit<ProjectRecord, "id"> | ProjectRecord; onClose: () => void; onSaved: (message: string) => void }) {
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const id = "id" in initial ? initial.id : null;
  function field(name: keyof typeof form, value: string | number | boolean | null) { setForm((current) => ({ ...current, [name]: value })); }
  async function upload(file: File) {
    if (!file.type.startsWith("image/")) throw new Error("請選擇圖片檔案");
    if (file.size > 10 * 1024 * 1024) throw new Error("圖片不可超過 10MB");
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const { data: userData } = await supabase.auth.getUser();
    const path = `${userData.user.id}/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("project-images").upload(path, file, { contentType: file.type });
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from("project-images").getPublicUrl(path);
    setForm((current) => ({ ...current, image_path: path, image_url: data.publicUrl }));
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    const payload = { ...form, sort_order: Number(form.sort_order) || 0 };
    const result = id ? await supabase.from("projects").update(payload).eq("id", id) : await supabase.from("projects").insert(payload);
    setBusy(false);
    if (result.error) return setError(result.error.message);
    onSaved(id ? "建案已儲存" : "建案已建立");
  }
  return <div className="editor-backdrop" role="dialog" aria-modal="true"><form className="project-editor" onSubmit={submit}><div className="editor-title"><h2>{id ? "編輯建案" : "新增建案"}</h2><button type="button" onClick={onClose}>關閉</button></div><div className="editor-grid"><label>中文名稱<input value={form.title_zh} onChange={(e) => field("title_zh", e.target.value)} required /></label><label>英文名稱<input value={form.title_en} onChange={(e) => field("title_en", e.target.value)} required /></label><label>城市<input value={form.city} onChange={(e) => field("city", e.target.value)} required /></label><label>標籤<select value={form.status} onChange={(e) => field("status", e.target.value)}><option>精選</option><option>新案</option><option>即將完售</option></select></label><label>房型<input value={form.rooms} onChange={(e) => field("rooms", e.target.value)} /></label><label>室內坪數<input value={form.area} onChange={(e) => field("area", e.target.value)} /></label><label>售價<input value={form.price} onChange={(e) => field("price", e.target.value)} /></label><label>交屋時間<input value={form.delivery} onChange={(e) => field("delivery", e.target.value)} /></label><label>排序<input type="number" value={form.sort_order} onChange={(e) => field("sort_order", Number(e.target.value))} /></label><label className="image-field">建案主圖<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0]).catch((err) => setError(err.message))} /></label></div>{form.image_url && <img className="editor-preview" src={form.image_url} alt="建案預覽" />}<label className="publish-check"><input type="checkbox" checked={form.is_published} onChange={(e) => field("is_published", e.target.checked)} /> 儲存後立即上架</label>{error && <p className="login-error">{error}</p>}<button className="admin-primary save" disabled={busy}>{busy ? "儲存中…" : "儲存建案"}</button></form></div>;
}
