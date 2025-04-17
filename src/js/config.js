const config = {
    actions : [
        { name: 'left', keys: ['KeyA', 'ArrowLeft'], buttons: ['left'] },
        { name: 'right', keys: ['KeyD', 'ArrowRight'], buttons: ['right'] },
        { name: 'up', keys: ['KeyW', 'ArrowUp'], buttons: ['up'] },
        { name: 'down', keys: ['KeyS', 'ArrowDown'], buttons: ['down'] },
        { name: 'space', keys: ['Space'] },
        { name: 'enter', keys: ['Enter'] },
        { name: 'escape', keys: ['Escape'] },
        { name: 'shift', keys: ['ShiftLeft', 'ShiftRight'] },
        { name: 'ctrl', keys: ['ControlLeft', 'ControlRight'] },
        { name: 'alt', keys: ['AltLeft', 'AltRight'] },
        { name: 'fire', keys: ['Space', 'mousedown'], buttons: ['a', 'b', 'rightTrigger'] },
    ]
};

export default config;