
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
    'index.csr.html': {size: 60790, hash: '2ff6be2e4dd4e3775dc21dc367b2890497a08a71bec694584aa5ca4d2c5d30cb', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 55806, hash: '7e7ef6253518796dbe4fc421b202c0b1abb954fb1757d85c79f34b80fa36ae61', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'statistics/index.html': {size: 77567, hash: '6a5977be318d414cb4c7edb63ce02048ab73cb80335b7e9e8cb4f6ade9b40bdc', text: () => import('./assets-chunks/statistics_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 74897, hash: '45ec231c78b03d692da5fe7c52b69470d454afe7cf23cad0eb768648f03e52fd', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'styles-K4B74LV3.css': {size: 304573, hash: 'fYjp0Co/stQ', text: () => import('./assets-chunks/styles-K4B74LV3_css.mjs').then(m => m.default)}
  },
};
