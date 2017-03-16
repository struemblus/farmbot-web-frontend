# TODO

 - [ ] Find all sources of duplication.
 - [ ] delete /syncs endoint.

# PROBLEMS WE WANT TO SOLVE

 * Sync endpoint is unusablely slow.
 * Stale data bugs because of data denormalization / duplication.

# OPTIONS
 * Use RXDB
 * User Normalizr

# UPGRADE / REFACTOR PATH:
 PROBLEM: What about unsaved resources?
 PROBLEM: What about IDs that were deleted??? Write an action handler?
 PROBLEM: Update individual property???

 0. Factor down components to use map state to props.
 1. Create a new reducer called "resources".
 2. Refactor current reducers to not use any references to resources like <Sequence> <Regimen> etc. and instead use resource IDs only.
 3. Grab resources via selector functions in map state to props?
 4. Render via that.

 First attempt: Try to re-write sequence editor?

```typescript

interface Resource<T> {
  where(id: numer[]): (Readonly<T>|undefined)[];
  find(id: Number): Readonly<T> |undefined;
  by(key: "id"|"tool_id"): Dictionary<Readonly<T> |undefined>;
  all: number[];
}

interface Instance {
  sequences: Resource<Sequence>;
  regimens: Resource<Regimen>;
  tools: Resource<T>;
}

interface Orm {
  currentInstance: Instance;
}
```
