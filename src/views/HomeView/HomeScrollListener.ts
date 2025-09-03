import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const HomeScrollListener = () => {
  const searchParams = useSearchParams();
  const isScrollToQuiz = searchParams?.get('scroll_quiz');

  useEffect(() => {
    if (isScrollToQuiz) {
      document
        .querySelector('#hn-quiz')
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isScrollToQuiz]);

  return null
};

export default HomeScrollListener;