const gamepadMappingStandard = "standard";

export default function registerGamepadEvents(game, canvas) {
    
    window.addEventListener("gamepadconnected", (ev) => {
        console.log("Gamepad connected: ", ev); // Log the connected gamepad
        if(ev.gamepad.mapping == gamepadMappingStandard) {
            //inputGamepadIndex = ev.gamepad.index
        }
    });
    window.addEventListener("gamepaddisconnected", (ev) => {
        //inputGamepadIndex = -1
        //navigator.getGamepads().find(gamepad => gamepad.mapping == gamepadMappingStandard)
    });
}
