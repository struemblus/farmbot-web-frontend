# Steps to reproduce

 1. Reseed database.
 2. Delete "trench digging tool" tool slot.
 3. Go to sequence.
 4. FE explodes because of index error.

HYPOTHESIS:

  I need to do an API check to make sure you don't delete a slot if it is holding
  a tool that is used by a sequence.
