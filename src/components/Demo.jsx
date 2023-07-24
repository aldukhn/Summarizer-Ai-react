import React, { useEffect, useState } from "react";
import { AiOutlineCopy, AiOutlineEnter, AiOutlineLink } from "react-icons/ai";
import { useLazyGetSummaryQuery } from "../redux/article";
import { loader } from "../assets";
import { TiTick } from "react-icons/ti";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticle, setAllArticle] = useState([]);
  const [copied, setCopied] = useState("");
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articalsFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articalsFromLocalStorage) {
      setAllArticle(articalsFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticle = [newArticle, ...allArticle];

      setArticle(newArticle);
      setAllArticle(updatedAllArticle);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticle));
    }
  };
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <AiOutlineLink className="absolute left-0 my-2 ml-3 w-5" />
          <input
            type="url"
            placeholder="Enter the article URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:gray-700 peer-focus:text-gray-700"
          >
            <AiOutlineEnter />
          </button>
        </form>
        {/*URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticle.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                {copied === item.url ? (
                  <TiTick />
                ) : (
                  <AiOutlineCopy className="w-[40%] h-[40%] object-contain" />
                )}
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* display results here */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-10 h-20 origin-center" />
        ) : error ? (
          <p
            className={`font-inter font-bold text-center dark:text-white text-black `}
          >
            Something went wrong <br />
            <span className="font-satoshi font-normal dark:text-gray-300 text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold dark:text-gray-300 text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm dark:text-gray-300 text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
