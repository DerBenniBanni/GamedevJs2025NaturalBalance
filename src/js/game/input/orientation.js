export default function registerOrientationEvents(game) {
    
    function handleDeviceOrientation(event) {
        // Check if the event has the required properties
        if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
            if(!game.orientation) {
                game.orientation = {
                    alpha: event.alpha,
                    beta: event.beta,
                    gamma: event.gamma
                };
                game.orientationZero = {
                    alpha: event.alpha,
                    beta: event.beta,
                    gamma: event.gamma
                };
            }
            // Calculate the change in orientation
            game.orientation.alpha = event.alpha - game.orientationZero.alpha;
            game.orientation.beta = event.beta - game.orientationZero.beta;
            game.orientation.gamma = event.gamma - game.orientationZero.gamma;
        }
    }

    // Check if device orientation is supported
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
            .then((response) => {
                if (response === "granted") {
                    // Permission granted, start listening to device orientation events
                    window.addEventListener("deviceorientation", handleDeviceOrientation, true);
                } else {
                    console.error("Device orientation permission denied.");
                }
            })
            .catch((error) => {
                console.error("Error requesting device orientation permission:", error);
            });
    } else {
        // Fallback for non-iOS devices or when permission is not required
        window.addEventListener("deviceorientation", handleDeviceOrientation, true);
    }
}
