import createStripe from "stripe-client";

import { host } from "../../utils/env";

const stripe = createStripe("pk_test_ey5xuA7QGcFHQs5Gf7BCi0SL005Kmm7t36");

type CardType = {
  number: number;
  exp_month: string;
  exp_year: string;
  cvc: string;
  name: string;
};

export const cardTokenRequest = (card: CardType): Promise<any> =>
  stripe.createToken({ card });

export const payRequest = (
  token: any,
  amount: number,
  name: string
): Promise<any> => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("something went wrong processing your payment");
    }
    return res.json();
  });
};
