import { sha512 } from "js-sha512";
import { Block } from "./blockchain";

function toHashable(block: Block) {
    return block.data + block.previous?.hash || '';
}
export function hash(block: Block) {
    return sha512(toHashable(block))
}