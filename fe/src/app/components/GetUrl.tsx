export default function GetUrl({
  handleGetUrl,
  shortUrl,
  setShortUrl,
  originalUrl,
}: {
  handleGetUrl: (e: React.FormEvent<HTMLFormElement>) => void;
  shortUrl: string;
  setShortUrl: (url: string) => void;
  originalUrl: string;
}) {
  return (
    <div className="flex flex-col gap-4 my-4">
      <h1 className="text-2xl font-bold">Get Url</h1>
      <form onSubmit={handleGetUrl} className="w-full flex gap-2">
        <input
          type="text"
          placeholder="Enter Short URL"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2 flex-1"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Get
        </button>
      </form>
      {originalUrl && (
        <div className="flex flex-row bg-gray-100 rounded-md p-2 items-center justify-between">
          <a
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {originalUrl}
          </a>
        </div>
      )}
    </div>
  );
}
