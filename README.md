# Food-Ordering-Application

### Description
To allow user to view available orders, place orders and view order that has been placed.

### Overview
This app is using [create react script](https://www.npmjs.com/package/react-scripts) for a quick project setup. It is built using these framework and packages as shown below,

[React](https://reactjs.org/)
* A library that adopts component lifecycle to build user interfaces.

[Typescript](https://www.typescriptlang.org/)
* Provides typing for Javascript which helps to save some time to find the error and easier development due to strong typings.

[Material UI](https://material-ui.com/)
* Provides React component UI that comes with material design to speed up development and avoid building complicated UI from raw.

[Axios](https://github.com/axios/axios)
* A promise based http client, similar to [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) but provides more functionality in my opinion.

[Moment](https://momentjs.com/)
* One of the alternative to using [date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) to set complex time format, time zones and provide more built in functionality such as comparing time, etc.

### Structure

As the app is still relevantly small, currently is using in such structure as shown below,

**public**
* Stores public files that mainly used to be stored in server such as s3 bucket, nginx /etc folder, etc.

**src**

Within src will be having the structure as such

`${name}-page`
* If there is a different page (Determined if it is in a different route), it will be separated by different folder. Inside it contains any UI component related to the particular page.

`services`
* Stores mainly any http client calling logic to the server

`util`
* Stores any reusable util for the component UI to consume such as converting date and time, etc.

### How to setup?

**Prerequisite**: Setup the server and ensure that it is running first [here](https://github.com/Billywern/Food-Ordering-API)

Assuming that you have clone the repo, follow this simple step to run the project.
```
npm install

npm run start
```
If your server runs in different port, you can change the port in this path `Food-Ordering-Application\src\services\restaurants.ts`
