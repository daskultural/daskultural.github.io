`use strict`;

let deferredInstallPrompt = null;
const installButton = document.getElementById(`instalar`);
installButton.aaddEventListener(`beforeinstallprompt`, saveBeforeInstalPpromptEvent);

function saveBeforInstallPromptEvent(evt){
 deferredInstallPrompt = evt;
  installButton.removeAttribute(`hidden`);
}

function installPWA(evt){
  deferredInstallPrompt.prompt();
  evt.srcElement.setAttribute(`hidden`, true);
  deferredInstallPrompt.userChoice.then((choice)=>{
    if(choice.outcome === "accepted"){
      console.log("aceptado")
    } else {
      console.log("no aceptado")
    )
    deferredInstallPrompt = null;
  })

}

window.addEventListener(`appinstalled`, logAppInstalled);

function logAppInstalled(evt){
  console.log("¡Listo!");
}
