/**
 * Speed
 */
enum Threshold {
    //% block="very_low"
    Very_Low,
    //% block="low"
    Low,
    //% block="medium"
    Medium,
    //% block="high"
    High
}
/**
 * LightsPosition
 */
enum LightsPosition {
    //% block="front"
    Front,
    //% block="back"
    Back
}
/**
 * MoveDirection
 */
enum MoveDirection {
    //% block="forward"
    Forward,
    //% block="backwards"
    Backwards
}
/**
 * RotateDirection
 */
enum RotateDirection {
    //% block="left"
    Left,
    //% block="right"
    Right
}

/**
 * SensorsPosition
 */
enum SensorsPosition {
    //% block="back"
    Back,
    //% block="front_left"
    Front_Left,
    //% block="front_right"
    Front_Right,   
    //% block="bottom_left"
    Bottom_Left,  
    //% block="bottom_right"
    Bottom_Right
}

/**
 * RoverColors: Some common colors
 */
enum CustomColors {
    //% block="red"
    Red = 0xFF0000,
    //% block="orange"
    Orange = 0xFFA500,
    //% block="yellow"
    Yellow = 0xFFFF00,
    //% block="green"
    Green = 0x00FF00,
    //% block="blue"
    Blue = 0x0000FF,
    //% block="indigo"
    Indigo = 0x4b0082,
    //% block="violet"
    Violet = 0x8a2be2,
    //% block="purple"
    Purple = 0xFF00FF,
    //% block="white"
    White = 0xFFFFFF,
    //% block="black"
    Black = 0x000000
}

//% weight=1000 color=#00AFF0 icon="\uf121"
namespace ginobot {

    function i2cRead(command: string): number{
        pins.i2cWriteBuffer(22, Buffer.fromUTF8(command));
        basic.pause(50)
        let data = pins.i2cReadBuffer(22, 13);
        basic.pause(50)
        let dataString = data.toString();
        let numberValue = parseInt(dataString);
        return numberValue;
    }

    function get_speed_value(x: Threshold): string {
        let speedNum = "0"
        if (x == Threshold.Very_Low) {
            speedNum = "55"
        } else if (x == Threshold.Low) {
            speedNum = "60"
        } else if (x == Threshold.Medium) {
            speedNum = "80"
        } else if (x == Threshold.High) {
            speedNum = "100"
        }
        return speedNum;
    }

    function get_ir_threshold_value(x: Threshold): string {
        let thr = "0"
        if (x == Threshold.Very_Low) {
            thr = "15"
        } else if (x == Threshold.Low) {
            thr = "30"
        } else if (x == Threshold.Medium) {
            thr = "60"
        } else if (x == Threshold.High) {
            thr = "90"
        }
        return thr;
    }

    function get_rgb_from_decimal(x: number): string[]{
        let red = Math.floor(x / (256 * 256));
        let green = Math.floor(x / 256) % 256;
        let blue = x % 256;
        return [red.toString(), green.toString(), blue.toString()];
    }

    function get_sensors_position_string(x: SensorsPosition): string {
        if (x == SensorsPosition.Back) {
            return "BACK";
        } else if (x == SensorsPosition.Front_Left) {
            return "FL";
        } else if (x == SensorsPosition.Front_Right) {
            return "FR";
        } else if (x == SensorsPosition.Bottom_Left) {
            return "LINE_L";
        } else if (x == SensorsPosition.Bottom_Right) {
            return "LINE_R";
        } else {
            return "";
        }
    }

    function get_lights_position_string(x: LightsPosition): string {
       if(x == LightsPosition.Front){
           return "front";
       }else{
           return "back";
       }
    }

    function get_move_direction_string(x: MoveDirection): string {
        if (x == MoveDirection.Forward) {
            return "forward";
        } else {
            return "backward";
        }
    }

    function get_rotate_direction_string(x: RotateDirection): string {
        if (x == RotateDirection.Left) {
            return "left";
        } else {
            return "right";
        }
    }

// "MOVEMENT" BLOCKS
//-----------------------------------------------------------------------------------------------------------------------------//
    /**
    * Commands the Ginobot to stop movement
    */
    //% block="stop movement" color="#4C97FF" weight=34
    //% subcategory=Movement
    export function stop_movement(): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("move_backward(0)"))
        basic.pause(50)
    }
//-----------------------------------------------------------------------------------------------------------------------------//
    /**
    * Commands the Ginobot to move forward with speed x
    * @param dir move direction
    * @param x speed value, eg: High
    */
    //% block="move $dir at $x speed" color="#4C97FF" weight weight=33
    //% group=Move
    //% subcategory=Movement
    export function move(dir: MoveDirection, x: Threshold): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("move_" + get_move_direction_string(dir) + "(" + get_speed_value(x) + ")"))
        basic.pause(50)
    }

