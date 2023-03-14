let btn = document.getElementById("btn");
let inpremotePeer = document.getElementById("remotePeerId");
let inplocalPeer = document.getElementById("localPeerId");
let localVideo = document.getElementById("localVideo");
let remoteVideo = document.getElementById("RemoteVideo");
let online=document.getElementById("Online");
let localStream;
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then((stream) => {
  localStream = stream;
  localVideo.srcObject = localStream;
  localVideo.onloadedmetadata = () => localVideo.play();
  //video-grid.append(localVideo)
})

let peer = new Peer();
peer.on("open", (id) => {
  localPeerId.value = id;
  
});

//online.innerText=`${localPeerId.value}`
btn.addEventListener("click", (e) => {
  let remotePeer = inpremotePeer.value;
  let call = peer.call(remotePeer, localStream);
  
  call.on("stream", (stream) => {
    remoteVideo.srcObject = stream;
    remoteVideo.onloadedmetadata = () => remoteVideo.play();
    
    //video-grid.append(remoteVideo)
  })
})
peer.on("call", (call) => {
  call.answer(localStream);
  call.on("stream", (stream) => {
    remoteVideo.srcObject = stream;
    remoteVideo.onloadedmetadata = () => remoteVideo.play();
    online.innerHTML+=1
    
   // video-grid.append(remoteVideo)
  })
})
