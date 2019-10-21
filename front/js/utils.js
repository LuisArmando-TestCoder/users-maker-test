const utils = {
    formToQueries(form) {
        return `?${[...form.querySelectorAll('input')]
                .map(({name, value}) => `${name}=${value}`).join('&')}`;
    },
    fetchJSON(value, base = 'http://localhost:5555') {
        return new Promise((resolve, reject) => {
            fetch(base + value)
            .then(r => r.json())
            .then(resolve)
            .catch(reject);
        });
    }
};