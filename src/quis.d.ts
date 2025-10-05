declare module 'quis' {
  export function parse(expression: string, options?: { values?: (name: string) => any }): any;
}