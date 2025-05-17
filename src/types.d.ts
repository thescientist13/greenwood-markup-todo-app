// CSS Import Attribute
// https://github.com/microsoft/TypeScript/issues/46135
declare module "*.css" {
  const sheet: CSSStyleSheet;

  export default sheet;
}