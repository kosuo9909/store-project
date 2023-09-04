import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from './store/store';
import { changeLocale } from './reducers/localeReducer';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router';

const App = () => {
  const locale = useSelector((state: RootState) => state.locale.locale);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState();

  useEffect(() => {
    import(`../src/lang/${locale}.json`).then((langJSON) => {
      setMessages(langJSON);
    });
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
