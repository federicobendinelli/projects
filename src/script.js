import Galaxy from "./scenes/galaxyScene";
import Portal from "./scenes/portalScene";
import "./style.css";

var galaxyLocation = window.location.hash == '#debug+galaxy'
var portalLocation = window.location.hash == '#debug+portal'

var title = document.querySelector('.title')



if (galaxyLocation) 
{
      title.textContent = 'Galassia'
}
if (portalLocation) 
{
      title.textContent = 'Portale'
}

console.log(title , galaxyLocation , portalLocation , window.location.hash);