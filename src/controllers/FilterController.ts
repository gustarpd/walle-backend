import { Request, Response } from 'express'
import { FilterByDate } from '../services/FilterService'

export const Filter = async (req: Request, res: Response) => {
  const { id } = req.params
  const { datefilter } = req.query

  const filter = await FilterByDate(id, datefilter)

 
    return res.json( filter )
  
}
