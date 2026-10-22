const footer = document.querySelector('footer');

function createFooter () {
    const footerPara = document.createElement('p');
    footerPara.textContent = '© Example Copyright by Hammad Khan';
    footer.appendChild(footerPara);
}

export { createFooter }