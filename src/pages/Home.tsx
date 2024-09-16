import { useQuery, useQueryClient } from "react-query";
import QuoteCard from "../components/QuoteCard";
import { fetchQuoteOfTheDay, useSaveQuote } from "../api/api";
import Loader from "../components/Loader";
import { IUser } from "../types";
import { useState } from "react";

const Home = () => {
  const [isQuoteFetched, setIsQuoteFetched] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const user: IUser | undefined = queryClient.getQueryData("user");
  const { data, isLoading, error, isFetching, refetch } = useQuery(
    "quoteOfTheDay",
    fetchQuoteOfTheDay,
    {
      enabled: !isQuoteFetched,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 50,
      onSuccess: () => setIsQuoteFetched(true),
    }
  );
  const { mutate: saveQuote } = useSaveQuote();
  const handleRefreshQuote = () => {
    refetch();
  };

  const handleSaveQuote = async () => {
    if (data && user) {
      saveQuote({
        text: data.quote,
        author: data.author,
        userId: user.id,
      });
    }
  };
  if (isLoading)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        Error loading quote...
      </div>
    );

  return (
    <div className=" flex flex-col items-center mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Quote of the Day</h1>
      {data && <QuoteCard quote={data.quote} author={data.author} />}
      <div className="flex gap-4">
        <button
          onClick={handleRefreshQuote}
          className={` w-36 flex justify-center bg-green-500 text-white px-4 py-2 mt-4 transition-all hover:bg-green-600 active:scale-95  
          `}
        >
          {isFetching ? <Loader /> : <span>Refresh Quote</span>}
        </button>
        {user && (
          <button
            onClick={handleSaveQuote}
            className="bg-blue-500 text-white px-4 py-2 mt-4 ml-4 transition-all hover:bg-blue-600 active:scale-95"
          >
            Save to History
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
