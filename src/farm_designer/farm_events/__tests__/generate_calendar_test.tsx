import { generateCalendar } from "../generate_calendar";

describe("generateCalendar()", function () {
  it("orders everything in the correct time slots", function () {
    generateCalendar(fakeEvents());
    pending("BRB");
  });
});

function fakeEvents() {
  return [
    {
      "id": 1,
      "device_id": 78,
      "start_time": "2017-02-06T22:57:51.721Z",
      "next_time": "2019-11-03T22:57:51.721Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 3,
      "device_id": 2,
      "start_time": "2017-02-07T21:10:06.211Z",
      "next_time": "2019-11-04T21:10:06.211Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 4,
      "device_id": 2,
      "start_time": "2017-02-07T21:10:06.211Z",
      "next_time": "2019-11-04T21:10:06.211Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 5,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 6,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 7,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 8,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 9,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 10,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 11,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 12,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 13,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 14,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 15,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 16,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 17,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 18,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 19,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 20,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 21,
      "device_id": 57,
      "start_time": "2017-02-09T16:07:28.042Z",
      "next_time": "2019-11-06T16:07:28.042Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 68
    },
    {
      "id": 22,
      "device_id": 6,
      "start_time": "2017-02-09T08:00:00.000Z",
      "end_time": "2017-02-09T08:00:00.000Z",
      "next_time": "2017-02-10T15:45:00.000Z",
      "repeat": 1,
      "time_unit": "minutely",
      "executable_type": "Sequence",
      "executable_id": 132
    },
    {
      "id": 23,
      "device_id": 2,
      "start_time": "2017-02-13T22:23:12.917Z",
      "end_time": "2017-02-28T08:00:00.000Z",
      "next_time": "2017-02-14T22:23:12.917Z",
      "repeat": 1,
      "time_unit": "daily",
      "executable_type": "Regimen",
      "executable_id": 11
    },
    {
      "id": 2,
      "device_id": 2,
      "start_time": "2017-02-07T19:30:06.211Z",
      "next_time": "2019-11-04T21:10:06.211Z",
      "repeat": 1000,
      "time_unit": "daily",
      "executable_type": "Sequence",
      "executable_id": 72
    }
  ];
}