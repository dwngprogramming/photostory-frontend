import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import React from "react";

const AfterWord = ({afterword}: {afterword: string}) => {
  return (
    <div>
      <p className="text-2xl text-center text-stone-900 font-serif font-bold mb-6">Sau cùng thì...</p>
      <div className="prose prose-sm font-story overflow-scroll no-scrollbar max-h-[440px]
              text-slate-700 text-left leading-loose tracking-wide mx-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {afterword}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default AfterWord;