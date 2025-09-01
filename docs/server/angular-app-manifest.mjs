
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
    'index.csr.html': {size: 5998, hash: '29c9311e605b0495ccb88cd0459ac3a68949171e2712f83ab04147feb7926c3c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1014, hash: '57621683b754ae54eb9c003864e894608e368121f46fc7c98e64514082aa0b6b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'statistics/index.html': {size: 22450, hash: '1f6259febbf21fce0873745555dca76fe77d2bda2964b188b8a72299a9196866', text: () => import('./assets-chunks/statistics_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 19912, hash: '924aaf6046fa100b351199b373fb76edaf3adfc956573d1afac4a6f77c3d2d1a', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'styles-K4B74LV3.css': {size: 304573, hash: 'fYjp0Co/stQ', text: () => import('./assets-chunks/styles-K4B74LV3_css.mjs').then(m => m.default)}
  },
};
