SOLID principles are strictly related to **design patterns**. It's important to know design patterns because it's a hot topic for an interview. If you know them, you'll easily understand more sophisticated programming paradigms, architectural patterns, and language features such as _reactive programming_, _flux architecture (Redux)_, _generators in JavaScript_, etc.

[](#what-are-solid-principles)What are SOLID principles?
--------------------------------------------------------

**SOLID** stands for

*   **S — Single responsibility principle**
*   **O — Open closed principle**
*   **L — Liskov substitution principle**
*   **I — Interface segregation principle**
*   **D — Dependency Inversion principle**

These 5 principles will guide you on how to write better code. Though they come from object-oriented programming. I know it's very daring to call JavaScript an object-oriented language :) Regardless, I promise that if you understand these principles, then when you design your next solutions, you will definitely ask yourself "Hey, am I violating the Single-responsibility principle?".

So, let's begin

[](#s-single-responsibility-principle)**S — Single responsibility principle**
-----------------------------------------------------------------------------

It's probably the easiest principle, and at the same time, the most misunderstood one.

> **A module should be responsible for only one actor. As a consequence, it has only one reason to change**

In Lojban you have a statement. dont join with .ije several unrelated statements.

you have a new brivla. dont define it with two unrelated meanings.

#### [](#example)Example

Let's take a look at the following code:  

    class TodoList {
      constructor() {
        this.items = []
      }
    
      addItem(text) {
        this.items.push(text)
      }
    
      removeItem(index) {
        this.items = items.splice(index, 1)
      }
    
      toString() {
        return this.items.toString()
      }
    
      save(filename) {
        fs.writeFileSync(filename, this.toString())
      }
    
      load(filename) {
        // Some implementation
      }
    }
    

Ooops. Even though from first glance, this class seems to be fine, it violates the Single responsibility principle. We added second responsibility to our TodoList class which is the management of our database.

Let's fix the code so that it complies with the "S" principle.  

    class TodoList {
      constructor() {
        this.items = []
      }
    
      addItem(text) {
        this.items.push(text)
      }
    
      removeItem(index) {
        this.items = items.splice(index, 1)
      }
    
      toString() {
        return this.items.toString()
      }
    }
    
    class DatabaseManager {
      saveToFile(data, filename) {
        fs.writeFileSync(filename, data.toString())
      }
    
      loadFromFile(filename) {
        // Some implementation
      }
    }
    

Thus our code has become more scalable. Of course, it's not so obvious when we're looking at small solutions. When applied to a complex architecture, this principle takes on much more meaning.

[](#o-open-closed-principle)**O — Open closed principle**
---------------------------------------------------------

> Modules should be open for extension but closed for modification

That means that if you want to extend a module's behavior, you won't need to modify the existing code of that module.

you can't redefine existing words, grammar structures. they are closed for modification. instead plan new structures that are generic enough for your needs.

#### [](#example)Example

    class Coder {
      constructor(fullName, language, hobby, education, workplace, position) {
        this.fullName = fullName
        this.language = language
        this.hobby = hobby
        this.education = education
        this.workplace = workplace
        this.position = position
      }
    }
    
    class CoderFilter {
      filterByName(coders, fullName) {
        return coders.filter(coder => coder.fullName === fullName)
      }
    
      filterBySize(coders, language) {
        return coders.filter(coder => coder.language === language)
      }
    
      filterByHobby(coders, hobby) {
        return coders.filter(coder => coder.hobby === hobby)
      }
    }
    
    

The problem with `CoderFilter` is that if we want to filter by any other new property we have to change `CodeFilter`'s code. Let's solve this problem by creating a `filterByProp` function.  

    const filterByProp = (array, propName, value) =>
      array.filter(element => element[propName] === value)
    

[](#l-liskov-substitution-principle)**L — Liskov substitution principle**
-------------------------------------------------------------------------

A principle with the most confusing name. What does it mean?

> If you have a function, that works for a base type, it should work for a derived type

mostly about signatures. what's true for a danlu is true for a mlatu

can't redefine private props. can we? no, immutability of brivla, if you need in place modifications, use wrappers (UI, brode be lo ka broda)

Let's go with a classic example

#### [](#example)Example

    class Rectangle {
      constructor(width, height) {
        this._width = width
        this._height = height
      }
    
      get width() {
        return this._width
      }
      get height() {
        return this._height
      }
    
      set width(value) {
        this._width = value
      }
      set height(value) {
        this._height = value
      }
    
      getArea() {
        return this._width * this._height
      }
    }
    
    class Square extends Rectangle {
      constructor(size) {
        super(size, size)
      }
    }
    
    const square = new Square(2)
    square.width = 3
    console.log(square.getArea())
    

Guess what will be printed to the console. If your answer is `6`, you are right. Of course, the desired answer is 9. Here we can see a classic violation of the Liskov substitution principle.

By the way, to fix the issue you can define `Square` this way:  

    class Square extends Rectangle {
      constructor(size) {
        super(size, size)
      }
    
      set width(value) {
        this._width = this._height = value
      }
    
      set height(value) {
        this._width = this._height = value
      }
    }
    

[](#i-interface-segregation-principle)**I — Interface segregation principle**
-----------------------------------------------------------------------------

> Clients should not be forced to depend upon interfaces that they do not use

neither does lojban have them.
can we have classes in lojban?
ce'u

There are no interfaces in JavaScript. There is a way to mimic their behavior, but I don't think there's much sense. Let's better adapt the principle to the js world.

#### [](#example)Example

Let's define an "abstract" `Phone` class which will play role of the interface in our case:  

    class Phone {
      constructor() {
        if (this.constructor.name === 'Phone')
          throw new Error('Phone class is absctract')
      }
    
      call(number) {}
    
      takePhoto() {}
    
      connectToWifi() {}
    }
    

Can we use it to define an iPhone?  

    class IPhone extends Phone {
      call(number) {
        // Implementation
      }
    
      takePhoto() {
        // Implementation
      }
    
      connectToWifi() {
        // Implementation
      }
    }
    

Okay, but for an old Nokia 3310 this interface will violate the "I" principle  

    class Nokia3310 extends Phone {
      call(number) {
        // Implementation
      }
    
      takePhoto() {
        // Argh, I don't have a camera
      }
    
      connectToWifi() {
        // Argh, I don't know what wifi is
      }
    }
    

[](#d-dependency-inversion-principle)**D — Dependency Inversion principle**
---------------------------------------------------------------------------

> High-level modules should not depend on low-level modules

we need classes in lojban

Let's take a look at the following example:

#### [](#example)Example

    class FileSystem {
      writeToFile(data) {
        // Implementation
      }
    }
    
    class ExternalDB {
      writeToDatabase(data) {
        // Implementation
      }
    }
    
    class LocalPersistance {
      push(data) {
        // Implementation
      }
    }
    
    class PersistanceManager {
      saveData(db, data) {
        if (db instanceof FileSystem) {
          db.writeToFile(data)
        }
    
        if (db instanceof ExternalDB) {
          db.writeToDatabase(data)
        }
    
        if (db instanceof LocalPersistance) {
          db.push(data)
        }
      }
    }
    

In this case, a high-level module `PersistanceManager` depends on the low-level modules, which are `FileSystem`, `ExternalDB`, and `LocalPersistance`.

To avoid the issue in this simple case we should probably do something like this:  

    class FileSystem {
      save(data) {
        // Implementation
      }
    }
    
    class ExternalDB {
      save(data) {
        // Implementation
      }
    }
    
    class LocalPersistance {
      save(data) {
        // Implementation
      }
    }
    
    class PersistanceManager {
      saveData(db, data) {
        db.save(data)
      }
    }
    

Of course, this is an oversimplified example, but you've got the point.

[](#conclusion)Conclusion
-------------------------

The value of SOLID principles is not obvious. But if you ask yourself "Am I violating SOLID principles" when you design your architecture, I promise that the quality and scalability of your code will be much better.

Thanks a lot for reading!  
Feel free to follow me here on DEV.to and also on Twitter ([@DenisVeleaev](https://twitter.com/DenisVeleaev))

Peace!

JavaScript Singleton
====================

The _Singleton_ Pattern limits the number of instances of a particular object to just one. This single instance is called the singleton.

We need instance in lojban. just global? no.

Using Singleton
---------------

Singletons are useful in situations where system-wide actions need to be coordinated from a single central place. An example is a database connection pool. The pool manages the creation, destruction, and lifetime of all database connections for the entire application ensuring that no connections are 'lost'.

Singletons reduce the need for global variables which is particularly important in JavaScript because it limits namespace pollution and associated risk of name collisions. The Module pattern (see our [Dofactory JS](/products/dofactory-js) product) is JavaScript's manifestation of the Singleton pattern.

Several other patterns, such as, Factory, Prototype, and Façade are frequently implemented as Singletons when only one instance is needed.

Participants
------------

The objects participating in this pattern are:

* **Singleton** \-\- In example code: **Singleton**
    * defines getInstance() which returns the unique instance.
    * responsible for creating and managing the instance object.

Example
-------

The `Singleton` object is implemented as an _immediate anonymous function_. The function executes immediately by wrapping it in brackets followed by two additional brackets. It is called anonymous because it doesn't have a name.

The `getInstance` method is Singleton's gatekeeper. It returns the one and only instance of the object while maintaining a private reference to it which is not accessible to the outside world.

The `getInstance` method demonstates another design pattern called Lazy Load. Lazy Load checks if an instance has already been created; if not, it creates one and stores it for future reference. All subsequent calls will receive the stored instance. Lazy loading is a CPU and memory saving technique by creating objects only when absolutely necessary.

Singleton is a manifestation of a common JavaScript pattern: the Module pattern. Module is the basis to all popular JavaScript libraries and frameworks (jQuery, Backbone, Ember, etc.). To learn how to benefit from Module, Lazy Load and many other JavaScript patterns in your own projects, check out our unique [Dofactory JS](/products/dofactory-js).

## Code

```javascript
var Singleton = (function () {
    var instance;

    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

function run() {

    var instance1 = Singleton.getInstance();
    var instance2 = Singleton.getInstance();

    console.log("Same instance? " + (instance1 === instance2));
}
```


# FP

Summary: _The SOLID principles are guidelines for writing good Object-Oriented code. It turns out that these principles are followed and embodied in Clojure._

Robert C. Martin (Uncle Bob) has named five basic principles of software design called _SOLID_. It's an acronym that helps people remember them. I really like these kinds of mnemonics because, well, we all need help remembering things. The easier to remember, the more we can learn.

Through lots of experience designing software, these principles were developed to help make software that is maintainable in the long term. It's a boon to the OO world that these and similar principles have been talked about so much. They've been identified, digested, named, and codified. And now you can speak about them and people know what you mean. This kind of thing is strangely lacking in the world of functional programming.

Why is this so? Perhaps it's that there hasn't been much use of functional programming in the software engineering industry in the last few decades. Some might say that these kinds of principles are not needed in FP. Regardless of why, it is a common frustration among people who switch from OOP to FP. I am often asked "How do I structure my code?" and "Where are all of the design guidelines?"

Well, I want to say that functional programmers _do design their code_. And they do follow principles. There just hasn't been enough people churning through them all to come up with catchy acronyms and names. Many of the same principles apply.

Today I'm going to go through the SOLID principles and show how they are manifest in Clojure. Let's do this one letter at a time.

### **_S_**ingle Responsbility Principle

How much should one class do? The _Single Responsibility Principle (SRP)_ says _one thing_. And the way you count the things it can do is by counting the _reasons it may change_. For instance, if you have a class that is responsible for reading in records from a database and displaying them to the user, that's actually _2 reasons to change_. One reason is if the database schema changes. The other is if the design of the display changes. That's a violation of the principle and you should consider splitting up that class along those two lines.

Believe it or not, this comes up a lot in Clojure. You don't program much with classes, but you do program with functions. It's very common to see a function that reads in from a database then formats a string for display, maybe even printing it out!

```clojure
    (defn display-records []
      (let [records (sql/query "SELECT * FROM ...")
            record-string (str/join "\n" (for [r records]
                                           (str (:first-name r) (:last-name r) (:id r))))]
        (println record-string)))
```    

That's doing three things and it's pretty obviously violating the SRP. The fix in Clojure is to refactor this into separate functions.^[1](#fn1)

```clojure
    (defn fetch-records []
      (sql/query "SELECT * FROM ..."))
    
    (defn record->string [record]
      (str (:first-name record) (:last-name record) (:id record)))
    
    (defn records->string [records]
      (str/join "\n" (map record->string records)))
```    

Then `display-records` just ties them together. You still need one that does everything. How many reasons does it have to change now? You don't need to change it if the schema changes. You don't need to change it if the format changes. I'll leave that as an exercise for you.

```clojure
    (defn display-records []
      (-> (fetch-records)
          records->string
          println))
```    

### **_O_**pen/Closed Principle

What happens if you're using a library and you like what it does but you need to do it slightly differently? It would be terrible if you just changed the source code for that library. What else was depending on it? What might break? The _Open/Closed Principle (OCP)_ states that we should be able to extend the functionality without changing the module.

The OCP is something Clojure does extremely well. In Clojure, we can extend existing protocols and extend existing classes without breaking existing code. For instance, let's say I have written this nice protocol called `ToDate` that has one method that converts something to a `java.util.Date`.

```clojure
    (defprotocol ToDate
      (to-date [x]))
```    

Obviously, to make it useful I'll have to implement it somewhere. I can take this protocol and implement it with existing classes without modifying the classes themselves.

```clojure

    (extend-protocol ToDate
      String ;; strings get parsed
      (to-date [s]
        (.parse (java.text.SimpleDateFormat. "ddMMyyyy") s))
      Long   ;; longs are unix timestamps
      (to-date [l]
        (java.util.Date. l))
      java.util.Date ;; Dates are just returned
      (to-date [d] d))
```    

Look at that! Now I can run this:

```clojure
    (to-date "08082015")
    
    ;;=> #inst "2015-08-08T05:00:00.000-00:00"   
```

Or this:
```clojure
    (to-date 0)
    
    ;;=> #inst "1970-01-01T00:00:00.000-00:00"
    
```

### **_L_**iskov Substitution Principle

Are queues and stacks subclasses of each other? They both have the same interface (`push` and `pop`), but semantically, they're quite different. Stacks are Last-In-First-Out and queues are First-In-First-Out. The _Liskov Substitution Principle (LSP)_ states that a subclass should be able to be substituted for its superclass. You can't replace a stack with a queue (or vice versa), so they're not really subclasses of each other.

LSP is mostly about subclass hierarchies, which are rare in Clojure. But Clojure is built on the class hierarchies of Java. And the core types, which are written in Java, are well-designed with respect to this principle.

A simple example is the variety of `clojure.lang.APersistentMap` implementations. They each have different performance characteristics but they maintain the relevant [semantics](/guide/clojure-collections#two-layers) of maps. There are :

*   `PersistentArrayMap`
*   `PersistentHashMap`
*   `PersistentStructMap`
*   `PersistentTreeMap`

Because they all have compatible semantics according to LSP, the runtime can choose between them freely without you ever having to know or care.

### **_I_**nterface Segregation Principle

If I use some API and one of the methods I use changes, I can accept that I'll have to change my code. But if one of the methods _I didn't use_ changes, it would be aggravating if I had to change something on my end. I shouldn't even have to know about those methods even existing. One way to prevent this nuissance is by applying the _Interface Segregation Principle (ISP)_. It states that you should split up your interfaces into smaller interfaces, typically so that they have _one reason to change_. Now clients are only affected by changes that are relevant to them.

ISP is prevalent in Clojure. Much more so than in typical Java systems. Just look at the size of the interfaces in `clojure.lang`. So small! Here's a typical one:

```
    class: clojure.lang.Associative
    
    methods: containsKey, entryAt, assoc
```    

These methods correspond to the typical map operations of `containsKey`, `get`, and `put` respectively. These three methods are highly cohesive. Contrast this with [`java.util.Map`](http://docs.oracle.com/javase/7/docs/api/java/util/Map.html), which has 14. Now, all of the functionality of Java maps are in Clojure maps, they're just segregated to different, reusable interfaces.

For instance, the `size` method `java.util.Map` is a separate, 1-method interface called `clojure.lang.Counted`. Clojure applies the ISP very thoroughly, and ClojureScript slightly more so.

### **_D_**ependency Inversion Principle

A module often depends on a lower-level module for the implementation details. This tightly couples the higher-level module to the decisions of the implementation module. For instance, if I have a reporting module that depends on the SQL query module to get its data, the reporting module is indirectly tied to the SQL database. The _Dependency Inversion Principle (DIP)_ inserts an interface between layers. In our example, the reporting module will depend on a Data Source interface. And the SQL module will implement the Data Source interface. You could switch out the SQL module for a file-storage module and the reporting module wouldn't have to know.

Clojure uses the DIP everywhere. For instance, the core function `map` does not operate on any fixed data type—only abstractions. It operates on the `clojure.lang.IFn` abstraction, which is the interface functions implement. It also operates on the `seq` abstraction, which defines orders for [collections](/guide/clojure-collections), iterables, and other types. This makes `map` decoupled from any particular type and thus more generally useful. The same principle holds for many of the core library functions. By applying DIP universally, Clojure is made more powerful because functions can be reused more often.

### Conclusions

The SOLID principles are important guidelines for designing software that will last. They guide us to make more useful, reusable components. However, they must be repeated a lot in language communities like Java because Java does not make them very easy to apply. In Clojure, the principles are present everywhere. One of the things I like about Clojure is how it seems to embody a lot of the lessons of the last 20 years of software engineering. And that's one of the things I like to bring up in the [_PurelyFunctional.tv Online Mentoring_](https://ericnormand.podia.com/) course. One of the reasons Clojure is making such big waves is that it has integrated good engineering principles, like SOLID, [immutable](/guide/clojure-concurrency#ds) values, and concurrency right into the core.

* * *

1.  \[`->` is an idiom in Clojure (not syntax, just a naming scheme). It means "transform to" and is pronounced "to". For instance, `record->string` is read "record to string".[↩](#fnref1)\]{#fn1}


SOLID Principles in Clojure
===========================

The [SOLID principles](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) are an important part of the apprenticeship and the main idea behind them is to make code easy to change and maintain. In Java this is done through clear responsibilities for objects and creating the right abstractions for your application/program.

Now that I have started to write TicTacToe in Clojure I was having a hard time seeing how the SOLID principles applied in functional programming, if at all. But I watched [this](http://www.infoq.com/presentations/SOLID-Clojure) great talk by Colin Jones, a craftsman at 8th Light in Chicago, and it started to make a lot more sense.

S — ingle Responsibility Principle
==================================

This is probably the most easy principle to apply to functional programming. It says that a class should only have one responsibility. As you don’t use classes within a program that much, it makes more sense to apply this at a lower level to functions. I have already started to spot this in my code. I have a function that checks a certain condition exists and if it does then executes another function. If I was to extract out the condition it would not only make the function easier to read, but also to change.

Here is a simple example:

```clojure
(if (= "X" player ) (str "X") (str "O))
```
could be changed to:
```clojure
(defn player-x \[\] (= "X" player))((if (player-x) (println (str “X”)) (println(str “O")))
```
O — pen Close Principle
=======================

The OCP says that a class should be open for extension and closed for modification. That means that if you want to add new functionality to a class, you should be able to do this without changing old code.

In OO to change this you would typically use dependency injection. Or wrap a class to retrieve the behaviour you want from it. This can be done in a similar way using protocols or multi-methods in Clojure.

cond is used in Clojure to create a conditional branches (similar to switch statements in Java) which can make the code hard to change and violates the OCP.

To solve this problem, it is possible to use protocols or multi-methods to ensure you don’t change the existing code. These are similar to interfaces, but dispatch code to different functions depending on the arguments passed to them (multi-methods) or create functions on existing data types (protocols).

L — iskov Substitution Principle
================================

When you write an interface or superclass that has certain behaviour, the classes that implement that behaviour should behave in a similar enough way that they are inter-changeable. An is-a relationship is not enough, it should also behave the same.

This is again possible in Clojure due to the use of multi-methods and protocols, but again is more about choosing the right abstraction and knowing how you need an implementation to behave for a client to be able to use it and make certain assumptions about it.

I-nterface Segregation Principle
================================

Abstractions are easier to think about if they are smaller. Clients should not think about abstractions they are not going to use. They don’t need to know about details they are not going to use either. In Clojure, again multi-methods and protocols are similar enough to interfaces in Java so the same rule can be applied to these. They should be split so they are small enough understand clearly.

D — ependency Inversion Principle
=================================

This is one of the principles I found the hardest to get my head around initially. The easiest way to recognise when you have violated this principle is when one change causes a change in many other classes, in many other places. This is something that I have started to recognise a lot in my previous code. Higher level modules depend on lower level details. Clients of those classes are forced to use assumptions you have made. So if you want to implement a new way to carry out a high level policy, you will be limited because it is hidden within a low level module.

The way to fix this in OOP is to introduce an Interface. In Clojure it is possible to use a protocol which extends the data type you would like to use and dispatches the call to the relevant java type. Again it is important to recognise where your code is likely to change and then create the relevant protocol bit the idea is similar to OOP.

All in all , writing functionally makes it harder to violate SOLID but it is still possible, (I’m sure I’ve found new and unique ways to do this!) It is something that I did not see when I started to write my Tic Tac Toe and I thought maybe that when you write functionally you avoid the pitfalls of violating SOLID principles. I now think that even though it might happen at a lower level, it is definitely possible to violate the SOLID principles so this is something I am going to bare in mind when I write more Clojure and definitely have some refactoring to do!