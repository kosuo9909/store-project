import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from './store/store';
import { changeLocale } from './reducers/localeReducer';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router';
import defaultLocaleJSON from './lang/en-US.json';

const App = () => {
  const locale = useSelector((state: RootState) => state.locale.locale);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState(defaultLocaleJSON);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    let currentRetryCount = 0;

    const loadLangData = async () => {
      try {
        const langJSON = await import(`../src/lang/${locale}.json`);
        setMessages(langJSON);
      } catch (error) {
        if (currentRetryCount < 3) {
          await delay(200);
          currentRetryCount++;
          loadLangData();
        }
      }
    };

    loadLangData();
  }, [locale]);

  const handleLocale = () => {
    if (locale === 'en-US') {
      dispatch(changeLocale('bg-BG'));
    } else {
      dispatch(changeLocale('en-US'));
    }
  };
  return (
    <IntlProvider
      messages={messages}
      key={locale}
      locale={locale}
      defaultLocale="bg-BG"
    >
      <Navbar handleLocale={handleLocale} locale={locale} />
      <Outlet />
    </IntlProvider>
  );
};

export default App;
