export const required = (value: string) => value.trim().length > 0;

export const positiveNumber = (value: number) => Number.isFinite(value) && value > 0;
