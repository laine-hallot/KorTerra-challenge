import { createRoot } from 'react-dom/client';

import { App } from './src/App';
import './style.css';

const appElement = document.getElementById('app');
if (!appElement) throw new Error('Root element not present');
const root = createRoot(appElement);
root.render(<App />);
