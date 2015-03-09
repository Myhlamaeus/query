export const defaultSeparator = "&";
export const defaultEquals = "=";

export function encode(string, separator = defaultSeparator, equals = defaultEquals) {
    return encodeURIComponent(string).replace(/[!'()*]/g, function(chr) {
        return "%" + chr.charCodeAt(0).toString(16);
    });
}

export function decode(string, separator = defaultSeparator, equals = defaultEquals) {
    return decodeURIComponent(string);
}

export function stringify(object, separator = defaultSeparator, equals = defaultEquals) {
    Object.keys(object).map(function(key) {
        return encode(key) + equals + encode(object[key]);
    });
}

export function parse(string, separator = defaultSeparator, equals = defaultEquals) {
    const ret = {};

    string.split(new RegExp(separator, "g")).forEach((pair) => {
        var [key, val] = pair.split(equals);

        ret[decode(key)] = decode(val);
    });

    return ret;
}
