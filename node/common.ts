export function normalize(target: number, center: number = 0, sharpness: number = 1) {
    return Math.tanh((target - center) * sharpness) + 1
}