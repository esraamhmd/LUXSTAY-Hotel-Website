import Stripe from "stripe";

// The Stripe SDK throws immediately if constructed with an empty string, and
// that would crash this module for every route that imports it (including
// at build time) whenever STRIPE_SECRET_KEY isn't set yet. We use a harmless
// placeholder key instead so the module always loads safely; the actual
// API routes check for a real key and return a clear error before ever
// making a real Stripe call if it's missing.
const key = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_not_configured";

const stripe = new Stripe(key);

export default stripe;