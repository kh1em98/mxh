import { Observable } from "rxjs";

const scrollToBottom$ = new Observable((observer) => {
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      observer.next();
    }
  });
});

export { scrollToBottom$ };
