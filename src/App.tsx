import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { changeLocale } from './redux/reducers/localeReducer';
import Navbar from './components/Navbar';
import { IntlProvider } from 'react-intl';
import { Outlet } from 'react-router';

const App = () => {
  const locale = useSelector((state: RootState) => state.locale.locale);
  const dispatch = useDispatch();
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [messages, setMessages] = useState({});
  const [isLoadLangSuccessful, setIsLoadLangSuccessful] = useState(false);
  const localeChangeCall = useRef(0);

  useEffect(() => {
    let currentRetryCount = 0;

    const currentLocaleChangeCall = localeChangeCall.current;

    localeChangeCall.current += 1;

    const loadLangData = async () => {
      try {
        const langJSON = await import(`../src/lang/${locale}.json`);

        if (currentLocaleChangeCall === localeChangeCall.current - 1) {
          setMessages(langJSON);
          setIsLoadLangSuccessful(true);
        }
      } catch (error) {
        if (
          currentRetryCount < 3 &&
          currentLocaleChangeCall === localeChangeCall.current - 1
        ) {
          await delay(200);
          currentRetryCount++;
          loadLangData();
          setIsLoadLangSuccessful(false);
        }
      }
    };

    loadLangData();
  }, [locale]);

  const handleLocale = () => {
    if (locale === 'en-US' && isLoadLangSuccessful) {
      dispatch(changeLocale('bg-BG'));
    } else if (locale === 'bg-BG' && isLoadLangSuccessful) {
      dispatch(changeLocale('en-US'));
    }
  };

  if (!isLoadLangSuccessful) {
    return <div>Loading translations...</div>;
  }

  return (
    <IntlProvider
      messages={messages}
      key={locale}
      locale={locale}
      defaultLocale="en-US"
    >
      <Navbar handleLocale={handleLocale} locale={locale} />
      <Outlet />
    </IntlProvider>
  );
};

export default App;
