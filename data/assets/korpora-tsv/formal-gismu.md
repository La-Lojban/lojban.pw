## Gismu place type system

This document specifies a type system for annotating gismu places in `dictionaries/formal-gismu.tsv`, written in a style similar to TypeScript or Rust type definitions.

`dictionaries/gismu.tsv` is the **original official** gismu dictionary: definitions, places, rafsi, and notes as published for Lojban, **without** the typed English layer in this spec. Work on types and migrations here assumes that file (or its glosses) as the semantic baseline.

Unary `ka` / “property” in `gismu.tsv` vs logic. **Where** the official gloss tags a place with **(ka)** or describes it as **property** in the unary-`ka` sense (e.g. “in property/dimension …”, “[force] (ka)”), read that slot as **set-shaped in logic**: the same abstract role as an **extension** or **predicate-as-set** (classifier / `{ x : T | … }` style membership), interchangeably with a unary predicate on individuals. In `formal-gismu.tsv` that role is written `**Set<T>`** with generics and **prenex** typings (§3)—not a second phantom type. **Anonymous** `Set<T>` is still used when the gloss does not tie the extension to a specific bearer place in the type line.

`dictionaries/formal-gismu.tsv` spells unary `ka` as `**Set<T>`** (element sort `T`) together with a **prenex**: place typings (`x₁: …`, `x₂: …`, …), then parameters with `**extends`** constraints (`T extends Entity`, `U extends Entity, T extends U`, …). The old `Property` / `(Property of xᵢ)` English spellings are **not** used.

When the bearer’s sort **is** the same type parameter as the unary-`ka` aspect over that bearer (e.g. **bancu** `x₁` and `x₄ (Set<T>)`), write `**x₁: T, T extends Entity`** (or `T extends Organism`, `T extends Location`, …), not `**x₁: Entity` plus a separate unconstrained `T**`. Distribution gismu (**fadni**, **rirci**, **mupli**, **girzu**) use `**U extends Entity, T extends U`** with reference sets `**Set<U>**` where appropriate. The link to **ckaji**-style predication is **lexical** (gloss + place structure), not a separate type constructor.

### Slot filling compatibility (validation rule)

When validating examples or migrated rows, a place filler is type-correct if its inferred type is compatible with that slot's declared type.

- **Direct match**: filler type is the same as slot type (or a union arm).
- **Union match**: if the slot is `A | B | ...`, matching any arm is sufficient.
- **Predicate-derived sumti**: a sumti like `su'o cladu` can satisfy a slot expecting `Sound` because `cladu` has `x₁ (Sound)` in `formal-gismu.tsv`.
- **Stylistic equivalence**: unary `ka`, `property`, and `Set<T>` are equivalent representations of the same role in this project; `ni` quantity-like phrasing is also accepted where the slot is the corresponding set-style unary aspect.
- `**(si'o)` gloss vs `ka` / `Set<T>` fillers** (see §2 *Scale* bullet): `**(si'o)`**-tagged places accept unary-`ka` and `Set<T>` readings consistent with §2 and §3, including when `T` links to another argument’s type.
- **Explicit sumti-raising (`tu'a`)**: `tu'a X` is an **opaque** sumti: the surface `X` need not have the same *surface* type as the place (e.g. `**le sance be le carvi`** is entity-like), but `**tu'a**` marks it as standing in for **abstract dream / belief / predication content**—often by **metonymy**, where a **concrete part or facet** of what would normally be a full `**du'u` / `nu` / `si'o`-style** abstraction counts as the filler. Such phrases may fill slots typed `**Proposition`**, `**Idea**`, `**Event**`, unary-`ka` / `**Set<...>**`, and similar abstract roles, without counting as a type mismatch or implicit raising.
- `**ka` abstracts and `Relation<…>**`: Sumti such as `**le ka dunda**` (predicate abstract of a multi-place selbri) **denote the bridi’s relation**—the same role the TSV often spells `**Relation<Entity[]>`** or `**Relation<…>**` (e.g. **sumti** x₂, “predicate/function” in grammar talk). That is **not** the §3 unary-`**ka`** / `**Set<T>**` pattern (one bearer, one characterized aspect), but it **is** a normal, compatible filler for `**Relation`**-typed places. Do **not** treat “example uses `**ka`**” vs “formal column says `**Relation**`” as a discrepancy by itself.

Do not flag a discrepancy when these compatibility rules hold.

Each place (`x₁`, `x₂`, …) in a definition is immediately followed by its type in parentheses, for example:

`x₁: T, T extends Text. x₁ does x₂ (Event) to x₃ (Set<T>)` — bearer `x₁: …` comes first in the prenex with a `extends` constraint; the gloss uses bare `x₁`; unary `ka` is `Set<T>` with the same `T` as the bearer’s sort (when the gloss ties them).

For **anonymous** extension with no predicative link to another place, use `Set<T>` alone (e.g. `x₂ (Set<Entity>)`); see §3.

**TSV surface form.** `formal-gismu.tsv` uses **TypeScript** type syntax inside parentheses—`Event`, `Set<T>` (unary `ka`, with prenex `T` and bearer `x₁: …` as needed), `Standard`, `(Amount of x₁)`, etc. Do not prefix types with Lojban abstractors (`nu`, `ka`, `ni`, `si'o`, `du'u`); those map to the English names in §2 and in the Abstractors checklist under §6. Unary-`ka` slots should not be bare `Set<Entity>` without a prenex naming the bearer and aspect parameters where the gloss requires them (§3 *Prenex and bearer places*).

**Union types.** When a place may be filled by more than one distinct type, write alternatives in **TypeScript-style union** form with `|` (spaces around `|` match common TS formatting). Examples: `Sound | Text`, `Symbol | Text`, `GrammarStructure | Text`, `Entity | Symbol | Text`, `Entity | Text | Sound`, `Taxon | Set<T>` (with prenex `T` and bearer `x₁: …` as in §3 for unary `ka`), `Sequence<T> | Set<T>`, `Event | TimeInterval`. Do **not** use English “or” / comma lists inside parenthesized types (e.g. not `Entity, Text or Sound`).

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
type Symbol extends Entity
type GrammarStructure extends Entity
type Sound
type Number
type TimeInterval
```

- **Entity**: generic individual – person, object, place, institution, language, organism, etc. Default for “thing‑like” places.
- **Object**: physical entity; used when the definition clearly implies physicality and this contrast is useful.
- **Organism**: living being (animal, plant, microbe). Often we still annotate with **Entity** for simplicity.
- **Location**: spatial region, place, site, address, etc.; a specialized **Entity** used where place‑ness matters.
- **Language**: human or constructed language (e.g. Lojban, English, Mandarin). Used for places that are explicitly “language” rather than generic entities.
- **Taxon**: the type of a **taxon-like designation**—a named class at any usual rank (species, breed, cultivar, strain, genus, etc.), typically filled by a **name or label** (a sumti that picks out a taxon or named variety).
- **Taxon vs descriptive unary ka in the same slot** (unary `ka`): A place that “gives the species / variety / breed” is not always filled that way. It may hold a **Taxon** (ordinary naming: *Felis catus*, “Granny Smith”, “Holstein”) or `**Set<T>`** (with prenex `x₁: T, T extends Organism` or similar) when the subtyping is **descriptive** rather than nominal—e.g. the breed or stock is given as a trait of `x₁` (“long-haired”, “of such-and-such lineage”, “pest-resistant strain”) without treating that text as a fixed taxonomic name. Those two modes are the same semantic role; we type the union as `**Taxon | Set<T>`**. When `gismu.tsv` allows further kinds of sumti (generic fruit source, plant-as-individual, race as group), the TSV may add `Entity`, `Organism`, `Group<Organism>`, etc., alongside `Taxon` and `Set<T>`.
- **Text**: string, written form, sentence, name, title, dictionary entry, etc.
- **Symbol**: a **symbolic form** as an individual — letter, digit, glyph, punctuation mark, notation token, or other inscription‑level unit, often in a role parallel to **lerfu** / **me'o** / typographic “character”. In `formal-gismu.tsv` it is **not** the abstract referent alone (that may be **Entity** or other types); it is the **form** qua form. **Text** and **Symbol** are closely related: **Text** is often used **metonymically** for **Symbol** when the quoted or written string is what is meant (the inscription stands for the symbolic unit). Where both readings are licensed, use `Symbol | Text` (and similarly `Entity | Symbol | Text` when a physical sign, a symbolic form, or a text are all allowed).
- **GrammarStructure**: a **grammatical construction** or **structural description** in the metalanguage sense—e.g. the noun phrase or **sumti** minus the article/descriptor (**gadri** x₂), or a comparable phrase template. The `gismu.tsv` gloss marks x₂ as “(text)” because the usual sumti is realized as a string; **Text** (and sometimes **Symbol**) remains the usual **surface** representation, so `GrammarStructure | Text` (and `Symbol` when a minimal form is allowed) captures both the structural role and the inscriptional reading.
- **Sound**: non‑propositional acoustic event (voice, noise, tone, animal cry).
- **Number**: numeric value, cardinal, measure, or mathematical result.
- **TimeInterval**: span of time considered as an object (elapsed time) distinct from any particular event.

In `formal-gismu.tsv` these appear as `Entity`, `Object`, `Location`, `GrammarStructure`, etc. inside the parentheses after each place.

- **Symbol vs Text in TSV**: Use `Symbol` (or `Symbol | Text`) for places about **graphemic or notational units**, **punctuation**, **mathematical / me'o expressions as forms**, **root words / cmavo / affixes as lexical shapes**, and similar. Use plain `Text` when the role is **propositional or narrative content** (story, poem, prose, myth text as wording) without emphasizing the inscription‑level reading.
- **GrammarStructure in TSV**: Use `GrammarStructure` (typically with `| Text | Symbol`) for places that are **phrase-structure or template** roles in grammar talk, not only raw strings—see `gadri` x₂.

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

- **Event**: reified occurrence, process, action, or state (Lojban `nu`). Used for “event / state / process” unless the gismu is explicitly about propositions or unary-`ka` characterization. In the TSV write `(Event)` (no `nu` prefix).
- **Proposition**: truth‑evaluated content (Lojban `du'u`), e.g. what is believed, known, claimed. In the TSV write `(Proposition)`.
- **Idea**: conceptualization or mental image (`si'o`) not tied to numeric measurement.
- **Scale**: `si'o` used as a scale for measuring values of type `T`. For example, a temperature scale might be `Scale<Set<T>>` (with prenex `T extends Entity` and bearer `x₁: …`) when the measured aspect is a unary-`ka` over bearer `x₁`.
- `**(si'o)` in `gismu.tsv` vs unary `ka` / `Set<T>` in examples:** When the official gloss tags a place with `**(si'o)`** (measurement scale, reference standard, or idea-scale in the dictionary sense), a filler may still be realized as `**le ka …**` (unary property) or as the `**Set<T>**` role from the formal column, including when `**T**` is the sort of **another** place in the same bridi (e.g. length-aspect relative to the thing measured, tied to the bearer’s type). That is compatible with `**Scale`**, `**Idea**`, `**Standard**`, or a scale variable such as `**v**` in **formal-gismu.tsv**—do **not** treat `(si'o)` vs `ka` / `Set<T>` / `Scale` **alone** as a type discrepancy when slot-filling compatibility (§Slot filling compatibility) otherwise holds.
- **Standard**: special case of `si'o` used as a **standard, norm, benchmark, reference frame, or measurement standard** (“by standard …”). In `formal-gismu.tsv` we normally render this as `xₙ (Standard)`. It can cover both:
  - *normative* standards (cultural, moral, aesthetic, etc.), and
  - *measurement* standards (unit systems, reference expectations, etc.),
  whenever the original gismu says “by standard …”, “as compared with standard …”, or “in standard …”.
- **Abstraction**: used when the original definition says “abstraction” and several abstractors are possible; in the TSV we may still say “abstraction” and, if helpful, clarify likely `nu` / `ka` / `ni` / `du'u`.

