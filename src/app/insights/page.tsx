import { createClient } from '@/lib/supabase/server'
import { InsightsClientPage } from './ClientPage'

// Force Next.js to use Incremental Static Regeneration for ultra-low latency.
// Revalidates cache automatically, but can also be triggered via our API webhook.
export const revalidate = 60 // fallback 60s, though we have on-demand revalidation too

export default async function InsightsPage() {
  const supabase = await createClient()
  
  // Fetch from the articles table directly on the edge/server
  // This removes client-side fetching latency!
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  // If there's an error or no data, we'll pass undefined so it falls back 
  // to the hardcoded DEFAULT_ARTICLES inside the ClientPage for safety.
  const passedArticles = articles && articles.length > 0 ? articles : undefined

  return <InsightsClientPage articles={passedArticles} />
}
