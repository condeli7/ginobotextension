def on_button_pressed_a():
    pass
input.on_button_pressed(Button.A, on_button_pressed_a)

testVar = 0
ginobot.move(MoveDirection.FORWARD, Threshold.LOW)
ginobot.move_duration(MoveDirection.FORWARD, Threshold.LOW, min(0, 0))