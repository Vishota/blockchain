function hexDivision(dividend: string, divisor: string) {
    const dividendNum = BigInt(`0x${dividend}`);
    const divisorNum = BigInt(`0x${divisor}`);

    if (divisorNum === BigInt(0)) {
        throw new Error("Division by zero is not allowed.");
    }

    const resultNum = dividendNum / divisorNum;

    const resultHex = resultNum.toString(16);

    return resultHex;
}

export function compareHex(hex1: string, hex2: string): number {
    const num1 = BigInt(`0x${hex1}`);
    const num2 = BigInt(`0x${hex2}`);

    if (num1 < num2) {
        return -1;
    } else if (num1 > num2) {
        return 1;
    } else {
        return 0;
    }
}