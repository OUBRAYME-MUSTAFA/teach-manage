
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
    'index.csr.html': {size: 60994, hash: '6ca088acee817b59f6b56d10b5a5ca3db0fbdb44265214014ee4c04d9fcd24ab', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 56010, hash: '8f27455b0e2ac580c6634dfd0b674194f87ace6c03c983f3a4dc432f9d4e1a1d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'statistics/index.html': {size: 78270, hash: '5c1311c09336611869307ecdc438dc9828212cee5e1b7019d13e5eeaf6d36763', text: () => import('./assets-chunks/statistics_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 75113, hash: '98841136aa38b168719a4cc2575a27d0f2ee620e7f00af392839f16ade7e15d0', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'styles-K4B74LV3.css': {size: 304573, hash: 'fYjp0Co/stQ', text: () => import('./assets-chunks/styles-K4B74LV3_css.mjs').then(m => m.default)}
  },
};
