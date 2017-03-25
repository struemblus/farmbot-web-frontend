import { generateReducer } from "../../redux/generate_reducer";
import { TaggedPeripheral } from "../../resources/tagged_resources";

let initialState = {};

export let peripheralReducer = generateReducer<any>(initialState)
  .add<TaggedPeripheral>("PUSH_PERIPHERAL", function (s, a) {
    let newTR = { [a.payload.uuid]: a.payload };
    s.resources.index.references.push(newTR);
    return s;
  })
