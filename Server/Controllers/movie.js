"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMovie = exports.UpdateMovie = exports.AddMovie = exports.DisplayMovieByID = exports.DisplayMovieList = void 0;
const movie_1 = __importDefault(require("../Models/movie"));
function SanitizeArray(unsanitizedArray) {
    let sanitizedArray = Array();
    for (const unsanitizedString of unsanitizedArray) {
        sanitizedArray.push(unsanitizedString.trim());
    }
    return sanitizedArray;
}
function DisplayMovieList(req, res, next) {
    movie_1.default.find({})
        .then(function (data) {
        res.status(200).json({ success: true, msg: "Movie List Retrieved and Displayed", data: data });
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DisplayMovieList = DisplayMovieList;
function DisplayMovieByID(req, res, next) {
    try {
        let id = req.params.id;
        movie_1.default.findById({ _id: id })
            .then(function (data) {
            res.status(200).json({ success: true, msg: "Move Retrieved by ID", data: data });
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    catch {
        res.json({ success: false, msg: "No Data to Display" });
    }
}
exports.DisplayMovieByID = DisplayMovieByID;
function AddMovie(req, res, next) {
    try {
        let genres = SanitizeArray(req.body.genres.split(","));
        let directors = SanitizeArray(req.body.directors.split(","));
        let writers = SanitizeArray(req.body.writers.split(","));
        let actors = SanitizeArray(req.body.actors.split(","));
        let movie = new movie_1.default({
            movieID: req.body.movieID,
            title: req.body.title,
            studio: req.body.studio,
            genres: genres,
            directors: directors,
            writers: writers,
            actors: actors,
            length: req.body.length,
            year: req.body.year,
            shortDescription: req.body.shortDescription,
            mpaRating: req.body.mpaRating,
            criticsRating: req.body.criticsRating
        });
        movie_1.default.create(movie)
            .then(function () {
            res.status(200).json({ success: true, msg: "Movie Added Successfully", data: movie });
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    catch {
        res.json({ success: false, msg: "No Data to Add" });
    }
}
exports.AddMovie = AddMovie;
function UpdateMovie(req, res, next) {
    try {
        let id = req.params.id;
        let genres = SanitizeArray(req.body.genres.split(","));
        let directors = SanitizeArray(req.body.directors.split(","));
        let writers = SanitizeArray(req.body.writers.split(","));
        let actors = SanitizeArray(req.body.actors.split(","));
        let movieToUpdate = new movie_1.default({
            _id: id,
            movieID: req.body.movieID,
            title: req.body.title,
            studio: req.body.studio,
            genres: genres,
            directors: directors,
            writers: writers,
            actors: actors,
            length: req.body.length,
            year: req.body.year,
            shortDescription: req.body.shortDescription,
            mpaRating: req.body.mpaRating,
            criticsRating: req.body.criticsRating
        });
        movie_1.default.updateOne({ _id: id }, movieToUpdate)
            .then(function () {
            res.status(200).json({ success: true, msg: "Movie Updated Successfully", data: movieToUpdate });
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    catch {
        res.json({ success: false, msg: "No Data to Update" });
    }
}
exports.UpdateMovie = UpdateMovie;
function DeleteMovie(req, res, next) {
    try {
        let id = req.params.id;
        movie_1.default.deleteOne({ _id: id })
            .then(function () {
            res.json(id);
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    catch {
        res.json({ success: false, msg: "No Data to Delete" });
    }
}
exports.DeleteMovie = DeleteMovie;
//# sourceMappingURL=movie.js.map