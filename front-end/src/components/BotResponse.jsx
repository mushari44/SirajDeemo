const BotResponse = ({ response }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md mb-2">
      <p className="text-green-500 font-semibold mt-2">Response:</p>
      {response ? <p>{response}</p> : <p className="text-gray-500">جارٍ المعالجة...</p>}
    </div>
  );
};

export default BotResponse;
