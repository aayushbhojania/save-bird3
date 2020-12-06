class Tree{
    constructor(x,y){
      this.x=x
      this.y=y
      this.image = loadImage("tree.png")
      this.body=Bodies.rectangle(this.x,this.y,450,10,{
          isStatic:true
      })

      World.add(world,this.body)
    }
    display(){
     push()
     translate(this.body.position.x,this.body.position.y)
     imageMode(CENTER);
     image(this.image,0,-300,450,500)
     pop()
    }
}
