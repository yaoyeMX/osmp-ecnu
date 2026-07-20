import { router } from '/@/router';

const WUJIE_NAVIGATE_EVENT = 'finDataSynthSecurity-navigate';
const WUJIE_ROUTES = new Set(['/home', '/dataSynthMonitor', '/dataSynthTask', '/blockChainMonitor', '/evidencePreserve']);

interface WujieWindow extends Window {
  __POWERED_BY_WUJIE__?: boolean;
  $wujie?: {
    bus: {
      $on(event: string, handler: (path: string) => void): void;
    };
  };
}

let wujieRouterRegistered = false;

export function setupWujieRouter() {
  const wujieWindow = window as WujieWindow;
  if (!wujieWindow.__POWERED_BY_WUJIE__ || wujieRouterRegistered) return;

  wujieWindow.$wujie?.bus.$on(WUJIE_NAVIGATE_EVENT, (path) => {
    if (WUJIE_ROUTES.has(path) && router.currentRoute.value.path !== path) {
      void router.push(path);
    }
  });
  wujieRouterRegistered = true;
}
