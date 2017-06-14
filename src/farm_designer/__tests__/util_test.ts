import { taskLossIsPossible } from "../farm_events/util";
import { FarmEvent } from "../interfaces";
import { RegimenItem } from "../../regimens/interfaces";
import * as moment from "moment";

describe("taskLossIsPossible", () => {
  /** Return a fresh RegimenItem[] and FarmEvent that can be used / modified in
   * test cases. */
  function testCase() {

    let fe: FarmEvent = {
      /** Start at 3am by default. */
      start_time: moment()
        .startOf('day')
        .add(3, "hours")
        .toJSON(),
      end_time: moment().add(5, "days").toJSON(),
      repeat: 1,
      time_unit: "daily",
      executable_id: 789,
      executable_type: "Regimen",
    };

    let ri: RegimenItem[] = [
      { sequence_id: 456, time_offset: 60 * 60 * 1000 }
    ];
    let now = moment(fe.start_time).subtract(15, "minutes");

    return { fe, ri, now };
  }

  xit("knows when task loss is possible", () => {
    let testData = testCase();
    let result = taskLossIsPossible(testData.fe, testData.ri, testData.now);
    expect(result).toBeTruthy();
  });

  xit("knows when task loss won't happen", () => {
    let testData = testCase();
    /** Regimen start time is 3am */
    testData.ri[0].time_offset = 1000 * 60 * 60 * 5; // 5am
    let result = taskLossIsPossible(testData.fe, testData.ri, testData.now);
    expect(result).toBeFalsy();
  });
});

