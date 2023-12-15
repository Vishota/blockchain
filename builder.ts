import { height } from "./node/BlockchainOperations";
import { MyBlockchain, hash, verify } from "./node/blockchain";
import { PreBlockchain } from "./node/types/Blocks";

function writeBlock(pre: PreBlockchain<MyBlockchain>, previous: MyBlockchain) {
    const newBlock: MyBlockchain = {
        data: {
            ...pre.data,
            previousBlockHash: hash(previous)
        },
        common: {
            ...pre.common,
            previousBlock: previous
        }
    }
    if (!verify(newBlock)) throw 'bad block'
    return newBlock
}

function recursiveWriteBlock(block: MyBlockchain) {
    let newBlock: MyBlockchain;
    const start = performance.now()
    let str = ''
    while (true) {
        try {
            newBlock = writeBlock({
                data: {
                    str,
                    created: new Date().getTime()
                },
                common: {}
            }, block);
            break
        }
        catch (e) {
            if (e != 'bad block') console.log(e);
            
            str += '1'
        }
    }
    const end = performance.now() - start
    console.log(`BLOCK WRITTEN depth=${height(block)} elapsed=${end}`);
    // console.log(newBlock);
    recursiveWriteBlock(newBlock);
}

recursiveWriteBlock({
    data: {
        created: new Date().getTime()
    },
    common: {}
})