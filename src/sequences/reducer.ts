import {
    Step,
    Sequence,
    SequenceReducerState
} from "./interfaces";
import {
    nullSequence,
    EditCurrentSequence,
    SpliceStepPayl,
    MoveStepPayl
} from "./actions";
import { generateReducer } from "../generate_reducer";
import { move } from "../util";

/** Adds an empty sequence to the front of the list. */
function populate(state: SequenceReducerState): Sequence {
    // This worries me. What if #current and #all get out of sync?
    let current_sequence = nullSequence();
    state.all.unshift(current_sequence);
    state.current = 0;
    return current_sequence;
}

const initialState: SequenceReducerState = {
    all: [
        {
            color: "red",
            kind: "sequence",
            args: {},
            name: "New Sequence",
            body: [],
            dirty: false
        }
    ],
    current: 0
};

export let sequenceReducer = generateReducer<SequenceReducerState>(initialState)
    .add<{ index: number, comment: string }>("ADD_COMMENT", function (s, a) {
        let seq = s.all[s.current];
        let node = seq.body[a.payload.index];
        markDirty(s);
        node.comment = a.payload.comment;
        // API complains about empty values.
        // TODO: Clean up BE.
        if (!node.comment) { delete node.comment; }
        return s;
    })
    .add<{ step: Step }>("PUSH_STEP", function (state, action) {
        let current_sequence = state
            .all[state.current] || populate(state);
        markDirty(state);
        let { step } = action.payload;
        let stepp = step;
        current_sequence.body.push(stepp);
        return state;
    })
    .add<void>("ADD_SEQUENCE", function (state, action) {
        populate(state);
        return state;
    })
    .add<EditCurrentSequence>("EDIT_CURRENT_SEQUENCE", function (state, action) {
        let currentSequence = state.all[state.current] || populate(state);
        currentSequence.name = action.payload.name || currentSequence.name;
        currentSequence.color = action.payload.color || currentSequence.color;
        markDirty(state);
        return state;
    })
    .add<{ step: Step, index: number }>("CHANGE_STEP", function (state, action) {

        /// DELETE THIS!?!?!?!?
        // let steps = state.all[state.current].body || populate(state).body;
        // let index = action.payload.index;
        // let current_step = steps[index];
        // steps[index] = assign<{}, Step>(current_step, action.payload.step);
        // state.all[state.current].dirty = true;
        let currentSequence = state.all[state.current];
        let currentStep = currentSequence.body[action.payload.index];
        markDirty(state);
        _.assign(currentStep, action.payload.step);
        return state;
    })
    .add<{ index: number }>("REMOVE_STEP", function (state, action) {
        let seq = state.all[state.current];
        let index = action.payload.index;
        seq.body = _.without(seq.body, seq.body[index]);
        markDirty(state);
        return state;
    })
    .add<Sequence>("SAVE_SEQUENCE_OK", function (state, action) {
        state.all[state.current] = action.payload;
        return state;
    })
    .add<Array<Sequence>>("FETCH_SEQUENCES_OK", function (state, action) {
        state.all = action.payload;
        return state;
    })
    .add<number>("SELECT_SEQUENCE", function (state, action) {
        let inx = action.payload;
        if (state.all[inx]) { state.current = inx; }
        return state;
    })
    .add<Sequence>("DELETE_SEQUENCE_OK", function (state, action) {
        let found = _.find(state.all, { name: action.payload.name });
        if (found) {
            _.pull(state.all, found);
            state.current = 0;
        } else {
            throw new Error("Tried to delete a sequence that doesn't exist. ");
        }
        return state;
    })
    .add<MoveStepPayl>("MOVE_STEP", function (s, a) {
        let { from, to } = a.payload;
        markDirty(s);
        s.all[s.current].body = move<Step>(s.all[s.current].body,
            a.payload.from,
            a.payload.to);
        if (from < to) {
            // EDGE CASE: If you drag a step upwards, it will end up in the
            // wrong slot. As a fix, I swap the "to" index with the item below
            // it an vice versa.
            // I KNOW THERE ARE SHORTER WAYS TO SWAP AN ARRAY.
            // DO NOT OPTOMIZE. INTENTIONALLY LENGTHENED FOR CLARITY.
            let list = s.all[s.current].body;
            let topIndex = to;
            let bottomIndex = to - 1;
            let top = list[topIndex];
            let bottom = list[bottomIndex];
            list[topIndex] = bottom;
            list[bottomIndex] = top;
        }
        return s;
    })
    .add<SpliceStepPayl>("SPLICE_STEP", function (s, a) {
        markDirty(s);
        s.all[s.current].body.splice(a.payload.insertBefore, 0, a.payload.step);
        return s;
    });

function markDirty(s: SequenceReducerState) {
    s.all[s.current].dirty = true;
};
