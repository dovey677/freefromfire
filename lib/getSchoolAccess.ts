import { createServerSupabaseClient } from './supabaseServer'
import { serverClient } from './sanityServer'

export async function getSchoolAccess() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { isLoggedIn: false, hasAccess: false, isAdmin: false }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin, has_school_access')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.is_admin ?? false
  const hasSchoolAccess = profile?.has_school_access ?? false

  return {
    isLoggedIn: true,
    hasAccess: isAdmin || hasSchoolAccess,
    isAdmin,
  }
}

export async function isSchoolLive() {
  const settings = await serverClient.fetch(
    `*[_type == "siteSettings"][0]{ schoolIsLive }`
  )
  return settings?.schoolIsLive === true
}
