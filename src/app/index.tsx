import { logAnything } from '../shared/lib/utils.js';
import { createRoot } from 'react-dom/client';

logAnything();

const root = createRoot(document.getElementById('root'));
root.render(<h1>Hello, world</h1>);
