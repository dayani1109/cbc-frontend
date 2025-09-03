// export default function ProductCard(props) {
//   //function ek hadanne new html tag ekak introduce karann. ethkot aniwa first letter Capital

//   const product = props.product;

//   return (
//     <div className="w-[300px] h-[420px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden m-3">
//       {/* Product Image */}
//       <div className="relative w-full h-[230px]">
//         <img
//           className="w-full h-full object-cover rounded-t-2xl"
//           src={product.images[0]}
//           alt={product.name}
//         />
//         {/* Discount badge */}
//         {product.labelledPrice > product.price && (
//           <span className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
//             Sale
//           </span>
//         )}
//       </div>

//       {/* Product Info */}
//       <div className="flex flex-col justify-between flex-grow px-4 py-3">
//         <h1 className="text-lg font-bold text-secondary truncate">
//           {product.name}
//         </h1>

//         {/* Price Section */}
//         {product.labelledPrice > product.price ? (
//           <div className="flex gap-2 items-center">
//             <p className="text-sm text-secondary/60 line-through">
//               Rs. {product.labelledPrice.toFixed(2)}
//             </p>
//             <p className="text-lg text-accent font-bold">
//               Rs. {product.price.toFixed(2)}
//             </p>
//           </div>
//         ) : (
//           <p className="text-lg text-accent font-bold">
//             Rs. {product.price.toFixed(2)}
//           </p>
//         )}

//         {/* Meta Info */}
//         <div className="mt-2">
//           <p className="text-xs text-secondary/60 font-medium">
//             Product ID: {product.productID}
//           </p>
//           <p className="text-xs text-secondary/60 font-medium">
//             Category: {product.category}
//           </p>
//         </div>

//         {/* Action Button */}
//         <button className="w-full mt-3 py-2 rounded-xl border border-boardercolor text-accent font-semibold hover:bg-accent hover:text-white transition-all duration-300">
//           View Product
//         </button>
//       </div>
//     </div>
//   );
// }