---

### 3. Generics for collections and unary `ka`

We model collections explicitly with generics. Unary `ka` (predicative “trait / aspect / dimension of `xᵢ`”) is written `**Set<U>`** in the TSV; the **prenex** names the bearer place(s) and `**extends`** constraints, so the link to **ckaji**-style predication is **lexical** (gloss + place structure), not a second type constructor.

```ts
type Set<T>      // extension set of T (lo'i)
type Sequence<T> // ordered collection of T
type Group<T>    // mass / collective of T (loi)
```

**Prenex and bearer places** (required for unary-`ka` rows in `formal-gismu.tsv`). Declare each bearer `xᵢ: …` and each generic used in `Set<…>` at the start of the definition. In the TSV column, **do not** write unary-`ka` as bare `Set<Entity>` without a **prenex** when the gloss ties the aspect to a bearer: name `T` (or `U`, `V`, …) and `x₁: T, T extends Entity` (or `Organism`, …) so element sort and bearer sort are not confused.

- Declare parameters at the **start of the definition** (same style as comparison gismu with prenex `T`). **Order in the TSV:** list **place** typings first (`x₁: …`, `x₂: …`, … in numeric order), then `**extends`** lines for generics — e.g. `x₁: T, T extends Entity.` or `x₂: Event, T extends Entity.` (bearer `x₂`). You may still use a bare type parameter `U` only where it is **not** the type of a numbered place (e.g. **fancu** codomain, or **vrici** member sort).
- `T`, `V`, `W`, … — type parameters for the first argument of `Set<…>` in unary-`ka` slots (the element / aspect sort of the `ka` content).
- **Bearer** — declare the characterized individual explicitly as `xᵢ: <Type>` in the prenex. In the English gloss, use **bare** `xᵢ` (not `xᵢ (U)`). When the bearer’s sort **is** the same parameter as the unary-`ka` aspect (e.g. **bancu**), use `**x₁: T, T extends Entity`** and `x₄ (Set<T>)`, not `x₁: Entity` with an unrelated `T`.
- **Two (or more) unary-`ka` facets of the same bearer** — When the gloss gives **parallel** properties of `x₁` (both `Set<T>` and `Set<V>` characterize `x₁`, not “`x₃` nested under `x₂`”), spell the bearer as a **TypeScript intersection**: `**x₁: T & V, T extends …, V extends …`**, with `**x₂ (Set<T>)**` and `**x₃ (Set<V>)**` (examples: SI scale + dimension **centi**; species + traits **fetsi**; composition + shape **marji**; pattern + material **lanci** as `**x₁: T & W, …`**). If only **one** place is unary-`ka` over `x₁` and another is a non-`ka` sumti (e.g. medium `**x₂ (Entity)`**, waveform `**x₃ (Set<V>)**` — **@boxna**), keep `**x₁: Entity, T extends Entity, V extends Entity`** (or a single `T` for the `ka` slot) instead of forcing `**T & V**` on `x₁`.

If a row already uses `T` for another purpose (e.g. `bridi`), choose fresh names (`V`, `W`) in the prenex and use those consistently in `Set<…>`.

- **Multiple unary ka places in one bridi** (unary `ka`; composition vs shape, commodity traded vs received, SI scale vs dimension, monetary value vs material composition, etc.): **do not** reuse the same type parameter `T` for two *semantically distinct* unary-`ka` facets over the same or different bearers. Declare `V`, `W`, … in the prenex and write additional facets as `Set<V>`, `Set<W>`, pairing each with the correct bearer per the gloss. Examples: **marji** — composition `x₂` uses `T`, shape `x₃` uses `V`; **centi** — scale `x₂` uses `T`, dimension `x₃` uses `V`; **vamji** — worth `x₁` uses `T`, item `x₂` uses `V`, appreciation `x₄` uses `W`.
- **Property or dimension vs standard / norm:** When one place is the graded aspect (“in property …”, “in dimension …”) and another is the benchmark (“by standard …”, “compared with standard …”, “by aesthetic standard …”), those are two different unary-`ka` roles. Spell the bearer as `**x₁: T & U, T extends Entity, U extends Entity`** (or appropriate bounds) and write `**x₂ (Set<T>)**` for the aspect and `**x₃ (Set<U>)**` (or the next numbered place after other fixed sumti) for the standard — **not** `Set<T>` twice with the same `T`.
- **Set**: extension set where membership is important, e.g. `Set<Entity>`. TSV form: `set of Entity`, `set of Text`, etc. Use `Set<Entity>` (or `Set<T>` with the right `T`) when the place is **extensional** and **not** tied to a specific bearer in the type string—i.e. “a set of things” without naming which place is characterized (reference populations, anonymous extensions).
- **Unary `ka` over a bearer** (same spelling as **ckaji** / **jarco** property slots): `Set<T>` with prenex typings so the gloss’s “property / dimension / aspect of `xᵢ`” is clear — e.g. `x₁: T, T extends Entity` … `x₂ (Set<T>)`. Distribution gismu (**fadni**, **rirci**, **mupli**, **girzu**) use `**U extends Entity, T extends U`** with `**Set<U>**` for reference populations where the gloss requires them (see opening paragraph).
- **Sequence**: ordered collection, e.g. `Sequence<Text>` for an ordered list of words. TSV form: `sequence of Text`, `sequence of Entity`.
- **Group**: collective mass, e.g. `Group<Entity>` for a crowd of people. TSV form: `group of Entity`, `group of Organism`.

If a recurring pattern is not yet listed here, add a nominal or generic (TypeScript-style) in this section before using it in the TSV.

**Plural glosses.** When the English place description names a **plural count** of discrete parts or individuals of type `T` (e.g. “pieces `x₃`”, “fragments `x₂`”, “persons `x₂`” with no singular-only reading), that place is `Group<T>` in the conceptual type (TSV: `group of T`). If the official gloss explicitly allows **either** one individual **or** a collective (“person(s)”, “piece(s)”), use `T | Group<T>` (`Entity | Group<Entity>`, etc.). Do **not** use bare `Entity` for a place that is only described in the plural in `gismu.tsv`.

- **Nested element types**: when each member of a `Group` is itself a unary `ka` over a specific place `xᵢ`, write the element type as `Set<U>` with the right prenex. Example (**lanxe**): `T extends Entity`, `x₁: Group<T>`, `x₂ (Group<Set<Group<T>>>)` — a mass of forces, each unary `ka` over `x₁` (see §4).

---

### 4. Unary `ka`, amounts, and relations

Here we make the dependency on argument places explicit with generics. Conceptually:

```ts
type Amount<Arg>    // ni over one argument
type Relation<Args> // relation over 2+ arguments
```

Where:

- **Args** for `Amount` is a single type like `Entity`.
- **Args** for `Relation` can be a tuple like `[Entity, Entity]` if the relation depends on multiple arguments.

**Unary ka.** A unary `ka` whose bearer is `xᵢ` (with place type declared as `xᵢ: …` in the prenex) is `**Set<T>`** for suitable element type `T`. In the TSV column: `Set<T>` with `T` and `xᵢ` from the prenex (§3). When `x₁` is `Group<S>` with prenex `S extends Entity` (or another constraint), write `Set<T>` and share `S` with `x₁` where the gloss requires; do not hardcode `Group<Entity>` when a prenex fixes `S`.

Examples:

- **Unary `ka`**: unary `ka` over one argument; TSV: `Set<T>` (choose `T` and bearer `xᵢ: …` from the prenex and place types).
- **Two-argument “trait of both x₁ and x₂”**: this is a **relation** between two places; in TSV we use `Relation<xᵢ, xⱼ>` (see below), not a doubled unary-`ka` phrasing.
- **Kinship and bond places** (e.g. **mensi** “sister of …”, **dzena** “by bond/tie/degree …” between elder and descendant): When the official gloss ties **two individuals** (sibling link, generational step, “who is whose …”), the relevant place is `**Relation<xᵢ, xⱼ>`** over those arguments — not unary `**Set<T>**` over a single bearer by itself.
- `**le ka` with more than one `ce'u**`: A single `**ce'u**` in `**le ka …**` is the usual unary-`**ka**` / `**Set<T>**` pattern (one open slot / one characterized argument). **Two or more `ce'u`** in the same abstraction (e.g. `**le ka ce'u ce'u …**`) introduces **multiple** open argument positions — logically a **binary (or n-ary) relation**, not another unary property stacked on the same model. Read such sumti as **relation-shaped** and align them with `**Relation<…>`** typings in **formal-gismu.tsv** (e.g. **dzena** x₃ `**Relation<x₁, x₂>`** for “bond/degree”), rather than as a plain unary-`**ka**` `**Set<T>**` distinct from `**Relation**`.
- **Amount**: quantitative Lojban `ni` abstract over one argument; TSV: `(Amount of x₁)`.
- **Relation**: a relation over two or more arguments. **Relation is not a unary `ka` bundle** and not a `Set<T>` property slot; it is its own type in the **TSV** (contrast §3’s unary `**Set<T>`** over a named bearer). **Surface Lojban** still uses `**le ka …`** (and similar predicate abstracts) to **name** that relation and **fill** `**Relation<…>`** places—e.g. `**le ka dunda**` for **sumti** x₂. The point of the contrast is **not** to exclude `**ka`** sumti from `**Relation**` slots, but to avoid **analyzing** a logically **multi-argument** place (kinship, bond, ordering among distinct members, …) as if it were only unary `**Set<T>`** over a single bearer. In TSV we use one of three strict flavors:
  1. **Relation over (destructured) arguments from a collection** — One place is a Sequence or Set of elements of type `T`; another place is a relation whose **arguments are exactly those elements** (destructured as an argument tuple). Use when the place is “the relation among the members of [some set/sequence argument]” (e.g. bridi: the predicate relation over the argument list `x₃`).
    - **Formalization (TypeScript)**: The relation’s arguments are the destructured members — a tuple of `T`:
    - **TSV**: Prenex `T`, collection `xᵢ` (`Sequence` | `Set`), relation `xⱼ` (`Relation<T[]>`) — the relation’s argument list is the tuple of `T` (destructured from `xᵢ`).
  2. **Relation of xᵢ and xⱼ** (and optionally more) — the relation holds between (or among) the specific arguments listed. Use when the place is “the relation between xᵢ and xⱼ”.
    - Conceptually: `Relation<[T_i, T_j]>` where the types match those of the listed places.
    - TSV (strict, TypeScript-like): `Relation<xᵢ, xⱼ>` or `Relation<xᵢ, xⱼ, xₖ>`.
  3. **Relation over distinct pairs from a set** — One place is a Set (or Sequence) of elements of type `T`; another place is a binary relation that holds between **non-matching** pairs of those elements (no self-pairs). Use when the predicate is about a mutual or pairwise relation over a set, or when **ordering / comparison rules** apply to **unordered distinct** members (same typing).
    - **Formalization (TypeScript)**: Declare `T` in a prenex (e.g. `T extends Entity`). The set/sequence place is **Set** or **Sequence**; the relation place is `Relation<NonMatchingPair<T>>` — i.e. the relation is over pairs `[a, b]` where `a` and `b` are distinct elements of type `T`.
    - **TSV**: Prenex `T extends Entity` (or appropriate constraint), then `xᵢ` (`Set` or `Sequence`), and `xⱼ` (`Relation<NonMatchingPair<T>>`). No informal “members of `xᵢ`”. **Examples:** **simxu** `x₂` (members mutually … to each other); **porsi** `x₂` (sequence ordered by rules comparing distinct members on `x₃`). **liste** `x₃` uses the same shape for “in order `x₃`” over `x₂`.

**NonMatchingPair (what it is).** Flavor 3 relations are **not** over arbitrary `[T, T]` tuples: the gloss is about **two distinct members** of the same collection (mutual action, ordering rules that compare **different** items, etc.). `NonMatchingPair<T>` is the conceptual TypeScript name for that constraint—**ordered pairs** `[a, b]` with `a` and `b` both of type `T` and **never** a self-pair `[a, a]`. In Lojban, **simxu** illustrates the idea: `x₂` has **two** implied **ce'u** slots (a binary abstraction over two participants), matching “each two members” rather than a single reflexive argument.

