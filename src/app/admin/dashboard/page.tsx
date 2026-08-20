'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/button'
import { Plus, Edit2, Trash2, LogOut, CheckCircle2, FileText, MessageSquare, Briefcase, Menu, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Article = {
  id: string
  created_at: string
  title: string
  category: string
  read_time: string
  author: string
  date: string
  excerpt: string
  image: string
  services: string[]
  results: { label: string; value: string }[]
}

export type ContactRequest = {
  id: string
  created_at: string
  full_name: string
  company_name: string | null
  email: string
  phone: string | null
  country: string | null
  website: string | null
  industry: string | null
  source: string | null
  project_interests: string[] | null
  description: string | null
  budget: string | null
  timeline: string | null
  attachment_url: string | null
}

export type JobApplication = {
  id: string
  created_at: string
  full_name: string
  email: string
  phone: string
  location: string
  position: string
  employment_type: string
  experience: string | null
  portfolio: string | null
  message: string | null
  skills: string | null
  availability: string | null
  resume_url: string | null
}

type Tab = 'articles' | 'contact_requests' | 'job_applications'

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('articles')
  const [articles, setArticles] = useState<Article[]>([])
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([])
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([])

  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Article>>({})
  const [showForm, setShowForm] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    if (activeTab === 'articles') {
      fetchArticles()
    } else if (activeTab === 'contact_requests') {
      fetchContactRequests()
    } else if (activeTab === 'job_applications') {
      fetchJobApplications()
    }
  }, [activeTab])

  const fetchArticles = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setArticles(data)
    setLoading(false)
  }

  const fetchContactRequests = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setContactRequests(data)
    setLoading(false)
  }

  const fetchJobApplications = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setJobApplications(data)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return
    await supabase.from('articles').delete().eq('id', id)
    fetchArticles()
    fetch('/api/revalidate?tag=articles', { method: 'POST' })
  }

  const handleDeleteContactRequest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact request?')) return
    await supabase.from('contact_requests').delete().eq('id', id)
    fetchContactRequests()
  }

  const handleDeleteJobApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job application?')) return
    await supabase.from('job_applications').delete().eq('id', id)
    fetchJobApplications()
  }

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      title: formData.title || '',
      category: formData.category || 'Uncategorized',
      read_time: formData.read_time || '5 min read',
      author: formData.author || 'Admin',
      date: formData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      excerpt: formData.excerpt || '',
      image: formData.image || '/insights/placeholder.jpg',
      services: formData.services || [],
      results: formData.results || []
    }

    if (isEditing) {
      await supabase.from('articles').update(payload).eq('id', isEditing)
    } else {
      await supabase.from('articles').insert([payload])
    }

    setShowForm(false)
    setIsEditing(null)
    setFormData({})
    fetchArticles()
    fetch('/api/revalidate?tag=articles', { method: 'POST' })
  }

  const openEdit = (article: Article) => {
    setFormData(article)
    setIsEditing(article.id)
    setShowForm(true)
  }

  const openNew = () => {
    setFormData({
      services: ['Strategy'],
      results: [{ label: 'Metric', value: '+100%' }]
    })
    setIsEditing(null)
    setShowForm(true)
  }

  const tabs = [
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'contact_requests', label: 'Contact Requests', icon: MessageSquare },
    { id: 'job_applications', label: 'Job Applications', icon: Briefcase },
  ] as const

  return (
    <main className="min-h-screen bg-[var(--canvas)] flex flex-col md:flex-row">
      {/* Mobile Menu Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[var(--hairline)] bg-[var(--canvas-dark)]">
        <h2 className="text-lg font-bold text-[var(--ink)]">Admin Panel</h2>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-[var(--body)]">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "w-full md:w-64 border-r border-[var(--hairline)] bg-[var(--canvas-dark)] p-6 shrink-0 flex-col justify-between",
        mobileMenuOpen ? "flex" : "hidden md:flex"
      )}>
        <div>
          <h2 className="text-xl font-bold text-[var(--ink)] mb-8 hidden md:block">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setMobileMenuOpen(false)
                    setShowForm(false)
                  }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full text-left",
                    activeTab === tab.id
                      ? "bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]"
                      : "text-[var(--body)] hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        <Button variant="secondary-white" onClick={handleLogout} className="mt-8 w-full justify-center" rightIcon={<LogOut className="h-4 w-4" />}>
          Sign Out
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-4 w-full max-w-7xl mx-auto overflow-y-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[var(--ink)]">
              {activeTab === 'articles' ? 'Content Manager' :
                activeTab === 'contact_requests' ? 'Contact Requests' :
                  'Job Applications'}
            </h1>
            <p className="text-[var(--body)] mt-2">
              {activeTab === 'articles' ? 'Manage your Insights & Perspectives articles.' :
                activeTab === 'contact_requests' ? 'Review submissions from the Contact Us form.' :
                  'Review candidates from the Join Us form.'}
            </p>
          </div>

          {activeTab === 'articles' && (
            <Button variant="primary" onClick={openNew} rightIcon={<Plus className="h-4 w-4" />}>
              New Article
            </Button>
          )}
        </div>

        {/* Form View (Articles Only) */}
        {activeTab === 'articles' && showForm && (
          <div className="bg-[var(--canvas-dark)] border border-[var(--hairline)] rounded-3xl p-6 md:p-8 mb-10 shadow-lg">
            <h2 className="text-xl font-semibold mb-6">{isEditing ? 'Edit Article' : 'Create New Article'}</h2>
            <form onSubmit={handleSaveArticle} className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-[var(--body)]">Article Title</label>
                <input required type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className="h-11 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] px-4 outline-none focus:border-[var(--accent-cyan)]" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--body)]">Category</label>
                <input required type="text" value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} className="h-11 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] px-4 outline-none focus:border-[var(--accent-cyan)]" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--body)]">Image URL</label>
                <input required type="text" value={formData.image || ''} onChange={e => setFormData({ ...formData, image: e.target.value })} className="h-11 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] px-4 outline-none focus:border-[var(--accent-cyan)]" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--body)]">Author</label>
                <input required type="text" value={formData.author || ''} onChange={e => setFormData({ ...formData, author: e.target.value })} placeholder="e.g. Sara Kapoor" className="h-11 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] px-4 outline-none focus:border-[var(--accent-cyan)]" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--body)]">Date</label>
                <input required type="text" value={formData.date || ''} onChange={e => setFormData({ ...formData, date: e.target.value })} placeholder="e.g. Mar 12, 2026" className="h-11 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] px-4 outline-none focus:border-[var(--accent-cyan)]" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--body)]">Read Time</label>
                <input required type="text" value={formData.read_time || ''} onChange={e => setFormData({ ...formData, read_time: e.target.value })} placeholder="e.g. 6 min read" className="h-11 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] px-4 outline-none focus:border-[var(--accent-cyan)]" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--body)]">Services (Comma Separated)</label>
                <input required type="text" value={formData.services?.join(', ') || ''} onChange={e => setFormData({ ...formData, services: e.target.value.split(',').map(s => s.trim()) })} placeholder="e.g. Brand Strategy, Visual Identity" className="h-11 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] px-4 outline-none focus:border-[var(--accent-cyan)]" />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-[var(--body)]">Excerpt / Subtitle</label>
                <textarea required rows={3} value={formData.excerpt || ''} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} className="rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] p-4 outline-none focus:border-[var(--accent-cyan)]" />
              </div>

              <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 border-t border-[var(--hairline)] pt-6">
                <div className="col-span-full">
                  <label className="text-sm font-medium text-[var(--body)]">Key Metrics (4 Results)</label>
                </div>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="flex flex-col gap-2 p-3 bg-white/5 rounded-xl border border-white/10">
                    <input
                      placeholder="Label (e.g. Traffic)"
                      value={formData.results?.[i]?.label || ''}
                      onChange={e => {
                        const newResults = [...(formData.results || [])];
                        if (!newResults[i]) newResults[i] = { label: '', value: '' };
                        newResults[i].label = e.target.value;
                        setFormData({ ...formData, results: newResults });
                      }}
                      className="h-9 rounded-lg border border-[var(--hairline)] bg-[var(--canvas)] px-3 text-xs outline-none focus:border-[var(--accent-cyan)]"
                    />
                    <input
                      placeholder="Value (e.g. +40%)"
                      value={formData.results?.[i]?.value || ''}
                      onChange={e => {
                        const newResults = [...(formData.results || [])];
                        if (!newResults[i]) newResults[i] = { label: '', value: '' };
                        newResults[i].value = e.target.value;
                        setFormData({ ...formData, results: newResults });
                      }}
                      className="h-9 rounded-lg border border-[var(--hairline)] bg-[var(--canvas)] px-3 text-xs outline-none focus:border-[var(--accent-cyan)]"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-6 md:col-span-2">
                <Button type="submit" variant="primary" rightIcon={<CheckCircle2 className="h-4 w-4" />}>
                  Save Article
                </Button>
                <button type="button" onClick={() => setShowForm(false)} className="text-sm font-medium hover:text-[var(--ink)] text-[var(--body)]">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List View */}
        <div className="bg-[var(--canvas-dark)] border border-[var(--hairline)] rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-10 text-center text-[var(--body)]">Loading data...</div>
          ) : (
            <div className="divide-y divide-[var(--hairline)]">

              {activeTab === 'articles' && (
                articles.length === 0 ? (
                  <div className="p-10 text-center text-[var(--body)]">No articles found in the database.</div>
                ) : (
                  articles.map(article => (
                    <div key={article.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[var(--canvas)]/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-800 relative">
                          <img src={article.image} alt={article.title} className="object-cover w-full h-full opacity-80" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono text-[var(--accent-cyan)] uppercase tracking-wider bg-[var(--accent-cyan)]/10 px-2 py-0.5 rounded">
                              {article.category}
                            </span>
                            <span className="text-[11px] font-mono text-[var(--body)]">{article.date}</span>
                          </div>
                          <h3 className="font-semibold text-lg text-[var(--ink)] line-clamp-1">{article.title}</h3>
                          <p className="text-sm text-[var(--body)] line-clamp-1 mt-1 max-w-xl">{article.excerpt}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 md:flex-shrink-0">
                        <button onClick={() => openEdit(article)} className="flex items-center justify-center h-10 w-10 rounded-full border border-[var(--hairline)] bg-[var(--canvas)] hover:border-[var(--ink)] transition-colors">
                          <Edit2 className="h-4 w-4 text-[var(--body)]" />
                        </button>
                        <button onClick={() => handleDeleteArticle(article.id)} className="flex items-center justify-center h-10 w-10 rounded-full border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 transition-colors">
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))
                )
              )}

              {activeTab === 'contact_requests' && (
                contactRequests.length === 0 ? (
                  <div className="p-10 text-center text-[var(--body)]">No contact requests found.</div>
                ) : (
                  contactRequests.map(contact => (
                    <div key={contact.id} className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:bg-[var(--canvas)]/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-[var(--ink)]">{contact.full_name}</h3>
                          {contact.company_name && (
                            <span className="text-sm text-[var(--body)] bg-white/5 px-2 py-1 rounded">@ {contact.company_name}</span>
                          )}
                          <span className="text-xs text-[var(--body)] px-2 py-1 bg-white/5 rounded-md border border-white/10">
                            {new Date(contact.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--body)] mb-4">
                          <span>📧 {contact.email}</span>
                          {contact.phone && <span>📞 {contact.phone}</span>}
                          {contact.country && <span>📍 {contact.country}</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-[var(--canvas)] p-4 rounded-xl border border-[var(--hairline)]">
                            <span className="block text-xs font-medium text-zinc-500 mb-2">Project Details</span>
                            <div className="text-sm text-zinc-300">
                              <span className="text-[var(--accent-cyan)] font-medium">Interests:</span> {contact.project_interests?.join(', ') || 'N/A'}<br />
                              <span className="text-[var(--accent-cyan)] font-medium">Budget:</span> {contact.budget ? `₹${contact.budget}` : 'N/A'}<br />
                              <span className="text-[var(--accent-cyan)] font-medium">Timeline:</span> {contact.timeline || 'N/A'}
                            </div>
                            {contact.description && (
                              <p className="mt-3 text-sm text-zinc-400 whitespace-pre-wrap pt-3 border-t border-[var(--hairline)]">{contact.description}</p>
                            )}
                          </div>

                          <div className="bg-[var(--canvas)] p-4 rounded-xl border border-[var(--hairline)]">
                            <span className="block text-xs font-medium text-zinc-500 mb-2">Other Info</span>
                            <div className="text-sm text-zinc-300">
                              <span className="text-zinc-500 font-medium">Website:</span> {contact.website || 'N/A'}<br />
                              <span className="text-zinc-500 font-medium">Industry:</span> {contact.industry || 'N/A'}<br />
                              <span className="text-zinc-500 font-medium">Source:</span> {contact.source || 'N/A'}
                            </div>

                            {contact.attachment_url && (
                              <a href={contact.attachment_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--accent-cyan)] hover:underline">
                                <Download className="w-4 h-4" /> Download Attachment
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteContactRequest(contact.id)} className="flex items-center justify-center h-10 w-10 rounded-full border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 transition-colors shrink-0">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  ))
                )
              )}

              {activeTab === 'job_applications' && (
                jobApplications.length === 0 ? (
                  <div className="p-10 text-center text-[var(--body)]">No job applications found.</div>
                ) : (
                  jobApplications.map(contact => (
                    <div key={contact.id} className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:bg-[var(--canvas)]/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-[var(--ink)]">{contact.full_name}</h3>
                          {contact.position && (
                            <span className="text-[11px] font-mono text-[var(--accent-cyan)] uppercase tracking-wider bg-[var(--accent-cyan)]/10 px-2 py-1 rounded">
                              {contact.position}
                            </span>
                          )}
                          {contact.employment_type && (
                            <span className="text-xs text-[var(--body)] px-2 py-1 bg-white/5 rounded-md border border-white/10">
                              {contact.employment_type}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--body)] mb-4">
                          <span>📧 {contact.email}</span>
                          {contact.phone && <span>📞 {contact.phone}</span>}
                          {contact.location && <span>📍 {contact.location}</span>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          {contact.experience && (
                            <div className="bg-[var(--canvas)] p-3 rounded-xl border border-[var(--hairline)]">
                              <span className="block text-xs font-medium text-zinc-500 mb-1">Experience</span>
                              <span className="text-sm text-zinc-300">{contact.experience}</span>
                            </div>
                          )}
                          {contact.skills && (
                            <div className="bg-[var(--canvas)] p-3 rounded-xl border border-[var(--hairline)]">
                              <span className="block text-xs font-medium text-zinc-500 mb-1">Skills</span>
                              <span className="text-sm text-zinc-300">{contact.skills}</span>
                            </div>
                          )}
                          {contact.availability && (
                            <div className="bg-[var(--canvas)] p-3 rounded-xl border border-[var(--hairline)]">
                              <span className="block text-xs font-medium text-zinc-500 mb-1">Availability</span>
                              <span className="text-sm text-zinc-300">{contact.availability}</span>
                            </div>
                          )}
                          {contact.portfolio && (
                            <div className="bg-[var(--canvas)] p-3 rounded-xl border border-[var(--hairline)]">
                              <span className="block text-xs font-medium text-zinc-500 mb-1">Portfolio</span>
                              <a href={contact.portfolio} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline break-all">
                                {contact.portfolio}
                              </a>
                            </div>
                          )}
                        </div>
                        {contact.message && (
                          <div className="mt-4 bg-[var(--canvas)] p-4 rounded-xl text-sm text-zinc-300 border border-[var(--hairline)] whitespace-pre-wrap">
                            <span className="block text-xs font-medium text-zinc-500 mb-2">Cover Letter / Note</span>
                            {contact.message}
                          </div>
                        )}
                        <div className="mt-4 flex items-center justify-between">
                          <span className="block text-xs text-zinc-600">
                            Applied: {new Date(contact.created_at).toLocaleString()}
                          </span>
                          {contact.resume_url && (
                            <a href={contact.resume_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[var(--ink)] bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                              <Download className="w-4 h-4" /> Download Resume
                            </a>
                          )}
                        </div>
                      </div>
                      <button onClick={() => handleDeleteJobApplication(contact.id)} className="flex items-center justify-center h-10 w-10 rounded-full border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 transition-colors shrink-0">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  ))
                )
              )}

            </div>
          )}
        </div>
      </div>
    </main>
  )
}
