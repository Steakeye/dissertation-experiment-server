type Udefable<T> = T | undefined;
type Nullable<T> = T | null;

//export { Udefable, Nullable }

declare module lib {
    export type Udefable<T> = T | undefined;
    export type Nullable<T> = T | null;
}