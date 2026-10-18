import sidebarSVG from "../assets/images/sidebar.svg";

const header = document.querySelector('header');
const sidebar = document.querySelector('.sidebar');
const mainBoard = document.querySelector('.main-board');
const footer = document.querySelector('footer');

function loadApplication () {
    // Loading Header
    const mainHeading = document.createElement('h1');
    mainHeading.textContent = "TODO APP";
    header.appendChild(mainHeading);

    // Loading Footer
    const footerPara = document.createElement('p');
    footerPara.textContent = '© Example Copyright by Hammad Khan';
    footer.appendChild(footerPara);

    // Loading Sidebar
    const sideBarRow = document.createElement('div');
    sideBarRow.classList.add('sidebar-row');

        // Creating the Main Icon 
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');

    const logoSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    logoSvg.setAttribute('height', '30');
    logoSvg.setAttribute('width', '45');
    logoSvg.setAttribute('viewBox', '44 2.5 50 75');

    const logoHeaderText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    logoHeaderText.setAttribute('x', '10');
    logoHeaderText.setAttribute('y', '55');
    logoHeaderText.setAttribute('font-size', '70');
    logoHeaderText.setAttribute('font-weight', 'bold');
    logoHeaderText.textContent = "HK";

    const logoParaText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    logoParaText.setAttribute('x', '15');
    logoParaText.setAttribute('y', '75');
    logoParaText.setAttribute('font-size', '18.5');
    logoParaText.setAttribute('font-weight', 'bold');
    logoParaText.textContent = 'TODO APP';

    const sidebarToggleBtn = document.createElement('button');
    sidebarToggleBtn.classList.add('menu-btn');

        // Creating the SVG in the toggle button
    const sidebarToggleSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    sidebarToggleSvg.setAttribute('width', '25');
    sidebarToggleSvg.setAttribute('height', '25');
    sidebarToggleSvg.setAttribute('viewBox', '0 0 30 30');
    sidebarToggleSvg.setAttribute('fill', 'none');
    sidebarToggleSvg.setAttribute('stroke', 'currentColor');
    sidebarToggleSvg.setAttribute('stroke-width', '2');
    sidebarToggleSvg.setAttribute('stroke-linecap', 'round');
    sidebarToggleSvg.setAttribute('stroke-linejoin', 'round');

    const rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectangle.setAttribute('x', '6');
    rectangle.setAttribute('y', '7.5');
    rectangle.setAttribute('width', '18');
    rectangle.setAttribute('height', '18');
    rectangle.setAttribute('rx', '2');
    rectangle.setAttribute('ry', '2');

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '12');
    line.setAttribute('y1', '8.5');
    line.setAttribute('x2', '12');
    line.setAttribute('y2', '25');

    // Appending the svg in the toggle button
    sidebarToggleSvg.appendChild(rectangle);
    sidebarToggleSvg.appendChild(line);
    sidebarToggleBtn.appendChild(sidebarToggleSvg);

    logoSvg.appendChild(logoHeaderText);
    logoSvg.appendChild(logoParaText);
    iconContainer.appendChild(logoSvg);
    sideBarRow.appendChild(iconContainer);
    sideBarRow.appendChild(sidebarToggleBtn);
    sidebar.appendChild(sideBarRow);
}

export { loadApplication }