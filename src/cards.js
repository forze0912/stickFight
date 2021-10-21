const Entity = function() {
    var wasd = {
        sprite: "",
        scale: ""
    }
    return wasd
}

var Knight = function(){
    var wasd = Entity()
    wasd.sprite="player",
    wasd.scale=0.05
    
    

    return wasd
}

var knight = Knight()