import React, { useState } from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import locale_en from "react-intl/locale-data/en";
import locale_es from "react-intl/locale-data/es";
import messages_es from "../translations/es.json";
import messages_en from "../translations/en.json";

addLocaleData([...locale_en, ...locale_es]);
const Context = React.createContext();

function IntlProviderWrapper(props) {
  const [state, setState] = useState({
    locale: "en",
    messages: messages_en
  });
  const switchToEnglish = () =>
    setState({ ...state, locale: "en", messages: messages_en });

  const switchToSpanish = () =>
    setState({ ...state, locale: "es", messages: messages_es });

  const { children } = props;
  const { locale, messages } = state;
  return (
    <Context.Provider
      value={{
        ...state,
        switchToEnglish: switchToEnglish,
        switchToSpanish: switchToSpanish
      }}
    >
      <IntlProvider
        key={locale}
        locale={locale}
        messages={messages}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    </Context.Provider>
  );
}

export { IntlProviderWrapper, Context as IntlContext };
