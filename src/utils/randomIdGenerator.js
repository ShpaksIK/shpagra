export const randomIdGenerator = () => {
    const min = Math.ceil(100)
    const max = Math.floor(99999999)
    return Math.floor(Math.random() * (max - min) + min)
}