## Gismu place type system

This document specifies a type system for annotating gismu places in `formal-gismu.tsv`, written in a style similar to TypeScript or Rust type definitions.

Each place \(x₁, x₂, …\) in a definition is immediately followed by its type in parentheses, for example:

`x₁ (Entity) does x₂ (Event) to x₃ (Entity)`

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
- **Standard**: special case of `si'o` used as a **standard, norm, benchmark, reference frame, or measurement standard** (“by standard …”). In `formal-gismu.tsv` we normally render this as `xₙ (si'o, Standard)`. It can cover both:
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

- `x₂ (set of Entity)` ⇔ `x₂: Set<Entity>`
- `x₃ (sequence of Text)` ⇔ `x₃: Sequence<Text>`
- `x₁ (group of Entity)` ⇔ `x₁: Group<Entity>`

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
- **Two-argument “property of x₁ and x₂”**: this is in fact a relation between two places; in TSV we use **Relation<xᵢ, xⱼ>** (see below), not “property of x₁ and x₂”.
- **Amount<Entity>**: quantitative `ni` abstract over one argument, TSV: **amount of x₁ (ni)**.
- **Relation<Args>**: a relation over two or more arguments. **Relation is not a subtype of Property (ka)**; it is its own type. In TSV we use one of three strict flavors:

  1. **Relation of members of xᵢ** — the relation holds among elements of the set (or sequence/group) given by argument xᵢ. Use when the place is “the relation among the members of [some set argument]”.
     - Conceptually: the relation’s domain is the set of members of xᵢ.
     - TSV (strict, TypeScript-like): `Relation<members of xᵢ>`.

  2. **Relation of xᵢ and xⱼ** (and optionally more) — the relation holds between (or among) the specific arguments listed. Use when the place is “the relation between xᵢ and xⱼ”.
     - Conceptually: `Relation<[T_i, T_j]>` where the types match those of the listed places.
     - TSV (strict, TypeScript-like): `Relation<xᵢ, xⱼ>` or `Relation<xᵢ, xⱼ, xₖ>`.

  3. **Relation of each pair of members of xᵢ** — xᵢ is a Set (or collection), and the place is a binary relation that holds between each pair of (distinct) members of xᵢ. Use when the predicate is about a mutual or pairwise relation over a set.
     - Conceptually: a relation on the set xᵢ, i.e. pairs of members of xᵢ.
     - TSV (strict, TypeScript-like): `Relation<Pair<members of xᵢ>>`.

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

  In TSV we usually flatten this, e.g. `x₁ (Entity) is x₂ (Number) units on scale x₃ (scale of property of x₁)`.

For **comparisons** (equality, excess, less‑than), the predicate is generic in a single type parameter `T`; both compared places have type `T`:

```ts
// Both x₁ and x₂ have type T (e.g. Entity, or Entity | Amount<Entity>)
type ComparablePair<T> = [T, T]
type Equal<T> = ComparablePair<T>       // dunli
type LessThan<T> = ComparablePair<T>   // mleca
type Excess<T> = ComparablePair<T>     // dukse, zmadu
```

In TSV we use a **prenex** to declare the type parameter, then use **`T`** in both compared places:

- **Prenex**: at the start of the definition, declare **`T`** with its constraint, e.g. **`T: Entity.`** or **`T: Entity or Amount<Entity>.`** (read as “T is a type, constrained to Entity” / “T is Entity or Amount&lt;Entity>”).
- **Places**: **x₁ (T)** and **x₂ (T)** — both refer to the same `T` declared in the prenex.

Example: `T: Entity. x₁ (T) is equal or congruent to x₂ (T) in …` (dunli); `T: Entity or Amount<Entity>. x₁ (T) is less than x₂ (T) in …` (mleca). This matches a TypeScript-style generic with a single type parameter `<T>` and an optional constraint.

