(function search() {
    const search = document.getElementById('search-users-name');
    const table = document.getElementById('users');
    search.addEventListener('input', e => {
        const { value } = e.target;
        utils.fetchJSON(`/user?name=${value}`, {})
        .then(r => {
            utils.toTableData(r, table);
        });
    });
})();