import { Blockchain } from "./types/Blocks";

export function height<T extends Blockchain<any, any>>(blockchain: T, current: bigint = 0n) {
    if (!blockchain.common.previousBlock) return current
    return height(blockchain.common.previousBlock, current + 1n)
}