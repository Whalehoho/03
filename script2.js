

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () =>{
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}

// document.getElementById('theme-toggle').addEventListener('click', function() {
//     // Define the SVG HTML you want to add
//     const svgHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 18V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.92993 4.93L7.04993 7.05" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.9497 16.95L19.0697 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.92993 19.07L7.04993 16.95" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.9497 7.05L19.0697 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

//     // Check the current theme and toggle it
//     if (document.body.getAttribute('data-theme') === 'dark') {
//       document.body.setAttribute('data-theme', 'light');
//     //   this.innerHTML = 'Dark' + svgHTML; // Update button content to dark mode
//         this.innerHTML = "Dark Mode";
//     } else {
//       document.body.setAttribute('data-theme', 'dark');
//     //   this.innerHTML = 'Light' + svgHTML; // Update button content to light mode
//         this.innerHTML = "Light Mode";
//     }
// });
  
  

// const sr = ScrollReveal({
//     distance: '65px',
//     duration: 2600,
//     delay: 450,
//     reset: true
// })

// sr.reveal('.webgl', {delay:200, origin:'top'});
