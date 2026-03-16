---
title: Formal gismu
meta.type: korpora
meta.description: Gismu definitions with place type annotations.
---

## Gismu place type system

This file specifies a type system for annotating gismu places in `formal-gismu.tsv`, written in a style similar to TypeScript or Rust type definitions.

Each place \(x_1, x_2, …\) in a definition is immediately followed by its type in parentheses, for example:

`x_1 (Entity) does x_2 (Event) to x_3 (Entity)`

In the TSV we still use human‑readable phrases like `set of Entity`, but conceptually these are instances of generic type constructors such as `Set<Entity>`.

---

### 1. Base types (like TypeScript primitives)

Think of these as simple nominal types:

```ts
type Entity
type Object extends Entity
type Organism extends Entity
type Location extends Entity
type Language extends Entity
type Taxon
type Text
type Sound
type Number
type TimeInterval
```

- **Entity**: generic individual – person, object, place, institution, language, organism, etc. Default for “thing‑like” places.
- **Object**: physical entity; used when the definition clearly implies physicality and this contrast is useful.
- **Organism**: living being (animal, plant, microbe). Often we still annotate with **Entity** for simplicity.
- **Location**: spatial region, place, site, address, etc.; a specialized **Entity** used where place‑ness matters.
- **Language**: human or constructed language (e.g. Lojban, English, Mandarin). Used for places that are explicitly “language” rather than generic entities.
- **Taxon**: species / breed / strain / genus / variety descriptor.
- **Text**: string, written form, sentence, name, title, dictionary entry, etc.
- **Sound**: non‑propositional acoustic event (voice, noise, tone, animal cry).
- **Number**: numeric value, cardinal, measure, or mathematical result.
- **TimeInterval**: span of time considered as an object (elapsed time) distinct from any particular event.

In `formal-gismu.tsv` these appear as `Entity`, `Object`, `Location`, etc. inside the parentheses after each place.

---

### 2. Abstractors as type constructors

Abstractors correspond to type constructors over some underlying content:

```ts
type Event<T = unknown>        // nu T
type Proposition<T = unknown>  // du'u T
type Idea<T = unknown>         // si'o T
type Scale<T = unknown>        // si'o used as a measurement scale
type Abstraction<T = unknown>  // generic nu/ka/ni/si'o/du'u when not pinned down
type Standard extends Idea<unknown> // si'o used specifically as a normative or measurement standard
```

