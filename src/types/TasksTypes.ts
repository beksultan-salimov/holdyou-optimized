import { IConsultation, IPsychologist } from "."

export interface ITask {
  id: number
  files: any[]
  title: string
  task: string
  note: any
  created_at: string
  consultation: IConsultation
  user: number
  psychologist: IPsychologist

  status?: any
}

