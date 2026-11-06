import './style.css';
import { renderList } from './views/list';
import { renderDetail } from './views/detail';
import { renderForm } from './views/form';

const app = document.querySelector<HTMLElement>('#app')!;

/** Hash routes: #/, #/new, #/recipe/:id and #/recipe/:id/edit */
function route(): void {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);

  if (parts[0] === 'new') {
    renderForm(app);
  } else if (parts[0] === 'recipe' && parts[1] && parts[2] === 'edit') {
    renderForm(app, parts[1]);
  } else if (parts[0] === 'recipe' && parts[1]) {
    renderDetail(app, parts[1]);
  } else {
    renderList(app);
  }
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
route();
