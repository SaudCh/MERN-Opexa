import React from "react";

export default function ProductCard() {
  const details = [
    {
      id: 1,
      name: "Shorts",
      price: "$1000",
      url: "https://assets.targetoptical.com/is/image/TargetOptical/8053672357936__001.png?imwidth=640",
    },
    {
      id: 2,
      name: "Beauty",
      price: "$1000",

      url: "https://assets.targetoptical.com/is/image/TargetOptical/8053672357936__001.png?imwidth=640",
    },
    {
      id: 3,
      name: "Belts",
      price: "$1000",

      url: "https://assets.targetoptical.com/is/image/TargetOptical/8053672357936__001.png?imwidth=640",
    },
    {
      id: 4,
      name: "Shoes",
      price: "$1000",

      url: "https://assets.targetoptical.com/is/image/TargetOptical/8053672357936__001.png?imwidth=640",
    },
    {
      id: 5,
      name: "Bags",
      price: "$1000",

      url: "https://assets.targetoptical.com/is/image/TargetOptical/8053672357936__001.png?imwidth=640",
    },
    {
      id: 6,
      name: "Watches",
      price: "$1000",

      url: "https://assets.targetoptical.com/is/image/TargetOptical/8053672357936__001.png?imwidth=640",
    },
    {
      id: 7,
      name: "Sports",
      price: "$1000",

      url: "https://assets.targetoptical.com/is/image/TargetOptical/8053672357936__001.png?imwidth=640",
    },
    {
      id: 8,
      name: "Accessories",
      price: "$1000",

      url: "https://assets.targetoptical.com/is/image/TargetOptical/8053672357936__001.png?imwidth=640",
    },
    {
      id: 9,
      name: "Sports",
      price: "$1000",

      url: "https://assets.targetoptical.com/is/image/TargetOptical/8053672357936__001.png?imwidth=640",
    },
    {
      id: 10,
      name: "Accessories",
      price: "$1000",

      url: "https://assets.targetoptical.com/is/image/TargetOptical/8053672357936__001.png?imwidth=640",
    },
  ];
  return (
    <div className="ml-32 md:ml-16 grid grid-cols-1 justify-center items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ">
      {details.map((detail) => {
        return (
          <div className="grid grid-cols-12   ">
            <div className="col-span-1 sm:col-span-2" />
            <div className="col-span-12 sm:col-span-8 grid grid-cols-2 sm:grid-cols-4  justify-center items-center">
              <div className="flex justify-center">
                <a to="/product/:id">
                  <div className=" active" style={{ width: "234px" }}>
                    <div className=" ">
                      <div className="product-inner">
                        <div className="product-image relative">
                          <a>
                            <div className="inner">
                              <img
                                alt="Men Black Shoes"
                                className="transform hover:scale-105  main lazypreload lazyloaded min-h-[200px] object-contain bg-slate-100"
                                src={detail.url}
                              />

                              <div className="overlay absolute inset-0 flex items-end  justify-center opacity-0 hover:opacity-100">
                                <button className="bg-black w-[100%] text-white  font-medium px-6 py-3 form-control">
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </a>
                        </div>

                        <div className="product-content my-5 text-center">
                          <span className="text-xs text-gray-400 font-thin uppercase ">
                            <a title="">BEST SELLING PRODUCTS</a>
                          </span>
                          <a className="font-thin my-1">
                            <h3 className="shopify-loop-product__title my-1">
                              {detail.name}
                            </h3>
                          </a>

                          <span className="shopify-Price-amount amount">
                            <span className="money">{detail.price}.00</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
