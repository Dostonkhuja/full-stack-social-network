module.exports = () => {
    if (!process.env.jwtPrivateKey) {
        throw new Error('JIDDIY XATO:social_network_jwtprivatekey environment variable aniqlanmagan')
        // process.exit(1)
    }
}
