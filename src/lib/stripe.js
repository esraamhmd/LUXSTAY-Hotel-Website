import Stripe from "stripe";


const key = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_not_configured";

const stripe = new Stripe(key);

export default stripe;