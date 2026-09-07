'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '../config';

const queryClient = new QueryClient();

// Maps RainbowKit's theme fields onto the app's own CSS variables (see globals.css)
// so the connect modal matches the paper (light) / nocturne (dark) design tokens
// instead of RainbowKit's defaults.
const COLOR_OVERRIDES = {
  accentColor: 'var(--accent)',
  accentColorForeground: 'var(--background)',
  actionButtonBorder: 'var(--border)',
  actionButtonBorderMobile: 'var(--border)',
  actionButtonSecondaryBackground: 'var(--background)',
  closeButton: 'var(--muted)',
  closeButtonBackground: 'var(--background)',
  connectButtonBackground: 'var(--background)',
  connectButtonInnerBackground: 'var(--surface)',
  connectButtonText: 'var(--text)',
  generalBorder: 'var(--border)',
  generalBorderDim: 'var(--border)',
  menuItemBackground: 'var(--background)',
  modalBackground: 'var(--surface)',
  modalBorder: 'var(--border)',
  modalText: 'var(--text)',
  modalTextDim: 'var(--muted)',
  modalTextSecondary: 'var(--muted)',
  profileForeground: 'var(--background)',
  selectedOptionBorder: 'var(--border)',
};

const RADII = {
  actionButton: 'var(--radius)',
  connectButton: 'var(--radius)',
  menuButton: 'var(--radius)',
  modal: 'var(--radius)',
  modalMobile: 'var(--radius)',
};

const FONTS = {
  body: 'var(--font-sans), sans-serif',
};

function withAppTheme(baseTheme) {
  return {
    ...baseTheme,
    colors: { ...baseTheme.colors, ...COLOR_OVERRIDES },
    radii: { ...baseTheme.radii, ...RADII },
    fonts: { ...baseTheme.fonts, ...FONTS },
  };
}

const paperTheme = withAppTheme(lightTheme({ overlayBlur: 'small' }));
const nocturneTheme = withAppTheme(darkTheme({ overlayBlur: 'small' }));

// Mirrors the toggle in Navbar.js: it stores the mode in localStorage under
// 'fundcaster-theme' (defaulting to 'dark') and reflects it as a `data-theme`
// attribute on <html>. We read that same attribute here rather than
// duplicating a separate theme state, so the connect modal always matches
// whatever the rest of the app is currently showing.
function useAppThemeMode() {
  const [mode, setMode] = React.useState('dark');

  React.useEffect(() => {
    const root = document.documentElement;
    const readMode = () => (root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

    setMode(readMode());

    const observer = new MutationObserver(() => setMode(readMode()));
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return mode;
}

export function Providers({ children, initialState }) {
  const mode = useAppThemeMode();

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={mode === 'light' ? paperTheme : nocturneTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
