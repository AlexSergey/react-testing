import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';

import './global.css';

import { Clicker } from './components/clicker';

const container = document.getElementById('root');

const root = createRoot(container as HTMLElement);

root.render(<Clicker />);
