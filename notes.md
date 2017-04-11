# Encoder Scaling
|GCode|Param|Name|
|---|---|---|---|
|F15 |115|Enc. scaling|
|F16 |116|Enc. scaling|
|F17?|117|Enc. scaling|
|F05?|105|Enc. type|
|F06?|106|Enc. type|
|F07?|107|Enc. type|
|????|???|Enable X2|
|????|???|Invert X2|
|????|???|Set Home X|
|????|???|Set Home Y|
|????|???|Set Home Z|

# MCU Reset button

```
ok this is implemented on the farmbot os side.

Farmbot JS will need an update:

{
kind: "factory_reset"
args: {package: "arduino_firmware" || "farmbot_os"}
}

and the frontend will need a button
```
