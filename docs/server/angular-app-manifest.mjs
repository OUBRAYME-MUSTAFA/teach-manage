
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
    'index.csr.html': {size: 60994, hash: 'ad632d47644b89eb8154502642309c907f46125d147cf193c38fdf8858fc503d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 56010, hash: 'c2282937cdd72537e1f469c2df6ccbdaedbce10b552521ccbe5cc46aa5624a42', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 75113, hash: '6e46fe422b3a35461585065faed2ad1b4062363a86b8b51decf7d23b0e8680ab', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'statistics/index.html': {size: 78270, hash: 'b46c9f79dd100dd5f44c1831c304649c6ca545446ccc2cda4c40a80aed12b158', text: () => import('./assets-chunks/statistics_index_html.mjs').then(m => m.default)},
    'styles-K4B74LV3.css': {size: 304573, hash: 'fYjp0Co/stQ', text: () => import('./assets-chunks/styles-K4B74LV3_css.mjs').then(m => m.default)}
  },
};
