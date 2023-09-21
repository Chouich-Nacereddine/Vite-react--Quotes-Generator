import { useState, useEffect } from "react";
import CopyText from "./assets/copy.png";
import axios from "axios";

function App() {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const category = "intelligence";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/quotes",
          {
            params: { category },
            headers: {
              "X-Api-Key": "qcdgAGYh6pq3PaDr7NHnJQ==RWHWOsyDwx0luXPh",
            },
          }
        );
        setQuote(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error: ", error.response.data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const fetchNewQuote = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        params: { category },
        headers: { "X-Api-Key": "qcdgAGYh6pq3PaDr7NHnJQ==RWHWOsyDwx0luXPh" },
      });
      setQuote(response.data[0]); // Set a new random quote
      setIsLoading(false);
    } catch (error) {
      console.error("Error: ", error.response.data);
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (quote) {
      navigator.clipboard.writeText(quote.quote);
      alert("Quote copied to clipboard!");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[50%] h-[max-content] bg-[#FF6600] rounded-2xl flex-col px-16 py-10 shadow border-4 border-black">
          {isLoading ? ( // Display loader while isLoading is true
            <div className="h-[50%] w-full text-justify text-2xl font-medium">
              <div role="status" class="max-w-sm animate-pulse pb-16">
                {/* <div class="h-2.5 bg-black rounded-full  w-48 mb-4"></div> */}
                <div class="h-4 bg-black rounded-full  w-[150%] mb-2.5"></div>
                <div class="h-4 bg-black rounded-full  w-[150%] mb-2.5"></div>
                <div class="h-4 bg-black rounded-full  w-[150%] mb-2.5"></div>
                <div class="h-4 bg-black rounded-full  w-[150%] mb-2.5"></div>
                <div class="h-4 bg-black rounded-full  w-[150%] mb-2.5"></div>
                <div class="h-4 bg-black rounded-full  mb-2.5"></div>

                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <p className="h-[50%] w-full text-justify text-2xl font-medium">
                {quote ? quote.quote : ""}
              </p>
              <p className="flex w-full text-2xl justify-end pb-10 text-white">
                {quote ? `--${quote.author}` : ""}
              </p>
            </>
          )}
          {/* <p className=" flex w-full text-2xl justify-end pb-10 text-white">
            --{quote.author}
          </p> */}
          <div className="flex justify-between">
            <span className="h-14 cursor-pointer" onClick={copyToClipboard}>
              <img src={CopyText} alt="" className="h-full" />
            </span>
            <span className=" cursor-pointer h-14 py-2 px-4 flex  text-xl rounded-2xl justify-center items-center bg-black text-[#FF6600]">
              <button onClick={fetchNewQuote}>New quote</button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
