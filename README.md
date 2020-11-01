# Social App - MEAN stack 👋 (Updating...)

## Demo : https://sleepy-caverns-33833.herokuapp.com/ 🎧

Use free database and free hosting so it is very slow

## Sceenshot
![image](https://user-images.githubusercontent.com/53696994/97551784-facf9980-1a05-11eb-88a4-9d8b66234688.png)
![image](https://user-images.githubusercontent.com/53696994/97552745-39198880-1a07-11eb-8d53-e69695dc7dbe.png)
![image](https://user-images.githubusercontent.com/53696994/97552887-5ea69200-1a07-11eb-8164-45ca6e2b8ab9.png)


## Features 🔭

- 🔭 Create post with image
- 🌱 Like, comment, share post
- 👯 Show user profile
- 🥅 Edit profile
- ⚡ Change avatar
- .....

## 🔭 How I implement

### Operation with post 📕

- 🌱 Create _subject_ `update`, which emit a function that change the posts[]
- 🌱 Use `scan` method to create a stream, contain `posts[]` after updated by this function

### Limit amount of posts each time loaded.📕

- 🌱 Create an `observable1$` emit a value when scroll to bottom of page
- 🌱 Create an `observable2$` to load post
- 🌱 Use `exhaustMap` from `RxJS`, so that when I scroll to bottom, it emits a value. After that, it will subscribe observable that load posts. If user keep scrolling to bottom, the value emit from `observable1$` will be skipped, don't create a lot request to server.

