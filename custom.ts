/**
 * Custom blocks
 */
enum speed {
    //% block="low"
    Low,
    //% block="medium"
    Medium,
    //% block="high"
    High
}

//% weight=1000 color=#00AFF0 icon="\uf121"
namespace ginobot {

    function get_speed_value(x: speed): string {
        let speedNum = "0"
        if (x == speed.Low) {
            speedNum = "60"
        } else if (x == speed.Medium) {
            speedNum = "80"
        } else if (x == speed.High) {
            speedNum = "100"
        }
        return speedNum;
    }

    /**
    * Commands the Ginobot to move forward with speed x (0-100)
    * @param x speed value (0-100), eg: 100
    */
    //% block="set front lights $r" color=#000000
    export function set_front_lights_red(r: number): void {
        // Add code here
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_front_red("+r+")"))
    }

// "MOVEMENT" BLOCKS
    /**
    * Commands the Ginobot to stop movement
    */
    //% block="stop movement"
    //% subcategory=Movement
    export function stop_movement(): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("move_backward(0)"))
        basic.pause(200)
    }

    /**
        * Commands the Ginobot to rotate right with speed x
        * @param x speed value, eg: High
        * @param duration value (seconds), eg: 1 second
        */
    //% block="rotate right at $x speed for $duration seconds"
    //% subcategory=Movement
    export function rotate_right_duration(x: speed, duration: number): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("rotate_right(" + get_speed_value(x) + ")"))
        basic.pause(duration * 1000)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("move_backward(0)"))
        basic.pause(200)
    }

    /**
    * Commands the Ginobot to rotate right with speed x
    * @param x speed value, eg: High
    */
    //% block="rotate right at $x speed"
    //% subcategory=Movement
    export function rotate_right(x: speed): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("rotate_right(" + get_speed_value(x) + ")"))
        basic.pause(200)
    }

    /**
    * Commands the Ginobot to turn right with speed x
    * @param x speed value, eg: High
    * @param duration value (seconds), eg: 1 second
    */
    //% block="turn right at $x speed for $duration seconds"
    //% subcategory=Movement
    export function turn_right_duration(x: speed, duration: number): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("turn_right(" + get_speed_value(x) + ")"))
        basic.pause(duration * 1000)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("move_backward(0)"))
        basic.pause(200)
    }

    /**
        * Commands the Ginobot to turn right with speed x
        * @param x speed value, eg: High
        */
    //% block="turn right at $x speed"
    //% subcategory=Movement
    export function turn_right(x: speed): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("turn_right(" + get_speed_value(x) + ")"))
        basic.pause(200)
    }

    /**
    * Commands the Ginobot to move backwards with speed x
    * @param x speed value, eg: High
    * @param duration value (seconds), eg: 1 second
    */
    //% block="move backwards at $x speed for $duration seconds"
     //% subcategory=Movement
    export function move_backwards_duration(x: speed, duration: number): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("move_backward(" + get_speed_value(x) + ")"))
        basic.pause(duration * 1000)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("move_backward(0)"))
        basic.pause(200)
    }

    /**
    * Commands the Ginobot to move backwards with speed x
    * @param x speed value, eg: High
    */
    //% block="move backwards at $x speed"
    //% subcategory=Movement
    export function move_backwards(x: speed): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("move_backward(" + get_speed_value(x) + ")"))
        basic.pause(200)
    }

    /**
    * Commands the Ginobot to move forward with speed x
    * @param x speed value, eg: High
    * @param duration value (seconds), eg: 1 second
    */
    //% block="move forward at $x speed for $duration seconds"
    //% subcategory=Movement
    export function move_forward_duration(x: speed, duration: number): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("move_forward(" + get_speed_value(x) + ")"))
        basic.pause(duration * 1000)
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("move_forward(0)"))
        basic.pause(200)
    }

    /**
    * Commands the Ginobot to move forward with speed x
    * @param x speed value, eg: High
    */
    //% block="move forward at $x speed"
    //% subcategory=Movement
    export function move_forward(x: speed): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("move_forward(" + get_speed_value(x) + ")"))
        basic.pause(200)
    }

// "Lights" BLOCKS
    /**
      * Sets the Ginobot front RGB red LED with intensity x (0-255), green LED with intensity y (0-255) and blue LED with intensity z (0-255)
      * @param red value (0-255), eg: 100
      * @param green value (0-255), eg: 100
      * @param blue value (0-255), eg: 100
      */
    //% block="set front lights Red: $red Green: $green Blue: $blue"
    //% subcategory=RGB_Lights
    //% red.min=0 red.max=255 red.defl=0
    //% green.min=0 green.max=255 green.defl=0
    //% blue.min=0 blue.max=255 blue.defl=0
    export function set_front_lights_rgb(red: number, green: number, blue: number): void {
        if (red > 255) red = 255
        if (green > 255) green = 255
        if (blue > 255) blue = 255
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_RGB_front_rgb(" + red.toString() + "," + green.toString()+"," + blue.toString()+")"))
        basic.pause(200)
    }

// "Sound" BLOCKS
    /**
      * Sets the Ginobot front RGB red LED with intensity x (0-255), green LED with intensity y (0-255) and blue LED with intensity z (0-255)
      * @param freq value 
      */
    //% block="set buzzer frequency at $freq"
    //% subcategory=Sounds
    export function set_buzzer_freq(freq: number): void {
        pins.i2cWriteBuffer(22, Buffer.fromUTF8("set_buzzer_freq(" + freq.toString() + ")"))
        basic.pause(200)
    }
}
