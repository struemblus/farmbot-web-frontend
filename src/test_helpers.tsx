import * as React from "react";
import { Everything } from "./interfaces";
import { noop } from "lodash";

export class Wrapper extends React.Component<any, any> {
  render() {
    return <div> {this.props.children} </div>;
  }
}

/** Factory function for empty state object. */
export function fakeState(dispatcher: Function = noop): Everything {

  let location: Everything["location"] = {
    pathname: "/app/designer",
    /** EX: */
    search: "?id=twowing-silverbell&p1=SpeciesInfo",
    hash: "¯\_(ツ)_/¯",
    action: "PUSH",
    key: "jhedoi",
    query: { query: "string" }
  };

  let peripherals: Everything["peripherals"] = {
    "isEditing": true
  };

  let auth: Everything["auth"] = {
    "token": {
      "unencoded": {
        "sub": "admin@admin.com",
        "iat": 1495569084,
        "jti": "b38915ca-3d7a-4754-8152-d4306b88504c",
        "iss": "//localhost:3000",
        "exp": 1499025084,
        "mqtt": "10.0.0.6",
        "os_update_server": "https://api.github.com/repos/farmbot/farmbot_os/releases/latest",
        "fw_update_server": "https://api.github.com/repos/FarmBot/farmbot-arduino-firmware/releases/latest",
        "bot": "device_403"
      },
      "encoded": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE0OTU1NjkwODQsImp0aSI6ImIzODkxNWNhLTNkN2EtNDc1NC04MTUyLWQ0MzA2Yjg4NTA0YyIsImlzcyI6Ii8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE0OTkwMjUwODQsIm1xdHQiOiIxMC4wLjAuNiIsIm9zX3VwZGF0ZV9zZXJ2ZXIiOiJodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL2Zhcm1ib3QvZmFybWJvdF9vcy9yZWxlYXNlcy9sYXRlc3QiLCJmd191cGRhdGVfc2VydmVyIjoiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9GYXJtQm90L2Zhcm1ib3QtYXJkdWluby1maXJtd2FyZS9yZWxlYXNlcy9sYXRlc3QiLCJib3QiOiJkZXZpY2VfNDAzIn0.Gie_-X5F_CrnmrF8AGxnXcfOHS1sK3eFqLectr3Wa-TnIZbIFMr3bVrRT53GPPb7C4HKIdMwfgGYxpaGSOD77qa0qnxw1FraXTnJgbIJXKipBVN9UQ4PqcYgjAVdZ678A-XqXV6SGE624zdr7S7mQ6uj7qpa2LMH4P37R3BIB26G7E8xDcVOGqL5Oiwr9DPajBX3zdhXSbH3k4PyxqvPOLYso-R7kjfpOnfFCMfMZLW8TQtg-yj82zs93RP2DHOOx-jxek69tmgNyP3FJaoWHwHW7bXOEv09p3dhNVTCSVNKD9LZczLpuXV7U4oSmL6KLkbzsM6G0P9rrbJ9ASYaOw"
    },
    "user": {
      "id": 14,
      "device_id": 403,
      "name": "Administrator",
      "email": "admin@admin.com",
      "created_at": "2017-05-22T14:03:39.832Z",
      "updated_at": "2017-05-23T19:07:31.793Z"
    }
  };

  let bot: Everything["bot"] = {
    "stepSize": 100,
    "controlPanelClosed": false,
    "hardware": {
      "mcu_params": {},
      "location": [
        -1,
        -1,
        -1
      ],
      "pins": {},
      "configuration": {},
      "informational_settings": {},
      "user_env": {},
      "process_info": {
        "farmwares": [],
        "regimens": [],
        "farm_events": []
      }
    },
    "dirty": false,
    "currentOSVersion": "3.1.6"
  };

  let config: Everything["config"] = {
    "host": "localhost",
    "port": "3000"
  };

  let draggable: Everything["draggable"] = {
    "dataTransfer": {}
  };

  let resources: Everything["resources"] = {
    "consumers": {
      "regimens": {
        "dailyOffsetMs": 300000,
        "weeks": [
          {
            "days": {
              "day1": false,
              "day2": false,
              "day3": false,
              "day4": false,
              "day5": false,
              "day6": false,
              "day7": false
            }
          },
          {
            "days": {
              "day1": false,
              "day2": false,
              "day3": false,
              "day4": false,
              "day5": false,
              "day6": false,
              "day7": false
            }
          },
          {
            "days": {
              "day1": false,
              "day2": false,
              "day3": false,
              "day4": false,
              "day5": false,
              "day6": false,
              "day7": false
            }
          },
          {
            "days": {
              "day1": false,
              "day2": false,
              "day3": false,
              "day4": false,
              "day5": false,
              "day6": false,
              "day7": false
            }
          },
          {
            "days": {
              "day1": false,
              "day2": false,
              "day3": false,
              "day4": false,
              "day5": false,
              "day6": false,
              "day7": false
            }
          },
          {
            "days": {
              "day1": false,
              "day2": false,
              "day3": false,
              "day4": false,
              "day5": false,
              "day6": false,
              "day7": false
            }
          },
          {
            "days": {
              "day1": false,
              "day2": false,
              "day3": false,
              "day4": false,
              "day5": false,
              "day6": false,
              "day7": false
            }
          },
          {
            "days": {
              "day1": false,
              "day2": false,
              "day3": false,
              "day4": false,
              "day5": false,
              "day6": false,
              "day7": false
            }
          },
          {
            "days": {
              "day1": false,
              "day2": false,
              "day3": false,
              "day4": false,
              "day5": false,
              "day6": false,
              "day7": false
            }
          },
          {
            "days": {
              "day1": false,
              "day2": false,
              "day3": false,
              "day4": false,
              "day5": false,
              "day6": false,
              "day7": false
            }
          }
        ]
      },
      "sequences": {
        current: undefined
      },
      "farm_designer": {
        "cropSearchQuery": "",
        "cropSearchResults": [],
        "selectedPlant": undefined
      }
    },
    "loaded": [
      "device",
      "farm_events",
      "images",
      "peripherals",
      "points",
      "logs",
      "regimens",
      "sequences",
      "tools"
    ],
    "index": {
      "all": [
        "device.413.0",
        "farm_events.19.1",
        "farm_events.20.2",
        "images.413.3",
        "images.412.4",
        "peripherals.10.5",
        "points.1386.6",
        "points.1387.7",
        "points.1388.8",
        "points.1389.9",
        "points.1390.10",
        "logs.436.11",
        "logs.437.12",
        "logs.438.13",
        "logs.439.14",
        "logs.440.15",
        "logs.441.16",
        "logs.442.17",
        "logs.443.18",
        "logs.444.19",
        "logs.445.20",
        "logs.446.21",
        "logs.447.22",
        "logs.448.23",
        "logs.449.24",
        "logs.450.25",
        "logs.451.26",
        "logs.452.27",
        "logs.453.28",
        "logs.454.29",
        "logs.455.30",
        "logs.456.31",
        "logs.457.32",
        "logs.458.33",
        "logs.459.34",
        "logs.460.35",
        "logs.461.36",
        "logs.462.37",
        "logs.463.38",
        "logs.464.39",
        "logs.465.40",
        "logs.466.41",
        "logs.467.42",
        "logs.468.43",
        "logs.469.44",
        "logs.470.45",
        "regimens.10.46",
        "sequences.21.47",
        "sequences.22.48",
        "tools.13.49",
        "crops.0.50",
        "crops.0.51"
      ],
      "byKind": {
        "device": [
          "device.413.0"
        ],
        "farm_events": [
          "farm_events.19.1",
          "farm_events.20.2"
        ],
        "images": [
          "images.413.3",
          "images.412.4"
        ],
        "logs": [
          "logs.436.11",
          "logs.437.12",
          "logs.438.13",
          "logs.439.14",
          "logs.440.15",
          "logs.441.16",
          "logs.442.17",
          "logs.443.18",
          "logs.444.19",
          "logs.445.20",
          "logs.446.21",
          "logs.447.22",
          "logs.448.23",
          "logs.449.24",
          "logs.450.25",
          "logs.451.26",
          "logs.452.27",
          "logs.453.28",
          "logs.454.29",
          "logs.455.30",
          "logs.456.31",
          "logs.457.32",
          "logs.458.33",
          "logs.459.34",
          "logs.460.35",
          "logs.461.36",
          "logs.462.37",
          "logs.463.38",
          "logs.464.39",
          "logs.465.40",
          "logs.466.41",
          "logs.467.42",
          "logs.468.43",
          "logs.469.44",
          "logs.470.45"
        ],
        "peripherals": [
          "peripherals.10.5"
        ],
        "crops": [
          "crops.0.50",
          "crops.0.51"
        ],
        "points": [
          "points.1386.6",
          "points.1387.7",
          "points.1388.8",
          "points.1389.9",
          "points.1390.10"
        ],
        "regimens": [
          "regimens.10.46"
        ],
        "sequences": [
          "sequences.21.47",
          "sequences.22.48"
        ],
        "tools": [
          "tools.13.49"
        ],
        "users": []
      },
      "byKindAndId": {
        "device.413": "device.413.0",
        "farm_events.19": "farm_events.19.1",
        "farm_events.20": "farm_events.20.2",
        "images.413": "images.413.3",
        "images.412": "images.412.4",
        "peripherals.10": "peripherals.10.5",
        "points.1386": "points.1386.6",
        "points.1387": "points.1387.7",
        "points.1388": "points.1388.8",
        "points.1389": "points.1389.9",
        "points.1390": "points.1390.10",
        "logs.436": "logs.436.11",
        "logs.437": "logs.437.12",
        "logs.438": "logs.438.13",
        "logs.439": "logs.439.14",
        "logs.440": "logs.440.15",
        "logs.441": "logs.441.16",
        "logs.442": "logs.442.17",
        "logs.443": "logs.443.18",
        "logs.444": "logs.444.19",
        "logs.445": "logs.445.20",
        "logs.446": "logs.446.21",
        "logs.447": "logs.447.22",
        "logs.448": "logs.448.23",
        "logs.449": "logs.449.24",
        "logs.450": "logs.450.25",
        "logs.451": "logs.451.26",
        "logs.452": "logs.452.27",
        "logs.453": "logs.453.28",
        "logs.454": "logs.454.29",
        "logs.455": "logs.455.30",
        "logs.456": "logs.456.31",
        "logs.457": "logs.457.32",
        "logs.458": "logs.458.33",
        "logs.459": "logs.459.34",
        "logs.460": "logs.460.35",
        "logs.461": "logs.461.36",
        "logs.462": "logs.462.37",
        "logs.463": "logs.463.38",
        "logs.464": "logs.464.39",
        "logs.465": "logs.465.40",
        "logs.466": "logs.466.41",
        "logs.467": "logs.467.42",
        "logs.468": "logs.468.43",
        "logs.469": "logs.469.44",
        "logs.470": "logs.470.45",
        "regimens.10": "regimens.10.46",
        "sequences.21": "sequences.21.47",
        "sequences.22": "sequences.22.48",
        "tools.13": "tools.13.49"
      },
      "references": {
        "device.413.0": {
          "kind": "device",
          "body": {
            "id": 413,
            "name": "virgate-sunset-11",
            "webcam_url": undefined
          },
          "uuid": "device.413.0"
        },
        "farm_events.19.1": {
          "kind": "farm_events",
          "body": {
            "id": 19,
            "start_time": "2017-05-19T05:00:00.000Z",
            "end_time": "2017-05-26T05:00:00.000Z",
            "repeat": 1,
            "time_unit": "daily",
            "executable_id": 21,
            "executable_type": "Sequence",
            "calendar": [
              "2017-05-24T05:00:00.000Z",
              "2017-05-25T05:00:00.000Z"
            ]
          },
          "uuid": "farm_events.19.1"
        },
        "farm_events.20.2": {
          "kind": "farm_events",
          "body": {
            "id": 20,
            "start_time": "2017-05-20T05:00:00.000Z",
            "end_time": "2017-05-26T05:00:00.000Z",
            "repeat": 2,
            "time_unit": "daily",
            "executable_id": 21,
            "executable_type": "Sequence",
            "calendar": [
              "2017-05-24T05:00:00.000Z"
            ]
          },
          "uuid": "farm_events.20.2"
        },
        "images.413.3": {
          "kind": "images",
          "body": {
            "id": 413,
            "device_id": 413,
            "attachment_processed_at": undefined,
            "updated_at": "2017-05-23T21:23:06.502Z",
            "created_at": "2017-05-23T21:23:06.502Z",
            "attachment_url": "http://placehold.it/640%3Ftext=Processing...",
            "meta": {
              "x": 666,
              "y": 468,
              "z": 18
            }
          },
          "uuid": "images.413.3"
        },
        "images.412.4": {
          "kind": "images",
          "body": {
            "id": 412,
            "device_id": 413,
            "attachment_processed_at": undefined,
            "updated_at": "2017-05-23T21:23:06.480Z",
            "created_at": "2017-05-23T21:23:06.480Z",
            "attachment_url": "http://placehold.it/640%3Ftext=Processing...",
            "meta": {
              "x": 819,
              "y": 383,
              "z": 56
            }
          },
          "uuid": "images.412.4"
        },
        "peripherals.10.5": {
          "kind": "peripherals",
          "body": {
            "id": 10,
            "pin": 13,
            "mode": 0,
            "label": "LED"
          },
          "uuid": "peripherals.10.5"
        },
        "points.1386.6": {
          "kind": "points",
          "body": {
            "id": 1386,
            "created_at": "2017-05-23T21:23:06.525Z",
            "updated_at": "2017-05-23T21:23:06.525Z",
            "device_id": 413,
            "meta": {},
            "name": "penicillate-mountain-7869",
            "pointer_type": "Plant",
            "radius": 38,
            "x": 124,
            "y": 136,
            "z": 0,
            "openfarm_slug": "tomato"
          },
          "uuid": "points.1386.6"
        },
        "points.1387.7": {
          "kind": "points",
          "body": {
            "id": 1387,
            "created_at": "2017-05-23T21:23:06.536Z",
            "updated_at": "2017-05-23T21:23:06.536Z",
            "device_id": 413,
            "meta": {},
            "name": "sepal-fog-5813",
            "pointer_type": "Plant",
            "radius": 48,
            "x": 339,
            "y": 241,
            "z": 0,
            "openfarm_slug": "carrot"
          },
          "uuid": "points.1387.7"
        },
        "points.1388.8": {
          "kind": "points",
          "body": {
            "id": 1388,
            "created_at": "2017-05-23T21:23:06.547Z",
            "updated_at": "2017-05-23T21:23:06.547Z",
            "device_id": 413,
            "meta": {
              "color": "yellow",
              "created_by": "plant-detection"
            },
            "name": "untitled",
            "pointer_type": "GenericPointer",
            "radius": 11,
            "x": 680,
            "y": 368,
            "z": 5
          },
          "uuid": "points.1388.8"
        },
        "points.1389.9": {
          "kind": "points",
          "body": {
            "id": 1389,
            "created_at": "2017-05-23T21:23:06.559Z",
            "updated_at": "2017-05-23T21:23:06.559Z",
            "device_id": 413,
            "meta": {
              "color": "red",
              "created_by": "plant-detection"
            },
            "name": "untitled",
            "pointer_type": "GenericPointer",
            "radius": 12,
            "x": 977,
            "y": 357,
            "z": 5
          },
          "uuid": "points.1389.9"
        },
        "points.1390.10": {
          "kind": "points",
          "body": {
            "id": 1390,
            "created_at": "2017-05-23T21:23:06.744Z",
            "updated_at": "2017-05-23T21:23:06.744Z",
            "device_id": 413,
            "meta": {},
            "name": "Slot One.",
            "pointer_type": "ToolSlot",
            "radius": 50,
            "x": 10,
            "y": 10,
            "z": 10,
            "tool_id": 13
          },
          "uuid": "points.1390.10"
        },
        "logs.436.11": {
          "kind": "logs",
          "body": {
            "id": 436,
            "created_at": 1495574526,
            "message": "brand transparent infomediaries",
            "meta": {
              "type": [
                "fun"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.436.11"
        },
        "logs.437.12": {
          "kind": "logs",
          "body": {
            "id": 437,
            "created_at": 1495574466,
            "message": "syndicate customized paradigms",
            "meta": {
              "type": [
                "success"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.437.12"
        },
        "logs.438.13": {
          "kind": "logs",
          "body": {
            "id": 438,
            "created_at": 1495574406,
            "message": "e-enable web-enabled eyeballs",
            "meta": {
              "type": [
                "fun"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.438.13"
        },
        "logs.439.14": {
          "kind": "logs",
          "body": {
            "id": 439,
            "created_at": 1495574346,
            "message": "aggregate open-source portals",
            "meta": {
              "type": [
                "success"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.439.14"
        },
        "logs.440.15": {
          "kind": "logs",
          "body": {
            "id": 440,
            "created_at": 1495574286,
            "message": "embrace sexy architectures",
            "meta": {
              "type": [
                "fun"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.440.15"
        },
        "logs.441.16": {
          "kind": "logs",
          "body": {
            "id": 441,
            "created_at": 1495574226,
            "message": "productize web-enabled interfaces",
            "meta": {
              "type": [
                "busy"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.441.16"
        },
        "logs.442.17": {
          "kind": "logs",
          "body": {
            "id": 442,
            "created_at": 1495574166,
            "message": "reinvent real-time schemas",
            "meta": {
              "type": [
                "warn"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.442.17"
        },
        "logs.443.18": {
          "kind": "logs",
          "body": {
            "id": 443,
            "created_at": 1495574106,
            "message": "matrix turn-key solutions",
            "meta": {
              "type": [
                "fun"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.443.18"
        },
        "logs.444.19": {
          "kind": "logs",
          "body": {
            "id": 444,
            "created_at": 1495574046,
            "message": "benchmark transparent relationships",
            "meta": {
              "type": [
                "error"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.444.19"
        },
        "logs.445.20": {
          "kind": "logs",
          "body": {
            "id": 445,
            "created_at": 1495573986,
            "message": "implement 24/365 infrastructures",
            "meta": {
              "type": [
                "warn"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.445.20"
        },
        "logs.446.21": {
          "kind": "logs",
          "body": {
            "id": 446,
            "created_at": 1495573926,
            "message": "expedite ubiquitous platforms",
            "meta": {
              "type": [
                "info"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.446.21"
        },
        "logs.447.22": {
          "kind": "logs",
          "body": {
            "id": 447,
            "created_at": 1495573866,
            "message": "utilize distributed applications",
            "meta": {
              "type": [
                "info"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.447.22"
        },
        "logs.448.23": {
          "kind": "logs",
          "body": {
            "id": 448,
            "created_at": 1495573806,
            "message": "reinvent innovative applications",
            "meta": {
              "type": [
                "warn"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.448.23"
        },
        "logs.449.24": {
          "kind": "logs",
          "body": {
            "id": 449,
            "created_at": 1495573746,
            "message": "utilize next-generation networks",
            "meta": {
              "type": [
                "warn"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.449.24"
        },
        "logs.450.25": {
          "kind": "logs",
          "body": {
            "id": 450,
            "created_at": 1495573686,
            "message": "leverage transparent niches",
            "meta": {
              "type": [
                "success"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.450.25"
        },
        "logs.451.26": {
          "kind": "logs",
          "body": {
            "id": 451,
            "created_at": 1495573626,
            "message": "architect ubiquitous channels",
            "meta": {
              "type": [
                "fun"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.451.26"
        },
        "logs.452.27": {
          "kind": "logs",
          "body": {
            "id": 452,
            "created_at": 1495573566,
            "message": "innovate e-business vortals",
            "meta": {
              "type": [
                "info"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.452.27"
        },
        "logs.453.28": {
          "kind": "logs",
          "body": {
            "id": 453,
            "created_at": 1495573506,
            "message": "deliver seamless channels",
            "meta": {
              "type": [
                "info"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.453.28"
        },
        "logs.454.29": {
          "kind": "logs",
          "body": {
            "id": 454,
            "created_at": 1495573446,
            "message": "deliver 24/7 schemas",
            "meta": {
              "type": [
                "fun"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.454.29"
        },
        "logs.455.30": {
          "kind": "logs",
          "body": {
            "id": 455,
            "created_at": 1495573386,
            "message": "visualize killer synergies",
            "meta": {
              "type": [
                "fun"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.455.30"
        },
        "logs.456.31": {
          "kind": "logs",
          "body": {
            "id": 456,
            "created_at": 1495573326,
            "message": "synergize front-end vortals",
            "meta": {
              "type": [
                "info"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.456.31"
        },
        "logs.457.32": {
          "kind": "logs",
          "body": {
            "id": 457,
            "created_at": 1495573266,
            "message": "empower end-to-end bandwidth",
            "meta": {
              "type": [
                "fun"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.457.32"
        },
        "logs.458.33": {
          "kind": "logs",
          "body": {
            "id": 458,
            "created_at": 1495573206,
            "message": "seize e-business platforms",
            "meta": {
              "type": [
                "error"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.458.33"
        },
        "logs.459.34": {
          "kind": "logs",
          "body": {
            "id": 459,
            "created_at": 1495573146,
            "message": "orchestrate dot-com relationships",
            "meta": {
              "type": [
                "busy"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.459.34"
        },
        "logs.460.35": {
          "kind": "logs",
          "body": {
            "id": 460,
            "created_at": 1495573086,
            "message": "leverage integrated users",
            "meta": {
              "type": [
                "error"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.460.35"
        },
        "logs.461.36": {
          "kind": "logs",
          "body": {
            "id": 461,
            "created_at": 1495573026,
            "message": "morph scalable e-tailers",
            "meta": {
              "type": [
                "error"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.461.36"
        },
        "logs.462.37": {
          "kind": "logs",
          "body": {
            "id": 462,
            "created_at": 1495572966,
            "message": "reintermediate sticky paradigms",
            "meta": {
              "type": [
                "info"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.462.37"
        },
        "logs.463.38": {
          "kind": "logs",
          "body": {
            "id": 463,
            "created_at": 1495572906,
            "message": "morph scalable methodologies",
            "meta": {
              "type": [
                "busy"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.463.38"
        },
        "logs.464.39": {
          "kind": "logs",
          "body": {
            "id": 464,
            "created_at": 1495572846,
            "message": "orchestrate cross-media bandwidth",
            "meta": {
              "type": [
                "warn"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.464.39"
        },
        "logs.465.40": {
          "kind": "logs",
          "body": {
            "id": 465,
            "created_at": 1495572786,
            "message": "matrix bricks-and-clicks portals",
            "meta": {
              "type": [
                "fun"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.465.40"
        },
        "logs.466.41": {
          "kind": "logs",
          "body": {
            "id": 466,
            "created_at": 1495572726,
            "message": "enable bleeding-edge mindshare",
            "meta": {
              "type": [
                "success"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.466.41"
        },
        "logs.467.42": {
          "kind": "logs",
          "body": {
            "id": 467,
            "created_at": 1495572666,
            "message": "maximize compelling portals",
            "meta": {
              "type": [
                "info"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.467.42"
        },
        "logs.468.43": {
          "kind": "logs",
          "body": {
            "id": 468,
            "created_at": 1495572606,
            "message": "iterate mission-critical web services",
            "meta": {
              "type": [
                "busy"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.468.43"
        },
        "logs.469.44": {
          "kind": "logs",
          "body": {
            "id": 469,
            "created_at": 1495572546,
            "message": "redefine world-class e-services",
            "meta": {
              "type": [
                "error"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.469.44"
        },
        "logs.470.45": {
          "kind": "logs",
          "body": {
            "id": 470,
            "created_at": 1495572486,
            "message": "productize user-centric e-business",
            "meta": {
              "type": [
                "busy"
              ]
            },
            "channels": [
              "toast"
            ]
          },
          "uuid": "logs.470.45"
        },
        "regimens.10.46": {
          "kind": "regimens",
          "body": {
            "id": 10,
            "name": "Test Regimen 456",
            "color": "gray",
            "device_id": 413,
            "regimen_items": [
              {
                "id": 28,
                "regimen_id": 10,
                "sequence_id": 21,
                "time_offset": 300000
              },
              {
                "id": 29,
                "regimen_id": 10,
                "sequence_id": 21,
                "time_offset": 173100000
              },
              {
                "id": 30,
                "regimen_id": 10,
                "sequence_id": 21,
                "time_offset": 345900000
              }
            ]
          },
          "uuid": "regimens.10.46"
        },
        "sequences.21.47": {
          "kind": "sequences",
          "body": {
            "id": 21,
            "name": "Goto 0, 0, 0",
            "color": "gray",
            "body": [
              {
                "kind": "move_absolute",
                "args": {
                  "location": {
                    "kind": "coordinate",
                    "args": {
                      "x": 0,
                      "y": 0,
                      "z": 0
                    }
                  },
                  "offset": {
                    "kind": "coordinate",
                    "args": {
                      "x": 0,
                      "y": 0,
                      "z": 0
                    }
                  },
                  "speed": 800
                }
              }
            ],
            "args": {
              "is_outdated": false,
              "version": 4
            },
            "kind": "sequence"
          },
          "uuid": "sequences.21.47"
        },
        "sequences.22.48": {
          "kind": "sequences",
          "body": {
            "id": 22,
            "name": "Every Node",
            "color": "gray",
            "body": [
              {
                "kind": "move_absolute",
                "args": {
                  "offset": {
                    "kind": "coordinate",
                    "args": {
                      "x": 0,
                      "y": 0,
                      "z": 0
                    }
                  },
                  "speed": 800,
                  "location": {
                    "args": {
                      "tool_id": 13
                    },
                    "kind": "tool"
                  }
                }
              },
              {
                "kind": "move_relative",
                "args": {
                  "x": 4,
                  "y": 5,
                  "z": 6,
                  "speed": 800
                }
              },
              {
                "kind": "write_pin",
                "args": {
                  "pin_number": 1,
                  "pin_value": 2,
                  "pin_mode": 0
                }
              },
              {
                "kind": "read_pin",
                "args": {
                  "pin_number": 4,
                  "pin_mode": 0,
                  "label": "foo"
                }
              },
              {
                "kind": "wait",
                "args": {
                  "milliseconds": 4
                }
              },
              {
                "kind": "send_message",
                "args": {
                  "message": "Bot is at position {{ x }}, {{ y }}, {{ z }}.",
                  "message_type": "success"
                }
              },
              {
                "kind": "_if",
                "args": {
                  "lhs": "x",
                  "op": "is",
                  "rhs": 0,
                  "_then": {
                    "kind": "execute",
                    "args": {
                      "sequence_id": 21
                    }
                  },
                  "_else": {
                    "kind": "nothing",
                    "args": {}
                  }
                }
              },
              {
                "kind": "execute",
                "args": {
                  "sequence_id": 21
                }
              },
              {
                "kind": "execute_script",
                "args": {
                  "label": "plant-detection"
                }
              },
              {
                "kind": "take_photo",
                "args": {}
              },
              {
                "kind": "move_absolute",
                "args": {
                  "offset": {
                    "kind": "coordinate",
                    "args": {
                      "x": 0,
                      "y": 0,
                      "z": 0
                    }
                  },
                  "speed": 800,
                  "location": {
                    "args": {
                      "x": 1,
                      "y": 2,
                      "z": 3
                    },
                    "kind": "coordinate"
                  }
                }
              }
            ],
            "args": {
              "is_outdated": false,
              "version": 4
            },
            "kind": "sequence"
          },
          "uuid": "sequences.22.48"
        },
        "tools.13.49": {
          "kind": "tools",
          "body": {
            "id": 13,
            "name": "Trench Digging Tool",
            "status": "active"
          },
          "uuid": "tools.13.49"
        },
        "crops.0.50": {
          "kind": "crops",
          "body": {
            "name": "Tomato",
            "slug": "tomato",
            "binomial_name": "Solanum lycopersicum",
            "common_names": [
              "Tomato",
              "Tomate"
            ],
            "description": "The tomato is the fruit of the tomato plant, a member of the Nightshade family (Solanaceae). The fruit grows on a sprawling vine that is often trellised or caged to keep it upright. There are many kinds of tomatoes, including conventional, hybrid, heirloom, plum, grape, and cherry. Determinate or bush varieties do not need pruning and can be grown without trellises or cages. Indeterminate or climbing varieties benefit from pruning and should be trellised, caged, or staked.",
            "sun_requirements": "Full Sun",
            "sowing_method": "Direct seed indoors, transplant seedlings outside after hardening off",
            "spread": 60,
            "row_spacing": 75,
            "height": 90,
            "processing_pictures": 0,
            "guides_count": 23,
            "main_image_path": "https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/54ffce343134350003880200.jpg?1426050603",
            "taxon": "Species",
            "tags_array": [],
            "growing_degree_days": undefined,
            "svg_icon": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 20.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 64 64\" style=\"enable-background:new 0 0 64 64;\" xml:space=\"preserve\">\n<style type=\"text/css\">\n\t.st0{fill:#22B573;stroke:#184C28;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st1{fill:#EE0000;}\n\t.st2{fill:#9A0601;}\n\t.st3{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st4{fill:#6FAD4C;}\n\t.st5{fill:#FCAA54;stroke:#8CC63F;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st6{fill:none;stroke:#8D5733;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st7{fill:#184C28;}\n\t.st8{fill:#82C64E;}\n\t.st9{fill:none;stroke:#497726;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st10{fill:#497726;}\n\t.st11{opacity:0.2;}\n\t.st12{fill:#748C8B;}\n\t.st13{fill:#434D42;}\n\t.st14{fill:#EFC11E;}\n\t.st15{fill:#C9292F;}\n\t.st16{fill:#802D2D;}\n\t.st17{fill:#C9292F;stroke:#802D2D;stroke-width:2.5473;stroke-miterlimit:10;}\n\t.st18{opacity:0.4;}\n\t.st19{fill:none;stroke:#FFFFFF;stroke-width:2.5473;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st20{fill:none;stroke:#006837;stroke-width:2.5473;stroke-linecap:round;stroke-miterlimit:10;}\n\t.st21{fill:#FFFFFF;}\n\t.st22{fill:#C9292F;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st23{filter:url(#Adobe_OpacityMaskFilter);}\n\t.st24{opacity:0.8;mask:url(#SVGID_1_);}\n\t.st25{fill:#00FFFF;}\n\t.st26{fill:#2E368F;}\n\t.st27{fill:#5860A5;}\n\t.st28{fill:#161542;}\n\t.st29{fill:none;stroke:#434D42;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st30{fill:#54665F;}\n\t.st31{fill:#54665F;stroke:#434D42;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st32{fill:#748C8B;stroke:#434D42;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st33{clip-path:url(#SVGID_3_);}\n\t.st34{fill:#194C28;}\n\t.st35{fill:#82C64E;stroke:#184C28;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st36{fill:none;stroke:#184C28;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st37{fill:#FCAA54;}\n\t.st38{fill:#8D5733;}\n\t.st39{fill:#406D2A;}\n\t.st40{fill:none;stroke:#8D5733;stroke-linecap:round;stroke-miterlimit:10;}\n\t.st41{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-miterlimit:10;}\n\t.st42{clip-path:url(#SVGID_5_);}\n\t.st43{fill:#EE0000;stroke:#9A0601;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st44{fill:#C1272D;}\n\t.st45{fill:#184C28;stroke:#184C28;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st46{fill:none;stroke:#FDD6AD;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st47{fill:none;stroke:#FCAA54;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st48{fill:#9B0D91;}\n\t.st49{fill:#1B631A;}\n\t.st50{fill:#22153F;}\n\t.st51{fill:#95CC63;stroke:#517B39;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st52{fill:none;stroke:#517B39;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st53{fill:#22B573;}\n\t.st54{display:none;}\n\t.st55{display:inline;fill:none;stroke:#00FFFF;stroke-width:0.1;stroke-miterlimit:10;}\n</style>\n<g id=\"Layer_2\">\n\t<path class=\"st53\" d=\"M17.8,12.9c-2.3-1.9-4-4.1-4.6-6.5c0,0,6.4,2.7,14.2,3.6L32,1.9l4.5,8C44.1,9,50.8,6.4,50.8,6.4\n\t\tc-0.8,2.2-2.2,4.2-3.9,5.8l-14.1-1.9L17.8,12.9z\"/>\n\t<path class=\"st7\" d=\"M16.3,13.5c-2.2-2-3.9-4.3-4.5-6.7c-0.2-0.6,0-1.1,0.5-1.5c0.4-0.4,1-0.5,1.6-0.3c0.1,0,5.8,2.4,12.8,3.3\n\t\tl4.1-7.2C31,0.7,31.5,0.4,32,0.4s1,0.3,1.3,0.8l4,7.1C44.2,7.3,50.2,5,50.3,5c0.5-0.2,1.2-0.1,1.6,0.3c0.4,0.4,0.6,1,0.4,1.6\n\t\tc-0.8,2.1-2,4-3.6,5.7l-3.3-1C46.2,10.8,47,10,47.7,9c-2.7,0.8-6.7,1.8-11,2.4c0,0-1.5-0.7-1.5-0.7L32,4.9l-3.3,5.8l-5.2,0.2\n\t\tc-2.9-0.5-5.4-1.2-7.3-1.8c0.8,1.1,1.9,2.2,3.2,3.1L16.3,13.5z\"/>\n\t<g>\n\t\t<path class=\"st1\" d=\"M2.1,36.2c0,14.3,13.5,25.9,30.1,25.9c17.2,0,30.1-10.4,30.1-24.1c0-18-9.4-27.9-26.6-27.9\n\t\t\tC35.7,10.1,2.1,7.4,2.1,36.2z\"/>\n\t</g>\n\t<path class=\"st2\" d=\"M35.7,8.6L35.7,8.6c-1.2,0-2.5,0-3.8,0.1c-7.1,0.5-14.5,1.6-20.6,5.3C4.2,18.5,0.6,25.9,0.6,36.2\n\t\tc0,15.1,14.2,27.4,31.6,27.4c8.4,0,16.3-2.4,22.1-6.9c6.2-4.7,9.6-11.4,9.6-18.8C63.8,12.5,46.2,8.6,35.7,8.6z M3.6,36.2\n\t\tc0-17.2,10.8-22,22-23.7c-1.8,1.2-3.5,3-4.8,5.9c-0.1,0.3,0,0.5,0.3,0.7c0.3,0.1,0.5,0,0.7-0.3c2.4-5.4,6.2-6.8,9.9-7.4\n\t\tC34,11,36,11.5,37.8,13c4.1,3.5,6.2,11.9,6.2,25.2c0,13.1-5.4,23-12.5,23c-3.6,0-7.1-3.2-9.5-8.8c-0.1-0.3-0.4-0.4-0.7-0.3\n\t\tc-0.3,0.1-0.4,0.4-0.3,0.7c1.4,3.3,3.2,5.8,5.2,7.4C13.3,57.8,3.6,48,3.6,36.2z M36.8,60.4c4.9-3.5,8.1-11.8,8.1-22.2\n\t\tc0-13.5-2.2-22.3-6.6-25.9c-0.2-0.2-0.4-0.3-0.7-0.5c11.7,0.6,23.1,6.4,23.1,26.3C60.8,50.1,50.4,58.8,36.8,60.4z\"/>\n\t<g>\n\t\t<g>\n\t\t\t<path class=\"st21\" d=\"M8.9,27.9c-0.1,0-0.1,0-0.2,0c-0.3-0.1-0.4-0.4-0.3-0.6c1.3-3.4,3.4-5.9,6.6-7.8c0.2-0.1,0.5-0.1,0.7,0.2\n\t\t\t\tc0.1,0.2,0.1,0.5-0.2,0.7c-2.9,1.7-4.9,4.1-6.1,7.3C9.3,27.8,9.1,27.9,8.9,27.9z\"/>\n\t\t</g>\n\t\t<g>\n\t\t\t<path class=\"st21\" d=\"M48.9,27.4c-0.2,0-0.5-0.2-0.5-0.4c-0.4-3.2-1-6.1-1.8-8.5c-0.1-0.3,0.1-0.5,0.3-0.6\n\t\t\t\tc0.3-0.1,0.5,0.1,0.6,0.3c0.8,2.5,1.4,5.4,1.8,8.7C49.4,27.1,49.2,27.3,48.9,27.4C48.9,27.4,48.9,27.4,48.9,27.4z\"/>\n\t\t</g>\n\t\t<g>\n\t\t\t<path class=\"st21\" d=\"M23.3,26.3C23.3,26.3,23.3,26.3,23.3,26.3c-0.4-0.1-0.5-0.3-0.5-0.6c0.9-5,2.5-8.2,4.9-9.8\n\t\t\t\tc0.2-0.2,0.5-0.1,0.7,0.1c0.2,0.2,0.1,0.5-0.1,0.7c-2.2,1.4-3.6,4.4-4.5,9.1C23.8,26.1,23.6,26.3,23.3,26.3z\"/>\n\t\t</g>\n\t\t<g>\n\t\t\t<circle class=\"st21\" cx=\"22.9\" cy=\"29.2\" r=\"0.5\"/>\n\t\t</g>\n\t</g>\n</g>\n<g id=\"Layer_1\" class=\"st54\">\n</g>\n</svg>"
          },
          "uuid": "crops.0.50"
        },
        "crops.0.51": {
          "kind": "crops",
          "body": {
            "name": "Carrot",
            "slug": "carrot",
            "binomial_name": "Daucus carota",
            "common_names": [
              "Carrot"
            ],
            "description": "The carrot is a root vegetable. It is usually orange in color, but some cultivars are purple, black, red, white, and yellow. The most commonly eaten part of the plant is the taproot, but the greens are sometimes eaten as well. The leaves appear first, and the taproot grows more slowly beneath the soil. Fast-growing cultivars mature within three months of sowing the seed. Slower-maturing cultivars are harvested four months after sowing.",
            "sun_requirements": "Full Sun",
            "sowing_method": "Direct Seed, thin to 3cm apart when seedlings are 8cm high",
            "spread": 5,
            "row_spacing": 3,
            "height": 10,
            "processing_pictures": 0,
            "guides_count": 4,
            "main_image_path": "https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/58c312395865650004000000.jpg?1489179191",
            "taxon": "Species",
            "tags_array": [],
            "growing_degree_days": undefined,
            "svg_icon": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 20.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 200 200\" style=\"enable-background:new 0 0 200 200;\" xml:space=\"preserve\">\n<style type=\"text/css\">\n\t.st0{fill:#90C400;}\n\t.st1{fill:#2B6000;}\n\t.st2{fill:#90C400;stroke:#2B6000;stroke-width:3;stroke-linecap:round;stroke-miterlimit:10;}\n\t.st3{fill:#90C400;stroke:#2B6000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st4{fill:#68AB19;}\n\t.st5{fill:#074004;}\n\t.st6{fill:#94466D;stroke:#311538;stroke-width:3;stroke-miterlimit:10;}\n\t.st7{fill:#00FFFF;}\n\t.st8{fill:none;stroke:#311538;stroke-linecap:round;stroke-miterlimit:10;}\n\t.st9{fill:#F08A06;stroke:#DA5C00;stroke-width:3;stroke-miterlimit:10;}\n\t.st10{fill:none;stroke:#DA5C00;stroke-linecap:round;stroke-miterlimit:10;}\n\t.st11{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-miterlimit:10;}\n\t.st12{fill:#FFFFFF;}\n\t.st13{fill:none;stroke:#074004;stroke-width:3;stroke-miterlimit:10;}\n\t.st14{fill:none;stroke:#A9C500;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st15{fill:#F08A06;}\n\t.st16{fill:#DA5C00;}\n\t.st17{fill:#94466D;}\n\t.st18{fill:#311538;}\n\t.st19{fill:#8DA54A;}\n\t.st20{fill:#3B6014;}\n\t.st21{fill:none;stroke:#F08A06;stroke-linecap:round;stroke-miterlimit:10;}\n\t.st22{display:none;fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-miterlimit:10;}\n\t.st23{display:none;fill:#FFFFFF;}\n\t.st24{fill:none;stroke:#311538;stroke-width:3;stroke-miterlimit:10;}\n\t.st25{fill:#3A7800;}\n\t.st26{fill:#A9C500;}\n\t.st27{fill:#105409;}\n\t.st28{fill:#A9C500;stroke:#2B6000;stroke-width:3;stroke-miterlimit:10;}\n\t.st29{fill:#A9C500;stroke:#2B6000;stroke-width:3;stroke-linecap:round;stroke-miterlimit:10;}\n\t.st30{fill:#A9C500;stroke:#2B6000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st31{fill:#A9C500;stroke:#2B6000;stroke-width:9.5263;stroke-miterlimit:10;}\n</style>\n<path class=\"st15\" d=\"M15.3,193.1c0,0,78-41.5,120.7-84.2c13.4-13.4,17.7-29.3,3.2-43.8c0,0,0,0,0,0c-14.5-14.5-30.2-10.4-43.8,3.2\n\tC46.1,117.6,11.2,189,11.2,189C9.2,191.7,12.6,195.1,15.3,193.1z\"/>\n<path class=\"st16\" d=\"M142.9,61.8c-15-15-33.4-13.9-50.4,3.2C44.9,112.6,10.2,181.3,7.5,186.6c-1.9,3-1.6,6.9,1,9.5\n\tc1.5,1.5,3.4,2.2,5.4,2.2c1.5,0,2.9-0.4,4.2-1.3c2.4-1.3,21.2-11.4,44.4-26.1c22.9-14.5,54.8-36.4,77.2-58.8\n\tC156.8,95.2,157.9,76.8,142.9,61.8z M128.9,109.6c-3.3-4.2-7-8.4-10.8-12.5c-0.6-0.6-1.6-0.7-2.2-0.1c-0.6,0.6-0.7,1.6-0.1,2.2\n\tc3.9,4.1,7.5,8.3,10.8,12.5c-3.2,2.9-6.5,5.9-9.9,8.8c-3.3-4.2-7-8.5-10.9-12.6c-0.6-0.6-1.6-0.7-2.2-0.1c-0.6,0.6-0.7,1.6-0.1,2.2\n\tc3.9,4.1,7.5,8.3,10.8,12.5c-3.4,2.8-6.9,5.6-10.5,8.4c-3.1-3.8-6.4-7.6-9.9-11.4c-0.6-0.6-1.6-0.7-2.2-0.1s-0.7,1.6-0.1,2.2\n\tc3.4,3.6,6.7,7.4,9.7,11.1c-3.5,2.7-7,5.3-10.6,7.8c-2.7-3.2-5.5-6.4-8.4-9.5c-0.6-0.6-1.6-0.7-2.2-0.1s-0.7,1.6-0.1,2.2\n\tc2.9,3,5.6,6.1,8.2,9.2c-3.6,2.6-7.2,5.1-10.8,7.5c-2.1-2.5-4.3-4.9-6.6-7.3c-0.6-0.6-1.6-0.7-2.2-0.1c-0.6,0.6-0.7,1.6-0.1,2.2\n\tc2.2,2.3,4.2,4.6,6.3,7c-3.8,2.5-7.5,5-11.1,7.3c-1.9-2.2-3.9-4.3-5.9-6.4c-0.6-0.6-1.6-0.6-2.2,0c-0.6,0.6-0.6,1.6,0,2.2\n\tc1.9,1.9,3.7,3.9,5.5,5.9c-3.9,2.5-7.7,4.9-11.3,7.1c-1.2-1.3-2.4-2.6-3.7-3.9c-0.6-0.6-1.6-0.6-2.2,0c-0.6,0.6-0.6,1.6,0,2.2\n\tc1.1,1.1,2.1,2.2,3.2,3.4c-4.1,2.5-8,4.9-11.6,7c-0.7-0.7-1.3-1.4-2-2c-0.6-0.6-1.6-0.6-2.2,0c-0.6,0.6-0.6,1.6,0,2.2\n\tc0.5,0.5,1,1,1.4,1.5c-6.1,3.5-11,6.3-14.3,8.2c4-7.7,12.8-23.9,25-43.1c2.1,1.9,4.3,3.8,6.4,5.9c0.3,0.3,0.7,0.4,1.1,0.4\n\tc0.4,0,0.8-0.2,1.1-0.5c0.6-0.6,0.6-1.6,0-2.2c-2.2-2.2-4.5-4.3-6.8-6.3c2.3-3.6,4.8-7.3,7.3-11.1c2,1.7,3.9,3.4,5.9,5.2\n\tc0.3,0.3,0.7,0.4,1.1,0.4c0.4,0,0.8-0.2,1.2-0.5c0.6-0.6,0.5-1.6-0.1-2.2c-2-1.9-4.1-3.7-6.2-5.5c2.4-3.6,5-7.2,7.6-10.8\n\tc2.7,2.2,5.4,4.6,8,7c0.3,0.3,0.7,0.4,1.1,0.4c0.4,0,0.8-0.2,1.1-0.5c0.6-0.6,0.5-1.6-0.1-2.2c-2.7-2.5-5.5-5-8.3-7.3\n\tc2.6-3.5,5.2-7,7.9-10.5c3.3,2.6,6.6,5.5,9.8,8.5c0.3,0.3,0.7,0.4,1.1,0.4c0.4,0,0.8-0.2,1.2-0.5c0.6-0.6,0.5-1.6-0.1-2.2\n\tc-3.3-3-6.6-5.9-10-8.6c2.8-3.5,5.6-7,8.5-10.4c3.8,3,7.6,6.2,11.3,9.7c0.3,0.3,0.7,0.4,1.1,0.4c0.4,0,0.8-0.2,1.1-0.5\n\tc0.6-0.6,0.5-1.6-0.1-2.2c-3.8-3.5-7.6-6.7-11.4-9.7c2.8-3.3,5.7-6.5,8.7-9.6c4.3,3.3,8.6,6.9,12.9,10.9c0.3,0.3,0.7,0.4,1.1,0.4\n\tc0.4,0,0.8-0.2,1.1-0.5c0.6-0.6,0.5-1.6-0.1-2.2c-4.2-3.9-8.5-7.5-12.8-10.9c1.4-1.5,2.8-2.9,4.2-4.3c1.8-1.8,3.7-3.5,5.5-4.8\n\tc4.1,3.4,8.3,6.9,12.3,10.5c0.3,0.3,0.7,0.4,1,0.4c0.4,0,0.9-0.2,1.2-0.5c0.6-0.6,0.5-1.6-0.1-2.2c-3.8-3.4-7.8-6.8-11.8-10\n\tc3.6-2.3,7.2-3.7,10.6-4.1c0.7-0.1,1.5-0.1,2.2-0.1c5.6,0,11,2.6,16.1,7.8c8.9,8.9,10.1,18.5,3.6,28.8c-3.2-3.9-6.6-7.8-10.1-11.6\n\tc-0.6-0.6-1.6-0.7-2.2-0.1c-0.6,0.6-0.7,1.6-0.1,2.2c3.6,3.9,7.1,8.1,10.5,12.2c-1.4,1.9-3.1,3.8-5,5.7\n\tC131.7,106.9,130.3,108.2,128.9,109.6z\"/>\n<path class=\"st12\" d=\"M111.2,79.3c-0.4,0-0.7-0.1-1-0.4c-2.7-2.4-3-2.7-5.8-4.9c-0.7-0.5-0.8-1.5-0.3-2.2c0.5-0.7,1.5-0.8,2.2-0.3\n\tc2.9,2.3,3.2,2.6,6,5c0.6,0.6,0.7,1.6,0.1,2.2C112.1,79.1,111.7,79.3,111.2,79.3z\"/>\n<path class=\"st12\" d=\"M99.3,90.7c-0.4,0-0.7-0.1-1-0.4l-1.2-1.1C96.9,89,96.9,89,96.8,89c-0.2-0.1-0.5-0.3-1.6-1.3\n\tc-0.7-0.5-0.8-1.5-0.3-2.2c0.5-0.7,1.5-0.8,2.2-0.3c1.1,0.9,1.4,1.1,1.5,1.2c0.2,0.1,0.2,0.1,0.6,0.5l1.2,1c0.7,0.6,0.7,1.6,0.1,2.2\n\tC100.2,90.5,99.8,90.7,99.3,90.7z\"/>\n<ellipse transform=\"matrix(0.6437 -0.7653 0.7653 0.6437 -45.7002 102.4801)\" class=\"st12\" cx=\"87.2\" cy=\"100.3\" rx=\"1.6\" ry=\"1.6\"/>\n<g>\n\t<path class=\"st4\" d=\"M186.2,37c-0.2,0.1-20.6,9.7-47.7,35.7l-7.8-7.7c0.3-0.3,32.7-35.5,45.4-55.8l9.3,5.8\n\t\tc-2.6,4.2-6.8,10.1-11,15.6c3.9-2.3,7-3.5,7.4-3.7L186.2,37z\"/>\n</g>\n<path class=\"st27\" d=\"M193.6,31.9l-3.2-7.1c-0.2-0.5-0.5-1-0.8-1.4c0.7-1.1,1.4-2.2,2.1-3.2c1.3-2.1,1.7-4.7,1.2-7.1\n\ts-2.1-4.5-4.2-5.8L182,3.1c-1.5-1-3.3-1.4-5-1.4c-3.1,0-6.2,1.6-8,4.4c-9.2,14.8-28.7,37.1-38.1,47.4c1.9,0.8,3.8,1.8,5.6,3.1\n\tc-3.7,4.2-6.2,6.8-6.2,6.9c-1.2,1.2-1.1,3.2,0.1,4.4l5.6,5.5c0.6,0.6,1.4,0.9,2.2,0.9c0.8,0,1.6-0.3,2.2-0.9\n\tc2.4-2.3,4.7-4.4,6.9-6.4c1.3,1.8,2.4,3.6,3.3,5.5c18-16.4,32.7-25.5,38.4-28.1C193.7,42.1,195.7,36.6,193.6,31.9z M167.9,36.7\n\tc0,0,6.4-4.5,13.9-8.1l3.2,7.1c-27.8,17-46.7,35.3-46.7,35.3l-5.6-5.5c0,0,22.5-23.2,44.3-54.6l6.6,4.1\n\tC176.3,26.6,167.9,36.7,167.9,36.7z\"/>\n</svg>"
          },
          "uuid": "crops.0.51"
        }
      }
    }
  }

  return {
    dispatch: jest.fn(),
    location,
    peripherals,
    auth,
    bot,
    config,
    draggable,
    resources,
    router: { push: jest.fn() }
  }
}
