export interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  image: string
  categories: string[]
  postedOn: string
  deadline: string
  startDate: string
  endDate: string
  requiredSkills: string[]
  responsibilities: string[]
  idealCandidate: string[]
  whenWhere: string
  workType: "In Person" | "Remote" | "Hybrid"
  department: string
}

