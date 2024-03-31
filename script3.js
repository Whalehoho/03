import AgoraRTC from "agora-rtc-sdk-ng";


const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
let localTracks = [];
let isJoined = false;
let isAudioMuted = false;
let isVideoMuted = false;
let activeUsers = []; // Using an object for easier add/remove/check


// async function joinRoom() {
//     if (isJoined) return;
//     const appId = "e8ea95d8afcc4556b377c6b8afcba6e0"; // Replace with your actual App ID
//     const token = "007eJxTYDjxIEHCxDZsXcWKSadjV/1w65esvWDB0FG5eZtua8jxpFUKDKkWqYmWpikWiWnJySampmZJxubmyWZJIH5SolmqwZt/7GkNgYwMSR/LWBgZIBDEl2QoSS0ucc5IzMtLzYk3MjAyMTA2Now3NDI2YWAAALCJJzk=";
//     // Replace with your actual temp token
//     const channel = "testChannel_20240331_1234"; // This can be any string

//     try {
//         const uid = await client.join(appId, channel, token, null);
//         activeUsers.push(uid.toString());
//         localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
//         const localStreamDiv = document.getElementById("local-stream");
//         localTracks[1].play(localStreamDiv);
//         await client.publish([localTracks[0], localTracks[1]]);
//         isJoined = true;
//         console.log(isJoined)
//         document.getElementById("join-btn").disabled = true;
//         document.getElementById("leave-btn").disabled = false;
//         document.getElementById("toggle-video-btn").disabled = false;
//         document.getElementById("toggle-audio-btn").disabled = false;
//         activeUsers
//     } catch (error) {
//         console.error("Failed to join the channel", error);
//     }
// }

const PORT = 3000;

async function joinRoom() {
    if (isJoined) return;

    // activeUsers.length = 0;
    // console.log("user",activeUsers.length);

    // Assuming these values are still retrieved from somewhere in your application:
    const appId = "122a378d78084e769c68d509946378ff"; // Replace with your actual App ID
    const channel = "testChannel_20240331_1912"; // This can be any string

    try {
        // Fetch a new token from your serverless function
        // const response = await fetch(`http://localhost:${PORT}/api/generate-token?channelName=${channel}`);
        const response = await fetch(`/api/generate-token?channelName=${channel}`);
        const data = await response.json();
        console.log("get data.token");
        const token = data.token; // Token is obtained from your serverless function
        console.log(token);

        const uid = await client.join(appId, channel, token, null);
        activeUsers.push(uid.toString());
        localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
        const localStreamDiv = document.getElementById("local-stream");
        localTracks[1].play(localStreamDiv);
        await client.publish(localTracks);
        isJoined = true;
        
        // UI updates and any other logic
        document.getElementById("join-btn").disabled = true;
        document.getElementById("leave-btn").disabled = false;
        document.getElementById("toggle-video-btn").disabled = false;
        document.getElementById("toggle-audio-btn").disabled = false;
    } catch (error) {
        console.error("Failed to join the channel", error);
    }
}


async function leaveRoom() {
    if (!isJoined) return;
    for (let track of localTracks) {
        track.stop();
        track.close();
    }
    await client.leave();
    isJoined = false;
    document.getElementById("join-btn").disabled = false;
    document.getElementById("leave-btn").disabled = true;
    document.getElementById("toggle-video-btn").disabled = true;
        document.getElementById("toggle-audio-btn").disabled = true;
    // Clear the local stream
    document.getElementById("local-stream").innerHTML = '';
    // Optionally, clear the remote streams
    const remoteStreams = document.querySelectorAll(".remote-stream");
    remoteStreams.forEach(stream => stream.remove());
}

function toggleVideo() {
    if (!isJoined) return;
    const localStreamDiv = document.getElementById("local-stream");
    const videoToggleButton = document.getElementById("toggle-video-btn"); // Ensure you have this ID on your button

    if (isVideoMuted) {
        localTracks[1].setEnabled(true);
        isVideoMuted = false;
        // Remove the "video off" placeholder if it exists
        localStreamDiv.innerHTML = '';
        localTracks[1].play(localStreamDiv);
        videoToggleButton.innerText = "Toggle Video Off"; // Change button text
    } else {
        localTracks[1].setEnabled(false);
        isVideoMuted = true;
        // Add a "video off" placeholder
        localStreamDiv.innerHTML = '<div class="video-off-placeholder">Video Off</div>';
        videoToggleButton.innerText = "Toggle Video On"; // Change button text
    }
}



