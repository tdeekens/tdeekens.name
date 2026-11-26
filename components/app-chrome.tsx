import PageControls from '@components/page-controls';
import ShortcutsHelp from '@components/shortcuts-help';
import { useShortcuts } from '@lib/use-shortcuts';
import { useThemeSync } from '@lib/use-theme';
import { useCallback, useState } from 'react';

type TAppChromeProps = {
  /** Current route, e.g. `/blogroll`; scopes page-specific shortcuts. */
  pathname: string;
};

/**
 * Site-wide interactive bits: page controls (shortcuts button, theme toggle),
 * keyboard shortcuts, the shortcuts help dialog and theme sync. Hydrated on
 * every page as one island.
 */
function AppChrome(props: TAppChromeProps) {
  const [helpOpen, setHelpOpen] = useState(false);
  const openHelp = useCallback(() => setHelpOpen(true), []);
  const closeHelp = useCallback(() => setHelpOpen(false), []);

  useShortcuts(props.pathname, openHelp);
  useThemeSync();

  return (
    <>
      <PageControls onOpenShortcuts={openHelp} />
      <ShortcutsHelp
        open={helpOpen}
        onClose={closeHelp}
        pathname={props.pathname}
      />
    </>
  );
}

export default AppChrome;