Formalization (same structure as used when this was introduced; the conditional type **distributes** over unions so the second component excludes the first, ruling out identical components for finite unions of literals):

```ts
type NonMatchingPair<T, U = T> = T extends any
  ? [T, Exclude<U, T>]
  : never;

// Illustration only (same idea as in the project history); not a runtime JS API contract
type MySet<T> = Set<NonMatchingPair<T>>;
```

With prenex `T` for the element sort of the set/sequence place, `Relation<NonMatchingPair<T>>` means: the relation’s arguments range over **distinct** pairs from that sort. Contrast **§5** *For comparisons*: `ComparablePair<T> = [T, T]` allows **equal** components (same type in both places); `NonMatchingPair<T>` is the complementary pattern where **self-pairs are excluded** by the predicate’s meaning.

---

### 5. Typing patterns for common roles

Several semantic roles are common enough that we standardize their shape:

**Unary ka (§5).** For `formal-gismu.tsv`, every unary-`ka` slot in the bullets below uses the **prenex** form from §3 *Prenex and bearer places* (declare `T` and `x₁: …` or `x₂: …`, etc., in the prenex). Use **bare** `xᵢ` in the gloss, and write the unary-`ka` annotation as `Set<T>`. When a bullet below only shows that parenthetical, assume the row also has the matching prenex and `x₁: …` (or the appropriate bearer). Exception: conceptual `ts` code blocks may still use a single generic `T` for `MeasurementOf`; the TSV column should still expose `T` and bearer place types for unary-`ka` rows.

- **Container** (conceptual, not a separate nominal type): implemented as `Entity`, but we describe the role in English as “container for x₂ (Entity)”. Think of it as:
  ```ts
  type Container<T> = Entity
  ```
- **RoleOf**: roles / jobs / functions of some bearer, written in the TSV column as `Set<T>` with `T` and `xᵢ: …` in the prenex (or “role of xᵢ” in the English gloss outside the type).
  ```ts
  type RoleOf<T> = Set<T> // bearer `xᵢ` in prenex; same pattern as **ckaji** `x₂`
  ```
- **MeasurementOf: numeric or unit‑bearing measurement of some argument:**
  ```ts
  type MeasurementOf<T extends Entity> = {
    value: Number
    scale: Scale<Set<T>> | Scale<Amount<T>> | Scale<unknown>
  }
  ```
  In TSV we usually flatten this, e.g. `x₁: Entity, T extends Entity. x₁ is x₂ (Number) units on scale x₃ (Scale<Set<T>>)` (with prenex tying `T` to the measured bearer as in §3).

For **comparisons** (equality, excess, less‑than), the predicate is generic in a single type parameter `T`; both compared places have type `T`:

```ts
// Both x₁ and x₂ have type T (e.g. Entity, or Entity | Amount<Entity>)
type ComparablePair<T> = [T, T]
type Equal<T> = ComparablePair<T>       // dunli
type LessThan<T> = ComparablePair<T>   // mleca
type Excess<T> = ComparablePair<T>     // dukse (see **zmadu** below)
```

In TSV we use a **prenex** to declare the type parameter, then use `T` in both compared places:

- **Prenex**: at the start of the definition, declare `T` with its constraint, e.g. `T extends Entity` or `T extends Entity | Amount<Entity>` (same meaning as TypeScript `T` with an upper bound or union constraint).
- **Places**: `x₁ (T)` and `x₂ (T)` — both refer to the same `T` declared in the prenex.

Example: `T extends Entity. x₁ (T) is equal or congruent to x₂ (T) in …` (dunli); `T extends Entity | Amount<Entity>. x₁ (T) is less than x₂ (T) in …` (mleca). This matches a TypeScript-style generic with a single type parameter `<T>` and an optional constraint.

- **Exception — relative more-than (zmadu):** compared parties may be **distinct** subtypes of a shared upper bound `**V`**. Declare `**V extends Entity**`, `**T extends V**`, `**U extends V**`, with `**x₁ (T)**` and `**x₂ (U)**`. The property or quantity in which `**x₁**` exceeds `**x₂**` is unary-`ka` over **either** compared party, typed `**x₃ (Set<T | U>)`** (same `T` and `U` as in the prenex).
- **Metric and dimensional gismu** (centi, zepti, mitre, minli, clani, rotsu, etc.): These predicates have a specific notion of **dimension** or **aspect** in which something is measured or compared. That dimension is always typed as `Set<T>` (Lojban `ka` over the measured entity; typically `x₁`).
  - **SI prefix / scale gismu** (centi, zepti, gigdo, kilto, decti, dekto, milti, mikri, …): the bearer is **both** aspect sorts: prenex `**x₁: T & V, T extends Entity, V extends Entity.`**; `x₂` is **scale** `(Set<T>)`; `x₃` is **dimension** `(Set<V>)` (parallel unary-`ka` facets over the same `x₁`, not nesting — see `formal-gismu.tsv` wording “in scale … in dimension …”). (`x₂` is not a “reference entity” sumti.) Example: “The insect is 1 centimeter long” → the insect (`x₁`) is 10^-2 in scale `x₂ (Set<T>)` in dimension `x₃ (Set<V>)` (e.g. clani).
  - **Unit gismu** (mitre, minli, gutci, dekpu): `x₁ (Entity)` is `x₂ (Number)` [units] in **dimension** `x₃` `Set<T>` by standard `x₄` (`Standard`); optional subunits as `x₅`. So the “in what respect” slot is always `Set<T>`, not `Entity` or `Number`.
  - **Dimension adjectives** (clani, rotsu, tordu, condi, ganra, barda): `x₁ (Entity)` is long/thick/short/deep/wide/big in **dimension or direction** `x₂` `Set<T>` (default e.g. longest dimension) by standard `x₃` (`Standard`) when present.
  - Non-SI units (minli “mile”, gutci “short distance units”, degygutci “inches”, jmagutci “feet”, etc.) follow the same pattern: dimension = `Set<T>`.
- **Propulsion and transportation “means”** (not physical substance filling a role as sumti):
  - **“Propelled by”** (vehicle, tool, or agent that is the thing being propelled): type the slot as `Set<T>` — how `x₁` is propelled or driven. Examples: carce, karce, marce, trene, vinji, bloti, plixa, plipe, vofli; mruli already uses this for the hammer’s propulsion.
  - **Exception**: when the gloss ties propulsion to another place (e.g. **cecla**: projectile `x₂` is “propelled by” `x₃`), use `Set<T>` so the unary-`ka` attaches to the sumti that is actually propelled.
  - **jakne** (rockets): `x₂` is the substance expelled by the jet (propellant / exhaust), not “propulsion as unary-`ka`”; keep `Entity` for `x₂`.
- **Medium and channel (transfer of information or of a represented work)** — writing surface, broadcast channel, book format, film, list support, copy format, etc.: type as `Set<T>` where `x₁` is the bearer (sender, book copy, list object, record, camera, picture, …). Examples: benji (means/medium of transmission), cusku, ciska, cukta, fukpi, kacma, liste, tivni, pixra, vreji.
  - **Contrast — physical medium** (substance or region the wave or matter moves *through*, not “format”): keep `Entity`, e.g. **boxna** (wave in medium), **pagre** / **pulce** (barrier / fluid medium). **marce** `x₃` “surface or medium” (road, water) is also **Entity**.
- **“By method”** — When `gismu.tsv` labels a place with **“by method …”** (including phrasings such as **“gathered by method …”**, **“introduced by method …”**, **“made by method …”**, or **“by method/partition …”** / **“by method/technique …”** where **method** names the same role), that slot is the **manner or procedure** in which the bridi holds relative to the principal subject `x₁`. Type it as `Set<T>`, not `(Event)`, even when the English parenthetical says “(event)” or “(process)”. Examples: **cilre** x₅, **ctuca** x₅, **datni** x₃, **fendi** x₄, **fukpi** x₄, **jinku** x₄, **lanli** x₃, **mipri** x₄. Glosses that say **“by recipe/method”** or **“by action/method”** instead of the exact substring **“by method”** are judged case by case; **catra** x₃ and **troci** x₃ already follow the same `ka` pattern when the slot is manner/method.
- **“Rule” / “by rule” / “under rules”** — When the gloss marks a place with **rule** in this **modal** sense — **according to rule(s)**, **under rules/logic**, **with/by rules**, **defined by rules**, **expression/rule**, **rules/model**, **form/rules**, **interpreted under rules/convention** — the slot is the **convention or constraint** under which the predication holds, not (usually) a bare entity. Default typing: `Set<T>` so the “under which” attaches to the principal `x₁` of the bridi. Examples: **cerda** x₄, **fancu** x₄, **manri** x₃, **mekso** x₂, **munje** x₃, **natfe** x₃, **nibli** x₃, **ritli** x₄, **sucta** x₃.
  - **Not this pattern — “rules” as ordering or pairwise comparison:** **porsi** x₂ (“sequenced by rules …”) is `Relation<NonMatchingPair<T>>` on the unordered set x₃, the same relation flavor as **simxu** x₂ (§4, flavor 3), **not** a unary-`ka` `Set<T>` property slot.
  - **Attach to another place when the gloss says so**: **cimde** `x₃` “according to rules/model” for a dimension **of** `x₂` is a second unary-`ka` facet — use `Set<V>` with `V` in the prenex, distinct from `T` on `x₁` (align in `formal-gismu.tsv`).
  - **Not this pattern**: places where `xₙ` is the rule (or law, order) as the thing denoted — e.g. **javni** x₁ “is a rule …”, **tinbe** x₂ “the command/rule followed”, **pulji** x₂ “law(s)/rule(s) enforced”, **gerna** x₁ “grammar/rules …”, **logji** x₁ — type those sumti by their **object** role (`(Proposition)`, `Entity`, `(Idea)`, etc.), not as `Set<T>` merely because the English says “rule”.
  - **Finer alternatives (optional unions)**: If a slot is naturally read as a **fully stated norm** or **logic as a proposition**, `(Proposition)` is reasonable; if it is a **formal system or calculus as an idea**, `(Idea)` is reasonable. The unary-`ka` treatment emphasizes **how** the bridi is constrained relative to `x₁` (same family as **§5** *RoleOf* and **“by method”**). Where the dictionary is ambiguous, `Set<T>` is the default for **“under rules / according to rule”** slots; add `| Proposition` or `| Idea` only when `gismu.tsv` clearly allows those fillings *as the main reading*.
  - **Material and composition** — When `gismu.tsv` describes **what something is made of**, **its substance**, or **its composition** relative to the **main physical bearer** `x₁`, type that place as `Set<T>`, not bare `Entity`, unless the gloss clearly treats the sumti as a **discrete object** (tool, vessel, source location) rather than “composition of `x₁`”. Typical English triggers in the official gloss: **“made of material …”**, **“of material …”** (shape / layer / garment / part made of substance), **“of composition …”** / **“of composition including …”**, **“woven from material …”**, **“from material or yarn …”**, **“with blade of material …”**, **“of material or properties …”** (e.g. **daplu**), **“from material or source …”** (e.g. **jemna**), **“having value … of composition including …”** (**sicni** — **value** `x₃` uses `T`, **composition** `x₄` uses `V` in the prenex). Multiple **“of material …”** places in one definition (e.g. **dirgo**, **uffonmo**) use distinct prenex parameters when they are different unary-`ka` facets (wall vs core; foam vs bubbles). **Mass vs predicative composition:** English *material* may also fill `Group<Entity>`/`Entity` (ingredients, piles, lump) without the “`x₁` **has** this composition” reading—use gloss and the exceptions below; do not force a `Set<T>` reading by fiat when the gloss does not support it.
  - **Not this pattern**: **feedstock or inputs** with no “of `x₁`” reading — e.g. **fanri** x₃ “from materials” (what the factory processes), **kakpa** x₂ “material” dug out, **fenso** x₂ “materials” as a **set** of things sewn; keep `Entity`, `Group<Entity>`, or `Set<Entity>` as appropriate. **Propelling material** or **gathering material** for a sail (**falnu** x₂) is the **substance medium**, often still `Entity`. **Pure or empty of material/contaminant** (**jinsa**, **kunti**) is **absence / purity**, not “composition of `x₁`” in the same sense — keep `Entity` or existing typing unless you unify deliberately.
