
var w,h
var w1,w2,w3,w4,w5,w6,w7,w8,w9,w10,w11,w12
var p1,p2,p3
var db
var gs=0
var pn=0
var write,sub
var reset
var b
var blah=0
var a,c
ar=[]
var Adoor1,Adoor2
var Bdoor1,Bdoor2
var opend,jump1,jump2
var up,down,left,right
var bg1,bg2,bg3,img
var run,run2
var l1,l2,l3,lava
var rock,r1,r2
var rain
var t,t1,t2
var hide
var obg

function preload(){
    run=loadAnimation('sprite_0.png','sprite_2.png','sprite_4.png','sprite_6.png','sprite_8.png')
    run2=loadAnimation('sprite0.png','sprite1.png','sprite2.png','sprite3.png','sprite4.png')
    lava=loadImage('lavapit.png')
    bg4=loadImage('room1.jfif')
    rock=loadImage('rocks.png')
    rain=loadImage('rain.png')
    tree=loadImage('tree.png')
    hail=loadImage('hailstone.png')
}

function setup(){
   var canvas = createCanvas(windowWidth,windowHeight)

   w=windowWidth
   h=windowHeight

   db=firebase.database()

   db.ref('gs').on('value',function(data){
       a=data.val()
       gs=a
   })

   db.ref('pn').on('value',function(data){
       c=data.val()
       pn=c
   })

   obg=new Group()

//rooms
{

   bg1=createSprite(w/2,h/2,w*2,h)
   bg1.shapeColor='green'

   bg2=createSprite(w/4,h+h/4,w/2,h/2)
   bg2.shapeColor='blue'

   bg3=createSprite(w-w/4,0-h/4,w/2,h/2)
   bg3.shapeColor='orange'

}

//walls and other objects
{
   w1=createSprite(-w/2,h/2,20,h)
   w2=createSprite(w+w/2,h/2,20,h)

   w3=createSprite(0,0,w,20)
   w4=createSprite(w+w/4,0,w/2,20)
   w5=createSprite(w,h,w,20)
   w6=createSprite(0-w/4,h,w/2,20)

   w7=createSprite(w-w/4,-h/2,w/2,20)
   w8=createSprite(w-w/4-w/4,-h/4,20,h/2)
   w9=createSprite(w-w/4-w/4+w/2,-h/4,20,h/2)

   w7=createSprite(w-w/4,-h/2,w/2,20)
   w8=createSprite(w-w/4-w/4,-h/4,20,h/2)
   w9=createSprite(w-w/4-w/4+w/2,-h/4,20,h/2)

   w10=createSprite(w/4,h+h/2,w/2,20)
   w11=createSprite(w/4-w/4,h+h/4,20,h/2)
   w12=createSprite(w/4-w/4+w/2,h+h/4,20,h/2)

   l1=createSprite(w/3,h/2,10,10)
   l1.addImage('c',lava)

   l2=createSprite(w+w/8,h/4,10,10)
   l2.addImage('d',lava)
   l2.scale=2

   l3=createSprite(0-w/4,h/2.7,10,10)
   l3.addImage('e',lava)
   l3.scale=1.4

   hide=createSprite(w,h/2,30,30)
   hide.shapeColor='black'

   obg.add(w1)
   obg.add(w2)
   obg.add(w3)
   obg.add(w4)
   obg.add(w5)
   obg.add(w6)
   obg.add(w7)
   obg.add(w8)
   obg.add(w9)
   obg.add(w10)
   obg.add(w11)
   obg.add(w12)
   obg.add(l1)
   obg.add(l2)
   obg.add(l3)
   obg.add(hide)
}

//players
   p1=createSprite(w/2,h/2,10,10)
   p2=createSprite(w/2,h/2,10,10)
   p3=createSprite(w/2,h/2,10,10)

   p1.velocityY=10
   p2.velocityY=10
   p3.velocityY=10

   p1.addAnimation('a',run)
   p2.addAnimation('a',run)
   p3.addAnimation('a',run)

   p1.addAnimation('a1',run2)
   p2.addAnimation('a1',run2)
   p3.addAnimation('a1',run2)

   p1.scale=0.2
   p2.scale=0.2
   p3.scale=0.2

   ar=[p1,p2,p3]

   Adoor1=createSprite(w/8,h,w/4,20)
   Adoor1.shapeColor='white'
   Adoor2=createSprite(w/4+w/8,h,w/4,20)
   Adoor2.shapeColor='brown'

   Bdoor1=createSprite(w-w/8,0,w/4,20)
   Bdoor1.shapeColor='white'
   Bdoor2=createSprite(w-w/4-w/8,0,w/4,20)
   Bdoor2.shapeColor='brown'

//dom elements
{
   write=createInput(' ')
   write.position(w/2-write.width/2,h/4)

   sub=createButton('Submit')
   sub.position(w/2-sub.width/2,h/4+h/10)

   reset=createButton('Reset')
   reset.position(w/2-reset.width/2,h/4+h/7)
}

// buttons
// {
//     opend=createButton('Open')
//     up=createButton('up')
//     down=createButton('down')
//     left=createButton('left')
//     right=createButton('right')
 
//     opend.position(w/6,h/1.2)
//     up.position(w/6*2,h/1.2)
//     down.position(w/6*3,h/1.2)
//     left.position(w/6*4,h/1.2)
//     right.position(w/6*5,h/1.2)
    
//  }

}

