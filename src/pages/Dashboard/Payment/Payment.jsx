import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import useCart from "../../../hooks/useCart";

const payment_api_key = import.meta.env.VITE_Payment_Gateway_PK;

const stripePromise = loadStripe(payment_api_key);

const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));


    return (
        <div>
            <Helmet><title>Bistro Boss || Payment</title></Helmet>
            <SectionTitle heading='Make Payment' subHeading='Happy Shopping'></SectionTitle>

            <Elements stripe={stripePromise}>
                <CheckOutForm cart={cart} price={price} />
            </Elements>
        </div>
    );
};

export default Payment;