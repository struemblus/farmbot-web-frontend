/**
 * Seems like a better idea to keep content and tooltips centralized. If we have
 * the ability to keep the app safer from possible accidental breakages by
 * avoiding going into components for copy changes, why not right? ¯\_(ツ)_/¯
 */

export namespace ToolTips {

  // Controls
  export const MOVE =
    `Use these manual control buttons to move FarmBot in realtime. Press the
    arrows for relative movements or type in new coordinates and press GO for an
    absolute movement. Tip: Press the Home button when you are done so FarmBot
    is ready to get back to work.`

  export const WEBCAM_SAVE =
    `Press the edit button to update and save your webcam URL.`

  export const PERIPHERALS =
    `Use these toggle switches to control FarmBot's peripherals in realtime. To
    edit and create new peripherals, press the EDIT button. Make sure to turn
    things off when you're done!`

  // Device
  export const OS_SETTINGS =
    `This widget shows device information.`

  export const HW_SETTINGS =
    `Change settings of your FarmBot hardware with the fields below. Caution:
    Changing these settings to extreme values can cause hardware malfunction.
    Make sure to test any new settings before letting your FarmBot use them
    unsupervised. Tip: Recalibrate FarmBot after changing settings and test a
    few sequences to verify that everything works as expected. Note: Currently
    not all settings can be changed.`

  export const MAX_SPEED =
    `Maximum travel speed after acceleration in motor steps per second.`

  export const STEPS_PER_MM =
    `The number of motor steps required to move the axis one millimeter.`

  export const ACCELERATE_FOR =
    `Number of steps used for acceleration and deceleration.`

  export const TIMEOUT_AFTER =
    `Amount of time to wait for a command to execute before stopping.`

  export const LENGTH =
    `Coming Soon! Set the length of each axis to provide software limits.`

  export const ENCODER_SCALING =
    `(Alpha) encoder scaling factor = 100 * (motor resolution * microsteps) /
    (encoder resolution * 4)`

  export const MAX_MISSED_STEPS =
    `(Alpha) Number of steps missed (determined by encoder) before motor is
    considered to have stalled.`

  export const ENCODER_MISSED_STEP_DECAY =
    `(Alpha) Reduction to missed step total for every good step.`

  export const ENABLE_ENCODERS =
    `(Alpha) Enable use of rotary encoders during calibration and homing.`

  export const ALWAYS_POWER_MOTORS =
    `Keep power applied to motors. Prevents slipping from gravity in certain
    situations.`

  export const INVERT_ENCODERS =
    `(Alpha) Reverse the direction of encoder position reading.`

  export const INVERT_ENDPOINTS =
    `Swap axis end-stops during calibration.`

  export const INVERT_MOTORS =
    `Invert direction of motor during calibration.`

  export const NEGATIVE_COORDINATES_ONLY =
    `Restrict travel to negative coordinate locations. Overridden by disabling
    software limits.`

  export const ENABLE_ENDSTOPS =
    `Enable use of electronic end-stops during calibration and homing.`

  export const FIND_HOME_ON_BOOT =
    `Finds the home position when the device powers on.`

  export const SOFTWARE_LIMITS =
    `Stop at home.`

  export const ENABLE_MOTOR =
    `Enable use of a second x-axis motor. Connects to E0 on RAMPS.`

  // Farmware
  export const FARMWARE =
    `This widget shows Farmware (plugin) information.`

  export const PHOTOS =
    `Take and view photos with your FarmBot's camera.`

  export const WEED_DETECTOR =
    `Detect weeds using FarmBot's camera and display them on the Farm Designer
    map.`

  // Sequences
  export const SEQUENCE_COMMANDS =
    `These are the most basic commands FarmBot can execute. Drag and drop them
    to create sequences for watering, planting seeds, measuring soil properties,
    and more.`

  export const SEQUENCE_EDITOR =
    `Drag and drop commands here to create sequences for watering, planting
    seeds, measuring soil properties, and more. Press the Test button to
    immediately try your sequence with FarmBot. You can also edit, copy, and
    delete existing sequences; assign a color; and give your commands custom
    names.`

  export const SEQUENCE_LIST =
    `Here is the list of all of your sequences. Click one to edit.`

  // Regimens
  export const BULK_SCHEDULER =
    `Add sequences to your regimen by selecting a sequence from the drop down, 
    specifying a time, choosing which days it should run on, and then clicking 
    the + button. For example: a Seeding sequence might be scheduled for Day 1, 
    while a Watering sequence would be scheduled to run every other day.`

  export const REGIMEN_EDITOR =
    `Regimens allow FarmBot to take care of a plant throughout its entire life.
    A regimen consists of many sequences that are scheduled to run based on the
    age of the plant. Regimens are applied to plants from the farm designer
    (coming soon) and can be re-used on many plants growing at the same or
    different times. Multiple regimens can be applied to any one plant.`

  export const REGIMEN_LIST =
    `This is a list of all of your regimens. Click one to begin editing it.`

  // Tools
  export const TOOL_LIST =
    `This is a list of all your FarmBot Tools. Click the Edit button to add,
    edit, or delete tools.`

  export const TOOLBAY_LIST =
    `Toolbays are where you store your FarmBot Tools. Each Toolbay has Slots
    that you can put your Tools in, which should be reflective of your real
    FarmBot hardware configuration.`

  export const STOP_AT_MAX = `Stop at max.`
  export const ENCODER_POSITIONING = `Use encoders for positioning.`
}

export namespace Content {

  // Account
  export const ACCOUNT_DELETE_WARNING =
    `WARNING! Deleting your account will permanently delete all of your
    Sequences , Regimens, Events, and Farm Designer data.Upon deleting your
    account, FarmBot will cease to function and become inaccessible until it is
    paired with another web app account. To do this, you will need to reboot
    your FarmBot so that is goes back into configuration mode for pairing with
    another user account. When this happens, all of the data on your FarmBot
    will be overwritten with the new account's data. If the account is brand
    new, then FarmBot will become a blank slate.`

  // Controls
  export const FACTORY_RESET_WARNING =
    `Factory resetting your FarmBot will destroy all data on the device,
    revoking your FarmBot's abilily to connect to your web app account and your
    home wifi. Upon factory resetting, your device will restart into
    Configurator mode. Factory resetting your FarmBot will not affect any data
    or settings from your web app account, allowing you to do a complete restore
    to your device once it is back online and paired with your web app account.`
}


