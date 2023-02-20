function clearStorage() {
    sessionStorage.setItem("Authorization", '');
    localStorage.setItem("Authorization", '');
    localStorage.setItem("TimeLastCallApi", '');
    window.location.reload();
}

export {
    clearStorage
}