- **Type and form** — When the gloss marks a place as the **kind**, **type**, **shape**, **pattern**, **waveform**, **form** (including **in form …**, **size or form …**, **in form or medium …** for a copy), **expressive form**, **dimensions** (when they specify the figure of `x₁`, e.g. **kubli**), or **geometric detail** of the principal bearer (**surfaces/sides**, **vertex**, **tines/needles** as descriptors of how `x₁` is shaped), type that place as `Set<T>` (in `formal-gismu.tsv` you may add a short gloss such as `ka,` before the parenthetical when disambiguating from bare `Set`). Typical triggers: **“of type …”** (substance kind, illumination type, tree type, metal type, etc.), **“with shape …”**, **“with pattern …”**, **“with waveform …”**, **“with form …”** (e.g. **rafsi**), **“in shape …”** (**marji**), **“in form …”** / **“in form or arrangement …”** (**krili**, **staku**). **tarmi** x₁ is the **ideal form** as sumti — `Entity | Idea`, not a “form slot” of another place in this sense.
  - **Not this pattern**: places where **type** names a **taxon or breed** with `Taxon` as the main reading (often `Taxon | Set<T>` per §1); **contents**, **locations**, or **tools** that are not “the shape/type of `x₁`”; **Number** places for **wavelength**, **frequency**, **diameter** (measure, not form-as-unary-ka).
- **Force (physics, compulsion, pressure)** — In `gismu.tsv`, glosses mark **force** as `(ka)` (dictionary convention) or `[force] (ka)`, or parenthesize `(force)` on a place. That is **not** a separate nominal type `Force` and is usually **not** `(Event)` or bare `Entity` when the slot is the *force* itself. Model it as `Set<T>` where `xᵢ` is the bearer the force acts on or is defined relative to (same as other “how much / in what way” pressure or load slots). Examples:
  - **Compelling / mashing** (force as determiner of another place): **bapli** `x₁` `[force] (ka)` in `gismu.tsv` → `Set<T>` in `formal-gismu.tsv`; **marxa** likewise.
  - **Agent or force on a target**: **danre**, **lafti**, **katna**, **polje** `x₁` — `Entity | Set<T>` when the gloss allows tool or agent as well as non-agentive force.
  - **Force that acts on or yields to** `x₁`: **jdari**, **ranti**, **tinsa**, **torni**: `Set<T>`; **randa** `x₂` (person/agent *or* force): `Entity | Set<T>`.
  - **Force that acts on or opposes** `x₂`: **sarji** `x₃` “force/opposition” — `Set<T>`, union `(Event)` when the gloss is “opposition” as an event; **xarnu** `x₂` (person, state, or force) — include `Set<T>` alongside `Entity` and `(Event)`.
  - **Mass of forces** in a balance: **lanxe** `x₂` (mass) — prenex `T extends Entity`, then `x₁: Group<T>`, `x₂: Group<Set<Group<T>>>` (each force is unary `ka` over `x₁`; see §3 *Nested element types* and §4). In the TSV column, gloss the inner unary-`ka` as `Set<Group<T>>` with the same prenex.
  - **Stirring fluid** by object or force: **jicla** `x₁` — add `Set<T>` to the union of `Entity` and `(Event)`.
  - **Means / restraint** (still “force” in English): **pinfu** `x₃` “means/force” — `Set<T>` (restraint on the prisoner).
  - Do **not** introduce a `Force` type in the TSV; always tie unary-`ka` typing to the appropriate `xᵢ`.

---

### 6. How this maps into `formal-gismu.tsv`

- **Two columns**:
  - Column 1: `word` – the gismu.
  - Column 2: `definition` – a single English sentence with all places in order, each annotated with its type rendered in **TypeScript** form.
- **Prenex** (unary-`ka` and comparison rows): at the **start** of the definition, declare typings **before** the gloss — **place** parameters (`x₁: …`, `x₂: …`, …) first, then generics (`T`, `U`, `V`, …); see §3.
- **Place annotation rules**:
  - Every place `xₙ` must, at its first mention, be followed by a parenthesized type phrase that corresponds to one of the type shapes above.
  - Use **TypeScript** syntax in parentheses (see §2 for Lojban abstractor mapping), for example:
    - `x₁ (Entity)`
    - `x₂ (Event)`
    - `x₃ (Proposition)`
    - `x₄ (Set<T>)` (typical bearer `x₁`; use the matching prenex when the gloss ties the unary-`ka` to `x₂`, etc.)
    - `x₂ (Amount of x₁)`
    - `x₃ (Scale<Set<T>>)` (with prenex `T` and bearer `x₁: …` as required by the gloss)
    - `x₂ (Set<Entity>)` — anonymous extension; optional English gloss “set of Entity” in prose (see §3 *Set* and §7).
    - `x₃ (Sequence<Text>)`
    - `x₁ (Group<Entity>)`
    - **Plural places:** §3 *Plural glosses*.
    - **Relations** (three flavors): §4. **Set/group and members** (prenex `T`, collection, unary-`ka` `Set<…>` / `Relation`): §4 and examples bridi, fadni, girzu, kampu, klesi, mupli, rirci.
    - **Comparisons** (dunli, mleca, dukse): §5 (*For comparisons* — prenex `T`, `x₁ (T)` / `x₂ (T)`). **zmadu**: §5 *Exception — relative more-than (zmadu)* — `V extends Entity`, `T extends V`, `U extends V`, `x₃ (Set<T | U>)`.
    - **Dimension through species/breed** (metric gismu, propulsion, medium, method, rules, material, type/form, force, taxon): the **§5** bullet list under those headings. Default unary-`ka` slot shape remains `Set<T>` (bearer `xᵢ: …` in the prenex) unless §5 gives an exception or §4 supplies a `Relation<…>` flavor.
    - **lanxe** `x₂` (mass of forces): §5 *Force* and §3 *Nested element types* (prenex `T extends Entity`, `Group<Set<Group<T>>>`).
  - Later mentions of the same `xₙ` in that definition need not repeat the type.
- **Abstractors**:
  - If the source place is primarily `nu`‑like, annotate as `(Event)`.
  - If it is primarily `du'u`‑like, annotate as `(Proposition)`.
  - If it is explicitly `ka` for one bearer, annotate as `Set<T>` (declare `T` and `xᵢ: …` in the prenex; see §3); for a relation between two (or more) places use `(Relation<xᵢ, xⱼ>)` (or more args), not a conjoined “trait of xᵢ and xⱼ” unary phrasing.
  - If it is explicitly `ni`, annotate as `(Amount of …)`.
  - If it is explicitly `si'o` as scale, annotate as `Scale<…>` or `Scale<Set<T>>` when the scale ranges over a unary-`ka` over bearer `xᵢ` (declare `T` and `xᵢ: …` in the prenex).
  - If the original just says “abstraction” and multiple abstractors are plausible, we may describe the place as “Abstraction: (Event) | (Proposition)” or similar.
  - **Metaphysics slot**: A place that is "metaphysics" (or "under metaphysics", "by standard or epistemology or metaphysics") is a propositional context and is typed as **(Proposition)**.

### 7. Rationale, reference rows, and migration status

Unary `ka` in `formal-gismu.tsv` is spelled `**Set<T>`** only; the **prenex** carries bearer places and `**extends`** constraints. That matches the opening note: sets, predicates, and unary `ka` are interchangeable in logic, but the dictionary still distinguishes **anonymous** extension (“a set of …”) from slots where the gloss fixes **which** place is characterized—**without** a `CkajiFacet`-style type constructor.

#### 7.1 What elaborators should preserve

1. **Which place is the bearer** — encoded by `**xᵢ: …` in the prenex** and by the English gloss, not by a second type parameter on `Set`.
2. **Anonymous vs predicative-of-`xᵢ` readings** — same `Set<T>` syntax; disambiguation is **gloss + prenex**, not a phantom brand.
3. **Extension vs intension** — some glosses are extensional (“the set of components”); others intensional (“how `x₁` is measured”). Elaboration may still **display** these differently.
4. **Lojban `lo'i` / `ka` / `lei`** — mapping TSV types to sumti shapes remains a separate surface question.

Types **do not** prove `ckaji(x₁, x₂)` in a given text; they document the dictionary’s place structure. In this file, `Set<U>` is the **§3** collection type, not necessarily `globalThis.Set`.

#### 7.2 Reference populations (**fadni**, **rirci**, **mupli**, **girzu**, comparisons, etc.)

The official **fadni** note: `x₃` is a **complete set** of members being compared; often `x₁ ∈ x₃` with one element sort: `x₁ (T)`, `x₃ (Set<T>)`. For a **wider** background class, use `**T extends U`** with `x₁ (T)`, `x₃ (Set<U>)` (and similar for the property place), as in `formal-gismu.tsv`. Other options: union inventories `Set<T | V | W>`, loose `Set<Entity>` plus prose, or **metadata outside** the parentheses for “`x₁` ∈ `x₃`” when validators need it.

#### 7.3 Open questions (tooling)

- `**Sequence<T>`** vs ordered lists **tied to a bearer** (**lanbi**, **liste**, **rilti**, **klama** routes, …): keep **orthogonal** to unary `ka` on another place, or add separate metadata?
- `**Taxon | Set<T>`** (§1): optional shorter editorial token for the second arm?
- Nested `**Group<Set<…>>**` (e.g. **lanxe**): extra tagging beyond nested `Set` for tools?
- **Non-`ckaji` parallels** (`simsa`, `ckini`, …): one metadata flag or per-gismu rules?

---

### 8. Alternative proposals: comparison and degree (zmadu, mleca, dunli, zenba, `ni`)

#### Problem 1: Inconsistent property typing across comparison gismu

The current TSV uses at least four different patterns for the "in property/quantity" slot across closely related gismu:


| gismu | x₃ type                  | pattern                               |
| ----- | ------------------------ | ------------------------------------- |
| zmadu | `Set<T | U>`             | property over union of compared types |
| mleca | `Set<U>` (U independent) | property over unrelated type          |
| dunli | `Relation<x₁, x₂>`       | binary relation                       |
| dukse | `Set<U>`                 | property over unrelated type          |
| traji | `Set<U>`                 | property over unrelated type          |
| mutce | `Set<U>`                 | property over unrelated type          |
| milxe | `Set<T>`                 | property over same bearer type        |
| darno | `Relation<x₁, x₂>`       | binary relation                       |
| jibni | `Relation<x₁, x₂>`       | binary relation                       |
| karbi | `Relation<x₂, x₃>`       | binary relation                       |


The "property" in comparison is always *the same semantic role* — the dimension in which comparison holds — yet it's typed inconsistently as `Set<T>`, `Set<U>`, `Set<T|U>`, or `Relation<x₁,x₂>`.

#### Problem 2: `Amount` / `ni` is opaque

Currently `Amount of x₃` appears in zmadu, mleca, zenba, cenba — but what *is* it, structurally? The user correctly identifies that `ni` is essentially a compaction of `klani`:

```
klani: x₁ (T) is measured by x₂ (Number) on scale x₃ (Scale<Set<T>>)
```

So `le ni ce'u clani` = "the degree-of-longness" is a function from entities to numbers on the scale associated with `clani`. When zmadu says "by amount x₄", that x₄ is a *number on the scale associated with the property x₃*. But the current `Amount of x₃` doesn't express this connection.

---

#### Proposal A: Minimal unification — shared measurement domain `V`

