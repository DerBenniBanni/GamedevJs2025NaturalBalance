const gamepadMappingStandard = "standard";
//Axes
const STICK_LEFT_HORIZONTAL = 0;
const STICK_LEFT_VERTICAL = 1;
const STICK_RIGHT_HORIZONTAL = 2;
const STICK_RIGHT_VERTICAL = 3;
//buttons
const GAMEPAD_LEFT = 14;
const GAMEPAD_RIGHT = 15;
const GAMEPAD_UP = 12;
const GAMEPAD_DOWN = 13;
const GAMEPAD_A = 0;
const GAMEPAD_B = 1;
const GAMEPAD_X = 2;
const GAMEPAD_Y = 3;
const GAMEPAD_LEFT_BUMPER= 4;
const GAMEPAD_RIGHT_BUMPER= 5;
const GAMEPAD_LEFT_TRIGGER= 6;
const GAMEPAD_RIGHT_TRIGGER= 7;

class Gamepad {
    constructor(game) {
        this.game = game;
        this.gamepadIndex = null; // Index of the connected gamepad
        this.gamepad = null; // The connected gamepad object
        this.buttons = []; // Object to store button states
        this.axes = []; // Object to store axis states
        this.buttonMap = {
            left: GAMEPAD_LEFT,
            right: GAMEPAD_RIGHT,
            up: GAMEPAD_UP,
            down: GAMEPAD_DOWN,
            a: GAMEPAD_A,
            b: GAMEPAD_B,
            x: GAMEPAD_X,
            y: GAMEPAD_Y,
            leftBumper: GAMEPAD_LEFT_BUMPER,
            rightBumper: GAMEPAD_RIGHT_BUMPER,
            leftTrigger: GAMEPAD_LEFT_TRIGGER,
            rightTrigger: GAMEPAD_RIGHT_TRIGGER
        };
        this.axisMap = {
            leftHorizontal: STICK_LEFT_HORIZONTAL,
            leftVertical: STICK_LEFT_VERTICAL,
            rightHorizontal: STICK_RIGHT_HORIZONTAL,
            rightVertical: STICK_RIGHT_VERTICAL
        };
    }
    registerGamepad(gamepad) {
        this.gamepad = gamepad; // Register the gamepad object
        this.gamepadIndex = gamepad.index; // Store the index of the gamepad
        this.buttons = new Array(gamepad.buttons.length).fill(false); // Initialize button states
        this.axes = new Array(gamepad.axes.length).fill(0); // Initialize axis states
    }
    buttonPressed(name) {
        if(!this.gamepad) return false; // Check if gamepad is connected
        if(this.buttonMap[name] == undefined) return false; // Check if the button name is valid
        return this.buttons[this.buttonMap[name]]; // Check if the button is pressed
    }
    axisValue(name) {
        if(!this.gamepad) return false; // Check if gamepad is connected
        if(this.axisMap[name] == undefined) return false; // Check if the axis name is valid
        return this.axes[this.axisMap[name]]; // Check if the axis is moved
    }
    update() {
        this.gamepad = navigator.getGamepads()[this.gamepadIndex]; // Get the gamepad object
        if (this.gamepad) {
            this.updateButtons(); // Update button states
            this.updateAxes(); // Update axis states
        }
    }
    updateButtons() {
        for (let i = 0; i < this.gamepad.buttons.length; i++) {
            const button = this.gamepad.buttons[i];
            this.buttons[i] = button.pressed; // Store the button state
            if(button.pressed) {
                this.game.inputMode = 'gamepad'; // Set input mode to gamepad if any button is pressed
            }
        }
    }
    updateAxes() {
        for (let i = 0; i < this.gamepad.axes.length; i++) {
            const axis = this.gamepad.axes[i];
            if(Math.abs(axis) > 0.1) {
                this.game.inputMode = 'gamepad'; // Set input mode to gamepad if any axis is moved
                this.axes[i] = axis; // Store the axis state
            } else {
                this.axes[i] = 0; // Reset the axis state if not moved
            }
        }
    }

}
export default function registerGamepadEvents(game, canvas) {
    game.gamepad = new Gamepad(game);
    window.addEventListener("gamepadconnected", (ev) => {
        if(ev.gamepad.mapping == gamepadMappingStandard) {
            game.gamepad.registerGamepad(ev.gamepad);
        }
    });
    window.addEventListener("gamepaddisconnected", (ev) => {
        if(ev.gamepad.index == game.gamepad.gamepadIndex) {
            game.gamepad = null; 
        }
    });
    game.actionChecks.push((game, action) => {
        if(!game.gamepad) return false; // Check if gamepad is connected
        if(!game.actions[action]) return false; // Check if the action is valid
        if(!game.actions[action].buttons) return false; // Check if the action has buttons
        return game.actions[action].buttons.some(button => {
            if (game.gamepad.buttonPressed(button)) { // Check if the button is pressed
                return true; // Return true if any button is pressed for the action
            }
            return false;
        });
    });
}
