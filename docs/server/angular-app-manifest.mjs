
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
    'index.csr.html': {size: 6256, hash: 'dd0f0cddbf4f20827ae4f49cae2874089ade2860614dc6be6b5c1c037c9ab738', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1272, hash: '6d1fd51015b656c0871c2f624e34da3d93c679542b4b61a08622516d0700dacd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'statistics/index.html': {size: 24017, hash: 'c51e902e3cd4921113e2712889764b192c3f85d98b72248521f948ab531f693b', text: () => import('./assets-chunks/statistics_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 20900, hash: '5cb131eec0315ca7b0ddbf30db5e5b8c89a8567c589a0b606f73ac4981ed12c9', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'styles-K4B74LV3.css': {size: 304573, hash: 'fYjp0Co/stQ', text: () => import('./assets-chunks/styles-K4B74LV3_css.mjs').then(m => m.default)}
  },
};
