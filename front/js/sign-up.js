(function signUp() {
    const form = document.querySelector('#up form');
    const upSubmit = document.getElementById('up-submit');
    const error = form.querySelector('.error-message');

    upSubmit.addEventListener('click', e => {
        const query = utils.formToQueries(form);
        e.preventDefault();
        utils.fetchJSON(`/user${query}`, { options: { method: 'POST' } })
        .then(posted => {
            if (posted.error) {
                error.innerText = posted.error.sqlMessage ? 
                    posted.error.sqlMessage : posted.error;
            } else {
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
            }
        });
    });
})();