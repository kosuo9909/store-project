import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { LOCALES } from '../i18n/locale';
import { changeLocale } from '../reducers/localeReducer';

function Navbar() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const reduxLocale = useSelector((state: RootState) => state.locale.locale);
  const locale = LOCALES[reduxLocale as keyof typeof LOCALES];

  const handleLocale = () => {
    if (reduxLocale === 'en-US') {
      dispatch(changeLocale('bg-BG'));
      window.location.reload();
    } else {
      dispatch(changeLocale('en-US'));
      window.location.reload();
    }
    console.log('working, locale is' + reduxLocale);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {intl.formatMessage({ id: 'home' })}
            </Typography>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to="add">
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  {intl.formatMessage({ id: 'addNavButton' })}
                </Button>
              </Link>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
              }}
            >
              <Button
                onClick={handleLocale}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {locale === 'bg-BG' ? 'Switch to English' : 'Промени език'}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
export default Navbar;
