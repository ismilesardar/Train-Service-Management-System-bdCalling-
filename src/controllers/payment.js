
/**
 * Date: 11/07/2024
 * Subject: Health City 
 * Dev: Ismile Sardar
 */

const stripe = require("stripe")('sk_dsdsdzzz32434.....');

exports.paymentSend = async (req, res) => {
  try {
    const { price } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(price * 100),
      currency: "usd",
      payment_method_types: ["card"],
      
    });
    
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
  }
}