**Principle:** All comparison/degree gismu share one pattern. The property is `Set<V>` where `V` is the measurement domain (a supertype that both x₁ and x₂ belong to). `Amount` stays opaque but is always tied to the property.

**TypeScript model:**

```ts
// V = measurement domain (the type of things the property applies to)
// T, U = specific types of the compared entities (both extend V)
// The property Set<V> applies to all V-things, not just x₁ and x₂

// zmadu signature:
function zmadu<V extends Entity, T extends V, U extends V>(
  x1: T,           // the greater
  x2: U,           // the lesser
  x3: Set<V>,      // the dimension (applicable to T, U, and any other V)
  x4: Amount<x3>   // excess on x3's natural scale
): void

// Same pattern for mleca (flip x1/x2 semantics), dunli (x4 = 0), etc.
```

**Concrete TSV changes:**


| gismu | current                                                                                          | proposed                                                                                     |
| ----- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| zmadu | `V extends Entity, T extends V, U extends V. x₁ (T), x₂ (U), x₃ (Set<T | U>), x₄ (Amount of x₃)` | `V extends Entity, T extends V, U extends V. x₁ (T), x₂ (U), x₃ (Set<V>), x₄ (Amount of x₃)` |
| mleca | `T extends Entity, U extends Entity. x₁ (T), x₂ (T), x₃ (Set<U>), x₄ (Amount of x₃)`             | `V extends Entity, T extends V, U extends V. x₁ (T), x₂ (U), x₃ (Set<V>), x₄ (Amount of x₃)` |
| dunli | `T extends Entity. x₁ (T), x₂ (T), x₃ (Relation<x₁, x₂>)`                                        | `V extends Entity, T extends V, U extends V. x₁ (T), x₂ (U), x₃ (Set<V>)`                    |
| dukse | `T extends Entity, U extends Entity. x₁ (T), x₂ (T), x₃ (Set<U>)`                                | `V extends Entity, T extends V. x₁ (T), x₂ (T), x₃ (Set<V>)`                                 |
| traji | (complex)                                                                                        | `V extends Entity, T extends V. x₁ (T), x₂ (Set<V>), x₃ (Set<V>), x₄ (Set<T>)`               |


**Rationale for `Set<V>` over `Set<T | U>` or `Relation`:** The property "height" doesn't exist only for the two things being compared. It's a property of an entire domain of measurable things. `T | U` is an artificial restriction; `Relation<x₁, x₂>` conflates the property with the comparison itself.

**For dunli specifically:** The current `Relation<x₁, x₂>` is arguably wrong — "tallness" is not a *relation between* Alice and Bob; it's a *property of each* that happens to yield equal values. The comparison/equality is the *predicate* (dunli itself), not the dimension.

**Advantage:** Minimal change to the system. Disadvantage: `Amount` remains a black box.

---

#### Proposal B: Decompose `ni` via `klani` — introduce `Quantity<P>`

**Principle:** `ni` is the quantitative dual of `ka`. Where `ka P` gives you the qualitative set `Set<V>`, `ni P` gives you a number *on the scale naturally associated with P*. Formalize this connection.

**TypeScript model:**

```ts
// The bridge between ka and ni, grounded in klani:
//
// klani: x₁ (T) is measured by x₂ (Number) on scale x₃ (Scale<Set<T>>)
//
// Given a property P: Set<V>, its "natural scale" is Scale<Set<V>>
// Applying ni to P for entity e gives: the Number from klani(e, ?, Scale<P>)
//
// Quantity<P> = a number measured on P's natural scale

type Quantity<P extends Set<any>> = {
  value: Number
  scale: Scale<P>    // inherited from the property
}

// In practice this is a Number, but the type parameter P tracks
// which property/dimension the number belongs to.
// This prevents mixing "5 meters" with "5 kilograms".

// zmadu with Quantity:
function zmadu<V extends Entity, T extends V, U extends V>(
  x1: T,
  x2: U,
  x3: Set<V>,            // ka: the dimension
  x4: Quantity<Set<V>>   // ni: excess, on x3's scale
): void

// Equivalent: x₄ is the difference ni(x₃, x₁) − ni(x₃, x₂)
// where ni(P, e) = klani(e, _, Scale<P>).value
```

**How this maps to Lojban:**

- `le ka ce'u clani` → `Set<V>` where V = physical objects — the *qualitative* property
- `le ni ce'u clani` → `Quantity<Set<V>>` — the *quantitative* evaluation of the same property
- `x₁ zmadu x₂ le ka clani li mu` → "x₁ exceeds x₂ in tallness by 5 (on tallness's scale)"
- The x₄ `li mu` is `Quantity<Set<V>>`: the number 5, on the scale of `clani`

**Proposed type-system.md §4 addition:**

> **Quantity (ni decomposition).** Lojban `ni` applied to a unary property `P : Set<V>` produces a *quantity* — a number measured on the scale naturally associated with P. We write this as `**Quantity<P>`** in TypeScript:
>
> ```ts
> type Quantity<P extends Set<any>> = Number  // on Scale<P>
> ```
>
> `Quantity<P>` is the type of `le ni ce'u broda` when `broda`'s unary-`ka` is `P : Set<V>`. It is grounded in **klani**: `klani(e, n, Scale<P>)` means entity `e` has value `n` on `P`'s scale; `Quantity<P>` is that `n`. In the TSV, write `x₄ (Quantity<x₃>)` or equivalently `x₄ (Number)` with a note that the scale comes from x₃. The existing `Amount of xₙ` notation becomes sugar for `Quantity<typeof xₙ>`.

**Concrete TSV examples:**

```
zmadu  V extends Entity, T extends V, U extends V. x₁ (T) exceeds x₂ (U) 
       in property x₃ (Set<V>) by amount x₄ (Quantity<x₃>)

zenba  x₁: T, T extends Entity. x₁ increases in property x₂ (Set<T>) 
       by amount x₃ (Quantity<x₂>)

klani  x₁: T, T extends Entity. x₁ is measured as x₂ (Quantity<x₃>) 
       on scale x₃ (Scale<Set<T>>)
```

**Advantage:** Makes the `ni`-to-`klani` connection explicit; prevents mixing quantities from different scales. **Disadvantage:** Adds a new type constructor.

---

#### Proposal C: Introduce `Dimension<V>` — the ka/ni pair as a first-class type

**Principle:** Comparison gismu don't just need a *set* — they need a *measurable dimension*. A dimension is a property that comes with an inherent ordering and scale. This is the conceptual unit that `ka/ni` jointly express in comparison contexts.

**TypeScript model:**

```ts
// A Dimension is a Set<V> that additionally carries:
//   - a natural ordering on V (some V-things have "more" of it than others)
//   - a measurement scale (so differences can be quantified)
//
// This is NOT a new type constructor separate from Set<V>.
// It is a REFINEMENT: Dimension<V> extends Set<V> with measurement structure.

interface Dimension<V> extends Set<V> {
  // Conceptual: evaluate this dimension for entity e
  // Returns a position on the dimension's natural scale
  measure(e: V): Number  // on Scale<this>
  
  // The natural scale of this dimension
  scale: Scale<Set<V>>
  
  // Induced comparison: 
  // compare(a, b) = measure(a) - measure(b)
  compare(a: V, b: V): Number
}

// Quantity is the output type of measure():
type Quantity<D extends Dimension<any>> = Number  // on D.scale

// Now the comparison family falls out naturally:

// zmadu: x₁ exceeds x₂ as measured by dimension x₃
function zmadu<V extends Entity, T extends V, U extends V>(
  x1: T,
  x2: U,
  x3: Dimension<V>,     // the measurable property
  x4: Quantity<typeof x3>  // = x3.measure(x1) - x3.measure(x2)
): void

// dunli: x₁ equals x₂ as measured by dimension x₃
function dunli<V extends Entity, T extends V, U extends V>(
  x1: T,
  x2: U,
  x3: Dimension<V>      // x3.measure(x1) === x3.measure(x2)
): void

// zenba: x₁'s value on dimension x₂ increases
function zenba<V extends Entity, T extends V>(
  x1: T,
  x2: Dimension<V>,
  x3: Quantity<typeof x2>  // the increment
): void

// klani: direct measurement on a dimension
function klani<V extends Entity, T extends V>(
  x1: T,
  x2: Quantity<typeof x3>,  // = x3.measure(x1)
  x3: Dimension<V>          // which is also Scale<Set<V>>
): void
```

**Why this matters — the darno/jibni problem:**

`darno` (far) and `jibni` (near) are currently typed as `Relation<x₁, x₂>`, which *conflates the dimension with the comparison*. Under Proposal C:

```ts
// darno: x₁ is far from x₂ on dimension x₃
function darno<V extends Entity, T extends V, U extends V>(
  x1: T,
  x2: U,
  x3: Dimension<V>  // e.g. spatial distance, cultural distance, etc.
): void
```

The "distance" is a dimension that can be measured for any pair. The *predicate* `darno` says that `x3.compare(x1, x2)` is large. This is exactly parallel to `zmadu` saying that `x3.measure(x1) > x3.measure(x2)`.

**When Relation is actually right:** For `karbi` (compare), x₄ is genuinely different — it's the *method or criterion* of comparison, not just a dimension. And for kinship gismu (dzena), `Relation` captures the bond correctly. The point is that *degree/comparison* gismu should not use `Relation` for what is really a `Dimension`.

**Proposed type-system.md §2 addition:**

> ```ts
> type Dimension<V> = Set<V>  // with implicit measurement structure
> ```
>
> **Dimension** refines **Set**: a `Dimension<V>` is a `Set<V>` that additionally carries a natural ordering and measurement scale over `V`. In Lojban, the combined `ka/ni` reading of a comparison property corresponds to `Dimension`. In the TSV, `Dimension<V>` is written as `Set<V>` when the gismu is non-comparative (the extra structure is latent), or as `Dimension<V>` when the gismu is in the comparison family (zmadu, mleca, dunli, zenba, jdika, cenba, traji, mutce, milxe, dukse, darno, jibni, bancu).
>
> A **Quantity** is the numeric output of evaluating a Dimension for an entity:
>
> ```ts
> type Quantity<D extends Dimension<any>> = Number  // on Scale<D>
> ```
>
> In the TSV, the existing `Amount of xₙ` notation becomes `Quantity<xₙ>`.
>
> The link to **klani**: `klani(e, n, Scale<D>)` means entity `e` measures as `n` on dimension `D`. `Quantity<D>` is that `n`. Every comparison gismu's "by amount" place is `Quantity<x₃>` where x₃ is the dimension place.

**Full unified table under Proposal C:**


| gismu | proposed signature                                                                                                                      |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------- |
| zmadu | `V extends Entity, T extends V, U extends V. x₁ (T) exceeds x₂ (U) in x₃ (Dimension<V>) by x₄ (Quantity<x₃>)`                           |
| mleca | `V extends Entity, T extends V, U extends V. x₁ (T) is less than x₂ (U) in x₃ (Dimension<V>) by x₄ (Quantity<x₃>)`                      |
| dunli | `V extends Entity, T extends V, U extends V. x₁ (T) equals x₂ (U) in x₃ (Dimension<V>)`                                                 |
| zenba | `V extends Entity, T extends V. x₁ (T) increases in x₂ (Dimension<V>) by x₃ (Quantity<x₂>)`                                             |
| jdika | `V extends Entity, T extends V. x₁ (T) decreases in x₂ (Dimension<V>) by x₃ (Quantity<x₂>)`                                             |
| cenba | `V extends Entity, T extends V. x₁ (T) varies in x₂ (Dimension<V>) by x₃ (Quantity<x₂>) under x₄ (Event)`                               |
| traji | `V extends Entity, T extends V, W extends V. x₁ (T) is superlative in x₂ (Dimension<V>) at extreme x₃ (Dimension<V>) among x₄ (Set<W>)` |
| mutce | `V extends Entity, T extends V. x₁ (T) is extreme in x₂ (Dimension<V>) towards x₃ (Entity)`                                             |
| milxe | `V extends Entity, T extends V. x₁ (T) is mild in x₂ (Dimension<V>)`                                                                    |
| dukse | `V extends Entity, T extends V. x₁ (T) is excessive in x₂ (T) by standard x₃ (Dimension<V>)`                                            |
| darno | `V extends Entity, T extends V, U extends V. x₁ (T) is far from x₂ (U) in x₃ (Dimension<V>)`                                            |
| jibni | `V extends Entity, T extends V, U extends V. x₁ (T) is near x₂ (U) in x₃ (Dimension<V>)`                                                |
| bancu | `V extends Entity, T extends V. x₁ (T) exceeds limit x₂ (Entity) from x₃ (Entity) in x₄ (Dimension<V>)`                                 |
| klani | `V extends Entity, T extends V. x₁ (T) is measured as x₂ (Quantity<x₃>) on x₃ (Dimension<V>)`                                           |


