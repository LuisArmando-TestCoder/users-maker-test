const utils = {
    formToQueries(form) {
        return `?${[...form.querySelectorAll('input:not([type="checkbox"])')]
                .map(({name, value}) => `${name}=${value}`).join('&')}`;
    },
    objectToQueries(object) {
        return `?${Object.keys(object).map(k => `${k}=${object[k]}`).join('&')}`;
    },
    fetchJSON(value, {
        base = 'http://localhost:5555',
        options = {}
    }) {
        return new Promise((resolve, reject) => {
            fetch(base + value, options)
                .then(r => r.json())
                .then(resolve)
                .catch(reject);
        });
    },
    toTableData(data, table) {
        if (!data.length && typeof data === 'object') {
            // if it is an bare object
            const taxonomies = Object.keys(data);
            const entries = taxonomies.map(e => data[e]);
            const head = `<tr>${taxonomies.map(t => `<th>${t}</th>`).join('\n')}</tr>`;
            const body = `<tr>${entries.map(e => `<td>${e}</td>`).join('\n')}</tr>`;
            table.innerHTML = head + body;
        } else if (data.length) {
            // if is it an array
            const taxonomies = Object.keys(data[0]);
            const entriesArray = data.map(o => taxonomies.map(t => o[t]));
            const head = `<tr>${taxonomies.map(t => `<th>${t}</th>`).join('\n')}</tr>`;
            const body = entriesArray.map(entries => `<tr>${
                entries.map(entry => `<td>${entry}</td>`).join('\n')
            }</tr>`).join('\n');
            table.innerHTML = head + body;
        }
    }
};