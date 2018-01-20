Description: This projects seeks to integrate Redux with Petit DOM in a nice manner. Currently, the frontend space is filled with relatively heavy frameworks which make it impossible to get low render times without relying on a microservice, such as a NodeJS server running NextJS, etc. However, this repository seeks to approach the solution in a different manner. Instead of heavily packing an app with well-known dependencies, often which are bloated, we self select petit-dom as a base - a barebones virtual dom library. In addition to this base, we make heavy use of Redux(atleast at the moment), Webpack, and Babel to get a React-Redux Equivalent. In fact, an unoptimized bundling of dependencies and the application yields a two bundles: node.bundle.js with size 68.5kb and app.bundle.js with size 11.5kb. Both of these are unminimized and ungzipped, and tree shaking is not properly implemented. For comparison, React with React-DOM, without any other supporting 3rd party libraries, is 45kb + 549kb unminified, ungzipped, but optimized for treeshaking. Clearly, this is an area that needs to be explored and updates will continue to be pushed here.

For now, I have excluded use of ImmutableJS due to performance hits. While Immutable garuntees the integrity of your state, and forces traceability of state, it does require a bit of overhead. The same can be achieved with mutable structures, so long as you are careful in your implementations.

Things That Easily Can Be Accomplished:
- Lazy Async with Webpack Code Splitting and Dummy Imports
- CSS Modules utilizing some Webpack tricks(hopefully... I can't remember if my abuse of TypeScript was what originally allowed that to occur)
- Virtualized Lists/Views - We'll just have to leverage the IntersectionObserver API and/or it's polyfill
- Using some nice ES6 Features to create a "nice" synatic sugar between Redux and Petit DOM

Things That Will Be Interesting:
- CSS Transitions. More than likely we'll have to follow a classic ng-class like approach from Angular utilizing ternary conditions. Otherwise, I COULD probably polyfill the var() attribute for CSS and get that working
- If I remember my code from yesteryear(about 2 years ago... sitting on a computer somewhere I am not), RxJS can provide the exact functionality of Redux over observable streams. Not only would this lead to a probable decrease in bundle size, but allow a lot more flexibility in how state can be derived and manipulated. This would require massive tree shaking on our part considering the entirely of rxjs unminifed is 422kb vs Redux 26kb. In the short term, Redux is the most efficent library to bundle. Redux Observable, Redux Saga, or Redux Logic will need to be brought in to handle asyncronous actions.

NOTE: This README is a WIP

References:
Petit-DOM: https://github.com/yelouafi/petit-dom
React File Sizes: http://elijahmanor.com/react-file-size/
White papers behind Petit-DOM: https://neil.fraser.name/writing/diff/ and http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.4.6927&rep=rep1&type=pdf
