import { sha512 } from "js-sha512";
import { Block, checkBlockChainHash, getDepth } from "./blockchain";
import { compareHex } from "./hex";
import { hash } from "./hashes";

type BlockContent = {

}

function complexity(block: Block): string {
    const START_COMPLEXITY = BigInt(`0x${'f'.repeat(128)}`);
    return (START_COMPLEXITY / BigInt(getDepth(block) + 1)).toString(16);   // linear
}

function parseBlock(block: Block): BlockContent {
    return JSON.stringify(block.data);
}

export function verifyBlock(block: Block) {
    if (!checkBlockChainHash(block)) return false
    // if hash > complexity, it is a bad block
    if (compareHex(hash(block), complexity(block)) == 1) return false
    return true
}

console.log(complexity({
    data: '',
    previous: { hash: '', block: { data: '', previous: { hash: '', block: { data: '' } } } }
}));


console.log( compareHex('f', '0') )
console.log( compareHex('00f', '2') )