
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/teach-manage/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/teach-manage/dashboard",
    "route": "/teach-manage"
  },
  {
    "renderMode": 2,
    "route": "/teach-manage/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/teach-manage/statistics"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5998, hash: 'c2fc2befb8c9b40f001fc77454ff57c7122762ba066ac1149a798dd410937e67', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1014, hash: 'da118e34b0dfb5929342283dc6cbdc835eb051731d8da3af5c62c3fdc55694bc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 21586, hash: 'ca3566a51bd7416fa65836dc57e0914f9b2c8f755eea659e2c6b66b7983adaf4', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'statistics/index.html': {size: 24124, hash: 'efd8e7dbc2b540cd97c4f34dda4babc449474772181e8d491847ea7c322e810f', text: () => import('./assets-chunks/statistics_index_html.mjs').then(m => m.default)},
    'styles-K4B74LV3.css': {size: 304573, hash: 'fYjp0Co/stQ', text: () => import('./assets-chunks/styles-K4B74LV3_css.mjs').then(m => m.default)}
  },
};
