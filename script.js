function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);


    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

init()



// -----------------------page(CANVAS)------------------------------------
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth/2.3;
canvas.height = window.innerHeight/1.1;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth/1.1;
  canvas.height = window.innerHeight/2;
  render();
});

function files(index) {
  var data = `
    ./canva1.png
    ./canva2.png
    ./canva3.png
    ./canva4.png
    ./canva5.png
    ./canva6.png
    ./canva7.png
    ./canva8.png
    ./canva9.png
    ./canva10.png
    ./canva11.png
    ./canva12.png
    ./canva13.png
    ./canva14.png
    ./canva15.png
    ./canva16.png
    ./canva17.png
    ./canva18.png
    ./canva19.png
    ./canva20.png
    ./canva21.png
    ./canva22.png
    ./canva23.png
    ./canva24.png
    ./canva25.png
    ./canva26.png
    ./canva27.png
    ./canva28.png
    ./canva29.png
    ./canva30.png
    ./canva31.png
    ./canva32.png
    ./canva33.png
    ./canva34.png
    ./canva35.png
    ./canva36.png
    ./canva37.png
    ./canva38.png
    ./canva39.png
    ./canva40.png
    ./canva41.png
    ./canva42.png
    ./canva43.png
    ./canva44.png
    ./canva45.png
    ./canva46.png
    ./canva47.png
    ./canva48.png
    ./canva49.png
    ./canva50.png
    ./canva51.png
    ./canva52.png
    ./canva53.png
    ./canva54.png
    ./canva55.png
    ./canva56.png
    ./canva57.png
    ./canva58.png
    ./canva59.png
    ./canva60.png
    ./canva61.png
    ./canva62.png
    ./canva63.png
    ./canva64.png
    ./canva65.png
    ./canva66.png
    ./canva67.png
    ./canva68.png
    ./canva69.png
    ./canva70.png
    ./canva71.png
    ./canva72.png
    ./canva73.png
    ./canva74.png
    ./canva75.png
    ./canva76.png
    ./canva77.png
    ./canva78.png
    ./canva79.png
    ./canva80.png
    ./canva81.png
    ./canva82.png
    ./canva83.png
    ./canva84.png
    ./canva85.png
    ./canva86.png
    ./canva87.png
    ./canva88.png
    ./canva89.png
    ./canva90.png
    ./canva91.png
    ./canva92.png
    ./canva93.png
    ./canva94.png
    ./canva95.png
    ./canva96.png
    ./canva97.png
    ./canva98.png
    ./canva99.png
    ./canva100.png
    ./canva101.png
    ./canva102.png
    ./canva103.png
    ./canva104.png
    ./canva105.png
    ./canva106.png
    ./canva107.png
    ./canva108.png
    ./canva109.png
    ./canva110.png
    ./canva111.png
    ./canva112.png
    ./canva113.png
    ./canva114.png
    ./canva115.png
    ./canva116.png
    ./canva117.png
    ./canva118.png
    ./canva119.png
    ./canva120.png
    ./canva121.png
    ./canva122.png
    ./canva123.png
    ./canva124.png
    ./canva125.png
    ./canva126.png
    ./canva127.png
    ./canva128.png
    ./canva129.png
    ./canva130.png
    ./canva131.png
    ./canva132.png
    ./canva133.png
    ./canva134.png
    ./canva135.png
    ./canva136.png
    ./canva137.png
    ./canva138.png
    ./canva139.png
    ./canva140.png
    ./canva141.png
    ./canva142.png
    ./canva143.png
    ./canva144.png
    ./canva145.png
    ./canva146.png
    ./canva147.png
    ./canva148.png
    ./canva149.png
    ./canva150.png
 `;
  return data.split("\n")[index];
}

const frameCount = 300;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page>canvas`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({

  trigger: "#page>canvas",
  pin: true,
//   markers:true,
  scroller: `#main`,
//   set start end according to preference
  start: `55 44.3%`,
  end: `450% top`,
});

// ------------------nav button--------------------------

var box_move = document.querySelector("#box-move")
var button = document.querySelector("#button")

var button_h2 = document.querySelector("#button h2")

button.addEventListener("mouseover",function(dets){
  box_move.style.left = "0%";
  box_move.style.opacity = 1;
  button_h2.style.color = "#fff"

})

button.addEventListener("mouseleave",function(dets){
  box_move.style.left = "-100%";
  box_move.style.opacity = 0;
  button_h2.style.color = "black"
  setTimeout(resetElementPosition,500)
})

function resetElementPosition() {
  box_move.style.left = "100%"; 
  box_move.style.opacity = 0;
}

// ------------------page anim--------------------------

gsap.to("#page h1",{
  scrollTrigger:{
    pin:true,
    trigger:"#page h1",
    scroller:"#main",
    // markers:true
  },
})
gsap.to("#page h5",{
  scrollTrigger:{
    pin:true,
    trigger:"#page h5",
    scroller:"#main",
    // markers:true,
    start:"top 30%",
    end:"470% 30%",
    scrub:1
  },
  opacity:1
})

const tl = gsap.timeline();


tl.to("#temp1",{
  scrollTrigger:{
    pin:true,
    trigger:"#temp1",
    scroller:"#main",
    // markers:true,
    start:"50% 30%",
    end:"150% 40%",
    scrub:1
  },
  opacity:1,
  onComplete:function(){
    document.querySelector("#temp1").style.opacity = 0
  }
},0)

tl.to("#keyWords",{
  scrollTrigger:{
    pin:true,
    trigger:"#keyWords",
    scroller:"#main",
    // markers:true,
    start:"60% 90%",
    end:"158% 85%",
    scrub:1
  },
  opacity:1,
  onComplete:function(){
    document.querySelector("#keyWords").style.opacity = 0
  }
},0)


tl.to("#temp2",{
  scrollTrigger:{
    pin:true,
    trigger:"#temp2",
    scroller:"#main",
    // markers:true,
    start:"50% 40%",
    end:"150% 50%",
    scrub:1
  },
  opacity:1,
  onComplete:function(){
    document.querySelector("#temp2").style.opacity = 0
  }
},"a")
tl.to("#kw",{
  scrollTrigger:{
    pin:true,
    trigger:"#kw",
    scroller:"#main",
    // markers:true,
    start:"50% 70%",
    end:"168% 64%",
    scrub:1
  },
  opacity:1,
  onComplete:function(){
    document.querySelector("#kw").style.opacity = 0
  }
},"a")
