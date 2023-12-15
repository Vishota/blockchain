import { sha512 } from "js-sha512";
import { Hasher, Verifier } from "./types/BlockchainOperators";
import { Blockchain } from "./types/Blocks";
import { height } from "./BlockchainOperations";

export type MyBlockchain = Blockchain<{
    created: number,
    str?: string,
    previousBlockHash?: string
}, {
    previousBlock?: MyBlockchain
}>

export const hash: Hasher<MyBlockchain> = blockchain => sha512(JSON.stringify(blockchain.data))

const hashVerifier: Verifier<MyBlockchain> = block => {
    if (!block.common.previousBlock) return true;

    return block.data.previousBlockHash == hash(block.common.previousBlock) && hashVerifier(block.common.previousBlock)
}

const complexityVerifier: Verifier<MyBlockchain> = block => {
    const TARGET_TIME = 100

    const age = new Date().getTime() - (block.common.previousBlock?.data.created || TARGET_TIME)

    function timeFactor(x: number, transitionPoint: number = 5, steepness: number = 1): number {
        const gaussian = Math.exp(-0.5 * Math.pow((x - transitionPoint) / steepness, 2));
        const exponential = Math.exp(steepness * (x - transitionPoint));
        const result = gaussian + exponential;
        return result;
    }

    const simplicity = BigInt(`0x${'f'.repeat(128)}`) / (height(block) + 1n)
        * BigInt(Math.min(Number.MAX_VALUE, Math.floor(timeFactor(age, TARGET_TIME) * 10000))) / 10000n;

    if (block.common.previousBlock) {
        return BigInt('0x' + hash(block)) < simplicity && complexityVerifier(block.common.previousBlock)
    }
    else {
        return BigInt('0x' + hash(block)) < simplicity
    }
}

export function verify(block: MyBlockchain) {
    return hashVerifier(block) && complexityVerifier(block)
}