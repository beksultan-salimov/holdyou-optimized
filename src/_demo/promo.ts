export const promocodes: any = [
  {
    id: 1,
    code: "5Т-А2А",
    type: "Стандартна",
    duration: "50 хв.",
    expired_at: "2024-05-20T12:49:42.278Z",
  },
  {
    id: 2,
    code: "1Т-U1N",
    type: "Парна",
    duration: "50 хв.",
    expired_at: "2024-06-20T12:49:42.278Z",
  },
]

export const getPromocodes = (count: number = 2) => {
  return promocodes.slice(0, count)
}