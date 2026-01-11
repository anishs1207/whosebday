import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

const YOUR_DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log (body)
    const priceId = body.priceId; // Assuming you send price_id directly

    console.log(priceId)

    if (!priceId) {
      return NextResponse.json({ error: 'Missing price_id' }, { status: 400 });
    }

    console.log ("test1")

    // Create a checkout session directly using the Price ID
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: priceId, // Directly use the Price ID
          quantity: 1,
        },
      ],
      mode: 'subscription', // Or 'payment' for one-time payments
      // success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      success_url: `${YOUR_DOMAIN}/dashboard`,
      cancel_url: `${YOUR_DOMAIN}/dashboard`,
    });

    console.log ("test2")

//     await clerkClient.users.updateUserMetadata(userId, {
//   publicMetadata: {
//     subscription: {
//       sessionId: session.id,
//       subscriptionId: session.subscription,
//       status: session.status,
//     },
//   },
// });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error('Checkout Session Error:', err.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
