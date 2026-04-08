---
title: Formal gismu
meta.type: korpora
meta.description: Gismu definitions with place type annotations and type system preamble.
---

## Gismu place type system

This document specifies how **`dictionaries/formal-gismu.tsv`** annotates gismu places with **TypeScript-like** types. **`dictionaries/gismu.tsv`** is the **official** dictionary (definitions, places, rafsi, notes); typed English in the TSV is layered on top of those glosses.

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
type Textit
type Symbol extends Entity
type GrammarStructure extends Entity
type Sound
type Number
type TimeInterval
```

- **Entity**: default for “thing-like” places (person, object, place, institution, language, organism, …).
- **Object** / **Organism** / **Location** / **Language**: use when the definition needs that contrast.
- **Taxon**: taxon-like designation (species, breed, cultivar, …), usually a **name or label**. The same slot may allow **`Taxon | Set<T>`** (with prenex **`x₁: T, T extends Organism`** or similar): **nominal** taxon vs **descriptive** unary-`ka` over the bearer. Further sumti kinds from **`gismu.tsv`** may add **`Entity`**, **`Group<Organism>`**, etc.
- **Text**: strings, sentences, narrative wording, dictionary entries, …
- **Symbol**: inscription-level unit (glyph, lerfu, me'o form, …)—the **form**, not only the abstract referent. **Text** often stands metonymically for **Symbol**; use **`Symbol | Text`** (or **`Entity | Symbol | Text`**) when both readings are licensed.
- **GrammarStructure**: phrase or template in grammar talk (e.g. **gadri** x₂); **`GrammarStructure | Text | Symbol`** when the gloss is “(text)” but the role is structural.
- **Sound**, **Number**, **TimeInterval**: as named.

In the TSV these appear as `Entity`, `Organism`, `Taxon | Set<T>`, etc. after each place.

---

### 2. Abstractors as type constructors

Abstractors map to English-named constructors (do **not** prefix parenthetical types with `nu`, `ka`, `du'u`, … in the TSV):

```ts
type Event<T = unknown>        // nu
type Proposition<T = unknown>  // du'u
type Idea<T = unknown>         // si'o (non-measurement)
type Scale<T = unknown>        // si'o as measurement scale
type Abstraction<T = unknown>  // when not pinned down
type Standard extends Idea<unknown>  // norm / measurement standard (“by standard …”)
```

- **`(Event)`**, **`(Proposition)`**, **`(Standard)`**, etc. in the definition column.
- **`Scale<Set<T>>`** when a scale ranges over a unary-`ka` facet; prenex ties **`T`** and bearer **`x₁: …`** as in §3.

---

### 3. Collections, unary `ka` (`Set<T>`), and the prenex

**Logic.** Where **`gismu.tsv`** marks **(ka)** or “property” in the unary-`ka` sense, read the slot as **extension / predicate-as-set**; in the TSV that is **`Set<T>`**, not a separate “phantom” brand. The **ckaji**-style link is **lexical** (gloss + structure), not an extra type constructor.

```ts
type Set<T>      // extension (lo'i)
type Sequence<T> // ordered collection
type Group<T>    // mass / collective (loi)
```

**Layout of the definition column.** One sentence: **prenex first** (place typings **`x₁: …`, `x₂: …`, …** in order, then **`T extends …`, `U extends …`**), then the gloss with **bare** **`xᵢ`**. Each place’s **first** mention carries the parenthesized type: **`x₂ (Set<T>)`**, etc.

**Bearer typing** — choose by meaning (not every row uses **`x₁`** as bearer; follow the gloss):

| Pattern | Prenex / places | Examples |
|--------|------------------|----------|
| **Single unary-`ka` facet; bearer sort = aspect parameter** | **`x₁: T, T extends …`** and **`Set<T>`** on the facet tied to **`x₁`** | **bancu** **`x₁` / `x₄`**, **ckaji**, **jarco** |
| **Two+ parallel unary-`ka` facets of the same bearer** | **`x₁: T & V, T extends …, V extends …`**, **`x₂ (Set<T>)`**, **`x₃ (Set<V>)`** | **centi** (scale + dimension), **fetsi** (species + traits), **marji** (composition + shape); **lanci** uses **`T & W`** (pattern + material) |
| **Subject vs reference population** | **`U extends Entity, T extends U`**, **`x₁ (T)`**, **`Set<U>`** on the reference set | **fadni**, **girzu**, **rirci**, **mupli**, … |
| **Mixed** | Only one unary-`ka` on **`x₁`**; another place is plain **`Entity`** (medium, source, …) | **`x₁: Entity`** + generics only for the **`ka`** slot — **@boxna**; do **not** force **`T & V`** |

**Rules:**

- Do **not** reuse **`T`** for two **semantically distinct** unary-`ka` facets; add **`V`**, **`W`** (**marji**, **centi**, **vamji**, …).
- Do **not** use bare **`Set<Entity>`** without a prenex when the gloss ties the aspect to a bearer.
- **Anonymous** extension: **`Set<Entity>`** / **`Set<T>`** when the slot is not “predicative-of-**`xᵢ`**” in the type line (reference sets, etc.).
- **Plural glosses:** **`Group<T>`**; if the gloss allows one or many, **`T | Group<T>`**.


- **Nested unary-`ka` in a group:** e.g. **lanxe** — **`T extends Entity`**, **`x₁: Group<T>`**, **`x₂ (Group<Set<Group<T>>>)`** (each force unary-`ka` over **`x₁`**).

If you need a nominal or generic not listed here, add it here before using it in the TSV.

---

### 4. Amounts and relations

```ts
type Amount<Arg>    // ni over one argument; TSV: (Amount of x₁)
type Relation<Args> // relation over 2+ arguments; not a unary-`ka` Set
```

**Unary `ka`** elsewhere: always **`Set<T>`** with prenex from §3; bearer **`Group<S>`** shares **`S`** with nested **`Set<…>`** when the gloss requires.

**Relation** — three flavors:

1. **Arguments from a collection** — collection **`Sequence<T>`** / **`Set<T>`**; relation place **`Relation<T[]>`** (e.g. **bridi** **`x₃`**).
2. **Between named places** — **`Relation<xᵢ, xⱼ>`** (or more indices).
3. **Distinct pairs from a set** — **`Relation<NonMatchingPair<T>>`** when the gloss excludes self-pairs (mutual action, ordering rules on **different** members): **simxu** **`x₂`**, **porsi** **`x₂`**, **liste** **`x₃`**.

**NonMatchingPair** (conceptual): ordered pairs **`[a, b]`** with **`a`**, **`b`** of type **`T`**, **`a ≠ b`**:

```ts
type NonMatchingPair<T, U = T> = T extends any
  ? [T, Exclude<U, T>]
  : never;
```

Contrast *Comparisons* (§5): **`[T, T]`** allows **equal** components.

---

### 5. Common semantic patterns (unary `ka` and neighbors)

The bullets below are **gloss-driven defaults** for unary-`ka` and related slots. Each row still needs the **correct prenex** (§3): **bare** **`xᵢ`** in English; **`Set<T>`** in parentheses.

- **Container** (role only): type as **`Entity`** (“container for …”).
- **RoleOf / ckaji-shaped property:** **`Set<T>`** + bearer in prenex (same idea as **ckaji** **`x₂`**).
- **MeasurementOf** (flattened in TSV): e.g. **`x₁: Entity, T extends Entity`**, **`x₃ (Scale<Set<T>>)`** with prenex tying **`T`** to the measured bearer.
- **Comparisons** (**dunli**, **mleca**, **zmadu**, …): **`T extends …`**, **`x₁ (T)`**, **`x₂ (T)`**.
- **Metric / dimension:** dimension slot **`Set<T>`**; **SI prefixes** use **`x₁: T & V`**, **scale** **`x₂ (Set<T>)`**, **dimension** **`x₃ (Set<V>)`** (parallel facets). **Unit** / **dimension-adjective** gismu: **`x₃` `Set<T>`** + **`Standard`** where the gloss says so.
- **Propulsion “propelled by”:** **`Set<T>`** on the propelled sumti; **jakne** propellant **`Entity`**.
- **Information medium / channel** (format, broadcast, …): **`Set<T>`**; **physical** medium through which waves move: **`Entity`** (**@boxna**, **marce** **`x₃`**, …).
- **“By method”:** **`Set<T>`**, not **`(Event)`**, when the gloss is manner/procedure relative to **`x₁`**.
- **Modal “under rules”:** default **`Set<T>`**; **not** **porsi** **`x₂`**-style ordering — use **`Relation<NonMatchingPair<T>>`**; **javni** / **logji** / … as **object** sumti: **`Proposition`**, **`Entity`**, **`Idea`**, …
- **Material / composition** of **`x₁`:** **`Set<T>`** unless the sumti is a discrete object or feedstock without an “of **`x₁`**” reading.
- **Type / form / pattern / waveform** of **`x₁`:** **`Set<T>`**; **tarmi** **`x₁`** as ideal: **`Entity | Idea`**.
- **Force (ka):** **`Set<T>`** or unions with **`Entity`**, **`(Event)`** per gloss; no separate **`Force`** type.
- **lanxe** mass of forces: §3 *Nested* + **`Group<Set<Group<T>>>`**.

---

### 6. `formal-gismu.tsv` column checklist

- **Columns:** **`word`** | **`definition`** (one sentence, places in order, TypeScript-like types in parentheses after each place’s first mention).
- **Unions:** **`Sound | Text`**, **`Taxon | Set<T>`**, … — spaces around **`|`**; no English “or” inside parentheses.
- **Abstractors:** use §2 English names, not **`nu`** / **`ka`** prefixes in types.
- **Examples of shapes:** **`x₁ (Entity)`**, **`x₂ (Event)`**, **`x₄ (Set<T>)`**, **`x₂ (Amount of x₁)`**, **`x₃ (Scale<Set<T>>)`**, **`x₂ (Set<Entity>)`** (anonymous), **`Relation<NonMatchingPair<T>>`**, **`x₁ (T)`** / **`x₂ (T)`** for comparisons.
- **Later mentions** of the same **`xₙ`**: type need not repeat.
- **Abstractor checklist:** **`nu`** → **`(Event)`**; **`du'u`** → **`(Proposition)`**; unary **`ka`** → **`Set<T>`** + §3 prenex; **`ni`** → **`(Amount of …)`**; **`si'o`** scale → **`Scale<…>`** / **`Scale<Set<T>>`**; vague “abstraction” → may union; **metaphysics** place → **`(Proposition)`**.

---

### 7. Elaboration and tooling

**What tools should preserve:** (1) which place is the bearer — from prenex + gloss; (2) anonymous **`Set`** vs unary-`ka`-of-**`xᵢ`** — same syntax, different gloss; (3) extensional vs intensional readings may differ in UI; (4) mapping to **`lo'i` / `ka` / `loi`** is a separate surface concern. Types **do not** prove **`ckaji(x₁, x₂)`** in running text; they document dictionary structure. **`Set<T>`** here is the spec’s collection type, not necessarily **`globalThis.Set`**.

**Reference populations:** **fadni** **`x₃`** is often a full reference class; **`x₁ (T)`**, **`x₃ (Set<T>)`** or **`T extends U`**, **`x₃ (Set<U>)`** per gloss; looser **`Set<Entity>`** or external metadata if needed for **`x₁ ∈ x₃`**.

**Open questions:** sequence places tied to a bearer vs orthogonal **`Sequence<T>`** and unary-**`ka`** **`Set<…>`**; whether species slots need a **shorter editorial alias** for the **`Set<T>`** arm of **`Taxon | Set<T>`** (the arm is still unary-`ka`, not a new type); extra tagging for **`Group<Set<…>>`**; metadata for non-**ckaji** parallels (**simsa**, **ckini**, …).

**QA samples:** two-facet rows (**centi**, **marji**, **vamji**, **cimde**); **ckaji**, **jarco**, **fadni**, **barda**, **mleca**, **kampu**, **canja**, **mutce** — align with **`gismu.tsv`** after edits.

