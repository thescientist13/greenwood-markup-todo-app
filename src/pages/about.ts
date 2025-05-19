import 'global-jsdom/register';
import { html } from '@beforesemicolon/markup';

export async function getBody() {
  const timestamp = new Date().getTime();

  return html`<h1>Hello World SSR with Markup @${timestamp} 👋</h1>`.toString();
}