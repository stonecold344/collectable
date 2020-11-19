// import React from "react";
// import PayPalButton from "./PayPalButton";
// import GPayButton from 'react-google-pay-button'
// import { clearCart } from "../../actions/cartActions";
// import { useDispatch } from "react-redux";

// const Checkout = (props) => {
//   const dispatch = useDispatch();
//   console.log(props);

//   return (
//     <div className="d-flex justify-content-center py-5">
//       <PayPalButton
//         total={
//           parseInt(props.location.state.cart.total) +
//           props.location.state.cart.shipping
//         }
//         clearCart={() => dispatch(clearCart())}

//         style={{
//             layout:  'vertical',
//             color:   'blue',
//             shape:   'rect',
//             label:   'paypal'
//           }
//       />

//       <GPayButton
//         totalPriceStatus={"FINAL"}
//         totalPrice={"14.45"}
//         currencyCode={"USD"}
//         countryCode={"US"}
//         development={true}
//       />
//     </div>
//   );
// };

// export default Checkout;
