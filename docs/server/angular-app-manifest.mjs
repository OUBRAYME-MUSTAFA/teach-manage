
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
    'index.csr.html': {size: 5998, hash: '49d112ce42ffa791b478608a33a0239a5fed16bed2e18db6714f70b27ef6828f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1014, hash: '75bc5e89759ad18719ad07057e51e921f6a8b1149483150cafac992b6e389444', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 19891, hash: '5739cb01dd1a7237295970a6d0b849942bcce767ca2b55bb401153f73674a9f6', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'statistics/index.html': {size: 22429, hash: 'c6f9a15c547134107b8db281db72c57994166c6a5ce6ce6563d1771cdb23c9f6', text: () => import('./assets-chunks/statistics_index_html.mjs').then(m => m.default)},
    'styles-K4B74LV3.css': {size: 304573, hash: 'fYjp0Co/stQ', text: () => import('./assets-chunks/styles-K4B74LV3_css.mjs').then(m => m.default)}
  },
};
