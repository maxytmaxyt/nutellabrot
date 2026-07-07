/* =========================================
   Cursor Glow
========================================= */

const cursor = document.querySelector(".cursor");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {

    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    cursor.style.transform =
        `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);

}

animateCursor();


/* =========================================
   Glass Card Tilt
========================================= */

const card = document.querySelector(".glass");

card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 12;
    const rotateX = (0.5 - y / rect.height) * 12;

    card.style.transform =
        `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-4px)
        `;

});

card.addEventListener("mouseleave", () => {

    card.style.transform =
        `
        perspective(1200px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0px)
        `;

});


/* =========================================
   Link Animations
========================================= */

const links = document.querySelectorAll(".links a");

links.forEach((link, index) => {

    link.animate(

        [

            {
                opacity:0,
                transform:"translateY(30px) scale(.95)"
            },

            {
                opacity:1,
                transform:"translateY(0px) scale(1)"
            }

        ],

        {

            duration:700,

            delay:index*100,

            easing:"cubic-bezier(.22,1,.36,1)",

            fill:"forwards"

        }

    );

});


/* =========================================
   Mouse Spotlight
========================================= */

links.forEach(link=>{

    link.addEventListener("mousemove",(e)=>{

        const rect=link.getBoundingClientRect();

        const x=e.clientX-rect.left;
        const y=e.clientY-rect.top;

        link.style.setProperty("--x",`${x}px`);
        link.style.setProperty("--y",`${y}px`);

    });

});


/* =========================================
   Floating Avatar
========================================= */

const avatar=document.querySelector(".avatar");

let t=0;

function floatAvatar(){

    t+=0.02;

    avatar.style.transform=
        `translateY(${Math.sin(t)*6}px)`;

    requestAnimationFrame(floatAvatar);

}

floatAvatar();


/* =========================================
   Reveal Page
========================================= */

window.addEventListener("load",()=>{

    document.body.animate(

        [

            {
                opacity:0
            },

            {
                opacity:1
            }

        ],

        {

            duration:800,

            fill:"forwards"

        }

    );

});


/* =========================================
   Keyboard Accessibility
========================================= */

links.forEach(link=>{

    link.addEventListener("focus",()=>{

        link.classList.add("focused");

    });

    link.addEventListener("blur",()=>{

        link.classList.remove("focused");

    });

});


/* =========================================
   Smooth Button Press
========================================= */

links.forEach(link=>{

    link.addEventListener("mousedown",()=>{

        link.style.transform="scale(.97)";

    });

    link.addEventListener("mouseup",()=>{

        link.style.transform="";

    });

    link.addEventListener("mouseleave",()=>{

        link.style.transform="";

    });

});
