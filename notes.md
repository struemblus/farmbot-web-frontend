# Questions?

 * Why can't we just store unsaved sequences locally?
   * Denormalizes data because you're holding a copy in a second reducer.
   * You need to duplicate logic between sequence and resource reducer.

