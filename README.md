![Node.js CI](https://github.com/choznerol/svelte-work-hour-calculator/workflows/Node.js%20CI/badge.svg?branch=master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/946be83b-5219-48d7-8a3f-2dc8e23dfd4a/deploy-status)](https://app.netlify.com/sites/svelte-work-hour-calculator/deploys)

# 🚧WIP 🚧 彈性工時計算機

讓彈性工時、遠端工作者方便紀錄工時的計算機

## WIPs

- [x] 一鍵紀錄開工、休息、復工的時間點
- [x] 一鍵複製當天工時概要（e.g. 用於公司打卡系統、回報工作狀態）
- [ ] 顯示剩餘工時、預計下班時間
- [ ] 資料同步到 LocalStorage 才不怕重新整理就消失、加個「重設」按鈕
- [ ] UI/UX 優化
- [ ] 使用者偏好設定（e.g. 每日工時、休息事件名稱、工時概要格式...etc）
- [ ] 串接 Slack 即時更新 status（e.g. 開工中、暫離中、預計下班時間...etc）


## Development

This project is based on [sveltejs/template](https://github.com/sveltejs/template) and uses [Svelte](https://svelte.dev), [Rollup](https://rollupjs.org/) and [Jest](https://jestjs.io/).

Run tests
```
$ npm run test   # OR npm run test:watch
```

Local development:
```
$ nvm use        # Or however switch to a Node.js version which matches `.nvmrc`
$ npm install    # Install the dependencies
$ npm run dev    # Run a local dev server with Rollup
$ open http://localhost:5000
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```