let lynxFill = 'd95';
let lynxStroke = 'a73';
let lynxLightFill = 'ec9';
let lynxWhiteFill = 'fff';
let lynxWhiteStroke = 'aaa';
let lynxBlackFill = '000';
let lynxBlackStroke = '777';
let wolfTongueFill = 'a77';

const stackDefFox = {
    def:[
        // Box: base-height, height, top, left, width, depth, fillcolor, strokecolor
        // Tail
        ['B', 5, 10, -40, -5, 20, 10, lynxFill, lynxStroke], 
        ['B', 9, 8, -50, -4, 10, 8, lynxLightFill, lynxStroke],
        ['B', 13, 6, -55, -3, 5, 5, lynxBlackFill, lynxBlackStroke],
        // beard
        ['B', 4, 2, 14, -28, 3, 56, lynxBlackFill, ],
        ['B', 3, 3, 14, -25, 5, 50, lynxLightFill, ],
        
        ['B', 7, 2, 12, -33, 5, 66, lynxBlackFill, ],
        ['B', 6, 3, 12, -30, 7, 60, lynxLightFill, ],
        
        ['B', 10, 2, 14, -28, 3, 56, lynxBlackFill, ], 
        ['B', 9, 3, 14, -25, 5, 50, lynxLightFill, ], 

        ['B', 2, 10, 13, -22, 6, 44, lynxFill, lynxStroke],
        // Schnauze
        ['B', 11, 7, 19, -6, 15, 12, lynxFill, lynxStroke], 
        ['B', 8, 3, 19, -4, 14, 8, lynxFill, lynxStroke],
        ['B', 6, 4, 30, -6, 2, 2, lynxWhiteFill, ],
        ['B', 6, 4, 30, 6, 2, 2, lynxWhiteFill, ],
        
        // Nase
        ['B', 15, 4, 34, -2, 3, 4, lynxBlackFill,], 
        // Body
        ['B', 0, 5, -17, -17, 34, 34, lynxFill, lynxStroke], 
        ['B', 5, 25, -20, -20, 40, 40, lynxFill, lynxStroke], 
        ['B', 30, 5, -17, -17, 34, 34, lynxFill, lynxStroke], 
        // Eyes
        ['B', 18, 6, 19, -10, 2, 3, lynxBlackFill,], 
        ['B', 20, 6, 19, 7, 2, 3, lynxBlackFill,],
        // left Ear
        ['B', 35, 10, 13, -18, 5, 10, lynxFill, lynxStroke],
        ['B', 45, 3, 14, -19, 5, 8, lynxLightFill,],
        ['B', 48, 3, 15, -20, 5, 6, lynxLightFill,],
        ['B', 51, 3, 15, -20, 5, 6, lynxBlackFill,],
        ['B', 35, 7, 16, -16, 2, 6, wolfTongueFill,],
        // right Ear
        ['B', 35, 10, 13, 8, 5, 10, lynxFill, lynxStroke],
        ['B', 45, 3, 14, 10, 5, 8, lynxLightFill,],
        ['B', 48, 3, 16, 12, 5, 6, lynxLightFill,],
        ['B', 51, 3, 16, 12, 5, 6, lynxBlackFill,],
        ['B', 35, 7, 17, 10, 2, 6, wolfTongueFill,],
    ]
};
export default stackDefFox;
export {stackDefFox};