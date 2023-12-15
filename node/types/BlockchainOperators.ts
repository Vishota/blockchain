import { Blockchain } from "./Blocks";

export type Verifier<T extends Blockchain<any, any>> = (blockchain: T) => boolean

export type Stringifier<T extends Blockchain<any, any>> = (Blockchain: T) => string

export type Hasher<T extends Blockchain<any, any>> = (Blockchain: T) => string