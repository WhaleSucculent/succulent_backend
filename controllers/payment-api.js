import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load .env file content to process.env
dotenv.config();
const secret_key = process.env.STRIPE_SECRET_KEY;
const domain = process.env.DOMAIN;

const stripe = Stripe(secret_key);

const newPay = async (req, res) => {
    
  const { totalAmount, cancelRoute, productIds, currentRoute } = req.body;

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Whale Succulent Supply",
              images: ["https://i.imgur.com/8DYoXXs.jpeg"],
            },
            unit_amount: Math.round(totalAmount)*100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // success_url: `${
      //   req.headers.origin
      // }?is_stripe=true&is_cart=${currentRoute.includes(
      //   "cart"
      // )}&product_ids=${productIds}`,
      success_url: `${domain}${currentRoute}?is_stripe=true`,
      cancel_url: `${req.headers.origin}${cancelRoute}`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default newPay;