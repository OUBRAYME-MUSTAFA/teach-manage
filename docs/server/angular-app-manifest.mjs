
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
    'index.csr.html': {size: 6307, hash: 'ab32960e378e0c7ed8c8b807badc031f43ac0b2a725c45ff309eb0c44d8b6e45', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1323, hash: 'a371e63a3a387abde682e1a6e58853f44f8bc79db6c7ed9548ae558b03935cf3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 20429, hash: '3296d51b37d786b5f9851b29066ce4b110e06db46c27758178e6cd9f71a9e623', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'statistics/index.html': {size: 23586, hash: 'a16ebc77c8addd4e8cc3d5a1c32e1e590b1a19766a1ce2e41dc4ec2bf903a84b', text: () => import('./assets-chunks/statistics_index_html.mjs').then(m => m.default)},
    'styles-K4B74LV3.css': {size: 304573, hash: 'fYjp0Co/stQ', text: () => import('./assets-chunks/styles-K4B74LV3_css.mjs').then(m => m.default)}
  },
};
