import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import SimpleCardForm from './SimpleCardForm';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IeYODAb11tmlhlOaF360JXfqLkxK5JQvjABb6UYsNMwckkuzRo7XFVvQMD68Ju66lKlf1QigPcVy3F1dhY8AwUs00VuWEibXi');

const ProcessPayment = ({handlePayment}) => {
  return (
    <div className="container">
      <Elements stripe={stripePromise}>
      <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
    </Elements>
    </div>
    
  );
};

export default ProcessPayment