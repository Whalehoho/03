

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', (event) => {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme
    document.body.setAttribute('data-theme', savedTheme);

    const themeToggleButton = document.getElementById('theme-toggle');
    if (savedTheme === 'dark') {
        themeToggleButton.innerHTML = "Light Mode";
    } else {
        themeToggleButton.innerHTML = "Dark Mode";
    }
});

// Add event listener to a parent element that exists when the page loads
document.getElementById('grid-streams').addEventListener('click', function(event) {
    const target = event.target;
    
    // Check if the clicked element has either 'stream' or 'agora_video_player' class
    if (target.classList.contains('stream') || target.classList.contains('agora_video_player')) {
        // Toggle enlargement of the clicked cell
        toggleCellEnlargement(target);
    }
});

// Function to toggle cell enlargement
function toggleCellEnlargement(cell) {
    // If the clicked cell is already enlarged, shrink it
    if (cell.classList.contains('stream') && cell.classList.contains('enlarged')) {
        cell.classList.add('loading');
        setTimeout(() => {
            // Remove loading class
            cell.classList.remove('loading');
            cell.classList.remove('enlarged');
        }, 300);
    } else if(cell.classList.contains('stream')) {
        // Remove the 'enlarged' class from any other cell that might have it
        document.querySelectorAll('.stream.enlarged').forEach(enlargedCell => {
            enlargedCell.classList.remove('enlarged');
        });
        // Enlarge the clicked cell
        cell.classList.add('loading');
        setTimeout(() => {
            // Remove loading class
            cell.classList.remove('loading');
            cell.classList.add('enlarged');
        }, 800);
    }

    if (cell.classList.contains('agora_video_player') && cell.classList.contains('enlarged')){
        cell.classList.add('loading');
        cell.parentNode.classList.add('loading');
        cell.parentNode.parentNode.classList.add('loading');
        setTimeout(() => {
            // Remove loading class
            cell.classList.remove('loading');
            cell.parentNode.classList.remove('loading');
            cell.parentNode.parentNode.classList.remove('loading');
            cell.classList.remove('enlarged');
            cell.parentNode.classList.remove('enlarged');
            cell.parentNode.parentNode.classList.remove('enlarged');
        }, 300);
    } else if(cell.classList.contains('agora_video_player')){
         // Remove the 'enlarged' class from any other cell that might have it
         document.querySelectorAll('.stream.enlarged').forEach(enlargedCell => {
            enlargedCell.classList.remove('enlarged');
        });
        cell.classList.add('loading');
        cell.parentNode.classList.add('loading');
        cell.parentNode.parentNode.classList.add('loading');
        setTimeout(() => {
            // Remove loading class
            cell.classList.remove('loading');
            cell.parentNode.classList.remove('loading');
            cell.parentNode.parentNode.classList.remove('loading');
            cell.classList.add('enlarged');
            cell.parentNode.classList.add('enlarged');
            cell.parentNode.parentNode.classList.add('enlarged');
        }, 800);
    }
}



// document.querySelectorAll('.stream').forEach(cell => {
//     cell.addEventListener('click', () => {
//         // Add loading class immediately on click
//         cell.classList.add('loading');

//         // Simulate a loading period, then enlarge the cell
//         setTimeout(() => {
//             // Remove loading class
//             cell.classList.remove('loading');

//             // First, shrink any cell that's currently enlarged
//             document.querySelectorAll('.stream.enlarged').forEach(enlargedCell => {
//                 enlargedCell.classList.remove('enlarged');
//             });

//             // Then enlarge the clicked cell
//             cell.classList.add('enlarged');
//         }, 1000); // Adjust the delay as needed (1000ms = 1 second)
//     });
// });



// const sr = ScrollReveal({
//     distance: '65px',
//     duration: 2600,
//     delay: 450,
//     reset: true
// })

// sr.reveal('.webgl', {delay:200, origin:'top'});
