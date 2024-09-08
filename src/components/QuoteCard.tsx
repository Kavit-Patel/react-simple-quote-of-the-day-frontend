interface IQuoteCard {
  quote: string;
  author: string;
}

const QuoteCard = ({ quote, author }: IQuoteCard) => {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <p className="text-xl font-semibold mb-4">{quote}</p>
      <p className="text-right italic">{author}</p>
    </div>
  );
};

export default QuoteCard;
