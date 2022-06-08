def on_forever():
    ginobot.set_front_lights_rgb(0x00ffff)
    ginobot.set_front_lights_rgb(0xff0000)
    ginobot.set_buzzer_freq(0)
basic.forever(on_forever)
