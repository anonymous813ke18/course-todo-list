const header = document.querySelector('header');

function createHeader () {
    const sidebarToggleBtn = document.createElement('button');
    sidebarToggleBtn.classList.add('menu-btn', 'open');

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
    header.appendChild(sidebarToggleBtn);

    const mainHeading = document.createElement('h1');
    mainHeading.textContent = "TODO APP";
    header.appendChild(mainHeading);
}

export { createHeader }