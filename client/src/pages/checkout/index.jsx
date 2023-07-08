import React from "react";
import CheckoutCard from "../../components/checkout/checkout";

function Checkout() {
  const products = [
    {
      id: 1,
      url: "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-watch-luxury-watch-transparent-png-image_6687168.png",
    },
    {
      id: 2,
      url: "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-watch-luxury-watch-transparent-png-image_6687168.png",
    },
    {
      id: 3,
      url: "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-watch-luxury-watch-transparent-png-image_6687168.png",
    },
    {
      id: 4,
      url: "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-watch-luxury-watch-transparent-png-image_6687168.png",
    },
  ];

  return (
    <div className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-4 ">
            {products.map((product) => {
              return (
                <div className="bg-gray-50 w-52 ">
                  <img
                    alt="Men Watch"
                    className="transform hover:scale-110 min-h-[150px] bg-transparent"
                    src={product.url}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <nav>
            <a className="text-xs text-gray-800 mr-1">Home</a>
            <span className="text-xs text-gray-800 mr-1">/</span>
            <a className="text-xs text-gray-800 mr-1">Shop</a>
            <span className="text-xs text-gray-800 mr-1">/</span>
            <a className="text-xs text-gray-800 mr-1">Watches</a>
            <span className="text-xs text-gray-800 mr-1">/</span>
            <a className="text-xs text-gray-800 mr-1">Brown Q</a>
            <span className="text-xs text-gray-800 mr-1">/</span>
            <a className="text-xs text-gray-800 mr-1">Leather</a>
            <span className="text-xs text-gray-800 mr-1">/</span>
          </nav>

          <CheckoutCard />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
