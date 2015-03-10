import PercentEncoder from "percent-encoder";

export const defaultSeparator = "&";
export const defaultEquals = "=";
export const defaultEncoder = {
    encode: encodeURIComponent
};

export function encode(string, encoder = defaultEncoder) {
    return encoder.encode(string);
}

export function decode(string) {
    return PercentEncoder.decode(string);
}

export function stringify(object, separator = defaultSeparator, equals = defaultEquals) {
    Object.keys(object).map(function(key) {
        return encode(key) + equals + encode(object[key]);
    });
}

export function parse(string, separator = defaultSeparator, equals = defaultEquals) {
    const ret = {};

    string.split(new RegExp(separator, "g")).forEach((pair) => {
        const [key, ...val] = pair.split(equals);

        ret[decode(key)] = decode(val.join(equals));
    });

    return ret;
}