function draw(){
    background(0)

    sub.mousePressed(function(){
        // write.hide()
        // sub.hide()
        pn+=1
        blah=pn

        db.ref('/').update({
            pn: pn
        })

        db.ref('players/player'+pn).set({
            x: width/2,
            y: h/2,
            pln: pn,
        })

        sub.hide()
        write.hide()

    })

    reset.mousePressed(function(){
        write.show()
        sub.show()

        db.ref('/').update({
            gs: 0,
            pn: 0,
            players: null
        })
    })

    if(pn===3){
        db.ref('/').update({
            gs: gs,
        })

        gs=1
    }

    if(gs===1&&b===undefined){
        db.ref('players').on('value',function(data){
           b=data.val()
        }) 
     }

    if(gs===1){
        var index = 0

        for(var i in b){
            ar[index].x=b[i].x
            ar[index].y=b[i].y

            if(blah-1===index){
                camera.position.y=ar[blah-1].y
                camera.position.x=ar[blah-1].x
            }

            index++
        }

        p1.collide(obg)
        p2.collide(obg)
        p3.collide(obg)

        if(frameCount%20==0){
            hide.x=random(-w/2,w+w/2)
            hide.x=random(0,w)
        }

        if(p1.collide(hide)){
            gs=2

            db.ref('/').update({
                gs: 2
            })
        }

        if(p2.collide(hide)){
            gs=3

            db.ref('/').update({
                gs: 3
            })
        }

        if(p3.collide(hide)){
            gs=4

            db.ref('/').update({
                gs: 4
            })
        }

        if(p1.collide(l1)||p1.collide(l2)||p1.collide(l3)){
            p1.destroy()

            db.ref('/').update({
                player1: null
            })
        }

        if(p2.collide(l1)||p2.collide(l2)||p2.collide(l3)){
            p2.destroy()

            db.ref('/').update({
                player2: null
            })
        }

        if(p3.collide(l1)||p3.collide(l2)||p3.collide(l3)){
            p3.destroy()

            db.ref('/').update({
                player3: null
            })
        }
    {    

        if(keyDown('up')){
            ar[blah-1].y-=20
            db.ref('players/player'+blah).update({
                y: ar[blah-1].y
            })
        }

        // up.mousePressed(function(){
        //     ar[blah-1].y-=20
        //     db.ref('players/player'+blah).update({
        //         y: ar[blah-1].y
        //     })
        // })

        if(keyDown('down')){
            ar[blah-1].y+=20
            db.ref('players/player'+blah).update({
                y: ar[blah-1].y
            })
        }

        // down.mousePressed(function(){
        //     ar[blah-1].y+=20
        //     db.ref('players/player'+blah).update({
        //         y: ar[blah-1].y
        //     })
        // })

        if(keyDown('left')){
            ar[blah-1].x-=20
            db.ref('players/player'+blah).update({
                x: ar[blah-1].x
            })
            ar[blah-1].changeAnimation('a1',run2)
        }

        // left.mousePressed(function(){
        //     ar[blah-1].x-=20
        //     db.ref('players/player'+blah).update({
        //         x: ar[blah-1].x
        //     })
        // })

        if(keyDown('right')){
            ar[blah-1].x+=20
            db.ref('players/player'+blah).update({
                x: ar[blah-1].x
            })
            ar[blah-1].changeAnimation('a',run)
        }

        // right.mousePressed(function(){
        //     ar[blah-1].x+=10
        //     db.ref('players/player'+blah).update({
        //         x: ar[blah-1].x
        //     })
        // })

    }

    if(frameCount%30===0){
        hail.x=random(-w/2,w+w/2)
        hail.y=random(0,w)
    }

    }

    if(gs===2){
        alert('Player1 has won')
        obg.destroyEach()

        // Adoor1.destroy()
        // Adoor2.destroy()

        // Bdoor1.destroy()
        // Bdoor2.destroy()

        // bg1.destroy()
        // bg2.destroy()
        // bg3.destroy()

        // p1.destroy()
        // p2.destroy()
        // p3.destroy()

        windows.location.reload()
    }

    if(gs===3){
        alert('Player2 has won')
        // obg.destroyEach()

        // Adoor1.destroy()
        // Adoor2.destroy()

        // Bdoor1.destroy()
        // Bdoor2.destroy()

        // bg1.destroy()
        // bg2.destroy()
        // bg3.destroy()

        // p1.destroy()
        // p2.destroy()
        // p3.destroy()

        windows.location.reload()
    }

    if(gs===4){
        alert('Player3 has won')

        // obg.destroyEach()

        // Adoor1.destroy()
        // Adoor2.destroy()

        // Bdoor1.destroy()
        // Bdoor2.destroy()

        // bg1.destroy()
        // bg2.destroy()
        // bg3.destroy()

        // p1.destroy()
        // p2.destroy()
        // p3.destroy()

        windows.location.reload()
    }

    drawSprites()
    if(frameCount>100&&frameCount<500){
        rainfall()
    }

    if(frameCount>500&&frameCount<1000){
        hailston()
    }
}

function rainfall(){
    if(frameCount%2===0){
        r=createSprite(random(-w,w*2),-w,10,10)
        r.velocityY=26
        r.addImage('jb',rain)
        r.scale=0.05
    }
}

function hailston(){
    if(frameCount%2===0){
        h=createSprite(random(-w,w*2),-w,10,10)
        h.velocityY=26
        h.addImage('jk',hail)
        h.scale=0.05
    }
}