//-----------------------------------------------------------------------------------------------------------------------------//
    /**
    * Commands the Ginobot to move forward with speed x
    * @param dir move direction
    * @param x speed value, eg: High
    * @param duration value (seconds), eg: 1 second
    */
    //% block="move $dir at $x speed for $duration seconds" color="#4C97FF" weight=32
    //% group=Move
    //% subcategory=Movement
    export function move_duration(dir: MoveDirection, x: Threshold, duration: number): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("move_" + get_move_direction_string(dir) + "(" + get_speed_value(x) + ")"))
        basic.pause(duration * 1000)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("move_" + get_move_direction_string(dir) + "(0)"))
        basic.pause(50)
    }
//-----------------------------------------------------------------------------------------------------------------------------//
    /**
     * Commands the Ginobot to turn with speed x
    * @param dir rotate direction
     * @param x speed value, eg: High
     */
    //% block="turn $dir at $x speed" color="#4C97FF" weight=23
    //% group=Turn
    //% subcategory=Movement
    export function turn(dir: RotateDirection, x: Threshold): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("turn_"+get_rotate_direction_string(dir)+"(" + get_speed_value(x) + ")"))
        basic.pause(50)
    }
//-----------------------------------------------------------------------------------------------------------------------------//
    /**
    * Commands the Ginobot to turn with speed x for a duration
    * @param dir rotate direction
    * @param x speed value, eg: High
    * @param duration value (seconds), eg: 1 second
    */
    //% block="turn $dir at $x speed for $duration seconds" color="#4C97FF" weight=22
    //% group=Turn
    //% subcategory=Movement
    export function turn_duration(dir: RotateDirection, x: Threshold, duration: number): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("turn_" + get_rotate_direction_string(dir) +"(" + get_speed_value(x) + ")"))
        basic.pause(duration * 1000)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("turn_" + get_rotate_direction_string(dir) + "(0)"))
        basic.pause(50)
    }
//-----------------------------------------------------------------------------------------------------------------------------//
    /**
    * Commands the Ginobot to rotate with speed x
    * @param dir rotate direction
    * @param x speed value, eg: High
    */
    //% block="rotate $dir at $x speed" color="#4C97FF" weight=13
    //% group=Rotate
    //% subcategory=Movement
    export function rotate_right(dir: RotateDirection, x: Threshold): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("rotate_" + get_rotate_direction_string(dir) + "(" + get_speed_value(x) + ")"))
        basic.pause(50)
    }
//-----------------------------------------------------------------------------------------------------------------------------//
    /**
    * Commands the Ginobot to rotate with speed x for a duration
    * @param dir rotate direction
    * @param x speed value, eg: High
    * @param duration value (seconds), eg: 1 second
    */
    //% block="rotate $dir at $x speed for $duration seconds" color="#4C97FF" weight=12
    //% group=Rotate
    //% subcategory=Movement
    export function rotate_right_duration(dir: RotateDirection, x: Threshold, duration: number): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("rotate_" + get_rotate_direction_string(dir) + "(" + get_speed_value(x) + ")"))
        basic.pause(duration * 1000)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("rotate_" + get_rotate_direction_string(dir) + "(0)"))
        basic.pause(50)
    }


// "Lights" BLOCKS
//-----------------------------------------------------------------------------------------------------------------------------//
    /**
      * Turns off front and back lights
      */
    //% block="turn off both lights" color="#5C2D91" weight=41
    //% subcategory=Lights
    export function turn_off_both_lights(): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_front_rgb(0,0,0)"))
        basic.pause(50)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_back_rgb(0,0,0)"))
        basic.pause(50)
    }
