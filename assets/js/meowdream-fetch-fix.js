if (!window.fetch) {
    window.fetch = function(url, options) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(options ? (options.method || 'GET') : 'GET', url);
            xhr.onload = function() {
                resolve(new Response(xhr.responseText, { status: xhr.status }));
            };
            xhr.onerror = function() {
                reject(new TypeError('Network request failed'));
            };
            if (options && options.headers) {
                Object.keys(options.headers).forEach(function(key) {
                    xhr.setRequestHeader(key, options.headers[key]);
                });
            }
            xhr.send(options ? options.body : undefined);
        });
    };
}