<div class="w-full overflow-x-auto">
<table class="mt-2 table-fixed max-w-full border font-light text-left text-sm">
  <thead class="border-b italic">
    <tr>
      <th scope="col" class="w-32 p-2">word</th>
      <th scope="col" class="p-2">definition</th>
    </tr>
  </thead>
  <tbody>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bacru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) utters verbally / says / phonates / speaks sound or text x₂ (Sound | Text | Symbol)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">badna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a banana or plantain fruit or plant of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">badri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is sad / depressed / dejected about x₂ (Abstraction: Event | Proposition)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bajra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ runs on surface x₂ (Entity) using limbs x₃ (Entity) with gait x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bakfu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a bundle / package / cluster / clump / pack containing x₂ (Entity) held together by x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bakni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a cow / bovine / cattle / ox of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bakri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: Entity, T extends Entity, V extends Entity. x₁ is a quantity of chalk from source x₂ (Entity) in form x₃ (ka, Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">baktu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a deep, solid, wide-topped container / bucket / pail for contents x₂ (Entity) made of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">balji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a bulb body-part of plant or species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">balni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a balcony / overhang / ledge / shelf of building or structure x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">balre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a blade of tool or weapon x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">balvi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is in the future of event x₂ (Event); x₁ (Event) is later than x₂ (Event) in time</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bancu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ exceeds / is beyond limit or boundary x₂ (Entity) from reference x₃ (Entity) in property x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bandu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) defends or protects x₂ (Event) from threat or peril x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">banfi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is an amphibian of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bangu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Language) is a language or dialect used by x₂ (Entity) to express x₃ (Idea)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">banli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is great or grand in property x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">banro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: Entity, T extends Entity, V extends Entity. x₁ grows or expands to size or form x₂ (ka, Set&lt;T&gt;) from origin x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">banxa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a bank owned by or in banking system x₂ (Entity) for banking function(s) x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">banzu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Object) suffices / is enough / is sufficient for purpose x₂ (Event) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bapli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Event. x₁ (Set&lt;T&gt;) forces or compels event x₂ to occur</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">barda</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is big or large in property or dimension(s) x₂ (Set&lt;T&gt;) compared with standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bargu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ arches or curves over or around x₂ (Entity) and is made of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">barja</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a tavern / bar / pub serving x₂ (Entity) to patrons x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">barna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a mark / spot / patch on x₂ (Entity) made of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bartu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is on the outside of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">basna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ emphasizes / accentuates x₂ (Entity | Text | Sound | Symbol) by action x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">basti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) replaces / substitutes for x₂ (Entity) in circumstance x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">batci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) bites or pinches x₂ (Entity) at locus x₃ (Entity) with x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@batke</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a button / knob / handle on item x₂ (Entity) for purpose x₃ (Event) made of material x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bavmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of barley of species or strain x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">baxso</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Malay–Indonesian common language or culture in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bebna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is foolish or silly in event / action / property x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bemro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects North American culture / nationality / geography in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bende</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Group&lt;Entity&gt;) is a crew / team / gang / squad / band of persons x₂ (Set&lt;Entity&gt;) directed or led by x₃ (Entity) and organized for purpose x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bengo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Bengali / Bangladesh culture / nationality / language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">benji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ transfers / sends / transmits x₂ (Entity) to receiver x₃ (Entity) from origin x₄ (Entity) via means or medium x₅ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bersa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a son of parent(s) x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">berti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is to the north / on the northern side of x₂ (Entity) according to frame of reference x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">besna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a brain body-part of body x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">betfu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an abdomen / belly / lower trunk body-part of body x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">betri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) is a tragedy or disaster for x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bevri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) carries / hauls / bears / transports cargo x₂ (Entity) to destination x₃ (Entity) from origin x₄ (Entity) over path x₅ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@bidju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a bead or pebble of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bifce</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a bee / wasp / hornet of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bikla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) whips / lashes / snaps with sudden violent motion</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bilga</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is bound or obliged to do or be x₂ (Set&lt;T&gt;) by standard or agreement x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bilma</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is ill / sick / diseased with symptoms x₂ (Set&lt;T&gt;) from disease x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bilni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is military / regimented / strongly organized or prepared by system x₂ (Entity) for purpose x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bindo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Indonesian culture / nationality / language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">binra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) insures or indemnifies person x₂ (Entity) against peril x₃ (Event) providing benefit(s) x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">binxo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) becomes / changes / converts / transforms into x₂ (Entity) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">birje</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is made of / contains / is a quantity of beer or ale brewed from x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">birka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an arm body-part of body x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">birti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is certain / sure / convinced that x₂ (Proposition) is true</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@bisli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of / is made of / contains ice of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bitmu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a wall or fence separating x₂ (Entity) and x₃ (Entity) in structure x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">blabi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is white or very light-colored</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@blaci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of / is made of / contains glass of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">blanu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is blue in color</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@bliku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a block three-dimensional shape of material x₂ (Set&lt;T&gt;) with surfaces or sides x₃ (ka, Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bloti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a boat or ship for carrying x₂ (Entity) propelled by means x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@bolci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a ball / sphere / orb / globe of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bongu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a bone body-part performing function x₂ (Set&lt;T&gt;) in body of x₃ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@botpi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a bottle or jar or urn or flask container for x₂ (Entity) made of material x₃ (Set&lt;T&gt;) with lid x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@boxfo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a sheet or foil or blanket two-dimensional flexible shape of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@boxna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: Entity, T extends Entity, V extends Entity. x₁ is a wave periodic pattern in medium x₂ (Entity) with waveform x₃ (ka, Set&lt;V&gt;), wavelength x₄ (Number), frequency x₅ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bradi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an enemy or opponent or adversary or foe of x₂ (Entity) in struggle x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bratu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is hail or sleet or freezing rain of material including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">brazo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Brazilian culture / nationality / language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bredi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is ready or prepared for x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bridi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity. x₁ (Proposition) is a predicate relationship with relation x₂ (Relation&lt;T[]&gt;) over arguments x₃ (Sequence&lt;T&gt; | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">brife</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a breeze or wind or gale from direction x₂ (Entity) with speed x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">briju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is an office or bureau or workplace of worker x₂ (Entity) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">brito</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects British or United Kingdom culture / nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">broda</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Predicate variable) is the first assignable variable predicate with context-determined place structure</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">brode</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Predicate variable) is the second assignable variable predicate with context-determined place structure</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">brodi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Predicate variable) is the third assignable variable predicate with context-determined place structure</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">brodo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Predicate variable) is the fourth assignable variable predicate with context-determined place structure</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">brodu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Predicate variable) is the fifth assignable variable predicate with context-determined place structure</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bruna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a brother of x₂ (Entity) by bond or tie or standard or parent(s) x₃ (Relation&lt;x₁,x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">budjo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ pertains to Buddhist culture / religion / ethos in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bukpu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an amount of cloth or fabric of type or material x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bumru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is foggy or misty or covered by a fog or mist or vapor of liquid x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bunda</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is x₂ (Number) local weight units in standard x₃ (Standard) with subunits x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">bunre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is brown or tan in color</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">burcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a brush for purpose x₂ (Event) with bristles x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">burna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is embarrassed or disconcerted or flustered or ill at ease about conditions x₂ (Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cabna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is current or in the present or concurrent or simultaneous with x₂ (Event | TimeInterval) in time</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cabra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is apparatus or mechanism or device or equipment for function x₂ (Set&lt;T&gt;) controlled or triggered by x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cacra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is x₂ (Number) hours in duration by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cadzu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) walks or strides or paces on surface x₂ (Entity) using limbs x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cafne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) often or frequently or commonly or customarily occurs or recurs by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cakla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of chocolate or cocoa</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">calku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a shell or husk around x₂ (Entity) composed of x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">canci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) vanishes or disappears from location x₂ (Location) using senses or sensor x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cando</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is idle or at rest or inactive</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cange</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a farm or ranch at x₂ (Location) farmed by x₃ (Entity) raising or producing x₄ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">canja</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity, x₄: U, U extends Entity, V extends Entity, W extends Entity. x₁ exchanges or trades or barters commodity x₂ (Set&lt;V&gt;) for x₃ (Set&lt;W&gt;) with x₄</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">canko</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a window or portal or opening in wall or building or structure x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">canlu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is space or volume or region or room occupied by x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">canpa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a shovel or spade for digging x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@canre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of sand or grit from source x₂ (Entity) of composition including x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">canti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is gut or entrails or intestines or viscera or digestive system body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">carce</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a cart or carriage or wagon for carrying x₂ (Entity) propelled by x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">carmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is intense or bright or saturated or brilliant in property x₂ (Set&lt;T&gt;) as received or measured by observer x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">carna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) turns or rotates or revolves around axis x₂ (Entity) in direction x₃ (Entity) towards point x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cartu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a chart or diagram or map of or about x₂ (Entity) showing formation or data-points x₃ (Set&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">carvi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) rains or showers or precipitates to x₂ (Location) from x₃ (Entity); x₁ is precipitation</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">casnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Group&lt;Entity&gt;) discusses or talks about topic or subject x₂ (Entity | Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">catke</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) shoves or pushes x₂ (Entity) at locus x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">catlu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) looks at or examines or views or inspects or regards or watches or gazes at x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">catni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ has authority or is an official in or on or over matter or sphere or persons x₂ (Set&lt;T&gt;) derived on basis x₃ (Proposition)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">catra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ kills or slaughters or murders x₂ (Entity) by action or method x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">caxno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is shallow in extent in direction or property x₂ (Set&lt;T&gt;) away from reference point x₃ (Entity) by standard x₄ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cecla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity) launches or fires or shoots projectile or missile x₂ propelled by x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cecmu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Group&lt;Entity&gt;) is a community or colony of organisms x₂ (Group&lt;Organism&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cedra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends TimeInterval. x₁ is an era or epoch or age characterized by x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cenba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ varies or changes in property or quantity x₂ (Set&lt;T&gt;) in amount or degree x₃ (Amount of x₂) under conditions x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">censa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is holy or sacred to person or people or culture or religion or cult or group x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">centi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^-2 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cerda</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity, x₃: U, U extends Entity, V extends Entity, W extends Entity. x₁ is an heir to or is to inherit x₂ (Set&lt;V&gt;) from x₃ according to rule x₄ (Set&lt;W&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cerni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is a morning of day x₂ (TimeInterval) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">certu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is an expert or pro or skilled at x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cevni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a god or deity of people or religion x₂ (Group&lt;Entity&gt;) with dominion over sphere x₃ (Set&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cfari</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) commences or initiates or starts or begins to occur</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cfika</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a work of fiction about plot or theme or subject x₂ (Entity) by author x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cfila</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) is a flaw or fault or defect in x₂ causing x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cfine</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a wedge shape or tool of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cfipu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Event. x₁ or state confuses or baffles observer x₂ (Entity) due to confusing property x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ciblu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is blood or vital fluid of organism x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cicna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is cyan or turquoise or greenish-blue in color</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cidja</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is food or feed or nutriment for x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cidni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a knee or elbow or knuckle hinged joint of limb x₂ (Entity) of body x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cidro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of hydrogen x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cifnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is an infant or baby of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cigla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a gland body-part secreting x₂ (Entity) in body x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cikna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is awake or alert or conscious</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cikre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity) repairs or mends or fixes x₂ for use x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ciksi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) explains x₂ (Event) to x₃ (Entity) with explanation x₄ (Proposition)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cilce</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is wild or untamed</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cilmo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is moist or wet or damp with liquid x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cilre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ learns x₂ (Proposition) about subject x₃ (Entity) from source x₄ (Entity | Event) by method x₅ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cilta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a thread or filament or wire of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cimde</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: U, U extends Entity, T extends Entity, V extends Entity. x₁ (Set&lt;T&gt;) is a dimension of space or object x₂ according to rules or model x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cimni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is infinite or unending or eternal in property or dimension x₂ (Set&lt;T&gt;) to degree x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cinba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) kisses or buss(es) x₂ (Entity) at locus x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cindu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is an oak tree of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cinfo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a lion or lioness of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cinje</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a wrinkle or crease or fold in x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cinki</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is an insect or arthropod of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cinla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is thin in direction or dimension x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cinmo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ feels emotion x₂ (Set&lt;T&gt;) about x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cinri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Abstraction) interests or is interesting to x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cinse</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ in activity or state x₂ (Set&lt;T&gt;) exhibits sexuality or gender or sexual orientation x₃ (Set&lt;V&gt;) by standard x₄ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cinta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a paint material of pigment or active substance x₂ (Entity) in base x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cinza</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is tongs or chopsticks or pincers or tweezers or pliers tool or body-part for x₂ (Entity) to pinch x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cipni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a bird or avian or fowl of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cipra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity, U extends Entity. x₁ (Event | Process) is a test or examination or proof of property or state x₂ (Set&lt;U&gt;) in subject x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cirko</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ loses property or feature x₂ (Set&lt;T&gt;) in conditions or situation x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cirla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains cheese or curd from source x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ciska</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: Text | Symbol, T extends Entity. x₁ (Entity) writes or inscribes text x₂ on medium x₃ (Set&lt;T&gt;) with writing implement x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cisma</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) smiles or grins</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ciste</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: S, S extends Group&lt;Entity&gt;, T extends Entity. x₁ is a system interrelated by structure x₂ (Entity) among components x₃ (Set&lt;Entity&gt;) displaying systemic property x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">citka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) eats or ingests or consumes x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">citno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is young or youthful by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">citri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a history of x₂ (Entity) according to viewpoint person x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">citsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends TimeInterval. x₁ is a season cyclical interval defined by interval or property x₂ (Set&lt;T&gt;) of year(s) x₃ (SplicedTimeInterval)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">civla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a louse or flea of species x₂ (Taxon | Set&lt;T&gt;) parasitic on x₃ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cizra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is strange or weird or deviant or bizarre or odd to x₂ (Entity) in property x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ckabu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of rubber or latex from source x₂ (Entity) of composition including x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ckafi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is made of or contains or is a quantity of coffee from source or bean or grain x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ckaji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ has or is characterized by property or feature or trait or aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ckana</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a bed or pallet of material x₂ (Set&lt;T&gt;) for holding or supporting x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ckape</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: U, U extends Entity | Event, T extends Entity. x₁ (Set&lt;T&gt;) is perilous or dangerous or potentially harmful to x₂ under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ckasu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity, x₂: U, U extends Entity, V extends Entity, W extends Entity. x₁ ridicules or mocks or scoffs at x₂ about x₃ (Set&lt;V&gt;) by doing activity x₄ (Set&lt;W&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ckeji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) feels ashamed or mortified or humiliated under conditions x₂ (Event) before audience x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ckiku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a key fitting or releasing or opening or unlocking lock x₂ (Entity) and having relevant properties x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ckilu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Scale) is a scale of units for measuring or observing or determining state x₂ (Set&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ckini</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is related or associated or akin to x₂ (Entity) by relationship x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ckire</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity) is grateful or thankful or appreciative to x₂ for x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ckule</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a school or institute or academy at x₂ (Location) teaching subjects x₃ (Set&lt;Entity&gt;) to audience x₄ (Group&lt;Entity&gt;) operated by x₅ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ckunu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a conifer or pine or fir of species x₂ (Taxon | Set&lt;T&gt;) with cones x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cladu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Sound) is loud or noisy at observation point x₂ (Location) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">clani</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is long in dimension or direction x₂ (Set&lt;T&gt;) by measurement standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">claxu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is without or lacks or is free of x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">clika</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is moss or lichen of species x₂ (Taxon | Set&lt;T&gt;) growing on x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">clira</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is early by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">clite</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is polite or courteous or civil in matter x₂ (Set&lt;T&gt;) according to standard or custom x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cliva</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) leaves or goes away or departs or separates from x₂ (Entity) via route x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">clupa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a loop or circuit of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cmaci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is mathematics of type or describing x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cmalu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is small in property or dimension(s) x₂ (Set&lt;T&gt;) as compared with standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cmana</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a mountain or hill or mound projecting from land mass x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cmavo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is a structure word of grammatical class x₂ (Symbol | Text) with meaning or function x₃ (Relation&lt;Entity&gt;) in usage language x₄ (Language)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cmene</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Symbol | Text) is a name or title or tag of x₂ (Entity) used by namer or name-user x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cmila</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) laughs</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cmima</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a member or element of set x₂ (Set&lt;Entity&gt;) or belongs to group x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cmoni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ utters moan or groan or howl or scream non-linguistic utterance x₂ (Sound) expressing property x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cnano</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity, U extends Entity. x₁ (T) is a norm or average in property x₂ (Set&lt;U&gt;) among x₃ (Set&lt;T&gt;) by standard x₄ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cnebo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a neck body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cnemu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity, x₂: U, U extends Entity, V extends Entity, W extends Entity. x₁ rewards x₂ for atypical x₃ (Set&lt;V&gt;) with reward x₄ (Set&lt;W&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cnici</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is orderly or neat or ordered in property or quantity x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cnino</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is new or unfamiliar or novel to observer x₂ (Entity) in feature x₃ (Set&lt;T&gt;) by standard x₄ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cnisa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of lead metal x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cnita</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is directly or vertically beneath or below or under x₂ (Location) in frame of reference x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cokcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) soaks up or absorbs or sucks up x₂ (Entity) from x₃ (Entity) into x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">condi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is deep in extent in direction or property x₂ (Set&lt;T&gt;) away from reference point x₃ (Entity) by standard x₄ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cortu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) feels pain or hurt at locus x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cpacu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) gets or procures or acquires or obtains or accepts x₂ (Entity) from source x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cpana</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is upon or atop or resting on or lying on upper surface of x₂ (Entity) in frame of reference x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cpare</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) climbs or clambers or creeps or crawls on surface x₂ (Entity) in direction x₃ (Entity) using limbs or tools x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cpedu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity, x₃: U, U extends Entity, V extends Entity, W extends Entity. x₁ requests or asks or petitions or solicits for x₂ (Set&lt;V&gt;) from x₃ in manner or form x₄ (Set&lt;W&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cpina</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is pungent or piquant or peppery or spicy or irritating to sense x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cradi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ broadcasts or transmits x₂ (Entity) via station or frequency x₃ (Set&lt;T&gt;) to radio receiver x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">crane</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is in front of or anterior to x₂ (Entity) which faces orientation x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">creka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a shirt or blouse or top garment x₂ (Entity) material for upper body</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">crepu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) harvests or reaps or gathers crop or product or objects x₂ (Entity) from source or area x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cribe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a bear of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">crida</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a fairy or elf or gnome or pixie or goblin mythical humanoid of mythos or religion x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">crino</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is green or verdant in color</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cripu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a bridge or span over or across x₂ (Entity) between x₃ (Entity) and x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">crisa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is summer season of year x₂ (TimeInterval) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">critu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is autumn or fall season of year x₂ (TimeInterval) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ctaru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a tide periodic expansion in x₂ (Entity) caused by x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ctebi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a lip or rim body-part of orifice x₂ (Entity) of body x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@cteki</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a tax or levy or duty on goods or services or event x₂ (Entity | Event) levied against x₃ (Entity) by authority or collector x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ctile</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of petroleum or oil from source x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ctino</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a shadow or shade of object x₂ (Entity) made by light or energy source x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ctuca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ teaches audience x₂ (Group&lt;Entity&gt;) ideas or methods or lore x₃ (Proposition) about subjects x₄ (Set&lt;Entity&gt;) by method x₅ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cukla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is round or circular two-dimensional shape</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cukta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a book containing work x₂ (Entity) by author x₃ (Entity) for audience x₄ (Group&lt;Entity&gt;) preserved in medium x₅ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">culno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is full or completely filled with x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cumki</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is possible under conditions x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cumla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is humble or modest about x₂ (Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cunmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of millet grain of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cunso</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is random or fortuitous or unpredictable under conditions x₂ (Event) with probability distribution x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cuntu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: G, G extends Group&lt;Entity&gt;, T extends Entity. x₁ (Set&lt;T&gt;) is an affair or organized activity involving person(s) x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cupra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) produces product x₂ (Entity) by process x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">curmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) lets or permits or allows event x₂ (Event) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">curnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a worm or invertebrate animal of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">curve</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is pure or unadulterated or simple in property x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cusku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ expresses or says content x₂ (Text | Symbol) for audience x₃ (Group&lt;Entity&gt;) via expressive medium x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cutci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a shoe or boot or sandal for covering or protecting feet or hooves x₂ (Entity) made of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cutne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a chest or thorax or upper trunk body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">cuxna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity. x₁ (Entity) chooses or selects choice x₂ (T) from complete set or sequence of alternatives x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dacru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a drawer or sliding compartment in structure x₂ (Entity) for contents x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dacti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Object) is a material object enduring in space-time</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dadjo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ pertains to Taoist culture or ethos or religion in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dakfu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a knife tool for cutting x₂ (Entity) with blade of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dakli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a sack or bag with contents x₂ (Entity) made of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">damba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) fights or combats or struggles with x₂ (Entity) over issue x₃ (Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">damri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a drum or cymbal or gong percussion instrument with beater or actuator x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dandu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) hangs or dangles or is suspended from x₂ (Entity) by joint x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">danfu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is the answer or response or solution or reply to question or problem x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">danlu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is an animal or creature of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">danmo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of smoke or smog or air pollution from source x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">danre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) puts pressure on or presses or applies force to x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dansu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) dances to accompaniment or music or rhythm x₂ (Sound)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">danti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a ballistic projectile such as bullet or missile for firing by gun or launcher x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">daplu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Location. x₁ is an island or atoll or key of material or properties x₂ (Set&lt;T&gt;) in surroundings or body x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dapma</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) curses or damns or condemns x₂ (Entity) to fate x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dargu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a road or highway to x₂ (Location) from x₃ (Location) with route x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">darlu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) argues for stand x₂ (Proposition) against stand x₃ (Proposition)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">darno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is far or distant from x₂ (Entity) in property x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">darsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ shows audacity or boldness in behavior x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">darxi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) hits or strikes or beats x₂ (Entity) with instrument or body-part x₃ (Entity) at locus x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">daski</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a pocket or pouch of or in garment or item x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dasni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ wears garment x₂ (Entity) as garment of type x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">daspo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) destroys or ruins or wrecks or despoils x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dasri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a ribbon or tape or strip or band of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">datka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a duck of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">datni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Proposition) is data or information or statistics about x₂ (Entity) gathered by method x₃ (Set&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">decti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is one tenth in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">degji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a finger or digit or toe body-part on limb or body site x₂ (Entity) of body x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dejni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity, x₃: U, U extends Entity, V extends Entity, W extends Entity. x₁ owes debt x₂ (Set&lt;V&gt;) to creditor x₃ in return for service or loan x₄ (Set&lt;W&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dekpu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: Entity, T extends Entity. x₁ is x₂ (Number) local volume units in dimension x₃ (Set&lt;T&gt;) by standard x₄ (Standard) with subunits x₅ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dekto</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is ten in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">delno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is x₂ (Number) candela in luminosity by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dembi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a bean or pea or leguminous seed from plant x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">denci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a tooth body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">denmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is dense or concentrated or packed or intense in property x₂ (Set&lt;T&gt;) at location x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">denpa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) waits or pauses for x₂ (Event) at state x₃ (Event) before doing or continuing x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dertu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of dirt or soil or earth or ground from source x₂ (Entity) of composition x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">derxi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a heap or pile or stack or mound or hill of materials x₂ (Entity) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">desku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ shakes or quakes or trembles or quivers or shudders or wobbles or vibrates from force x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">detri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is the date of event or state x₂ (Event) at location x₃ (Location) by calendar x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dicra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Event. x₁ interrupts or stops or halts or disrupts x₂ (Event) due to quality x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dikca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is electricity electric charge or current in or on x₂ (Entity) of polarity or quantity x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">diklo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is local to locus x₂ (Entity) within range x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dikni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is regular or cyclical or periodic in property or activity x₂ (Set&lt;T&gt;) with period or interval x₃ (TimeInterval)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dilcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Number) is the quotient x₂ (Number) divided by x₃ (Number) leaving remainder x₄ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dilnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a cloud or mass of clouds of material x₂ (Set&lt;T&gt;) in air mass x₃ (Entity) at base elevation x₄ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dimna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is a fate or destiny of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dinju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a building or edifice for purpose x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dinko</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a nail or tack fastener of type or size x₂ (Set&lt;T&gt;) made of material x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dirba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) is dear or precious or darling to x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dirce</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) radiates or emits x₂ (Entity) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dirgo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a drop of material x₂ (Set&lt;T&gt;) in surrounding material x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dizlo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is low or downward in frame of reference x₂ (Entity) compared with baseline or standard height x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">djacu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of water</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">djedi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is x₂ (Number) full days in duration by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">djica</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) desires or wants or wishes x₂ (Event | State) for purpose x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">djine</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a ring or annulus or torus or circle shape of material x₂ (Set&lt;T&gt;) with inside diameter x₃ (Entity) and outside diameter x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">djuno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) knows fact x₂ (Proposition) about subject x₃ (Entity) by epistemology x₄ (Proposition)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">donri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is the daytime of day x₂ (TimeInterval) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dotco</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects German or Germanic culture or nationality or language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">draci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a drama or play about x₂ (Entity) by dramatist x₃ (Entity) for audience x₄ (Group&lt;Entity&gt;) with actors x₅ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">drani</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is correct or proper or right or perfect in property or aspect x₂ (Set&lt;T&gt;) in situation x₃ (Event) by standard x₄ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">drata</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is different from or other than x₂ (Entity) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">drudi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a roof or top or ceiling or lid of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dugri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Number) is the logarithm of x₂ (Number) to base x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dukse</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity. x₁ (T) is an excess of or too much of x₂ (T) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dukti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a polar opposite or contrary to x₂ (Entity) in property or on scale x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dunda</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₃: Entity, T extends Entity. x₁ (Entity) gives or donates gift x₂ (Set&lt;T&gt;) to recipient x₃ without payment or exchange</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dunja</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) freezes or jells or solidifies at temperature x₂ (Number) and pressure x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dunku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is anguished or distressed or emotionally wrought or stressed by x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dunli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity. x₁ (T) is equal or congruent to or as much as x₂ (T) in property or dimension or quantity x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dunra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is winter season of year x₂ (TimeInterval) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dzena</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an elder or ancestor of x₂ (Entity) by bond or degree x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">dzipo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Antarctican culture or nationality or geography in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">facki</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) discovers or finds out fact x₂ (Proposition) about subject or object x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fadni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">U extends Entity, T extends U. x₁ (T) is ordinary or common or typical or usual in property x₂ (Set&lt;U&gt;) among set x₃ (Set&lt;U&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fagri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a fire or flame in fuel x₂ (Entity) burning in or reacting with oxidizer x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">falnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a sail for gathering propelling material x₂ (Entity) on vehicle or motor x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">famti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an aunt or uncle of x₂ (Entity) by bond x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fancu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity, U extends Entity. x₁ (Text) names a function with domain x₂ (set of T) and codomain x₃ (set of U) such that mapping each element of the domain to an element of the codomain is x₄ (Relation&lt;T, U&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fange</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is foreign or alien or exotic or unfamiliar to x₂ (Entity) in property x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fanmo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (State) is an end or finish or termination of thing or process x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fanri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a factory or foundry or industrial plant or mill producing x₂ (Entity) from materials x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fanta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) prevents or keeps or stops or restrains event x₂ (Event) from occurring</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fanva</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) translates text or utterance x₂ (Text | Symbol) to language x₃ (Language) from language x₄ (Language) with translation result x₅ (Text | Symbol)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fanza</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) annoys or irritates or bothers or distracts x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fapro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) opposes or balances or contends against opponent(s) x₂ (Group&lt;Entity&gt;) about x₃ (Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">farlu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) falls or drops to x₂ (Location) from x₃ (Location) in gravity well or frame x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">farna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is the direction of x₂ (Entity | Event) from origin or in frame of reference x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">farvi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) develops or evolves towards or into x₂ (Entity) from x₃ (Entity) through stages x₄ (Sequence&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fasnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is an event or incident or happening or occurrence</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fatci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Proposition) is a fact or reality or truth or actuality</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fatne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Sequence&lt;Entity&gt;) is in reverse order from sequence x₂ (Sequence&lt;Entity&gt;) or x₁ (Entity) is inverted from x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fatri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is distributed or allotted or allocated or shared among x₂ (Group&lt;Entity&gt;) with shares or portions x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">febvi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) boils or evaporates at temperature x₂ (Number) and pressure x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">femti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^-15 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fendi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ divides or partitions or separates x₂ (Entity) into parts or individuals x₃ (Group&lt;Entity&gt;) by method or partition x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fengu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity) is angry or mad at x₂ for x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fenki</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is crazy or insane or frantic by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fenra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a crack or fissure or pass or cleft or ravine or chasm in x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fenso</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) sews or stitches or sutures materials x₂ (Set&lt;Entity&gt;) together with tool(s) x₃ (Entity) using filament x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fepni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is x₂ (Number) cents or copecks in value in monetary system x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fepri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a lung body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ferti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is fertile or conducive for supporting growth or development of x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">festi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is waste product left by event or activity x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fetsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Organism, V extends Entity. x₁ is a female of species x₂ (Taxon | Set&lt;T&gt;) with feminine traits x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">figre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a fig fruit or tree of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">filso</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Palestinian culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">finpe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a fish of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">finti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) invents or creates or composes or authors x₂ (Entity) for purpose x₃ (Event) from existing elements or ideas x₄ (Set&lt;Proposition&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">flalu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₃: G, G extends Group&lt;Entity&gt;, T extends Entity. x₁ (Entity) is a law specifying x₂ (Set&lt;T&gt;) for community x₃ under conditions x₄ (Event) by lawgiver x₅ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">flani</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a flute or pipe or fife or recorder musical instrument</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">flecu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a current or flow or river of or in fluid x₂ (Entity) flowing towards x₃ (Location) from source x₄ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fliba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ fails at doing x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">flira</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a face head body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">foldi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a field broad uniform expanse of material x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fonmo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of foam or froth or suds of material x₂ (Entity) with bubbles of material x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">uffonmo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a quantity of foam or froth or suds of material x₂ (Set&lt;T&gt;) with bubbles of material x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fonxa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a telephone transceiver or modem attached to system or network x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">forca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a fork tool or utensil for purpose x₂ (Event) with tines or prongs x₃ (Entity) on base or support x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fraso</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects French or Gallic culture or nationality or language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">frati</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reacts or responds or answers with action x₂ (Set&lt;T&gt;) to stimulus x₃ (Entity | Event) under conditions x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fraxu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) forgives x₂ (Entity) for event or state or activity x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">frica</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) differs or is distinct from x₂ (Entity) in property or dimension or quantity x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">friko</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects African culture or nationality or geography in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">frili</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) is easy or simple or facile for agent x₂ under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">frinu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a fraction with numerator x₂ (Number) and denominator x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">friti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₃: Entity, T extends Entity. x₁ (Entity) offers or proffers x₂ (Set&lt;T&gt;) to x₃ with conditions x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">frumu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) frowns or grimaces</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fukpi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a copy or replica or duplicate or clone of x₂ (Entity) in form or medium x₃ (ka, Set&lt;T&gt;) made by method x₄ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fulta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) floats on or in fluid x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">funca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) is determined by the luck or fortune of x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fusra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) rots or decays or ferments with decay or fermentation agent x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">fuzme</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is responsible or accountable for x₂ (Event | State) to judge or authority x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gacri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a cover or lid or top for covering or concealing or sheltering x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gadri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is an article or descriptor labelling description x₂ (GrammarStructure | Text | Symbol) in language x₃ (Entity) with semantics x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">galfi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) modifies or alters or changes or transforms or converts x₂ (Entity) into x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">galtu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is high or upward in frame of reference x₂ (Entity) compared with baseline or standard height x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">galxe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a throat or gullet body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ganlo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a portal or passage or entrance-way that is closed or shut preventing passage or access to x₂ (Entity) by x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ganra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is broad or wide in dimension x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ganse</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ senses or detects or notices stimulus x₂ (Event) by means x₃ (Set&lt;T&gt;) under conditions x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ganti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a gonad or testes or ovary body-part of x₂ (Organism) of sex x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ganxo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an anus or anal orifice body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ganzu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) organizes x₂ (Group&lt;Entity&gt;) into ordered result x₃ (Group&lt;Entity&gt;) by system or principle(s) x₄ (Relation, &lt;x1, x2&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gapci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is gaseous or a gas or vapor of material including x₂ (Entity) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gapru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is directly or vertically above x₂ (Entity) in gravity or frame x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">garna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a rail or railing or bar supporting or restraining x₂ (Entity) made of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gasnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) as agent brings about event x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gasta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or is made of or contains steel of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">genja</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a root body-part of plant or species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gento</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Argentinian culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">genxu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a hook or crook shape of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gerku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a dog or canine of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gerna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is the grammar or rules or defining form of language x₂ (Entity) for structure or text x₃ (Text | GrammarStructure)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gidva</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Event) guides or conducts or pilots or leads x₂ in or at event x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gigdo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^9 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ginka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a camp or encampment or temporary residence of x₂ (Entity) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">girzu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">U extends Entity, T extends U. x₁ (Group&lt;T&gt;) is a group or cluster or team showing common property x₂ (Set&lt;U&gt;) with members x₃ (Set&lt;U&gt;) linked by relation x₄ (Relation&lt;T[]&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gismu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity. x₁ (Text) is a Lojban root word expressing relation x₂ (Relation&lt;T[]&gt;) among argument roles x₃ (Sequence&lt;T&gt; | Set&lt;T&gt;) with affixes x₄ (Set&lt;Text&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">glare</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is hot or warm by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gleki</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is happy or merry or glad or gleeful about x₂ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gletu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) copulates or mates or has sexual intercourse with x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">glico</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is English or pertains to English-speaking culture in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gluta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a mitten or glove garment of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gocti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^-24 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gotro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^24 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gradu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a unit or degree on scale x₂ (v) measuring property x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">grake</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is x₂ (Number) grams in mass by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">grana</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a rod or pole or staff or stick or cane shape of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">grasu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or is made of or contains grease or fat or oil from source x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">greku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a frame or structure or skeleton supporting or determining the form of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">grusi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is gray in color</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">grute</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a fruit of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gubni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is public or jointly available to community x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gugde</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a country of peoples x₂ (Group&lt;Entity&gt;) with territory x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gundi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is industry or industrial manufacturing activity producing x₂ (Entity) by process or means x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gunka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ works or labors on activity x₂ (Set&lt;T&gt;) with goal x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gunma</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Group&lt;Entity&gt;) is a mass or team or aggregate together composed of components x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gunro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) rolls on or against surface x₂ (Entity) rotating on axis or axle x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gunse</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a goose of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gunta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ attacks or invades or commits aggression upon victim x₂ (Entity) with goal x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gurni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is grain or cereal from plant or species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">guska</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) scrapes or erodes or abrades x₂ (Entity) from x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gusni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is light or illumination illuminating x₂ (Entity) from light source x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gusta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a restaurant or cafe or diner serving type-of-food x₂ (Entity) to audience x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gutci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is x₂ (Number) short local distance units in dimension x₃ (Set&lt;T&gt;) by standard x₄ (Standard) with subunits x₅ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">gutra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a womb or uterus body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">guzme</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a melon or squash fruit or plant of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jabre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) brakes or causes to slow motion or activity x₂ (Event) with mechanism or principle x₃ (Relation&lt;x_1, x_2&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jadni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) adorns or decorates x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jakne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a rocket vehicle propelled by jet expelling x₂ (Entity) carrying payload x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jalge</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event | State) is a result or outcome or conclusion of antecedent x₂ (Event | Process)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jalna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of starch from source x₂ (Entity) of composition including x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jalra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a cockroach or termite or orthopteran of order or species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jamfu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a foot body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jamna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) wars against x₂ (Entity) over territory or matter x₃ (Set&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">janbe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a bell or chime or tuning fork producing sound x₂ (Sound)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">janco</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a shoulder or hip joint body-part attaching limb x₂ (Entity) to body x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">janli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) collides with or crashes or bumps or runs into x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jansu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a diplomat or consul representing polity x₂ (Entity) in negotiation x₃ (Event) for function or purpose x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">janta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₃: Entity, T extends Entity. x₁ (Entity) is an account or bill or invoice for goods or services x₂ (Set&lt;T&gt;) billed to x₃ by x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jarbu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a suburban area of city or metropolis x₂ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jarco</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ shows or exhibits or displays or reveals or demonstrates property x₂ (Set&lt;T&gt;) to audience x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jarki</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is narrow in dimension x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jaspu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a passport issued to person x₂ (Entity) by authority x₃ (Entity) allowing activity x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jatna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a captain or commander or leader of vehicle or domain x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">javni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a rule prescribing or mandating or requiring event or state x₂ (Event) within system or community x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jbama</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a bomb or explosive device with explosive material or principle x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jbari</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a berry fruit or plant of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jbena</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is born to parent x₂ (Entity) at time x₃ (TimeInterval) and place x₄ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jbera</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) borrows or temporarily takes object x₂ (Entity) from source x₃ (Entity) for interval x₄ (TimeInterval)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jbini</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is between or among set or bounds x₂ (Set&lt;Entity&gt;) in property x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jdari</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is firm or hard or resistant or unyielding to force x₂ (Set&lt;T&gt;) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jdice</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) decides decision x₂ (Proposition) about matter x₃ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jdika</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ decreases or contracts or is reduced in property or quantity x₂ (Set&lt;T&gt;) by amount x₃ (Entity | Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jdima</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: Entity, x₃: Entity, x₄: Entity, T extends Entity, V extends Entity. x₁ (Set&lt;T&gt;) is the price of x₂ (Set&lt;V&gt;) to purchaser x₃ set by vendor x₄</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jdini</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is money or currency issued by x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jduli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of jelly or semisolid of material including x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jecta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a polity or state governing territory or domain x₂ (Entity | Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jeftu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is x₂ (Number) weeks in duration by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jegvo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ pertains to Abrahamic common culture or religion or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jelca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) burns or ignites or is flammable at temperature x₂ (Number) in atmosphere x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jemna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a gem or polished stone or pearl of type x₂ (ka, Set&lt;T&gt;) from material or source x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jenca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) shocks or stuns x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jendu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is an axle or spindle tool on which x₂ (Entity) rotates made of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jenmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: S, S extends Group&lt;Entity&gt;, T extends Entity. x₁ is an army serving group or community x₂ (Group&lt;Entity&gt;) in function x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jerna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ earns or deserves or merits wages or salary or pay x₂ (Set&lt;T&gt;) for work or service x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jersi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) chases or pursues or physically follows after x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jerxo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Algerian culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jesni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a needle pointed shape of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jetce</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a jet expelled stream of material x₂ (Set&lt;T&gt;) expelled from x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jetnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Proposition) is true by standard or epistemology or metaphysics x₂ (Proposition)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jgalu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a claw or nail or talon body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jganu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an angle shape from vertex x₂ (Entity) subtended by lateral segment x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jgari</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) grasps or holds or clutches or seizes or grips x₂ (Entity) with body-part x₃ (Entity) at locus x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jgena</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a knot or tangle in or between x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jgina</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Organism. x₁ (Entity) is a gene of creature x₂ determining trait or process x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jgira</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) feels pride in or about x₂ (Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jgita</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a guitar or violin or stringed musical instrument with plectrum or bow x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jibni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is near or close to x₂ (Entity) in property or quantity x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jibri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) is a job or occupation or employment of person x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jicla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) stirs or mixes or agitates fluid x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jicmu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: U, U extends Entity | Event, T extends Entity. x₁ (Set&lt;T&gt;) is a basis or foundation or fundamental principle of x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jijnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) intuits fact x₂ (Proposition) about subject x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jikca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) interacts or behaves socially with x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jikru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or is made of or contains liquor distilled from x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jilka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of alkali or base of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jilra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity) is jealous of or envies x₂ about property x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jimca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a branch or bough or limb of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jimpe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) understands fact x₂ (Proposition) about subject x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jimte</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a limit or extreme or bound or border of x₂ (Entity) in property or domain x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jinci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a pair of shears or scissors for cutting x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jinga</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ wins or gains prize x₂ (Set&lt;T&gt;) from competitors x₃ (Group&lt;Entity&gt;) in competition x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jinku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity) is a vaccine or immune-system stimulant protecting x₂ against disease x₃ (Set&lt;T&gt;) introduced by method x₄ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jinme</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or is made of or contains metal of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jinru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is immersed or submerged or bathes in liquid x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jinsa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is clean or pure of material or contaminant x₂ (Entity) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jinto</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a well or spring of fluid x₂ (Entity) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jinvi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) opines that x₂ (Proposition) is true about subject x₃ (Entity) on grounds x₄ (Proposition)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jinzi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) is an innate or inherent or intrinsic or natural property of x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jipci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a chicken or small fowl of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jipno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a tip or point or vertex or extremity or end on object x₂ (Entity) at locus x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jirna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a horn body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jisra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or is made of or contains juice or nectar from source x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jitfa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Proposition) is false or an untruth by standard or epistemology or metaphysics x₂ (Proposition)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jitro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ has control over or manages or directs or conducts x₂ (Entity) in activity or event x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jivbu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) weaves x₂ (Entity) from material or yarn x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jivna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ competes or vies with opponent x₂ (Entity) in contest x₃ (Event) for gain x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jmaji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Group&lt;Entity&gt;) gathers or collects at location x₂ (Location) from locations x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jmifa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Location. x₁ is a shoal or reef of material x₂ (Set&lt;T&gt;) in body of water x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jmina</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) adds or combines x₂ (Entity) to x₃ (Entity) with result x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jmive</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Organism) lives or is alive by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jordo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Jordanian culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jorne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is joined to or connects to or is united with x₂ (Entity) at common locus x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jubme</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a table with flat upper surface of material x₂ (Set&lt;T&gt;) supported by legs or base or pedestal x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">judri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an address or coordinates of x₂ (Entity) in system x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jufra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is a sentence or statement about topic x₂ (Entity) in language x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jukni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a spider or arachnid or crustacean or crab or non-insect arthropod of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jukpa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) cooks or prepares food x₂ (Entity) by recipe or method x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">julne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a net or filter allowing passage of x₂ (Entity) and prohibiting passage of x₃ (Entity) with netting properties x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jundi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is attentive towards or attends or pays attention to object or affair x₂ (Entity | Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jungo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Chinese culture or nationality or language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">junla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a clock or watch or timer measuring time units x₂ (Entity) to precision x₃ (Entity) with mechanism x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">junri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is serious or earnest about x₂ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">junta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is the weight of object x₂ (Entity) in field x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jurme</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a bacterium or germ or microbe of species or defining property x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jursa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event | State) is severe or harsh to x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jutsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a species or taxon of super-taxon x₂ (Entity) and higher taxon x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">juxre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is clumsy or awkward by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">jvinu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a view or scene or panorama or sight of x₂ (Entity | Location) from viewpoint x₃ (Entity | Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kabri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a cup or glass or tumbler or mug or vessel containing contents x₂ (Entity) and made of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kacma</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a camera recording images of illumination type x₂ (ka, Set&lt;T&gt;) to medium x₃ (ka, Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kadno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Canadian culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kafke</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) coughs or farts or burps up gas x₂ (Entity) from orifice x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kagni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a company or corporation or firm or partnership chartered by authority x₂ (Entity) for purpose x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kajde</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: U, U extends Entity, T extends Entity, V extends Entity. x₁ (Set&lt;T&gt;) warns or cautions person x₂ of danger x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kajna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a shelf or counter or bar attached to supporting object x₂ (Entity) for purpose x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kakne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is able or capable of doing or being x₂ (Event | State) under conditions x₃ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kakpa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) digs material x₂ (Entity) out of source or hole x₃ (Entity) with limbs or tools x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kalci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is feces or excrement or dung of organism x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kalri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an open portal or passage permitting access to x₂ (Entity) by x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kalsa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is chaotic or disordered in property x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kalte</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) hunts or stalks prey x₂ (Entity) for purpose x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kamju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a column or pillar of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kamni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a committee with task or purpose x₂ (Event) of body x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kampu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity, U extends Entity. x₁ (Set&lt;U&gt;) is common or general or universal among set x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kanba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a goat of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kancu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) counts the number in set x₂ (Set&lt;Entity&gt;) to be x₃ (Number) by units x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kandi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is dim or dull or pale or non-intense in property x₂ (Set&lt;T&gt;) as received by observer x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kanji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ calculates or reckons or computes value x₂ (Amount of nonce place) from data x₃ (Entity) by process x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kanla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an eye body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kanro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is healthy or fit or well by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kansa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity) is with or accompanies or is a companion of x₂ in state x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kantu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantum or ray or elementary particle of property or activity x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kanxe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a conjunction stating that x₂ (Proposition) and x₃ (Proposition) are both true</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">karbi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) compares x₂ (Entity) with x₃ (Entity) in property x₄ (Relation&lt;x₂, x₃&gt;) determining comparison state x₅ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">karce</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a car or automobile or truck or van for carrying x₂ (Entity) propelled by x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">karda</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a card nearly two-dimensional shape of material x₂ (Set&lt;T&gt;) with shape x₃ (ka, Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kargu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) is costly or expensive or dear to x₂ by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">karli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a collar or ring or belt or band around x₂ (Entity) made of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">karni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a journal or periodical or magazine or newspaper with content x₂ (Entity) published by x₃ (Entity) for audience x₄ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">katna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) cuts or splits or divides object x₂ into pieces x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kavbu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) captures or catches or apprehends or seizes x₂ (Entity) with trap or restraint x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kecti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) pities or feels sorry for x₂ (Entity) about x₃ (Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kelci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) plays with toy x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kelvo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is x₂ (Number) kelvin in temperature by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kenra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a cancer disease in x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kensa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is outer space near or associated with celestial body or region x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kerfa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is hair or fur body-part of x₂ (Organism) at location x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kerlo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an ear body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ketco</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects South American culture or nationality or geography in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kevna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a cavity or hole or hollow or cavern in x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kicne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) cushions x₂ (Entity) with material x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kijno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of oxygen x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kilto</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^3 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kinli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is sharp or keen at locus x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kisto</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Pakistani or Pashto culture or nationality or language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">klaji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a street or avenue or lane or alley at x₂ (Location) allowing access to x₃ (Entity | Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">klaku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) weeps or cries tears x₂ (Entity) about reason x₃ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">klama</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ goes or comes to destination x₂ (Entity | Location) from origin x₃ (Entity | Location) via route x₄ (Sequence&lt;Location&gt; | Set&lt;Location&gt;) using means or vehicle x₅ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">klani</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is measured by number x₂ (Number) on scale x₃ (Scale&lt;Set&lt;T&gt;&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">klesi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity, U extends Entity. x₁ (Set&lt;T&gt;) is a class or category or subgroup or subset within x₂ (Set&lt;T&gt;) with defining property x₃ (Set&lt;U&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">klina</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is clear or transparent to transmission x₂ (Entity | Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kliru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of halogen of type x₂ (ka, Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kliti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of clay of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">klupe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a screw fastener for purpose x₂ (Event) with threads x₃ (Entity) and frame x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kluza</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is loose or bloused or not tight on x₂ (Entity) at locus x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kobli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of cabbage or lettuce or leafy vegetable of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kojna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a corner or solid angle in or on x₂ (Entity) of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kolme</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of coal or peat or anthracite or bitumen from source x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">komcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a comb shape of material x₂ (Set&lt;T&gt;) with tines or needles x₃ (ka, Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">konju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a cone shape of material x₂ (Set&lt;T&gt;) with vertex x₃ (ka, Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">korbi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an edge or margin or border or curb or boundary of x₂ (Entity) next to x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">korcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is bent or crooked or not straight or twisted or folded</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">korka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of cork or bark from tree x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kosta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a coat or jacket or sweater garment of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kramu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is x₂ (Number) local area units in standard x₃ (Standard) with subunits x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">krasi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location | Event) is a source or start or beginning or origin of x₂ (Entity | Event | Process)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">krati</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) represents or is a proxy or stands in for x₂ (Entity) in matter or function x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">krefu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is the x₃-th recurrence of x₂ (Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">krici</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) believes creed x₂ (Proposition) is true about subject x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">krili</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a quantity of or contains or is made of crystal of composition x₂ (Set&lt;T&gt;) in form or arrangement x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">krinu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event | State) is a reason or justification or explanation for x₂ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">krixa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) cries out or yells or howls sound x₂ (Sound)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kruca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) intersects or crosses or traverses x₂ (Entity) at locus x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kruji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of cream or emulsion or puree of composition x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kruvi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a curve or turn or bend in x₂ (Entity) at locus x₃ (Entity) defined by set of points or properties x₄ (Set&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kubli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a cube or regular polyhedron of dimensions x₂ (Set&lt;T&gt;) with surfaces or sides x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@kucli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is curious about or wonders about or is inquisitive about x₂ (Entity | Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kufra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ feels comfort or is comfortable with conditions or environmental properties x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kukte</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is delicious or tasty or delightful to observer or sense x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kulnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a culture of nation or ethos x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kumfa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a room of or in structure x₂ (Entity) surrounded by partitions or walls or ceiling or floor x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kumte</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a camel or llama or alpaca or vicuna of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kunra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is or contains or is made from a mineral or ore of metal type x₂ (ka, Set&lt;T&gt;) mined from location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kunti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is empty or vacant of material x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kurfa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a right-angled shape defined by vertices x₂ (Set&lt;Entity&gt;) with dimensions x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kurji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) takes care of or looks after or attends to or provides for x₂ (Entity | Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kurki</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is bitter or acrid to observer or sense x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kuspe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) ranges or extends or spans or persists or reaches across range x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">kusru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is cruel or mean or unkind to victim x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">labno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a wolf of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lacpu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) pulls or tugs or draws or drags x₂ (Entity) by handle or at locus x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lacri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) relies or depends or counts on or trusts x₂ (Entity) to bring about or ensure or maintain x₃ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ladru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of milk from source x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lafti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) lifts or applies raising force to x₂ at locus x₃ (Entity) in gravity well x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lakne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is probable or likely under conditions x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lakse</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of wax from source x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lalxu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a lake or lagoon or pool at site or within land mass x₂ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lamji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is adjacent or beside or next to or in contact with x₂ (Entity) in property or sequence x₃ (Entity) in direction x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lanbi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of protein or albumin of type x₂ (ka, Set&lt;T&gt;) composed of amino acids x₃ (Sequence&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lanci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; W, T extends Entity, W extends Entity. x₁ is a flag or banner or standard of or symbolizing x₂ (Entity) with pattern x₃ (ka, Set&lt;T&gt;) on material x₄ (ka, Set&lt;W&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lanka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a basket containing x₂ (Entity) woven from material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lanli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ analyzes or examines in detail x₂ (Entity) by method or technique x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lanme</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a sheep of species x₂ (Taxon | Set&lt;T&gt;) of flock x₃ (Group&lt;Organism&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lante</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a can/sealed container for perishable contents x₂ (Entity) made of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lanxe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity. x₁ (Group&lt;T&gt;) is in balance or equilibrium under forces x₂ (Group&lt;Set&lt;Group&lt;T&gt;&gt;&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lanzu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Group&lt;Entity&gt;) is a family with members including x₂ (Entity) bonded by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">larcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Process) is an art creative application of craft or skill x₂ (Event | Idea)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lasna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) fastens or connects or attaches or binds or lashes x₂ (Entity) to x₃ (Entity) with fastener x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lastu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of brass of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">latmo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Latin or Roman or Romance culture or language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">latna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a lotus plant or flower of species x₂ (Taxon | Set&lt;T&gt;) symbolizing x₃ (Entity) to culture or religion x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lazni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is lazy or avoids work concerning action x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lebna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ takes or gets or gains or obtains or seizes x₂ (Set&lt;T&gt;) from possessor x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lenjo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a lens focussing rays x₂ (Entity) to focus x₃ (Entity) by means or material x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lenku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is cold or cool by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lerci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is late by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lerfu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T: Symbol | Text. x₁ (T) is a letter or digit or symbol in alphabet or character set x₂ (Set&lt;T&gt;) representing x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">libjo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Libyan culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lidne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) precedes or leads x₂ (Entity) in sequence x₃ (Sequence&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lifri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ undergoes or experiences event x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lijda</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a religion of believers including x₂ (Group&lt;Entity&gt;) sharing beliefs x₃ (Proposition)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">limna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) swims in fluid x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lindi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is lightning or electrical arc or thunderbolt striking at x₂ (Entity) from x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">linji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a line one-dimensional shape defined by points x₂ (Set&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">linsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a length of chain of material x₂ (Set&lt;T&gt;) with link properties x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">linto</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is lightweight in mass or weight by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lisri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is a story or tale or narrative about subject or moral x₂ (Entity) by storyteller x₃ (Entity) to audience x₄ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">liste</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: L, L extends Entity, T extends Entity, U extends Entity. x₁ is a list or catalog or register of sequence or set x₂ (Sequence&lt;T&gt; | Set&lt;T&gt;) in order x₃ (Relation&lt;NonMatchingPair&lt;T&gt;&gt;) in medium x₄ (Set&lt;U&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">litce</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is x₂ (Number) liters in volume by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">litki</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is liquid of composition including x₂ (Set&lt;T&gt;) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">litru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ travels or journeys or goes via route x₂ (Sequence&lt;Location&gt; | Set&lt;Location&gt;) using means or vehicle x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">livga</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a liver body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">livla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a fuel or energy source for powering x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">logji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a logic for reasoning about x₂ (Proposition)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lojbo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Lojbanic language or culture or community in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">loldi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a floor or bottom or ground of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lorxu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a fox of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lubno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Lebanese culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lujvo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is a compound predicate word with meaning x₂ (Entity) and arguments x₃ (Sequence&lt;Entity&gt;) built from metaphor x₄ (GrammarStructure | Text)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lumci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) washes or cleanses x₂ (Entity) of contaminant x₃ (Entity) with cleaning material x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lunbe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is bare or naked or nude</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lunra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a major natural satellite or moon of planet x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">lunsa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) condenses or liquefies on or into x₂ (Entity) at temperature x₃ (Number) and pressure x₄ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mabla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is execrable or shitty or awful or rotten or inferior in property x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mabru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a mammal of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">macnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Event | Process. x₁ is manual not automatic in function x₂ (Set&lt;T&gt;) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">makcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is mature or ripe or fully grown or adult in development quality x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">makfa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is magic or supernatural or sorcery or witchcraft to x₂ (Entity) performed by person or force or deity x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">maksi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is magnetic producing magnetic field x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">malsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a temple or church or sanctuary or shrine of religion x₂ (Entity) at location or serving area x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mamta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a mother of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">manci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) feels wonder or awe or marvels about x₂ (Entity | Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">manfo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity | Event. x₁ is uniform or homogeneous in property x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">manku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is dark or lacking in illumination</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">manri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity | Idea. x₁ is a frame of reference or standard for observing or measuring or determining x₂ (Entity) with rules x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mansa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity | Event) satisfies evaluator x₂ (Entity) in property or state x₃ (Relation&lt;x₁, x_2&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">manti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is an ant of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mapku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a cap or hat or crown or helmet or headgear of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mapni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of cotton material</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mapti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) fits or matches or suits or is compatible with x₂ (Entity) in property x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">marbi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity | Location) is a shelter or haven or refuge or retreat or harbor for protecting x₂ from danger x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">marce</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a vehicle or mode of transport carrying x₂ (Entity) in or on surface or medium x₃ (Entity) propelled by x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">marde</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) are ethics or morals or moral standards of x₂ about situation x₃ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">margu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of mercury x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">marji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is material or stuff or matter of composition including x₂ (Set&lt;T&gt;) in shape x₃ (ka, Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">marna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of hemp or marijuana or jute of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">marxa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) mashes or crushes or squashes or smashes x₂ into mass x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">masno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is slow or sluggish at doing or being or bringing about x₂ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">masti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is x₂ (Number) months in duration by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">matci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a mat or pad or mattress or pallet of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">matli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of linen or flax material</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">matne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains butter or margarine or shortening from source x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">matra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a motor or engine driving or propelling or providing power to x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mavji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of oats grain of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">maxri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of wheat grain of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mebri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a brow or forehead body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">megdo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^6 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mekso</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Text. x₁ is a mathematical expression interpreted under rules x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">melbi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is beautiful or pleasant to x₂ (Entity) in aspect x₃ (Set&lt;T&gt;) by aesthetic standard x₄ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">meljo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Malaysian or Malay culture or nationality or language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">menli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a mind or intellect or psyche of body x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mensi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a sister of x₂ (Entity) by bond x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mentu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is x₂ (Number) minutes in duration by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">merko</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects USA or American culture or nationality or dialect in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">merli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) measures quantity x₂ (Entity) as x₃ (Number) units on scale x₄ (Relation &lt;x_2, x_3 | x_5&gt;) with accuracy x₅ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mexno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Mexican culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">midju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is in the middle or center or midpoint of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mifra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is encoded or cipher text of plain text x₂ (Text) by code x₃ (Relation&lt;x1, x2&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mikce</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity) treats or doctors or nurses x₂ for ailment x₃ (Set&lt;T&gt;) by treatment x₄ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mikri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^-6 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">milti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^-3 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">milxe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is mild or gentle or non-extreme in property x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">minde</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) issues commands or orders to x₂ (Entity) for result x₃ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">minji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a machine for function x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">minli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is x₂ (Number) long local distance units in dimension x₃ (Set&lt;T&gt;) with subunits x₄ (Entity) by standard x₅ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">minra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) reflects or mirrors or echoes x₂ (Entity) to observer x₃ (Entity) as x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mintu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is the same or identical thing as x₂ (Entity) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mipri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ keeps x₂ (Entity) secret or hidden from x₃ (Entity) by method x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mirli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a deer or elk or moose of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">misno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity | Event) is famous or renowned among community x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">misro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Egyptian culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mitre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is x₂ (Number) meters in dimension x₃ (Set&lt;T&gt;) by standard x₄ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mixre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Group&lt;Entity&gt;) is a mixture or blend including ingredients x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mlana</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is to the side of x₂ (Entity) and facing x₃ (Entity) from viewpoint x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mlatu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a cat of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mleca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity, U extends Entity. x₁ (T) is less than x₂ (T) in property or quantity x₃ (Set&lt;U&gt;) by amount x₄ (Amount of x₃)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mledi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a mold or fungus of species x₂ (Taxon | Set&lt;T&gt;) growing on x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mluni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a satellite or moon orbiting x₂ (Entity) with characteristics x₃ (Entity) and orbital parameters x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mokca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a point or instant or moment at time or place x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">moklu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a mouth or oral cavity body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">molki</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity | Location) is a mill or industrial plant performing process x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">molro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is x₂ (Number) moles in substance by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">morji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) remembers fact x₂ (Proposition) about subject x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">morko</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Moroccan culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">morna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a pattern of forms or events x₂ (Group&lt;Entity&gt;) arranged according to structure x₃ (Entity | Idea)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">morsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is dead or has ceased to be alive</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mosra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is friction opposing motion due to rubbing of x₂ (Entity) against x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mraji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of rye grain of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mrilu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) mails or posts x₂ (Entity) to recipient address x₃ (Entity) from sender address x₄ (Entity) by mail system x₅ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mruli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: Entity, T extends Entity, V extends Entity. x₁ is a hammer tool for doing x₂ (Set&lt;T&gt;) with head x₃ (Entity) propelled by x₄ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mucti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is immaterial or not physical or without material form</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mudri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or is made of or contains wood from tree type x₂ (ka, Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mukti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₃: T, T extends Entity. x₁ (Event | State) is a motive or incentive for property x₂ (Set&lt;T&gt;) of agent x₃</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mulno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Event. x₁ is complete or finished or x₁ (Entity) is whole in property x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">munje</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a universe or cosmos of domain x₂ (Entity) defined by rules x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mupli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">U extends Entity, T extends U. x₁ (T) is an example or sample or specimen or instance of common property x₂ (Set&lt;U&gt;) and is from set x₃ (Set&lt;U&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">murse</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is the twilight or dawn or dusk or half-light of day x₂ (TimeInterval) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">murta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a curtain or blinds or drapes for covering or obscuring aperture x₂ (Entity) made of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">muslo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ pertains to Islamic or Moslem or Quranic culture or religion or nation in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mamta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a mother of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">mutce</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity, U extends Entity. x₁ is extreme or very much in property x₂ (Set&lt;U&gt;) towards extreme direction x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">muvdu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) moves to destination x₂ (Entity | Location) from origin x₃ (Entity | Location) over path x₄ (Sequence&lt;Location&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">muzga</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a museum for preserving x₂ (Entity) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nabmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event | State) is a problem to x₂ (Entity) in situation or task or inquiry x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nakni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Organism, V extends Entity. x₁ is a male of species x₂ (Taxon | Set&lt;T&gt;) evidencing masculine traits x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nalci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a wing body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">namcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Number) is a number or quantifier or digit or value</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nanba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains bread made from grains x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nanca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is x₂ (Number) years in duration by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nandu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) is difficult or hard or challenging for x₂ under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nanla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a boy young male person of age x₂ (TimeInterval) immature by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nanmu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a man male humanoid person</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nanvi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^-9 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">narge</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a nut hard-shelled fruit from plant x₂ (Entity) with shell x₃ (Entity) and kernel x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">narju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is orange in color</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">natfe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Proposition, U extends Entity. x₁ contradicts or denies or refutes or negates x₂ (Proposition) under rules or logic x₃ (Set&lt;U&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">natmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Group&lt;Entity&gt;) is a nation or ethnic group of peoples x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">navni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of noble gas of type x₂ (ka, Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">naxle</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a canal or channel to x₂ (Location) from x₃ (Location) with route x₄ (Sequence&lt;Location&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nazbi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a nose body-part of x₂ (Organism) with nasal passages x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nejni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is energy of type x₂ (ka, Set&lt;T&gt;) in form x₃ (ka, Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nelci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is fond of or likes x₂ (Entity | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nenri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is inside or within x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nibli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Event | State, U extends Entity. x₁ logically necessitates or entails or implies x₂ (Event | State) under rules or logic system x₃ (Set&lt;U&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nicte</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is nighttime of day x₂ (TimeInterval) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nikle</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of nickel</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nilce</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) furnishes location x₂ (Location) serving purpose x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nimre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of citrus fruit or tree of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ninmu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a woman female humanoid person</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nirna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a nerve or neuron body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nitcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) needs or requires necessity x₂ (Event) for purpose or action or stage of process x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nivji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) knits cloth or object x₂ (Entity) from yarn x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nixli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a girl young female person of age x₂ (TimeInterval) immature by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nobli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is noble or aristocratic or elite in culture or society x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">notci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a message or notice or memorandum about subject x₂ (Entity) from author x₃ (Entity) to intended audience x₄ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nukni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is magenta or purplish-red in color</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nupre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) promises or commits or assures or threatens event or state x₂ (Event | State) to beneficiary or victim x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nurma</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a rural or rustic or pastoral area of x₂ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nutli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is neutral or medial or not taking sides on scale or in dissension x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">nuzba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Proposition) is news or new information about subject x₂ (Entity) from source x₃ (Entity) to observer x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pacna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) hopes or wishes or desires event x₂ (Event) with expected likelihood x₃ (Number between 0 and 1)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pagbu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a part or component or piece or portion of whole or mass x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pagre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) passes through or penetrates barrier or medium or portal x₂ (Entity) to destination side x₃ (Entity) from origin side x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pajni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) judges or referees or arbitrates matter x₂ (Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">palci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is evil or depraved or wicked by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">palku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is pants or trousers or slacks garment of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">palne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a tray or platter flat container for contents x₂ (Entity) made of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">palta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a plate or dish or platter or saucer of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pambe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a pump or injector pumping fluid x₂ (Entity) to x₃ (Entity) from x₄ (Entity) by means x₅ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">panci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an odor or fragrance or scent emitted by x₂ (Entity) detected by x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pandi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) punctuates expression x₂ (Text | Symbol) with symbol or word x₃ (Symbol | Text) with effect x₄ (Relation&lt;x2, x3&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">panje</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of sponge or porous material</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">panka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a park or land reserve managed by x₂ (Entity) for purpose x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">panlo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a slice thin flat portion of mass x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">panpi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is at peace with x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">panra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) parallels x₂ (Entity) differing only in property x₃ (Relation&lt;x₁, x₂&gt;) by standard or geometry x₄ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pante</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ protests or objects to or complains about event or state x₂ (Event | State) to audience x₃ (Group&lt;Entity&gt;) with action x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">panzi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Organism) is a biological offspring or child of parent(s) x₂ (Group&lt;Organism&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">papri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a physical page of book or document x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">parbi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a ratio or rate of quantity x₂ (Entity) with respect to quantity x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pastu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a robe or tunic or gown or cloak or dress garment of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">patfu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a father of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">patlu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a potato edible tuber of variety x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">patxu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a pot or kettle or urn or tub or sink deep container for contents x₂ (Entity) of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pelji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is paper from source x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pelxu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is yellow or golden in color</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pemci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is a poem or verse about subject x₂ (Entity) by author x₃ (Entity) for audience x₄ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">penbi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a pen using ink x₂ (Entity) applied by process x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pencu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) touches x₂ (Entity) with x₃ (Entity) at locus x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pendo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a friend of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">penmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) meets or encounters x₂ (Entity) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pensi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) thinks or considers or reasons about subject x₂ (Entity | Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">perli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a pear of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pesxu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is paste or pulp or dough or mud or slurry of composition x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">petso</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^15 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pezli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a leaf of plant x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">picti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^-12 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pijne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a pin or peg tool for fastening to or piercing x₂ (Entity) made of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pikci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity) begs or pleads or supplicates x₂ for x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pikta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a ticket entitling x₂ (Entity) to privilege x₃ (Event | State) under conditions x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pilji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Number) is the product of factor x₂ (Number) multiplied by factor x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pilka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a crust or rind or peel or skin outer cover of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pilno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) uses or employs tool or apparatus or agent x₂ (Entity) for purpose x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pimlu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a feather or plumage body-part of animal x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pinca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is urine of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pindi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is poor or indigent in goods or possessions x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pinfu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a prisoner or captive of x₂ (Entity) restrained by means or force x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pinji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a clitoris or penis reproductive organ body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pinka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is a comment or remark or observation about subject x₂ (Entity) expressed by x₃ (Entity) to audience x₄ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pinsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a pencil or crayon or stylus applying marking material x₂ (Entity) with frame x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pinta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is flat or level or horizontal in gravity or frame x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pinxe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) drinks beverage x₂ (Entity) from container x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pipno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a piano or harpsichord or synthesizer or organ keyboard musical instrument</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pixra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a picture or illustration representing x₂ (Entity) made by artist x₃ (Entity) in medium x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">plana</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is plump or fat or obese by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">platu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) plans or designs or plots plan x₂ (Entity) for state or process x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pleji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity, x₃: U, U extends Entity, V extends Entity, W extends Entity. x₁ pays or compensates payment x₂ (Set&lt;V&gt;) to recipient x₃ for goods or services x₄ (Set&lt;W&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">plibu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a pubic area or external genitalia body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">plini</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a planet revolving around x₂ (Entity) with characteristics x₃ (Entity) and orbital parameters x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">plipe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ leaps or jumps to x₂ (Entity | Location) from x₃ (Entity | Location) reaching height or route x₄ (Entity) propelled by x₅ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">plise</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is an apple fruit of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">plita</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a plane two-dimensional shape defined by points x₂ (Set&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">plixa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ plows or furrows or tills x₂ (Entity) with tool x₃ (Entity) propelled by x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pluja</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is complex or complicated or involved in aspect x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pluka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event | State) seems pleasant to or pleases x₂ (Entity) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pluta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a route or path or way or course or track to x₂ (Entity | Location) from x₃ (Entity | Location) via points x₄ (Set&lt;Location | Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">polje</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) folds or creases x₂ at locus forming bend x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">polno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Polynesian or Oceanian culture or nationality or languages in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ponjo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Japanese culture or nationality or language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ponse</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) possesses or owns x₂ (Entity) under law or custom x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">porpi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) breaks or fractures or shatters into pieces x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">porsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity. x₁ (Sequence&lt;T&gt;) is an ordered set sequenced by rules x₂ (Relation&lt;NonMatchingPair&lt;T&gt;&gt;) on unordered set x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">porto</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Portuguese culture or nationality or language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">prali</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: U, U extends Entity, T extends Entity, V extends Entity. x₁ (Set&lt;T&gt;) is a profit or gain or benefit or advantage to x₂ resulting from activity or process x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">prami</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) loves or feels strong affection towards x₂ (Entity | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">prane</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is perfect or ideal or faultless in property x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">preja</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ spreads or expands over x₂ (Entity) from initial state x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">prenu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a person or displays personality</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">preti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is a question or query about subject x₂ (Entity) by questioner x₃ (Entity) to audience x₄ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">prije</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is wise about matter x₂ (Abstraction) to observer x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">prina</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a print or impression or image on surface x₂ (Entity) made by tool or press x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pritu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is to the right of x₂ (Entity) which faces orientation x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">prosa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is prose about subject x₂ (Entity) by author x₃ (Entity) for audience x₄ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pruce</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity | Event) is a process with inputs x₂ (Group&lt;Entity&gt;) and outputs x₃ (Group&lt;Entity&gt;) via stages x₄ (Sequence&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pruni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is elastic or springy</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pruxi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is spiritual or pertains to the soul in nature</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pulce</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is dust or precipitate of material x₂ (Set&lt;T&gt;) in medium or on surface x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pulji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a police officer enforcing laws or rules x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">pulni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a pulley tool for performing action x₂ (Set&lt;T&gt;) rotating on axle x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">punji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) puts or places or sets x₂ (Entity) on or at locus x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">punli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a swelling or protrusion or convexity at or on x₂ (Entity) of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">purci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) is earlier than or in the past of x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">purdi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a garden or cultivated field of x₂ (Group&lt;Entity&gt;) growing plants or crops x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">purmo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a powder of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">racli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ (Set&lt;T&gt;) is sane or rational by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ractu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a rabbit or hare of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">radno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is x₂ (Number) radians in angular measure by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rafsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Text. x₁ is an affix or suffix or prefix for word or concept x₂ (Text) with form x₃ (ka, Set&lt;T&gt;) in language x₄ (Language)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ragve</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is across or on the other side of boundary x₂ (Entity) from x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rakso</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Iraqi culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">raktu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Event | Situation. x₁ troubles or disturbs person x₂ (Entity) causing problems x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ralci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is delicate or fragile or refined in property x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ralju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is principal or chief or main among set x₂ (Set&lt;Entity&gt;) in property x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ralte</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) retains or keeps or holds x₂ (Entity) in its possession</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">randa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ yields or gives way or surrenders to x₂ (Set&lt;T&gt;) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rango</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a body organ body-part of body or species x₂ (Entity) performing function x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ranji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: U, U extends TimeInterval, T extends Entity. x₁ (Set&lt;T&gt;) continues or persists over interval x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ranmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is a myth or legend about x₂ (Entity) in mythos x₃ (Entity) of culture x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ransu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of bronze of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ranti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is soft or malleable or yielding to force x₂ (Set&lt;T&gt;) in conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ranxi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is ironic or contrary to expectation x₂ (Entity) in state or property x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rapli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) repeats for total occurrences x₂ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rarna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is natural or spontaneous or instinctive not consciously caused by persons</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ratcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a rat of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ratni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an atom of element x₂ (Group&lt;Entity&gt;) of isotope number or atomic weight x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rebla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a tail or appendix body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rectu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains meat or flesh from source x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">remna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a human being</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">renro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) throws or launches or casts or hurls x₂ (Entity) to or at direction x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">renvi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ survives or endures or abides through x₂ (Set&lt;T&gt;) for duration x₃ (TimeInterval)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">respa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a reptile of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ricfu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is rich or wealthy in goods or possessions x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rigni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity | Event) is repugnant or causes disgust to x₂ (Entity) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rijno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of silver including x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@rilti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: S, S extends Sequence&lt;Sound | Text | Symbol&gt;, T extends Entity. x₁ is a rhythm or beat of music or expressive form x₂ (ka, Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rimni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text | Symbol) rhymes or alliterates with x₂ (Text | Symbol) in language or phonetics x₃ (Language | Entity) with correspondence x₄ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rinci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ liquid drains or strains or flushes from source x₂ (Entity) through drain x₃ (Entity) by force x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rinju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is restrained or held or constrained by restraint x₂ (Entity) against event x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rinka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event | State) physically causes effect x₂ (Event | State) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rinsa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) greets or hails or welcomes x₂ (Entity) in manner x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rirci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">U extends Entity, T extends U. x₁ (T) is rare or uncommon in property x₂ (Set&lt;U&gt;) among set x₃ (Set&lt;U&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rirni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a parent of or raises or rears x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rirxe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a river of land mass x₂ (Entity) draining watershed x₃ (Entity) into x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rismi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of rice grain of strain x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">risna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a heart body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ritli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Event. x₁ is a rite or ceremony or ritual for purpose x₂ (Event) in community x₃ (Group&lt;Entity&gt;) with form or rules x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rivbi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ avoids or evades or escapes fate x₂ (Event) through action or state x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rokci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of rock or stone of composition x₂ (Set&lt;T&gt;) from location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">romge</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a polished reflective metallic surface of metal x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ropno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects European culture or nationality or geography or Indo-European languages in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rorci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) engenders or procreates or begets x₂ (Entity) with coparent x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rotsu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is thick in dimension x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rozgu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a rose flower of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">ruble</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is weak or feeble or frail in property x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rufsu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is rough or coarse or uneven in texture</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">runme</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) melts at temperature x₂ (Number) and pressure x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">runta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) dissolves in solvent x₂ (Entity) forming solution x₃ (Entity) under conditions x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rupnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is measured in major money units as quantity x₂ (Number) in monetary system x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rusko</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Russian culture or nationality or language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">rutni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an artifact made or caused by people of culture x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sabji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) provides or supplies x₂ (Entity) to recipient x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sabnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a cabin of vehicle x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sacki</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a match incendiary device made of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">saclu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Number) is the decimal or binary equivalent of fractional expression x₂ (Number) in base x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sadjo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Saudi Arabian culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sakci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) sucks fluid or gas x₂ (Entity) relative to high pressure x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sakli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) slides or slips or glides on surface x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sakta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of sugar from source x₂ (Entity) of composition x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">salci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ celebrates or honors x₂ (Entity | Event) with activity x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">salpo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is sloped or inclined with angle x₂ (Entity) to frame x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">salta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Group&lt;Entity&gt;) is a quantity of salad food with ingredients including x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">samcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of cassava or taro or yam edible starchy root of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sampu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is simple or unmixed or uncomplicated in property x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sance</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Sound) is sound produced by x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sanga</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) sings or chants song x₂ (Sound | Text | Symbol) to audience x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sanji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is conscious or aware of x₂ (Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sanli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) stands on surface x₂ (Entity) supported by limbs or support x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sanmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Group&lt;Entity&gt;) is a meal composed of dishes including x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sanso</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a sauce or topping or gravy for use with x₂ (Entity) containing ingredients including x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">santa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is an umbrella or parasol shielding x₂ (Entity) from x₃ (Entity) made of material x₄ (Set&lt;T&gt;) supported by x₅ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sarcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Abstraction) is necessary or required for state or process x₂ (Event | State) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sarji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity, x₂: U, U extends Entity, V extends Entity, W extends Entity. x₁ supports or holds up or helps x₂ against force or opposition x₃ (Set&lt;V&gt;) by means x₄ (Set&lt;W&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sarlu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a spiral or helix or whorl shape with limits x₂ (Entity) and dimensionality x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sarxe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is harmonious or in agreement with x₂ (Entity) in property x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">saske</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Group&lt;Entity&gt;) is a science or body of knowledge about subject matter x₂ (Entity) based on methodology x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">satci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is exact or precise to precision x₂ (Entit) in property or quantity x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">satre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) strokes or rubs or pets x₂ (Entity) with x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">savru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Sound. x₁ is a noise to x₂ (Entity) via sensory channel x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sazri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) operates or drives or runs apparatus x₂ (Entity) with goal x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sefta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a surface or face of higher-dimensional object x₂ (Entity) on side x₃ (Entity) with edges x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">selci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a cell or basic subunit of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">selfu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) serves x₂ (Entity) with service x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">semto</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Semitic language or culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">senci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) sneezes</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">senpi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) doubts that x₂ (Proposition) is true</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">senta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a layer or stratum of material x₂ (Set&lt;T&gt;) within structure x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">senva</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) dreams about x₂ (Proposition | Idea)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sepli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is apart or separate from x₂ (Entity) separated by x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">serti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is stairs or stairway or steps for climbing structure x₂ (Entity) with steps x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">setca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) inserts or interposes or puts x₂ (Entity) into interior x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sevzi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a self or ego or identity-image of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sfani</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a fly of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sfasa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) punishes x₂ (Entity) for infraction x₃ (Event | State) with punishment x₄ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sfofa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a sofa or couch</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sfubu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) dives or swoops to x₂ (Entity | Location) from x₃ (Entity | Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">siclu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) whistles sound x₂ (Sound)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sicni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a coin or token issued by x₂ (Entity) having value x₃ (Set&lt;T&gt;) of composition including x₄ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sidbo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Idea) is an idea or concept or thought about x₂ (Entity | Abstraction) by thinker x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sidju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity) helps or assists or aids x₂ to do event or activity x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sigja</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a cigar or cigarette made from tobacco or smokable substance x₂ (Entity) by x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">silka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of silk produced by x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">silna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of salt from source x₂ (Entity) of composition including x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">simlu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ seems or appears to have properties x₂ (Set&lt;T&gt;) to observer x₃ (Entity) under conditions x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">simsa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity, U extends Entity. x₁ (T) is similar or parallel to x₂ (T) in property or quantity x₃ (Set&lt;U&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">simxu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity. x₁ (Set&lt;T&gt;) has members who mutually do x₂ (Relation&lt;NonMatchingPair&lt;T&gt;&gt;) to each other</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">since</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a snake or serpent of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sinma</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) esteems or respects or venerates x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sinso</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Number) is the trigonometric sine of angle x₂ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sinxa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Symbol) is a sign or symbol or signal representing x₂ (Entity | Abstraction) to observer x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sipna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is asleep</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sirji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is straight or a direct line segment between x₂ (Entity) and x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sirxo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Syrian culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sisku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ (Entity) seeks or searches for property x₂ (Set&lt;T&gt;) among set x₃ (Set&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sisti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) ceases or stops or halts activity or process or state x₂ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sitna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) cites or quotes or refers to source x₂ (Entity) for information x₃ (Proposition)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sivni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is private or personal to x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@skaci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a skirt or kilt or dress of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">skami</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a computer for purpose x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">skapi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a pelt or skin or hide or leather from x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">skari</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is or appears to be of color x₂ (Entity) as perceived by x₃ (Entity) under conditions x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@skicu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: U, U extends Entity | Event | State, T extends Entity. x₁ (Entity) tells about or describes object or event or state x₂ to audience x₃ (Group&lt;Entity&gt;) with description x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">skiji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a ski or skid or skate for surface x₂ (Entity) supporting x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@skina</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a cinema or movie or film about x₂ (Entity) by filmmaker x₃ (Entity) for audience x₄ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@skori</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is cord or cable or rope of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">skoto</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Gaelic or Scottish culture or nationality or language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">skuro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a groove or trench or furrow in object or surface x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">slabu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is old or familiar or well-known to observer x₂ (Entity) in feature x₃ (Set&lt;T&gt;) by standard x₄ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">slaka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (GrammarStructure | Text) is a syllable in language x₂ (Language)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@slami</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of acid of composition x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@slanu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a cylinder shape of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">slari</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is sour or tart to observer x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@slasi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of plastic of type x₂ (ka, Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@sligu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is solid of composition including x₂ (Set&lt;T&gt;) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@slilu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) oscillates at frequency x₂ (Number | Entity) through states x₃ (Sequence&lt;Entity&gt; | Set&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sliri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of sulfur x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">slovo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Slavic language or culture or ethos in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sluji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a muscle body-part controlling x₂ (Entity) of body x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sluni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains onions of type x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">smacu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a mouse of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">smadi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) guesses or conjectures that x₂ (Proposition) is true about subject x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">smaji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is quiet or silent at observation point x₂ (Entity) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">smani</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a monkey or ape of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">smoka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a sock or stocking garment of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">smuci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a spoon or scoop tool for use x₂ (Set&lt;T&gt;) made of material x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">smuni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a meaning or interpretation of x₂ (Entity | Text | Symbol) recognized by x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">snada</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ succeeds in or achieves or completes x₂ (Set&lt;T&gt;) as result of effort x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">snanu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is to the south of x₂ (Entity) according to frame x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">snidu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is x₂ (Number) seconds in duration by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">snime</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains snow</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">snipa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) adheres or sticks to x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">snuji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a sandwich or layering of x₂ (Entity) sandwiched between x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">snura</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is secure or safe from threat x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">snuti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event | State) is an accident or unintentional event on the part of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sobde</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of soya grain of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@sodna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of alkali metal of type x₂ (ka, Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sodva</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of carbonated beverage of flavor or brand x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">softo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Soviet or CIS culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@solji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of gold of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">solri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is the sun of home planet x₂ (Entity) of race x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sombo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) sows or plants crop x₂ (Entity) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sonci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a soldier or warrior of army x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@sorcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a store or deposit or supply of materials or energy x₂ (Entity | Group&lt;Entity&gt;) in containment x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sorgu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of sorghum of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sovda</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an egg or gamete of organism x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">spaji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) surprises or startles x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">spali</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) polishes object or surface x₂ (Entity) with polish x₃ (Entity) using tool x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">spano</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Spanish-speaking culture or nationality or language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">spati</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a plant of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">speni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is married to x₂ (Entity) under system x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">spisa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a piece or portion or lump or chunk or particle of substance x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">spita</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Location) is a hospital treating patient x₂ for condition x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">spofu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is broken or inoperable for function x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@spoja</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) bursts or explodes into pieces or energy or fragments x₂ (Entity | Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">spuda</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ replies or responds to stimulus x₂ (Entity | Event) with response x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sputu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) spits or expectorates x₂ (Entity) from x₃ (Entity) to x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sraji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is vertical or upright or erect in reference frame or gravity x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sraku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) scratches or carves or erodes or cuts into x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sralo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Australian culture or nationality or geography or dialect in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">srana</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) pertains to or is relevant to or concerns x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">srasu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a blade or expanse of grass of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">srera</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) errs in doing event x₂ (Event) under conditions x₃ (Event) by standard x₄ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">srito</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Sanskrit language or culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sruma</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) assumes or supposes that x₂ (Proposition) is true about subject x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sruri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) encircles or encloses or surrounds x₂ (Entity) in direction or dimension or plane x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stace</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is honest or truthfully revealing to x₂ (Entity) about matter x₃ (Proposition)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stagi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an edible portion x₂ (Entity) of plant x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@staku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a quantity of or contains or is made of ceramic made by x₂ (Entity) of composition x₃ (Set&lt;T&gt;) in form x₄ (ka, Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stali</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) remains or stays or abides with x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stani</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a stalk or stem or trunk body-part of plant x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stapa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) steps or treads on surface x₂ (Entity) using limbs x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stasu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Group&lt;Entity&gt;) is a quantity of soup or stew with ingredients including x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@stati</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ has a talent or aptitude for doing or being x₂ ((Set&lt;T&gt;) | Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">steba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) feels frustration about x₂ (Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">steci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) is specific or particular or defining property of x₂ among set x₃ (Set&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stedu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a head body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stela</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a lock or seal of or for sealing x₂ (Entity) with mechanism x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stero</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is x₂ (Number) steradians in solid angle by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stici</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is to the west of x₂ (Entity) according to frame x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@stidi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) suggests or proposes idea or action x₂ (Entity | Event) to audience x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stika</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Event. x₁ adjusts or regulates or changes property or amount x₂ (Set&lt;T&gt;) in degree x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stizu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a chair or stool or seat or bench</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stodi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is constant or unchanging in property x₂ (Set&lt;T&gt;) in response to conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">stuna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is to the east of x₂ (Entity) according to frame x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@stura</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a structure or arrangement or organization of x₂ (Entity | Set&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@stuzi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is an inherent site or place or position or location of x₂ (Entity | Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@sucta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: I, I extends Idea, T extends Entity. x₁ is abstracted or generalized from x₂ (Entity) by rules x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sudga</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is dry of liquid x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sufti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a hoof body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">suksa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Event | State, V extends Entity. x₁ is sudden or sharply changes at point x₂ (Set&lt;T&gt;) in process x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sumji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Number) is the sum of x₂ (Number) and x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sumne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) smells x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sumti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is an argument of predicate or function x₂ (Relation&lt;Entity[]&gt;) filling place x₃ (Number | Symbol)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sunga</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of garlic of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sunla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or made from or consists of wool from animal x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@surla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ relaxes or rests by doing x₂ ((Set&lt;T&gt;) | Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">sutra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is fast or swift or quick at doing or bringing about x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@tabno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of carbon of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tabra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a horn or trumpet or trombone or bugle musical instrument</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tadji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Process) is a method or technique or approach for doing x₂ (Event) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tadni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) studies subject x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tagji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is snug or tight on x₂ (Entity) in dimension x₃ (Entity) at locus x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">talsa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity) challenges x₂ at property x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tamca</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a tomato fruit or plant of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tamji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a thumb or big toe body-part on limb x₂ (Entity) of x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tamne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a cousin to x₂ (Entity) by bond x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@tanbo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a board or plank shape of material x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tance</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a tongue body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tanjo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Number) is the trigonometric tangent of angle x₂ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tanko</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of tobacco leaf of species x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tanru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is a binary metaphor formed with x₂ (Sequence&lt;GrammarStructure | Text&gt;) modifying x₃ (GrammarStructure | Text) giving meaning x₄ (Entity) in usage x₅ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tansi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a pan or basin or tub or sink shallow container for contents x₂ (Entity) of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@tanxe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a box or carton or trunk or crate for contents x₂ (Entity) of material x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@tapla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a tile or cake shape of material x₂ (Set&lt;T&gt;) with shape x₃ (ka, Set&lt;V&gt;) and thickness x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tarbi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an embryo or zygote or fetus or fertilized egg with mother x₂ (Entity) and father x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tarci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a star or sun with stellar properties x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tarla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of tar or asphalt from source x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@tarmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity | Idea) is the conceptual shape or form of object or abstraction x₂ (Entity | Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@tarti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ behaves as manner x₂ ((Set&lt;T&gt;) | Event) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">taske</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) thirsts for x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tatpi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is tired or fatigued by effort x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tatru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a breast or mammary or teat body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tavla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) talks or speaks to x₂ (Entity) about subject x₃ (Entity) in language x₄ (Language)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">taxfu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a garment or clothing for wearing by x₂ (Entity) serving purpose x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tcaci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a custom or habit of x₂ (Entity) under conditions x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tcadu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a town or city of metropolitan area x₂ (Location) in political unit x₃ (Entity) serving region x₄ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tcana</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a station or node of system x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tcati</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of tea brewed from leaves x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tcena</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) stretches or extends to range x₂ (Entity) in dimension x₃ (Entity) from relaxed range x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tcica</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: U, U extends Entity, T extends Entity, V extends Entity. x₁ (Set&lt;T&gt;) misleads or deceives x₂ into x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tcidu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) reads text x₂ (Text | Symbol) from surface x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tcika</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is the time of state or event x₂ (Event) on day x₃ (TimeInterval) at location x₄ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tcila</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a detail or feature of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tcima</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is weather at place x₂ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tcini</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Event. x₁ (Set&lt;T&gt;) is a situation or condition or circumstance of x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tcita</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity) is a label or tag of x₂ showing information x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">temci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is the time-duration or interval or period from time or event x₂ (Event) to time or event x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tenfa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Number) is the exponential result of base x₂ (Number) to power or exponent x₃ (Number)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tengu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) is a texture of x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@terdi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Location. x₁ is the Earth or home planet of race x₂ (Taxon | Group&lt;Organism&gt; | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">terpa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) fears x₂ (Event); x₂ is fearsome or frightening to x₁</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">terto</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a trillion [10^12] in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@tigni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ performs performance x₂ (Set&lt;T&gt;) for or before audience x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tikpa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) kicks or hits with x₁&#039;s foot or feet x₄ (Entity) object or target x₂ (Entity) at locus x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tilju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is heavy or weighty in mass or weight by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tinbe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) obeys or follows command or rule x₂ (Entity) made by x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@tinci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of tin of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tinsa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is stiff or rigid or inflexible or resistant in direction x₂ (Entity) against force x₃ (Set&lt;T&gt;) under conditions x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tirna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) hears sound x₂ (Sound | Entity) against background or noise x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@tirse</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of iron of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tirxu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Organism, V extends Entity. x₁ is a tiger or leopard or jaguar or tigress of species or breed x₂ (Taxon | Set&lt;T&gt;) with coat markings x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tisna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) fills or becomes stuffed or inflates or blows up with material x₂ (Entity); x₂ pours into x₁</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">titla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is sweet or sugary or saccharine to observer x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tivni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ broadcasts or televises programming x₂ (Event) via medium or channel x₃ (Set&lt;T&gt;) to television receiver x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tixnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Organism) is a daughter of mother or father or parents x₂ (Group&lt;Organism&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">toknu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an oven enclosing contents x₂ (Entity) for baking or heating or drying</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">toldi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a butterfly or moth of species or breed x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tonga</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Sound) is a tone or note of frequency or pitch x₂ (Number) from source x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tordu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is short in dimension or direction x₂ (Set&lt;T&gt;) by measurement standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">torni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ twists under load or force or torsion x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">traji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity, U extends Entity, V extends Entity. x₁ (T) is superlative in property x₂ (Set&lt;U&gt;), at extreme x₃ (Set&lt;V&gt;) among set or range x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">trano</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of or contains or is made of nitrogen or ammonia or nitrates</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">trati</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is taut or tense or strained tight in direction x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">trene</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a train or vehicle consisting of cars or units x₂ (Group&lt;Entity&gt;) on rails or system or railroad x₃ (Entity) propelled by x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tricu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a tree of species or cultivar x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">trina</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Entity) attracts or appeals to or lures x₂ with property or quality x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">trixe</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is posterior or behind or in the rear of x₂ (Entity) which faces in frame of reference x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">troci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ tries or attempts or makes an effort to do or attain x₂ (Set&lt;T&gt;) by actions or method x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tsali</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is strong or powerful or tough in property or quality x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tsani</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an expanse of sky or the heavens at place x₂ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tsapi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a seasoning or condiment or spice causing flavor or effect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tsiju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a seed or spore body-part x₁ of organism x₂ (Organism) for producing offspring x₃ (Group&lt;Organism&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tsina</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a stage or platform or dais or scaffold at or in location x₂ (Location) supporting x₃ (Entity | Event) made of material x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tubnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is a length of tubing or pipe or hollow cylinder of material x₂ (Set&lt;T&gt;) with hollow of material x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tugni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) agrees with persons or position or side x₂ (Entity) that x₃ (Proposition) is true about matter x₄ (Entity | Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tujli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a tulip of species or strain x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tumla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a parcel or expanse of land at location x₂ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tunba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a sibling of x₂ (Entity) by bond or tie or standard or parents x₃ (Relation&lt;x₁, x₂&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@tunka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is made of or contains or is a quantity of copper of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tunlo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) gulps or swallows substance x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tunta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) pokes or jabs or stabs or prods x₂ (Entity) with object x₁ (Entity) usually pointed</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tuple</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a leg body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@turni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) governs or rules people or territory or domain or subjects x₂ (Entity | Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@tutci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a tool or utensil or resource or instrument or implement used for doing x₂ (Event | Process)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">tutra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is territory or domain or space of or belonging to or controlled by x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@vacri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of air or normally gaseous atmosphere of planet x₂ (Entity) of composition including x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vajni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity | Event. x₁ is important or significant to x₂ (Entity | Event) in aspect or for reason x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">valsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Text) is a word meaning or causing x₂ (Abstraction) in language x₃ (Language)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vamji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: Entity, x₃: Entity, T extends Entity, V extends Entity, W extends Entity. x₁ (Set&lt;T&gt;) is the equivalent value or worth of item x₂ (Set&lt;V&gt;) to x₃ for use or appreciation x₄ (Set&lt;W&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vamtu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Organism) vomits or regurgitates x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vanbi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is part of an environment or surroundings or context or ambience of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vanci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is an evening of day x₂ (TimeInterval) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vanju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is made of or contains or is a quantity of wine from fruit or grapes x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vasru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) contains or holds or encloses or includes contents x₂ (Entity) within</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vasxu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Organism) breathes or respires gas x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vecnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: Entity, x₂: Entity, T extends Entity. x₁ sells or vends goods or service or commodity x₂ to buyer x₃ (Entity) for amount or cost or expense x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">venfu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) takes revenge on or retaliates against x₂ (Entity) for wrong x₃ (Event) with vengeance x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vensa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (TimeInterval) is spring or springtime of year x₂ (TimeInterval) at location x₃ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">verba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Organism) is a child or kid or juvenile of age x₂ (TimeInterval) immature by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vibna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a vagina body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vidni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a video monitor or CRT or screen serving function x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vidru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a virus of species or breed or defining property x₂ (Taxon | Set&lt;T&gt;) capable of infecting at locus x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vifne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is fresh or unspoiled</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vikmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Organism, V extends Entity. x₁ excretes waste x₂ (Entity) from source x₃ (Set&lt;T&gt;) via means or route x₄ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">viknu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is thick or viscous under conditions x₂ (State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vimcu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) removes or subtracts or deducts or takes away x₂ (Entity) from x₃ (Entity) with or leaving result or remnant or remainder x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vindu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is poisonous or venomous or toxic or a toxin to x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vinji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is an airplane or aircraft for carrying passengers or cargo x₂ (Group&lt;Entity&gt;) propelled by x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vipsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a deputy or vice or subordinate in aspect or organization principle x₂ (Relation&lt;x₁, x₃&gt;) to principal x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">virnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is brave or valiant or courageous in activity x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">viska</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) sees or views or perceives visually x₂ (Entity) under conditions x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vitci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is irregular or occasional or intermittent in property or action or aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vitke</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a guest or visitor of x₂ (Entity) at place or event x₃ (Location | Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vitno</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is permanent or lasting or eternal in property x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vlagi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a vulva body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vlile</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event | State) is an event or state or act of violence</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vlina</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a logical alternation or disjunction stating that x₂ (Proposition) and or x₃ (Proposition) is or are true</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vlipa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) has the power to bring about x₂ (Event) under conditions x₃ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vofli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ flies in air or atmosphere using lifting or propulsion means x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">voksa</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Sound) is a voice or speech sound of individual x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vorme</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a doorway or gateway or access way between x₂ (Location) and x₃ (Location) of structure x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vraga</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a lever tool of apparatus for doing function or action x₂ (Set&lt;T&gt;) with fulcrum x₃ (Entity) and arm x₄ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vreji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a record of data or facts or proposition x₂ (Proposition) about object or event x₃ (Entity | Event) preserved in medium x₄ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vreta</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) lies or rests or reclines or reposes on x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vrici</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity, U extends Entity. x₁ (Set&lt;Entity&gt;) is miscellaneous or various or assorted in property x₂ (Set&lt;T&gt;) of each member of x₁</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vrude</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is virtuous or saintly or fine or moral or nice or holy or morally good by standard x₂ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vrusi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: T, T extends Entity. x₁ (Set&lt;T&gt;) is a taste or flavor of or emitted by x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">vukro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Ukrainian language or culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xabju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Organism | Entity) dwells or lives or resides or abides at or inhabits or is a resident of location or habitat or nest or home or abode x₂ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xadba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is exactly or approximately half or semi or demi or hemi of x₂ (Entity) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xadni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a body or corpus or corpse of x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xagji</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Organism) hungers for x₂ (Entity); x₁ needs or wants food or fuel x₂</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xagri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a reed musical instrument or oboe or clarinet or saxophone with reed x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xajmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is funny or comical to x₂ (Entity) in property or aspect x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xaksu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event) uses up or depletes or consumes or wastes resource x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xalbo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) uses levity or is non-serious or frivolous about abstraction x₂ (Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">@xalka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of alcohol of type x₂ (ka, Set&lt;T&gt;) from source or process x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xalni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Person) is panicked by crisis x₂ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xamgu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity | Event) is good or beneficial or nice or acceptable for x₂ (Entity) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xampo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Number) is x₂ (Number) amperes in current by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xamsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a sea or ocean or gulf or atmosphere of planet x₂ (Entity) of fluid x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xance</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a hand body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xanka</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is nervous or anxious about abstraction x₂ (Abstraction) under conditions x₃ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xanri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Abstraction) exists in the imagination of or is imagined by or is imaginary to x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xanto</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is an elephant of species or breed x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xarci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a weapon or arms for use against x₂ (Entity) by x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xarju</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a pig or hog or swine or boar of species or breed x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xarnu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: U, U extends Entity | Event, T extends Entity. x₁ (Entity) is stubborn or willfully opposing or resisting x₂ about x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xasli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a donkey or jackass of species or breed x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xasne</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is sweat or perspiration from body x₂ (Organism) excreted by glands or organs x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xatra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a letter or missive or note to intended audience x₂ (Group&lt;Entity&gt;) from author or originator x₃ (Entity) with content x₄ (Entity | Text | Symbol)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xatsi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^-18 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xazdo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Asiatic culture or nationality or geography in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xebni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) hates or despises x₂ (Entity | Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xebro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Hebrew or Jewish or Israeli culture or nationality or language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xecto</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 100 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xedja</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a jaw body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xekri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is black or extremely dark-colored</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xelso</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Greek or Hellenic culture or nationality or language in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xendo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Person. x₁ is kind to x₂ (Entity) in actions or behavior x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xenru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) regrets or rues abstraction x₂ (Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xexso</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^18 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xindo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Hindi language or culture or religion in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xinmo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a quantity of ink of color or pigment x₂ (Entity) used by writing device x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xirma</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a horse or equine of species or breed x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xislu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a wheel tool of device or vehicle x₂ (Entity) made of materials or having properties x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xispo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Hispano-American culture or nationalities in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xlali</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity | Event) is bad for x₂ (Entity) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xlura</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity, x₂: U, U extends Entity, V extends Entity, W extends Entity. x₁ influences or lures or tempts x₂ into action or state x₃ (Set&lt;V&gt;) by influence or threat or lure x₄ (Set&lt;W&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xotli</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a hotel or inn or hostel at location x₂ (Location) operated by x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xrabo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Arabic-speaking culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xrani</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: U, U extends Entity, T extends Entity, V extends Entity. x₁ (Event) injures or harms or damages victim x₂ in property x₃ (Set&lt;T&gt;) resulting in injury x₄ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xriso</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ pertains to the Christian religion or culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xruba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of buckwheat or rhubarb or sorrel grass of species or strain x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xruki</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Organism. x₁ is a turkey bird or food of species or breed x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xrula</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a flower or blossom or bloom body-part of plant or species x₂ (Taxon | Organism | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xruti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₂: U, U extends Entity, T extends Entity, V extends Entity. x₁ (Entity) returns x₂ to origin or earlier state x₃ (Set&lt;T&gt;) from x₄ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xukmi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is an instance of substance or chemical or drug x₂ (Group&lt;Entity&gt;) with purity x₃ (Amount of x₃)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xunre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is red or crimson or ruddy in color</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xurdo</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ reflects Urdu language or culture or nationality in aspect x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xusra</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) asserts or claims or declares proposition x₂ (Proposition) is true</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">xutla</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is smooth or even or soft or silky in texture or regularity</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zabna</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is favorable or great or superb or admirable or nice or desirable or enjoyable or high-quality in property x₂ (Set&lt;T&gt;) by standard x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zajba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a gymnast at or performs gymnastics feat x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zalvi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Group&lt;Entity&gt;) grinds or pulverizes or crushes x₂ (Entity) into powder x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zanru</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) approves of or gives favor to plan or action x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zarci</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a market or store or exchange or shop selling or trading for x₂ (Entity | Event) operated by or with participants x₃ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zargu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a buttock or arse or rear or seat body-part of x₂ (Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zasni</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is temporary or not permanent or expected to change in property x₂ (Set&lt;T&gt;) by standard or expectant x₃ (Standard)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zasti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) exists or is real or actual or reality for x₂ (Entity) under metaphysics x₃ (Proposition)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zbabu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of soap from source x₂ (Entity) of composition including x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zbani</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Location) is a bay in or of coast or shoreline x₂ (Location)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zbasu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) makes or assembles or builds or manufactures or creates x₂ (Entity) out of materials or parts or components x₃ (Set&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zbepi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a pedestal or base or stand or pallet supporting x₂ (Entity | Event) of materials or properties x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zdani</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is a nest or house or lair or den or home of or for x₂ (Entity | Organism)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zdile</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is amusing or entertaining to x₂ (Entity) in property or aspect x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zekri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Event | State) is a punishable crime or taboo or sin to people or culture or judges or jury x₂ (Group&lt;Entity&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zenba</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ increases or is incremented or augmented in property or quantity x₂ (Set&lt;T&gt;) by amount x₃ (Amount of x₂)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zepti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^-21 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zetro</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T &amp; V, T extends Entity, V extends Entity. x₁ is 10^21 in scale x₂ (Set&lt;T&gt;) in dimension x₃ (Set&lt;V&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zgana</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ observes or notices or watches or beholds x₂ (Entity) using senses or means x₃ (Set&lt;T&gt;) under conditions x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zgike</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is music performed or produced by event x₂ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zifre</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is free or at liberty to do or be x₂ (Event | State) under conditions x₃ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zinki</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of or contains or is made of zinc of composition including x₂ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zirpu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is purple or violet in color</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zivle</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) invests resources x₂ (Entity) in investment x₃ (Entity) expecting return or profit x₄ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zmadu</td>
  <td class="text-left align-text-top p-2 max-w-2xl">T extends Entity, U extends Entity. x₁ (T) exceeds or is more than x₂ (T) in property or quantity x₃ (Set&lt;U&gt;) by amount or excess x₄ (Amount of x₃)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zmiku</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is automatic in function x₂ (Set&lt;T&gt;) under conditions x₃ (Event | State)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zukte</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a volitional entity employing means or taking action x₂ (Set&lt;T&gt;) for purpose or goal x₃ (Event)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zumri</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Entity. x₁ is a quantity of maize or corn grain of species or strain x₂ (Taxon | Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zungi</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) feels guilt or remorse about abstraction x₂ (Abstraction)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zunle</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is to the left or left-hand side of x₂ (Entity) which faces in frame of reference x₃ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zunti</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁: T, T extends Event | State | Process. x₁ interferes with or hinders or disrupts x₂ (Event | State | Process) due to quality x₃ (Set&lt;T&gt;)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zutse</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) sits on surface x₂ (Entity)</td>
</tr>
<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
  <td class="font-bold p-2 align-text-top">zvati</td>
  <td class="text-left align-text-top p-2 max-w-2xl">x₁ (Entity) is at or attending or present at event or location x₂ (Location | Event)</td>
</tr>
  </tbody>
</table>
</div>