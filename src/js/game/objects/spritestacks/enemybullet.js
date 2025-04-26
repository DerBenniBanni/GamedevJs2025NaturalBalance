let grey = '777';
let tail = 'ffffff22';
let carrotGreenFill = '090';

const stackDefBulletEnemy = {
    def:[
        // Box: base-height, height, top, left, width, depth, fillcolor, strokecolor
        ['B', 0, 12, -4, -4, 8, 8, grey, ], 
        ['B', 2, 8, -6, -6, 12, 12, grey, ], 
        ['B', 4, 1, -20, 0, 20, 2, tail, ], 
        ['B', 8, 1, -15, 0, 15, 2, tail, ], 
        ['B', 2, 1, -15, 0, 15, 2, tail, ], 
        
    ]
};
export default stackDefBulletEnemy;
export {stackDefBulletEnemy};