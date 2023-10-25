function boundThis(target, name, descriptor) {
    return {
        configurable: true,
        get() {
            return descriptor.value.bind(this);
        },
    };
}
export { boundThis };
