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
