import { IntlContext } from "@/providers/IntlProvider";
import { useContext } from "react";

export const useLang = () => {
  const { lang, text } = useContext(IntlContext);

  return { lang, text };
};
