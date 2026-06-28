declare module 'quis' {
  export function parse(expression: string, options?: { values?: (name: string) => any }): any;
  export function evaluate(expression: string, context?: Record<string, any> | null): any;
}