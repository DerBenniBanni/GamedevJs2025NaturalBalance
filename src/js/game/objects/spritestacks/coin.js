let yellow = 'ff0';
let yellowStroke = 'db0';
let shadow = '00000001';

const stackDefCoin = {
    def:[
        // Box: base-height, height, top, left, width, depth, fillcolor, strokecolor
        ['B', 0, 1, -10, -5, 20, 10, shadow, ], 
        
        ['B', 10, 2, -8, -2, 16, 4, yellow, ],
        ['B', 12, 2, -12, -2, 24, 4, yellow, ],
        ['B', 14, 16, -14, -2, 28, 4, yellow, ],
        ['B', 30, 2, -12, -2, 24, 4, yellow, ], 
        ['B', 32, 2, -8, -2, 16, 4, yellow, ],

        ['B', 12, 18, -2, -3, 4, 6, yellowStroke, ],
        ['B', 16, 14, -3, -3, 6, 6, yellowStroke, ],
        ['B', 20, 10, -4, -3, 8, 6, yellowStroke, ],
        
    ]
};
export default stackDefCoin;
export {stackDefCoin};