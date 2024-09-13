import { useState } from "react";
import { useFetchHistory } from "../api/api";
import QuoteCard from "../components/QuoteCard";
import Loader from "../components/Loader";
import { IQuote, IUser } from "../types";
import { useQueryClient } from "react-query";

const History = () => {
  const queryClient = useQueryClient();
  const user: IUser | undefined = queryClient.getQueryData("user");
  const userId = user?.id;

  const { data: history, isLoading, error } = useFetchHistory(userId ?? 0);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = history?.filter((quote: IQuote) =>
    quote.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="w-full h-96 flex justify-center items-center">
        Error loading history.
      </div>
    );

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">
        <span className="text-blue-900">
          {user?.email.split("@")[0].toUpperCase()}'s
        </span>{" "}
        Quote History
      </h1>

      <div className="">
        <input
          type="text"
          placeholder="Search by author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="mt-10 h-[38rem] overflow-y-auto">
        {filteredHistory && filteredHistory.length > 0 ? (
          filteredHistory.map((quote: IQuote) => (
            <QuoteCard
              key={quote.id}
              quote={quote.text}
              author={quote.author}
            />
          ))
        ) : (
          <p>No quotes found in your history.</p>
        )}
      </div>
    </div>
  );
};

export default History;
