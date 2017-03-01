
describe("generateCalendar()", function () {

});

function fixture() {
  return {
    "sync": {
      "api_version": "89bfd69",
      "compat_num": 1,
      "device": {
        "id": 78,
        "planting_area_id": null,
        "name": "loco",
        "webcam_url": null,
        "max_log_count": 100,
        "max_images_count": 100
      },
      "users": [
        {
          "id": 84,
          "device_id": 78,
          "name": "Local",
          "email": "farmbot1007@farmbot.io",
          "created_at": "2017-01-18T13:57:53.278Z",
          "updated_at": "2017-03-01T19:28:43.689Z",
          "verified_at": "2017-01-18T13:57:53.298Z",
          "verification_token": "63f64dde-fb2c-4ef5-ab92-f245e4d9ad4a",
          "agreed_to_terms_at": "2017-02-01T00:48:55.024Z"
        }
      ],
      "sequences": [
        {
          "id": 164,
          "device_id": 78,
          "name": "1",
          "color": "gray",
          "kind": "sequence",
          "args": {
            "is_outdated": false,
            "version": 4
          },
          "body": [
            {
              "kind": "take_photo",
              "args": {

              }
            }
          ],
          "updated_at": "2017-02-17T19:14:30.646Z",
          "created_at": "2017-02-10T08:32:10.420Z"
        },
        {
          "id": 165,
          "device_id": 78,
          "name": "2",
          "color": "gray",
          "kind": "sequence",
          "args": {
            "is_outdated": false,
            "version": 4
          },
          "body": [

          ],
          "updated_at": "2017-02-10T08:32:18.625Z",
          "created_at": "2017-02-10T08:32:18.625Z"
        },
        {
          "id": 184,
          "device_id": 78,
          "name": "New",
          "color": "gray",
          "kind": "sequence",
          "args": {
            "is_outdated": false,
            "version": 4
          },
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
                    "x": 1,
                    "y": 7,
                    "z": 3
                  },
                  "kind": "coordinate"
                }
              }
            }
          ],
          "updated_at": "2017-02-23T02:42:54.032Z",
          "created_at": "2017-02-23T02:42:19.412Z"
        },
        {
          "id": 185,
          "device_id": 78,
          "name": "New Sequce",
          "color": "gray",
          "kind": "sequence",
          "args": {
            "is_outdated": false,
            "version": 4
          },
          "body": [
            {
              "kind": "move_absolute",
              "args": {
                "offset": {
                  "kind": "coordinate",
                  "args": {
                    "x": 1,
                    "y": 2,
                    "z": 3
                  }
                },
                "speed": 800,
                "location": {
                  "args": {
                    "x": 2,
                    "y": 1,
                    "z": 0
                  },
                  "kind": "coordinate"
                }
              }
            }
          ],
          "updated_at": "2017-02-23T02:48:25.842Z",
          "created_at": "2017-02-23T02:43:08.051Z"
        },
        {
          "id": 166,
          "device_id": 78,
          "name": "New Sequence",
          "color": "gray",
          "kind": "sequence",
          "args": {
            "is_outdated": false,
            "version": 4
          },
          "body": [

          ],
          "updated_at": "2017-02-11T03:45:44.618Z",
          "created_at": "2017-02-11T03:45:44.618Z"
        }
      ],
      "regimens": [

      ],
      "peripherals": [
        {
          "id": 103,
          "device_id": 78,
          "pin": 13,
          "mode": 0,
          "label": "1",
          "created_at": "2017-02-17T18:48:42.378Z",
          "updated_at": "2017-02-17T18:48:42.378Z"
        }
      ],
      "regimen_items": [

      ],
      "plants": [
        {
          "id": 205,
          "device_id": 78,
          "planting_area_id": null,
          "name": "Grid Plant",
          "img_url": "//placehold.it/200x150",
          "icon_url": "/app-resources/img/icons/Sprout-96.png",
          "openfarm_slug": "not-set",
          "x": 822,
          "y": 259,
          "created_at": "2017-02-22T01:35:54.900Z",
          "radius": 50
        },
        {
          "id": 204,
          "device_id": 78,
          "planting_area_id": null,
          "name": "Grid Plant",
          "img_url": "//placehold.it/200x150",
          "icon_url": "/app-resources/img/icons/Sprout-96.png",
          "openfarm_slug": "not-set",
          "x": 801,
          "y": 469,
          "created_at": "2017-02-22T01:35:54.494Z",
          "radius": 50
        },
        {
          "id": 207,
          "device_id": 78,
          "planting_area_id": null,
          "name": "Grid Plant",
          "img_url": "//placehold.it/200x150",
          "icon_url": "/app-resources/img/icons/Sprout-96.png",
          "openfarm_slug": "not-set",
          "x": 900,
          "y": 250,
          "created_at": "2017-02-22T01:35:55.628Z",
          "radius": 50
        },
        {
          "id": 206,
          "device_id": 78,
          "planting_area_id": null,
          "name": "Grid Plant",
          "img_url": "//placehold.it/200x150",
          "icon_url": "/app-resources/img/icons/Sprout-96.png",
          "openfarm_slug": "not-set",
          "x": 900,
          "y": 200,
          "created_at": "2017-02-22T01:35:55.271Z",
          "radius": 50
        }
      ],
      "points": [
        {
          "id": 9261,
          "x": 1308.71,
          "y": 608.27,
          "z": 0,
          "radius": 148.76,
          "created_at": "2017-02-21T23:50:45.445Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9260,
          "x": 765.63,
          "y": 500,
          "z": 0,
          "radius": 80.03,
          "created_at": "2017-02-21T23:50:45.108Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9259,
          "x": 1532.12,
          "y": 479.38,
          "z": 0,
          "radius": 80.98,
          "created_at": "2017-02-21T23:50:44.762Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9258,
          "x": 1038.89,
          "y": 412.35,
          "z": 0,
          "radius": 73.98,
          "created_at": "2017-02-21T23:50:44.437Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9257,
          "x": 1368.86,
          "y": 285.18,
          "z": 0,
          "radius": 14.41,
          "created_at": "2017-02-21T23:50:44.105Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9256,
          "x": 1286.36,
          "y": 231.9,
          "z": 0,
          "radius": 61.81,
          "created_at": "2017-02-21T23:50:43.781Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9255,
          "x": 1374.01,
          "y": 216.43,
          "z": 0,
          "radius": 13.83,
          "created_at": "2017-02-21T23:50:43.447Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9254,
          "x": 1214.18,
          "y": 152.84,
          "z": 0,
          "radius": 62.01,
          "created_at": "2017-02-21T23:50:43.120Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9253,
          "x": 1260.58,
          "y": 103,
          "z": 0,
          "radius": 3.44,
          "created_at": "2017-02-21T23:50:42.791Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9252,
          "x": 772.5,
          "y": 84.1,
          "z": 0,
          "radius": 18.82,
          "created_at": "2017-02-21T23:50:42.506Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9251,
          "x": 607.52,
          "y": 42.85,
          "z": 0,
          "radius": 82.28,
          "created_at": "2017-02-21T23:50:42.449Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9250,
          "x": 62.72,
          "y": 914.18,
          "z": 0,
          "radius": 82.39,
          "created_at": "2017-02-21T23:50:42.140Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9249,
          "x": 1429.01,
          "y": 41.13,
          "z": 0,
          "radius": 73.61,
          "created_at": "2017-02-21T23:50:42.111Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9248,
          "x": 798.28,
          "y": 500,
          "z": 0,
          "radius": 966.89,
          "created_at": "2017-02-21T23:49:26.317Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9247,
          "x": 772.51,
          "y": 84.2,
          "z": 0,
          "radius": 20.06,
          "created_at": "2017-02-21T22:45:36.418Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9246,
          "x": 62.89,
          "y": 914.09,
          "z": 0,
          "radius": 82.37,
          "created_at": "2017-02-21T22:45:36.087Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9245,
          "x": 59.46,
          "y": 676.97,
          "z": 0,
          "radius": 60.95,
          "created_at": "2017-02-21T22:45:35.750Z",
          "meta": {
            "created_by": "plant-detection"
          }
        },
        {
          "id": 9244,
          "x": 1308.59,
          "y": 608.25,
          "z": 0,
          "radius": 148.73,
          "created_at": "2017-02-21T22:45:35.393Z",
          "meta": {
            "created_by": "plant-detection"
          }
        }
      ],
      "tool_bays": [
        {
          "id": 50,
          "device_id": 78,
          "name": "Tool Bay 1",
          "created_at": "2017-02-01T00:48:55.998Z",
          "updated_at": "2017-02-01T00:48:55.998Z"
        }
      ],
      "tool_slots": [

      ],
      "tools": [

      ],
      "logs": [
        {
          "id": 584020,
          "message": "Farmbot is starting a farmwares capture-and-calibrate",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.931Z",
          "updated_at": "2017-02-22T01:12:33.931Z"
        },
        {
          "id": 584021,
          "message": "Farmware Worker handling 1 scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.937Z",
          "updated_at": "2017-02-22T01:12:33.937Z"
        },
        {
          "id": 584022,
          "message": "Farmbot is setting environment for capture-and-calibrate",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.941Z",
          "updated_at": "2017-02-22T01:12:33.941Z"
        },
        {
          "id": 584023,
          "message": "Farmbot [capture-and-calibrate] Traceback (most recent call last):\n  File \"plant-detection-master/quickscripts/capture_and_calibrate.py\", line 10, in <module>\n    from Plant_Detection import Plant_Detection\nImportError: No module named Plant_Detection",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.944Z",
          "updated_at": "2017-02-22T01:12:33.944Z"
        },
        {
          "id": 584024,
          "message": "Farmbot [capture-and-calibrate] completed with errors! (1)",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "error"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.947Z",
          "updated_at": "2017-02-22T01:12:33.947Z"
        },
        {
          "id": 584025,
          "message": "Farmware Worker done with farm_scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.951Z",
          "updated_at": "2017-02-22T01:12:33.951Z"
        },
        {
          "id": 584026,
          "message": "Farmbot is starting a farmwares capture-and-calibrate",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.954Z",
          "updated_at": "2017-02-22T01:12:33.954Z"
        },
        {
          "id": 584027,
          "message": "Farmware Worker handling 1 scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.958Z",
          "updated_at": "2017-02-22T01:12:33.958Z"
        },
        {
          "id": 584028,
          "message": "Farmbot is setting environment for capture-and-calibrate",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.961Z",
          "updated_at": "2017-02-22T01:12:33.961Z"
        },
        {
          "id": 584029,
          "message": "Farmbot [capture-and-calibrate] completed!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.967Z",
          "updated_at": "2017-02-22T01:12:33.967Z"
        },
        {
          "id": 584030,
          "message": "Farmware Worker done with farm_scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.970Z",
          "updated_at": "2017-02-22T01:12:33.970Z"
        },
        {
          "id": 584031,
          "message": "Farmbot is starting a farmwares capture-and-calibrate",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.974Z",
          "updated_at": "2017-02-22T01:12:33.974Z"
        },
        {
          "id": 584032,
          "message": "Farmware Worker handling 1 scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.977Z",
          "updated_at": "2017-02-22T01:12:33.977Z"
        },
        {
          "id": 584033,
          "message": "Farmbot is setting environment for capture-and-calibrate",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.980Z",
          "updated_at": "2017-02-22T01:12:33.980Z"
        },
        {
          "id": 584034,
          "message": "Farmbot [capture-and-calibrate] Warning: Environment variable calibration parameters load failed.\n Warning: 18 objects detected. Exactly 2 reccomended. Incorrect results likely.\n ERROR: Excessive rotation required. Check that the calibration objects are parallel with the desired axis and that they are the only two objects detected.",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.984Z",
          "updated_at": "2017-02-22T01:12:33.984Z"
        },
        {
          "id": 584035,
          "message": "Farmbot [capture-and-calibrate] completed!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.988Z",
          "updated_at": "2017-02-22T01:12:33.988Z"
        },
        {
          "id": 584036,
          "message": "Farmware Worker done with farm_scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.991Z",
          "updated_at": "2017-02-22T01:12:33.991Z"
        },
        {
          "id": 584037,
          "message": "Farmbot is starting a farmwares capture-and-calibrate",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.995Z",
          "updated_at": "2017-02-22T01:12:33.995Z"
        },
        {
          "id": 584038,
          "message": "Farmware Worker handling 1 scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:33.998Z",
          "updated_at": "2017-02-22T01:12:33.998Z"
        },
        {
          "id": 584039,
          "message": "Farmbot is setting environment for capture-and-calibrate",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.002Z",
          "updated_at": "2017-02-22T01:12:34.002Z"
        },
        {
          "id": 584040,
          "message": "Farmbot [capture-and-calibrate] completed!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.005Z",
          "updated_at": "2017-02-22T01:12:34.005Z"
        },
        {
          "id": 584041,
          "message": "Farmware Worker done with farm_scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.010Z",
          "updated_at": "2017-02-22T01:12:34.010Z"
        },
        {
          "id": 584042,
          "message": "Farmbot is starting a farmwares load-and-detect",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.013Z",
          "updated_at": "2017-02-22T01:12:34.013Z"
        },
        {
          "id": 584043,
          "message": "Farmware Worker handling 1 scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.017Z",
          "updated_at": "2017-02-22T01:12:34.017Z"
        },
        {
          "id": 584044,
          "message": "Farmbot is setting environment for load-and-detect",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.020Z",
          "updated_at": "2017-02-22T01:12:34.020Z"
        },
        {
          "id": 584045,
          "message": "Farmbot [load-and-detect] Warning: Environment variable parameters load failed.\nWarning: Calibration data env var load failed. Using defaults.\nERROR: Coordinate conversion calibration values not found. Run calibration first.",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.024Z",
          "updated_at": "2017-02-22T01:12:34.024Z"
        },
        {
          "id": 584046,
          "message": "Farmbot [load-and-detect] completed!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.027Z",
          "updated_at": "2017-02-22T01:12:34.027Z"
        },
        {
          "id": 584047,
          "message": "Farmware Worker done with farm_scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.031Z",
          "updated_at": "2017-02-22T01:12:34.031Z"
        },
        {
          "id": 584048,
          "message": "Farmbot is checking for images to be uploaded.",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.035Z",
          "updated_at": "2017-02-22T01:12:34.035Z"
        },
        {
          "id": 584049,
          "message": "Image Watcher trying to upload /tmp/images/soil_image.jpg",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.038Z",
          "updated_at": "2017-02-22T01:12:34.038Z"
        },
        {
          "id": 584050,
          "message": "Farmbot https://storage.googleapis.com/farmbot-staging/temp1/8d561008-d88d-4768-b9d6-8a100aec366d.jpg Should hopefully exist shortly!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.042Z",
          "updated_at": "2017-02-22T01:12:34.042Z"
        },
        {
          "id": 584051,
          "message": "Image Watcher uploaded images",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "success"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.047Z",
          "updated_at": "2017-02-22T01:12:34.047Z"
        },
        {
          "id": 584052,
          "message": "Farmbot is clearing old data.",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.050Z",
          "updated_at": "2017-02-22T01:12:34.050Z"
        },
        {
          "id": 584053,
          "message": "Farmbot is downloading data!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "busy"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.054Z",
          "updated_at": "2017-02-22T01:12:34.054Z"
        },
        {
          "id": 584054,
          "message": "loco is registering a farm_event as Event-1",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.057Z",
          "updated_at": "2017-02-22T01:12:34.057Z"
        },
        {
          "id": 584055,
          "message": "loco is synced!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "success"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.061Z",
          "updated_at": "2017-02-22T01:12:34.061Z"
        },
        {
          "id": 584056,
          "message": "loco is starting a farmwares load-and-detect",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.064Z",
          "updated_at": "2017-02-22T01:12:34.064Z"
        },
        {
          "id": 584057,
          "message": "Farmware Worker handling 1 scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.069Z",
          "updated_at": "2017-02-22T01:12:34.069Z"
        },
        {
          "id": 584058,
          "message": "loco is setting environment for load-and-detect",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.073Z",
          "updated_at": "2017-02-22T01:12:34.073Z"
        },
        {
          "id": 584059,
          "message": "loco [load-and-detect] Warning: Environment variable parameters load failed.\nWarning: Calibration data env var load failed. Using defaults.\nERROR: Coordinate conversion calibration values not found. Run calibration first.",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.076Z",
          "updated_at": "2017-02-22T01:12:34.076Z"
        },
        {
          "id": 584060,
          "message": "loco [load-and-detect] completed!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.079Z",
          "updated_at": "2017-02-22T01:12:34.079Z"
        },
        {
          "id": 584061,
          "message": "Farmware Worker done with farm_scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.083Z",
          "updated_at": "2017-02-22T01:12:34.083Z"
        },
        {
          "id": 584062,
          "message": "loco is starting a farmwares capture-and-calibrate",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.087Z",
          "updated_at": "2017-02-22T01:12:34.087Z"
        },
        {
          "id": 584063,
          "message": "Farmware Worker handling 1 scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.090Z",
          "updated_at": "2017-02-22T01:12:34.090Z"
        },
        {
          "id": 584064,
          "message": "loco is setting environment for capture-and-calibrate",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.093Z",
          "updated_at": "2017-02-22T01:12:34.093Z"
        },
        {
          "id": 584065,
          "message": "loco [capture-and-calibrate] completed!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.097Z",
          "updated_at": "2017-02-22T01:12:34.097Z"
        },
        {
          "id": 584066,
          "message": "Farmware Worker done with farm_scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.101Z",
          "updated_at": "2017-02-22T01:12:34.101Z"
        },
        {
          "id": 584067,
          "message": "Getting Farmware Manifest",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.105Z",
          "updated_at": "2017-02-22T01:12:34.105Z"
        },
        {
          "id": 584068,
          "message": "Getting Farmware Package",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.109Z",
          "updated_at": "2017-02-22T01:12:34.109Z"
        },
        {
          "id": 584069,
          "message": "Unpacking Farmware Package",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T01:12:34.112Z",
          "updated_at": "2017-02-22T01:12:34.112Z"
        },
        {
          "id": 584070,
          "message": "Farmbot creating farmware dir.",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.054Z",
          "updated_at": "2017-02-22T03:00:44.054Z"
        },
        {
          "id": 584071,
          "message": "Starting Farmware Tracker",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.057Z",
          "updated_at": "2017-02-22T03:00:44.057Z"
        },
        {
          "id": 584072,
          "message": "Starting Farmware Worker",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.060Z",
          "updated_at": "2017-02-22T03:00:44.060Z"
        },
        {
          "id": 584073,
          "message": "Farmbot is starting serial services",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.063Z",
          "updated_at": "2017-02-22T03:00:44.063Z"
        },
        {
          "id": 584074,
          "message": "Farmbot can't log in because i have no token or credentials!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "error"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.067Z",
          "updated_at": "2017-02-22T03:00:44.067Z"
        },
        {
          "id": 584075,
          "message": "Farmbot Could not log in! :no_token",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "error"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.070Z",
          "updated_at": "2017-02-22T03:00:44.070Z"
        },
        {
          "id": 584076,
          "message": "Farmbot encountered a new local websocket connection.",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.073Z",
          "updated_at": "2017-02-22T03:00:44.073Z"
        },
        {
          "id": 584077,
          "message": "Farmbot router got credentials",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.076Z",
          "updated_at": "2017-02-22T03:00:44.076Z"
        },
        {
          "id": 584078,
          "message": "Farmbot router got config json",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.080Z",
          "updated_at": "2017-02-22T03:00:44.080Z"
        },
        {
          "id": 584079,
          "message": "Farmbot Got some new credentials.",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.084Z",
          "updated_at": "2017-02-22T03:00:44.084Z"
        },
        {
          "id": 584080,
          "message": "Farmbot is replacing %{\"authorization\" => %{\"server\" => \"https://staging.farmbot.io\"}, \"configuration\" => %{\"distance_mm_x\" => 1500, \"distance_mm_y\" => 3000, \"distance_mm_z\" => 800, \"first_party_farmware\" => true, \"fw_auto_update\" => false, \"os_auto_update\" => false, \"steps_per_mm_x\" => 5, \"steps_per_mm_y\" => 5, \"steps_per_mm_z\" => 25, \"timezone\" => nil, \"user_env\" => %{}}, \"hardware\" => %{\"params\" => %{}}, \"network\" => false} with %{\"authorization\" => %{\"server\" => \"https://staging.farmbot.io\"}, \"configuration\" => %{\"distance_mm_x\" => 1500, \"distance_mm_y\" => 3000, \"distance_mm_z\" => 800, \"first_party_farmware\" => true, \"fw_auto_update\" => false, \"os_auto_update\" => false, \"steps_per_mm_x\" => 5, \"steps_per_mm_y\" => 5, \"steps_per_mm_z\" => 25, \"timezone\" => \"America/Los_Angeles\", \"user_env\" => %{}}, \"hardware\" => %{\"params\" => %{}}, \"network\" => false}",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.090Z",
          "updated_at": "2017-02-22T03:00:44.090Z"
        },
        {
          "id": 584081,
          "message": "Trying to log in.",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.093Z",
          "updated_at": "2017-02-22T03:00:44.093Z"
        },
        {
          "id": 584082,
          "message": "Farmbot is trying to log in with credentials.",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.096Z",
          "updated_at": "2017-02-22T03:00:44.096Z"
        },
        {
          "id": 584083,
          "message": "Farmbot is up and running!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.099Z",
          "updated_at": "2017-02-22T03:00:44.099Z"
        },
        {
          "id": 584084,
          "message": "Farmbot is checking for images to be uploaded.",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.103Z",
          "updated_at": "2017-02-22T03:00:44.103Z"
        },
        {
          "id": 584085,
          "message": "Farmbot is clearing old data.",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.110Z",
          "updated_at": "2017-02-22T03:00:44.110Z"
        },
        {
          "id": 584086,
          "message": "Farmbot is downloading data!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "busy"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.112Z",
          "updated_at": "2017-02-22T03:00:44.112Z"
        },
        {
          "id": 584087,
          "message": "loco is registering a farm_event as Event-1",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.120Z",
          "updated_at": "2017-02-22T03:00:44.120Z"
        },
        {
          "id": 584088,
          "message": "loco is synced!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "success"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.124Z",
          "updated_at": "2017-02-22T03:00:44.124Z"
        },
        {
          "id": 584089,
          "message": "Getting Farmware Manifest",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.130Z",
          "updated_at": "2017-02-22T03:00:44.130Z"
        },
        {
          "id": 584090,
          "message": "Getting Farmware Package",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.133Z",
          "updated_at": "2017-02-22T03:00:44.133Z"
        },
        {
          "id": 584091,
          "message": "Unpacking Farmware Package",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.135Z",
          "updated_at": "2017-02-22T03:00:44.135Z"
        },
        {
          "id": 584092,
          "message": "Installing farmware!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.139Z",
          "updated_at": "2017-02-22T03:00:44.139Z"
        },
        {
          "id": 584093,
          "message": "Validating Farmware package",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.142Z",
          "updated_at": "2017-02-22T03:00:44.142Z"
        },
        {
          "id": 584094,
          "message": "loco is installing Farmware: plant-detection",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.146Z",
          "updated_at": "2017-02-22T03:00:44.146Z"
        },
        {
          "id": 584095,
          "message": "loco is registering a farmware as plant-detection",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.149Z",
          "updated_at": "2017-02-22T03:00:44.149Z"
        },
        {
          "id": 584096,
          "message": "loco is starting a farmwares plant-detection",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.153Z",
          "updated_at": "2017-02-22T03:00:44.153Z"
        },
        {
          "id": 584097,
          "message": "Farmware Worker handling 1 scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.156Z",
          "updated_at": "2017-02-22T03:00:44.156Z"
        },
        {
          "id": 584098,
          "message": "loco is setting environment for plant-detection",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.160Z",
          "updated_at": "2017-02-22T03:00:44.160Z"
        },
        {
          "id": 584099,
          "message": "loco [plant-detection] Processing Parameters:\n-------------------------\nBlur kernel size: 15\nMorph kernel size: 6\nIterations: 4\nHue:\n\tMIN: 30\n\tMAX: 90\nSaturation:\n\tMIN: 20\n\tMAX: 255\nValue:\n\tMIN: 20\n\tMAX: 255\n-------------------------\n\nProcessing image: /tmp/farmware/plant-detection/plant-detection-master/soil_image.jpg\n16 plants detected in image.\n\n2 known plants inputted.\nPlants at the following machine coordinates ( X Y ) with R = radius are to be saved:\n    (   200   600 ) R = 100\n    (   900   200 ) R = 120\n\n14 plants marked for removal.\nPlants at the following machine coordinates ( X Y ) with R = radius are to be removed:\n    (  1429    41 ) R = 74\n    (   608    43 ) R = 82\n    (  1260   103 ) R = 3\n    (  1214   153 ) R = 62\n    (  1374   216 ) R = 14\n    (  1286   232 ) R = 62\n    (  1369   285 ) R = 14\n    (  1039   412 ) R = 74\n    (  1532   479 ) R = 81\n    (   766   500 ) R = 80\n    (  1309   608 ) R = 149\n    (    59   677 ) R = 61\n    (    63   914 ) R = 82\n    (   773    84 ) R = 20\n\n1 plants marked for safe removal.\nPlants at the following machine coordinates ( X Y ) with R = radius were too close to the known plant to remove completely:\n    (   838    86 ) R = 81\n\n2 detected plants are known or have escaped removal.\nPlants at the following machine coordinates ( X Y ) with R = radius have been saved:\n    (   901   189 ) R = 65\n    (   236   579 ) R = 91",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.164Z",
          "updated_at": "2017-02-22T03:00:44.164Z"
        },
        {
          "id": 584100,
          "message": "loco [plant-detection] completed!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.168Z",
          "updated_at": "2017-02-22T03:00:44.168Z"
        },
        {
          "id": 584101,
          "message": "Farmware Worker done with farm_scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.174Z",
          "updated_at": "2017-02-22T03:00:44.174Z"
        },
        {
          "id": 584102,
          "message": "Getting Farmware Manifest",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.178Z",
          "updated_at": "2017-02-22T03:00:44.178Z"
        },
        {
          "id": 584103,
          "message": "Getting Farmware Package",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.183Z",
          "updated_at": "2017-02-22T03:00:44.183Z"
        },
        {
          "id": 584104,
          "message": "Unpacking Farmware Package",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.188Z",
          "updated_at": "2017-02-22T03:00:44.188Z"
        },
        {
          "id": 584105,
          "message": "Installing farmware!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.193Z",
          "updated_at": "2017-02-22T03:00:44.193Z"
        },
        {
          "id": 584106,
          "message": "Validating Farmware package",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.196Z",
          "updated_at": "2017-02-22T03:00:44.196Z"
        },
        {
          "id": 584107,
          "message": "loco is installing Farmware: load-and-detect",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.200Z",
          "updated_at": "2017-02-22T03:00:44.200Z"
        },
        {
          "id": 584108,
          "message": "loco is registering a farmware as load-and-detect",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.203Z",
          "updated_at": "2017-02-22T03:00:44.203Z"
        },
        {
          "id": 584109,
          "message": "loco is starting a farmwares load-and-detect",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.206Z",
          "updated_at": "2017-02-22T03:00:44.206Z"
        },
        {
          "id": 584110,
          "message": "Farmware Worker handling 1 scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.212Z",
          "updated_at": "2017-02-22T03:00:44.212Z"
        },
        {
          "id": 584111,
          "message": "loco is setting environment for load-and-detect",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.215Z",
          "updated_at": "2017-02-22T03:00:44.215Z"
        },
        {
          "id": 584112,
          "message": "loco [load-and-detect] completed!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.220Z",
          "updated_at": "2017-02-22T03:00:44.220Z"
        },
        {
          "id": 584113,
          "message": "Farmware Worker done with farm_scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.223Z",
          "updated_at": "2017-02-22T03:00:44.223Z"
        },
        {
          "id": 584114,
          "message": "loco is starting a farmwares load-and-detect",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.229Z",
          "updated_at": "2017-02-22T03:00:44.229Z"
        },
        {
          "id": 584115,
          "message": "Farmware Worker handling 1 scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.232Z",
          "updated_at": "2017-02-22T03:00:44.232Z"
        },
        {
          "id": 584116,
          "message": "loco is setting environment for load-and-detect",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.236Z",
          "updated_at": "2017-02-22T03:00:44.236Z"
        },
        {
          "id": 584117,
          "message": "loco [load-and-detect] completed!",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.241Z",
          "updated_at": "2017-02-22T03:00:44.241Z"
        },
        {
          "id": 584118,
          "message": "Farmware Worker done with farm_scripts",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.244Z",
          "updated_at": "2017-02-22T03:00:44.244Z"
        },
        {
          "id": 584119,
          "message": "Getting Farmware Manifest",
          "meta": {
            "x": -1,
            "y": -2,
            "z": -3,
            "type": "info"
          },
          "channels": [

          ],
          "device_id": 78,
          "created_at": "2017-02-22T03:00:44.250Z",
          "updated_at": "2017-02-22T03:00:44.250Z"
        }
      ],
      "images": [
        {
          "id": 160,
          "device_id": 78,
          "attachment_processed_at": "2017-02-22T01:11:04.219Z",
          "updated_at": "2017-02-22T01:11:04.224Z",
          "created_at": "2017-02-22T01:11:00.792Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/160/x640/open-uri20170222-4-15oocf6?1487725863",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 158,
          "device_id": 78,
          "attachment_processed_at": "2017-02-21T00:12:56.724Z",
          "updated_at": "2017-02-21T00:12:56.728Z",
          "created_at": "2017-02-21T00:12:54.288Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/158/x640/open-uri20170221-4-h94plv?1487635976",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 157,
          "device_id": 78,
          "attachment_processed_at": "2017-02-21T00:11:49.011Z",
          "updated_at": "2017-02-21T00:11:49.015Z",
          "created_at": "2017-02-21T00:11:44.399Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/157/x640/open-uri20170221-4-1pyzptm?1487635908",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 156,
          "device_id": 78,
          "attachment_processed_at": "2017-02-21T00:11:46.574Z",
          "updated_at": "2017-02-21T00:11:46.613Z",
          "created_at": "2017-02-21T00:11:43.240Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/156/x640/open-uri20170221-4-l34ucq?1487635906",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 126,
          "device_id": 78,
          "attachment_processed_at": "2017-02-09T00:02:40.527Z",
          "updated_at": "2017-02-09T00:02:40.534Z",
          "created_at": "2017-02-09T00:02:36.010Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/126/x640/open-uri20170209-4-39g596?1486598559",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 123,
          "device_id": 78,
          "attachment_processed_at": "2017-02-08T23:55:04.644Z",
          "updated_at": "2017-02-08T23:55:04.657Z",
          "created_at": "2017-02-08T23:55:01.279Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/123/x640/open-uri20170208-4-1s2raru?1486598103",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 104,
          "device_id": 78,
          "attachment_processed_at": "2017-02-08T23:34:37.895Z",
          "updated_at": "2017-02-08T23:34:37.916Z",
          "created_at": "2017-02-08T23:34:35.206Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/104/x640/open-uri20170208-4-18v1j5d?1486596876",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 96,
          "device_id": 78,
          "attachment_processed_at": "2017-02-08T22:47:51.438Z",
          "updated_at": "2017-02-08T22:47:51.444Z",
          "created_at": "2017-02-08T22:47:46.961Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/096/x640/open-uri20170208-4-1ukj6ql?1486594070",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 95,
          "device_id": 78,
          "attachment_processed_at": "2017-02-08T22:47:18.982Z",
          "updated_at": "2017-02-08T22:47:18.987Z",
          "created_at": "2017-02-08T22:47:18.170Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/095/x640/open-uri20170208-4-1ivy52j?1486594038",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 94,
          "device_id": 78,
          "attachment_processed_at": "2017-02-08T22:46:01.739Z",
          "updated_at": "2017-02-08T22:46:01.745Z",
          "created_at": "2017-02-08T22:45:58.085Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/094/x640/open-uri20170208-4-f69czf?1486593961",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 93,
          "device_id": 78,
          "attachment_processed_at": "2017-02-08T22:23:03.391Z",
          "updated_at": "2017-02-08T22:23:03.396Z",
          "created_at": "2017-02-08T22:23:00.458Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/093/x640/open-uri20170208-4-1shg9cj?1486592583",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 92,
          "device_id": 78,
          "attachment_processed_at": "2017-02-08T22:08:29.506Z",
          "updated_at": "2017-02-08T22:08:29.512Z",
          "created_at": "2017-02-08T22:08:28.330Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/092/x640/open-uri20170208-4-c3jn8c?1486591709",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 91,
          "device_id": 78,
          "attachment_processed_at": "2017-02-08T22:07:11.809Z",
          "updated_at": "2017-02-08T22:07:11.817Z",
          "created_at": "2017-02-08T22:07:10.381Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/091/x640/open-uri20170208-4-1kmewl3?1486591631",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 90,
          "device_id": 78,
          "attachment_processed_at": "2017-02-08T22:00:14.233Z",
          "updated_at": "2017-02-08T22:00:14.309Z",
          "created_at": "2017-02-08T22:00:08.352Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/090/x640/open-uri20170208-4-62grpc?1486591213",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 86,
          "device_id": 78,
          "attachment_processed_at": "2017-02-07T04:30:40.890Z",
          "updated_at": "2017-02-07T04:30:40.905Z",
          "created_at": "2017-02-07T04:30:37.174Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/086/x640/open-uri20170207-4-1hpcdan?1486441839",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 85,
          "device_id": 78,
          "attachment_processed_at": "2017-02-07T04:29:24.377Z",
          "updated_at": "2017-02-07T04:29:24.412Z",
          "created_at": "2017-02-07T04:29:20.846Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/085/x640/open-uri20170207-4-369u28?1486441763",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 84,
          "device_id": 78,
          "attachment_processed_at": "2017-02-07T00:55:31.636Z",
          "updated_at": "2017-02-07T00:55:31.652Z",
          "created_at": "2017-02-07T00:54:53.806Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/084/x640/open-uri20170207-4-ldz77x?1486428928",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 83,
          "device_id": 78,
          "attachment_processed_at": "2017-02-07T00:55:27.060Z",
          "updated_at": "2017-02-07T00:55:27.074Z",
          "created_at": "2017-02-07T00:54:52.745Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/083/x640/open-uri20170207-4-wzmrot?1486428922",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 82,
          "device_id": 78,
          "attachment_processed_at": "2017-02-07T00:55:19.780Z",
          "updated_at": "2017-02-07T00:55:19.800Z",
          "created_at": "2017-02-07T00:54:51.799Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/082/x640/open-uri20170207-4-krez4t?1486428917",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 81,
          "device_id": 78,
          "attachment_processed_at": "2017-02-07T00:55:15.485Z",
          "updated_at": "2017-02-07T00:55:15.561Z",
          "created_at": "2017-02-07T00:54:50.556Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/081/x640/open-uri20170207-4-8kfhyp?1486428912",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 80,
          "device_id": 78,
          "attachment_processed_at": "2017-02-07T00:55:10.779Z",
          "updated_at": "2017-02-07T00:55:10.788Z",
          "created_at": "2017-02-07T00:54:49.587Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/080/x640/open-uri20170207-4-1hktr6y?1486428907",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 79,
          "device_id": 78,
          "attachment_processed_at": "2017-02-07T00:55:05.857Z",
          "updated_at": "2017-02-07T00:55:05.877Z",
          "created_at": "2017-02-07T00:54:48.515Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/079/x640/open-uri20170207-4-11z8rla?1486428903",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 78,
          "device_id": 78,
          "attachment_processed_at": "2017-02-07T00:55:01.782Z",
          "updated_at": "2017-02-07T00:55:01.794Z",
          "created_at": "2017-02-07T00:54:47.506Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/078/x640/open-uri20170207-4-1foiuh6?1486428899",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 77,
          "device_id": 78,
          "attachment_processed_at": "2017-02-07T00:54:57.108Z",
          "updated_at": "2017-02-07T00:54:57.143Z",
          "created_at": "2017-02-07T00:54:46.455Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/077/x640/open-uri20170207-4-ej6dvt?1486428895",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 76,
          "device_id": 78,
          "attachment_processed_at": "2017-02-07T00:54:53.258Z",
          "updated_at": "2017-02-07T00:54:53.298Z",
          "created_at": "2017-02-07T00:54:45.460Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/076/x640/open-uri20170207-4-1jrn5c9?1486428892",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 75,
          "device_id": 78,
          "attachment_processed_at": "2017-02-07T00:54:49.364Z",
          "updated_at": "2017-02-07T00:54:49.565Z",
          "created_at": "2017-02-07T00:54:44.480Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/075/x640/open-uri20170207-4-1i84735?1486428886",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 74,
          "device_id": 78,
          "attachment_processed_at": "2017-02-06T22:01:42.688Z",
          "updated_at": "2017-02-06T22:01:42.694Z",
          "created_at": "2017-02-06T22:01:37.875Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/074/x640/open-uri20170206-4-1m7tny?1486418498",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 73,
          "device_id": 78,
          "attachment_processed_at": null,
          "updated_at": "2017-02-06T22:01:36.304Z",
          "created_at": "2017-02-06T22:01:36.304Z",
          "attachment_url": "http://placehold.it/640%3Ftext=Processing...",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 72,
          "device_id": 78,
          "attachment_processed_at": null,
          "updated_at": "2017-02-06T20:42:21.543Z",
          "created_at": "2017-02-06T20:42:21.543Z",
          "attachment_url": "http://placehold.it/640%3Ftext=Processing...",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 71,
          "device_id": 78,
          "attachment_processed_at": "2017-02-06T20:41:05.673Z",
          "updated_at": "2017-02-06T20:41:05.682Z",
          "created_at": "2017-02-06T20:40:50.954Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/071/x640/open-uri20170206-4-134sou6?1486413655",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 70,
          "device_id": 78,
          "attachment_processed_at": "2017-02-06T20:39:48.800Z",
          "updated_at": "2017-02-06T20:39:48.810Z",
          "created_at": "2017-02-06T20:39:39.231Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/070/x640/open-uri20170206-4-1t6pe2g?1486413583",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 69,
          "device_id": 78,
          "attachment_processed_at": "2017-02-06T20:37:36.551Z",
          "updated_at": "2017-02-06T20:37:36.565Z",
          "created_at": "2017-02-06T20:37:21.980Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/069/x640/open-uri20170206-4-138nnbh?1486413454",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 68,
          "device_id": 78,
          "attachment_processed_at": "2017-02-06T20:37:32.033Z",
          "updated_at": "2017-02-06T20:37:32.054Z",
          "created_at": "2017-02-06T20:37:20.859Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/068/x640/open-uri20170206-4-1byqzp0?1486413447",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        },
        {
          "id": 67,
          "device_id": 78,
          "attachment_processed_at": "2017-02-06T20:37:24.973Z",
          "updated_at": "2017-02-06T20:37:25.190Z",
          "created_at": "2017-02-06T20:37:19.696Z",
          "attachment_url": "https://farmbot-staging.storage.googleapis.com/images/attachments/000/000/067/x640/open-uri20170206-4-17kwjnt?1486413440",
          "meta": {
            "x": -1,
            "y": -1,
            "z": -1
          }
        }
      ],
      "farm_events": [
        {
          "id": 1,
          "start_time": "2017-02-06T22:57:51.721Z",
          "end_time": null,
          "next_time": "2019-11-03T22:57:51.721Z",
          "repeat": 1000,
          "time_unit": "daily",
          "executable_id": 68,
          "executable_type": "Sequence",
          "calendar": [

          ]
        },
        {
          "id": 24,
          "start_time": "2017-03-01T18:55:09.032Z",
          "end_time": "2017-03-01T18:58:09.032Z",
          "next_time": "2017-03-01T18:52:30.502Z",
          "repeat": 1,
          "time_unit": "minutely",
          "executable_id": 164,
          "executable_type": "Sequence",
          "calendar": [

          ]
        },
        {
          "id": 25,
          "start_time": "2017-03-01T19:05:23.439Z",
          "end_time": "2017-03-01T19:10:23.439Z",
          "next_time": "2017-03-01T19:02:46.155Z",
          "repeat": 1,
          "time_unit": "minutely",
          "executable_id": 165,
          "executable_type": "Sequence",
          "calendar": [

          ]
        }
      ]
    }
  };
}
