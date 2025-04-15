let carrotOrangeFill = 'fa0';
let carrotOrangeStroke = 'a60';
let carrotGreenFill = '090';

const stackDefBulletCarrot = {
    def:[
        // Box: base-height, height, top, left, width, depth, fillcolor, strokecolor
        ['B', 2, 4, 5, -2, 5, 4, carrotOrangeFill, carrotOrangeStroke], 
        ['B', 1, 6, -2, -3, 7, 6, carrotOrangeFill, carrotOrangeStroke], 
        ['B', 0, 8, -12, -4, 10, 8, carrotOrangeFill, carrotOrangeStroke], 
        ['B', 3, 2, -22, -1, 10, 2, carrotGreenFill,],
        ['B', 1, 2, -28, -1, 15, 2, carrotGreenFill,],
        ['B', 0, 8, -25, -1, 2, 2, carrotGreenFill,],
        ['B', 3, 2, -22, -4, 2, 8, carrotGreenFill,],
        
    ]
};
export default stackDefBulletCarrot;
export {stackDefBulletCarrot};