import { Request, Response } from 'express'

const _get = (req: Request, res: Response) => {
}

const _post = (req: Request, res: Response) => {
    console.log(req.body)
}

const _put = (req: Request, res: Response) => {

}

const _delete = (req: Request, res: Response) => {

}

export const controller = {
    get: _get,
    post: _post,
    put: _put,
    delete: _delete
}

module.exports = controller