**Advantage:** Maximum conceptual clarity; makes `ka/ni` duality explicit; unifies the entire comparison family; correctly distinguishes dimension-from-relation. **Disadvantage:** Adds `Dimension<V>` and `Quantity<D>` as new type constructors; requires updating many rows.

---

#### My recommendation

**Proposal C** is the most intellectually honest and would resolve the most inconsistencies, but it's a large change. A pragmatic path would be:

1. **Adopt Proposal A immediately** — just change `Set<T|U>` to `Set<V>` and unify the prenex pattern across comparison gismu. This fixes the worst inconsistency with minimal disruption.
2. **Adopt Proposal B's `Quantity`** to replace the opaque `Amount of xₙ` — this is a relatively small addition that grounds `ni` in `klani`.
3. **Consider Proposal C's `Dimension`** as a longer-term direction — it could start as a conceptual note ("in comparison gismu, `Set<V>` implicitly carries measurement structure") without requiring a new TSV keyword, and graduate to an explicit `Dimension<V>` annotation later.

## ‘Core Lojban’ essay

Large parts of English can be described as expressing relations. In that regard English (despite being often ambiguous and having complex grammar) can still be used to relay the basics of Lojban. At first let's try to describe a portion of the English language using Lojban terms:

"I love you" is a bridi.
"love" is its selbri
"I" and "you" make up its terbri.

In layment terms:
* bridi is the relationship
* selbri is the relation
* terbri is a sequence of arguments in the relationship

Rephrasing in math terms:
* bridi is the expression with a function like `f(1,2)`
* selbri is the function `f(x,y)`
* terbri is the sequence of arguments `1,2`
The return value of the function can be thought of as always returning `true`. Consider a function `it is true that x is less than y`.

Rephrasing in linguistic terms:
* bridi is a clause
* selbri is the content verb, predicate
* terbri is a sequence of arguments, roles in the clause

---

### 9. Predicate logic and plural logic in Lojban and TypeScript

Lojban was designed with predicate logic as its semantic backbone. TypeScript's type system is independently expressive enough to encode logical quantification through generics, conditional types, and mapped types. This chapter lays out the parallels and divergences across three layers of logic.

---

#### 9.1 First-order predicate logic

First-order logic (FOL) quantifies over **individuals** and applies **predicates** (selbri) to them. This is the default logical layer of Lojban.

##### Atomic formulas

| Logic | Lojban | TypeScript |
|-------|--------|------------|
| P(a) | `la .alis. klama` | `klama("alice")` — a type guard or function returning `true` |
| R(a, b) | `la .alis. prami la .bob.` | `prami("alice", "bob")` |
| Individual variable x | `da` | type parameter `T` |
| Individual constant a | `la .alis.` | literal type `"alice"` |
| n-place predicate | selbri with n places | `(...args: [T₁, T₂, …Tₙ]) => boolean` |

A selbri **is** a predicate. `prami` with place structure `x₁ prami x₂` is a binary predicate; the bridi `la .alis. prami la .bob.` is an atomic formula asserting that the predicate holds of two constants.

```ts
// An n-place selbri is a predicate over a tuple of argument types
type Selbri<Args extends any[]> = (...args: Args) => true

type Prami = Selbri<[Entity, Entity]>
// prami(x₁, x₂) — x₁ loves x₂
```

##### Quantifiers

Lojban exposes quantifiers through the **prenex** (before `zo'u`) and through **da/de/di** as logical variables.

| Logic | Lojban | Gloss |
|-------|--------|-------|
| ∃x P(x) | `su'o da zo'u da broda` | "there is at least one x such that x broda" |
| ∀x P(x) | `ro da zo'u da broda` | "for all x, x broda" |
| ∀x (Q(x) → P(x)) | `ro da poi brode zo'u da broda` | "for all x that are brode, x broda" |
| ∃x (Q(x) ∧ P(x)) | `su'o da poi brode zo'u da broda` | "there is an x that is brode such that x broda" |
| ∀x ∃y R(x,y) | `ro da su'o de zo'u da broda de` | "for all x there is a y such that x broda y" |

Note that `poi` (restrictive relative clause) produces the classical restricted-quantifier pattern: `ro da poi P` = ∀x[P(x) → …] and `su'o da poi P` = ∃x[P(x) ∧ …].

In TypeScript, generics express universal quantification:

```ts
// ∀T: if T is Person, then T is Mortal
// "ro da poi prenu zo'u da morsi"
type AllPersonsAreMortal = <T extends Person>(x: T) => Mortal

// Existential quantification via `infer` in conditional types
// ∃T: T extends Dog ∧ T bites John
// "su'o da poi gerku zo'u da batci la .djan."
type SomeDogBitesJohn = Dog & { bitesJohn: true }
```

TypeScript's `extends` constraint in `<T extends P>` plays the role of `poi` in `ro da poi P` — it restricts the domain of quantification.

##### Connectives

| Logic | Lojban (bridi-tail) | Lojban (prenex / forethought) | TypeScript type-level |
|-------|---------------------|-------------------------------|----------------------|
| ¬P | `naku zo'u P` / `na broda` | `naku zo'u …` | `Not<P>` via conditional: `P extends true ? false : true` |
| P ∧ Q | `ge P gi Q` | `ge … gi …` | `P & Q` (intersection) |
| P ∨ Q | `ga P gi Q` | `ga … gi …` | `P \| Q` (union) |
| P → Q | `ganai P gi Q` | `ganai … gi …` | `P extends true ? Q : true` (conditional type) |
| P ↔ Q | `go P gi Q` | `go … gi …` | `Equal<P, Q>` |

Lojban connectives come in four series: **.a/.e/.o/.u** (sumti), **ja/je/jo/ju** (tanru), **ga/ge/go/gu** (forethought bridi), and **gi'a/gi'e/gi'o/gi'u** (bridi-tail). All are logically equivalent; they differ only in what grammatical unit they join.

```ts
// Conjunction: ge ... gi ...
// "ge la .alis. klama gi la .bob. klama" = Alice goes AND Bob goes
type BothGo = Klama<"alice"> & Klama<"bob">

// Disjunction: ga ... gi ...
// "ga la .alis. klama gi la .bob. klama" = Alice goes OR Bob goes
type EitherGoes = Klama<"alice"> | Klama<"bob">

// Negation: naku
// TypeScript: never = ⊥ (false), unknown = ⊤ (true)
type Not<P extends boolean> = P extends true ? false : true
```

##### The prenex as type-parameter list

The Lojban prenex directly mirrors a TypeScript generic parameter list:

```
Lojban:   ro da poi prenu su'o de poi zdani zo'u  da se zdani de
Logic:    ∀x[person(x) → ∃y[house(y) ∧ has-home(x, y)]]
```

```ts
// The prenex "ro da poi prenu su'o de poi zdani" becomes:
function seZdani<
  X extends Person,   // ro da poi prenu
>(
  x: X                // da
): { home: House }    // su'o de poi zdani zo'u da se zdani de
```

The prenex in `formal-gismu.tsv` (§3, §6) uses this same structural correspondence: `T extends Entity` in the prenex is the TSV analogue of `ro da poi xatra` (for all x that are entities).

---

#### 9.2 Second-order predicate logic

Second-order logic (SOL) extends FOL by allowing quantification over **predicates and functions**, not just individuals. Where FOL asks "is there an individual such that …", SOL asks "is there a **property** such that …".

##### Predicate variables in Lojban

Lojban has dedicated **second-order** variables: **bu'a**, **bu'e**, **bu'i** — these range over selbri (predicates), just as da/de/di range over individuals.

| Logic | Lojban | Gloss |
|-------|--------|-------|
| ∃P P(a) | `su'o bu'a zo'u la .alis. bu'a` | "there is some property that Alice has" |
| ∀P (P(a) → P(b)) | `ro bu'a zo'u ganai la .alis. bu'a gi la .bob. bu'a` | "every property Alice has, Bob has too" |
| ∀P ∃x P(x) | `ro bu'a zo'u su'o da zo'u da bu'a` | "for every property, something has it" |
| ∃P ∀x P(x) | `su'o bu'a zo'u ro da zo'u da bu'a` | "there is a property that everything has" |

The Leibniz identity principle ("x = y iff they share all properties") is directly statable:

```
ro bu'a zo'u go la .alis. bu'a gi la .bob. bu'a
```

"For every property bu'a: Alice bu'a if and only if Bob bu'a" — Alice and Bob are identical.

##### Second-order quantification in TypeScript

TypeScript does not have native higher-kinded types (type constructors as parameters), but its type system can encode second-order patterns:

**Quantifying over predicates via mapped types:**

```ts
// ∀P: P(alice) → P(bob)
// "ro bu'a zo'u ganai la .alis. bu'a gi la .bob. bu'a"
// If alice and bob satisfy all the same predicates, they are indiscernible.
type Indiscernible<A, B> = {
  [K in keyof A]: K extends keyof B ? A[K] extends B[K] ? true : false : false
} extends Record<string, true> ? true : false
```

**Existential abstraction (∃P) via `infer`:**

```ts
// ∃P: P(x) ∧ P(y) — there is some common property
// "su'o bu'a zo'u ge ko'a bu'a gi ko'e bu'a"
type ShareSomeProperty<A, B> =
  (A | B) extends infer P ? [A, B] extends [P, P] ? true : false : false
```

**Emulating higher-kinded types for predicate quantification:**

```ts
// A "predicate" as a type-level function: takes a type, returns boolean
interface Predicate {
  readonly _input: unknown
  readonly _output: boolean
}

// Apply a predicate to a type
type Apply<F extends Predicate, A> =
  (F & { readonly _input: A })["_output"]

// ∀P ∃x P(x) — for every predicate, something satisfies it
// "ro bu'a zo'u su'o da zo'u da bu'a"
// Not directly expressible as a single type, but the quantifier structure
// mirrors Lojban's prenex: bu'a in the outer scope, da in the inner.
```

##### Connection to the type system (§3, §4)

Second-order quantification is already implicit in `formal-gismu.tsv` whenever a place is typed `Set<T>` with `T` in the prenex. The TSV prenex `T extends Entity` universally quantifies over types (sorts of individuals), and `Set<T>` is a predicate (property) parameterized by that sort — a second-order object. The `bu'a`/`bu'e`/`bu'i` variables of Lojban are the linguistic surface for the same move: treating a selbri as a value that can be bound, quantified, and passed as an argument.

| Layer | Lojban | TypeScript | TSV |
|-------|--------|------------|-----|
| Quantify over individuals | `da`, `de`, `di` | `T`, `U` (type params) | `x₁ (T)` |
| Quantify over predicates | `bu'a`, `bu'e`, `bu'i` | mapped types, `infer` | `Set<T>` as a place type |
| Pass a predicate as argument | `le ka ce'u broda` | `(x: T) => boolean` | `Set<T>` / `Relation<…>` |
| Predicate identity | `du bu'a` | `type Eq<F, G> = …` | — |

The unary-`ka` pattern from §3 — `x₄ (Set<T>)` with prenex `T extends Entity` — is exactly a second-order argument slot: the bridi receives a **property** as one of its arguments.

