export type Block<T, U> = {
    data: T,
    common: U
}

export type Blockchain<
    T extends { previousBlockHash?: string },
    U extends { previousBlock?: Blockchain<T, U> }
> = Block<T, U>

export type PreBlockchain<T extends Blockchain<any, any>> = {
    data: Omit<T['data'], 'previousBlockHash'>,
    common: Omit<T['common'], 'previousBlock'>
}
