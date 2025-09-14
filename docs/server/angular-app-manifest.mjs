
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
    'index.csr.html': {size: 6256, hash: '99415414cab30eff6418a8ec01edb310d6efc22289bed26b667d805206e73c22', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1272, hash: 'a87cf48b74be0a4057c77f36ff82c860baaff45f9aef4a69c709a784a1fdb0a6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'statistics/index.html': {size: 23535, hash: '2e233ab2412ab8cc9a248a69006f65c4d5a13875b9a655cc99b6b9830afbac88', text: () => import('./assets-chunks/statistics_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 20378, hash: 'a71be4f6fcca141e21ffad3dc3183650751e1c214d50b1daa7bd507a717d8aa6', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'styles-K4B74LV3.css': {size: 304573, hash: 'fYjp0Co/stQ', text: () => import('./assets-chunks/styles-K4B74LV3_css.mjs').then(m => m.default)}
  },
};