function toggleAudio() {
    if (!isJoined) return;
    const audioToggleButton = document.getElementById("toggle-audio-btn"); // Ensure you have this ID on your button

    if (isAudioMuted) {
        localTracks[0].setEnabled(true);
        isAudioMuted = false;
        audioToggleButton.innerText = "Toggle Audio Off"; // Change button text
    } else {
        localTracks[0].setEnabled(false);
        isAudioMuted = true;
        audioToggleButton.innerText = "Toggle Audio On"; // Change button text
    }
}



client.on('user-published', async (user, mediaType) => {

    // Subscribe to the user's stream
    await client.subscribe(user, mediaType);

    // Check if a cell already exists for this user
    let remoteStreamDiv = document.getElementById(`remote-stream-${user.uid}`);
    
    console.log("here1");
    console.log("here1.1:",!remoteStreamDiv);
    console.log(mediaType);
    console.log("here1.2",mediaType !== 'audio');
    // If the subscribed stream is a video, play it in a new div
    if (mediaType === 'video' && !remoteStreamDiv) {
        console.log("here2");
        remoteStreamDiv = document.createElement('div');
        remoteStreamDiv.id = `remote-stream-${user.uid}`;
        remoteStreamDiv.className = 'stream remote-stream';
        document.getElementById('grid-streams').appendChild(remoteStreamDiv);
        user.videoTrack.play(`remote-stream-${user.uid}`);
        remoteStreamDiv.addEventListener('click', function () {
            if (this.classList.contains('enlarged')) {
                this.classList.remove('enlarged');
            } else {
                // Optional: Add a loading animation class before enlarging
                this.classList.add('loading');
                setTimeout(() => {
                    // Simulate loading time before enlargement
                    this.classList.remove('loading');
                    // First, ensure no other streams are enlarged
                    document.querySelectorAll('.stream.enlarged').forEach(enlargedCell => {
                        enlargedCell.classList.remove('enlarged');
                    });
                    // Then enlarge the clicked stream
                    this.classList.add('enlarged');
                }, 1000); // Adjust loading time as necessary
            }
        });
    }

    // Ensure the div is cleared of any placeholders before playing the video again
    else if (mediaType === 'video' && remoteStreamDiv) {
        console.log("here3");
        remoteStreamDiv.innerHTML = ''; // Clear "Video Off" placeholder or any content
        user.videoTrack.play(`remote-stream-${user.uid}`);
    }

    
    else if (!remoteStreamDiv ) {
        console.log("uid", user.uid);
        remoteStreamDiv = document.createElement('div');
        remoteStreamDiv.id = `remote-stream-${user.uid}`;
        remoteStreamDiv.className = 'stream remote-stream';
        // Include user.uid in the innerHTML
        remoteStreamDiv.innerHTML = `<div class="user-id-display">User ID: ${user.uid}</div>` +
                                `<div class="video-off-placeholder">Video Off!</div>`;
        document.getElementById('grid-streams').appendChild(remoteStreamDiv);
    }
    

    // If the subscribed stream is audio, play it
    if (mediaType === 'audio') {
        user.audioTrack.play();
    }
});


// This event handler is for when a user stops publishing a stream.
client.on('user-unpublished', (user, mediaType) => {
    if (mediaType === 'video') {
        const remoteStreamDiv = document.getElementById(`remote-stream-${user.uid}`);
        // Instead of removing, update to show a "video off" placeholder.
        if (remoteStreamDiv) {
            remoteStreamDiv.innerHTML = `<div class="user-id-display">User ID: ${user.uid}</div>` +
            `<div class="video-off-placeholder">Video Off</div>`;
        }
    }
});

// Handle the scenario when a user completely leaves the room.
client.on('user-left', (user) => {
    // This event should be fired when a user leaves the channel.
    const index = activeUsers.indexOf(user.uid.toString());
    if (index > -1) {
        activeUserIds.splice(index, 1);
    }
    const remoteStreamDiv = document.getElementById(`remote-stream-${user.uid}`);
    if (remoteStreamDiv) {
        remoteStreamDiv.remove(); // Remove the div when the user leaves.
    }
});


document.getElementById("join-btn").addEventListener("click", joinRoom);
document.getElementById("leave-btn").addEventListener("click", leaveRoom);
document.getElementById("toggle-video-btn").addEventListener("click", toggleVideo);
document.getElementById("toggle-audio-btn").addEventListener("click", toggleAudio);


document.getElementById('theme-toggle').addEventListener('click', function () {
    // Define the SVG HTML you want to add
    const svgHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 18V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.92993 4.93L7.04993 7.05" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.9497 16.95L19.0697 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.92993 19.07L7.04993 16.95" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.9497 7.05L19.0697 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    // Check the current theme and toggle it
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.setAttribute('data-theme', 'light');
        this.innerHTML = "Dark Mode";
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        this.innerHTML = "Light Mode";
        localStorage.setItem('theme', 'dark');
    }
}); 

