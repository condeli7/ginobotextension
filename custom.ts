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
    /**
      * Commands the Ginobot to move forward with speed x (0-100)
      * @param x speed value (0-100), eg: 100
      */
    //% block="move forward at $x speed"
    export function move_forward(x: speed): void {
        // Add code here
    }

    /**
     * Commands the Ginobot to move forward with speed x (0-100) with a duration
    * @param x speed value (0-100), eg: 100
    * @param duration value (seconds), eg: 1 second
    */
    //% block="move forward at $x speed for $duration seconds"
    export function move_forward_duration(x: speed, duration: number): void {
        // Add code here
    }

    /**
      * Commands the Ginobot to move backwards with speed x (0-100)
      * @param x speed value (0-100), eg: 100
      */
    //% block="move backwards at $x speed"
    export function move_backwards(x: speed): void {
        // Add code here
    }

    /**
      * Commands the Ginobot to stop moving
      */
    //% block="stop movement"
    export function stop_movement(): void {
        // Add code here
    }

    /**
      * Sets the Ginobot front RGB red LED with intensity x (0-255), green LED with intensity y (0-255) and blue LED with intensity z (0-255)
      * @param red value (0-255), eg: 100
      * @param green value (0-255), eg: 100
      * @param blue value (0-255), eg: 100
      */
    //% block="set front lights Red: $red Green: $green Blue: $blue"
    //% red.min=0 red.max=255 red.defl=0
    //% green.min=0 green.max=255 green.defl=0
    //% blue.min=0 blue.max=255 blue.defl=0
    export function set_front_lights_rgb(red: number, green: number, blue: number): void {
        if (red > 255) red = 255
    }
}