//-----------------------------------------------------------------------------------------------------------------------------//
    /**
      * Sets the Ginobot lights to a color
      * @param LightsPosition value
      */
    //% block="turn off $pos lights" color="#5C2D91" weight=40
    //% subcategory=Lights
    export function turn_off_lights(pos: LightsPosition): void {
        let lightsPos = get_lights_position_string(pos);
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_" + lightsPos + "_rgb(0,0,0)"))
        basic.pause(50)
    }
    //-----------------------------------------------------------------------------------------------------------------------------//
    /**
      * Sets the Ginobot lights to a color
      * @param LightsPosition value
      * @param color value
      */
    //% block="set $pos lights $color" color="#5C2D91" weight=30
    //% subcategory=Lights
    //% color.shadow="colorNumberPicker"
    export function set_lights_rgb(pos: LightsPosition, color: number): void {
        let lightsPos = get_lights_position_string(pos);
        let rgb = get_rgb_from_decimal(color);

        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_" + lightsPos + "_rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"))
        basic.pause(50)
    }
    //-----------------------------------------------------------------------------------------------------------------------------//
    /**
      * Sets the Ginobot lights to a color for a duration
      * @param LightsPosition value
      * @param color value
    * @param duration value (seconds), eg: 1 second
      */
    //% block="set $pos lights $color for $duration seconds" color="#5C2D91" weight=22
    //% subcategory=Lights
    //% color.shadow="colorNumberPicker"
    export function set_lights_rgb_duration(pos: LightsPosition, color: number, duration: number): void {
        let lightsPos = get_lights_position_string(pos);
        let rgb = get_rgb_from_decimal(color);

        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_" + lightsPos + "_rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"))
        basic.pause(duration * 1000)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_" + lightsPos + "_rgb(0,0,0)"))
        basic.pause(50)
    }
    //-----------------------------------------------------------------------------------------------------------------------------//
    /**
      * Sets the Ginobot lights to a color
      * @param color value
      */
    //% block="set both lights $color" color="#5C2D91" weight=21
    //% subcategory=Lights
    //% color.shadow="colorNumberPicker"
    export function set_both_lights_rgb(color: number): void {
        let rgb = get_rgb_from_decimal(color);

        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_front_rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"))
        basic.pause(50)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_back_rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"))
        basic.pause(50)
    }
    //-----------------------------------------------------------------------------------------------------------------------------//
    /**
      * Sets the Ginobot lights to a color for a duration
      * @param color value
    * @param duration value (seconds), eg: 1 second
      */
    //% block="set both lights $color for $duration seconds" color="#5C2D91" weight=20
    //% subcategory=Lights
    //% color.shadow="colorNumberPicker"
    export function set_both_lights_rgb_duration(color: number, duration: number): void {
        let rgb = get_rgb_from_decimal(color);

        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_front_rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"))
        basic.pause(50)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_back_rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"))
        basic.pause(duration * 1000)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_front_rgb(0,0,0)"))
        basic.pause(50)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_back_rgb(0,0,0)"))
        basic.pause(50)
    }
//-----------------------------------------------------------------------------------------------------------------------------//
    /**
      * Blink the Ginobot lights to a color
      * @param LightsPosition value
      * @param color value
    * @param duration value (seconds), eg: 1 second
      */
    //% block="blink $pos lights $color for $duration seconds" color="#5C2D91" weight=10
    //% subcategory=Lights
    //% color.shadow="colorNumberPicker"
    export function blink_lights_duration(pos: LightsPosition, color: number, duration: number): void {
        let lightsPos = get_lights_position_string(pos);
        let rgb = get_rgb_from_decimal(color);
        let endCount = (duration*1000)/200;
        for (let i = 0; i < endCount; i++) {
            pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_" + lightsPos + "_rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"))
            basic.pause(100)
            pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_" + lightsPos + "_rgb(0,0,0)"))
            basic.pause(100)
        }
        basic.pause(50)
    }
//-----------------------------------------------------------------------------------------------------------------------------//

// "Sound" BLOCKS
//-----------------------------------------------------------------------------------------------------------------------------//
    /**
      * Stop all sounds
      */
    //% block="stop all sounds" weight=30 color="#E63022"
    //% subcategory=Sounds
    export function stop_all_sounds(): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_buzzer_freq(0)"))
        basic.pause(50)
    }
//-----------------------------------------------------------------------------------------------------------------------------//
    /**
      * Play a note
      * @param freq value 
      */
    //% block="play note %note=device_note" weight=20 color="#E63022"
    //% subcategory=Sounds
    export function play_note(frequency: number): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_buzzer_freq(" + frequency.toString() + ")"))
        basic.pause(50)
    }
//-----------------------------------------------------------------------------------------------------------------------------//
    /**
  * Play a note for duration
  * @param freq value
    * @param duration value (seconds), eg: 1 second
  */
    //% block="play note %note=device_note for $duration seconds" weight=10 color="#E63022"
    //% subcategory=Sounds
    export function play_note_duration(frequency: number, duration: number): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_buzzer_freq(" + frequency.toString() + ")"))
        basic.pause(duration * 1000)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_buzzer_freq(0)"))
        basic.pause(50)
    }
//-----------------------------------------------------------------------------------------------------------------------------//
    
// "Sensors" BLOCKS
    /**
     * Get Ultrasonic distance in cm
     */
     //% block="get ultrasonic distance (cm)" weight=10 color="#D400D4"
    //% subcategory=Sensors
    export function getUltrasonicDistance(): number {
        let readValue = i2cRead("get_ultrasound_dist()")
        return readValue/10;
    } 

    /**
     * Get Ultrasonic distance in cm
     */
    //% block="get IR $sensorPos value" weight=10 color="#D400D4"
    //% subcategory=Sensors
    export function getIR_digital(sensorPos: SensorsPosition): boolean {
        let readValue = i2cRead("get_IR_" + get_sensors_position_string(sensorPos) + "_digital()");
        return readValue ? true : false;
    }

    /**
    * Sets the threshold value of the IR sensor (0-100)
    * @param IR position
    * @param threshold value
    */
    //% block="set IR $sensorPos threshold $t" weight=10 color="#D400D4"
    //% subcategory=Sensors
    export function set_ir_threshold(sensorPos: SensorsPosition, t: Threshold): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_IR_" + get_sensors_position_string(sensorPos) + "_threshold(" + get_ir_threshold_value(t)+")"))
        basic.pause(50)
    }
}
