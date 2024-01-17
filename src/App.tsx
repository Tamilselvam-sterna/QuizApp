import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const theme = createTheme({
    fontFamily: 'Greycliff CF, sans-serif',
    colors: {
      'ocean-blue': [
        '#7AD1DD',
        '#5FCCDB',
        '#44CADC',
        '#2AC9DE',
        '#1AC2D9',
        '#11B7CD',
        '#09ADC3',
        '#0E99AC',
        '#128797',
        '#147885',
      ],
      'bright-pink': [
        '#F0BBDD',
        '#ED9BCF',
        '#EC7CC3',
        '#ED5DB8',
        '#F13EAF',
        '#F71FA7',
        '#FF00A1',
        '#E00890',
        '#C50E82',
        '#AD1374',
      ],
    },
  });

  return (
    <MantineProvider theme={theme}>
      <Notifications zIndex={1000} />
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </MantineProvider>
  );
}
