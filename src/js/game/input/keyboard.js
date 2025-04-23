

export default function registerKeys(game) {
    const handleEvent = (ev, bool) => {
        if(ev.code != 'F5' && ev.code != 'F11' && ev.code != 'F12') { 
            ev.preventDefault(); // Prevent default action for the key event
        }
        game.keys[ev.code] = bool;
        game.inputMode = 'keyboard'; // Set input mode to keyboard
    }
    window.addEventListener('keydown', (ev) => handleEvent(ev, true)); // Register keydown event
    window.addEventListener('keyup', (ev) => handleEvent(ev, false)); // Register keyup event

    game.actionChecks.push((game, action) => {
        return game.actions[action].keys.some(key => {
            if (game.keys[key]) { // Check if the key is pressed
                return true; // Return true if any key is pressed for the action
            }
            return false;
        }); 
    });
}