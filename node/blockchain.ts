import { sha512 } from "js-sha512";
import { Hasher, Verifier } from "./types/BlockchainOperators";
import { Blockchain } from "./types/Blocks";
import { height } from "./BlockchainOperations";

export type MyBlockchain = Blockchain<{
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
    const simplicity = BigInt(`0x${'f'.repeat(128)}`) / (height(block) + 1n);
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