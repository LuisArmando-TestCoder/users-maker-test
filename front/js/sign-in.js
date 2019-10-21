(function signIn() {
    const form = document.querySelector('#in form');
    const inSubmit = document.getElementById('in-submit');
    const error = form.querySelector('.error-message');

    inSubmit.addEventListener('click', e => {
        const query = utils.formToQueries(form);
        e.preventDefault();
        utils.fetchJSON(`/sign${query}`, {})
        .then(response => {
            if (response.length) {
                const [user] = response;
                window.user = user;
                location.href = '#dashboard';
                utils.toTableData(user, document.getElementById('user-info'));
            } else error.innerText = response.error ? response.error :
                `The request returns: ${JSON.stringify(response)}`;
        });
    });
})();