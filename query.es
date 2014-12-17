const encode = function(str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function(chr) {
            return "%" + chr.charCodeAt(0).toString(16);
        });
    },
    decode = decodeURIComponent,
    query = {
        "defaultSeperator": "&",
        "defaultEquals": "=",
        "stringify": function(object, separator = query.defaultSeparator, equals = query.defaultEquals) {
            Object.keys(object).map(function(key) {
                return query.encode(key) + equals + query.encode(object[key]);
            });
        },
        "parse": function(string, separator = query.defaultSeparator, equals = query.defaultEquals) {
            const ret = {};

            string.split(new RegExp(separator, "g")).forEach((pair) => {
                var [key, val] = pair.split(equals);

                ret[this.decode(key)] = this.decode(val);
            });

            return ret;
        },
        "encode": function(string, separator = query.defaultSeparator, equals = query.defaultEquals) {
            return encode(string);
        },
        "decode": function(string, separator = query.defaultSeparator, equals = query.defaultEquals) {
            return decode(string);
        }
    };

Object.freeze(query);

export default query;
