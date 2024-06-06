// import React from 'react';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
// import '../../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// // import BackgroundImage from '../../assets/images/payment.png';

// const CheckOutNew = () => {
//   const createOrder = () => {
//     return fetch("/create-order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         items: [
//           {
//             id: 1,
//             quantity: 2,
//           },
//           { id: 2, quantity: 3 },
//         ],
//       }),
//     })
//       .then(res => {
//         if (res.ok) return res.json();
//         return res.json().then(json => Promise.reject(json));
//       })
//       .then(({ id }) => {
//         return id;
//       })
//       .catch(e => {
//         console.error(e.error);
//       });
//   };

//   const onApprove = (data, actions) => {
//     return actions.order.capture();
//   };

//   return (
//     <div>
//       <title>Document</title>
//       <PayPalScriptProvider options={{ 'client-id': 'AbLPw0gb-TEOm3LlGBtbKYNBrdp0VGVAhgf3ctwah08Z99ZQOyGbvkzwFzwYH8SfjQIjZ3zMXjX9iQPI' }}>
//         <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
//       </PayPalScriptProvider>
//     </div>
//   );
// };

// export default CheckOutNew;

import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

const CheckOutNew = () => {
  const onSuccess = (details, data) => {
    console.log("Transaction completed by " + details.payer.name.given_name);
    // You can perform additional actions here if needed
  };

  const onCancel = (data) => {
    console.log("Payment was canceled");
  };

  const onError = (err) => {
    console.error("Error occurred:", err);
  };

  return (
    <PayPalButton
      amount="10.00"
      currency="USD"
      onSuccess={onSuccess}
      onCancel={onCancel}
      onError={onError}
      options={{
        clientId: "AbLPw0gb-TEOm3LlGBtbKYNBrdp0VGVAhgf3ctwah08Z99ZQOyGbvkzwFzwYH8SfjQIjZ3zMXjX9iQPI",
      }}
    />
  );
};

export default CheckOutNew;
