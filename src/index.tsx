import { logAnything } from './utils.js';
import { createRoot } from 'react-dom/client';

logAnything();

const root = createRoot(document.getElementById('root'));
root.render(<h1>Hello, world</h1>);
