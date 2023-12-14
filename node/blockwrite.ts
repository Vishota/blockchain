import { Block, getDepth } from "./blockchain";
import { verifyBlock } from "./blockrules";
import { hash } from "./hashes";

function writeBlock(data: string, block: Block): Block {
    const newBlock: Block = {
        data,
        previous: {
            hash: hash(block),
            block
        }
    }

    if (!verifyBlock(newBlock)) throw 'bad block'

    return newBlock
}

function recursiveWriteBlock(block: Block) {
    let newBlock: Block;
    let data = 'data'
    const start = performance.now()
    while (true) {
        try {
            newBlock = writeBlock(data, block)
            break
        }
        catch {
            data += '1'
        }
    }
    const end = performance.now() - start
    console.log(`BLOCK WRITTEN depth=${getDepth(block)} elapsed=${end}`);
    // console.log(newBlock);
    recursiveWriteBlock(newBlock);
}

recursiveWriteBlock({ data: 'first' })