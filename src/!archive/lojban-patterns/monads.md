## Functor

## Monad

https://stackoverflow.com/questions/2704652/monad-in-plain-english-for-the-oop-programmer-with-no-fp-background

https://medium.com/javascript-scene/javascript-monads-made-simple-7856be57bfe8#:~:text=A%20monad%20is%20a%20way,b)%20%2C%20making%20them%20composable.

take from https://modernweb.com/a-gentle-introduction-to-monads-in-javascript/


search for lisp monads

https://cl-monad-macros.common-lisp.dev/monad-macros.pdf

```clojure
(defun maybe (val)
  (lambda (msg &optional f m)
    (case msg
      ((bind) (if val (funcall f val) m))
      (otherwise val))))

(defun bind (m f)
  (funcall m 'bind f m)) ;message passing

(defun value (m)
  (funcall m 'value))    ; message passig
```

