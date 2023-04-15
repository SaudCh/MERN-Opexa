import { loadStripe } from "@stripe/stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [items, setItems] = useState([]);
  const [clientSecret, setClientSecret] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a PaymentIntent on the backend
    const response = await fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });
    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);

    // Collect card details and submit payment
    const stripe = await stripePromise;
    const { error, paymentMethod } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: name,
            email: email,
          },
        },
      }
    );

    if (error) {
      console.log(error.message);
    } else {
      // Payment succeeded
    }
  };
  
  return (
    <Elements stripe={stripePromise}>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Card details:
          <CardElement />
        </label>
        <button type="submit">Pay</button>
      </form>
    </Elements>
  );
};

export default Home;
