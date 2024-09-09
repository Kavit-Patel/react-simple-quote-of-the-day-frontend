import { useQuery } from "react-query";
import QuoteCard from "../components/QuoteCard";
import { fetchQuoteOfTheDay, useSaveQuote } from "../api/api";
import { useAuth } from "../context/UseAuth";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useAuth();
  const { data, isLoading, error, isFetching, refetch } = useQuery(
    "quoteOfTheDay",
    fetchQuoteOfTheDay,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { mutate: saveQuote } = useSaveQuote();
  const handleRefreshQuote = () => {
    refetch();
  };

  const handleSaveQuote = async () => {
    if (data && user) {
      try {
        await saveQuote({
          text: data.quote,
          author: data.author,
          userId: user.id,
        });
        toast.success("Quote saved to history!");
      } catch (error) {
        toast.error("Failed to save quotes !");
        console.error("Error saving quote:", error);
      }
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
          className={` w-36 flex justify-center bg-green-500 text-white px-4 py-2 mt-4    
          `}
        >
          {isFetching ? <Loader /> : <span>Refresh Quote</span>}
        </button>
        {user && (
          <button
            onClick={handleSaveQuote}
            className="bg-blue-500 text-white px-4 py-2 mt-4 ml-4"
          >
            Save to History
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
