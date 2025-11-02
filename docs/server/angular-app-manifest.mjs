
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
    'index.csr.html': {size: 6256, hash: 'd5081716e5ac52d1e089dc00655b4964405d5825462e8071e98cc8cb70545179', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1272, hash: 'f2dd0da855799a19537f0e1cc0c96c6ea83df83960fdc67f96dfec169f785bb3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 20814, hash: 'd11cd1a62d5943070b9698eb5bf1d0dd79f7bcfa83ab196bcf417328f3113522', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'statistics/index.html': {size: 23931, hash: 'a2e521d2816871daacc8fb6f96456c253a01b76a37617b146a2cebaa47c8b8f7', text: () => import('./assets-chunks/statistics_index_html.mjs').then(m => m.default)},
    'styles-K4B74LV3.css': {size: 304573, hash: 'fYjp0Co/stQ', text: () => import('./assets-chunks/styles-K4B74LV3_css.mjs').then(m => m.default)}
  },
};
