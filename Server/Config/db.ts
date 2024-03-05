const localURI = 'mongodb://127.0.0.1:27017/movies';
const remoteURI = process.env.MONGODB_URI;
const sessionSecret = "SomeSessionSecret";

export default {
    localURI: localURI,
    remoteURI: remoteURI,
    sessionSecret: sessionSecret
}