import React from "react";
import ChartPage from "../../components/home/ChartPage";
import Summary from "../../components/home/Summary";

export default function Home() {
  return (
    <div class="grid grid-cols-3 grid-flow-col gap-4  px-3">
      <div className="col-span-2">
        <div class=" ...  m-5  bg-white" style={{ maxHeight: "70%" }}>
          <div className="shadow  py-5 " style={{ paddingBottom: "70px" }}>
            <div>
              <h1
                className="p-3 bold"
                style={{ color: "#a31414", fontWeight: "bold" }}
              >
                Earning Overview{" "}
                <span style={{ color: "grey", fontWeight: "normal" }}>
                  (For Last 30 days)
                </span>
              </h1>
            </div>
            <div className="flex justify-center mt-2">
              <ChartPage />
            </div>
          </div>

          <div class=" row-span-2  ...">
            <div class="grid grid-cols-3 shadow  ">
              <div
                className="py-2 text-center "
                style={{ border: "1px solid #d9d8d4" }}
              >
                <p>Total Commissions</p>
                <h1 style={{ fontWeight: "bold" }}>$0.00</h1>
              </div>
              <div
                className="py-5 text-center "
                style={{ border: "1px solid #d9d8d4" }}
              >
                <p>Total Bounties</p>
                <h1 style={{ fontWeight: "bold" }}>$0.00</h1>
              </div>

              <div
                className="py-5 text-center "
                style={{ border: "1px solid #d9d8d4" }}
              >
                <p>Clicks</p>
                <h1 style={{ fontWeight: "bold" }}>0</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="m-5 ">
          <Summary />
        </div>
      </div>
    </div>
  );
}
