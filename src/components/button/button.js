import { html, when } from '@beforesemicolon/markup';
import style from"./button.css" with { type: 'css' };

document.adoptedStyleSheets = [...document.adoptedStyleSheets, style];

export const Button = ({
  content = "",
  type = "button",
  cta = false,
  disabled = false,
  onClick = () => {}
}) => {
  return html`
    <button
      type="${type}"
      disabled="${disabled}"
      class="btn ${when(cta, 'cta')}"
      onclick="${onClick}"
      >
      ${content}
    </button>
  `
}