---

#### 9.3 Plural logic

Plural logic extends FOL with **plural terms** that can denote multiple individuals at once, and with predicates that apply to pluralities **collectively** rather than to each individual **distributively**. This is the logical foundation for the distinction between "the students each passed" (distributive) and "the students surrounded the building" (collective).

##### The problem plural logic solves

In FOL, every variable denotes a single individual. To say "some critics admire only one another", FOL must resort to sets or second-order quantification. Plural logic adds **plural variables** (xx, yy) that directly denote **some things** without reifying them into a set-object.

##### Lojban's gadri system as plural logic

Lojban encodes the distributive/collective distinction through its article (**gadri**) system:

| Gadri | Lojban | Logic | Predication mode |
|-------|--------|-------|-----------------|
| `lo` | `lo prenu` | individual(s), distributively | Each satisfies the predicate separately |
| `loi` | `loi prenu` | mass of persons | The mass collectively satisfies the predicate |
| `lu'o` | `lu'o ko'a e ko'e` | mass formed from named individuals | Collective from specific referents |
| `lu'i` | `lu'i lo prenu` | the set of persons | The set-as-object (reified plurality) |
| `lo'i` | `lo'i prenu` | the set of persons | Equivalent to `lu'i`; set-level predication |

**Distributive vs collective predication:**

```
lo prenu cu bevri le pipno
  "Each person carries the piano" — distributive: ∀x[person(x) → carries(x, piano)]

loi prenu cu bevri le pipno
  "The people (together) carry the piano" — collective: carries(MASS(persons), piano)
```

The same selbri (`bevri`) applies in both cases, but `lo` distributes it to individuals while `loi` feeds the predicate a collective mass. This is plural logic in action: the collective reading cannot be reduced to a conjunction of individual predications (no single person carries the piano).

**Lojban's `loi` as a plural term:**

```
loi sonci cu gunta la .stalingrad.
  "The soldiers (as a body) attack Stalingrad"
  — collective action; no individual soldier "attacks Stalingrad" alone

lo sonci cu se xarci lo ciblu
  "Each soldier is armed with blood" — nonsensical distributive reading
  vs.
loi sonci cu se xarci lo ciblu
  "The soldiers (as a body) are bloodied/armed-with-blood" — collective state
```

**Quantifying over pluralities:**

```
su'o loi prenu cu bevri le pipno
  "Some people (collectively) carry the piano"
  — ∃xx [people(xx) ∧ carry(xx, piano)]  where xx is a plural variable

re loi prenu cu bevri le pipno
  "Two-membered group(s) of people carry the piano"
```

##### TypeScript encoding of plural logic

TypeScript's type system maps onto plural logic through its collection types, distributive conditional types, and the `Group<T>` / `Set<T>` distinction from §3:

| Plural logic concept | Lojban | TypeScript |
|---------------------|--------|------------|
| Individual term | `lo broda` | `T` |
| Plural term (collective) | `loi broda` | `Group<T>` |
| Set term (reified) | `lo'i broda` / `lu'i lo broda` | `Set<T>` |
| Distributive predication | `lo broda cu brode` | `type Dist<P, T> = T extends any ? P<T> : never` |
| Collective predication | `loi broda cu brode` | `(g: Group<T>) => boolean` |
| Plural quantification ∃xx | `su'o loi broda` | `Group<T>` existentially |

**Distributive conditional types mirror `lo`:**

```ts
// TypeScript distributes over unions in conditional types —
// this is the type-level analogue of lo (distributive gadri).
//
// "lo remna cu morsi" = each human dies
// Applied to a union of individuals:
type Mortals = ApplyDistributively<Mortal, Alice | Bob | Carol>
// = Mortal<Alice> | Mortal<Bob> | Mortal<Carol>

// Implementation: conditional types distribute automatically
type ApplyDistributively<P, T> = T extends any ? P & T : never
```

**`Group<T>` mirrors `loi` (collective, non-distributive):**

```ts
// "loi prenu cu bevri le pipno"
// The predicate applies to the group as a whole, not to each member.
// In TypeScript: the function takes Group<Person>, not Person.

function bevri(bearer: Group<Person>, cargo: Entity): true
// vs.
function bevriDistributive(bearer: Person, cargo: Entity): true

// The type system distinguishes these: Group<Person> ≠ Person
// Just as loi prenu ≠ lo prenu in Lojban.
```

**Non-distributive wrapping to suppress distribution:**

```ts
// TypeScript trick: [T] extends [U] suppresses union distribution.
// This is the type-level analogue of loi vs lo.

// Distributive (lo):
type IsEntity<T> = T extends Entity ? true : false
type Test1 = IsEntity<Alice | Bob>  // = true | true (distributed)

// Non-distributive (loi):
type IsEntityCollective<T> = [T] extends [Entity] ? true : false
type Test2 = IsEntityCollective<Alice | Bob>  // = true (collective check)
```

**`Set<T>` mirrors `lo'i` / `lu'i` (reified set):**

```ts
// "lu'i lo prenu" = the set of persons, as an object
// Set<Person> is a first-class value that can itself be predicated over.
// This crosses from plural logic into second-order territory:
// the set is a reified predicate-extension.

type PersonSet = Set<Person>  // lo'i prenu / lu'i lo prenu
// PersonSet is now an Entity-like object, not a plurality.
```

##### Relationship to §3 collection types

The `Group<T>`, `Set<T>`, and `Sequence<T>` types from §3 correspond to different modes of plural reference:

| §3 Type | Plural logic role | Lojban gadri | Predication |
|---------|------------------|--------------|-------------|
| `T` | singular individual | `lo` (one) | distributive to that individual |
| `T₁ \| T₂ \| …` | union of individuals | `lo` (multiple, distributive) | distributive over each |
| `Group<T>` | mass / collective | `loi` / `lei` / `lai` | collective — the group as agent |
| `Set<T>` | reified extension / set | `lo'i` / `lu'i` | set-level — the set as object |
| `Sequence<T>` | ordered plurality | `lo porsi` | order-sensitive collective |

The `§3` rule that "plural count" places use `Group<T>` (e.g. "pieces x₃", "fragments x₂") is the TSV's way of marking collective plural reference — the same semantic role as `loi` in Lojban.

##### Collective predication that FOL cannot express

Some Lojban bridi are inherently plural and resist first-order paraphrase:

```
loi ci prenu cu simxu le ka prami
  "Three people mutually love each other"
  — the predicate simxu applies to the group; there is no single individual
    of whom "simxu le ka prami" is true.
```

```ts
// simxu: x₁ (Group<T>) mutually satisfies x₂ (Relation<NonMatchingPair<T>>)
// From §4 flavor 3: the relation is over distinct pairs from the group.
// This is irreducibly plural: simxu takes Group<T>, not T.

function simxu<T extends Entity>(
  x1: Group<T>,
  x2: Relation<NonMatchingPair<T>>
): true
```

The `NonMatchingPair<T>` from §4 encodes the "each two distinct members" quantification that is characteristic of plural logic: a **binary predicate distributed over pairs** drawn from a plural term.

---

### 10. Relational algebra in Lojban and TypeScript

Relational algebra — the theoretical foundation of relational databases — operates on **relations** (tables) and produces new relations. Since a relation schema is fundamentally an n-ary predicate, and Lojban selbri are n-ary predicates with positional arguments, the mapping is direct. This chapter shows how each core relational-algebra operation is expressed in Lojban and in TypeScript's type system.

#### 10.1 Relations as predicates

A database table is a set of tuples that satisfy a predicate. A Lojban selbri **is** such a predicate: its place structure defines the schema.

**Example — `vecnu`:**

The gismu `vecnu` has place structure: x₁ [seller] sells x₂ [goods/service/commodity] to buyer x₃ for amount/cost/expense x₄.

| Relational concept | Lojban | TypeScript |
|---|---|---|
| Relation schema | selbri place structure | `interface` or `type` with named fields |
| Tuple (row) | a true bridi — one instantiation of the selbri | a value of the record type |
| Attribute (column) | a numbered place (x₁, x₂, …) | a property key |
| Relation instance (table) | the set of all true bridi for that selbri | `Set<Row>` or `Array<Row>` |

```ts
// vecnu: x₁ [seller] sells x₂ [goods] to x₃ [buyer] for x₄ [price]
type VecnuRow = {
  x1: Entity   // seller
  x2: Entity   // goods/service/commodity
  x3: Entity   // buyer
  x4: Number   // amount/cost/expense
}

type VecnuRelation = Set<VecnuRow>
```

A general relation over a selbri with n places:

```ts
type Relation<Schema extends Record<string, any>> = Set<Schema>

// bridi: x₁ (du'u) is a predicate relationship
//        with relation x₂ among arguments x₃
// A relation instance is lo'i bridi be lo ka vecnu
// — the set of predications with relation vecnu.
```

In Lojban, `lo'i bridi be lo ka vecnu` ("the set of predications with the relation vecnu") denotes the extension of `vecnu` — its table.

#### 10.2 Core operations

##### Selection (σ) — filtering rows by a predicate

Selection keeps only the tuples that satisfy a condition. In Lojban, the restrictive relative clause `poi` is the native selection mechanism: `lo vecnu poi ...` restricts to those `vecnu`-tuples that satisfy the subordinate bridi.

| | Expression |
|---|---|
| Algebra | σ_{x₃ = Alice}(vecnu) |
| SQL | `SELECT * FROM vecnu WHERE buyer = 'Alice'` |
| Lojban | `lo bridi be lo ka vecnu ku poi le te vecnu cu du la .alis.` |
| | (the predications with relation vecnu such that the buyer equals Alice) |

The simpler everyday Lojban for "who sells what to Alice?" is a question with `ma`:

```
ma vecnu ma la .alis.
  — what₁ sells what₂ to Alice?
```

Here both x₁ and x₂ are questioned with `ma`; `la .alis.` fills x₃ (buyer). Note that `vecnu` has x₃ as the buyer, **not** x₂ — the place structure is (seller, goods, buyer, price).

To ask "what did Alice buy?" (projecting to goods only):

```
ma se vecnu fi la .alis.
  — what (goods, now x₁ via se) is sold, to Alice (x₃ via fi)?

se vecnu: x₁ [goods] is sold by x₂ [seller] to x₃ [buyer] for x₄ [price]
fi places la .alis. in the 3rd slot (buyer).
```

```ts
// Selection: filter rows by predicate
function select<Row>(
  relation: Set<Row>,
  predicate: (row: Row) => boolean
): Set<Row> {
  return new Set([...relation].filter(predicate))
}

// σ_{buyer = "alice"}(vecnu)
const alicePurchases = select(vecnu, row => row.x3 === "alice")
```

At the type level, TypeScript can express conditional filtering:

```ts
type SelectWhere<
  Rows extends readonly any[],
  Pred extends (r: any) => boolean
> = Rows extends [infer Head, ...infer Tail]
  ? Pred extends (r: Head) => true
    ? [Head, ...SelectWhere<Tail, Pred>]
    : SelectWhere<Tail, Pred>
  : []
```

##### Projection (π) — selecting columns

Projection discards unwanted attributes. In Lojban, you achieve this by querying only specific places with `ma` or by referring to derived places via `se`/`te`/`ve`/`xe` conversions.

| | Expression |
|---|---|
| Algebra | π_{x₂}(σ_{x₃ = Alice}(vecnu)) |
| SQL | `SELECT goods FROM vecnu WHERE buyer = 'Alice'` |
| Lojban | `ma se vecnu fi la .alis.` |
| | (`ma` asks for x₁ of `se vecnu` = goods, `fi` fills x₃ = buyer with Alice) |

```ts
// Projection: pick specific keys
type Project<Row, Keys extends keyof Row> = Pick<Row, Keys>

// π_{x2}(vecnu) — project to goods only
type GoodsOnly = Project<VecnuRow, "x2">  // { x2: Entity }
```

##### Rename (ρ) — changing attribute names

