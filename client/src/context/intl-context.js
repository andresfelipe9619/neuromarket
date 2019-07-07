import React, { useState, useContext } from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import locale_en from "react-intl/locale-data/en";
import locale_es from "react-intl/locale-data/es";
import messages_es from "../translations/es.json";
import messages_en from "../translations/en.json";

const IntlContext = React.createContext();
addLocaleData([...locale_en, ...locale_es]);

function IntlProviderWrapper({ children }) {
  const [state, setState] = useState({
    locale: "en",
    messages: messages_en
  });

  const switchToEnglish = () =>
    setState({ ...state, locale: "en", messages: messages_en });

  const switchToSpanish = () =>
    setState({ ...state, locale: "es", messages: messages_es });

  const { locale, messages } = state;
  return (
    <IntlContext.Provider
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
    </IntlContext.Provider>
  );
}

function useIntlState() {
  const context = useContext(IntlContext);
  if (context === undefined) {
    throw new Error("useIntlState must be used within a CountProvider");
  }
  return context;
}

export { IntlProviderWrapper, IntlContext, useIntlState };
