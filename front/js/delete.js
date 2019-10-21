(function deleteUser() {
    const deleteBtn = document.getElementById('delete-user');
    deleteBtn.addEventListener('click', e => {
        utils.fetchJSON(`/user${utils.objectToQueries(window.user)}`, { options: { method: 'DELETE' } })
        .then(r => {
            window.user = null;
            location.replace('');
        });
    });
})();