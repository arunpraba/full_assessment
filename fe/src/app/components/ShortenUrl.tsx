export default function ShortenUrl({
  handleSubmit,
  originalUrl,
  setOriginalUrl,
  shortUrl,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  originalUrl: string;
  setOriginalUrl: (url: string) => void;
  shortUrl: string;
}) {
  return (
    <div className="flex flex-col gap-4 my-4">
      <h1 className="text-2xl font-bold">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="w-full flex gap-2">
        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2 flex-1"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Shorten
        </button>
      </form>

      {shortUrl && (
        <div className="flex flex-row bg-gray-100 rounded-md p-2 items-center justify-between">
          <p className="text-sm text-gray-500">Short URL: {shortUrl}</p>
          <button
            className="bg-blue-500 text-white text-sm rounded-md p-2"
            onClick={() => {
              navigator.clipboard.writeText(shortUrl);
              alert("Copied to clipboard");
            }}
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
