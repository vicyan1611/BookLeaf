import { Request, Response } from 'express'
import { metaHandler } from '../models/MetadataHandler'
const _get = (req: Request, res: Response) => {

}

const _post = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const user = await metaHandler.finder.findNormalUser({
            username: req.body.username,
            password: req.body.password
        }, ['username', '_id'])
        console.log(user)
        if (user === null) {
            res
                .status(401)
                .send('Cannot find user')
        } else {
            res
                .status(200)
                .cookie('userId', user._id, {
                    path: '',
                    httpOnly: true,
                    secure: true,
                    expires: new Date(Date.now() + 3600000),
                })
            // res.redirect('http://localhost:5173/books')
            res.send('Done')
        }
    } catch (err) {
        console.log(err)
        err = err as typeof Error & {
            message: string
        }
        res.status(500).send(err.message)
    }

}

const _put = (req: Request, res: Response) => {

}

const _delete = (req: Request, res: Response) => {

}

export const UserController = {
    get: _get,
    post: _post,
    put: _put,
    delete: _delete
}