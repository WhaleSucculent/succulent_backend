import Stripe from 'stripe';

const stripe = Stripe('sk_test_51LKTrMA5EeipctR93rEE3ADPuXTkoF6okOrYuD7WosQaOorJGJHTlaaNryr9k62wXPh1O8lsW4jAowAmHPnH42Yt006EQbnHJa');

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
              unit_amount: parseFloat(totalAmount, 10) * 100,
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
        success_url: `https://succulentbackend.azurewebsites.net${currentRoute}?is_stripe=true`,
        cancel_url: `${req.headers.origin}${cancelRoute}`,
      });

      res.json({ url: session.url });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
};

export default newPay;