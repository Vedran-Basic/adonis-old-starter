module.exports = {
    createdBy: {
        addToItem(data) {
            return data.$createdBy?.details?.displayName
        }
    },
    product: {
        addToItem(data) {
                return data.product?.name
        }
    }
}