- **Metric and dimensional gismu** (centi, zepti, mitre, minli, clani, rotsu, etc.): These predicates have a specific notion of **dimension** or **aspect** in which something is measured or compared. That dimension is always typed as **ka, Property of the entity being measured** (typically x₁).
  - **SI prefix / scale gismu** (centi, zepti, gigdo, kilto, decti, dekto, milti, mikri, …): x₁ (Entity) is the entity measured; **x₂ (ka, Property of x₁)** and **x₃ (ka, Property of x₁)** are both properties of x₁ (e.g. the property in which the scale applies, and the dimension). No prenex; x₂ is a property of x₁, not a “reference entity”. Example: “The insect is 1 centimeter long” → the insect (x₁) is 10^-2 in property x₂ (ka, Property of x₁) in dimension x₃ (ka, Property of x₁, e.g. clani).
  - **Unit gismu** (mitre, minli, gutci, dekpu): x₁ (Entity) is x₂ (Number) [units] in **dimension x₃ (ka, Property of x₁)** by standard x₄ (si'o, Standard); optional subunits as x₅. So the “in what respect” slot is always **(ka, Property of x₁)**, not Entity or Number.
  - **Dimension adjectives** (clani, rotsu, tordu, condi, ganra, barda): x₁ (Entity) is long/thick/short/deep/wide/big in **dimension or direction x₂ (ka, Property of x₁)** (default e.g. longest dimension) by standard x₃ (si'o, Standard) when present.
  - Non-SI units (minli “mile”, gutci “short distance units”, degygutci “inches”, jmagutci “feet”, etc.) follow the same pattern: dimension = (ka, Property of x₁).

---

### 6. How this maps into `formal-gismu.tsv`

- **Two columns**:
  - Column 1: `word` – the gismu.
  - Column 2: `definition` – a single English sentence with all places in order, each annotated with its type rendered in a compact textual form.

- **Place annotation rules**:
  - Every place `xₙ` must, at its first mention, be followed by a parenthesized type phrase that corresponds to one of the type shapes above.
  - For abstractors, we always put the Lojban abstractor name first, then the English type, for example:
    - `x₁ (Entity)`
    - `x₂ (nu, Event)`
    - `x₃ (du'u, Proposition)`
    - `x₄ (ka, Property of x₁)`
    - `x₂ (ni, Amount of x₁)`
    - `x₃ (si'o, Scale of property of x₁)`
    - `x₂ (Set<Entity>)` → rendered as `x₂ (set of Entity)`
    - `x₃ (Sequence<Text>)` → rendered as `x₃ (sequence of Text)`
    - `x₁ (Group<Entity>)` → rendered as `x₁ (group of Entity)`
    - Relation: use exactly one of the TypeScript-like forms `Relation<members of xᵢ>`, `Relation<xᵢ, xⱼ>`, or `Relation<Pair<members of xᵢ>>`.
    - Comparison (dunli, mleca, zmadu, dukse): add a **prenex** that declares **T** (e.g. **`T: Entity.`** or **`T: Entity or Amount<Entity>.`**), then write **x₁ (T)** and **x₂ (T)** in the definition.
    - Dimension / measurement (centi, mitre, minli, clani, rotsu, tordu, etc.): the “in what dimension or aspect” place is always **(ka, Property of x₁)** (or of the measured entity). For SI prefix gismu (centi, zepti, gigdo, …): **x₁ (Entity)**, **x₂ (ka, Property of x₁)**, **x₃ (ka, Property of x₁)** — both x₂ and x₃ are properties of x₁.
  - Later mentions of the same `xₙ` in that definition need not repeat the type.

- **Abstractors**:
  - If the source place is primarily `nu`‑like, annotate as `(nu, Event)`.
  - If it is primarily `du'u`‑like, annotate as `(du'u, Proposition)`.
  - If it is explicitly `ka`, annotate as `(ka, Property of …)` for one argument; for a relation between two (or more) places use `(ka, Relation<xᵢ, xⱼ>)` (or more args), not "property of xᵢ and xⱼ".
  - If it is explicitly `ni`, annotate as `(ni, Amount of …)`.
  - If it is explicitly `si'o` as scale, annotate as `(si'o, Scale of …)` or `(si'o, Scale of property of xᵢ)`.
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
  - When a place is glossed as an *action, activity, role or behaviour* **of a specific participant**, we model it primarily as a `ka`‑property of that participant (e.g. “action of x₁”, “activity of x₃”), not as a standalone event type. In TSV this shows up as patterns like `x₂ (ka, Property of x₃ or nu, Event)`. Typical examples are motives/goals (`mukti`, `zukte`), bravery in some activity (`virnu`), laziness about doing something (`lazni`), or influence into an action/state (`xlura`), where the core semantic object is “what this participant does/is like”, i.e. a property.
- **Number**: unchanged, now the `Number` base type.
- **Group / ordered group**: the old “group” and “ordered group” annotations map directly to `Group<T>` and `Sequence<T>` respectively and are rendered as “group of T” / “sequence of T”.
- **Proposition**: the old “proposition” sub‑type of “clause” is now always annotated as `Proposition` (du'u), typically for epistemic, reportive, or logical predicates (`djuno`, `jetnu`, `jitfa`, `natfe`).

All examples and explanations in the original typed‑gismu documentation (including `ka` + `ce'u`, `kau`, `tu'a`, and `zo'ei`) remain valid; this file just gives them a more explicit, generic type‑theoretic shape for use in `formal-gismu.tsv`.
