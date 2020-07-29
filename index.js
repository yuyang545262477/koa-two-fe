const Koa = require("koa");
const path = require("path");
const mStatic = require("koa-static");
const mRouter = require("koa-router");
const {historyApiFallback} = require("koa2-connect-history-api-fallback");
const mFS = require("fs");
const mPath = require("path");
const app = new Koa();
const vRouter = new mRouter();
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = "/public";
// app.use(historyApiFallback({
//     htmlAcceptHeaders: ["text/html"],
//     disableDotRule: true,
// }));

app.use(mStatic(path.join(__dirname, staticPath)));

vRouter.all("(.*)", async (ctx) => {
    const isVue = ctx.path.includes("vue-dist");
    ctx.type = "html";
    if (!isVue) {
        ctx.body = await mFS.createReadStream(mPath.join(__dirname, staticPath, "react-dist/index.html"));
    } else {
        ctx.body = await mFS.createReadStream(mPath.join(__dirname, staticPath, "vue-dist/index.html"));
    }
});

// app.use(async (ctx) => {
//     ctx.body = "hello world";
// });
app.use(vRouter.routes());
app.listen(3000, () => {
    console.log("[demo] static-use-middleware is starting at port 3000");
});