- **Event<T>**: reified occurrence, process, action, or state (`nu`). Used for “event / state / process” unless the gismu is explicitly about propositions or properties. In the TSV we normally just write **event (nu)**.
- **Proposition<T>**: truth‑evaluated content (`du'u`), e.g. what is believed, known, claimed. In the TSV we write **proposition (du'u)**.
- **Idea<T>**: conceptualization or mental image (`si'o`) not tied to numeric measurement.
- **Scale<T>**: `si'o` used as a scale for measuring values of type `T`. For example, a temperature scale might be `Scale<Property<Entity>>`.
- **Standard**: special case of `si'o` used as a **standard, norm, benchmark, reference frame, or measurement standard** (“by standard …”). In `formal-gismu.tsv` we normally render this as `x_n (si'o, Standard)`. It can cover both:
  - *normative* standards (cultural, moral, aesthetic, etc.), and
  - *measurement* standards (unit systems, reference expectations, etc.),
  whenever the original gismu says “by standard …”, “as compared with standard …”, or “in standard …`.
- **Abstraction<T>**: used when the original definition says “abstraction” and several abstractors are possible; in the TSV we may still say “abstraction” and, if helpful, clarify likely `nu` / `ka` / `ni` / `du'u`.

---

### 3. Generics for collections

We model collections explicitly with generics:

```ts
type Set<T>      // extension set of T (lo'i)
type Sequence<T> // ordered collection of T
type Group<T>    // mass / collective of T (loi)
```

- **Set<T>**: extension set where membership is important, e.g. `Set<Entity>`. TSV form: `set of Entity`, `set of Text`, etc.
- **Sequence<T>**: ordered collection, e.g. `Sequence<Text>` for an ordered list of words. TSV form: `sequence of Text`, `sequence of Entity`.
- **Group<T>**: collective mass, e.g. `Group<Entity>` for a crowd of people. TSV form: `group of Entity`, `group of Organism`.

When annotating a place, we instantiate these:

- `x_2 (set of Entity)` ⇔ `x_2: Set<Entity>`
- `x_3 (sequence of Text)` ⇔ `x_3: Sequence<Text>`
- `x_1 (group of Entity)` ⇔ `x_1: Group<Entity>`

---

### 4. Properties, quantities, and relations

Here we make the dependency on argument places explicit with generics. Conceptually:

```ts
type Property<Args> // ka over one or more arguments
type Amount<Arg>    // ni over one argument
type Relation<Args> // relation over 2+ arguments
```

Where:

- **Args** can be a single type like `Entity`, or a tuple like `[Entity, Entity]` if the property depends on multiple arguments.

Examples:

- **Property<Entity>**: property of a single argument, commonly written in TSV as **property of x₁ (ka)**.
- **Two-argument “property of x₁ and x₂”**: this is in fact a relation between two places; in TSV we use **Relation<x_i, x_j>** (see below), not “property of x₁ and x₂”.
- **Amount<Entity>**: quantitative `ni` abstract over one argument, TSV: **amount of x₁ (ni)**.
- **Relation<Args>**: a relation over two or more arguments. **Relation is not a subtype of Property (ka)**; it is its own type. In TSV we use one of three strict flavors:

  1. **Relation of members of xᵢ** — the relation holds among elements of the set (or sequence/group) given by argument xᵢ. Use when the place is “the relation among the members of [some set argument]”.
     - Conceptually: the relation’s domain is the set of members of xᵢ.
     - TSV (strict, TypeScript-like): `Relation<members of x_i>`.

  2. **Relation of xᵢ and xⱼ** (and optionally more) — the relation holds between (or among) the specific arguments listed. Use when the place is “the relation between xᵢ and xⱼ”.
     - Conceptually: `Relation<[T_i, T_j]>` where the types match those of the listed places.
     - TSV (strict, TypeScript-like): `Relation<x_i, x_j>` or `Relation<x_i, x_j, x_k>`.

  3. **Relation of each pair of members of xᵢ** — xᵢ is a Set (or collection), and the place is a binary relation that holds between each pair of (distinct) members of xᵢ. Use when the predicate is about a mutual or pairwise relation over a set.
     - Conceptually: a relation on the set xᵢ, i.e. pairs of members of xᵢ.
     - TSV (strict, TypeScript-like): `Relation<Pair<members of x_i>>`.

In English glosses, phrases like “activity of x₁” or “role of x₂” are always modeled as `Property<…>` over the appropriate argument(s); there is no separate `Activity` base type.

In practice, the TSV file uses the human‑readable form (“property of x₁”, “amount of x₂”, and one of the three relation forms above), but those are just concrete instances of `Property<…>`, `Amount<…>`, and `Relation<…>`.

---

### 5. Typing patterns for common roles

Several semantic roles are common enough that we standardize their shape:

- **Container<T>** (conceptual, not a separate nominal type): implemented as `Entity`, but we describe the role in English as “container for x₂ (Entity)”. Think of it as:

  ```ts
  type Container<T> = Entity
  ```

- **RoleOf<T>**: roles / jobs / functions of some bearer, implemented as `Property<T>` and written in TSV as “property of xᵢ (ka)” or “role of xᵢ`.

  ```ts
  type RoleOf<T> = Property<T>
  ```

- **MeasurementOf<T>**: numeric or unit‑bearing measurement of some argument:

  ```ts
  type MeasurementOf<T> = {
    value: Number
    scale: Scale<Property<T>> | Scale<Amount<T>> | Scale<unknown>
  }
  ```

  In TSV we usually flatten this, e.g. `x_1 (Entity) is x_2 (Number) units on scale x_3 (scale of property of x_1)`.

For **comparisons** (equality, excess, less‑than), the predicate is generic in a single type parameter `T`; both compared places have type `T`:

```ts
// Both x_1 and x_2 have type T (e.g. Entity, or Entity | Amount<Entity>)
type ComparablePair<T> = [T, T]
type Equal<T> = ComparablePair<T>       // dunli
type LessThan<T> = ComparablePair<T>   // mleca
type Excess<T> = ComparablePair<T>     // dukse, zmadu
```

In TSV we use a **prenex** to declare the type parameter, then use **`T`** in both compared places:

- **Prenex**: at the start of the definition, declare **`T`** with its constraint, e.g. **`T: Entity.`** or **`T: Entity or Amount<Entity>.`** (read as “T is a type, constrained to Entity” / “T is Entity or Amount&lt;Entity>”).
- **Places**: **x_1 (T)** and **x_2 (T)** — both refer to the same `T` declared in the prenex.

Example: `T: Entity. x_1 (T) is equal or congruent to x_2 (T) in …` (dunli); `T: Entity or Amount<Entity>. x_1 (T) is less than x_2 (T) in …` (mleca). This matches a TypeScript-style generic with a single type parameter `<T>` and an optional constraint.

- **Metric and dimensional gismu** (centi, zepti, mitre, minli, clani, rotsu, etc.): These predicates have a specific notion of **dimension** or **aspect** in which something is measured or compared. That dimension is always typed as **ka, Property of the entity being measured** (typically x_1).
  - **SI prefix / scale gismu** (centi, zepti, gigdo, kilto, decti, dekto, milti, mikri, …): x_1 (Entity) is the entity measured; **x_2 (ka, Property of x_1)** and **x_3 (ka, Property of x_1)** are both properties of x_1 (e.g. the property in which the scale applies, and the dimension). No prenex; x_2 is a property of x_1, not a “reference entity”. Example: “The insect is 1 centimeter long” → the insect (x_1) is 10^-2 in property x_2 (ka, Property of x_1) in dimension x_3 (ka, Property of x_1, e.g. clani).
  - **Unit gismu** (mitre, minli, gutci, dekpu): x_1 (Entity) is x_2 (Number) [units] in **dimension x_3 (ka, Property of x_1)** by standard x_4 (si'o, Standard); optional subunits as x_5. So the “in what respect” slot is always **(ka, Property of x_1)**, not Entity or Number.
  - **Dimension adjectives** (clani, rotsu, tordu, condi, ganra, barda): x_1 (Entity) is long/thick/short/deep/wide/big in **dimension or direction x_2 (ka, Property of x_1)** (default e.g. longest dimension) by standard x_3 (si'o, Standard) when present.
  - Non-SI units (minli “mile”, gutci “short distance units”, degygutci “inches”, jmagutci “feet”, etc.) follow the same pattern: dimension = (ka, Property of x_1).

---

### 6. How this maps into `formal-gismu.tsv`

- **Two columns**:
  - Column 1: `word` – the gismu.
  - Column 2: `definition` – a single English sentence with all places in order, each annotated with its type rendered in a compact textual form.

- **Place annotation rules**:
  - Every place `x_n` must, at its first mention, be followed by a parenthesized type phrase that corresponds to one of the type shapes above.
  - For abstractors, we always put the Lojban abstractor name first, then the English type, for example:
    - `x_1 (Entity)`
    - `x_2 (nu, Event)`
    - `x_3 (du'u, Proposition)`
    - `x_4 (ka, Property of x_1)`
    - `x_2 (ni, Amount of x_1)`
    - `x_3 (si'o, Scale of property of x_1)`
    - `x_2 (Set<Entity>)` → rendered as `x_2 (set of Entity)`
    - `x_3 (Sequence<Text>)` → rendered as `x_3 (sequence of Text)`
    - `x_1 (Group<Entity>)` → rendered as `x_1 (group of Entity)`
    - Relation: use exactly one of the TypeScript-like forms `Relation<members of x_i>`, `Relation<x_i, x_j>`, or `Relation<Pair<members of x_i>>`.
    - Comparison (dunli, mleca, zmadu, dukse): add a **prenex** that declares **T** (e.g. **`T: Entity.`** or **`T: Entity or Amount<Entity>.`**), then write **x_1 (T)** and **x_2 (T)** in the definition.
    - Dimension / measurement (centi, mitre, minli, clani, rotsu, tordu, etc.): the “in what dimension or aspect” place is always **(ka, Property of x_1)** (or of the measured entity). For SI prefix gismu (centi, zepti, gigdo, …): **x_1 (Entity)**, **x_2 (ka, Property of x_1)**, **x_3 (ka, Property of x_1)** — both x_2 and x_3 are properties of x_1.
  - Later mentions of the same `x_n` in that definition need not repeat the type.

- **Abstractors**:
  - If the source place is primarily `nu`‑like, annotate as `(nu, Event)`.
  - If it is primarily `du'u`‑like, annotate as `(du'u, Proposition)`.
  - If it is explicitly `ka`, annotate as `(ka, Property of …)` for one argument; for a relation between two (or more) places use `(ka, Relation<x_i, x_j>)` (or more args), not “property of x_i and x_j”.
  - If it is explicitly `ni`, annotate as `(ni, Amount of …)`.
  - If it is explicitly `si'o` as scale, annotate as `(si'o, Scale of …)` or `(si'o, Scale of property of x_i)`.
  - If the original just says “abstraction” and multiple abstractors are plausible, we may describe the place as “Abstraction: (nu, Event) or (du'u, Proposition)” or similar.

---

### 7. Collections and new type shapes

- **Collections**:
  - For extension sets, use `Set<T>` rendered as “set of T”.
  - For ordered collections, use `Sequence<T>` rendered as “sequence of T”.
  - For masses, use `Group<T>` rendered as “group of T”.

- **New type shapes**:
  - If we discover a recurring pattern not captured above, define a new generic or nominal type here (in a short TypeScript‑like snippet), and then render it into TSV with a clear textual phrase, keeping the generic shape obvious (e.g. `Option<T>`, `Pair<A, B>` if ever needed).

This way, the TSV stays human‑readable, while this file gives a precise, generic type system similar in spirit to TypeScript or Rust generics.

---

### 8. Relation to the original typed-gismu description

The earlier `typed-gismu.tsv` documentation describes three top‑level place kinds:

- **entity** (with **text** as a special case),
- **clause** (with **property** and **proposition** as special cases),
- **number**,
plus flags for **group** and **ordered group**.

This type system refines those ideas as follows:

- **Entity vs. Text**: `Entity` corresponds to the old “entity” type; `Text` is a separate base type but is still semantically an entity. A place that previously said “entity (text)” is now annotated simply as `Text`.
- **Clause**: there is no separate `Clause` type. Old “clause” places become either:
  - `Event` (old “clause” or “event/state/process/nu”), or
  - `Proposition` (old “proposition/du'u`”).
  The choice is driven by the verb’s semantics and by the old documentation (e.g. `djuno` uses `Proposition`, `nicte` uses `Event`).
- **Property**: the old “property” places (marked with `ka` and explained via `ce'u`) correspond to `Property<Args>` here. In TSV they are rendered as “property of xᵢ (ka)” or “property of xᵢ and xⱼ (ka)`, with `ce'u` binding rules given in the dictionary text.
  - When a place is glossed as an *action, activity, role or behaviour* **of a specific participant**, we model it primarily as a `ka`‑property of that participant (e.g. “action of x₁”, “activity of x₃”), not as a standalone event type. In TSV this shows up as patterns like `x_2 (ka, Property of x_3 or nu, Event)`. Typical examples are motives/goals (`mukti`, `zukte`), bravery in some activity (`virnu`), laziness about doing something (`lazni`), or influence into an action/state (`xlura`), where the core semantic object is “what this participant does/is like”, i.e. a property.
- **Number**: unchanged, now the `Number` base type.
- **Group / ordered group**: the old “group” and “ordered group” annotations map directly to `Group<T>` and `Sequence<T>` respectively and are rendered as “group of T” / “sequence of T”.
- **Proposition**: the old “proposition” sub‑type of “clause” is now always annotated as `Proposition` (du'u), typically for epistemic, reportive, or logical predicates (`djuno`, `jetnu`, `jitfa`, `natfe`).

All examples and explanations in the original typed‑gismu documentation (including `ka` + `ce'u`, `kau`, `tu'a`, and `zo'ei`) remain valid; this file just gives them a more explicit, generic type‑theoretic shape for use in `formal-gismu.tsv`.

<div class="w-full overflow-x-auto"><table class="mt-2 table-fixed max-w-full border"><thead><tr><th class="p-2">word</th><th class="p-2">definition</th></tr></thead><tbody><tr class="border-b"><td class="font-bold p-2">bacru</td><td class="p-2">x₁ (Entity) utters verbally / says / phonates / speaks sound or text x₂ (Sound or Text)</td></tr>
<tr class="border-b"><td class="font-bold p-2">badna</td><td class="p-2">x₁ (Entity) is a banana or plantain fruit or plant of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">badri</td><td class="p-2">x₁ (Entity) is sad / depressed / dejected about x₂ (Abstraction: (nu, Event) or (du&#039;u, Proposition))</td></tr>
<tr class="border-b"><td class="font-bold p-2">bajra</td><td class="p-2">x₁ (Entity) runs on surface x₂ (Entity) using limbs x₃ (Entity) with gait x₄ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bakfu</td><td class="p-2">x₁ (Entity) is a bundle / package / cluster / clump / pack containing x₂ (Entity) held together by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bakni</td><td class="p-2">x₁ (Organism) is a cow / bovine / cattle / ox of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bakri</td><td class="p-2">x₁ (Entity) is a quantity of chalk from source x₂ (Entity) in form x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">baktu</td><td class="p-2">x₁ (Entity) is a deep, solid, wide-topped container / bucket / pail for contents x₂ (Entity) made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">balji</td><td class="p-2">x₁ (Entity) is a bulb body-part of plant or species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">balni</td><td class="p-2">x₁ (Entity) is a balcony / overhang / ledge / shelf of building or structure x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">balre</td><td class="p-2">x₁ (Entity) is a blade of tool or weapon x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">balvi</td><td class="p-2">x₁ (nu, Event) is in the future of event x₂ (nu, Event); x₁ (nu, Event) is later than x₂ (nu, Event) in time</td></tr>
<tr class="border-b"><td class="font-bold p-2">bancu</td><td class="p-2">x₁ (Entity) exceeds / is beyond limit or boundary x₂ (Entity) from reference x₃ (Entity) in property x₄ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bandu</td><td class="p-2">x₁ (nu, Event) defends or protects x₂ (Entity or nu, Event) from threat or peril x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">banfi</td><td class="p-2">x₁ (Organism) is an amphibian of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bangu</td><td class="p-2">x₁ (Language) is a language or dialect used by x₂ (Entity) to express x₃ (Idea or du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">banli</td><td class="p-2">x₁ (Entity) is great or grand in property x₂ (ka, Property of x₁) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">banro</td><td class="p-2">x₁ (Entity) grows or expands to size or form x₂ (Entity) from origin x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">banxa</td><td class="p-2">x₁ (Entity) is a bank owned by or in banking system x₂ (Entity) for banking function(s) x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">banzu</td><td class="p-2">x₁ (Object) suffices / is enough / is sufficient for purpose x₂ (nu, Event) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bapli</td><td class="p-2">x₁ (Event) forces or compels event x₂ (nu, Event) to occur</td></tr>
<tr class="border-b"><td class="font-bold p-2">barda</td><td class="p-2">x₁ (Entity) is big or large in property or dimension(s) x₂ (ka, Property of x₁) compared with standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bargu</td><td class="p-2">x₁ (Entity) arches or curves over or around x₂ (Entity) and is made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">barja</td><td class="p-2">x₁ (Location) is a tavern / bar / pub serving x₂ (Entity) to patrons x₃ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">barna</td><td class="p-2">x₁ (Entity) is a mark / spot / patch on x₂ (Entity) made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bartu</td><td class="p-2">x₁ (Entity) is on the outside of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">basna</td><td class="p-2">x₁ (Entity) emphasizes / accentuates x₂ (Entity, Text or Sound) by action x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">basti</td><td class="p-2">x₁ (Entity) replaces / substitutes for x₂ (Entity) in circumstance x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">batci</td><td class="p-2">x₁ (Entity) bites or pinches x₂ (Entity) at locus x₃ (Entity) with x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">batke</td><td class="p-2">x₁ (Entity) is a button / knob / handle on item x₂ (Entity) for purpose x₃ (nu, Event) made of material x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bavmi</td><td class="p-2">x₁ (Entity) is a quantity of barley of species or strain x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">baxso</td><td class="p-2">x₁ (Entity) reflects Malay–Indonesian common language or culture in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bebna</td><td class="p-2">x₁ (Entity) is foolish or silly in event / action / property x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bemro</td><td class="p-2">x₁ (Entity) reflects North American culture / nationality / geography in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bende</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is a crew / team / gang / squad / band of persons x₂ (Set&lt;Entity&gt;) directed or led by x₃ (Entity) and organized for purpose x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bengo</td><td class="p-2">x₁ (Entity) reflects Bengali / Bangladesh culture / nationality / language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">benji</td><td class="p-2">x₁ (Entity) transfers / sends / transmits x₂ (Entity) to receiver x₃ (Entity) from origin x₄ (Entity) via means or medium x₅ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bersa</td><td class="p-2">x₁ (Entity) is a son of parent(s) x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">berti</td><td class="p-2">x₁ (Entity) is to the north / on the northern side of x₂ (Entity) according to frame of reference x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">besna</td><td class="p-2">x₁ (Entity) is a brain body-part of body x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">betfu</td><td class="p-2">x₁ (Entity) is an abdomen / belly / lower trunk body-part of body x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">betri</td><td class="p-2">x₁ (ka, Property of x₂) is a tragedy or disaster for x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bevri</td><td class="p-2">x₁ (Entity) carries / hauls / bears / transports cargo x₂ (Entity) to destination x₃ (Entity) from origin x₄ (Entity) over path x₅ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bidju</td><td class="p-2">x₁ (Entity) is a bead or pebble of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bifce</td><td class="p-2">x₁ (Organism) is a bee / wasp / hornet of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bikla</td><td class="p-2">x₁ (Entity) whips / lashes / snaps with sudden violent motion</td></tr>
<tr class="border-b"><td class="font-bold p-2">bilga</td><td class="p-2">x₁ (Entity) is bound or obliged to do or be x₂ (ka, Property of x₁) by standard or agreement x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bilma</td><td class="p-2">x₁ (Organism) is ill / sick / diseased with symptoms x₂ (ka, Property of x₁) from disease x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bilni</td><td class="p-2">x₁ (Entity) is military / regimented / strongly organized or prepared by system x₂ (Entity) for purpose x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bindo</td><td class="p-2">x₁ (Entity) reflects Indonesian culture / nationality / language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">binra</td><td class="p-2">x₁ (Entity) insures or indemnifies person x₂ (Entity) against peril x₃ (nu, Event) providing benefit(s) x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">binxo</td><td class="p-2">x₁ (Entity) becomes / changes / converts / transforms into x₂ (Entity) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">birje</td><td class="p-2">x₁ (Entity) is made of / contains / is a quantity of beer or ale brewed from x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">birka</td><td class="p-2">x₁ (Entity) is an arm body-part of body x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">birti</td><td class="p-2">x₁ (Entity) is certain / sure / convinced that x₂ (du&#039;u, Proposition) is true</td></tr>
<tr class="border-b"><td class="font-bold p-2">bisli</td><td class="p-2">x₁ (Entity) is a quantity of / is made of / contains ice of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bitmu</td><td class="p-2">x₁ (Entity) is a wall or fence separating x₂ (Entity) and x₃ (Entity) in structure x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">blabi</td><td class="p-2">x₁ (Entity) is white or very light-colored</td></tr>
<tr class="border-b"><td class="font-bold p-2">blaci</td><td class="p-2">x₁ (Entity) is a quantity of / is made of / contains glass of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">blanu</td><td class="p-2">x₁ (Entity) is blue in color</td></tr>
<tr class="border-b"><td class="font-bold p-2">bliku</td><td class="p-2">x₁ (Entity) is a block three-dimensional shape of material x₂ (Entity) with surfaces or sides x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bloti</td><td class="p-2">x₁ (Entity) is a boat or ship for carrying x₂ (Entity) propelled by means x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bolci</td><td class="p-2">x₁ (Entity) is a ball / sphere / orb / globe of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bongu</td><td class="p-2">x₁ (Entity) is a bone body-part performing function x₂ (ka, Property of x₁) in body of x₃ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">botpi</td><td class="p-2">x₁ (Entity) is a bottle or jar or urn or flask container for x₂ (Entity) made of material x₃ (Entity) with lid x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">boxfo</td><td class="p-2">x₁ (Entity) is a sheet or foil or blanket two-dimensional flexible shape of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">boxna</td><td class="p-2">x₁ (Entity) is a wave periodic pattern in medium x₂ (Entity) with waveform x₃ (Entity), wavelength x₄ (Number), frequency x₅ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bradi</td><td class="p-2">x₁ (Entity) is an enemy or opponent or adversary or foe of x₂ (Entity) in struggle x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bratu</td><td class="p-2">x₁ (Entity) is hail or sleet or freezing rain of material including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">brazo</td><td class="p-2">x₁ (Entity) reflects Brazilian culture / nationality / language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bredi</td><td class="p-2">x₁ (Entity) is ready or prepared for x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bridi</td><td class="p-2">x₁ (du&#039;u, Proposition) is a predicate relationship with relation x₂ (Relation&lt;members of x₃&gt;) among arguments x₃ (Sequence&lt;Entity&gt; or Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">brife</td><td class="p-2">x₁ (Entity) is a breeze or wind or gale from direction x₂ (Entity) with speed x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">briju</td><td class="p-2">x₁ (Location) is an office or bureau or workplace of worker x₂ (Entity) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">brito</td><td class="p-2">x₁ (Entity) reflects British or United Kingdom culture / nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">broda</td><td class="p-2">x₁ (Predicate variable) is the first assignable variable predicate with context-determined place structure</td></tr>
<tr class="border-b"><td class="font-bold p-2">brode</td><td class="p-2">x₁ (Predicate variable) is the second assignable variable predicate with context-determined place structure</td></tr>
<tr class="border-b"><td class="font-bold p-2">brodi</td><td class="p-2">x₁ (Predicate variable) is the third assignable variable predicate with context-determined place structure</td></tr>
<tr class="border-b"><td class="font-bold p-2">brodo</td><td class="p-2">x₁ (Predicate variable) is the fourth assignable variable predicate with context-determined place structure</td></tr>
<tr class="border-b"><td class="font-bold p-2">brodu</td><td class="p-2">x₁ (Predicate variable) is the fifth assignable variable predicate with context-determined place structure</td></tr>
<tr class="border-b"><td class="font-bold p-2">bruna</td><td class="p-2">x₁ (Entity) is a brother of x₂ (Entity) by bond or tie or standard or parent(s) x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">budjo</td><td class="p-2">x₁ (Entity) pertains to Buddhist culture / religion / ethos in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bukpu</td><td class="p-2">x₁ (Entity) is an amount of cloth or fabric of type or material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bumru</td><td class="p-2">x₁ (Entity) is foggy or misty or covered by a fog or mist or vapor of liquid x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bunda</td><td class="p-2">x₁ (Entity) is x₂ (Number) local weight units in standard x₃ (Entity) with subunits x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">bunre</td><td class="p-2">x₁ (Entity) is brown or tan in color</td></tr>
<tr class="border-b"><td class="font-bold p-2">burcu</td><td class="p-2">x₁ (Entity) is a brush for purpose x₂ (nu, Event) with bristles x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">burna</td><td class="p-2">x₁ (Entity) is embarrassed or disconcerted or flustered or ill at ease about conditions x₂ (Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cabna</td><td class="p-2">x₁ (nu, Event) is current or in the present or concurrent or simultaneous with x₂ (nu, Event or TimeInterval) in time</td></tr>
<tr class="border-b"><td class="font-bold p-2">cabra</td><td class="p-2">x₁ (Entity) is apparatus or mechanism or device or equipment for function x₂ (Property of x₁) controlled or triggered by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cacra</td><td class="p-2">x₁ (TimeInterval) is x₂ (Number) hours in duration by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cadzu</td><td class="p-2">x₁ (Entity) walks or strides or paces on surface x₂ (Entity) using limbs x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cafne</td><td class="p-2">x₁ (nu, Event) often or frequently or commonly or customarily occurs or recurs by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cakla</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of chocolate or cocoa</td></tr>
<tr class="border-b"><td class="font-bold p-2">calku</td><td class="p-2">x₁ (Entity) is a shell or husk around x₂ (Entity) composed of x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">canci</td><td class="p-2">x₁ (Entity) vanishes or disappears from location x₂ (Location) using senses or sensor x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cando</td><td class="p-2">x₁ (Entity) is idle or at rest or inactive</td></tr>
<tr class="border-b"><td class="font-bold p-2">cange</td><td class="p-2">x₁ (Location) is a farm or ranch at x₂ (Location) farmed by x₃ (Entity) raising or producing x₄ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">canja</td><td class="p-2">x₁ (Entity) exchanges or trades or barters commodity x₂ (ka, Property of x₁) for x₃ (ka, Property of x₄) with x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">canko</td><td class="p-2">x₁ (Entity) is a window or portal or opening in wall or building or structure x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">canlu</td><td class="p-2">x₁ (Location) is space or volume or region or room occupied by x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">canpa</td><td class="p-2">x₁ (Entity) is a shovel or spade for digging x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">canre</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of sand or grit from source x₂ (Entity) of composition including x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">canti</td><td class="p-2">x₁ (Entity) is gut or entrails or intestines or viscera or digestive system body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">carce</td><td class="p-2">x₁ (Entity) is a cart or carriage or wagon for carrying x₂ (Entity) propelled by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">carmi</td><td class="p-2">x₁ (Entity) is intense or bright or saturated or brilliant in property x₂ (ka, Property of x₁) as received or measured by observer x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">carna</td><td class="p-2">x₁ (Entity) turns or rotates or revolves around axis x₂ (Entity) in direction x₃ (Entity) towards point x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cartu</td><td class="p-2">x₁ (Entity) is a chart or diagram or map of or about x₂ (Entity) showing formation or data-points x₃ (Entity or Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">carvi</td><td class="p-2">x₁ (Entity) rains or showers or precipitates to x₂ (Location) from x₃ (Entity); x₁ is precipitation</td></tr>
<tr class="border-b"><td class="font-bold p-2">casnu</td><td class="p-2">x₁ (Entity or Group&lt;Entity&gt;) discusses or talks about topic or subject x₂ (Entity or Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">catke</td><td class="p-2">x₁ (Entity) shoves or pushes x₂ (Entity) at locus x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">catlu</td><td class="p-2">x₁ (Entity) looks at or examines or views or inspects or regards or watches or gazes at x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">catni</td><td class="p-2">x₁ (Entity) has authority or is an official in or on or over matter or sphere or persons x₂ (Entity or Group&lt;Entity&gt;) derived on basis x₃ (Entity or du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">catra</td><td class="p-2">x₁ (Entity) kills or slaughters or murders x₂ (Entity) by action or method x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">caxno</td><td class="p-2">x₁ (Entity) is shallow in extent in direction or property x₂ (ka, Property of x₁) away from reference point x₃ (Entity) by standard x₄ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cecla</td><td class="p-2">x₁ (Entity) launches or fires or shoots projectile or missile x₂ (Entity) propelled by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cecmu</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is a community or colony of organisms x₂ (Group&lt;Organism&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cedra</td><td class="p-2">x₁ (TimeInterval) is an era or epoch or age characterized by x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cenba</td><td class="p-2">x₁ (Entity) varies or changes in property or quantity x₂ (ka, Property of x₁) in amount or degree x₃ (ni, Amount of x₂) under conditions x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">censa</td><td class="p-2">x₁ (Entity) is holy or sacred to person or people or culture or religion or cult or group x₂ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">centi</td><td class="p-2">x₁ (Entity) is 10^-2 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cerda</td><td class="p-2">x₁ (Entity) is an heir to or is to inherit x₂ (ka, Property of x₃) from x₃ (Entity) according to rule x₄ (du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cerni</td><td class="p-2">x₁ (TimeInterval) is a morning of day x₂ (TimeInterval) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">certu</td><td class="p-2">x₁ (Entity) is an expert or pro or skilled at x₂ (nu, Event or ka, Property of x₁) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cevni</td><td class="p-2">x₁ (Entity) is a god or deity of people or religion x₂ (Group&lt;Entity&gt;) with dominion over sphere x₃ (ka, Property of nonce place)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cfari</td><td class="p-2">x₁ (nu, Event) commences or initiates or starts or begins to occur</td></tr>
<tr class="border-b"><td class="font-bold p-2">cfika</td><td class="p-2">x₁ (Entity) is a work of fiction about plot or theme or subject x₂ (Entity) by author x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cfila</td><td class="p-2">x₁ (ka, Property of x₂) is a flaw or fault or defect in x₂ (Entity) causing x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cfine</td><td class="p-2">x₁ (Entity) is a wedge shape or tool of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cfipu</td><td class="p-2">x₁ (nu, Event) or state confuses or baffles observer x₂ (Entity) due to confusing property x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ciblu</td><td class="p-2">x₁ (Entity) is blood or vital fluid of organism x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cicna</td><td class="p-2">x₁ (Entity) is cyan or turquoise or greenish-blue in color</td></tr>
<tr class="border-b"><td class="font-bold p-2">cidja</td><td class="p-2">x₁ (Entity) is food or feed or nutriment for x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cidni</td><td class="p-2">x₁ (Entity) is a knee or elbow or knuckle hinged joint of limb x₂ (Entity) of body x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cidro</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of hydrogen x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cifnu</td><td class="p-2">x₁ (Organism) is an infant or baby of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cigla</td><td class="p-2">x₁ (Entity) is a gland body-part secreting x₂ (Entity) in body x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cikna</td><td class="p-2">x₁ (Entity) is awake or alert or conscious</td></tr>
<tr class="border-b"><td class="font-bold p-2">cikre</td><td class="p-2">x₁ (Entity) repairs or mends or fixes x₂ (Entity) for use x₃ (ka, Property of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ciksi</td><td class="p-2">x₁ (Entity) explains x₂ (nu, Event) to x₃ (Entity) with explanation x₄ (du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cilce</td><td class="p-2">x₁ (Entity) is wild or untamed</td></tr>
<tr class="border-b"><td class="font-bold p-2">cilmo</td><td class="p-2">x₁ (Entity) is moist or wet or damp with liquid x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cilre</td><td class="p-2">x₁ (Entity) learns x₂ (du&#039;u, Proposition) about subject x₃ (Entity) from source x₄ (Entity or nu, Event) by method x₅ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cilta</td><td class="p-2">x₁ (Entity) is a thread or filament or wire of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cimde</td><td class="p-2">x₁ (ka, Property of x₂) is a dimension of space or object x₂ (Entity) according to rules or model x₃ (ka, Property of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cimni</td><td class="p-2">x₁ (Entity) is infinite or unending or eternal in property or dimension x₂ (ka, Property of x₁) to degree x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cinba</td><td class="p-2">x₁ (Entity) kisses or buss(es) x₂ (Entity) at locus x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cindu</td><td class="p-2">x₁ (Entity) is an oak tree of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cinfo</td><td class="p-2">x₁ (Organism) is a lion or lioness of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cinje</td><td class="p-2">x₁ (Entity) is a wrinkle or crease or fold in x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cinki</td><td class="p-2">x₁ (Organism) is an insect or arthropod of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cinla</td><td class="p-2">x₁ (Entity) is thin in direction or dimension x₂ (ka, Property of x₁) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cinmo</td><td class="p-2">x₁ (Entity) feels emotion x₂ (ka, Property of x₁) about x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cinri</td><td class="p-2">x₁ (Abstraction) interests or is interesting to x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cinse</td><td class="p-2">x₁ (Entity) in activity or state x₂ (nu, Event) exhibits sexuality or gender or sexual orientation x₃ (ka, Property of x₁) by standard x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cinta</td><td class="p-2">x₁ (Entity) is a paint material of pigment or active substance x₂ (Entity) in base x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cinza</td><td class="p-2">x₁ (Entity) is tongs or chopsticks or pincers or tweezers or pliers tool or body-part for x₂ (Entity) to pinch x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cipni</td><td class="p-2">x₁ (Organism) is a bird or avian or fowl of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cipra</td><td class="p-2">x₁ (nu, Event or Process) is a test or examination or proof of property or state x₂ (ka, Property of x₃ or nu, Event) in subject x₃ (Entity or Set&lt;Entity&gt; or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cirko</td><td class="p-2">x₁ (Entity) loses person or thing x₂ (ka, Property of x₁) at or near location or situation x₃ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cirla</td><td class="p-2">x₁ (Entity) is a quantity of or contains cheese or curd from source x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ciska</td><td class="p-2">x₁ (Entity) writes or inscribes text x₂ (Text) on medium x₃ (Entity) with writing implement x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cisma</td><td class="p-2">x₁ (Entity) smiles or grins</td></tr>
<tr class="border-b"><td class="font-bold p-2">ciste</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is a system interrelated by structure x₂ (Entity) among components x₃ (Set&lt;Entity&gt;) displaying systemic property x₄ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">citka</td><td class="p-2">x₁ (Entity) eats or ingests or consumes x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">citno</td><td class="p-2">x₁ (Entity) is young or youthful by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">citri</td><td class="p-2">x₁ (Entity) is a history of x₂ (Entity) according to viewpoint person x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">citsi</td><td class="p-2">x₁ (TimeInterval) is a season cyclical interval defined by interval or property x₂ (ka, Property of x₁) of year(s) x₃ (SplicedTimeInterval)</td></tr>
<tr class="border-b"><td class="font-bold p-2">civla</td><td class="p-2">x₁ (Organism) is a louse or flea of species x₂ (Taxon) parasitic on x₃ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cizra</td><td class="p-2">x₁ (Entity) is strange or weird or deviant or bizarre or odd to x₂ (Entity) in property x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ckabu</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of rubber or latex from source x₂ (Entity) of composition including x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ckafi</td><td class="p-2">x₁ (Entity) is made of or contains or is a quantity of coffee from source or bean or grain x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ckaji</td><td class="p-2">x₁ (Entity) has or is characterized by property or feature or trait or aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ckana</td><td class="p-2">x₁ (Entity) is a bed or pallet of material x₂ (Entity) for holding or supporting x₃ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ckape</td><td class="p-2">x₁ (Entity or nu, Event) is perilous or dangerous or potentially harmful to x₂ (Entity or nu, Event) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ckasu</td><td class="p-2">x₁ (Entity) ridicules or mocks or scoffs at x₂ (Entity) about x₃ (ka, Property of x₂ or nu, Event) by doing activity x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ckeji</td><td class="p-2">x₁ (Entity) feels ashamed or mortified or humiliated under conditions x₂ (nu, Event) before audience x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ckiku</td><td class="p-2">x₁ (Entity) is a key fitting or releasing or opening or unlocking lock x₂ (Entity) and having relevant properties x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ckilu</td><td class="p-2">x₁ (si&#039;o, Scale) is a scale of units for measuring or observing or determining state x₂ (ka, Property of nonce place)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ckini</td><td class="p-2">x₁ (Entity) is related or associated or akin to x₂ (Entity) by relationship x₃ (Relation&lt;x₁, x₂&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ckire</td><td class="p-2">x₁ (Entity) is grateful or thankful or appreciative to x₂ (Entity) for x₃ (ka, Property of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ckule</td><td class="p-2">x₁ (Location) is a school or institute or academy at x₂ (Location) teaching subjects x₃ (Entity or Set&lt;Entity&gt;) to audience x₄ (Group&lt;Entity&gt;) operated by x₅ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ckunu</td><td class="p-2">x₁ (Entity) is a conifer or pine or fir of species x₂ (Taxon) with cones x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cladu</td><td class="p-2">x₁ (Sound) is loud or noisy at observation point x₂ (Location) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">clani</td><td class="p-2">x₁ (Entity) is long in dimension or direction x₂ (ka, Property of x₁) by measurement standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">claxu</td><td class="p-2">x₁ (Entity) is without or lacks or is free of x₂ (Entity or ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">clika</td><td class="p-2">x₁ (Organism) is moss or lichen of species x₂ (Taxon) growing on x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">clira</td><td class="p-2">x₁ (nu, Event) is early by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">clite</td><td class="p-2">x₁ (Entity) is polite or courteous or civil in matter x₂ (ka, Property of x₁) according to standard or custom x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cliva</td><td class="p-2">x₁ (Entity) leaves or goes away or departs or separates from x₂ (Entity) via route x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">clupa</td><td class="p-2">x₁ (Entity) is a loop or circuit of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cmaci</td><td class="p-2">x₁ (Entity) is mathematics of type or describing x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cmalu</td><td class="p-2">x₁ (Entity) is small in property or dimension(s) x₂ (ka, Property of x₁) as compared with standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cmana</td><td class="p-2">x₁ (Entity) is a mountain or hill or mound projecting from land mass x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cmavo</td><td class="p-2">x₁ (Text) is a structure word of grammatical class x₂ (Text) with meaning or function x₃ (Entity) in usage language x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cmene</td><td class="p-2">x₁ (Text) is a name or title or tag of x₂ (Entity) used by namer or name-user x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cmila</td><td class="p-2">x₁ (Entity) laughs</td></tr>
<tr class="border-b"><td class="font-bold p-2">cmima</td><td class="p-2">x₁ (Entity) is a member or element of set x₂ (Set&lt;Entity&gt;) or belongs to group x₂ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cmoni</td><td class="p-2">x₁ (Entity) utters moan or groan or howl or scream non-linguistic utterance x₂ (Sound) expressing property x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cnano</td><td class="p-2">x₁ (Number or Entity) is a norm or average in property  x₂ (ka, Property of x₁) among x₃ (Set&lt;Entity&gt;) by standard x₄ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cnebo</td><td class="p-2">x₁ (Entity) is a neck body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cnemu</td><td class="p-2">x₁ (Entity) rewards x₂ (Entity) for atypical x₃ (ka, Property of x₂) with reward x₄ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cnici</td><td class="p-2">x₁ (Entity) is orderly or neat or ordered in property or quantity x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cnino</td><td class="p-2">x₁ (Entity) is new or unfamiliar or novel to observer x₂ (Entity) in feature x₃ (ka, Property of x₁) by standard x₄ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cnisa</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of lead metal x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cnita</td><td class="p-2">x₁ (Location) is directly or vertically beneath or below or under x₂ (Location or Entity) in frame of reference x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cokcu</td><td class="p-2">x₁ (Entity) soaks up or absorbs or sucks up x₂ (Entity) from x₃ (Entity) into x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">condi</td><td class="p-2">x₁ (Entity) is deep in extent in direction or property x₂ (ka, Property of x₁) away from reference point x₃ (Entity) by standard x₄ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cortu</td><td class="p-2">x₁ (Entity) feels pain or hurt at locus x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cpacu</td><td class="p-2">x₁ (Entity) gets or procures or acquires or obtains or accepts x₂ (Entity) from source x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cpana</td><td class="p-2">x₁ (Entity or nu, Event) is upon or atop or resting on or lying on upper surface of x₂ (Entity) in frame of reference x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cpare</td><td class="p-2">x₁ (Entity) climbs or clambers or creeps or crawls on surface x₂ (Entity) in direction x₃ (Entity) using limbs or tools x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cpedu</td><td class="p-2">x₁ (Entity) requests or asks or petitions or solicits for x₂ (Entity or nu, Event) from x₃ (Entity) in manner or form x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cpina</td><td class="p-2">x₁ (Entity) is pungent or piquant or peppery or spicy or irritating to sense x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cradi</td><td class="p-2">x₁ (Entity) broadcasts or transmits x₂ (Entity or Text) via station or frequency x₃ (Entity) to radio receiver x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">crane</td><td class="p-2">x₁ (Entity) is in front of or anterior to x₂ (Entity) which faces orientation x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">creka</td><td class="p-2">x₁ (Entity) is a shirt or blouse or top garment x₂ (Entity) material for upper body</td></tr>
<tr class="border-b"><td class="font-bold p-2">crepu</td><td class="p-2">x₁ (Entity) harvests or reaps or gathers crop or product or objects x₂ (Entity) from source or area x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cribe</td><td class="p-2">x₁ (Organism) is a bear of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">crida</td><td class="p-2">x₁ (Entity) is a fairy or elf or gnome or pixie or goblin mythical humanoid of mythos or religion x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">crino</td><td class="p-2">x₁ (Entity) is green or verdant in color</td></tr>
<tr class="border-b"><td class="font-bold p-2">cripu</td><td class="p-2">x₁ (Entity) is a bridge or span over or across x₂ (Entity) between x₃ (Entity) and x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">crisa</td><td class="p-2">x₁ (TimeInterval) is summer season of year x₂ (Entity or Number) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">critu</td><td class="p-2">x₁ (TimeInterval) is autumn or fall season of year x₂ (Entity or Number) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ctaru</td><td class="p-2">x₁ (Entity) is a tide periodic expansion in x₂ (Entity) caused by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ctebi</td><td class="p-2">x₁ (Entity) is a lip or rim body-part of orifice x₂ (Entity) of body x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cteki</td><td class="p-2">x₁ (Entity) is a tax or levy or duty on goods or services or event x₂ (Entity or nu, Event) levied against x₃ (Entity) by authority or collector x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ctile</td><td class="p-2">x₁ (Entity) is a quantity of petroleum or oil from source x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ctino</td><td class="p-2">x₁ (Entity) is a shadow or shade of object x₂ (Entity) made by light or energy source x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ctuca</td><td class="p-2">x₁ (Entity) teaches audience x₂ (Entity or Group&lt;Entity&gt;) ideas or methods or lore x₃ (du&#039;u, Proposition) about subjects x₄ (Entity or Set&lt;Entity&gt;) by method x₅ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cukla</td><td class="p-2">x₁ (Entity) is round or circular two-dimensional shape</td></tr>
<tr class="border-b"><td class="font-bold p-2">cukta</td><td class="p-2">x₁ (Entity) is a book containing work x₂ (Entity) by author x₃ (Entity) for audience x₄ (Entity or Group&lt;Entity&gt;) preserved in medium x₅ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">culno</td><td class="p-2">x₁ (Entity) is full or completely filled with x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cumki</td><td class="p-2">x₁ (nu, Event) is possible under conditions x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cumla</td><td class="p-2">x₁ (Entity) is humble or modest about x₂ (Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cunmi</td><td class="p-2">x₁ (Entity) is a quantity of millet grain of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cunso</td><td class="p-2">x₁ (Entity) is random or fortuitous or unpredictable under conditions x₂ (nu, Event) with probability distribution x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cuntu</td><td class="p-2">x₁ (nu, Event) is an affair or organized activity involving persons x₂ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cupra</td><td class="p-2">x₁ (Entity) produces product x₂ (Entity) by process x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">curmi</td><td class="p-2">x₁ (Entity) lets or permits or allows event x₂ (nu, Event) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">curnu</td><td class="p-2">x₁ (Organism) is a worm or invertebrate animal of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">curve</td><td class="p-2">x₁ (Entity) is pure or unadulterated or simple in property x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cusku</td><td class="p-2">x₁ (Entity) expresses or says content x₂ (du&#039;u, Proposition or Text) for audience x₃ (Entity) via expressive medium x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cutci</td><td class="p-2">x₁ (Entity) is a shoe or boot or sandal for covering or protecting feet or hooves x₂ (Entity) made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cutne</td><td class="p-2">x₁ (Entity) is a chest or thorax or upper trunk body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">cuxna</td><td class="p-2">x₁ (Entity) chooses or selects choice x₂ (Entity) from complete set or sequence of alternatives x₃ (Set&lt;Entity&gt; or Sequence&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dacru</td><td class="p-2">x₁ (Entity) is a drawer or sliding compartment in structure x₂ (Entity) for contents x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dacti</td><td class="p-2">x₁ (Object) is a material object enduring in space-time</td></tr>
<tr class="border-b"><td class="font-bold p-2">dadjo</td><td class="p-2">x₁ (Entity) pertains to Taoist culture or ethos or religion in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dakfu</td><td class="p-2">x₁ (Entity) is a knife tool for cutting x₂ (Entity) with blade of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dakli</td><td class="p-2">x₁ (Entity) is a sack or bag with contents x₂ (Entity) made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">damba</td><td class="p-2">x₁ (Entity) fights or combats or struggles with x₂ (Entity) over issue x₃ (Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">damri</td><td class="p-2">x₁ (Entity) is a drum or cymbal or gong percussion instrument with beater or actuator x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dandu</td><td class="p-2">x₁ (Entity) hangs or dangles or is suspended from x₂ (Entity) by joint x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">danfu</td><td class="p-2">x₁ (Entity) is the answer or response or solution or reply to question or problem x₂ (Entity or du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">danlu</td><td class="p-2">x₁ (Organism) is an animal or creature of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">danmo</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of smoke or smog or air pollution from source x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">danre</td><td class="p-2">x₁ (Entity or Force) puts pressure on or presses or applies force to x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dansu</td><td class="p-2">x₁ (Entity or Group&lt;Entity&gt;) dances to accompaniment or music or rhythm x₂ (Sound or Text)</td></tr>
<tr class="border-b"><td class="font-bold p-2">danti</td><td class="p-2">x₁ (Entity) is a ballistic projectile such as bullet or missile for firing by gun or launcher x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">daplu</td><td class="p-2">x₁ (Location) is an island or atoll or key of material or properties x₂ (Entity) in surroundings or body x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dapma</td><td class="p-2">x₁ (Entity) curses or damns or condemns x₂ (Entity) to fate x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dargu</td><td class="p-2">x₁ (Entity) is a road or highway to x₂ (Location) from x₃ (Location) with route x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">darlu</td><td class="p-2">x₁ (Entity) argues for stand x₂ (du&#039;u, Proposition) against stand x₃ (du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">darno</td><td class="p-2">x₁ (Entity) is far or distant from x₂ (Entity) in property x₃ (ka, Relation&lt;x₁, x₂&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">darsi</td><td class="p-2">x₁ (Entity) shows audacity or boldness in behavior x₂ (nu, Event or ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">darxi</td><td class="p-2">x₁ (Entity) hits or strikes or beats x₂ (Entity) with instrument or body-part x₃ (Entity) at locus x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">daski</td><td class="p-2">x₁ (Entity) is a pocket or pouch of or in garment or item x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dasni</td><td class="p-2">x₁ (Entity) wears garment x₂ (Entity) as garment of type x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">daspo</td><td class="p-2">x₁ (nu, Event) destroys or ruins or wrecks or despoils x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dasri</td><td class="p-2">x₁ (Entity) is a ribbon or tape or strip or band of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">datka</td><td class="p-2">x₁ (Organism) is a duck of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">datni</td><td class="p-2">x₁ (du&#039;u, Proposition) is data or information or statistics about x₂ (Entity) gathered by method x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">decti</td><td class="p-2">x₁ (Entity) is one tenth in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">degji</td><td class="p-2">x₁ (Entity) is a finger or digit or toe body-part on limb or body site x₂ (Entity) of body x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dejni</td><td class="p-2">x₁ (Entity) owes debt x₂ (Entity) to creditor x₃ (Entity) in return for service or loan x₄ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dekpu</td><td class="p-2">x₁ (Entity) is x₂ (Number) local volume units in dimension x₃ (ka, Property of x₁) by standard x₄ (si&#039;o, Standard) with subunits x₅ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dekto</td><td class="p-2">x₁ (Entity) is ten in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">delno</td><td class="p-2">x₁ (Entity) is x₂ (Number) candela in luminosity by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dembi</td><td class="p-2">x₁ (Entity) is a bean or pea or leguminous seed from plant x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">denci</td><td class="p-2">x₁ (Entity) is a tooth body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">denmi</td><td class="p-2">x₁ (Entity) is dense or concentrated or packed or intense in property x₂ (ka, Property of x₁) at location x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">denpa</td><td class="p-2">x₁ (Entity) waits or pauses for x₂ (nu, Event) at state x₃ (nu, Event) before doing or continuing x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dertu</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of dirt or soil or earth or ground from source x₂ (Entity) of composition x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">derxi</td><td class="p-2">x₁ (Entity) is a heap or pile or stack or mound or hill of materials x₂ (Entity) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">desku</td><td class="p-2">x₁ (Entity) shakes or quakes or trembles or quivers or shudders or wobbles or vibrates from force x₂ (nu, Event or Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">detri</td><td class="p-2">x₁ (Entity) is the date of event or state x₂ (nu, Event) at location x₃ (Location) by calendar x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dicra</td><td class="p-2">x₁ (nu, Event) interrupts or stops or halts or disrupts x₂ (Entity or nu, Event) due to quality x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dikca</td><td class="p-2">x₁ (Entity) is electricity electric charge or current in or on x₂ (Entity) of polarity or quantity x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">diklo</td><td class="p-2">x₁ (Entity) is local to locus x₂ (Entity) within range x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dikni</td><td class="p-2">x₁ (Entity) is regular or cyclical or periodic in property or activity x₂ (ka, Property of x₁ or nu, Event) with period or interval x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dilcu</td><td class="p-2">x₁ (Number) is the quotient x₂ (Number) divided by x₃ (Number) leaving remainder x₄ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dilnu</td><td class="p-2">x₁ (Entity) is a cloud or mass of clouds of material x₂ (Entity) in air mass x₃ (Entity) at base elevation x₄ (Entity or Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dimna</td><td class="p-2">x₁ (nu, Event) is a fate or destiny of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dinju</td><td class="p-2">x₁ (Location) is a building or edifice for purpose x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dinko</td><td class="p-2">x₁ (Entity) is a nail or tack fastener of type or size x₂ (ka, Property of x₁) made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dirba</td><td class="p-2">x₁ (ka, Property of x₂) is dear or precious or darling to x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dirce</td><td class="p-2">x₁ (Entity) radiates or emits x₂ (Entity) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dirgo</td><td class="p-2">x₁ (Entity) is a drop of material x₂ (Entity) in surrounding material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dizlo</td><td class="p-2">x₁ (Entity) is low or downward in frame of reference x₂ (Entity) compared with baseline or standard height x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">djacu</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of water</td></tr>
<tr class="border-b"><td class="font-bold p-2">djedi</td><td class="p-2">x₁ (TimeInterval) is x₂ (Number) full days in duration by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">djica</td><td class="p-2">x₁ (Entity) desires or wants or wishes x₂ (nu, Event or State) for purpose x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">djine</td><td class="p-2">x₁ (Entity) is a ring or annulus or torus or circle shape of material x₂ (Entity) with inside diameter x₃ (Number) and outside diameter x₄ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">djuno</td><td class="p-2">x₁ (Entity) knows fact x₂ (du&#039;u, Proposition) about subject x₃ (Entity) by epistemology x₄ (du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">donri</td><td class="p-2">x₁ (TimeInterval) is the daytime of day x₂ (TimeInterval) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dotco</td><td class="p-2">x₁ (Entity) reflects German or Germanic culture or nationality or language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">draci</td><td class="p-2">x₁ (Entity) is a drama or play about x₂ (Entity) by dramatist x₃ (Entity) for audience x₄ (Entity or Group&lt;Entity&gt;) with actors x₅ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">drani</td><td class="p-2">x₁ (Entity) is correct or proper or right or perfect in property or aspect x₂ (ka, Property of x₁) in situation x₃ (nu, Event) by standard x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">drata</td><td class="p-2">x₁ (Entity) is different from or other than x₂ (Entity) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">drudi</td><td class="p-2">x₁ (Entity) is a roof or top or ceiling or lid of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dugri</td><td class="p-2">x₁ (Number) is the logarithm of x₂ (Number) to base x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dukse</td><td class="p-2">T: Entity. x₁ (T) is an excess of or too much of x₂ (T) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dukti</td><td class="p-2">x₁ (Entity) is a polar opposite or contrary to x₂ (Entity) in property or on scale x₃ (ka, Relation&lt;x₁, x₂&gt; or si&#039;o, Scale)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dunda</td><td class="p-2">x₁ (Entity) gives or donates gift x₂ (ka, Property of x₃) to recipient x₃ (Entity) without payment or exchange</td></tr>
<tr class="border-b"><td class="font-bold p-2">dunja</td><td class="p-2">x₁ (Entity) freezes or jells or solidifies at temperature x₂ (Number) and pressure x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dunku</td><td class="p-2">x₁ (Entity) is anguished or distressed or emotionally wrought or stressed by x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dunli</td><td class="p-2">T: Entity. x₁ (T) is equal or congruent to or as much as x₂ (T) in property or dimension or quantity x₃ (ka, Relation&lt;x₁, x₂&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dunra</td><td class="p-2">x₁ (TimeInterval) is winter season of year x₂ (Entity or Number) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dzena</td><td class="p-2">x₁ (Entity) is an elder or ancestor of x₂ (Entity) by bond or degree x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">dzipo</td><td class="p-2">x₁ (Entity) reflects Antarctican culture or nationality or geography in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">facki</td><td class="p-2">x₁ (Entity) discovers or finds out fact x₂ (du&#039;u, Proposition) about subject or object x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fadni</td><td class="p-2">x₁ (Entity) is ordinary or common or typical or usual in property x₂ (ka, Property of x₁) among members of set x₃ (Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fagri</td><td class="p-2">x₁ (Entity) is a fire or flame in fuel x₂ (Entity) burning in or reacting with oxidizer x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">falnu</td><td class="p-2">x₁ (Entity) is a sail for gathering propelling material x₂ (Entity) on vehicle or motor x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">famti</td><td class="p-2">x₁ (Entity) is an aunt or uncle of x₂ (Entity) by bond x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fancu</td><td class="p-2">x₁ (Entity) is a function mapping domain x₂ (Entity) to range x₃ (Entity) defined by expression or rule x₄ (Text)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fange</td><td class="p-2">x₁ (Entity) is foreign or alien or exotic or unfamiliar to x₂ (Entity) in property x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fanmo</td><td class="p-2">x₁ (Entity or State) is an end or finish or termination of thing or process x₂ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fanri</td><td class="p-2">x₁ (Entity) is a factory or foundry or industrial plant or mill producing x₂ (Entity) from materials x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fanta</td><td class="p-2">x₁ (Entity) prevents or keeps or stops or restrains event x₂ (nu, Event) from occurring</td></tr>
<tr class="border-b"><td class="font-bold p-2">fanva</td><td class="p-2">x₁ (Entity) translates text or utterance x₂ (Text) to language x₃ (Language) from language x₄ (Language) with translation result x₅ (Text)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fanza</td><td class="p-2">x₁ (nu, Event) annoys or irritates or bothers or distracts x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fapro</td><td class="p-2">x₁ (Entity) opposes or balances or contends against opponent(s) x₂ (Entity or Group&lt;Entity&gt;) about x₃ (Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">farlu</td><td class="p-2">x₁ (Entity) falls or drops to x₂ (Location) from x₃ (Location) in gravity well or frame x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">farna</td><td class="p-2">x₁ (Entity) is the direction of x₂ (Entity or nu, Event) from origin or in frame of reference x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">farvi</td><td class="p-2">x₁ (Entity) develops or evolves towards or into x₂ (Entity) from x₃ (Entity) through stages x₄ (Sequence&lt;Entity&gt; or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fasnu</td><td class="p-2">x₁ (nu, Event) is an event or incident or happening or occurrence</td></tr>
<tr class="border-b"><td class="font-bold p-2">fatci</td><td class="p-2">x₁ (du&#039;u, Proposition) is a fact or reality or truth or actuality</td></tr>
<tr class="border-b"><td class="font-bold p-2">fatne</td><td class="p-2">x₁ (Sequence&lt;Entity&gt;) is in reverse order from sequence x₂ (Sequence&lt;Entity&gt;) or x₁ (Entity) is inverted from x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fatri</td><td class="p-2">x₁ (Entity) is distributed or allotted or allocated or shared among x₂ (Entity or Group&lt;Entity&gt;) with shares or portions x₃ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">febvi</td><td class="p-2">x₁ (Entity) boils or evaporates at temperature x₂ (Number) and pressure x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">femti</td><td class="p-2">x₁ (Entity) is 10^-15 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fendi</td><td class="p-2">x₁ (Entity) divides or partitions or separates x₂ (Entity) into parts or individuals x₃ (Entity or Group&lt;Entity&gt;) by method or partition x₄ (Entity or du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fengu</td><td class="p-2">x₁ (Entity) is angry or mad at x₂ (Entity) for x₃ (ka, Property of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fenki</td><td class="p-2">x₁ (nu, Event) is crazy or insane or frantic by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fenra</td><td class="p-2">x₁ (Entity) is a crack or fissure or pass or cleft or ravine or chasm in x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fenso</td><td class="p-2">x₁ (Entity) sews or stitches or sutures materials x₂ (Entity or Set&lt;Entity&gt;) together with tool(s) x₃ (Entity) using filament x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fepni</td><td class="p-2">x₁ (Entity) is x₂ (Number) cents or copecks in value in monetary system x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fepri</td><td class="p-2">x₁ (Entity) is a lung body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ferti</td><td class="p-2">x₁ (Entity) is fertile or conducive for supporting growth or development of x₂ (Entity or ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">festi</td><td class="p-2">x₁ (Entity) is waste product left by event or activity x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fetsi</td><td class="p-2">x₁ (Organism) is a female of species x₂ (Taxon) with feminine traits x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">figre</td><td class="p-2">x₁ (Entity) is a fig fruit or tree of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">filso</td><td class="p-2">x₁ (Entity) reflects Palestinian culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">finpe</td><td class="p-2">x₁ (Organism) is a fish of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">finti</td><td class="p-2">x₁ (Entity) invents or creates or composes or authors x₂ (Entity) for purpose x₃ (Entity or nu, Event) from existing elements or ideas x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">flalu</td><td class="p-2">x₁ (Entity) is a law specifying x₂ (ka, Property of x₃) for community x₃ (Group&lt;Entity&gt;) under conditions x₄ (nu, Event) by lawgiver x₅ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">flani</td><td class="p-2">x₁ (Entity) is a flute or pipe or fife or recorder musical instrument</td></tr>
<tr class="border-b"><td class="font-bold p-2">flecu</td><td class="p-2">x₁ (Entity) is a current or flow or river of or in fluid x₂ (Entity) flowing towards x₃ (Location) from source x₄ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fliba</td><td class="p-2">x₁ (Entity) fails at doing x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">flira</td><td class="p-2">x₁ (Entity) is a face head body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">foldi</td><td class="p-2">x₁ (Entity) is a field broad uniform expanse of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fonmo</td><td class="p-2">x₁ (Entity) is a quantity of foam or froth or suds of material x₂ (Entity) with bubbles of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fonxa</td><td class="p-2">x₁ (Entity) is a telephone transceiver or modem attached to system or network x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">forca</td><td class="p-2">x₁ (Entity) is a fork tool or utensil for purpose x₂ (nu, Event) with tines or prongs x₃ (Entity) on base or support x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fraso</td><td class="p-2">x₁ (Entity) reflects French or Gallic culture or nationality or language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">frati</td><td class="p-2">x₁ (Entity) reacts or responds or answers with action x₂ (ka, Property of x₁) to stimulus x₃ (Entity or nu, Event) under conditions x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fraxu</td><td class="p-2">x₁ (Entity) forgives x₂ (Entity) for event or state or activity x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">frica</td><td class="p-2">x₁ (Entity) differs or is distinct from x₂ (Entity) in property or dimension or quantity x₃ (ka, Relation&lt;x₁, x₂&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">friko</td><td class="p-2">x₁ (Entity) reflects African culture or nationality or geography in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">frili</td><td class="p-2">x₁ (nu, Event) is easy or simple or facile for agent x₂ (Entity) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">frinu</td><td class="p-2">x₁ (Entity) is a fraction with numerator x₂ (Number) and denominator x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">friti</td><td class="p-2">x₁ (Entity) offers or proffers x₂ (ka, Property of x₃) to x₃ (Entity) with conditions x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">frumu</td><td class="p-2">x₁ (Entity) frowns or grimaces</td></tr>
<tr class="border-b"><td class="font-bold p-2">fukpi</td><td class="p-2">x₁ (Entity) is a copy or replica or duplicate or clone of x₂ (Entity) in form or medium x₃ (Entity) made by method x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fulta</td><td class="p-2">x₁ (Entity) floats on or in fluid x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">funca</td><td class="p-2">x₁ (ka, Property of x₂) is determined by the luck or fortune of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fusra</td><td class="p-2">x₁ (Entity) rots or decays or ferments with decay or fermentation agent x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">fuzme</td><td class="p-2">x₁ (Entity) is responsible or accountable for x₂ (nu, Event or State) to judge or authority x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gacri</td><td class="p-2">x₁ (Entity) is a cover or lid or top for covering or concealing or sheltering x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gadri</td><td class="p-2">x₁ (Text) is an article or descriptor labelling description x₂ (Text) in language x₃ (Entity) with semantics x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">galfi</td><td class="p-2">x₁ (nu, Event) modifies or alters or changes or transforms or converts x₂ (Entity) into x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">galtu</td><td class="p-2">x₁ (Entity) is high or upward in frame of reference x₂ (Entity) compared with baseline or standard height x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">galxe</td><td class="p-2">x₁ (Entity) is a throat or gullet body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ganlo</td><td class="p-2">x₁ (Entity) is a portal or passage or entrance-way that is closed or shut preventing passage or access to x₂ (Entity) by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ganra</td><td class="p-2">x₁ (Entity) is broad or wide in dimension x₂ (ka, Property of x₁) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ganse</td><td class="p-2">x₁ (Entity) senses or detects or notices stimulus x₂ (Entity or nu, Event) by means x₃ (Entity) under conditions x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ganti</td><td class="p-2">x₁ (Entity) is a gonad or testes or ovary body-part of x₂ (Organism) of sex x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ganxo</td><td class="p-2">x₁ (Entity) is an anus or anal orifice body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ganzu</td><td class="p-2">x₁ (Entity) organizes x₂ (Entity or Group&lt;Entity&gt;) into ordered result x₃ (Entity or Group&lt;Entity&gt;) by system or principle(s) x₄ (du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gapci</td><td class="p-2">x₁ (Entity) is gaseous or a gas or vapor of material including x₂ (Entity) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gapru</td><td class="p-2">x₁ (Entity) is directly or vertically above x₂ (Entity) in gravity or frame x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">garna</td><td class="p-2">x₁ (Entity) is a rail or railing or bar supporting or restraining x₂ (Entity) made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gasnu</td><td class="p-2">x₁ (Entity) as agent brings about event x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gasta</td><td class="p-2">x₁ (Entity) is a quantity of or is made of or contains steel of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">genja</td><td class="p-2">x₁ (Entity) is a root body-part of plant or species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gento</td><td class="p-2">x₁ (Entity) reflects Argentinian culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">genxu</td><td class="p-2">x₁ (Entity) is a hook or crook shape of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gerku</td><td class="p-2">x₁ (Organism) is a dog or canine of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gerna</td><td class="p-2">x₁ (Entity) is the grammar or rules or defining form of language x₂ (Entity) for structure or text x₃ (Text)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gidva</td><td class="p-2">x₁ (Entity or nu, Event) guides or conducts or pilots or leads x₂ (Entity or Group&lt;Entity&gt;) in or at event x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gigdo</td><td class="p-2">x₁ (Entity) is 10^9 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ginka</td><td class="p-2">x₁ (Location) is a camp or encampment or temporary residence of x₂ (Entity or Group&lt;Entity&gt;) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">girzu</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is a group or cluster or team showing common property x₂ (ka, Property of member of x₁) with members x₃ (Set&lt;Entity&gt;) linked by relations x₄ (Relation&lt;members of x₃&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gismu</td><td class="p-2">x₁ (Text) is a Lojban root word expressing relation x₂ (Relation&lt;members of x₃&gt;) among argument roles x₃ (Sequence&lt;Entity&gt;) with affixes x₄ (Sequence&lt;Text&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">glare</td><td class="p-2">x₁ (Entity) is hot or warm by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gleki</td><td class="p-2">x₁ (Entity) is happy or merry or glad or gleeful about x₂ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gletu</td><td class="p-2">x₁ (Entity) copulates or mates or has sexual intercourse with x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">glico</td><td class="p-2">x₁ (Entity) is English or pertains to English-speaking culture in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gluta</td><td class="p-2">x₁ (Entity) is a mitten or glove garment of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gocti</td><td class="p-2">x₁ (Entity) is 10^-24 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gotro</td><td class="p-2">x₁ (Entity) is 10^24 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gradu</td><td class="p-2">x₁ (Entity) is a unit or degree on scale x₂ (v) measuring property x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">grake</td><td class="p-2">x₁ (Entity) is x₂ (Number) grams in mass by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">grana</td><td class="p-2">x₁ (Entity) is a rod or pole or staff or stick or cane shape of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">grasu</td><td class="p-2">x₁ (Entity) is a quantity of or is made of or contains grease or fat or oil from source x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">greku</td><td class="p-2">x₁ (Entity) is a frame or structure or skeleton supporting or determining the form of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">grusi</td><td class="p-2">x₁ (Entity) is gray in color</td></tr>
<tr class="border-b"><td class="font-bold p-2">grute</td><td class="p-2">x₁ (Entity) is a fruit of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gubni</td><td class="p-2">x₁ (Entity) is public or jointly available to community x₂ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gugde</td><td class="p-2">x₁ (Entity) is a country of peoples x₂ (Group&lt;Entity&gt;) with territory x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gundi</td><td class="p-2">x₁ (Entity) is industry or industrial manufacturing activity producing x₂ (Entity) by process or means x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gunka</td><td class="p-2">x₁ (Entity) works or labors on activity x₂ (ka, Property of x₁) with goal x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gunma</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is a mass or team or aggregate together composed of components x₂ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gunro</td><td class="p-2">x₁ (Entity) rolls on or against surface x₂ (Entity) rotating on axis or axle x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gunse</td><td class="p-2">x₁ (Organism) is a goose of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gunta</td><td class="p-2">x₁ (Entity or Group&lt;Entity&gt;) attacks or invades or commits aggression upon victim x₂ (Entity) with goal x₃ (nu, Event or ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gurni</td><td class="p-2">x₁ (Entity) is grain or cereal from plant or species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">guska</td><td class="p-2">x₁ (Entity) scrapes or erodes or abrades x₂ (Entity) from x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gusni</td><td class="p-2">x₁ (Entity) is light or illumination illuminating x₂ (Entity) from light source x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gusta</td><td class="p-2">x₁ (Location) is a restaurant or cafe or diner serving type-of-food x₂ (Entity) to audience x₃ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gutci</td><td class="p-2">x₁ (Entity) is x₂ (Number) short local distance units in dimension x₃ (ka, Property of x₁) by standard x₄ (si&#039;o, Standard) with subunits x₅ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">gutra</td><td class="p-2">x₁ (Entity) is a womb or uterus body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">guzme</td><td class="p-2">x₁ (Entity) is a melon or squash fruit or plant of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jabre</td><td class="p-2">x₁ (Entity) brakes or causes to slow motion or activity x₂ (Entity or nu, Event) with mechanism or principle x₃ (Entity or du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jadni</td><td class="p-2">x₁ (Entity) adorns or decorates x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jakne</td><td class="p-2">x₁ (Entity) is a rocket vehicle propelled by jet expelling x₂ (Entity) carrying payload x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jalge</td><td class="p-2">x₁ (nu, Event or State) is a result or outcome or conclusion of antecedent x₂ (nu, Event or Process)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jalna</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of starch from source x₂ (Entity) of composition including x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jalra</td><td class="p-2">x₁ (Organism) is a cockroach or termite or orthopteran of order or species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jamfu</td><td class="p-2">x₁ (Entity) is a foot body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jamna</td><td class="p-2">x₁ (Entity or Group&lt;Entity&gt;) wars against x₂ (Entity or Group&lt;Entity&gt;) over territory or matter x₃ (du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">janbe</td><td class="p-2">x₁ (Entity) is a bell or chime or tuning fork producing sound x₂ (Sound)</td></tr>
<tr class="border-b"><td class="font-bold p-2">janco</td><td class="p-2">x₁ (Entity) is a shoulder or hip joint body-part attaching limb x₂ (Entity) to body x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">janli</td><td class="p-2">x₁ (Entity) collides with or crashes or bumps or runs into x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jansu</td><td class="p-2">x₁ (Entity) is a diplomat or consul representing polity x₂ (Entity) in negotiation x₃ (nu, Event) for function or purpose x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">janta</td><td class="p-2">x₁ (Entity) is an account or bill or invoice for goods or services x₂ (Entity or nu, Event) billed to x₃ (Entity) by x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jarbu</td><td class="p-2">x₁ (Location) is a suburban area of city or metropolis x₂ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jarco</td><td class="p-2">x₁ (Entity) shows or exhibits or displays or reveals or demonstrates property x₂ (ka, Property of x₁) to audience x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jarki</td><td class="p-2">x₁ (Entity) is narrow in dimension x₂ (ka, Property of x₁) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jaspu</td><td class="p-2">x₁ (Entity) is a passport issued to person x₂ (Entity) by authority x₃ (Entity) allowing activity x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jatna</td><td class="p-2">x₁ (Entity) is a captain or commander or leader of vehicle or domain x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">javni</td><td class="p-2">x₁ (Entity) is a rule prescribing or mandating or requiring event or state x₂ (nu, Event) within system or community x₃ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jbama</td><td class="p-2">x₁ (Entity) is a bomb or explosive device with explosive material or principle x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jbari</td><td class="p-2">x₁ (Entity) is a berry fruit or plant of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jbena</td><td class="p-2">x₁ (Entity) is born to parent x₂ (Entity) at time x₃ (TimeInterval) and place x₄ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jbera</td><td class="p-2">x₁ (Entity) borrows or temporarily takes object x₂ (Entity) from source x₃ (Entity) for interval x₄ (TimeInterval)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jbini</td><td class="p-2">x₁ (Entity) is between or among set or bounds x₂ (Set&lt;Entity&gt;) in property x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jdari</td><td class="p-2">x₁ (Entity) is firm or hard or resistant or unyielding to force x₂ (nu, Event or Entity) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jdice</td><td class="p-2">x₁ (Entity) decides decision x₂ (du&#039;u, Proposition) about matter x₃ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jdika</td><td class="p-2">x₁ (Entity) decreases or contracts or is reduced in property or quantity x₂ (ka, Property of x₁) by amount x₃ (Entity or Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jdima</td><td class="p-2">x₁ (ka, Property of x₄) is the price of x₂ (ka, Property of x₃) to purchaser x₃ (Entity) set by vendor x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jdini</td><td class="p-2">x₁ (Entity) is money or currency issued by x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jduli</td><td class="p-2">x₁ (Entity) is a quantity of jelly or semisolid of material including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jecta</td><td class="p-2">x₁ (Entity) is a polity or state governing territory or domain x₂ (Location or Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jeftu</td><td class="p-2">x₁ (TimeInterval) is x₂ (Number) weeks in duration by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jegvo</td><td class="p-2">x₁ (Entity) pertains to Abrahamic common culture or religion or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jelca</td><td class="p-2">x₁ (Entity) burns or ignites or is flammable at temperature x₂ (Number) in atmosphere x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jemna</td><td class="p-2">x₁ (Entity) is a gem or polished stone or pearl of type x₂ (Entity) from material or source x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jenca</td><td class="p-2">x₁ (nu, Event) shocks or stuns x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jendu</td><td class="p-2">x₁ (Entity) is an axle or spindle tool on which x₂ (Entity) rotates made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jenmi</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is an army serving group or community x₂ (Group&lt;Entity&gt;) in function x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jerna</td><td class="p-2">x₁ (Entity) earns or deserves or merits wages or salary or pay x₂ (ka, Property of x₁) for work or service x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jersi</td><td class="p-2">x₁ (Entity) chases or pursues or physically follows after x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jerxo</td><td class="p-2">x₁ (Entity) reflects Algerian culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jesni</td><td class="p-2">x₁ (Entity) is a needle pointed shape of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jetce</td><td class="p-2">x₁ (Entity) is a jet expelled stream of material x₂ (Entity) expelled from x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jetnu</td><td class="p-2">x₁ (du&#039;u, Proposition) is true by standard or epistemology or metaphysics x₂ (du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jgalu</td><td class="p-2">x₁ (Entity) is a claw or nail or talon body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jganu</td><td class="p-2">x₁ (Entity) is an angle shape from vertex x₂ (Entity) subtended by lateral segment x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jgari</td><td class="p-2">x₁ (Entity) grasps or holds or clutches or seizes or grips x₂ (Entity) with body-part x₃ (Entity) at locus x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jgena</td><td class="p-2">x₁ (Entity) is a knot or tangle in or between x₂ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jgina</td><td class="p-2">x₁ (Entity) is a gene of creature x₂ (Organism) determining trait or process x₃ (ka, Property of x₂ or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jgira</td><td class="p-2">x₁ (Entity) feels pride in or about x₂ (Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jgita</td><td class="p-2">x₁ (Entity) is a guitar or violin or stringed musical instrument with plectrum or bow x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jibni</td><td class="p-2">x₁ (Entity) is near or close to x₂ (Entity) in property or quantity x₃ (ka, Relation&lt;x₁, x₂&gt; or ni)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jibri</td><td class="p-2">x₁ (ka, Property of x₂) is a job or occupation or employment of person x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jicla</td><td class="p-2">x₁ (Entity or nu, Event) stirs or mixes or agitates fluid x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jicmu</td><td class="p-2">x₁ (Property of x₂) is a basis or foundation or fundamental principle of x₂ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jijnu</td><td class="p-2">x₁ (Entity) intuits fact x₂ (du&#039;u, Proposition) about subject x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jikca</td><td class="p-2">x₁ (Entity) interacts or behaves socially with x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jikru</td><td class="p-2">x₁ (Entity) is a quantity of or is made of or contains liquor distilled from x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jilka</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of alkali or base of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jilra</td><td class="p-2">x₁ (Entity) is jealous of or envies x₂ (Entity) about property x₃ (ka, Property of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jimca</td><td class="p-2">x₁ (Entity) is a branch or bough or limb of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jimpe</td><td class="p-2">x₁ (Entity) understands fact x₂ (du&#039;u, Proposition) about subject x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jimte</td><td class="p-2">x₁ (Entity) is a limit or extreme or bound or border of x₂ (Entity) in property or domain x₃ (ka, Relation&lt;x₁, x₂&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jinci</td><td class="p-2">x₁ (Entity) is a pair of shears or scissors for cutting x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jinga</td><td class="p-2">x₁ (Entity or Group&lt;Entity&gt;) wins or gains prize x₂ (ka, Property of x₁) from competitors x₃ (Entity or Group&lt;Entity&gt;) in competition x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jinku</td><td class="p-2">x₁ (Entity) is a vaccine or immune-system stimulant protecting x₂ (Entity) against disease x₃ (nu, Event or ka, Property of x₂) introduced by method x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jinme</td><td class="p-2">x₁ (Entity) is a quantity of or is made of or contains metal of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jinru</td><td class="p-2">x₁ (Entity) is immersed or submerged or bathes in liquid x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jinsa</td><td class="p-2">x₁ (Entity) is clean or pure of material or contaminant x₂ (Entity) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jinto</td><td class="p-2">x₁ (Location) is a well or spring of fluid x₂ (Entity) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jinvi</td><td class="p-2">x₁ (Entity) opines that x₂ (du&#039;u, Proposition) is true about subject x₃ (Entity) on grounds x₄ (du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jinzi</td><td class="p-2">x₁ (ka, Property of x₂) is an innate or inherent or intrinsic or natural property of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jipci</td><td class="p-2">x₁ (Organism) is a chicken or small fowl of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jipno</td><td class="p-2">x₁ (Entity) is a tip or point or vertex or extremity or end on object x₂ (Entity) at locus x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jirna</td><td class="p-2">x₁ (Entity) is a horn body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jisra</td><td class="p-2">x₁ (Entity) is a quantity of or is made of or contains juice or nectar from source x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jitfa</td><td class="p-2">x₁ (du&#039;u, Proposition) is false or an untruth by standard or epistemology or metaphysics x₂ (du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jitro</td><td class="p-2">x₁ (Entity) has control over or manages or directs or conducts x₂ (Entity or Group&lt;Entity&gt;) in activity or event x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jivbu</td><td class="p-2">x₁ (Entity) weaves x₂ (Entity) from material or yarn x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jivna</td><td class="p-2">x₁ (Entity) competes or vies with opponent x₂ (Entity) in contest x₃ (nu, Event) for gain x₄ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jmaji</td><td class="p-2">x₁ (Group&lt;Entity&gt;) gathers or collects at location x₂ (Location) from locations x₃ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jmifa</td><td class="p-2">x₁ (Location) is a shoal or reef of material x₂ (Entity) in body of water x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jmina</td><td class="p-2">x₁ (Entity) adds or combines x₂ (Entity or ka, Property of x₃) to x₃ (Entity) with result x₄ (Entity or ka, Property of x₃)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jmive</td><td class="p-2">x₁ (Organism) lives or is alive by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jordo</td><td class="p-2">x₁ (Entity) reflects Jordanian culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jorne</td><td class="p-2">x₁ (Entity) is joined to or connects to or is united with x₂ (Entity) at common locus x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jubme</td><td class="p-2">x₁ (Entity) is a table with flat upper surface of material x₂ (Entity) supported by legs or base or pedestal x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">judri</td><td class="p-2">x₁ (Text) is an address or coordinates of x₂ (Entity) in system x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jufra</td><td class="p-2">x₁ (Text) is a sentence or statement about topic x₂ (Entity) in language x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jukni</td><td class="p-2">x₁ (Organism) is a spider or arachnid or crustacean or crab or non-insect arthropod of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jukpa</td><td class="p-2">x₁ (Entity) cooks or prepares food x₂ (Entity) by recipe or method x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">julne</td><td class="p-2">x₁ (Entity) is a net or filter allowing passage of x₂ (Entity) and prohibiting passage of x₃ (Entity) with netting properties x₄ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jundi</td><td class="p-2">x₁ (Entity) is attentive towards or attends or pays attention to object or affair x₂ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jungo</td><td class="p-2">x₁ (Entity) reflects Chinese culture or nationality or language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">junla</td><td class="p-2">x₁ (Entity) is a clock or watch or timer measuring time units x₂ (Entity) to precision x₃ (Entity) with mechanism x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">junri</td><td class="p-2">x₁ (Entity) is serious or earnest about x₂ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">junta</td><td class="p-2">x₁ (Entity) is the weight of object x₂ (Entity) in field x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jurme</td><td class="p-2">x₁ (Organism) is a bacterium or germ or microbe of species or defining property x₂ (Taxon or ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jursa</td><td class="p-2">x₁ (nu, Event or State) is severe or harsh to x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jutsi</td><td class="p-2">x₁ (Entity) is a species or taxon of super-taxon x₂ (Entity) and higher taxon x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">juxre</td><td class="p-2">x₁ (nu, Event) is clumsy or awkward by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">jvinu</td><td class="p-2">x₁ (Entity) is a view or scene or panorama or sight of x₂ (Entity or Location) from viewpoint x₃ (Location or Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kabri</td><td class="p-2">x₁ (Entity) is a cup or glass or tumbler or mug or vessel containing contents x₂ (Entity) and made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kacma</td><td class="p-2">x₁ (Entity) is a camera recording images of illumination type x₂ (Entity) to medium x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kadno</td><td class="p-2">x₁ (Entity) reflects Canadian culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kafke</td><td class="p-2">x₁ (Entity) coughs or farts or burps up gas x₂ (Entity) from orifice x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kagni</td><td class="p-2">x₁ (Entity) is a company or corporation or firm or partnership chartered by authority x₂ (Entity) for purpose x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kajde</td><td class="p-2">x₁ (ka, Property of x₂) warns or cautions person x₂ (Entity) of danger x₃ (ka, Property of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kajna</td><td class="p-2">x₁ (Entity) is a shelf or counter or bar attached to supporting object x₂ (Entity) for purpose x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kakne</td><td class="p-2">x₁ (Entity) is able or capable of doing or being x₂ (nu, Event or State) under conditions x₃ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kakpa</td><td class="p-2">x₁ (Entity) digs material x₂ (Entity) out of source or hole x₃ (Entity) with limbs or tools x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kalci</td><td class="p-2">x₁ (Entity) is feces or excrement or dung of organism x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kalri</td><td class="p-2">x₁ (Entity) is an open portal or passage permitting access to x₂ (Entity) by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kalsa</td><td class="p-2">x₁ (Entity) is chaotic or disordered in property x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kalte</td><td class="p-2">x₁ (Entity) hunts or stalks prey x₂ (Entity) for purpose x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kamju</td><td class="p-2">x₁ (Entity) is a column or pillar of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kamni</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is a committee with task or purpose x₂ (nu, Event) of body x₃ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kampu</td><td class="p-2">x₁ (ka, Property of members of x₂) is common or general or universal among members of set x₂ (Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kanba</td><td class="p-2">x₁ (Organism) is a goat of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kancu</td><td class="p-2">x₁ (Entity) counts the number in set x₂ (Set&lt;Entity&gt;) to be x₃ (Number) by units x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kandi</td><td class="p-2">x₁ (Entity) is dim or dull or pale or non-intense in property x₂ (ka, Property of x₁) as received by observer x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kanji</td><td class="p-2">x₁ (Entity) calculates or reckons or computes value x₂ (ni, Amount of nonce place or State) from data x₃ (Entity) by process x₄ (ka, property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kanla</td><td class="p-2">x₁ (Entity) is an eye body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kanro</td><td class="p-2">x₁ (Entity) is healthy or fit or well by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kansa</td><td class="p-2">x₁ (Entity) is with or accompanies or is a companion of x₂ (Entity) in state x₃ (nu, Event or State of x₁ and x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kantu</td><td class="p-2">x₁ (Entity) is a quantum or ray or elementary particle of property or activity x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kanxe</td><td class="p-2">x₁ (Entity) is a conjunction stating that x₂ (du&#039;u, Proposition) and x₃ (du&#039;u, Proposition) are both true</td></tr>
<tr class="border-b"><td class="font-bold p-2">karbi</td><td class="p-2">x₁ (Entity) compares x₂ (Entity) with x₃ (Entity) in property x₄ (ka, Relation&lt;x₂, x₃&gt;) determining comparison state x₅ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">karce</td><td class="p-2">x₁ (Entity) is a car or automobile or truck or van for carrying x₂ (Entity) propelled by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">karda</td><td class="p-2">x₁ (Entity) is a card nearly two-dimensional shape of material x₂ (Entity) with shape x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kargu</td><td class="p-2">x₁ (ka, Property of x₂) is costly or expensive or dear to x₂ (Entity) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">karli</td><td class="p-2">x₁ (Entity) is a collar or ring or belt or band around x₂ (Entity) made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">karni</td><td class="p-2">x₁ (Entity) is a journal or periodical or magazine or newspaper with content x₂ (Entity) published by x₃ (Entity) for audience x₄ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">katna</td><td class="p-2">x₁ (Entity or Force) cuts or splits or divides object x₂ (Entity) into pieces x₃ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kavbu</td><td class="p-2">x₁ (Entity) captures or catches or apprehends or seizes x₂ (Entity) with trap or restraint x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kecti</td><td class="p-2">x₁ (Entity) pities or feels sorry for x₂ (Entity) about x₃ (Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kelci</td><td class="p-2">x₁ (Entity) plays with toy x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kelvo</td><td class="p-2">x₁ (Entity) is x₂ (Number) kelvin in temperature by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kenra</td><td class="p-2">x₁ (Entity) is a cancer disease in x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kensa</td><td class="p-2">x₁ (Location) is outer space near or associated with celestial body or region x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kerfa</td><td class="p-2">x₁ (Entity) is hair or fur body-part of x₂ (Organism) at location x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kerlo</td><td class="p-2">x₁ (Entity) is an ear body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ketco</td><td class="p-2">x₁ (Entity) reflects South American culture or nationality or geography in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kevna</td><td class="p-2">x₁ (Entity) is a cavity or hole or hollow or cavern in x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kicne</td><td class="p-2">x₁ (Entity) cushions x₂ (Entity) with material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kijno</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of oxygen x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kilto</td><td class="p-2">x₁ (Entity) is 10^3 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kinli</td><td class="p-2">x₁ (Entity) is sharp or keen at locus x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kisto</td><td class="p-2">x₁ (Entity) reflects Pakistani or Pashto culture or nationality or language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">klaji</td><td class="p-2">x₁ (Location) is a street or avenue or lane or alley at x₂ (Location) allowing access to x₃ (Location or Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">klaku</td><td class="p-2">x₁ (Entity) weeps or cries tears x₂ (Entity) about reason x₃ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">klama</td><td class="p-2">x₁ (Entity) goes or comes to destination x₂ (Location or Entity) from origin x₃ (Location or Entity) via route x₄ (Sequence&lt;Location&gt; or Group&lt;Location&gt;) using means or vehicle x₅ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">klani</td><td class="p-2">x₁ (Entity) is measured by number x₂ (Number) on scale x₃ (si&#039;o, Scale of property of x₁ with kau)</td></tr>
<tr class="border-b"><td class="font-bold p-2">klesi</td><td class="p-2">x₁ (Entity or si&#039;o, Idea) is a class or category or subgroup or subset within x₂ (Entity) with defining property x₃ (ka, Property of members of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">klina</td><td class="p-2">x₁ (Entity) is clear or transparent to transmission x₂ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kliru</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of halogen of type x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kliti</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of clay of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">klupe</td><td class="p-2">x₁ (Entity) is a screw fastener for purpose x₂ (nu, Event) with threads x₃ (Entity) and frame x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kluza</td><td class="p-2">x₁ (Entity) is loose or bloused or not tight on x₂ (Entity) at locus x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kobli</td><td class="p-2">x₁ (Entity) is a quantity of cabbage or lettuce or leafy vegetable of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kojna</td><td class="p-2">x₁ (Entity) is a corner or solid angle in or on x₂ (Entity) of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kolme</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of coal or peat or anthracite or bitumen from source x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">komcu</td><td class="p-2">x₁ (Entity) is a comb shape of material x₂ (Entity) with tines or needles x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">konju</td><td class="p-2">x₁ (Entity) is a cone shape of material x₂ (Entity) with vertex x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">korbi</td><td class="p-2">x₁ (Entity) is an edge or margin or border or curb or boundary of x₂ (Entity) next to x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">korcu</td><td class="p-2">x₁ (Entity) is bent or crooked or not straight or twisted or folded</td></tr>
<tr class="border-b"><td class="font-bold p-2">korka</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of cork or bark from tree x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kosta</td><td class="p-2">x₁ (Entity) is a coat or jacket or sweater garment of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kramu</td><td class="p-2">x₁ (Entity) is x₂ (Number) local area units in standard x₃ (Entity) with subunits x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">krasi</td><td class="p-2">x₁ (Location or nu, Event) is a source or start or beginning or origin of x₂ (Entity or nu, Event or Process)</td></tr>
<tr class="border-b"><td class="font-bold p-2">krati</td><td class="p-2">x₁ (Entity) represents or is a proxy or stands in for x₂ (Entity) in matter or function x₃ (Relation&lt;x₁, x₂&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">krefu</td><td class="p-2">x₁ (nu, Event) is the x₃-th recurrence of x₂ (Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">krici</td><td class="p-2">x₁ (Entity) believes creed x₂ (du&#039;u, Proposition) is true about subject x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">krili</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of crystal of composition x₂ (Entity) in form or arrangement x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">krinu</td><td class="p-2">x₁ (nu, Event or State) is a reason or justification or explanation for x₂ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">krixa</td><td class="p-2">x₁ (Entity) cries out or yells or howls sound x₂ (Sound)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kruca</td><td class="p-2">x₁ (Entity) intersects or crosses or traverses x₂ (Entity) at locus x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kruji</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of cream or emulsion or puree of composition x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kruvi</td><td class="p-2">x₁ (Entity) is a curve or turn or bend in x₂ (Entity) at locus x₃ (Entity) defined by set of points or properties x₄ (Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kubli</td><td class="p-2">x₁ (Entity) is a cube or regular polyhedron of dimensions x₂ (Entity) with surfaces or sides x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kucli</td><td class="p-2">x₁ (Entity) is curious about or wonders about or is inquisitive about x₂ (Entity or Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kufra</td><td class="p-2">x₁ (Entity) feels comfort or is comfortable with conditions or environmental properties x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kukte</td><td class="p-2">x₁ (Entity) is delicious or tasty or delightful to observer or sense x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kulnu</td><td class="p-2">x₁ (Entity) is a culture of nation or ethos x₂ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kumfa</td><td class="p-2">x₁ (Location) is a room of or in structure x₂ (Entity) surrounded by partitions or walls or ceiling or floor x₃ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kumte</td><td class="p-2">x₁ (Organism) is a camel or llama or alpaca or vicuna of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kunra</td><td class="p-2">x₁ (Entity) is or contains or is made from a mineral or ore of metal type x₂ (Entity) mined from location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kunti</td><td class="p-2">x₁ (Entity) is empty or vacant of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kurfa</td><td class="p-2">x₁ (Entity) is a right-angled shape defined by vertices x₂ (Set&lt;Entity&gt;) with dimensions x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kurji</td><td class="p-2">x₁ (Entity) takes care of or looks after or attends to or provides for x₂ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kurki</td><td class="p-2">x₁ (Entity) is bitter or acrid to observer or sense x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kuspe</td><td class="p-2">x₁ (Entity) ranges or extends or spans or persists or reaches across range x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">kusru</td><td class="p-2">x₁ (Entity) is cruel or mean or unkind to victim x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">labno</td><td class="p-2">x₁ (Organism) is a wolf of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lacpu</td><td class="p-2">x₁ (Entity) pulls or tugs or draws or drags x₂ (Entity) by handle or at locus x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lacri</td><td class="p-2">x₁ (Entity) relies or depends or counts on or trusts x₂ (Entity) to bring about or ensure or maintain x₃ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ladru</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of milk from source x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lafti</td><td class="p-2">x₁ (Entity or Force) lifts or applies raising force to x₂ (Entity) at locus x₃ (Entity) in gravity well x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lakne</td><td class="p-2">x₁ (nu, Event) is probable or likely under conditions x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lakse</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of wax from source x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lalxu</td><td class="p-2">x₁ (Location) is a lake or lagoon or pool at site or within land mass x₂ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lamji</td><td class="p-2">x₁ (Entity) is adjacent or beside or next to or in contact with x₂ (Entity) in property or sequence x₃ (Entity) in direction x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lanbi</td><td class="p-2">x₁ (Entity) is a quantity of protein or albumin of type x₂ (Entity) composed of amino acids x₃ (Sequence&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lanci</td><td class="p-2">x₁ (Entity) is a flag or banner or standard of or symbolizing x₂ (Entity) with pattern x₃ (Entity) on material x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lanka</td><td class="p-2">x₁ (Entity) is a basket containing x₂ (Entity) woven from material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lanli</td><td class="p-2">x₁ (Entity) analyzes or examines in detail x₂ (Entity) by method or technique x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lanme</td><td class="p-2">x₁ (Organism) is a sheep of species x₂ (Taxon) of flock x₃ (Group&lt;Organism&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lante</td><td class="p-2">x₁ (Entity) is a can sealed container for perishable contents x₂ (Entity) made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lanxe</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is in balance or equilibrium under forces x₂ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lanzu</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is a family with members including x₂ (Entity) bonded by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">larcu</td><td class="p-2">x₁ (nu, Process) is an art creative application of craft or skill x₂ (nu, Event or Idea)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lasna</td><td class="p-2">x₁ (Entity) fastens or connects or attaches or binds or lashes x₂ (Entity) to x₃ (Entity) with fastener x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lastu</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of brass of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">latmo</td><td class="p-2">x₁ (Entity) reflects Latin or Roman or Romance culture or language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">latna</td><td class="p-2">x₁ (Entity) is a lotus plant or flower of species x₂ (Taxon) symbolizing x₃ (Entity) to culture or religion x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lazni</td><td class="p-2">x₁ (Entity) is lazy or avoids work concerning action x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lebna</td><td class="p-2">x₁ (Entity) takes or gets or gains or obtains or seizes x₂ (ka, Property of x₁) from possessor x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lenjo</td><td class="p-2">x₁ (Entity) is a lens focussing rays x₂ (Entity) to focus x₃ (Entity) by means or material x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lenku</td><td class="p-2">x₁ (Entity) is cold or cool by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lerci</td><td class="p-2">x₁ (nu, Event) is late by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lerfu</td><td class="p-2">x₁ (Text) is a letter or digit or symbol in alphabet or character set x₂ (Entity) representing x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">libjo</td><td class="p-2">x₁ (Entity) reflects Libyan culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lidne</td><td class="p-2">x₁ (Entity) precedes or leads x₂ (Entity) in sequence x₃ (Sequence&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lifri</td><td class="p-2">x₁ (Entity) undergoes or experiences event x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lijda</td><td class="p-2">x₁ (Entity) is a religion of believers including x₂ (Group&lt;Entity&gt;) sharing beliefs x₃ (du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">limna</td><td class="p-2">x₁ (Entity) swims in fluid x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lindi</td><td class="p-2">x₁ (Entity) is lightning or electrical arc or thunderbolt striking at x₂ (Entity) from x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">linji</td><td class="p-2">x₁ (Entity) is a line one-dimensional shape defined by points x₂ (Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">linsi</td><td class="p-2">x₁ (Entity) is a length of chain of material x₂ (Entity) with link properties x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">linto</td><td class="p-2">x₁ (Entity) is lightweight in mass or weight by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lisri</td><td class="p-2">x₁ (Text) is a story or tale or narrative about subject or moral x₂ (Entity) by storyteller x₃ (Entity) to audience x₄ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">liste</td><td class="p-2">x₁ (Entity) is a list or catalog or register of sequence or set x₂ (Sequence&lt;Entity&gt; or Set&lt;Entity&gt;) in order x₃ (Entity) in medium x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">litce</td><td class="p-2">x₁ (Entity) is x₂ (Number) liters in volume by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">litki</td><td class="p-2">x₁ (Entity) is liquid of composition including x₂ (Entity) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">litru</td><td class="p-2">x₁ (Entity) travels or journeys or goes via route x₂ (Sequence&lt;Location&gt; or Group&lt;Location&gt;) using means or vehicle x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">livga</td><td class="p-2">x₁ (Entity) is a liver body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">livla</td><td class="p-2">x₁ (Entity) is a fuel or energy source for powering x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">logji</td><td class="p-2">x₁ (Entity) is a logic for reasoning about x₂ (du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lojbo</td><td class="p-2">x₁ (Entity) reflects Lojbanic language or culture or community in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">loldi</td><td class="p-2">x₁ (Entity) is a floor or bottom or ground of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lorxu</td><td class="p-2">x₁ (Organism) is a fox of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lubno</td><td class="p-2">x₁ (Entity) reflects Lebanese culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lujvo</td><td class="p-2">x₁ (Text) is a compound predicate word with meaning x₂ (Entity) and arguments x₃ (Sequence&lt;Entity&gt;) built from metaphor x₄ (Text)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lumci</td><td class="p-2">x₁ (Entity) washes or cleanses x₂ (Entity) of contaminant x₃ (Entity) with cleaning material x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lunbe</td><td class="p-2">x₁ (Entity) is bare or naked or nude</td></tr>
<tr class="border-b"><td class="font-bold p-2">lunra</td><td class="p-2">x₁ (Entity) is a major natural satellite or moon of planet x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">lunsa</td><td class="p-2">x₁ (Entity) condenses or liquefies on or into x₂ (Entity) at temperature x₃ (Number) and pressure x₄ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mabla</td><td class="p-2">x₁ (Entity) is execrable or shitty or awful or rotten or inferior in property x₂ (ka, Property of x₁) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mabru</td><td class="p-2">x₁ (Organism) is a mammal of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">macnu</td><td class="p-2">x₁ (nu, Event or Process) is manual not automatic in function x₂ (ka, Property of x₁ or nu, Event) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">makcu</td><td class="p-2">x₁ (Entity) is mature or ripe or fully grown or adult in development quality x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">makfa</td><td class="p-2">x₁ (Entity or nu, Event) is magic or supernatural or sorcery or witchcraft to x₂ (Entity) performed by person or force or deity x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">maksi</td><td class="p-2">x₁ (Entity) is magnetic producing magnetic field x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">malsi</td><td class="p-2">x₁ (Location) is a temple or church or sanctuary or shrine of religion x₂ (Entity) at location or serving area x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mamta</td><td class="p-2">x₁ (Entity) is a mother of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">manci</td><td class="p-2">x₁ (Entity) feels wonder or awe or marvels about x₂ (Entity or Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">manfo</td><td class="p-2">x₁ (Entity or nu, Event) is uniform or homogeneous in property x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">manku</td><td class="p-2">x₁ (Entity) is dark or lacking in illumination</td></tr>
<tr class="border-b"><td class="font-bold p-2">manri</td><td class="p-2">x₁ (Entity or si&#039;o, Idea) is a frame of reference or standard for observing or measuring or determining x₂ (Entity) with rules x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mansa</td><td class="p-2">x₁ (Entity or nu, Event) satisfies evaluator x₂ (Entity) in property or state x₃ (ka, Property of x₁ or nu, State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">manti</td><td class="p-2">x₁ (Organism) is an ant of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mapku</td><td class="p-2">x₁ (Entity) is a cap or hat or crown or helmet or headgear of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mapni</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of cotton material</td></tr>
<tr class="border-b"><td class="font-bold p-2">mapti</td><td class="p-2">x₁ (Entity) fits or matches or suits or is compatible with x₂ (Entity) in property x₃ (ka, Relation&lt;x₁, x₂&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">marbi</td><td class="p-2">x₁ (Location or Entity) is a shelter or haven or refuge or retreat or harbor for protecting x₂ (Entity) from danger x₃ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">marce</td><td class="p-2">x₁ (Entity) is a vehicle or mode of transport carrying x₂ (Entity) in or on surface or medium x₃ (Entity) propelled by x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">marde</td><td class="p-2">x₁ (ka, Property of x₂) are ethics or morals or moral standards of x₂ (Entity or Group&lt;Entity&gt;) about situation x₃ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">margu</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of mercury x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">marji</td><td class="p-2">x₁ (Entity) is material or stuff or matter of composition including x₂ (Entity) in shape x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">marna</td><td class="p-2">x₁ (Entity) is a quantity of hemp or marijuana or jute of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">marxa</td><td class="p-2">x₁ (Entity or Force) mashes or crushes or squashes or smashes x₂ (Entity) into mass x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">masno</td><td class="p-2">x₁ (Entity) is slow or sluggish at doing or being or bringing about x₂ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">masti</td><td class="p-2">x₁ (TimeInterval) is x₂ (Number) months in duration by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">matci</td><td class="p-2">x₁ (Entity) is a mat or pad or mattress or pallet of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">matli</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of linen or flax material</td></tr>
<tr class="border-b"><td class="font-bold p-2">matne</td><td class="p-2">x₁ (Entity) is a quantity of or contains butter or margarine or shortening from source x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">matra</td><td class="p-2">x₁ (Entity) is a motor or engine driving or propelling or providing power to x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mavji</td><td class="p-2">x₁ (Entity) is a quantity of oats grain of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">maxri</td><td class="p-2">x₁ (Entity) is a quantity of wheat grain of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mebri</td><td class="p-2">x₁ (Entity) is a brow or forehead body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">megdo</td><td class="p-2">x₁ (Entity) is 10^6 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mekso</td><td class="p-2">x₁ (Text) is a mathematical expression interpreted under rules x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">melbi</td><td class="p-2">x₁ (Entity) is beautiful or pleasant to x₂ (Entity) in aspect x₃ (ka, Property of x₁) by aesthetic standard x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">meljo</td><td class="p-2">x₁ (Entity) reflects Malaysian or Malay culture or nationality or language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">menli</td><td class="p-2">x₁ (Entity) is a mind or intellect or psyche of body x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mensi</td><td class="p-2">x₁ (Entity) is a sister of x₂ (Entity) by bond x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mentu</td><td class="p-2">x₁ (TimeInterval) is x₂ (Number) minutes in duration by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">merko</td><td class="p-2">x₁ (Entity) reflects USA or American culture or nationality or dialect in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">merli</td><td class="p-2">x₁ (Entity) measures quantity x₂ (Entity or Number) as x₃ (Number) units on scale x₄ (si&#039;o, Scale) with accuracy x₅ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mexno</td><td class="p-2">x₁ (Entity) reflects Mexican culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">midju</td><td class="p-2">x₁ (Entity) is in the middle or center or midpoint of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mifra</td><td class="p-2">x₁ (Text) is encoded or cipher text of plain text x₂ (Text) by code x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mikce</td><td class="p-2">x₁ (Entity) treats or doctors or nurses x₂ (Entity) for ailment x₃ (ka, Property of x₂) by treatment x₄ (nu, Event or ka, Relation&lt;x₁, x₂&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mikri</td><td class="p-2">x₁ (Entity) is 10^-6 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">milti</td><td class="p-2">x₁ (Entity) is 10^-3 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">milxe</td><td class="p-2">x₁ (Entity) is mild or gentle or non-extreme in property x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">minde</td><td class="p-2">x₁ (Entity) issues commands or orders to x₂ (Entity) for result x₃ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">minji</td><td class="p-2">x₁ (Entity) is a machine for function x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">minli</td><td class="p-2">x₁ (Entity) is x₂ (Number) long local distance units in dimension x₃ (ka, Property of x₁) with subunits x₄ (Entity) by standard x₅ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">minra</td><td class="p-2">x₁ (Entity) reflects or mirrors or echoes x₂ (Entity) to observer x₃ (Entity) as x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mintu</td><td class="p-2">x₁ (Entity) is the same or identical thing as x₂ (Entity) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mipri</td><td class="p-2">x₁ (Entity) keeps x₂ (Entity or du&#039;u, Proposition) secret or hidden from x₃ (Entity) by method x₄ (nu, Event or Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mirli</td><td class="p-2">x₁ (Organism) is a deer or elk or moose of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">misno</td><td class="p-2">x₁ (Entity or nu, Event) is famous or renowned among community x₂ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">misro</td><td class="p-2">x₁ (Entity) reflects Egyptian culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mitre</td><td class="p-2">x₁ (Entity) is x₂ (Number) meters in dimension x₃ (ka, Property of x₁) by standard x₄ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mixre</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is a mixture or blend including ingredients x₂ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mlana</td><td class="p-2">x₁ (Entity) is to the side of x₂ (Entity) and facing x₃ (Entity) from viewpoint x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mlatu</td><td class="p-2">x₁ (Organism) is a cat of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mleca</td><td class="p-2">T: Entity. x₁ (T) is less than x₂ (T) in property or quantity x₃ (ka, Property of x₁) by amount x₄ (ni, Amount of T)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mledi</td><td class="p-2">x₁ (Organism) is a mold or fungus of species x₂ (Taxon) growing on x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mluni</td><td class="p-2">x₁ (Entity) is a satellite or moon orbiting x₂ (Entity) with characteristics x₃ (Entity) and orbital parameters x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mokca</td><td class="p-2">x₁ (Entity) is a point or instant or moment at time or place x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">moklu</td><td class="p-2">x₁ (Entity) is a mouth or oral cavity body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">molki</td><td class="p-2">x₁ (Location or Entity) is a mill or industrial plant performing process x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">molro</td><td class="p-2">x₁ (Entity) is x₂ (Number) moles in substance by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">morji</td><td class="p-2">x₁ (Entity) remembers fact x₂ (du&#039;u, Proposition) about subject x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">morko</td><td class="p-2">x₁ (Entity) reflects Moroccan culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">morna</td><td class="p-2">x₁ (Entity) is a pattern of forms or events x₂ (Entity or Group&lt;Entity&gt;) arranged according to structure x₃ (Entity or si&#039;o, Idea)</td></tr>
<tr class="border-b"><td class="font-bold p-2">morsi</td><td class="p-2">x₁ (Entity) is dead or has ceased to be alive</td></tr>
<tr class="border-b"><td class="font-bold p-2">mosra</td><td class="p-2">x₁ (Entity) is friction opposing motion due to rubbing of x₂ (Entity) against x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mraji</td><td class="p-2">x₁ (Entity) is a quantity of rye grain of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mrilu</td><td class="p-2">x₁ (Entity) mails or posts x₂ (Entity) to recipient address x₃ (Entity) from sender address x₄ (Entity) by mail system x₅ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mruli</td><td class="p-2">x₁ (Entity) is a hammer tool for doing x₂ (nu, Event) with head x₃ (Entity) propelled by x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mucti</td><td class="p-2">x₁ (Entity) is immaterial or not physical or without material form</td></tr>
<tr class="border-b"><td class="font-bold p-2">mudri</td><td class="p-2">x₁ (Entity) is a quantity of or is made of or contains wood from tree type x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mukti</td><td class="p-2">x₁ (nu, Event or State) is a motive or incentive for property x₂ (ka, Property of x₃) of agent x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mulno</td><td class="p-2">x₁ (nu, Event) is complete or finished or x₁ (Entity) is whole in property x₂ (ka, Property of x₁) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">munje</td><td class="p-2">x₁ (Entity) is a universe or cosmos of domain x₂ (Entity) defined by rules x₃ (Entity or si&#039;o, Idea)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mupli</td><td class="p-2">x₁ (Entity) is an example or sample or specimen or instance of common property x₂ (ka, Property of members of x₃) of set x₃ (Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">murse</td><td class="p-2">x₁ (TimeInterval) is the twilight or dawn or dusk or half-light of day x₂ (TimeInterval) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">murta</td><td class="p-2">x₁ (Entity) is a curtain or blinds or drapes for covering or obscuring aperture x₂ (Entity) made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">muslo</td><td class="p-2">x₁ (Entity) pertains to Islamic or Moslem or Quranic culture or religion or nation in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mamta</td><td class="p-2">x₁ (Entity) is a mother of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">mutce</td><td class="p-2">x₁ (Entity) is extreme or very much in property x₂ (ka, Property of x₁) towards extreme direction x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">muvdu</td><td class="p-2">x₁ (Entity) moves to destination x₂ (Location or Entity) from origin x₃ (Location or Entity) over path x₄ (Sequence&lt;Location&gt; or Group&lt;Location&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">muzga</td><td class="p-2">x₁ (Location) is a museum for preserving x₂ (Entity) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nabmi</td><td class="p-2">x₁ (nu, Event or State) is a problem to x₂ (Entity) in situation or task or inquiry x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nakni</td><td class="p-2">x₁ (Organism) is a male of species x₂ (Taxon) evidencing masculine traits x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nalci</td><td class="p-2">x₁ (Entity) is a wing body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">namcu</td><td class="p-2">x₁ (Number) is a number or quantifier or digit or value</td></tr>
<tr class="border-b"><td class="font-bold p-2">nanba</td><td class="p-2">x₁ (Entity) is a quantity of or contains bread made from grains x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nanca</td><td class="p-2">x₁ (TimeInterval) is x₂ (Number) years in duration by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nandu</td><td class="p-2">x₁ (Entity or nu, Event) is difficult or hard or challenging for x₂ (Entity) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nanla</td><td class="p-2">x₁ (Entity) is a boy young male person of age x₂ (TimeInterval) immature by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nanmu</td><td class="p-2">x₁ (Entity) is a man male humanoid person</td></tr>
<tr class="border-b"><td class="font-bold p-2">nanvi</td><td class="p-2">x₁ (Entity) is 10^-9 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">narge</td><td class="p-2">x₁ (Entity) is a nut hard-shelled fruit from plant x₂ (Entity) with shell x₃ (Entity) and kernel x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">narju</td><td class="p-2">x₁ (Entity) is orange in color</td></tr>
<tr class="border-b"><td class="font-bold p-2">natfe</td><td class="p-2">x₁ (du&#039;u, Proposition) contradicts or denies or refutes or negates x₂ (du&#039;u, Proposition) under rules or logic x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">natmi</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is a nation or ethnic group of peoples x₂ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">navni</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of noble gas of type x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">naxle</td><td class="p-2">x₁ (Entity) is a canal or channel to x₂ (Location) from x₃ (Location) with route x₄ (Sequence&lt;Location&gt; or Group&lt;Location&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nazbi</td><td class="p-2">x₁ (Entity) is a nose body-part of x₂ (Organism) with nasal passages x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nejni</td><td class="p-2">x₁ (Entity) is energy of type x₂ (Entity) in form x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nelci</td><td class="p-2">x₁ (Entity) is fond of or likes x₂ (Entity or nu, State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nenri</td><td class="p-2">x₁ (Entity) is inside or within x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nibli</td><td class="p-2">x₁ (nu, Event or State) logically necessitates or entails or implies x₂ (nu, Event or State) under rules or logic system x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nicte</td><td class="p-2">x₁ (TimeInterval) is nighttime of day x₂ (TimeInterval) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nikle</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of nickel</td></tr>
<tr class="border-b"><td class="font-bold p-2">nilce</td><td class="p-2">x₁ (Entity) furnishes location x₂ (Location) serving purpose x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nimre</td><td class="p-2">x₁ (Entity) is a quantity of citrus fruit or tree of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ninmu</td><td class="p-2">x₁ (Entity) is a woman female humanoid person</td></tr>
<tr class="border-b"><td class="font-bold p-2">nirna</td><td class="p-2">x₁ (Entity) is a nerve or neuron body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nitcu</td><td class="p-2">x₁ (Entity) needs or requires necessity x₂ (Entity or nu, Event) for purpose or action or stage of process x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nivji</td><td class="p-2">x₁ (Entity) knits cloth or object x₂ (Entity) from yarn x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nixli</td><td class="p-2">x₁ (Entity) is a girl young female person of age x₂ (TimeInterval) immature by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nobli</td><td class="p-2">x₁ (Entity) is noble or aristocratic or elite in culture or society x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">notci</td><td class="p-2">x₁ (Entity or Text) is a message or notice or memorandum about subject x₂ (Entity) from author x₃ (Entity) to intended audience x₄ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nukni</td><td class="p-2">x₁ (Entity) is magenta or purplish-red in color</td></tr>
<tr class="border-b"><td class="font-bold p-2">nupre</td><td class="p-2">x₁ (Entity) promises or commits or assures or threatens event or state x₂ (nu, Event or State) to beneficiary or victim x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nurma</td><td class="p-2">x₁ (Location) is a rural or rustic or pastoral area of x₂ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nutli</td><td class="p-2">x₁ (Entity) is neutral or medial or not taking sides on scale or in dissension x₂ (Entity or si&#039;o, Scale)</td></tr>
<tr class="border-b"><td class="font-bold p-2">nuzba</td><td class="p-2">x₁ (du&#039;u, Proposition) is news or new information about subject x₂ (Entity) from source x₃ (Entity) to observer x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pacna</td><td class="p-2">x₁ (Entity) hopes or wishes or desires event x₂ (nu, Event) with expected likelihood x₃ (Number between 0 and 1)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pagbu</td><td class="p-2">x₁ (Entity) is a part or component or piece or portion of whole or mass x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pagre</td><td class="p-2">x₁ (Entity) passes through or penetrates barrier or medium or portal x₂ (Entity) to destination side x₃ (Entity) from origin side x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pajni</td><td class="p-2">x₁ (Entity) judges or referees or arbitrates matter x₂ (Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">palci</td><td class="p-2">x₁ (Entity) is evil or depraved or wicked by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">palku</td><td class="p-2">x₁ (Entity) is pants or trousers or slacks garment of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">palne</td><td class="p-2">x₁ (Entity) is a tray or platter flat container for contents x₂ (Entity) made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">palta</td><td class="p-2">x₁ (Entity) is a plate or dish or platter or saucer of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pambe</td><td class="p-2">x₁ (Entity) is a pump or injector pumping fluid x₂ (Entity) to x₃ (Entity) from x₄ (Entity) by means x₅ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">panci</td><td class="p-2">x₁ (Entity) is an odor or fragrance or scent emitted by x₂ (Entity) detected by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pandi</td><td class="p-2">x₁ (Entity) punctuates expression x₂ (Text) with symbol or word x₃ (Text) with effect x₄ (Entity or du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">panje</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of sponge or porous material</td></tr>
<tr class="border-b"><td class="font-bold p-2">panka</td><td class="p-2">x₁ (Location) is a park or land reserve managed by x₂ (Entity or Group&lt;Entity&gt;) for purpose x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">panlo</td><td class="p-2">x₁ (Entity) is a slice thin flat portion of mass x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">panpi</td><td class="p-2">x₁ (Entity) is at peace with x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">panra</td><td class="p-2">x₁ (Entity) parallels x₂ (Entity) differing only in property x₃ (ka, Relation&lt;x₁, x₂&gt;) by standard or geometry x₄ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pante</td><td class="p-2">x₁ (Entity) protests or objects to or complains about event or state x₂ (nu, Event or State) to audience x₃ (Entity) with action x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">panzi</td><td class="p-2">x₁ (Organism) is a biological offspring or child of parent(s) x₂ (Organism or Group&lt;Organism&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">papri</td><td class="p-2">x₁ (Entity) is a physical page of book or document x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">parbi</td><td class="p-2">x₁ (Entity) is a ratio or rate of quantity x₂ (Entity) with respect to quantity x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pastu</td><td class="p-2">x₁ (Entity) is a robe or tunic or gown or cloak or dress garment of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">patfu</td><td class="p-2">x₁ (Entity) is a father of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">patlu</td><td class="p-2">x₁ (Entity) is a potato edible tuber of variety x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">patxu</td><td class="p-2">x₁ (Entity) is a pot or kettle or urn or tub or sink deep container for contents x₂ (Entity) of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pelji</td><td class="p-2">x₁ (Entity) is paper from source x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pelxu</td><td class="p-2">x₁ (Entity) is yellow or golden in color</td></tr>
<tr class="border-b"><td class="font-bold p-2">pemci</td><td class="p-2">x₁ (Text) is a poem or verse about subject x₂ (Entity) by author x₃ (Entity) for audience x₄ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">penbi</td><td class="p-2">x₁ (Entity) is a pen using ink x₂ (Entity) applied by process x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pencu</td><td class="p-2">x₁ (Entity) touches x₂ (Entity) with x₃ (Entity) at locus x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pendo</td><td class="p-2">x₁ (Entity) is a friend of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">penmi</td><td class="p-2">x₁ (Entity) meets or encounters x₂ (Entity) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pensi</td><td class="p-2">x₁ (Entity) thinks or considers or reasons about subject x₂ (Entity or Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">perli</td><td class="p-2">x₁ (Entity) is a pear of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pesxu</td><td class="p-2">x₁ (Entity) is paste or pulp or dough or mud or slurry of composition x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">petso</td><td class="p-2">x₁ (Entity) is 10^15 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pezli</td><td class="p-2">x₁ (Entity) is a leaf of plant x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">picti</td><td class="p-2">x₁ (Entity) is 10^-12 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pijne</td><td class="p-2">x₁ (Entity) is a pin or peg tool for fastening to or piercing x₂ (Entity) made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pikci</td><td class="p-2">x₁ (Entity) begs or pleads or supplicates x₂ (Entity) for x₃ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pikta</td><td class="p-2">x₁ (Entity) is a ticket entitling x₂ (Entity) to privilege x₃ (nu, Event or State) under conditions x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pilji</td><td class="p-2">x₁ (Number) is the product of factor x₂ (Number) multiplied by factor x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pilka</td><td class="p-2">x₁ (Entity) is a crust or rind or peel or skin outer cover of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pilno</td><td class="p-2">x₁ (Entity) uses or employs tool or apparatus or agent x₂ (Entity) for purpose x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pimlu</td><td class="p-2">x₁ (Entity) is a feather or plumage body-part of animal x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pinca</td><td class="p-2">x₁ (Entity) is urine of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pindi</td><td class="p-2">x₁ (Entity) is poor or indigent in goods or possessions x₂ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pinfu</td><td class="p-2">x₁ (Entity) is a prisoner or captive of x₂ (Entity) restrained by means or force x₃ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pinji</td><td class="p-2">x₁ (Entity) is a clitoris or penis reproductive organ body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pinka</td><td class="p-2">x₁ (Text) is a comment or remark or observation about subject x₂ (Entity) expressed by x₃ (Entity) to audience x₄ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pinsi</td><td class="p-2">x₁ (Entity) is a pencil or crayon or stylus applying marking material x₂ (Entity) with frame x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pinta</td><td class="p-2">x₁ (Entity) is flat or level or horizontal in gravity or frame x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pinxe</td><td class="p-2">x₁ (Entity) drinks beverage x₂ (Entity) from container x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pipno</td><td class="p-2">x₁ (Entity) is a piano or harpsichord or synthesizer or organ keyboard musical instrument</td></tr>
<tr class="border-b"><td class="font-bold p-2">pixra</td><td class="p-2">x₁ (Entity) is a picture or illustration representing x₂ (Entity) made by artist x₃ (Entity) in medium x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">plana</td><td class="p-2">x₁ (Entity) is plump or fat or obese by standard x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">platu</td><td class="p-2">x₁ (Entity) plans or designs or plots plan x₂ (Entity) for state or process x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pleji</td><td class="p-2">x₁ (Entity) pays or compensates payment x₂ (ka, Property of x₁) to recipient x₃ (Entity) for goods or services x₄ (ka, Property of x₃)</td></tr>
<tr class="border-b"><td class="font-bold p-2">plibu</td><td class="p-2">x₁ (Entity) is a pubic area or external genitalia body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">plini</td><td class="p-2">x₁ (Entity) is a planet revolving around x₂ (Entity) with characteristics x₃ (Entity) and orbital parameters x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">plipe</td><td class="p-2">x₁ (Entity) leaps or jumps to x₂ (Location or Entity) from x₃ (Location or Entity) reaching height or route x₄ (Entity) propelled by x₅ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">plise</td><td class="p-2">x₁ (Entity) is an apple fruit of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">plita</td><td class="p-2">x₁ (Entity) is a plane two-dimensional shape defined by points x₂ (Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">plixa</td><td class="p-2">x₁ (Entity) plows or furrows or tills x₂ (Entity) with tool x₃ (Entity) propelled by x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pluja</td><td class="p-2">x₁ (Entity) is complex or complicated or involved in aspect x₂ (ka, Property of x₁) by standard x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pluka</td><td class="p-2">x₁ (nu, Event or State) seems pleasant to or pleases x₂ (Entity) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pluta</td><td class="p-2">x₁ (Entity) is a route or path or way or course or track to x₂ (Location or Entity) from x₃ (Location or Entity) via points x₄ (Set&lt;Location&gt; or Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">polje</td><td class="p-2">x₁ (Entity or Force) folds or creases x₂ (Entity) at locus forming bend x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">polno</td><td class="p-2">x₁ (Entity) reflects Polynesian or Oceanian culture or nationality or languages in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ponjo</td><td class="p-2">x₁ (Entity) reflects Japanese culture or nationality or language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ponse</td><td class="p-2">x₁ (Entity) possesses or owns x₂ (Entity) under law or custom x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">porpi</td><td class="p-2">x₁ (Entity) breaks or fractures or shatters into pieces x₂ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">porsi</td><td class="p-2">x₁ (Sequence&lt;Entity&gt;) is an ordered set sequenced by rules x₂ (Relation&lt;Pair&lt;members of x₁&gt;&gt;) on unordered set x₃ (Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">porto</td><td class="p-2">x₁ (Entity) reflects Portuguese culture or nationality or language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">prali</td><td class="p-2">x₁ (ka, Property of x₂) is a profit or gain or benefit or advantage to x₂ (Entity) resulting from activity or process x₃ (ka, Property of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">prami</td><td class="p-2">x₁ (Entity) loves or feels strong affection towards x₂ (Entity or nu, State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">prane</td><td class="p-2">x₁ (Entity) is perfect or ideal or faultless in property x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">preja</td><td class="p-2">x₁ (Entity) spreads or expands over x₂ (Entity) from initial state x₃ (Entity or nu, State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">prenu</td><td class="p-2">x₁ (Entity) is a person or displays personality</td></tr>
<tr class="border-b"><td class="font-bold p-2">preti</td><td class="p-2">x₁ (Text) is a question or query about subject x₂ (Entity) by questioner x₃ (Entity) to audience x₄ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">prije</td><td class="p-2">x₁ (Entity) is wise about matter x₂ (Abstraction) to observer x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">prina</td><td class="p-2">x₁ (Entity) is a print or impression or image on surface x₂ (Entity) made by tool or press x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pritu</td><td class="p-2">x₁ (Entity) is to the right of x₂ (Entity) which faces orientation x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">prosa</td><td class="p-2">x₁ (Text) is prose about subject x₂ (Entity) by author x₃ (Entity) for audience x₄ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pruce</td><td class="p-2">x₁ (Entity) is a process with inputs x₂ (Entity or Group&lt;Entity&gt;) and outputs x₃ (Entity or Group&lt;Entity&gt;) via stages x₄ (Sequence&lt;Entity&gt; or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pruni</td><td class="p-2">x₁ (Entity) is elastic or springy</td></tr>
<tr class="border-b"><td class="font-bold p-2">pruxi</td><td class="p-2">x₁ (Entity) is spiritual or pertains to the soul in nature</td></tr>
<tr class="border-b"><td class="font-bold p-2">pulce</td><td class="p-2">x₁ (Entity) is dust or precipitate of material x₂ (Entity) in medium or on surface x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pulji</td><td class="p-2">x₁ (Entity) is a police officer enforcing laws or rules x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">pulni</td><td class="p-2">x₁ (Entity) is a pulley tool for performing action x₂ (nu, Event) rotating on axle x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">punji</td><td class="p-2">x₁ (Entity) puts or places or sets x₂ (Entity) on or at locus x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">punli</td><td class="p-2">x₁ (Entity) is a swelling or protrusion or convexity at or on x₂ (Entity) of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">purci</td><td class="p-2">x₁ (nu, Event) is earlier than or in the past of x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">purdi</td><td class="p-2">x₁ (Location) is a garden or cultivated field of x₂ (Entity or Group&lt;Entity&gt;) growing plants or crops x₃ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">purmo</td><td class="p-2">x₁ (Entity) is a powder of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">racli</td><td class="p-2">x₁ (nu, Event or ka, Property of x₁) is sane or rational by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ractu</td><td class="p-2">x₁ (Organism) is a rabbit or hare of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">radno</td><td class="p-2">x₁ (Entity) is x₂ (Number) radians in angular measure by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rafsi</td><td class="p-2">x₁ (Text) is an affix or suffix or prefix for word or concept x₂ (Text or Entity) with form x₃ (Entity) in language x₄ (Language)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ragve</td><td class="p-2">x₁ (Entity) is across or on the other side of boundary x₂ (Entity) from x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rakso</td><td class="p-2">x₁ (Entity) reflects Iraqi culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">raktu</td><td class="p-2">x₁ (Entity or nu, Event or Situation) troubles or disturbs person x₂ (Entity) causing problems x₃ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ralci</td><td class="p-2">x₁ (Entity) is delicate or fragile or refined in property x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ralju</td><td class="p-2">x₁ (Entity) is principal or chief or main among set x₂ (Set&lt;Entity&gt;) in property x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ralte</td><td class="p-2">x₁ (Entity) retains or keeps or holds x₂ (Entity) in its possession</td></tr>
<tr class="border-b"><td class="font-bold p-2">randa</td><td class="p-2">x₁ (Entity) yields or gives way or surrenders to x₂ (Entity or Force) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rango</td><td class="p-2">x₁ (Entity) is a body organ body-part of body or species x₂ (Entity) performing function x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ranji</td><td class="p-2">x₁ (ka, Property of x₂) continues or persists over interval x₂ (TimeInterval)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ranmi</td><td class="p-2">x₁ (Text) is a myth or legend about x₂ (Entity) in mythos x₃ (Entity) of culture x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ransu</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of bronze of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ranti</td><td class="p-2">x₁ (Entity) is soft or malleable or yielding to force x₂ (nu, Event or Entity) in conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ranxi</td><td class="p-2">x₁ (Entity) is ironic or contrary to expectation x₂ (Entity) in state or property x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rapli</td><td class="p-2">x₁ (nu, Event) repeats for total occurrences x₂ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rarna</td><td class="p-2">x₁ (Entity) is natural or spontaneous or instinctive not consciously caused by persons</td></tr>
<tr class="border-b"><td class="font-bold p-2">ratcu</td><td class="p-2">x₁ (Organism) is a rat of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ratni</td><td class="p-2">x₁ (Entity) is an atom of element x₂ (Number) of isotope number or atomic weight x₃ (Entity or Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rebla</td><td class="p-2">x₁ (Entity) is a tail or appendix body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rectu</td><td class="p-2">x₁ (Entity) is a quantity of or contains meat or flesh from source x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">remna</td><td class="p-2">x₁ (Entity) is a human being</td></tr>
<tr class="border-b"><td class="font-bold p-2">renro</td><td class="p-2">x₁ (Entity) throws or launches or casts or hurls x₂ (Entity) to or at direction x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">renvi</td><td class="p-2">x₁ (Entity) survives or endures or abides through x₂ (nu, Event) for duration x₃ (TimeInterval or Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">respa</td><td class="p-2">x₁ (Organism) is a reptile of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ricfu</td><td class="p-2">x₁ (Entity) is rich or wealthy in goods or possessions x₂ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rigni</td><td class="p-2">x₁ (Entity or nu, Event) is repugnant or causes disgust to x₂ (Entity) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rijno</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of silver including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rilti</td><td class="p-2">x₁ (Sequence&lt;Sound&gt; or Sequence&lt;Text&gt;) is a rhythm or beat of music or expressive form x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rimni</td><td class="p-2">x₁ (Text) rhymes or alliterates with x₂ (Text) in language or phonetics x₃ (Language or Entity) with correspondence x₄ (ka, Relation&lt;x₁, x₂&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rinci</td><td class="p-2">x₁ (Entity) liquid drains or strains or flushes from source x₂ (Entity) through drain x₃ (Entity) by force x₄ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rinju</td><td class="p-2">x₁ (Entity) is restrained or held or constrained by restraint x₂ (Entity) against event x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rinka</td><td class="p-2">x₁ (nu, Event or State) physically causes effect x₂ (nu, Event or State) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rinsa</td><td class="p-2">x₁ (Entity) greets or hails or welcomes x₂ (Entity) in manner x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rirci</td><td class="p-2">x₁ (Entity) is rare or uncommon in property x₂ (ka, Property of x₁) among members of set x₃ (Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rirni</td><td class="p-2">x₁ (Entity) is a parent of or raises or rears x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rirxe</td><td class="p-2">x₁ (Entity) is a river of land mass x₂ (Entity) draining watershed x₃ (Entity) into x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rismi</td><td class="p-2">x₁ (Entity) is a quantity of rice grain of strain x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">risna</td><td class="p-2">x₁ (Entity) is a heart body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ritli</td><td class="p-2">x₁ (Entity) is a rite or ceremony or ritual for purpose x₂ (Entity or nu, Event) in community x₃ (Group&lt;Entity&gt;) with form or rules x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rivbi</td><td class="p-2">x₁ (Entity) avoids or evades or escapes fate x₂ (nu, Event) through action or state x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rokci</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of rock or stone of composition x₂ (Entity) from location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">romge</td><td class="p-2">x₁ (Entity) is a polished reflective metallic surface of metal x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ropno</td><td class="p-2">x₁ (Entity) reflects European culture or nationality or geography or Indo-European languages in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rorci</td><td class="p-2">x₁ (Entity) engenders or procreates or begets x₂ (Entity) with coparent x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rotsu</td><td class="p-2">x₁ (Entity) is thick in dimension x₂ (ka, Property of x₁) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rozgu</td><td class="p-2">x₁ (Entity) is a rose flower of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">ruble</td><td class="p-2">x₁ (Entity) is weak or feeble or frail in property x₂ (ka, Property of x₁) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rufsu</td><td class="p-2">x₁ (Entity) is rough or coarse or uneven in texture</td></tr>
<tr class="border-b"><td class="font-bold p-2">runme</td><td class="p-2">x₁ (Entity) melts at temperature x₂ (Number) and pressure x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">runta</td><td class="p-2">x₁ (Entity) dissolves in solvent x₂ (Entity) forming solution x₃ (Entity) under conditions x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rupnu</td><td class="p-2">x₁ (Entity) is measured in major money units as quantity x₂ (Number) in monetary system x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rusko</td><td class="p-2">x₁ (Entity) reflects Russian culture or nationality or language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">rutni</td><td class="p-2">x₁ (Entity) is an artifact made or caused by people of culture x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sabji</td><td class="p-2">x₁ (Entity) provides or supplies x₂ (Entity) to recipient x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sabnu</td><td class="p-2">x₁ (Entity) is a cabin of vehicle x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sacki</td><td class="p-2">x₁ (Entity) is a match incendiary device made of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">saclu</td><td class="p-2">x₁ (Text) is the decimal or binary equivalent of fractional expression x₂ (Text) in base x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sadjo</td><td class="p-2">x₁ (Entity) reflects Saudi Arabian culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sakci</td><td class="p-2">x₁ (Entity) sucks fluid or gas x₂ (Entity) relative to high pressure x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sakli</td><td class="p-2">x₁ (Entity) slides or slips or glides on surface x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sakta</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of sugar from source x₂ (Entity) of composition x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">salci</td><td class="p-2">x₁ (Entity) celebrates or honors x₂ (Entity or nu, Event) with activity x₃ (ka, Property of x₁ or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">salpo</td><td class="p-2">x₁ (Entity) is sloped or inclined with angle x₂ (Entity or Number) to frame x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">salta</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is a quantity of salad food with ingredients including x₂ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">samcu</td><td class="p-2">x₁ (Entity) is a quantity of cassava or taro or yam edible starchy root of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sampu</td><td class="p-2">x₁ (Entity) is simple or unmixed or uncomplicated in property x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sance</td><td class="p-2">x₁ (Sound) is sound produced by x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sanga</td><td class="p-2">x₁ (Entity) sings or chants song x₂ (Sound or Text) to audience x₃ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sanji</td><td class="p-2">x₁ (Entity) is conscious or aware of x₂ (Entity or Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sanli</td><td class="p-2">x₁ (Entity) stands on surface x₂ (Entity) supported by limbs or support x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sanmi</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is a meal composed of dishes including x₂ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sanso</td><td class="p-2">x₁ (Entity) is a sauce or topping or gravy for use with x₂ (Entity) containing ingredients including x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">santa</td><td class="p-2">x₁ (Entity) is an umbrella or parasol shielding x₂ (Entity) from x₃ (Entity) made of material x₄ (Entity) supported by x₅ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sarcu</td><td class="p-2">x₁ (Abstraction) is necessary or required for state or process x₂ (nu, Event or State) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sarji</td><td class="p-2">x₁ (Entity) supports or holds up or helps x₂ (Entity or nu, Event) against force x₃ (Entity or nu, Event) by means x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sarlu</td><td class="p-2">x₁ (Entity) is a spiral or helix or whorl shape with limits x₂ (Entity) and dimensionality x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sarxe</td><td class="p-2">x₁ (Entity) is harmonious or in agreement with x₂ (Entity) in property x₃ (ka, Relation&lt;x₁, x₂&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">saske</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is a science or body of knowledge about subject matter x₂ (Entity) based on methodology x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">satci</td><td class="p-2">x₁ (Entity) is exact or precise to precision x₂ (Entity or Number) in property or quantity x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">satre</td><td class="p-2">x₁ (Entity) strokes or rubs or pets x₂ (Entity) with x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">savru</td><td class="p-2">x₁ (Sound) is a noise to x₂ (Entity) via sensory channel x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sazri</td><td class="p-2">x₁ (Entity) operates or drives or runs apparatus x₂ (Entity) with goal x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sefta</td><td class="p-2">x₁ (Entity) is a surface or face of higher-dimensional object x₂ (Entity) on side x₃ (Entity) with edges x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">selci</td><td class="p-2">x₁ (Entity) is a cell or basic subunit of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">selfu</td><td class="p-2">x₁ (Entity) serves x₂ (Entity) with service x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">semto</td><td class="p-2">x₁ (Entity) reflects Semitic language or culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">senci</td><td class="p-2">x₁ (Entity) sneezes</td></tr>
<tr class="border-b"><td class="font-bold p-2">senpi</td><td class="p-2">x₁ (Entity) doubts that x₂ (du&#039;u, Proposition) is true</td></tr>
<tr class="border-b"><td class="font-bold p-2">senta</td><td class="p-2">x₁ (Entity) is a layer or stratum of material x₂ (Entity) within structure x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">senva</td><td class="p-2">x₁ (Entity) dreams about x₂ (du&#039;u, Proposition or Idea)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sepli</td><td class="p-2">x₁ (Entity) is apart or separate from x₂ (Entity) separated by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">serti</td><td class="p-2">x₁ (Entity) is stairs or stairway or steps for climbing structure x₂ (Entity) with steps x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">setca</td><td class="p-2">x₁ (Entity) inserts or interposes or puts x₂ (Entity) into interior x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sevzi</td><td class="p-2">x₁ (Entity) is a self or ego or identity-image of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sfani</td><td class="p-2">x₁ (Organism) is a fly of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sfasa</td><td class="p-2">x₁ (Entity) punishes x₂ (Entity) for infraction x₃ (nu, Event or State) with punishment x₄ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sfofa</td><td class="p-2">x₁ (Entity) is a sofa or couch</td></tr>
<tr class="border-b"><td class="font-bold p-2">sfubu</td><td class="p-2">x₁ (Entity) dives or swoops to x₂ (Location or Entity) from x₃ (Location or Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">siclu</td><td class="p-2">x₁ (Entity) whistles sound x₂ (Sound)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sicni</td><td class="p-2">x₁ (Entity) is a coin or token issued by x₂ (Entity) having value x₃ (Number or Entity) of composition including x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sidbo</td><td class="p-2">x₁ (si&#039;o, Idea) is an idea or concept or thought about x₂ (Entity or Abstraction) by thinker x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sidju</td><td class="p-2">x₁ (Entity) helps or assists or aids x₂ (Entity) to do event or activity x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sigja</td><td class="p-2">x₁ (Entity) is a cigar or cigarette made from tobacco or smokable substance x₂ (Entity) by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">silka</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of silk produced by x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">silna</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of salt from source x₂ (Entity) of composition including x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">simlu</td><td class="p-2">x₁ (Entity) seems or appears to have properties x₂ (ka, Property of x₁) to observer x₃ (Entity) under conditions x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">simsa</td><td class="p-2">T: Entity. x₁ (T) is similar or parallel to x₂ (T) in property or quantity x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">simxu</td><td class="p-2">x₁ (Set&lt;Entity&gt;) has members who mutually do x₂ (Relation&lt;Pair&lt;members of x₁&gt;&gt;) to each other</td></tr>
<tr class="border-b"><td class="font-bold p-2">since</td><td class="p-2">x₁ (Organism) is a snake or serpent of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sinma</td><td class="p-2">x₁ (Entity) esteems or respects or venerates x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sinso</td><td class="p-2">x₁ (Number) is the trigonometric sine of angle x₂ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sinxa</td><td class="p-2">x₁ (Entity or Text) is a sign or symbol or signal representing x₂ (Entity or Abstraction) to observer x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sipna</td><td class="p-2">x₁ (Entity) is asleep</td></tr>
<tr class="border-b"><td class="font-bold p-2">sirji</td><td class="p-2">x₁ (Entity) is straight or a direct line segment between x₂ (Entity) and x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sirxo</td><td class="p-2">x₁ (Entity) reflects Syrian culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sisku</td><td class="p-2">x₁ (Entity) seeks or searches for property x₂ (ka, Property of member of set x₃) among set x₃ (Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sisti</td><td class="p-2">x₁ (Entity) ceases or stops or halts activity or process or state x₂ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sitna</td><td class="p-2">x₁ (Entity) cites or quotes or refers to source x₂ (Entity) for information x₃ (du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sivni</td><td class="p-2">x₁ (Entity) is private or personal to x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">skaci</td><td class="p-2">x₁ (Entity) is a skirt or kilt or dress of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">skami</td><td class="p-2">x₁ (Entity) is a computer for purpose x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">skapi</td><td class="p-2">x₁ (Entity) is a pelt or skin or hide or leather from x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">skari</td><td class="p-2">x₁ (Entity) is or appears to be of color x₂ (Entity) as perceived by x₃ (Entity) under conditions x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">skicu</td><td class="p-2">x₁ (Entity) tells about or describes object or event or state x₂ (Entity or nu, Event or State) to audience x₃ (Entity or Group&lt;Entity&gt;) with description x₄ (ka, Property of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">skiji</td><td class="p-2">x₁ (Entity) is a ski or skid or skate for surface x₂ (Entity) supporting x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">skina</td><td class="p-2">x₁ (Entity) is a cinema or movie or film about x₂ (Entity) by filmmaker x₃ (Entity) for audience x₄ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">skori</td><td class="p-2">x₁ (Entity) is cord or cable or rope of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">skoto</td><td class="p-2">x₁ (Entity) reflects Gaelic or Scottish culture or nationality or language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">skuro</td><td class="p-2">x₁ (Entity) is a groove or trench or furrow in object or surface x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">slabu</td><td class="p-2">x₁ (Entity) is old or familiar or well-known to observer x₂ (Entity) in feature x₃ (ka, Property of x₁) by standard x₄ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">slaka</td><td class="p-2">x₁ (Text) is a syllable in language x₂ (Language)</td></tr>
<tr class="border-b"><td class="font-bold p-2">slami</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of acid of composition x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">slanu</td><td class="p-2">x₁ (Entity) is a cylinder shape of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">slari</td><td class="p-2">x₁ (Entity) is sour or tart to observer x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">slasi</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of plastic of type x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sligu</td><td class="p-2">x₁ (Entity) is solid of composition including x₂ (Entity) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">slilu</td><td class="p-2">x₁ (Entity) oscillates at frequency x₂ (Number or Entity) through states x₃ (Sequence&lt;Entity&gt; or Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sliri</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of sulfur x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">slovo</td><td class="p-2">x₁ (Entity) reflects Slavic language or culture or ethos in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sluji</td><td class="p-2">x₁ (Entity) is a muscle body-part controlling x₂ (Entity) of body x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sluni</td><td class="p-2">x₁ (Entity) is a quantity of or contains onions of type x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">smacu</td><td class="p-2">x₁ (Organism) is a mouse of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">smadi</td><td class="p-2">x₁ (Entity) guesses or conjectures that x₂ (du&#039;u, Proposition) is true about subject x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">smaji</td><td class="p-2">x₁ (Entity) is quiet or silent at observation point x₂ (Entity) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">smani</td><td class="p-2">x₁ (Organism) is a monkey or ape of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">smoka</td><td class="p-2">x₁ (Entity) is a sock or stocking garment of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">smuci</td><td class="p-2">x₁ (Entity) is a spoon or scoop tool for use x₂ (nu, Event) made of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">smuni</td><td class="p-2">x₁ (Entity) is a meaning or interpretation of x₂ (Entity or Text) recognized by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">snada</td><td class="p-2">x₁ (Entity) succeeds in or achieves or completes x₂ (ka, Property of x₁) as result of effort x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">snanu</td><td class="p-2">x₁ (Entity) is to the south of x₂ (Entity) according to frame x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">snidu</td><td class="p-2">x₁ (TimeInterval) is x₂ (Number) seconds in duration by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">snime</td><td class="p-2">x₁ (Entity) is a quantity of or contains snow</td></tr>
<tr class="border-b"><td class="font-bold p-2">snipa</td><td class="p-2">x₁ (Entity) adheres or sticks to x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">snuji</td><td class="p-2">x₁ (Entity) is a sandwich or layering of x₂ (Entity) sandwiched between x₃ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">snura</td><td class="p-2">x₁ (Entity) is secure or safe from threat x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">snuti</td><td class="p-2">x₁ (nu, Event or State) is an accident or unintentional event on the part of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sobde</td><td class="p-2">x₁ (Entity) is a quantity of soya grain of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sodna</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of alkali metal of type x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sodva</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of carbonated beverage of flavor or brand x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">softo</td><td class="p-2">x₁ (Entity) reflects Soviet or CIS culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">solji</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of gold of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">solri</td><td class="p-2">x₁ (Entity) is the sun of home planet x₂ (Entity) of race x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sombo</td><td class="p-2">x₁ (Entity) sows or plants crop x₂ (Entity) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sonci</td><td class="p-2">x₁ (Entity) is a soldier or warrior of army x₂ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sorcu</td><td class="p-2">x₁ (Entity) is a store or deposit or supply of materials or energy x₂ (Entity or Group&lt;Entity&gt;) in containment x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sorgu</td><td class="p-2">x₁ (Entity) is a quantity of sorghum of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sovda</td><td class="p-2">x₁ (Entity) is an egg or gamete of organism x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">spaji</td><td class="p-2">x₁ (nu, Event) surprises or startles x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">spali</td><td class="p-2">x₁ (Entity) polishes object or surface x₂ (Entity) with polish x₃ (Entity) using tool x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">spano</td><td class="p-2">x₁ (Entity) reflects Spanish-speaking culture or nationality or language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">spati</td><td class="p-2">x₁ (Organism) is a plant of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">speni</td><td class="p-2">x₁ (Entity) is married to x₂ (Entity) under system x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">spisa</td><td class="p-2">x₁ (Entity) is a piece or portion or lump or chunk or particle of substance x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">spita</td><td class="p-2">x₁ (Location) is a hospital treating patient x₂ (Entity) for condition x₃ (nu, Event or ka, Property of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">spofu</td><td class="p-2">x₁ (Entity) is broken or inoperable for function x₂ (ka, Property of x₁ or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">spoja</td><td class="p-2">x₁ (nu, Event) bursts or explodes into pieces x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">spuda</td><td class="p-2">x₁ (Entity) replies or responds to stimulus x₂ (Entity or nu, Event) with response x₃ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sputu</td><td class="p-2">x₁ (Entity) spits or expectorates x₂ (Entity) from x₃ (Entity) to x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sraji</td><td class="p-2">x₁ (Entity) is vertical or upright or erect in reference frame or gravity x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sraku</td><td class="p-2">x₁ (Entity) scratches or carves or erodes or cuts into x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sralo</td><td class="p-2">x₁ (Entity) reflects Australian culture or nationality or geography or dialect in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">srana</td><td class="p-2">x₁ (Entity) pertains to or is relevant to or concerns x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">srasu</td><td class="p-2">x₁ (Entity) is a blade or expanse of grass of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">srera</td><td class="p-2">x₁ (Entity) errs in doing event x₂ (nu, Event) under conditions x₃ (nu, Event) by standard x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">srito</td><td class="p-2">x₁ (Entity) reflects Sanskrit language or culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sruma</td><td class="p-2">x₁ (Entity) assumes or supposes that x₂ (du&#039;u, Proposition) is true about subject x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sruri</td><td class="p-2">x₁ (Entity) encircles or encloses or surrounds x₂ (Entity) in direction or dimension or plane x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stace</td><td class="p-2">x₁ (Entity) is honest or truthfully revealing to x₂ (Entity) about matter x₃ (du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stagi</td><td class="p-2">x₁ (Entity) is an edible portion x₂ (Entity) of plant x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">staku</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of ceramic made by x₂ (Entity) of composition x₃ (Entity) in form x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stali</td><td class="p-2">x₁ (Entity) remains or stays or abides with x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stani</td><td class="p-2">x₁ (Entity) is a stalk or stem or trunk body-part of plant x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stapa</td><td class="p-2">x₁ (Entity) steps or treads on surface x₂ (Entity) using limbs x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stasu</td><td class="p-2">x₁ (Group&lt;Entity&gt;) is a quantity of soup or stew with ingredients including x₂ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stati</td><td class="p-2">x₁ (Entity) has a talent or aptitude for doing or being x₂ (ka, Property of x₁ or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">steba</td><td class="p-2">x₁ (Entity) feels frustration about x₂ (Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">steci</td><td class="p-2">x₁ (ka, Property of x₂) is specific or particular or defining property of x₂ (Entity) among set x₃ (Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stedu</td><td class="p-2">x₁ (Entity) is a head body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stela</td><td class="p-2">x₁ (Entity) is a lock or seal of or for sealing x₂ (Entity) with mechanism x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stero</td><td class="p-2">x₁ (Entity) is x₂ (Number) steradians in solid angle by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stici</td><td class="p-2">x₁ (Entity) is to the west of x₂ (Entity) according to frame x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stidi</td><td class="p-2">x₁ (Entity) suggests or proposes idea or action x₂ (Entity or nu, Event) to audience x₃ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stika</td><td class="p-2">x₁ (nu, Event) adjusts or regulates or changes property or amount x₂ (ka, Property of x₁) in degree x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stizu</td><td class="p-2">x₁ (Entity) is a chair or stool or seat or bench</td></tr>
<tr class="border-b"><td class="font-bold p-2">stodi</td><td class="p-2">x₁ (Entity) is constant or unchanging in property x₂ (ka, Property of x₁) in response to conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stuna</td><td class="p-2">x₁ (Entity) is to the east of x₂ (Entity) according to frame x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stura</td><td class="p-2">x₁ (Entity) is a structure or arrangement or organization of x₂ (Entity or Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">stuzi</td><td class="p-2">x₁ (Location) is an inherent site or place or position or location of x₂ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sucta</td><td class="p-2">x₁ (si&#039;o, Idea) is abstracted or generalized from x₂ (Entity) by rules x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sudga</td><td class="p-2">x₁ (Entity) is dry of liquid x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sufti</td><td class="p-2">x₁ (Entity) is a hoof body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">suksa</td><td class="p-2">x₁ (nu, Event or State) is sudden or sharply changes at point x₂ (ka, Property of x₂) in process x₃ (ka, Property of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sumji</td><td class="p-2">x₁ (Number) is the sum of x₂ (Number) and x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sumne</td><td class="p-2">x₁ (Entity) smells x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sumti</td><td class="p-2">x₁ (Text) is an argument of predicate or function x₂ (Entity or Text) filling place x₃ (Text)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sunga</td><td class="p-2">x₁ (Entity) is a quantity of garlic of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sunla</td><td class="p-2">x₁ (Entity) is a quantity of or made from or consists of wool from animal x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">surla</td><td class="p-2">x₁ (Entity) relaxes or rests by doing x₂ (ka, Property of x₁ or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">sutra</td><td class="p-2">x₁ (Entity) is fast or swift or quick at doing or bringing about x₂ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tabno</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of carbon of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tabra</td><td class="p-2">x₁ (Entity) is a horn or trumpet or trombone or bugle musical instrument</td></tr>
<tr class="border-b"><td class="font-bold p-2">tadji</td><td class="p-2">x₁ (nu, Process) is a method or technique or approach for doing x₂ (nu, Event) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tadni</td><td class="p-2">x₁ (Entity) studies subject x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tagji</td><td class="p-2">x₁ (Entity) is snug or tight on x₂ (Entity) in dimension x₃ (Entity) at locus x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">talsa</td><td class="p-2">x₁ (Entity) challenges x₂ (Entity) at property x₃ (ka, Property of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tamca</td><td class="p-2">x₁ (Entity) is a tomato fruit or plant of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tamji</td><td class="p-2">x₁ (Entity) is a thumb or big toe body-part on limb x₂ (Entity) of x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tamne</td><td class="p-2">x₁ (Entity) is a cousin to x₂ (Entity) by bond x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tanbo</td><td class="p-2">x₁ (Entity) is a board or plank shape of material x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tance</td><td class="p-2">x₁ (Entity) is a tongue body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tanjo</td><td class="p-2">x₁ (Number) is the trigonometric tangent of angle x₂ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tanko</td><td class="p-2">x₁ (Entity) is a quantity of tobacco leaf of species x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tanru</td><td class="p-2">x₁ (Text) is a binary metaphor formed with x₂ (Text or si&#039;o, Idea) modifying x₃ (Text or si&#039;o, Idea) giving meaning x₄ (Entity) in usage x₅ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tansi</td><td class="p-2">x₁ (Entity) is a pan or basin or tub or sink shallow container for contents x₂ (Entity) of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tanxe</td><td class="p-2">x₁ (Entity) is a box or carton or trunk or crate for contents x₂ (Entity) of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tapla</td><td class="p-2">x₁ (Entity) is a tile or cake shape of material x₂ (Entity) with shape x₃ (Entity) and thickness x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tarbi</td><td class="p-2">x₁ (Entity) is an embryo or zygote or fetus or fertilized egg with mother x₂ (Entity) and father x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tarci</td><td class="p-2">x₁ (Entity) is a star or sun with stellar properties x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tarla</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of tar or asphalt from source x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tarmi</td><td class="p-2">x₁ (Entity or si&#039;o, Idea) is the conceptual shape or form of object or abstraction x₂ (Entity or Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tarti</td><td class="p-2">x₁ (Entity) behaves as manner x₂ (ka, Property of x₁ or nu, Event) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">taske</td><td class="p-2">x₁ (Entity) thirsts for x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tatpi</td><td class="p-2">x₁ (Entity) is tired or fatigued by effort x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tatru</td><td class="p-2">x₁ (Entity) is a breast or mammary or teat body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tavla</td><td class="p-2">x₁ (Entity) talks or speaks to x₂ (Entity) about subject x₃ (Entity or Text) in language x₄ (Language)</td></tr>
<tr class="border-b"><td class="font-bold p-2">taxfu</td><td class="p-2">x₁ (Entity) is a garment or clothing for wearing by x₂ (Entity) serving purpose x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tcaci</td><td class="p-2">x₁ (Entity) is a custom or habit of x₂ (Entity) under conditions x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tcadu</td><td class="p-2">x₁ (Location) is a town or city of metropolitan area x₂ (Location) in political unit x₃ (Entity) serving region x₄ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tcana</td><td class="p-2">x₁ (Entity) is a station or node of system x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tcati</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of tea brewed from leaves x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tcena</td><td class="p-2">x₁ (Entity) stretches or extends to range x₂ (Entity) in dimension x₃ (Entity) from relaxed range x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tcica</td><td class="p-2">x₁ (nu, Event or Experience) misleads or deceives x₂ (Entity) into x₃ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tcidu</td><td class="p-2">x₁ (Entity) reads text x₂ (Text) from surface x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tcika</td><td class="p-2">x₁ (Entity) is the time of state or event x₂ (nu, Event) on day x₃ (TimeInterval) at location x₄ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tcila</td><td class="p-2">x₁ (Entity) is a detail or feature of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tcima</td><td class="p-2">x₁ (Entity) is weather at place x₂ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tcini</td><td class="p-2">x₁ (ka, Property of x₂) is a situation or condition or circumstance of x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tcita</td><td class="p-2">x₁ (Entity) is a label or tag of x₂ (Entity) showing information x₃ (ka, Property of x₂ or du&#039;u, Proposition)</td></tr>
<tr class="border-b"><td class="font-bold p-2">temci</td><td class="p-2">x₁ (TimeInterval) is the time-duration or interval or period from time or event x₂ (nu, Event) to time or event x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tenfa</td><td class="p-2">x₁ (Number) is the exponential result of base x₂ (Number) to power or exponent x₃ (Number)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tengu</td><td class="p-2">x₁ (ka, Property of x₂) is a texture of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">terdi</td><td class="p-2">x₁ (Location) is the Earth or home planet of race x₂ (Taxon or Group&lt;Organism&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">terpa</td><td class="p-2">x₁ (Entity) fears x₂ (Entity or nu, Event); x₂ is fearsome or frightening to x₁</td></tr>
<tr class="border-b"><td class="font-bold p-2">terto</td><td class="p-2">x₁ (Entity) is a trillion [10^12] in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tigni</td><td class="p-2">x₁ (Entity) performs performance x₂ (nu, Event) for or before audience x₃ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tikpa</td><td class="p-2">x₁ (Entity) kicks or hits with x₁&#039;s foot or feet x₄ (Entity) object or target x₂ (Entity) at locus x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tilju</td><td class="p-2">x₁ (Entity) is heavy or weighty in mass or weight by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tinbe</td><td class="p-2">x₁ (Entity) obeys or follows command or rule x₂ (Entity) made by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tinci</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of tin of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tinsa</td><td class="p-2">x₁ (Entity) is stiff or rigid or inflexible or resistant in direction x₂ (Entity) against force x₃ (Entity) under conditions x₄ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tirna</td><td class="p-2">x₁ (Entity) hears sound x₂ (Sound or Entity) against background or noise x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tirse</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of iron of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tirxu</td><td class="p-2">x₁ (Organism) is a tiger or leopard or jaguar or tigress of species or breed x₂ (Taxon) with coat markings x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tisna</td><td class="p-2">x₁ (Entity) fills or becomes stuffed or inflates or blows up with material x₂ (Entity); x₂ pours into x₁</td></tr>
<tr class="border-b"><td class="font-bold p-2">titla</td><td class="p-2">x₁ (Entity) is sweet or sugary or saccharine to observer x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tivni</td><td class="p-2">x₁ (Entity) broadcasts or televises programming x₂ (Entity or nu, Event) via medium or channel x₃ (Entity) to television receiver x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tixnu</td><td class="p-2">x₁ (Organism) is a daughter of mother or father or parents x₂ (Organism or Group&lt;Organism&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">toknu</td><td class="p-2">x₁ (Entity) is an oven enclosing contents x₂ (Entity) for baking or heating or drying</td></tr>
<tr class="border-b"><td class="font-bold p-2">toldi</td><td class="p-2">x₁ (Organism) is a butterfly or moth of species or breed x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tonga</td><td class="p-2">x₁ (Sound) is a tone or note of frequency or pitch x₂ (Number) from source x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tordu</td><td class="p-2">x₁ (Entity) is short in dimension or direction x₂ (ka, Property of x₁) by measurement standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">torni</td><td class="p-2">x₁ (Entity) twists under load or force or torsion x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">traji</td><td class="p-2">T: Entity. x₁ (T) is superlative in property x₂ (ka, Property of x₁), at extreme x₃ (ka, Property of x₁) among set or range x₄ (Set&lt;T&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">trano</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of nitrogen or ammonia or nitrates</td></tr>
<tr class="border-b"><td class="font-bold p-2">trati</td><td class="p-2">x₁ (Entity) is taut or tense or strained tight in direction x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">trene</td><td class="p-2">x₁ (Entity) is a train or vehicle x₁ consisting of cars or units x₂ (Group&lt;Entity&gt;) on rails or system or railroad x₃ (Entity) propelled by x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tricu</td><td class="p-2">x₁ (Organism) is a tree of species or cultivar x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">trina</td><td class="p-2">x₁ (Entity) attracts or appeals to or lures x₂ (Entity or nu, Event) with property or quality x₃ (ka, Property of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">trixe</td><td class="p-2">x₁ (Entity) is posterior or behind or in the rear of x₂ (Entity) which faces in frame of reference x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">troci</td><td class="p-2">x₁ (Entity) tries or attempts or makes an effort to do or attain x₂ (ka, Property of x₁) by actions or method x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tsali</td><td class="p-2">x₁ (Entity) is strong or powerful or tough in property or quality x₂ (ka, Property of x₁) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tsani</td><td class="p-2">x₁ (Entity) is an expanse of sky or the heavens at place x₂ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tsapi</td><td class="p-2">x₁ (Entity) is a seasoning or condiment or spice causing flavor or effect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tsiju</td><td class="p-2">x₁ (Entity) is a seed or spore body-part x₁ of organism x₂ (Organism) for producing offspring x₃ (Organism or Group&lt;Organism&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tsina</td><td class="p-2">x₁ (Entity) is a stage or platform or dais or scaffold at or in location x₂ (Location) supporting x₃ (Entity or nu, Event) made of material x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tubnu</td><td class="p-2">x₁ (Entity) is a length of tubing or pipe or hollow cylinder of material x₂ (Entity) with hollow of material x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tugni</td><td class="p-2">x₁ (Entity) agrees with persons or position or side x₂ (Entity or Text) that x₃ (du&#039;u, Proposition) is true about matter x₄ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tujli</td><td class="p-2">x₁ (Entity) is a tulip of species or strain x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tumla</td><td class="p-2">x₁ (Location) is a parcel or expanse of land at location x₂ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tunba</td><td class="p-2">x₁ (Entity) is a sibling of x₂ (Entity) by bond or tie or standard or parents x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tunka</td><td class="p-2">x₁ (Entity) is made of or contains or is a quantity of copper of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tunlo</td><td class="p-2">x₁ (Entity) gulps or swallows substance x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tunta</td><td class="p-2">x₁ (Entity) pokes or jabs or stabs or prods x₂ (Entity) with object x₁ (Entity) usually pointed</td></tr>
<tr class="border-b"><td class="font-bold p-2">tuple</td><td class="p-2">x₁ (Entity) is a leg body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">turni</td><td class="p-2">x₁ (Entity) governs or rules people or territory or domain or subjects x₂ (Entity or Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tutci</td><td class="p-2">x₁ (Entity) is a tool or utensil or resource or instrument or implement used for doing x₂ (nu, Event or Process)</td></tr>
<tr class="border-b"><td class="font-bold p-2">tutra</td><td class="p-2">x₁ (Location) is territory or domain or space of or belonging to or controlled by x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vacri</td><td class="p-2">x₁ (Entity) is a quantity of air or normally gaseous atmosphere of planet x₂ (Entity) of composition including x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vajni</td><td class="p-2">x₁ (ka, Property of x₂) is the important or significant value or worth of x₂ (Entity or Abstraction) to x₃ (Entity) in aspect or for reason x₄ (ka, Relation&lt;x₁, x₃&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">valsi</td><td class="p-2">x₁ (Text) is a word meaning or causing x₂ (Entity or Abstraction) in language x₃ (Language)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vamji</td><td class="p-2">x₁ (ka, Property of x₂) is the equivalent value or worth of item x₂ (ka, Property of x₃) to x₃ (Entity) for use or appreciation x₄ (ka, Property of x₃)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vamtu</td><td class="p-2">x₁ (Organism) vomits or regurgitates x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vanbi</td><td class="p-2">x₁ (Entity or Set&lt;Entity&gt;) is part of an environment or surroundings or context or ambience of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vanci</td><td class="p-2">x₁ (TimeInterval) is an evening of day x₂ (TimeInterval) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vanju</td><td class="p-2">x₁ (Entity) is made of or contains or is a quantity of wine from fruit or grapes x₂ (Taxon or Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vasru</td><td class="p-2">x₁ (Entity) contains or holds or encloses or includes contents x₂ (Entity) within</td></tr>
<tr class="border-b"><td class="font-bold p-2">vasxu</td><td class="p-2">x₁ (Organism) breathes or respires gas x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vecnu</td><td class="p-2">x₁ (Entity) sells or vends goods or service or commodity x₂ (ka, Property of x₁) to buyer x₃ (Entity) for amount or cost or expense x₄ (ka, Property of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">venfu</td><td class="p-2">x₁ (Entity) takes revenge on or retaliates against x₂ (Entity) for wrong x₃ (nu, Event) with vengeance x₄ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vensa</td><td class="p-2">x₁ (TimeInterval) is spring or springtime of year x₂ (TimeInterval) at location x₃ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">verba</td><td class="p-2">x₁ (Organism) is a child or kid or juvenile of age x₂ (TimeInterval) immature by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vibna</td><td class="p-2">x₁ (Entity) is a vagina body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vidni</td><td class="p-2">x₁ (Entity) is a video monitor or CRT or screen serving function x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vidru</td><td class="p-2">x₁ (Organism) is a virus of species or breed or defining property x₂ (Taxon or ka, Property of x₁) capable of infecting at locus x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vifne</td><td class="p-2">x₁ (Entity) is fresh or unspoiled</td></tr>
<tr class="border-b"><td class="font-bold p-2">vikmi</td><td class="p-2">x₁ (Organism) excretes waste x₂ (Entity) from source x₃ (Entity) via means or route x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">viknu</td><td class="p-2">x₁ (Entity) is thick or viscous under conditions x₂ (nu, State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vimcu</td><td class="p-2">x₁ (Entity) removes or subtracts or deducts or takes away x₂ (Entity) from x₃ (Entity) with or leaving result or remnant or remainder x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vindu</td><td class="p-2">x₁ (Entity) is poisonous or venomous or toxic or a toxin to x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vinji</td><td class="p-2">x₁ (Entity) is an airplane or aircraft for carrying passengers or cargo x₂ (Entity or Group&lt;Entity&gt;) propelled by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vipsi</td><td class="p-2">x₁ (Entity) is a deputy or vice or subordinate in aspect or organization principle x₂ (ka, Relation&lt;x₁, x₃&gt;) to principal x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">virnu</td><td class="p-2">x₁ (Entity) is brave or valiant or courageous in activity x₂ (ka, Property of x₁) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">viska</td><td class="p-2">x₁ (Entity) sees or views or perceives visually x₂ (Entity) under conditions x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vitci</td><td class="p-2">x₁ (Entity) is irregular or occasional or intermittent in property or action or aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vitke</td><td class="p-2">x₁ (Entity) is a guest or visitor of x₂ (Entity) at place or event x₃ (Location or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vitno</td><td class="p-2">x₁ (Entity) is permanent or lasting or eternal in property x₂ (ka, Property of x₁) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vlagi</td><td class="p-2">x₁ (Entity) is a vulva body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vlile</td><td class="p-2">x₁ (nu, Event or State) is an event or state or act of violence</td></tr>
<tr class="border-b"><td class="font-bold p-2">vlina</td><td class="p-2">x₁ (Entity) is a logical alternation or disjunction stating that x₂ (du&#039;u, Proposition) and or x₃ (du&#039;u, Proposition) is or are true</td></tr>
<tr class="border-b"><td class="font-bold p-2">vlipa</td><td class="p-2">x₁ (Entity) has the power to bring about x₂ (nu, Event) under conditions x₃ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vofli</td><td class="p-2">x₁ (Entity) flies in air or atmosphere using lifting or propulsion means x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">voksa</td><td class="p-2">x₁ (Sound) is a voice or speech sound of individual x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vorme</td><td class="p-2">x₁ (Entity) is a doorway or gateway or access way between x₂ (Location) and x₃ (Location) of structure x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vraga</td><td class="p-2">x₁ (Entity) is a lever tool of apparatus for doing function or action x₂ (nu, Event) with fulcrum x₃ (Entity) and arm x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vreji</td><td class="p-2">x₁ (Entity) is a record of data or facts or proposition x₂ (du&#039;u, Proposition) about object or event x₃ (Entity or nu, Event) preserved in medium x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vreta</td><td class="p-2">x₁ (Entity) lies or rests or reclines or reposes on x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vrici</td><td class="p-2">x₁ (Set&lt;Entity&gt;) is miscellaneous or various or assorted in property x₂ (ka, Property of each member of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vrude</td><td class="p-2">x₁ (Entity or nu, Event) is virtuous or saintly or fine or moral or nice or holy or morally good by standard x₂ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vrusi</td><td class="p-2">x₁ (ka, Property of x₂) is a taste or flavor of or emitted by x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">vukro</td><td class="p-2">x₁ (Entity) reflects Ukrainian language or culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xabju</td><td class="p-2">x₁ (Organism or Entity) dwells or lives or resides or abides at or inhabits or is a resident of location or habitat or nest or home or abode x₂ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xadba</td><td class="p-2">x₁ (Entity) is exactly or approximately half or semi or demi or hemi of x₂ (Entity) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xadni</td><td class="p-2">x₁ (Entity) is a body or corpus or corpse of x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xagji</td><td class="p-2">x₁ (Organism) hungers for x₂ (Entity); x₁ needs or wants food or fuel x₂</td></tr>
<tr class="border-b"><td class="font-bold p-2">xagri</td><td class="p-2">x₁ (Entity) is a reed musical instrument or oboe or clarinet or saxophone with reed x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xajmi</td><td class="p-2">x₁ (Entity) is funny or comical to x₂ (Entity) in property or aspect x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xaksu</td><td class="p-2">x₁ (nu, Event) uses up or depletes or consumes or wastes resource x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xalbo</td><td class="p-2">x₁ (Entity) uses levity or is non-serious or frivolous about abstraction x₂ (Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xalka</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of alcohol of type x₂ (Entity) from source or process x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xalni</td><td class="p-2">x₁ (Person) is panicked by crisis x₂ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xamgu</td><td class="p-2">x₁ (Entity or nu, Event) is good or beneficial or nice or acceptable for x₂ (Entity) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xampo</td><td class="p-2">x₁ (Number) is x₂ (Number) amperes in current by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xamsi</td><td class="p-2">x₁ (Location) is a sea or ocean or gulf or atmosphere of planet x₂ (Entity) of fluid x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xance</td><td class="p-2">x₁ (Entity) is a hand body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xanka</td><td class="p-2">x₁ (Entity) is nervous or anxious about abstraction x₂ (Abstraction) under conditions x₃ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xanri</td><td class="p-2">x₁ (Abstraction) exists in the imagination of or is imagined by or is imaginary to x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xanto</td><td class="p-2">x₁ (Organism) is an elephant of species or breed x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xarci</td><td class="p-2">x₁ (Entity) is a weapon or arms for use against x₂ (Entity) by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xarju</td><td class="p-2">x₁ (Organism) is a pig or hog or swine or boar of species or breed x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xarnu</td><td class="p-2">x₁ (Entity) is stubborn or willfully opposing or resisting x₂ (Entity or Abstraction) about x₃ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xasli</td><td class="p-2">x₁ (Organism) is a donkey or jackass of species or breed x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xasne</td><td class="p-2">x₁ (Entity) is sweat or perspiration from body x₂ (Organism) excreted by glands or organs x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xatra</td><td class="p-2">x₁ (Entity) is a letter or missive or note to intended audience x₂ (Entity) from author or originator x₃ (Entity) with content x₄ (Text)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xatsi</td><td class="p-2">x₁ (Entity) is 10^-18 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xazdo</td><td class="p-2">x₁ (Entity) reflects Asiatic culture or nationality or geography in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xebni</td><td class="p-2">x₁ (Entity) hates or despises x₂ (Entity or Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xebro</td><td class="p-2">x₁ (Entity) reflects Hebrew or Jewish or Israeli culture or nationality or language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xecto</td><td class="p-2">x₁ (Entity) is 100 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xedja</td><td class="p-2">x₁ (Entity) is a jaw body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xekri</td><td class="p-2">x₁ (Entity) is black or extremely dark-colored</td></tr>
<tr class="border-b"><td class="font-bold p-2">xelso</td><td class="p-2">x₁ (Entity) reflects Greek or Hellenic culture or nationality or language in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xendo</td><td class="p-2">x₁ (Person) is kind to x₂ (Entity) in actions or behavior x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xenru</td><td class="p-2">x₁ (Entity) regrets or rues abstraction x₂ (Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xexso</td><td class="p-2">x₁ (Entity) is 10^18 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xindo</td><td class="p-2">x₁ (Entity) reflects Hindi language or culture or religion in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xinmo</td><td class="p-2">x₁ (Entity) is a quantity of ink of color or pigment x₂ (Entity) used by writing device x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xirma</td><td class="p-2">x₁ (Organism) is a horse or equine of species or breed x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xislu</td><td class="p-2">x₁ (Entity) is a wheel tool of device or vehicle x₂ (Entity) made of materials or having properties x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xispo</td><td class="p-2">x₁ (Entity) reflects Hispano-American culture or nationalities in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xlali</td><td class="p-2">x₁ (Entity or nu, Event) is bad for x₂ (Entity) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xlura</td><td class="p-2">x₁ (Entity) influences or lures or tempts x₂ (Entity) into action or state x₃ (ka, Property of x₂) by influence or threat or lure x₄ (Entity or Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xotli</td><td class="p-2">x₁ (Location) is a hotel or inn or hostel at location x₂ (Location) operated by x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xrabo</td><td class="p-2">x₁ (Entity) reflects Arabic-speaking culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xrani</td><td class="p-2">x₁ (nu, Event) injures or harms or damages victim x₂ (Entity) in property x₃ (ka, Property of x₂) resulting in injury x₄ (nu, State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xriso</td><td class="p-2">x₁ (Entity) pertains to the Christian religion or culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xruba</td><td class="p-2">x₁ (Entity) is a quantity of buckwheat or rhubarb or sorrel grass of species or strain x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xruki</td><td class="p-2">x₁ (Organism) is a turkey bird or food of species or breed x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xrula</td><td class="p-2">x₁ (Entity) is a flower or blossom or bloom body-part of plant or species x₂ (Taxon or Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xruti</td><td class="p-2">x₁ (Entity) returns x₂ (Entity) to origin or earlier state x₃ (Location or nu, State) from x₄ (Location or nu, State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xukmi</td><td class="p-2">x₁ (Entity) is an instance of substance or chemical or drug x₂ (Group&lt;Entity&gt;) with purity x₃ (ni, Amount of x₃)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xunre</td><td class="p-2">x₁ (Entity) is red or crimson or ruddy in color</td></tr>
<tr class="border-b"><td class="font-bold p-2">xurdo</td><td class="p-2">x₁ (Entity) reflects Urdu language or culture or nationality in aspect x₂ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">xusra</td><td class="p-2">x₁ (Entity) asserts or claims or declares proposition x₂ (du&#039;u, Proposition) is true</td></tr>
<tr class="border-b"><td class="font-bold p-2">xutla</td><td class="p-2">x₁ (Entity) is smooth or even or soft or silky in texture or regularity</td></tr>
<tr class="border-b"><td class="font-bold p-2">zabna</td><td class="p-2">x₁ (Entity) is favorable or great or superb or admirable or nice or desirable or enjoyable or high-quality in property x₂ (ka, Property of x₁) by standard x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zajba</td><td class="p-2">x₁ (Entity) is a gymnast at or performs gymnastics feat x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zalvi</td><td class="p-2">x₁ (Entity or Group&lt;Entity&gt;) grinds or pulverizes or crushes x₂ (Entity) into powder x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zanru</td><td class="p-2">x₁ (Entity) approves of or gives favor to plan or action x₂ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zarci</td><td class="p-2">x₁ (Location) is a market or store or exchange or shop selling or trading for x₂ (Entity or Abstraction) operated by or with participants x₃ (Group&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zargu</td><td class="p-2">x₁ (Entity) is a buttock or arse or rear or seat body-part of x₂ (Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zasni</td><td class="p-2">x₁ (Entity) is temporary or not permanent or expected to change in property x₂ (ka, Property of x₁) by standard or expectant x₃ (si&#039;o, Standard)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zasti</td><td class="p-2">x₁ (Entity) exists or is real or actual or reality for x₂ (Entity) under metaphysics x₃ (Entity or Text)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zbabu</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of soap from source x₂ (Entity) of composition including x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zbani</td><td class="p-2">x₁ (Location) is a bay in or of coast or shoreline x₂ (Location)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zbasu</td><td class="p-2">x₁ (Entity) makes or assembles or builds or manufactures or creates x₂ (Entity) out of materials or parts or components x₃ (Entity or Set&lt;Entity&gt;)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zbepi</td><td class="p-2">x₁ (Entity) is a pedestal or base or stand or pallet supporting x₂ (Entity or nu, Event) of materials or properties x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zdani</td><td class="p-2">x₁ (Location) is a nest or house or lair or den or home of or for x₂ (Entity or Organism)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zdile</td><td class="p-2">x₁ (Entity) is amusing or entertaining to x₂ (Entity) in property or aspect x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zekri</td><td class="p-2">x₁ (nu, Event or State) is a punishable crime or taboo or sin to people or culture or judges or jury x₂ (Group&lt;Entity&gt; or Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zenba</td><td class="p-2">x₁ (Entity) increases or is incremented or augmented in property or quantity x₂ (ka, Property of x₁) by amount x₃ (ni, Amount of x₂)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zepti</td><td class="p-2">x₁ (Entity) is 10^-21 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zetro</td><td class="p-2">x₁ (Entity) is 10^21 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zgana</td><td class="p-2">x₁ (Entity) observes or notices or watches or beholds x₂ (Entity) using senses or means x₃ (Entity) under conditions x₄ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zgike</td><td class="p-2">x₁ (Entity) is music performed or produced by event x₂ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zifre</td><td class="p-2">x₁ (Entity) is free or at liberty to do or be x₂ (nu, Event or State) under conditions x₃ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zinki</td><td class="p-2">x₁ (Entity) is a quantity of or contains or is made of zinc of composition including x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zirpu</td><td class="p-2">x₁ (Entity) is purple or violet in color</td></tr>
<tr class="border-b"><td class="font-bold p-2">zivle</td><td class="p-2">x₁ (Entity) invests resources x₂ (Entity) in investment x₃ (Entity) expecting return or profit x₄ (Entity or nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zmadu</td><td class="p-2">T: Entity. x₁ (T) exceeds or is more than x₂ (T) in property or quantity x₃ (ka, Property of x₁) by amount or excess x₄ (ni, Amount of x₃)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zmiku</td><td class="p-2">x₁ (Entity) is automatic in function x₂ (nu, Event or Process) under conditions x₃ (nu, Event or State)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zukte</td><td class="p-2">x₁ (Entity) is a volitional entity employing means or taking action x₂ (ka, Property of x₁) for purpose or goal x₃ (nu, Event)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zumri</td><td class="p-2">x₁ (Entity) is a quantity of maize or corn grain of species or strain x₂ (Taxon)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zungi</td><td class="p-2">x₁ (Entity) feels guilt or remorse about abstraction x₂ (Abstraction)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zunle</td><td class="p-2">x₁ (Entity) is to the left or left-hand side of x₂ (Entity) which faces in frame of reference x₃ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zunti</td><td class="p-2">x₁ (nu, Event or State or Process) interferes with or hinders or disrupts x₂ (nu, Event or State or Process) due to quality x₃ (ka, Property of x₁)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zutse</td><td class="p-2">x₁ (Entity) sits on surface x₂ (Entity)</td></tr>
<tr class="border-b"><td class="font-bold p-2">zvati</td><td class="p-2">x₁ (Entity or nu, Event) is at or attending or present at event or location x₂ (Location or nu, Event)</td></tr></tbody></table></div>