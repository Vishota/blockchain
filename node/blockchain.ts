import { hash } from './hashes'

export type Block = {
    data: string,
    previous?: {
        block: Block,
        hash: string
    }
}

export function checkBlockChainHash(block: Block): boolean {
    if (typeof block.previous != 'undefined') {
        return block.previous.hash == hash(block.previous.block) && checkBlockChainHash(block.previous.block);
    }
    return true;
}

export function getDepth(block:Block, current = 0) {
    if(!block.previous) return current;
    return getDepth(block.previous.block, current + 1);
}