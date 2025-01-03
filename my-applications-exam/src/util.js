const userNav = document.querySelector('nav .user');
const guestNav = document.querySelector('nav .guest');

export function setUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}

export function hasOwner(ownerId) {
    const userData = getUserData();
    return ownerId === userData?._id;
}

export function clearUserData() {
    localStorage.removeItem('user');
}

export function createSubmitHandler(callback) {
    return function(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        callback(data, e.target)
    }
}

export function updateNav() {
    const userData = getUserData();

    if(userData){
        guestNav.style.display = 'none';
        userNav.style.display = 'inline-block';
    }else{
        userNav.style.display = 'none';
        guestNav.style.display = 'inline-block';
    }
}