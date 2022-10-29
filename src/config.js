
const config = () => ({
    headers: { 'x-access-token': sessionStorage.getItem('authToken') }
});

export default config;