Renaming maps attribute names without changing data. In Lojban, renaming is not a native concept — selbri have fixed positional places. The closest operation is using `se`/`te`/`ve`/`xe` to **reorder** places (a permutation, not a free rename), or introducing a new selbri via `lujvo` composition that re-glosses the places.

```ts
// Rename: map keys
type Rename<Row, Map extends Record<string, string>> = {
  [K in keyof Row as K extends keyof Map ? Map[K] : K]: Row[K]
}

// ρ_{goods→item}(vecnu)
type Renamed = Rename<VecnuRow, { x2: "item" }>
// { x1: Entity, item: Entity, x3: Entity, x4: Number }
```

In Lojban, the `se`/`te`/`ve`/`xe` conversions permute places:

```
se vecnu: x₁ [goods] is sold by x₂ [seller] to x₃ [buyer] for x₄ [price]
te vecnu: x₁ [buyer] buys x₂ [goods] from x₃ [seller] for x₄ [price]
ve vecnu: x₁ [price] is the cost of x₂ [goods] sold by x₃ [buyer's POV] ...
```

These are not free renames but **place swaps** (each `se`/`te`/`ve`/`xe` exchanges x₁ with xₙ). The lujvo `terve'u` (from `te vecnu`) lexicalizes the buyer-first reordering.

##### Union (∪) — combining rows

Union combines all distinct tuples from two union-compatible relations. In Lojban, `jo'e` is the set-union connective:

```
lo'i bridi be lo ka vecnu ku jo'e lo'i bridi be lo ka dunda
  — the set of sell-predications unioned with the set of give-predications
```

Note: `jo'e` is set union. `joi` is mass conjunction ("mixed together as a mass"), which is a **different** operation — it forms a `Group<T>`, not a `Set<T>`.

| Lojban connective | Meaning | Relational operation |
|---|---|---|
| `jo'e` | set union | ∪ |
| `ku'a` | set intersection | ∩ |
| `kei'i` (experimental) | set difference | − |

```ts
// Union: combine two relations of the same schema
function union<Row>(r1: Set<Row>, r2: Set<Row>): Set<Row> {
  return new Set([...r1, ...r2])
}
```

At the type level:

```ts
type Union<A, B> = A | B
type Intersection<A, B> = A & B
type Difference<A, B> = A extends B ? never : A
```

##### Cartesian product (×) — combining all pairs

The Cartesian product pairs every tuple from one relation with every tuple from another.

In Lojban there is no dedicated gadri for Cartesian product, but the concept is expressed through quantification over two sets:

```
ro da poi ke'a cmima lo'i bridi be lo ka vecnu
  ro de poi ke'a cmima lo'i bridi be lo ka kosta
    zo'u da ce'o de
  — for every vecnu-tuple da and every kosta-tuple de, the pair (da, de)
```

```ts
type CartesianProduct<R1, R2> = { left: R1, right: R2 }

function cross<A, B>(r1: Set<A>, r2: Set<B>): Set<CartesianProduct<A, B>> {
  const result = new Set<CartesianProduct<A, B>>()
  for (const a of r1)
    for (const b of r2)
      result.add({ left: a, right: b })
  return result
}
```

##### Join (⋈) — matching rows across relations

A natural join combines tuples from two relations where shared attributes match. This is Cartesian product followed by selection on equality of common columns.

In Lojban, join is expressed by unifying shared places across two selbri. If `vecnu` and another selbri share an argument, the shared sumti binds them:

```
ro da poi ke'a se vecnu
  ro de poi ke'a kosta ku
    poi le se kosta cu du le se vecnu
      zo'u ...
  — for every sold-item da, for every costed-item de,
    where the item of kosta equals the item of vecnu ...
```

The natural join on a shared item column is simply the logical conjunction where the same variable fills both places:

```
da se vecnu gi'e se kosta
  — da is sold (as goods) AND da is costed (as goods)
  — the shared variable da enforces the join condition
```

This is a core insight: **variable binding is the Lojban join**. When the same `da`/`de`/`di` (or `ko'a`/`ko'e`/...) appears in two bridi, their conjunction is a natural join on that shared variable.

```ts
type NaturalJoin<R1, R2, K extends keyof R1 & keyof R2> = {
  [P in keyof R1 | keyof R2]: P extends keyof R1
    ? R1[P]
    : P extends keyof R2
      ? R2[P]
      : never
}

function join<R1, R2, K extends string & keyof R1 & keyof R2>(
  r1: Set<R1>,
  r2: Set<R2>,
  key: K
): Set<NaturalJoin<R1, R2, K>> {
  const result: NaturalJoin<R1, R2, K>[] = []
  for (const a of r1)
    for (const b of r2)
      if (a[key] === b[key])
        result.push({ ...a, ...b })
  return new Set(result)
}
```

#### 10.3 Extended operations: sorting and aggregation

Sorting and grouping are not part of Codd's original relational algebra but are essential in practice.

##### ORDER BY — sorting

Sorting imposes an order on tuples. The gismu `porsi` is the standard Lojban word for sequences: x₁ [ordered set] is sequenced/ordered by comparison/rules x₂ on unordered set x₃.

The lujvo `porganzu` (from `porsi` + `ganzu`) means "to sort": x₁ sorts x₂ (plurality/sequence) into x₃ (ordered sequence) according to relation x₄ (binary ka).

```
lo bridi be lo ka vecnu cu se porganzu lo porsi
  sepi'o le ka le ve vecnu cu zmadu
  — the vecnu-tuples are sorted into a sequence
    using the property that the price (x₄) is greater
```

For ascending vs descending: `zmadu` (greater) or `mleca` (less) as the ordering relation.

```ts
function orderBy<Row, K extends keyof Row>(
  relation: Set<Row>,
  key: K,
  direction: "asc" | "desc" = "asc"
): Row[] {
  return [...relation].sort((a, b) => {
    const cmp = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
    return direction === "asc" ? cmp : -cmp
  })
}
```

In the type system, `Sequence<T>` (§3) is the TypeScript type for an ordered collection — the result of an ORDER BY is `Sequence<Row>`, not `Set<Row>`.

##### GROUP BY and aggregation

Grouping partitions tuples by a shared attribute value; aggregation computes a summary over each partition. The gismu `klesi` (class/category/subset within a set, with defining property x₃) captures the grouping concept, and `girzu` (group/cluster showing common property x₂) captures the grouped result.

```
lo vecnu cu se klesi lo ka dunli le vecnu
  — the sell-tuples are classified by the property
    of having equal sellers (x₁)
```

Aggregation functions map to existing Lojban:

| SQL | Math | Lojban | Gloss |
|-----|------|--------|-------|
| `COUNT(*)` | \|S\| | `kancu` | x₁ counts the number in set x₂ to be x₃ |
| `SUM(col)` | Σ | `sumji` / `simsumji` | x₁ is the sum of x₂ plus x₃ |
| `AVG(col)` | μ | `cnano` / `nacna'o` | x₁ is the norm/average in property x₂ among x₃ |
| `MAX(col)` | sup | `traji` (default: `zmadu`) | x₁ is superlative in property x₂ among x₄ |
| `MIN(col)` | inf | `traji` + `mleca` | x₁ is superlative in property x₂, at the `mleca` extreme |

```
le vecnu cu se kancu li xa
  — the sell-events are counted as six
  (COUNT(*) = 6)

lo ve vecnu cu se simsumji li paxa
  — the prices sum to sixteen
  (SUM(price) = 16)

lo vecnu cu cnano le ni ve vecnu
  — the sell-events average in quantity of price
  (AVG(price))
```

```ts
type GroupBy<Row, K extends keyof Row> = Map<Row[K], Row[]>

function groupBy<Row, K extends keyof Row>(
  relation: Set<Row>,
  key: K
): Map<Row[K], Row[]> {
  const groups = new Map<Row[K], Row[]>()
  for (const row of relation) {
    const k = row[key]
    if (!groups.has(k)) groups.set(k, [])
    groups.get(k)!.push(row)
  }
  return groups
}

function aggregate<Row, K extends keyof Row, V>(
  relation: Set<Row>,
  groupKey: K,
  aggFn: (rows: Row[]) => V
): Map<Row[K], V> {
  const groups = groupBy(relation, groupKey)
  const result = new Map<Row[K], V>()
  for (const [k, rows] of groups)
    result.set(k, aggFn(rows))
  return result
}
```

#### 10.4 Worked example

Table `vecnu` (x₁ seller, x₂ goods, x₃ buyer, x₄ price):

| x₁ (seller) | x₂ (goods) | x₃ (buyer) | x₄ (price) |
|---|---|---|---|
| la .bob. | lo skami | la .alis. | li pano |
| la .bob. | lo cukta | la .alis. | li mu |
| la .alis. | lo pixra | la .djan. | li pare |

**Query 1: What did Alice buy?**

| Layer | Expression |
|---|---|
| Algebra | π_{x₂}(σ_{x₃ = Alice}(vecnu)) |
| SQL | `SELECT goods FROM vecnu WHERE buyer = 'Alice'` |
| Lojban | `ma se vecnu fi la .alis.` |
| TypeScript | `select(vecnu, r => r.x3 === "alice").map(r => r.x2)` |

Breakdown of `ma se vecnu fi la .alis.`: `se` swaps x₁↔x₂, making goods the first place. `ma` asks for that first place (goods). `fi` tags the third place (buyer) with `la .alis.`.

**Query 2: Total revenue per seller**

| Layer | Expression |
|---|---|
| SQL | `SELECT seller, SUM(price) FROM vecnu GROUP BY seller` |
| Lojban (compositional) | `ro da poi ke'a vecnu zo'u` |
| | `da goi ko'a .e le ni simsumji li xo lo ve vecnu be ko'a` |
| | (for every seller da: da and how-much is-the-sum of the prices of da's sales) |
| TypeScript | `aggregate(vecnu, "x1", rows => rows.reduce((s, r) => s + r.x4, 0))` |

**Query 3: Join vecnu with a cost table**

Suppose `kosta`: x₁ [goods] costs x₂ [amount] to manufacture.

| Layer | Expression |
|---|---|
| Algebra | vecnu ⋈_{x₂ = x₁(kosta)} kosta |
| SQL | `SELECT * FROM vecnu JOIN kosta ON vecnu.goods = kosta.goods` |
| Lojban | `ro da poi ke'a se vecnu ku'o ge da se vecnu gi da kosta` |
| | (for every da that is sold-as-goods: da is sold AND da has-cost-to-manufacture) |
| TypeScript | `join(vecnu, kosta, "goods")` |

The Lojban join is achieved by **sharing the variable `da`** across two bridi connected with `ge...gi` (logical AND). This is exactly variable unification in predicate logic — the operation that underpins both relational joins and Prolog-style resolution.

#### 10.5 Connection to the type system

The relational algebra maps onto the §1–§5 type vocabulary as follows:

| Relational concept | This type system (§) | TypeScript |
|---|---|---|
| Relation schema | selbri place structure (§6) | `interface Row { x1: T₁, x2: T₂, ... }` |
| Tuple | a bridi (§'Core Lojban' essay) | value of `Row` |
| Relation instance | `Set<Row>` (§3) | `Set<Row>` |
| Selection predicate | `poi` clause / `Set<T>` as filter (§3) | `(row: Row) => boolean` |
| Projection | `se`/`te`/`ve`/`xe` + `ma` | `Pick<Row, Keys>` |
| Join condition | shared variable across `ge`…`gi` | `keyof R1 & keyof R2` |
| Aggregation result | `klani` / `sumji` / `cnano` / `traji` (§5) | `Map<Key, AggResult>` |
| Ordered result | `porsi` / `Sequence<T>` (§3) | `Row[]` (array = ordered) |
| Grouped partition | `klesi` / `girzu` | `Map<Key, Row[]>` |

The key structural insight: **Lojban selbri are relation schemas, bridi are tuples, and logical connectives with shared variables are joins.** This is not metaphor — it is the same predicate-logic foundation that Codd used to define relational algebra.