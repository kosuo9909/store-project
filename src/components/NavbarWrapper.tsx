import { IntlProvider } from 'react-intl';
import { RootState } from '../store/store';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocale } from '../reducers/localeReducer';
import { useEffect, useState } from 'react';

const NavbarWrapper = () => {
  const locale = useSelector((state: RootState) => state.locale.locale);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState();

  useEffect(() => {
    import(`../lang/${locale}.json`).then((langJSON) => {
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
    <IntlProvider messages={messages} locale={locale} defaultLocale="bg-BG">
      <Navbar handleLocale={handleLocale} locale={locale} />
    </IntlProvider>
  );
};

export default NavbarWrapper;
