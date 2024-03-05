import { Request, Response, NextFunction } from 'express';

import Movie from '../Models/movie';

/**
 * This function sanitizes the array of strings
 *
 * @param {string[]} unsanitizedArray
 * @returns {string[]}
 */
function SanitizeArray(unsanitizedArray: string[]): string[]
{
    let sanitizedArray: string[] = Array<string>();
    for (const unsanitizedString of unsanitizedArray) 
    {
        sanitizedArray.push(unsanitizedString.trim());
    }
    return sanitizedArray;
}

/* API Functions */

/**
 * This function displays the Movie List
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayMovieList(req: Request, res: Response, next: NextFunction): void
{
    // Find all Movies in the Movie collection
    Movie.find({})
    .then(function(data)
    {
        res.status(200).json({success: true, msg:"Movie List Retrieved and Displayed", data: data});
    })
    .catch(function(err)
    {
        console.error(err);
    });
}

/**
 * This function displays a single movie by the provided ID
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayMovieByID(req: Request, res: Response, next: NextFunction): void
{
    try
    {
        // Get the id from the url
        let id = req.params.id;

        // Find the Movie by id
        Movie.findById({_id: id})
        .then(function(data)
        {
            res.status(200).json({success: true, msg: "Move Retrieved by ID", data: data})
        })
        .catch(function(err)
        {
            console.error(err);
        });
    }
    catch
    {
        res.json({success: false, msg:"No Data to Display"});
    }
}

/**
 * This function adds a new movie to the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function AddMovie(req: Request, res: Response, next: NextFunction): void
{
    try
    {
        // Sanitize the array
        let genres = SanitizeArray((req.body.genres as string).split(","));
        let directors = SanitizeArray((req.body.directors as string).split(","));
        let writers = SanitizeArray((req.body.writers as string).split(","));
        let actors = SanitizeArray((req.body.actors as string).split(","));

        // Instantiate a new Movie
        let movie = new Movie({
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

        // Create a new movie and pass it to the db
        Movie.create(movie)
        .then(function()
        {
            res.status(200).json({success: true, msg: "Movie Added Successfully", data: movie});
        })
        .catch(function(err)
        {
            console.error(err);
        });
    }
    catch
    {
        res.json({success: false, msg:"No Data to Add"});
    }
}

/**
 * This function removes a movie from the database by the provided ID
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function UpdateMovie(req: Request, res: Response, next: NextFunction): void
{
    try
    {
    
        // Get the id from the url  
        let id = req.params.id;
        
        // Sanitize the array
        let genres = SanitizeArray((req.body.genres as string).split(","));
        let directors = SanitizeArray((req.body.directors as string).split(","));
        let writers = SanitizeArray((req.body.writers as string).split(","));
        let actors = SanitizeArray((req.body.actors as string).split(","));

        // Instantiate a new Movie Object
        let movieToUpdate = new Movie({
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

        // Find the Movie by id and then update
        Movie.updateOne({_id: id}, movieToUpdate)
        .then(function()
        {
            res.status(200).json({success: true, msg: "Movie Updated Successfully", data: movieToUpdate});
        })
        .catch(function(err)
        {
            console.error(err);
        });

    }
    catch
    {
        res.json({success: false, msg:"No Data to Update"});
    }
}

/**
 * This function removes a movie from the database by the provided ID
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DeleteMovie(req: Request, res: Response, next: NextFunction): void
{
    try
    {
        // Get the id from the url
        let id = req.params.id;

        // Find the Movie by id and then delete
        Movie.deleteOne({_id: id})
        .then(function()
        {
            res.json(id);
        })
        .catch(function(err)
        {
            console.error(err);
        });
    }
    catch
    {
        res.json({success: false, msg:"No Data to Delete"});
    }
}