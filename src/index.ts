import url from './image.png';
import product from './product';

product(2, 5);
const image = new Image();
image.src = url;

const b = document.createElement('b');
b.textContent = 'My text';

document.body.appendChild(b);
