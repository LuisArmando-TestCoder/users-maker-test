(function signOut() {
    const signOutBtn = document.getElementById('sign-out');
    signOutBtn.addEventListener('click', e => {
        window.user = null;
        location.replace('');
    });
})();