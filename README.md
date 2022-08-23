# ScissorsPaper.Rocks

ScissorsPaper.Rocks is an example webpage for how to run cellular automata in a browser using WebGL. You can read more about it [here](https://twotwelve.uk/blog/rock-paper-scissors/).



## Local Development

Should be as simple as:

```
git clone git@github.com:two-twelve/scissorspaper.rocks.git
cd scissorspaper.rocks
npm install
npm run watch
```



## Production Deployment

Our production deployment is built by Cloudflare Pages using Node 16. Pages runs `npm run build` and publishes the `dist` directory.