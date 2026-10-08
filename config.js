// Travel Planner settings.
//
// To turn on sign-in and trip sync, paste your Supabase project's URL and
// publishable (or "anon") key below. See SUPABASE-SETUP.md.
//
// These two values are safe to publish on GitHub: the key only allows what
// the database's Row Level Security rules permit, and those rules let each
// person read and change only their own trips. Never put your "secret" or
// "service_role" key here.
//
// Leave both empty to keep trips only in this browser.

window.TRAVEL_PLANNER_CONFIG = {
  supabaseUrl: "",   // e.g. "https://abcdefghijklm.supabase.co"
  supabaseKey: ""    // e.g. "sb_publishable_..." or the legacy anon key "eyJ..."
};
