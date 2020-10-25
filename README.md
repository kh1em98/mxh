# Angular Social App - 👋 (Updating...)

## Features 🔭 
- 🔭 Create post with image
- 🌱 Like, comment, share post
- 👯 Show user profile
- 🥅 Edit profile
- ⚡ Change avatar
- .....

## 🔭 How I implement 

### Operation with post 📕 
- 🌱 Create *subject* ```update```, which emit a function that change the posts[]
- 🌱 Use ```scan``` method to create a stream, contain ```posts[]``` after updated by this function

### Limit amount of posts each time loaded.📕 
- 🌱 Create an ```observable1$``` emit a value when scroll to bottom of page
- 🌱 Create an ```observable2$``` to load post
- 🌱 Use ```exhaustMap``` from ```RxJS```, so that when I scroll to bottom, it emits a value. After that, it will subscribe observable that load posts. If user keep scrolling to bottom, the value emit from ```observable1$``` will be skipped, don't create a lot request to server.




