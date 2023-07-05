import React from "react";

export default function ProductCard() {
  return (
    <div>
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
                            data-src="https://assets.targetoptical.com/is/image/TargetOptical/8053672357936__001.png?imwidth=640"
                            alt="Men Black Shoes"
                            className="transform hover:scale-105  main lazypreload lazyloaded min-h-[200px] object-contain bg-slate-100"
                            src="https://assets.targetoptical.com/is/image/TargetOptical/8053672357936__001.png?imwidth=640"
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
                          Rayban 5228
                        </h3>
                      </a>

                      <span className="shopify-Price-amount amount">
                        <span className="money">$1,699.00</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
