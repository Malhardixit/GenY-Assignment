function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function displayRazorpay(country) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  const orderId =
    generatedOrderId[Math.floor(Math.random() * generatedOrderId.length)];

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const options = {
    key: "rzp_test_Eh4dDpKynm8sFf",
    amount: "500",
    currency: "INR",
    name: "Gen-Y - Shivmalhar Dixit",
    description: "Test Transaction for " + country,
    order_id: orderId,
    handler: async function (response) {
      const data = {
        orderCreationId: orderId,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };
      alert("Payment Success with ID:" + data.razorpayPaymentId);
    },
    prefill: {
      name: "Shivmalhar Dixit",
      email: "malharsoham@gmail.com",
      contact: "9404717679",
    },
    notes: {
      address: "Gen-Y Assignment",
    },
    theme: {
      color: "#61dafb",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

// Order IDs generated via Postman using my dummy razorpay id and secret
// Storing Id's as we do not have any server side component to make call to generate id
export const generatedOrderId = [
  "order_IJtN4DQ2985uZ9",
  "order_IJtPNvGb0jmcS1",
  "order_IJtPYOgf9dghd0",
  "order_IJtPkCUCjyKFWU",
  "order_IJtPukTdz9evOJ",
  "order_IJtQ3r60En025A",
  "order_IJtX4B8rZ2sMbY",
  "order_IJtXE9dqQWwawd",
  "order_IJtXSAnCy265DO",
  "order_IJtXaMQCPYFCWB",
];
