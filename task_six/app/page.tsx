"use client"
import { useState } from "react"
import JobCard from "@/components/JobCard";
import JobDescription from "@/components/Job-description"
import { jobsData } from "@/data/jobs.json"
import type { Job } from "@/Types/job"
import { ChevronDown } from "lucide-react"

export default function Home() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [sortBy, setSortBy] = useState("Most relevant")

  if (selectedJob) {
    return (
      <div>
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <button
            onClick={() => setSelectedJob(null)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            ← Back to Jobs
          </button>
        </div>
        <JobDescription job={selectedJob} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Opportunities</h1>
            <p className="text-gray-500 text-sm">Showing {jobsData.length} results</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Most relevant</option>
                <option>Newest first</option>
                <option>Oldest first</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-0">
          {jobsData.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
          ))}
        </div>
      </div>
    </div>
  )
}
